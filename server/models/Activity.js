const { Schema, model } = require('mongoose');

const ActivitySchema = new Schema({
    // title of activity
    title: {
        type: String, 
        required: true,
        trim: true
    },

    // provides more info about activity
    description: {
        type: String, 
        trim: true
    },

    // type of activity
    type: {
        type: String,  // ie: quiz, flashcard, etc
        enum: ['quiz', 'notecards', 'flashcards', 'drag & drop'], // allowed values
        required: true
    },

    questions: [{
        question: String,
        options: [String], // array of options for a quiz question
        correctAnswer: String // The correct answer
    }],

    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'], // Difficulty levels
        default: 'medium'
    },

    tags: [{
        type: String,
        trim: true
    }],

    category: {
        type: String,
        trim: true
    },

    imageUrl: {
        type: String,
        trim: true
    },

    createdAt:{
        type: Date,
        default: Date.now
    },

        updatedAt: {
            type: Date,
            default: Date.now
        }
    }, {
    
        timestamps: true // Automatically add 'createdAt' and 'updatedAt' fields

    });

// Create/export Activity model
const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;