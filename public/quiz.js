const pokemonImage = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const result = document.getElementById('result');
const score = document.getElementById('score');

let totalScore = 0;

// ランダムなポケモンのIDを生成する関数
const getRandomPokemonId = () => {
  return Math.floor(Math.random() * 1009) + 1; // 1010匹 2023/05現在;
};

// ポケモンの問題を作成する関数
const createPokemonQuestion = () => {
  const randomPokemonId = getRandomPokemonId();

  // ポケモンの名前と画像を同期的に受け取ってます(#^.^#)
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
      if (pokemonName === pokeENG) pokemonName = pokeJPN;
    }
  }

  getPokemonDataAndOverrideName();

// クイズの答えをチェックする関数
const checkAnswer = () => {
  const userGuess = guessInput.value.toLowerCase();
  guessInput.value = ''; // 入力された文字をクリア

  let points = 0;
  if (userGuess === pokemonName) {
    points = userGuess.length * (isDarkened ? 200 : 100); // 黒くなっている場合は2倍のポイント、そうでない場合は通常のポイント
    totalScore += points;
    result.textContent = `正解です！このポケモンは ${userGuess} です。獲得したポイント: ${points}`;
  } else {
    points = 300 * (isDarkened ? 2 : 1); // 黒くなっている場合は0.5倍のポイント、そうでない場合は通常のポイント
    totalScore -= points;
    if (totalScore < 0) totalScore = 0; // ポイントが負の値にならないようにする
    result.textContent = `不正解です... このポケモンは「 ${pokemonName} 」です。あなたの答えは「 ${userGuess} 」です。失ったポイント: ${points}`;
  }

  score.textContent = `総ポイントは ${totalScore}p です`;

  // 答えを提出ボタンから削除
  submitButton.removeEventListener('click', checkAnswer);
  guessInput.removeEventListener('keydown', submitOnEnter);

  // 一定時間待って次の問題を作成
  setTimeout(() => {
    result.textContent = '';
    createPokemonQuestion();
  }, 3000);
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

// 次へボタンがクリックされた時の処理
document.getElementById("submit-button").addEventListener("click", function() {
  var imageContainer = document.getElementById("pokemon-image");

  if (isDarkened) {
    // 画像がすでに黒くなっている場合、一時的に元の色に戻す
    imageContainer.classList.remove("darkened");

    // 3秒後に再び黒くする
    setTimeout(function() {
      imageContainer.classList.add("darkened");
    }, 3000);
  }
});
