# TypeDefs Fields Checklist

## Scalars

- [ ] **JSON**

## Auth Type

- [ ] **token** (ID!)
- [ ] **user** (User)

## User Type

- [x] **\_id** (ID!)
- [x] **username** (String)
- [x] **email** (String)
- [x] **googleId** (String)
- [x] **profilePicture** (String)
- [x] **settings** (Settings)
  - [x] **profileSettings** (ProfileSettings)
    - [x] **username** (String)
    - [x] **email** (String)
    - [x] **profilePhoto** (String)
  - [x] **accessibility** (AccessibilitySettings)
    - [x] **darkMode** (Boolean)
    - [x] **fontSize** (String)
    - [x] **language** (String)
    - [x] **timeZone** (String)
  - [x] **notificationSettings** (NotificationSettings)
    - [x] **emailPreferences** (EmailPreferences)
      - [x] **promotions** (Boolean)
      - [x] **progressNotifications** (Boolean)
      - [x] **newsletter** (Boolean)
    - [x] **inAppNotifications** (Boolean)
    - [x] **pushNotifications** (Boolean)
  - [x] **privacySettings** (PrivacySettings)
    - [x] **dataSharing** (Boolean)
    - [x] **viewDownloadData** (Boolean)
  - [x] **securitySettings** (SecuritySettings)
    - [x] **recentActivity** (RecentActivity)
      - [x] **date** (String)
      - [x] **action** (String)
    - [x] **twoFactorAuth** (Boolean)
    - [x] **cookieSettings** (CookieSettings)
      - [x] **functional** (Boolean)
      - [x] **analytics** (Boolean)
      - [x] **marketing** (Boolean)
- [x] **progress** (ChapterProgress)
  - [x] **chapterId** (ID!)
  - [x] **completion** (Int)
  - [x] **quizScores** (QuizScore)
    - [x] **quizId** (ID!)
    - [x] **scores** (Score)
      - [x] **date** (String)
      - [x] **score** (Int)
  - [x] **notecardScores** (Score)
    - [x] **date** (String)
    - [x] **score** (Int)
  - [x] **flashcardScores** (Score)
    - [x] **date** (String)
    - [x] **score** (Int)
- [x] **studySessions** (StudySession)
  - [x] **date** (String)
  - [x] **duration** (Int)
  - [x] **activityType** (String)
- [x] **purchasedCertifications** (CertificationPurchase)
  - [x] **certificationId** (ID!)
  - [x] **purchaseDate** (String)
  - [x] **price** (Float)
- [x] **paymentMethods** (PaymentMethod)
  - [x] **\_id** (ID!)
- [x] **transactionHistory** (Transaction)
  - [x] **\_id** (ID!)

## Settings Type

- [x] **profileSettings** (ProfileSettings)
- [x] **accessibility** (AccessibilitySettings)
- [x] **notificationSettings** (NotificationSettings)
- [x] **privacySettings** (PrivacySettings)
- [x] **securitySettings** (SecuritySettings)

## ProfileSettings Type

- [x] **username** (String)
- [x] **email** (String)
- [x] **profilePhoto** (String)

## AccessibilitySettings Type

- [x] **darkMode** (Boolean)
- [x] **fontSize** (String)
- [x] **language** (String)
- [x] **timeZone** (String)

## NotificationSettings Type

- [x] **emailPreferences** (EmailPreferences)
  - [x] **promotions** (Boolean)
  - [x] **progressNotifications** (Boolean)
  - [x] **newsletter** (Boolean)
- [x] **inAppNotifications** (Boolean)
- [x] **pushNotifications** (Boolean)

## EmailPreferences Type

- [x] **promotions** (Boolean)
- [x] **progressNotifications** (Boolean)
- [x] **newsletter** (Boolean)

## PrivacySettings Type

- [x] **dataSharing** (Boolean)
- [x] **viewDownloadData** (Boolean)

## SecuritySettings Type

- [x] **recentActivity** (RecentActivity)
  - [x] **date** (String)
  - [x] **action** (String)
