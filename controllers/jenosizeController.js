const config = require("../config");
const axios = require("axios");
const getShop = async (req, res, next) => {
  return res.json({
    shop: [
      {
        name: "name123",
      },
      {
        name: "name2",
      },
      {
        name: "name3",
      },
    ],
  });
};
const searchPlace = async (req, res) => {
  const { location, keyword } = req.query;

  try {
    const response = await axios.get(config.googleConfig.PlacesApi, {
      params: {
        key: config.googleConfig.apiKey,
        query: `restaurants in ${location}`,
        keyword: keyword,
      },
    });

    const restaurants = response.data.results;
    res.json(restaurants);
  } catch (error) {
    console.error("Error searching restaurants:", error.message);
    res.status(500).json({ error: "Error searching restaurants" });
  }
};
const gameNumber24 = async (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers) || numbers.length !== 4) {
    return res
      .status(400)
      .json({ error: "Invalid input. Please provide an array of 4 numbers." });
  }

  const isValidInput = numbers.every(
    (num) => Number.isInteger(num) && num >= 1 && num <= 9
  );
  if (!isValidInput) {
    return res
      .status(400)
      .json({
        error: "Invalid input. Please provide four digits ranging from 1 to 9.",
      });
  }

  const result = checkGame24(numbers);
  res.json({ result: result ? "YES" : "NO" });
};
const checkGame24 = (numbers) => {
  if (numbers.length === 1) {
    return Math.abs(numbers[0] - 24) < Number.EPSILON;
  }

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) {
        const remainingNumbers = numbers.filter(
          (_, index) => index !== i && index !== j
        );
        const operations = [
          numbers[i] + numbers[j],
          numbers[i] - numbers[j],
          numbers[i] * numbers[j],
          numbers[i] / numbers[j],
        ];

        for (const operationResult of operations) {
          if (checkGame24([...remainingNumbers, operationResult])) {
            return true;
          }
        }
      }
    }
  }

  return false;
};
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
const getBoardGameXO = async (req, res) => {
  res.json({ board });
};
const postMove = async (req, res) => {
  const { player, row, col } = req.body;

  if (board[row][col] !== '' || !['X', 'O'].includes(player)) {
    return res.status(400).json({ error: 'Invalid move.' });
  }

  board[row][col] = player;

  if (checkWin(player)) {
    return res.json({ message: `${player} wins!`, board });
  }

  if (checkDraw()) {
    return res.json({ message: 'It\'s a draw!', board });
  }

  botMove();

  if (checkWin('O')) {
    return res.json({ message: 'Bot wins!', board });
  }

  if (checkDraw()) {
    return res.json({ message: 'It\'s a draw!', board });
  }

  res.json({ message: 'Next player\'s turn', board });
};
const botMove = () => {
  let emptyCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];
    board[row][col] = 'O';
  }
}
const checkWin = (player) => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return true;
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return true;
  }

  return false;
}
const checkDraw = () => {
  return board.flat().every(cell => cell !== '');
}

module.exports = {
  getShop,
  searchPlace,
  gameNumber24,
  getBoardGameXO,
  postMove
};
