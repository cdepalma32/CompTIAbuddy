const { OAuth2Client } = require("google-auth-library");
const { UserInputError } = require("apollo-server-express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  User,
  Certification,
  Chapter,
  Quiz,
  Notecard,
  Flashcard,
  DragDrop,
} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

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

    certifications: async () => {
      // Populate the chapters field when querying for certifications
      return Certification.find()
        .populate("chapters")
        .select("title description price");
    },

    certification: async (parent, { id }, context) => {
      const certification = await Certification.findById(id).populate(
        "chapters"
      );

      // Check if the user is logged in
      if (context.user) {
        const user = await User.findById(context.user._id);
        const hasPurchased = user.purchasedCertifications.some(
          (p) => p.certificationId.toString() === id
        );

        // If the user has purchased the certification, return the full certification data
        if (hasPurchased) {
          return certification;
        }
      }

      // If the user hasn't purchased the certification, return the certification without chapters
      return {
        _id: certification._id,
        title: certification.title,
        description: certification.description,
        price: certification.price,
        chapters: null, // Explicitly set chapters to null
      };
    },

    chapters: async (parent, { certificationId }, context) => {
      const certification = await Certification.findById(certificationId);

      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === certificationId
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return certification.chapters;
    },

    chapter: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const chapter = await Chapter.findById(id).populate(
        "quizzes notecards flashcards dragdrops"
      );
      const cert = await Certification.findOne({ chapters: id });

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === cert._id.toString()
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return chapter;
    },

    quizzes: async (parent, { chapterId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const chapter = await Chapter.findById(chapterId);
      const cert = await Certification.findOne({ chapters: chapterId });

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === cert._id.toString()
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return chapter.quizzes;
    },

    quiz: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const quiz = await Quiz.findById(id);
      const chapter = await Chapter.findOne({ quizzes: id });
      const cert = await Certification.findOne({ chapters: chapter._id });

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === cert._id.toString()
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return quiz;
    },

    notecards: async (parent, { chapterId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const chapter = await Chapter.findById(chapterId);
      const cert = await Certification.findOne({ chapters: chapterId });

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === cert._id.toString()
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return chapter.notecards;
    },

    notecard: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const notecard = await Notecard.findById(id);
      const chapter = await Chapter.findOne({ notecards: id });
      const cert = await Certification.findOne({ chapters: chapter._id });

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === cert._id.toString()
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return notecard;
    },

    flashcards: async (parent, { chapterId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const chapter = await Chapter.findById(chapterId);
      const cert = await Certification.findOne({ chapters: chapterId });

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === cert._id.toString()
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return chapter.flashcards;
    },

    flashcard: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const flashcard = await Flashcard.findById(id);
      const chapter = await Chapter.findOne({ flashcards: id });
      const cert = await Certification.findOne({ chapters: chapter._id });

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === cert._id.toString()
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return flashcard;
    },

    dragDrops: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const dragDrops = await DragDrop.find();
      const user = await User.findById(context.user._id);
      const purchasedChapters = user.purchasedCertifications.flatMap(
        (p) => p.certificationId.chapters
      );

      return dragDrops.filter((dragDrop) =>
        purchasedChapters.includes(dragDrop.chapter)
      );
    },

    dragDrop: async (parent, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const dragDrop = await DragDrop.findById(id);
      const chapter = await Chapter.findOne({ dragdrops: id });
      const cert = await Certification.findOne({ chapters: chapter._id });

      const user = await User.findById(context.user._id);
      const hasPurchased = user.purchasedCertifications.some(
        (p) => p.certificationId.toString() === cert._id.toString()
      );

      if (!hasPurchased) {
        throw new AuthenticationError(
          "You have not purchased this certification!"
        );
      }

      return dragDrop;
    },

    progress: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Return progress only for the authenticated user
      const user = await User.findById(context.user._id).populate(
        "progress.chapterId"
      );
      return user.progress;
    },

    quizScores: async (parent, { quizId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      // Fetch only the quiz scores for the authenticated user
      const user = await User.findById(context.user._id);
      const quizScore = user.progress.find(
        (progress) => progress.quizScores.quizId.toString() === quizId
      );
      return quizScore ? quizScore.scores : [];
    },

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

      const authToken = signToken(user);

      return { token: authToken, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const isValid = await user.isCorrectPassword(password);
      if (!isValid) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User with this email already exists");
        }

        const userData = { username, email, password };

        if (!userData.googleId) {
          delete userData.googleId;
        }

        const user = await User.create(userData);
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error("Error adding user:", error);
        if (error.code === 11000 && error.keyPattern.googleId) {
          throw new Error("A user with this Google ID already exists.");
        }
        throw new Error("Failed to add user. Please try again.");
      }
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

    addFreeCertification: async (parent, { certificationId }, context) => {
      try {
        console.log("using resolver addFreeCertification");
        // Check if user is logged in
        console.log("Checking if user is authenticated...");
        if (!context.user) {
          console.error("User not authenticated");
          throw new AuthenticationError("You need to be logged in!");
        }

        // Fetch the certification
        console.log(`Fetching certification with ID: ${certificationId}`);
        const certification = await Certification.findById(certificationId);
        if (!certification) {
          console.error(`Certification not found for ID: ${certificationId}`);
          throw new Error("Certification not found");
        }

        // Ensure the certification is free
        console.log(`Checking if certification is free...`);
        if (certification.price > 0) {
          console.error(
            `Certification with ID: ${certificationId} is not free (Price: ${certification.price})`
          );
          throw new Error("This certification is not free");
        }

        // Fetch the user
        console.log(`Fetching user with ID: ${context.user._id}`);
        const user = await User.findById(context.user._id);
        if (!user) {
          console.error(`User not found with ID: ${context.user._id}`);
          throw new Error("User not found");
        }

        // Check if the user already owns this certification
        console.log(`Checking if user already owns certification...`);
        const alreadyPurchased = user.purchasedCertifications.some(
          (p) => p.certificationId.toString() === certificationId
        );
        if (alreadyPurchased) {
          console.warn(
            `User ${context.user._id} already owns certification with ID: ${certificationId}`
          );
          throw new Error("You already own this certification");
        }

        // Add the certification to the user's purchased certifications
        console.log(`Adding certification to user...`);
        user.purchasedCertifications.push({
          certificationId,
          purchaseDate: new Date().toISOString(),
          price: certification.price, // Should be 0 for free certifications
        });

        // Save the updated user
        await user.save();
        console.log(
          `Certification with ID: ${certificationId} added to user ${context.user._id}`
        );

        return user.purchasedCertifications;
      } catch (error) {
        console.error(`Error in addFreeCertification: ${error.message}`, {
          certificationId,
          userId: context.user?._id,
          stack: error.stack,
        });
        throw new Error(`Failed to add free certification: ${error.message}`);
      }
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

    addQuiz: async (parent, { chapterId, question, answer }, context) => {
      try {
        const chapterExists = await Chapter.findById(chapterId);
        if (!chapterExists) {
          throw new Error("Chapter not found");
        }

        const newQuiz = await Quiz.create({
          chapter: chapterId,
          question,
          answer,
        });

        const populatedQuiz = await Quiz.findById(newQuiz._id).populate(
          "chapter"
        );

        return populatedQuiz;
      } catch (error) {
        throw new Error("Failed to add quiz: " + error.message);
      }
    },

    updateQuiz: async (parent, { quizId, ...updates }) =>
      Quiz.findByIdAndUpdate(quizId, updates, { new: true }),
    deleteQuiz: async (parent, { quizId }) => Quiz.findByIdAndDelete(quizId),

    addNotecard: async (parent, { chapterId, title, content }) => {
      const newNotecard = await Notecard.create({
        chapter: chapterId,
        title,
        content,
      });
      return newNotecard;
    },
    updateNotecard: async (parent, { notecardId, ...updates }) =>
      Notecard.findByIdAndUpdate(notecardId, updates, { new: true }),
    deleteNotecard: async (parent, { notecardId }) =>
      Notecard.findByIdAndDelete(notecardId),

    addFlashcard: async (parent, { chapterId, question, answer }) => {
      const newFlashcard = await Flashcard.create({
        chapter: chapterId,
        question,
        answer,
      });
      return newFlashcard;
    },
    updateFlashcard: async (parent, { flashcardId, ...updates }) =>
      Flashcard.findByIdAndUpdate(flashcardId, updates, { new: true }),
    deleteFlashcard: async (parent, { flashcardId }) =>
      Flashcard.findByIdAndDelete(flashcardId),

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
          amount: Math.round(amount * 100),
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
          amount: Math.round(amount * 100),
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
