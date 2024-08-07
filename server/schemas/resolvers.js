const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("./models/User");
const Certification = require("./models/Certification");
const Chapter = require("./models/Chapter");
const Quiz = require("./models/Quiz");
const Notecard = require("./models/Notecard");
const Flashcard = require("./models/Flashcard");
const Activity = require("./models/Activity");
const DragDrop = require("./models/DragDrop");
const { AuthenticationError } = require("apollo-server-express");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    users: async () => User.find(),
    certifications: async (parent, args, context) => {
      const certifications = await Certification.find().populate("chapters");
      if (context.user) {
        const user = await User.findById(context.user._id);
        const purchasedCertifications = user.purchasedCertifications.map((p) =>
          p.certificationId.toString()
        );
        return certifications.map((cert) => ({
          ...cert.toObject(),
          isPurchased: purchasedCertifications.includes(cert._id.toString()),
        }));
      }
      return certifications.map((cert) => ({
        ...cert.toObject(),
        isPurchased: false,
      }));
    },
    chapters: async (parent, { certificationId }) =>
      Certification.findById(certificationId).populate("chapters"),
    quizzes: async (parent, { chapterId }) =>
      Chapter.findById(chapterId).populate("quizzes"),
    notecards: async (parent, { chapterId }) =>
      Chapter.findById(chapterId).populate("notecards"),
    flashcards: async (parent, { chapterId }) =>
      Chapter.findById(chapterId).populate("flashcards"),
    activities: async (parent, { chapterId }) =>
      Chapter.findById(chapterId).populate("activities"),
    dragDrops: async () => DragDrop.find(),
    progress: async (parent, { userId }) =>
      User.findById(userId).populate("progress.chapterId"),
    quizScores: async (parent, { userId, quizId }) =>
      User.findOne({ _id: userId, "progress.quizScores.quizId": quizId }),
    studySessions: async (parent, { userId }) =>
      User.findById(userId).populate("studySessions"),
    transactions: async (parent, { userId }) =>
      User.findById(userId).populate("transactionHistory"),
    paymentMethods: async (parent, { userId }) =>
      User.findById(userId).populate("paymentMethods"),
  },
  Mutation: {
    loginWithGoogle: async (parent, { token }, context) => {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const googleId = payload.sub;
      let user = await User.findOne({ googleId });

      if (!user) {
        user = await User.create({
          username: payload.name,
          email: payload.email,
          googleId,
          profilePicture: payload.picture,
        });
      }

      const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token: authToken, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    },
    updateUser: async (parent, { userId, username, email, settings }) => {
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email, settings },
        { new: true }
      );
      return user;
    },
    deleteUser: async (parent, { userId }) => {
      await User.findByIdAndDelete(userId);
      return `User with id ${userId} was deleted.`;
    },
    addCertification: async (parent, args) => Certification.create(args),
    updateCertification: async (parent, { certificationId, ...updates }) =>
      Certification.findByIdAndUpdate(certificationId, updates, { new: true }),
    deleteCertification: async (parent, { certificationId }) =>
      Certification.findByIdAndDelete(certificationId),
    purchaseCertification: async (
      parent,
      { certificationId, paymentMethodId, amount },
      context
    ) => {
      if (context.user) {
        const certification = await Certification.findById(certificationId);
        if (!certification) throw new Error("Certification not found");

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // amount in cents
          currency: "usd",
          payment_method: paymentMethodId,
          confirm: true,
        });

        const transaction = {
          stripeTransactionId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          created: new Date(paymentIntent.created * 1000).toISOString(),
          certificationId,
        };

        const user = await User.findById(context.user._id);
        user.purchasedCertifications.push({
          certificationId,
          purchaseDate: new Date().toISOString(),
          price: amount,
        });
        user.transactionHistory.push(transaction);
        await user.save();

        return user.purchasedCertifications;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addPaymentMethod: async (
      parent,
      { paymentMethodId, isDefault },
      context
    ) => {
      if (context.user) {
        const paymentMethod = await stripe.paymentMethods.retrieve(
          paymentMethodId
        );

        const user = await User.findById(context.user._id);
        user.paymentMethods.push({
          stripePaymentMethodId: paymentMethod.id,
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          expMonth: paymentMethod.card.exp_month,
          expYear: paymentMethod.card.exp_year,
          isDefault: isDefault,
        });

        if (isDefault) {
          user.paymentMethods.forEach((method) => {
            if (method.stripePaymentMethodId !== paymentMethod.id) {
              method.isDefault = false;
            }
          });
        }

        await user.save();
        return user.paymentMethods;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePaymentMethod: async (parent, { paymentMethodId }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        user.paymentMethods = user.paymentMethods.filter(
          (method) => method.stripePaymentMethodId !== paymentMethodId
        );
        await user.save();
        return user.paymentMethods;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateDefaultPaymentMethod: async (
      parent,
      { paymentMethodId },
      context
    ) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        user.paymentMethods.forEach((method) => {
          method.isDefault = method.stripePaymentMethodId === paymentMethodId;
        });
        await user.save();
        return user.paymentMethods.find((method) => method.isDefault);
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    createPaymentIntent: async (parent, { amount, currency }, context) => {
      if (context.user) {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // amount in cents
          currency: currency,
        });
        return {
          clientSecret: paymentIntent.client_secret,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
        };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
