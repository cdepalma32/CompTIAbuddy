# CompTIA Buddy

![MIT License](https://img.shields.io/badge/license-MIT-yellow.svg)

CompTIA Buddy is a study aid application designed to help users prepare for CompTIA certifications. The application provides users with quizzes, flashcards, notecards, and other interactive learning tools, alongside a robust payment and authentication system using Google OAuth and Stripe.

## Features

- **Google OAuth**: Secure and easy login using Google accounts.
- **Interactive Learning Tools**: Quizzes, flashcards, and notecards to aid in study.
- **Certification Management**: Track certifications, chapters, and progress.
- **Payments**: Secure payment integration using Stripe.
- **User Settings**: Customizable user experience with settings for notifications, privacy, and more.

## Screenshot

![CompTIA Buddy](URL_TO_IMAGE)

## Link to Live Application

[CompTIA Buddy](URL_TO_LIVE_APP)

## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/CompTIA-Buddy.git
   cd CompTIA-Buddy
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the Application**

   ```bash
   npm run develop
   ```

   The application will be available at `http://localhost:3001`.

## Usage

- **Login**: Use the Google OAuth button to log in.
- **Browse Certifications**: View available certifications and chapters.
- **Study**: Use quizzes, flashcards, and notecards to study.

## Contributing

Contributions are welcome! Please refer to the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries, please contact the team at:
