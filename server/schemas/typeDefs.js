const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar JSON

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
    duration: Int
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
    activities: [Activity]
    isCompleted: Boolean
    progress: Int
    estimatedTime: Int
    grade: Float
    createdAt: String
    updatedAt: String
  }

  type Quiz {
    _id: ID!
    question: String!
    answer: String!
    category: String
    chapter: Chapter
    difficulty: String
    notes: [Note]
    tags: [String]
    createdAt: String
    updatedAt: String
  }

  type Notecard {
    _id: ID!
    title: String!
    content: String!
    chapter: Chapter
    category: String
    difficulty: String
    imageUrl: String
    activities: [Activity]
    notes: [Note]
    tags: [String]
    createdAt: String
    updatedAt: String
  }

  type Flashcard {
    _id: ID!
    question: String!
    answer: String!
    category: String
    activities: [Activity]
    chapter: Chapter
    difficulty: String
    imageUrl: String
    notes: [Note]
    tags: [String]
    createdAt: String
    updatedAt: String
  }

  type Activity {
    _id: ID!
    title: String!
    description: String
    type: String!
    questions: [Question]
    difficulty: String
    tags: [String]
    category: String
    imageUrl: String
    createdAt: String
    updatedAt: String
  }

  type Question {
    question: String
    options: [String]
    correctAnswer: String
  }

  type DragDrop {
    _id: ID!
    title: String!
    description: String
    category: String
    difficulty: String
    imageUrl: String
    activities: [Activity]
    notes: [Note]
    tags: [String]
    items: [Item]
    dropZones: [DropZone]
    correctMapping: [CorrectMapping]
    state: JSON
    isCompleted: Boolean
    createdAt: String
    updatedAt: String
  }

  type Note {
    user: User
    text: String
    createdAt: String
  }

  type Item {
    name: String!
    id: ID!
  }

  type DropZone {
    name: String!
    id: ID!
  }

  type CorrectMapping {
    itemId: ID!
    dropZoneId: ID!
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
    dragDrops: [DragDrop]
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

    addNotecard(chapterId: ID!, title: String!, content: String!): Notecard
    updateNotecard(notecardId: ID!, title: String, content: String): Notecard
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

    addDragDrop(
      title: String!
      description: String
      category: String
      difficulty: String
      imageUrl: String
      activities: [ID]
      notes: [NoteInput]
      tags: [String]
      items: [ItemInput]
      dropZones: [DropZoneInput]
      correctMapping: [CorrectMappingInput]
      state: JSON
      isCompleted: Boolean
    ): DragDrop
    updateDragDrop(
      dragDropId: ID!
      title: String
      description: String
      category: String
      difficulty: String
      imageUrl: String
      activities: [ID]
      notes: [NoteInput]
      tags: [String]
      items: [ItemInput]
      dropZones: [DropZoneInput]
      correctMapping: [CorrectMappingInput]
      state: JSON
      isCompleted: Boolean
    ): DragDrop
    deleteDragDrop(dragDropId: ID!): DragDrop

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

  input NoteInput {
    user: ID!
    text: String
  }

  input ItemInput {
    name: String!
  }

  input DropZoneInput {
    name: String!
  }

  input CorrectMappingInput {
    itemId: ID!
    dropZoneId: ID!
  }
`;

module.exports = typeDefs;
