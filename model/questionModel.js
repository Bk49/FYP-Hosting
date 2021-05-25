const mongoose = require("mongoose");
const { Schema } = mongoose;

// creating user object schema
const QuestionSchema = new Schema({
    skill_name: {
        type: String,
        required: "Skill required"
    },
    question_number: {
        type: Number,
        min: 1,
        required: "Question Number is required"
    },
    question: {
        type: String,
        required: "Question is required"
    },
    answer: {
        type: Number
    },
    isCorrect: {
        type: Boolean
    },
    difficulty: {
        type: String,
        required: "Difficulty required"
    }
});

const Question = mongoose.model("Question", QuestionSchema)

const questionModel = {
    QuestionSchema
}

module.exports = questionModel;