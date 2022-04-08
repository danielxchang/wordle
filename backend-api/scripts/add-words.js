const axios = require("axios");

const addWord = async (word) => {
  await axios
    .post(
      "http://localhost:8000/add-word",
      {
        word,
      }
      // {
      //   headers: {
      //     Authorization: "MONGODB_PW",
      //   },
      // }
    )
    .then((res) => {
      console.log(res.data.message);
    })
    .catch((error) => {
      console.log(error);
    });
};

axios
  .get("https://random-word-api.herokuapp.com/all")
  .then((result) => {
    const data = result.data;
    const validWords = data.filter((word) => word.length === 5);
    return validWords;
  })
  .then(async (words) => {
    words = ["AAAAA"];
    console.log(words);
    for (const word of words) {
      await addWord(word);
    }
  })
  .catch((err) => console.log(err));
