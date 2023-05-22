
const pokemonImage = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const result = document.getElementById('result');

// ランダムなポケモンのIDを生成する関数
const getRandomPokemonId = () => {
  // return Math.floor(Math.random() * 1009) + 1;
  return Math.floor(Math.random() * 151) + 1;
};

// ポケモンの問題を作成する関数
const createPokemonQuestion = () => {
  const randomPokemonId = getRandomPokemonId();

  // PokeAPIからランダムなポケモンの情報を取得
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
    .then(response => response.json())
    .then(data => {
      const pokemonName = data.name;
      const pokemonImageUrl = data.sprites.front_default;

      // 画像を表示
      const imageElement = document.createElement('img');
      imageElement.src = pokemonImageUrl;
      pokemonImage.innerHTML = '';
      pokemonImage.appendChild(imageElement);

      // クイズの答えをチェックする関数
      const checkAnswer = () => {
        const userGuess = guessInput.value.toLowerCase();
        guessInput.value = ''; // 入力された文字をクリア

        if (userGuess === pokemonName) {
          result.textContent = `正解です！このポケモンは ${userGuess} です。`;
        } else {
          result.textContent = `不正解です... このポケモンは「 ${pokemonName} 」です。あなたの答えは「 ${userGuess} 」です。`;
        }

        // 答えを提出ボタンから削除
        submitButton.removeEventListener('click', checkAnswer);
        guessInput.removeEventListener('keydown', submitOnEnter);

        // 一定時間待って次の問題を作成
        setTimeout(() => {
          result.textContent = '';
          createPokemonQuestion();
        }, 5000);
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
    })
    .catch(error => console.log(error));
};

// 最初の問題を作成
createPokemonQuestion();