- [x] **twoFactorAuth** (Boolean)
- [x] **cookieSettings** (CookieSettings)
  - [x] **functional** (Boolean)
  - [x] **analytics** (Boolean)
  - [x] **marketing** (Boolean)

## StudySession Type

- [x] **date** (String)
- [x] **duration** (Int)
- [x] **activityType** (String)

## ChapterProgress Type

- [x] **chapterId** (ID!)
- [x] **completion** (Int)
- [x] **quizScores** (QuizScore)
  - [x] **quizId** (ID!)
  - [x] **scores** (Score)
    - [x] **date** (String)
    - [x] **score** (Int)
- [x] **notecardScores** (Score)
  - [x] **date** (String)
  - [x] **score** (Int)
- [x] **flashcardScores** (Score)
  - [x] **date** (String)
  - [x] **score** (Int)

## QuizScore Type

- [x] **quizId** (ID!)
- [x] **scores** (Score)
  - [x] **date** (String)
  - [x] **score** (Int)

## Score Type

- [x] **date** (String)
- [x] **score** (Int)

## Certification Type

- [ ] **\_id** (ID!)
- [ ] **title** (String!)
- [ ] **description** (String)
- [ ] **chapters** (Chapter)
- [ ] **price** (Float!)

## CertificationPurchase Type

- [x] **certificationId** (ID!)
- [x] **purchaseDate** (String)
- [x] **price** (Float)

## PaymentMethod Type

- [ ] **\_id** (ID!)
- [ ] **stripePaymentMethodId** (String!)
- [ ] **brand** (String)
- [ ] **last4** (String)
- [ ] **expMonth** (Int)
- [ ] **expYear** (Int)
- [ ] **isDefault** (Boolean)

## Transaction Type

- [ ] **\_id** (ID!)
- [ ] **stripeTransactionId** (String!)
- [ ] **amount** (Float)
- [ ] **currency** (String)
- [ ] **status** (String)
- [ ] **created** (String)
- [ ] **certificationId** (ID)

## PaymentIntent Type

- [ ] **clientSecret** (String!)
- [ ] **amount** (Float!)
- [ ] **currency** (String!)

## Chapter Type

- [ ] **\_id** (ID!)
- [ ] **title** (String!)
- [ ] **description** (String)
- [ ] **quizzes** (Quiz)
- [ ] **notecards** (Notecard)
- [ ] **flashcards** (Flashcard)
- [ ] **dragdrops** (DragDrop)
- [ ] **isCompleted** (Boolean)
- [ ] **progress** (Int)
- [ ] **estimatedTime** (Int)
- [ ] **grade** (Float)
- [ ] **createdAt** (String)
- [ ] **updatedAt** (String)

## Quiz Type

- [ ] **\_id** (ID!)
- [ ] **question** (String!)
- [ ] **answer** (String!)
- [ ] **category** (String)
- [ ] **chapter** (Chapter)
- [ ] **difficulty** (String)
- [ ] **notes** (Note)
- [ ] **tags** (String)
- [ ] **createdAt** (String)
- [ ] **updatedAt** (String)

## Notecard Type

- [ ] **\_id** (ID!)
- [ ] **title** (String!)
- [ ] **content** (String!)
- [ ] **chapter** (Chapter)
- [ ] **category** (String)
- [ ] **difficulty** (String)
- [ ] **imageUrl** (String)
- [ ] **notes** (Note)
- [ ] **tags** (String)
- [ ] **createdAt** (String)
- [ ] **updatedAt** (String)

## Flashcard Type

- [ ] **\_id** (ID!)
- [ ] **question** (String!)
- [ ] **answer** (String!)
- [ ] **category** (String)
- [ ] **chapter** (Chapter)
- [ ] **difficulty** (String)
- [ ] **imageUrl** (String)
- [ ] **notes** (Note)
- [ ] **tags** (String)
- [ ] **createdAt** (String)
- [ ] **updatedAt** (String)

## DragDrop Type

