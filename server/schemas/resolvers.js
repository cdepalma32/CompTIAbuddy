const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");
const Certification = require("../models/Certification");
const Chapter = require("../models/Chapter");
const Quiz = require("../models/Quiz");
const Notecard = require("../models/Notecard");
const Flashcard = require("../models/Flashcard");
const Activity = require("../models/Activity");
const DragDrop = require("../models/DragDrop");
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
    user: async (parent, { id }) => User.findById(id),

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
    certification: async (parent, { id }) =>
      Certification.findById(id).populate("chapters"),

    chapters: async (parent, { certificationId }) =>
      Certification.findById(certificationId).populate("chapters"),
    chapter: async (parent, { id }) =>
      Chapter.findById(id).populate("activities"),

    quizzes: async (parent, { chapterId }) =>
      Chapter.findById(chapterId).populate("quizzes"),
    quiz: async (parent, { id }) => Quiz.findById(id),

    notecards: async (parent, { chapterId }) =>
      Chapter.findById(chapterId).populate("notecards"),
    notecard: async (parent, { id }) => Notecard.findById(id),

    flashcards: async (parent, { chapterId }) =>
      Chapter.findById(chapterId).populate("flashcards"),
    flashcard: async (parent, { id }) => Flashcard.findById(id),

    activities: async (parent, { chapterId }) =>
      Chapter.findById(chapterId).populate("activities"),
    activity: async (parent, { id }) => Activity.findById(id),

    dragDrops: async () => DragDrop.find(),
    dragDrop: async (parent, { id }) => DragDrop.findById(id),

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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token, user };
    },
    addUser: async (parent, args) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const user = await User.create({ ...args, password: hashedPassword });
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    },
    updateUser: async (
      parent,
      { userId, username, email, password, settings }
    ) => {
      const updates = { username, email, settings };
      if (password) {
        updates.password = await bcrypt.hash(password, 10);
      }
      const user = await User.findByIdAndUpdate(userId, updates, { new: true });
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

    addChapter: async (parent, args) => Chapter.create(args),
    updateChapter: async (parent, { chapterId, ...updates }) =>
      Chapter.findByIdAndUpdate(chapterId, updates, { new: true }),
    deleteChapter: async (parent, { chapterId }) =>
      Chapter.findByIdAndDelete(chapterId),

    addQuiz: async (parent, args) => Quiz.create(args),
    updateQuiz: async (parent, { quizId, ...updates }) =>
      Quiz.findByIdAndUpdate(quizId, updates, { new: true }),
    deleteQuiz: async (parent, { quizId }) => Quiz.findByIdAndDelete(quizId),

    addNotecard: async (parent, args) => Notecard.create(args),
    updateNotecard: async (parent, { notecardId, ...updates }) =>
      Notecard.findByIdAndUpdate(notecardId, updates, { new: true }),
    deleteNotecard: async (parent, { notecardId }) =>
      Notecard.findByIdAndDelete(notecardId),

    addFlashcard: async (parent, args) => Flashcard.create(args),
    updateFlashcard: async (parent, { flashcardId, ...updates }) =>
      Flashcard.findByIdAndUpdate(flashcardId, updates, { new: true }),
    deleteFlashcard: async (parent, { flashcardId }) =>
      Flashcard.findByIdAndDelete(flashcardId),

    addActivity: async (parent, args) => Activity.create(args),
    updateActivity: async (parent, { activityId, ...updates }) =>
      Activity.findByIdAndUpdate(activityId, updates, { new: true }),
    deleteActivity: async (parent, { activityId }) =>
      Activity.findByIdAndDelete(activityId),

    addDragDrop: async (parent, args) => DragDrop.create(args),
    updateDragDrop: async (parent, { dragDropId, ...updates }) =>
      DragDrop.findByIdAndUpdate(dragDropId, updates, { new: true }),
    deleteDragDrop: async (parent, { dragDropId }) =>
      DragDrop.findByIdAndDelete(dragDropId),

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
