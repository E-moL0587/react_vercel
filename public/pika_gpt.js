var currentPokemonName = ""; // 現在のポケモンの名前を格納する変数

function getRandomPokemon() {
    var randomNumber = Math.floor(Math.random() * 898) + 1; // 1から898までのランダムな数を生成
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + randomNumber;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            currentPokemonName = data.name;
            var pokemonImage = data.sprites.front_default;

            document.getElementById("pokemonName").textContent = currentPokemonName;
            document.getElementById("pokemonImage").src = pokemonImage;
        });
}

function checkInput(event) {
    if (event.key === "Enter") {
        var inputName = document.getElementById("inputName").value.toLowerCase();

        if (inputName === currentPokemonName) {
            document.getElementById("inputName").value = "";
            getRandomPokemon();
        } else {
            return false; // 入力が間違っている場合は送信をキャンセル
        }
    }
}

getRandomPokemon();
