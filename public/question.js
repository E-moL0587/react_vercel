const pokemonImage = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const result = document.getElementById('result');
const score = document.getElementById('score');

let totalScore = 0;

// ランダムなポケモンのIDを生成する関数
const getRandomPokemonId = () => {
  var randomNumber;
  var excludedNumbers = [0, 10158, 10159, 10160, 10192, 10264, 10265, 10266, 10267, 10268, 10269, 10270, 10271]; // 除外したい数字のリスト

  do {
    var range = Math.floor(Math.random() * 2);
    if (range === 0) {
      randomNumber = Math.floor(Math.random() * 1010);
    } else {
      randomNumber = Math.floor(Math.random() * 270) + 10001;
    }
  } while (excludedNumbers.includes(randomNumber));

  return randomNumber;
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

      // 画像を表示
      const imageElement = document.createElement('img');
      imageElement.src = pokemonImageUrl;
      pokemonImage.innerHTML = '';
      pokemonImage.appendChild(imageElement);

    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCSV() {
    const response = await fetch('pokemon_data2.csv'); // CSVファイルのURLを指定します
    const text = await response.text();
    const lines = text.split('\n'); // 行ごとに分割します

    data = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(','); // カンマで区切られたデータを取得します
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
    points = userGuess.length * (isDarkened ? 200 : 100);
    totalScore += points;
    result.textContent = `正解です！このポケモンは ${userGuess} です。獲得したポイント: ${points}p`;
  } else {
    points = 300 * (isDarkened ? 2 : 1);
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




  
// 次へボタンがクリックされた時の処理
function handleButtonClick() {
  var imageContainer = document.getElementById("pokemon-image");

  const delay = userGuess === pokemonName ? 500 : 3000;

  if (isDarkened) {
    // 画像がすでに黒くなっている場合、一時的に元の色に戻す
    imageContainer.classList.remove("darkened");

    // 3秒後に再び黒くする
    setTimeout(function() {
      imageContainer.classList.add("darkened");
    }, delay);
  }
}

document.getElementById("submit-button").addEventListener("click", handleButtonClick);

// エンターキーが押された時の処理
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    handleButtonClick();
  }
});







  // 正解か不正解かに応じて待機時間を設定
  const delay = userGuess === pokemonName ? 500 : 3000;

  // 一定時間待って次の問題を作成
  setTimeout(() => {
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

var isDarkened = false; // 画像が黒くなっているかどうかのフラグ

// ボタンがクリックされた時の処理
document.getElementById("myButton").addEventListener("click", function() {
  var imageContainer = document.getElementById("pokemon-image");

  if (isDarkened) {
    // 画像がすでに黒くなっている場合、元の色に戻す
    imageContainer.classList.remove("darkened");
    isDarkened = false;
  } else {
    // 画像がまだ黒くなっていない場合、黒くする
    imageContainer.classList.add("darkened");
    isDarkened = true;
  }
});

