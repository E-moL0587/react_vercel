const pokemonImage = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const score = document.getElementById('score');
const result = document.getElementById('result');

let totalScore = 0;
let level = "expert";
localStorage.setItem('level', level);

const getRandomPokemonId = () => {
  return Math.floor(Math.random() * 1010) + 1;
};

// ポケモンの問題を作成する関数
const createPokemonQuestion = () => {
  const randomPokemonId = getRandomPokemonId();

  async function getPokemonInfo(randomPokemonId) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
      const data = await response.json();

      pokemonName = data.name;
      const pokemonImageUrl = data.sprites.front_default;

      const imageElement = document.createElement('img');
      imageElement.src = pokemonImageUrl;
      imageElement.classList.add('darkened');
      pokemonImage.innerHTML = '';
      pokemonImage.appendChild(imageElement);

      var imageContainer = document.getElementById("pokemon-image");
      imageContainer.classList.add("darkened");

    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCSV() {
    const response = await fetch('pokemon_data2.csv');
    const text = await response.text();
    const lines = text.split('\n'); // 行ごとに分割します

    data = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      data.push(row);
    }
    return data;
  }

  async function getPokemonDataAndOverrideName() {
    await getPokemonInfo(randomPokemonId);
    await fetchCSV()
    for (let i = 0; i < data.length; i++) {
      var pokeENG = data[i][1]?.trim();
      var pokeJPN = data[i][2]?.trim();
      if (pokemonName === pokeENG) {
        pokemonName = pokeJPN;
        var element = document.getElementById("len");
        element.innerHTML = "このポケモンは "+ pokemonName.length + " 文字です";
      }
    }
  }
  getPokemonDataAndOverrideName();

// クイズの答えをチェックする関数
const checkAnswer = () => {
  const userGuess = guessInput.value.toLowerCase();
  guessInput.value = ''; // 入力された文字をクリア

  let points = 0;
  if (userGuess === pokemonName) {
    points = userGuess.length * 200;
    totalScore += points;
    result.textContent = `正解です！このポケモンは ${userGuess} です。獲得したポイント: ${points}p`;
  } else {
    points = 600;
    totalScore -= points;
    if (totalScore < 0) totalScore = 0; // ポイントが負の値にならないようにする
    result.textContent = `不正解です... このポケモンは「 ${pokemonName} 」です。あなたの答えは「 ${userGuess} 」です。失ったポイント: ${points}p`;
  }

  score.textContent = `総ポイントは ${totalScore}p です！`;
  
  // スコアをlocalStorageに保存
  localStorage.setItem('totalScore', totalScore.toString());

  // 答えを提出ボタンから削除
  submitButton.removeEventListener('click', checkAnswer);
  guessInput.removeEventListener('keydown', submitOnEnter);

  // 正解か不正解かに応じて待機時間を設定
  const delay = userGuess === pokemonName ? 0 : 3000;

  // 一定時間待って次の問題を作成
  var imageContainer = document.getElementById("pokemon-image");
  imageContainer.classList.remove("darkened");
  setTimeout(function() {
    imageContainer.classList.add("darkened");
    result.textContent = '';
    createPokemonQuestion();
    }, delay);
  };

  // Enterキーで答えを提出する関数
  const submitOnEnter = event => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  // 答えを提出ボタンに紐づける
  submitButton.addEventListener('click', checkAnswer);
  guessInput.addEventListener('keydown', submitOnEnter);
};

// 最初の問題を作成
createPokemonQuestion();
