import { gql } from "@apollo/client";

// Query to fetch the current logged-in user's information
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      profilePicture
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
      progress {
        chapterId
        completion
        quizScores {
          quizId
          scores {
            date
            score
          }
        }
        notecardScores {
          date
          score
        }
        flashcardScores {
          date
          score
        }
      }
      studySessions {
        date
        duration
        activityType
      }
      purchasedCertifications {
        certificationId
        purchaseDate
        price
      }
      paymentMethods {
        _id
        stripePaymentMethodId
        brand
        last4
        expMonth
        expYear
        isDefault
      }
      transactionHistory {
        _id
        stripeTransactionId
        amount
        currency
        status
        created
        certificationId
      }
    }
  }
`;

// Query to fetch all users
export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      profilePicture
    }
  }
`;

// Query to fetch a specific user by ID
export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      profilePicture
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
      progress {
        chapterId
        completion
        quizScores {
          quizId
          scores {
            date
            score
          }
        }
        notecardScores {
          date
          score
        }
        flashcardScores {
          date
          score
        }
      }
      studySessions {
        date
        duration
        activityType
      }
      purchasedCertifications {
        certificationId
        purchaseDate
        price
      }
      paymentMethods {
        _id
        stripePaymentMethodId
        brand
        last4
        expMonth
        expYear
        isDefault
      }
      transactionHistory {
        _id
        stripeTransactionId
        amount
        currency
        status
        created
        certificationId
      }
    }
  }
`;

// Query to fetch all certifications
export const QUERY_CERTIFICATIONS = gql`
  query Certifications {
    certifications {
      _id
      title
      description
      price
      chapters {
        title
      }
    }
  }
`;

// Query to fetch a specific certification by ID
export const QUERY_CERTIFICATION = gql`
  query certification($id: ID!) {
    certification(id: $id) {
      _id
      title
      description
      chapters {
        _id
        title
        quizzes {
          _id
          question
        }
        notecards {
          _id
          content
        }
        flashcards {
          _id
          question
          answer
        }
        dragdrops {
          _id
          title
        }
      }
    }
  }
`;

// Query to fetch all chapters for a specific certification
export const QUERY_CHAPTERS = gql`
  query chapters($certificationId: ID!) {
    chapters(certificationId: $certificationId) {
      _id
      title
      quizzes {
        _id
        question
      }
      notecards {
        _id
        content
      }
      flashcards {
        _id
        question
        answer
      }
      dragdrops {
        _id
        title
      }
    }
  }
`;

// Query to fetch a specific chapter by ID
export const QUERY_CHAPTER = gql`
  query chapter($id: ID!) {
    chapter(id: $id) {
      _id
      title
      quizzes {
        _id
        question
      }
      notecards {
        _id
        content
      }
      flashcards {
        _id
        question
        answer
      }
      dragdrops {
        _id
        title
      }
    }
  }
`;

// Query to fetch all quizzes for a specific chapter
export const QUERY_QUIZZES = gql`
  query quizzes($chapterId: ID!) {
    quizzes(chapterId: $chapterId) {
      _id
      question
      answer
    }
  }
`;

// Query to fetch a specific quiz by ID
export const QUERY_QUIZ = gql`
  query quiz($id: ID!) {
    quiz(id: $id) {
      _id
      question
      answer
    }
  }
`;

// Query to fetch all notecards for a specific chapter
export const QUERY_NOTECARDS = gql`
  query notecards($chapterId: ID!) {
    notecards(chapterId: $chapterId) {
      _id
      content
    }
  }
`;

// Query to fetch a specific notecard by ID
export const QUERY_NOTECARD = gql`
  query notecard($id: ID!) {
    notecard(id: $id) {
      _id
      content
    }
  }
`;

// Query to fetch all flashcards for a specific chapter
export const QUERY_FLASHCARDS = gql`
  query flashcards($chapterId: ID!) {
    flashcards(chapterId: $chapterId) {
      _id
      question
      answer
    }
  }
`;

// Query to fetch a specific flashcard by ID
export const QUERY_FLASHCARD = gql`
  query flashcard($id: ID!) {
    flashcard(id: $id) {
      _id
      question
      answer
    }
  }
`;

// Query to fetch all drag-and-drop activities
export const QUERY_DRAGDROPS = gql`
  query dragDrops {
    dragDrops {
      _id
      title
    }
  }
`;

// Query to fetch a specific drag-and-drop activity by ID
export const QUERY_DRAGDROP = gql`
  query dragDrop($id: ID!) {
    dragDrop(id: $id) {
      _id
      title
    }
  }
`;

// Query to fetch the progress of a specific user by user ID
export const QUERY_PROGRESS = gql`
  query progress($userId: ID!) {
    progress(userId: $userId) {
      chapterId
      completion
      quizScores {
        quizId
        scores {
          date
          score
        }
      }
      notecardScores {
        date
        score
      }
      flashcardScores {
        date
        score
      }
    }
  }
`;

// Query to fetch quiz scores for a specific user and quiz ID
export const QUERY_QUIZ_SCORES = gql`
  query quizScores($userId: ID!, $quizId: ID!) {
    quizScores(userId: $userId, quizId: $quizId) {
      quizId
      scores {
        date
        score
      }
    }
  }
`;

// Query to fetch study sessions for a specific user by user ID
export const QUERY_STUDY_SESSIONS = gql`
  query studySessions($userId: ID!) {
    studySessions(userId: $userId) {
      date
      duration
      activityType
    }
  }
`;

// Query to fetch transaction history for a specific user by user ID
export const QUERY_TRANSACTIONS = gql`
  query transactions($userId: ID!) {
    transactions(userId: $userId) {
      _id
      stripeTransactionId
      amount
      currency
      status
      created
      certificationId
    }
  }
`;

// Query to fetch payment methods for a specific user by user ID
export const QUERY_PAYMENT_METHODS = gql`
  query paymentMethods($userId: ID!) {
    paymentMethods(userId: $userId) {
      _id
      stripePaymentMethodId
      brand
      last4
      expMonth
      expYear
      isDefault
    }
  }
`;
