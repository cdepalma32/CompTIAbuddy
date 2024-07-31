const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID!
    username: String
    email: String
    googleId: String
    profilePicture: String
    settings: Settings
    progress: [ChapterProgress]
    studySessions: [StudySession]
    purchasedCertifications: [CertificationPurchase]
    paymentMethods: [PaymentMethod]
    transactionHistory: [Transaction]
  }

  type Settings {
    profileSettings: ProfileSettings
    accessibility: AccessibilitySettings
    notificationSettings: NotificationSettings
    privacySettings: PrivacySettings
    securitySettings: SecuritySettings
  }

  type ProfileSettings {
    username: String
    email: String
    profilePhoto: String
  }

  type AccessibilitySettings {
    darkMode: Boolean
    fontSize: String
    language: String
    timeZone: String
  }

  type NotificationSettings {
    emailPreferences: EmailPreferences
    inAppNotifications: Boolean
    pushNotifications: Boolean
  }

  type EmailPreferences {
    promotions: Boolean
    progressNotifications: Boolean
    newsletter: Boolean
  }

  type PrivacySettings {
    dataSharing: Boolean
    viewDownloadData: Boolean
  }

  type SecuritySettings {
    recentActivity: [RecentActivity]
    twoFactorAuth: Boolean
    cookieSettings: CookieSettings
  }

  type RecentActivity {
    date: String
    action: String
  }

  type CookieSettings {
    functional: Boolean
    analytics: Boolean
    marketing: Boolean
  }

  type StudySession {
    date: String
    duration: Int # Duration in minutes
    activityType: String
  }

  type ChapterProgress {
    chapterId: ID!
    completion: Int
    quizScores: [QuizScore]
    notecardScores: [Score]
    flashcardScores: [Score]
  }

  type QuizScore {
    quizId: ID!
    scores: [Score]
  }

  type Score {
    date: String
    score: Int
  }

  type Certification {
    _id: ID!
    title: String!
    description: String
    chapters: [Chapter]
    price: Float!
    isPurchased: Boolean!
  }

  type CertificationPurchase {
    certificationId: ID!
    purchaseDate: String
    price: Float
  }

  type PaymentMethod {
    _id: ID!
    stripePaymentMethodId: String!
    brand: String
    last4: String
    expMonth: Int
    expYear: Int
    isDefault: Boolean
  }

  type Transaction {
    _id: ID!
    stripeTransactionId: String!
    amount: Float
    currency: String
    status: String
    created: String
    certificationId: ID
  }

  type PaymentIntent {
    clientSecret: String!
    amount: Float!
    currency: String!
  }

  type Chapter {
    _id: ID!
    title: String!
    description: String
    certification: Certification
    activities: [Activity]
  }

  type Quiz {
    _id: ID!
    question: String!
    answers: [String]
    correctAnswer: String!
    chapter: Chapter
  }

  type Notecard {
    _id: ID!
    question: String!
    answer: String!
    chapter: Chapter
  }

  type Flashcard {
    _id: ID!
    question: String!
    answer: String!
    chapter: Chapter
  }

  type Activity {
    _id: ID!
    type: String!
    content: String!
    chapter: Chapter
  }

  type Query {
    me: User
    users: [User]
    certifications: [Certification]
    chapters(certificationId: ID!): [Chapter]
    quizzes(chapterId: ID!): [Quiz]
    notecards(chapterId: ID!): [Notecard]
    flashcards(chapterId: ID!): [Flashcard]
    activities(chapterId: ID!): [Activity]
    progress(userId: ID!): [ChapterProgress]
    quizScores(userId: ID!, quizId: ID!): [Score]
    studySessions(userId: ID!): [StudySession]
    transactions(userId: ID!): [Transaction]
    paymentMethods(userId: ID!): [PaymentMethod]
  }

  type Mutation {
    loginWithGoogle(token: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(
      userId: ID!
      username: String
      email: String
      settings: SettingsInput
    ): User
    deleteUser(userId: ID!): User

    addCertification(
      title: String!
      description: String
      price: Float!
    ): Certification
    updateCertification(
      certificationId: ID!
      title: String
      description: String
      price: Float
    ): Certification
    deleteCertification(certificationId: ID!): Certification
    purchaseCertification(
      certificationId: ID!
      paymentMethodId: ID!
      amount: Float!
    ): CertificationPurchase

    addChapter(
      certificationId: ID!
      title: String!
      description: String
    ): Chapter
    updateChapter(chapterId: ID!, title: String, description: String): Chapter
    deleteChapter(chapterId: ID!): Chapter

    addQuiz(
      chapterId: ID!
      question: String!
      answers: [String]!
      correctAnswer: String!
    ): Quiz
    updateQuiz(
      quizId: ID!
      question: String
      answers: [String]
      correctAnswer: String
    ): Quiz
    deleteQuiz(quizId: ID!): Quiz

    addNotecard(chapterId: ID!, question: String!, answer: String!): Notecard
    updateNotecard(notecardId: ID!, question: String, answer: String): Notecard
    deleteNotecard(notecardId: ID!): Notecard

    addFlashcard(chapterId: ID!, question: String!, answer: String!): Flashcard
    updateFlashcard(
      flashcardId: ID!
      question: String
      answer: String
    ): Flashcard
    deleteFlashcard(flashcardId: ID!): Flashcard

    addActivity(chapterId: ID!, type: String!, content: String!): Activity
    updateActivity(activityId: ID!, type: String, content: String): Activity
    deleteActivity(activityId: ID!): Activity

    saveProgress(userId: ID!, chapterId: ID!, completion: Int!): User
    deleteProgress(userId: ID!, chapterId: ID!): User
    saveQuizScore(
      userId: ID!
      quizId: ID!
      date: String!
      score: Int!
    ): ChapterProgress
    deleteQuizScore(userId: ID!, quizId: ID!): ChapterProgress
    saveStudySession(
      userId: ID!
      date: String!
      duration: Int!
      activityType: String!
    ): User
    deleteStudySession(userId: ID!, sessionId: ID!): User

    createPaymentIntent(amount: Float!, currency: String!): PaymentIntent
    addPaymentMethod(
      paymentMethodId: String!
      isDefault: Boolean
    ): PaymentMethod
    removePaymentMethod(paymentMethodId: ID!): PaymentMethod
    updateDefaultPaymentMethod(paymentMethodId: ID!): PaymentMethod
  }

  input SettingsInput {
    profileSettings: ProfileSettingsInput
    accessibility: AccessibilitySettingsInput
    notificationSettings: NotificationSettingsInput
    privacySettings: PrivacySettingsInput
    securitySettings: SecuritySettingsInput
  }

  input ProfileSettingsInput {
    username: String
    email: String
    profilePhoto: String
  }

  input AccessibilitySettingsInput {
    darkMode: Boolean
    fontSize: String
    language: String
    timeZone: String
  }

  input NotificationSettingsInput {
    emailPreferences: EmailPreferencesInput
    inAppNotifications: Boolean
    pushNotifications: Boolean
  }

  input EmailPreferencesInput {
    promotions: Boolean
    progressNotifications: Boolean
    newsletter: Boolean
  }

  input PrivacySettingsInput {
    dataSharing: Boolean
    viewDownloadData: Boolean
  }

  input SecuritySettingsInput {
    recentActivity: [RecentActivityInput]
    twoFactorAuth: Boolean
    cookieSettings: CookieSettingsInput
  }

  input RecentActivityInput {
    date: String
    action: String
  }

  input CookieSettingsInput {
    functional: Boolean
    analytics: Boolean
    marketing: Boolean
  }
`;

module.exports = typeDefs;