- [ ] **\_id** (ID!)
- [ ] **title** (String!)
- [ ] **description** (String)
- [ ] **category** (String)
- [ ] **difficulty** (String)
- [ ] **imageUrl** (String)
- [ ] **notes** (Note)
- [ ] **tags** (String)
- [ ] **items** (Item)
- [ ] **dropZones** (DropZone)
- [ ] **correctMapping** (CorrectMapping)
- [ ] **state** (JSON)
- [ ] **isCompleted** (Boolean)
- [ ] **createdAt** (String)
- [ ] **updatedAt** (String)

## Note Type

- [ ] **user** (User)
- [ ] **text** (String)
- [ ] **createdAt** (String)

## Item Type

- [ ] **name** (String!)
- [ ] **id** (ID!)

## DropZone Type

- [ ] **name** (String!)
- [ ] **id** (ID!)

## CorrectMapping Type

- [ ] **itemId** (ID!)
- [ ] **dropZoneId** (ID!)

## Query Type

- [ ] **me** (User)
- [ ] **users** ([User])
- [ ] **user(id: ID!)** (User)
- [ ] **certifications** ([Certification])
- [ ] **certification(id: ID!)** (Certification)
- [ ] **chapters(certificationId: ID!)** ([Chapter])
- [ ] **chapter(id: ID!)** (Chapter)
- [ ] **quizzes(chapterId: ID!)** ([Quiz])
- [ ] **quiz(id: ID!)** (Quiz)
- [ ] **notecards(chapterId: ID!)** ([Notecard])
- [ ] **notecard(id: ID!)** (Notecard)
- [ ] **flashcards(chapterId: ID!)** ([Flashcard])
- [ ] **flashcard(id: ID!)** (Flashcard)
- [ ] **dragDrops** ([DragDrop])
- [ ] **dragDrop(id: ID!)** (DragDrop)
- [ ] **progress(userId: ID!)** ([ChapterProgress])
- [ ] **quizScores(userId: ID!, quizId: ID!)** ([Score])
- [ ] **studySessions(userId: ID!)** ([StudySession])
- [ ] **transactions(userId: ID!)** ([Transaction])
- [ ] **paymentMethods(userId: ID!)** ([PaymentMethod])

## Mutation Type

- [ ] **loginWithGoogle(token: String!)** (Auth)
- [ ] **login(email: String!, password: String!)** (Auth)
- [ ] **addUser(username: String!, email: String!, password: String!)** (Auth)
- [ ] **updateUser(userId: ID!, username: String, email: String, password: String, settings: SettingsInput)** (User)
- [ ] **deleteUser(userId: ID!)** (User)
- [ ] **addCertification(title: String!, description: String, price: Float!)** (Certification)
- [ ] **updateCertification(certificationId: ID!, title: String, description: String, price: Float)** (Certification)
- [ ] **deleteCertification(certificationId: ID!)** (Certification)
- [ ] **purchaseCertification(certificationId: ID!, paymentMethodId: ID!, amount: Float!)** (CertificationPurchase)
- [ ] **addChapter(certificationId: ID!, title: String!, description: String)** (Chapter)
- [ ] **updateChapter(chapterId: ID!, title: String, description: String)** (Chapter)
- [ ] **deleteChapter(chapterId: ID!)** (Chapter)
- [ ] **addQuiz(chapterId: ID!, question: String!, answers: [String]!, correctAnswer: String!)** (Quiz)
- [ ] **updateQuiz(quizId: ID!, question: String, answers: [String], correctAnswer: String)** (Quiz)
- [ ] **deleteQuiz(quizId: ID!)** (Quiz)
- [ ] **addNotecard(chapterId: ID!, title: String!, content: String!)** (Notecard)
- [ ] **updateNotecard(notecardId: ID!, title: String, content: String)** (Notecard)
- [ ] **deleteNotecard(notecardId: ID!)** (Notecard)
- [ ] **addFlashcard(chapterId: ID!, question: String!, answer: String!)** (Flashcard)
- [ ] **updateFlashcard(flashcardId: ID!, question: String, answer: String)** (Flashcard)
- [ ] **deleteFlashcard(flashcardId: ID!)** (Flashcard)
- [ ] **addDragDrop(title: String!, description: String, category: String, difficulty: String, imageUrl: String, notes: [NoteInput], tags: [String], items: [ItemInput], dropZones: [DropZoneInput], correctMapping: [CorrectMappingInput], state: JSON, isCompleted: Boolean)** (DragDrop)
- [ ] **updateDragDrop(dragDropId: ID!, title: String, description: String, category: String, difficulty: String, imageUrl: String, notes: [NoteInput], tags: [String], items: [ItemInput], dropZones: [DropZoneInput], correctMapping: [CorrectMappingInput], state: JSON, isCompleted: Boolean)** (DragDrop)
- [ ] **deleteDragDrop(dragDropId: ID!)** (DragDrop)
- [ ] **saveProgress(userId: ID!, chapterId: ID!, completion: Int!)** (User)
- [ ] **deleteProgress(userId: ID!, chapterId: ID!)** (User)
- [ ] **saveQuizScore(userId: ID!, quizId: ID!, date: String!, score: Int!)** (ChapterProgress)
- [ ] **deleteQuizScore(userId: ID!, quizId: ID!)** (ChapterProgress)
- [ ] **saveStudySession(userId: ID!, date: String!, duration: Int!, activityType: String!)** (User)
- [ ] **deleteStudySession(userId: ID!, sessionId: ID!)** (User)
- [ ] **createPaymentIntent(amount: Float!, currency: String!)** (PaymentIntent)
- [ ] **addPaymentMethod(paymentMethodId: String!, isDefault: Boolean)** (PaymentMethod)
- [ ] **removePaymentMethod(paymentMethodId: ID!)** (PaymentMethod)
- [ ] **updateDefaultPaymentMethod(paymentMethodId: ID!)** (PaymentMethod)

