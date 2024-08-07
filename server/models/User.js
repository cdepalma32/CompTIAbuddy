const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    googleId: {
      type: String,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    settings: {
      profileSettings: {
        username: String,
        email: String,
        profilePhoto: String,
      },
      accessibility: {
        darkMode: Boolean,
        fontSize: String,
        language: String,
        timeZone: String,
      },
      notificationSettings: {
        emailPreferences: {
          promotions: Boolean,
          progressNotifications: Boolean,
          newsletter: Boolean,
        },
        inAppNotifications: Boolean,
        pushNotifications: Boolean,
      },
      privacySettings: {
        dataSharing: Boolean,
        viewDownloadData: Boolean,
      },
      securitySettings: {
        recentActivity: [
          {
            date: String,
            action: String,
          },
        ],
        twoFactorAuth: Boolean,
        cookieSettings: {
          functional: Boolean,
          analytics: Boolean,
          marketing: Boolean,
        },
      },
    },
    progress: [
      {
        chapterId: {
          type: Schema.Types.ObjectId,
          ref: "Chapter",
        },
        completion: Number,
        quizScores: [
          {
            quizId: {
              type: Schema.Types.ObjectId,
              ref: "Quiz",
            },
            scores: [
              {
                date: String,
                score: Number,
              },
            ],
          },
        ],
        notecardScores: [
          {
            date: String,
            score: Number,
          },
        ],
        flashcardScores: [
          {
            date: String,
            score: Number,
          },
        ],
      },
    ],
    studySessions: [
      {
        date: String,
        duration: Number,
        activityType: String,
      },
    ],
    purchasedCertifications: [
      {
        certificationId: {
          type: Schema.Types.ObjectId,
          ref: "Certification",
        },
        purchaseDate: String,
        price: Number,
      },
    ],
    paymentMethods: [
      {
        type: Schema.Types.ObjectId,
        ref: "PaymentMethod",
      },
    ],
    transactionHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);
module.exports = User;
