import { gql } from "@apollo/client";

// Mutation to log in a user with email and password
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to log in a user with Google
export const LOGIN_WITH_GOOGLE = gql`
  mutation loginWithGoogle($token: String!) {
    loginWithGoogle(token: $token) {
      token
      user {
        _id
        username
        email
        profilePicture
      }
    }
  }
`;

// Mutation to add a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to update user information
export const UPDATE_USER = gql`
  mutation updateUser(
    $userId: ID!
    $username: String
    $email: String
    $password: String
    $settings: SettingsInput
  ) {
    updateUser(
      userId: $userId
      username: $username
      email: $email
      password: $password
      settings: $settings
    ) {
      _id
      username
      email
      settings {
        profileSettings {
          username
          email
          profilePhoto
        }
        accessibility {
          darkMode
          fontSize
          language
          timeZone
        }
        notificationSettings {
          emailPreferences {
            promotions
            progressNotifications
            newsletter
          }
          inAppNotifications
          pushNotifications
        }
        privacySettings {
          dataSharing
          viewDownloadData
        }
        securitySettings {
          recentActivity {
            date
            action
          }
          twoFactorAuth
          cookieSettings {
            functional
            analytics
            marketing
          }
        }
      }
    }
  }
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      username
    }
  }
`;

// Mutation to add a certification
export const ADD_CERTIFICATION = gql`
  mutation addCertification(
    $title: String!
    $description: String!
    $price: Float!
  ) {
    addCertification(title: $title, description: $description, price: $price) {
      _id
      title
      description
      price
      chapters {
        _id
        title
      }
    }
  }
`;

// Mutation to update a certification
export const UPDATE_CERTIFICATION = gql`
  mutation updateCertification(
    $certificationId: ID!
    $title: String
    $description: String
  ) {
    updateCertification(
      certificationId: $certificationId
      title: $title
      description: $description
    ) {
      _id
      title
      description
    }
  }
`;

// Mutation to delete a certification
export const DELETE_CERTIFICATION = gql`
  mutation deleteCertification($certificationId: ID!) {
    deleteCertification(certificationId: $certificationId) {
      _id
      title
    }
  }
`;

// Mutation to add a chapter
export const ADD_CHAPTER = gql`
  mutation addChapter($certificationId: ID!, $title: String!) {
    addChapter(certificationId: $certificationId, title: $title) {
      _id
      title
    }
  }
`;

// Mutation to update a chapter
export const UPDATE_CHAPTER = gql`
  mutation updateChapter($chapterId: ID!, $title: String) {
    updateChapter(chapterId: $chapterId, title: $title) {
      _id
      title
    }
  }
`;

// Mutation to delete a chapter
export const DELETE_CHAPTER = gql`
  mutation deleteChapter($chapterId: ID!) {
    deleteChapter(chapterId: $chapterId) {
      _id
      title
    }
  }
`;

// Mutation to add a quiz
export const ADD_QUIZ = gql`
  mutation addQuiz($chapterId: ID!, $question: String!, $answer: String!) {
    addQuiz(chapterId: $chapterId, question: $question, answer: $answer) {
      _id
      question
      answer
      category
      chapter {
        _id
        title
      }
      difficulty
      notes {
        user {
          _id
          username
        }
        text
        createdAt
      }
      tags
      createdAt
      updatedAt
    }
  }
`;

// Mutation to update a quiz
export const UPDATE_QUIZ = gql`
  mutation updateQuiz($quizId: ID!, $question: String, $answer: String) {
    updateQuiz(quizId: $quizId, question: $question, answer: $answer) {
      _id
      question
      answer
    }
  }
`;

// Mutation to delete a quiz
export const DELETE_QUIZ = gql`
  mutation deleteQuiz($quizId: ID!) {
    deleteQuiz(quizId: $quizId) {
      _id
    }
  }
`;

// Mutation to add a notecard
export const ADD_NOTECARD = gql`
  mutation addNotecard($chapterId: ID!, $title: String!, $content: String!) {
    addNotecard(chapterId: $chapterId, title: $title, content: $content) {
      _id
      title
      content
    }
  }
`;

// Mutation to update a notecard
export const UPDATE_NOTECARD = gql`
  mutation updateNotecard($notecardId: ID!, $content: String) {
    updateNotecard(notecardId: $notecardId, content: $content) {
      _id
      content
    }
  }
`;

// Mutation to delete a notecard
export const DELETE_NOTECARD = gql`
  mutation deleteNotecard($notecardId: ID!) {
    deleteNotecard(notecardId: $notecardId) {
      _id
    }
  }
`;

// Mutation to add a flashcard
export const ADD_FLASHCARD = gql`
  mutation addFlashcard($chapterId: ID!, $question: String!, $answer: String!) {
    addFlashcard(chapterId: $chapterId, question: $question, answer: $answer) {
      _id
      question
      answer
    }
  }
`;

// Mutation to update a flashcard
export const UPDATE_FLASHCARD = gql`
  mutation updateFlashcard(
    $flashcardId: ID!
    $question: String
    $answer: String
  ) {
    updateFlashcard(
      flashcardId: $flashcardId
      question: $question
      answer: $answer
    ) {
      _id
      question
      answer
    }
  }
`;

// Mutation to delete a flashcard
export const DELETE_FLASHCARD = gql`
  mutation deleteFlashcard($flashcardId: ID!) {
    deleteFlashcard(flashcardId: $flashcardId) {
      _id
    }
  }
`;

// Mutation to add a drag-and-drop activity
export const ADD_DRAGDROP = gql`
  mutation addDragDrop($chapterId: ID!, $title: String!) {
    addDragDrop(chapterId: $chapterId, title: $title) {
      _id
      title
    }
  }
`;

// Mutation to update a drag-and-drop activity
export const UPDATE_DRAGDROP = gql`
  mutation updateDragDrop($dragDropId: ID!, $title: String) {
    updateDragDrop(dragDropId: $dragDropId, title: $title) {
      _id
      title
    }
  }
`;

// Mutation to delete a drag-and-drop activity
export const DELETE_DRAGDROP = gql`
  mutation deleteDragDrop($dragDropId: ID!) {
    deleteDragDrop(dragDropId: $dragDropId) {
      _id
      title
    }
  }
`;

// Mutation to purchase a certification
export const PURCHASE_CERTIFICATION = gql`
  mutation purchaseCertification(
    $certificationId: ID!
    $paymentMethodId: String!
    $amount: Float!
  ) {
    purchaseCertification(
      certificationId: $certificationId
      paymentMethodId: $paymentMethodId
      amount: $amount
    ) {
      _id
      purchasedCertifications {
        certificationId
        purchaseDate
        price
      }
    }
  }
`;