## SettingsInput Type

- [ ] **profileSettings** (ProfileSettingsInput)
- [ ] **accessibility** (AccessibilitySettingsInput)
- [ ] **notificationSettings** (NotificationSettingsInput)
- [ ] **privacySettings** (PrivacySettingsInput)
- [ ] **securitySettings** (SecuritySettingsInput)

## ProfileSettingsInput Type

- [ ] **username** (String)
- [ ] **email** (String)
- [ ] **profilePhoto** (String)

## AccessibilitySettingsInput Type

- [ ] **darkMode** (Boolean)
- [ ] **fontSize** (String)
- [ ] **language** (String)
- [ ] **timeZone** (String)

## NotificationSettingsInput Type

- [ ] **emailPreferences** (EmailPreferencesInput)
  - [ ] **promotions** (Boolean)
  - [ ] **progressNotifications** (Boolean)
  - [ ] **newsletter** (Boolean)
- [ ] **inAppNotifications** (Boolean)
- [ ] **pushNotifications** (Boolean)

## EmailPreferencesInput Type

- [ ] **promotions** (Boolean)
- [ ] **progressNotifications** (Boolean)
- [ ] **newsletter** (Boolean)

## PrivacySettingsInput Type

- [ ] **dataSharing** (Boolean)
- [ ] **viewDownloadData** (Boolean)

## SecuritySettingsInput Type

- [ ] **recentActivity** (RecentActivityInput)
  - [ ] **date** (String)
  - [ ] **action** (String)
- [ ] **twoFactorAuth** (Boolean)
- [ ] **cookieSettings** (CookieSettingsInput)
  - [ ] **functional** (Boolean)
  - [ ] **analytics** (Boolean)
  - [ ] **marketing** (Boolean)

## RecentActivityInput Type

- [ ] **date** (String)
- [ ] **action** (String)

## CookieSettingsInput Type

- [ ] **functional** (Boolean)
- [ ] **analytics** (Boolean)
- [ ] **marketing** (Boolean)

## NoteInput Type

- [ ] **user** (ID!)
- [ ] **text** (String)

## ItemInput Type

- [ ] **name** (String!)

## DropZoneInput Type

- [ ] **name** (String!)

## CorrectMappingInput Type

- [ ] **itemId** (ID!)
- [ ] **dropZoneId** (ID!)
