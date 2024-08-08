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
