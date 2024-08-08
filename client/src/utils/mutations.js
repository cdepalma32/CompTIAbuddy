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

// Mutation to add a new user Note: password is not required because it is handled by Auth.js and
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
