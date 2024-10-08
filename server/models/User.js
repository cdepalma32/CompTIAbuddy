const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

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
    password: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // This allows multiple `null` values for the googleId field
    },
    profilePicture: {
      type: String,
      default: "default-profile.png", // Consider setting a default value
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

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to check if password is correct
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Custom validation for googleId uniqueness
UserSchema.path("googleId").validate(async function (value) {
  if (value) {
    const count = await mongoose.models.User.countDocuments({
      googleId: value,
    });
    return count === 0;
  }
  return true; // No validation if googleId is null
}, "Google ID must be unique");

const User = model("User", UserSchema);

module.exports = User;
