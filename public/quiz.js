const pokemonImage = document.getElementById('pokemon-image');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const result = document.getElementById('result');

// ランダムなポケモンのIDを生成する関数
const getRandomPokemonId = () => {
  return Math.floor(Math.random() * 1009) + 1;
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
