import React from 'react';

import '../App.css'; // Ensure you import your CSS file

const About = () => {
  return (
    // fixed-width container, margin top spacing unit of 5, custom class about-container -- WRAPS ENTIRE CONTENT OF ABOUT PAGE
    <div className="container mt-5 about-container">
      <div className="row">  
        <div className="col-md-8 offset-md-2 text-center">
          <h1 className="display-4 mb-4">About Us</h1>
          <p className="lead mb-4">
            Welcome to the CompTIA Study Hub!
            <br />
            At CompTIA Study Hub, our mission is to empower you to achieve your certification goals with ease and confidence. Whether you're just starting your journey or looking to sharpen your skills, our MERN stack-powered platform is designed to offer a comprehensive and interactive learning experience tailored to your needs.
          </p>
          
          <h2 className="display-5 mt-4 mb-3 section-heading">What We Offer</h2>
          <ul className="list-unstyled mb-4">
            <li><strong>Quizzes & Assessments:</strong> Test your knowledge with our expertly crafted quizzes. Each module is designed to challenge you and help you retain key concepts.</li>
            <li><strong>Notecards:</strong> Quickly review and memorize essential information with our customizable notecards. Perfect for on-the-go study sessions!</li>
            <li><strong>Flashcard Games:</strong> Make learning fun with interactive flashcard games that reinforce your understanding of critical topics.</li>
            <li><strong>Drag & Drop Activities:</strong> Engage in hands-on activities that make learning more interactive and intuitive.</li>
          </ul>
          
          <h2 className="display-5 mt-4 mb-3 section-heading">Why Choose Us?</h2>
          <ul className="list-unstyled mb-4">
            <li><strong>Structured Learning:</strong> Our platform organizes content by chapters and certifications, ensuring a clear path to mastering each topic.</li>
            <li><strong>Progress Tracking:</strong> Monitor your progress with our dashboard, celebrate your achievements, and stay motivated throughout your study journey.</li>
            <li><strong>Flexible Access:</strong> Start with CompTIA A+ and easily expand to other certifications as you advance in your career.</li>
            <li><strong>User-Centric Design:</strong> Enjoy a user-friendly interface with features like dark mode, personalized settings, and comprehensive tutorials.</li>
          </ul>

          <h2 className="display-5 mt-4 mb-3 section-heading">Meet the Team</h2>
          <p className="mb-4">
            Crystal DePalma and Lesley Vaden are the passionate developers behind this project. With a shared vision to create a dynamic and effective learning tool, we've combined our expertise to build an application that we hope will be a valuable resource for all your certification preparation needs.
          </p>

          <h2 className="display-5 mt-4 mb-3 section-heading">Join Us</h2>
          <p className="mb-4">
            Get started today and take the first step towards achieving your CompTIA certifications. If you have any questions or feedback, don't hesitate to reach out through our contact page.
          </p>
          <p className="mt-4 mb-5 final-message">
            Happy studying, and best of luck on your certification journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;