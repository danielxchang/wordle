const { validationResult } = require("express-validator");

const Word = require("../models/word");

exports.getWord = (req, res, next) => {
  let word;
  Word.countDocuments()
    .then((count) => {
      const random = Math.floor(Math.random() * count);
      return Word.findOne().skip(random);
    })
    .then((wordData) => {
      word = wordData.word;
      return Word.deleteOne({ _id: wordData._id.toString() });
    })
    .then(() => {
      res.status(200).json({ word });
    })
    .catch((err) => {
      const error = new Error("Unable to get Word");
      error.httpStatusCode = 500;
      next(error);
    });
};

exports.checkAnswer = (req, res, next) => {
  const { answer, guess } = req.body;
  const responseData = {
    isCorrect: answer.join("") === guess.join(""),
    validGuess: true, // Implement validity check once set up MongoDB
    letters: guess.map((letter, idx) => ({
      letter,
      status: compareLetters(answer, answer[idx], letter),
    })),
  };
  res.status(200).json(responseData);
};

// Controller method for adding words - UNAVAILABLE TO FRONTEND
exports.postWord = (req, res, next) => {
  const word = req.body.word.toUpperCase();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid word!");
    error.httpStatusCode = 422;
    throw error;
  }

  Word.findOne({ word })
    .then((match) => {
      if (match) {
        const error = new Error("Word already exists!");
        error.httpStatusCode = 409;
        throw error;
      }

      const newWord = new Word({ word });
      return newWord.save();
    })
    .then((result) => {
      res.status(200).json({ message: `${word} has been added!` });
    })
    .catch((error) => {
      next(error);
    });
};

const compareLetters = (answer, answerLetter, guessLetter) => {
  if (answerLetter === guessLetter) return "correct";
  if (answer.includes(guessLetter)) return "present";
  return "absent";
};
