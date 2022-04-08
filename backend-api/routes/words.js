const { Router } = require("express");
const { body } = require("express-validator");

const wordController = require("../controllers/words");

const isAuth = require("../middleware/is-auth");

const router = Router();

// GET /word
router.get("/word", wordController.getWord);

// POST /add-word
router.post(
  "/add-word",
  body("word").trim().isLength({ min: 5, max: 5 }),
  isAuth,
  wordController.postWord
);

// POST /check-word
router.post("/check-word", wordController.checkAnswer);

module.exports = router;
