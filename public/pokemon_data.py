# pokeAPIで、図鑑番号,名前,種族値6つ,タイプ1,タイプ2(ない場合は'-')をカンマ区切りで所得するソースコードの具体例
import requests

def get_pokemon_data():
    url = "https://pokeapi.co/api/v2/pokemon?limit=200"  # 全国図鑑のポケモン数に合わせてリクエストURLを調整してください
    response = requests.get(url)
    data = response.json()
    pokemon_list = []

    for pokemon in data["results"]:
        pokemon_url = pokemon["url"]
        pokemon_data = requests.get(pokemon_url).json()
        pokemon_info = {
            "図鑑番号": pokemon_data["id"],
            "名前": pokemon["name"],
            "種族値": {
                "HP": pokemon_data["stats"][0]["base_stat"],
                "攻撃": pokemon_data["stats"][1]["base_stat"],
                "防御": pokemon_data["stats"][2]["base_stat"],
                "特攻": pokemon_data["stats"][3]["base_stat"],
                "特防": pokemon_data["stats"][4]["base_stat"],
                "素早さ": pokemon_data["stats"][5]["base_stat"]
            },
            "タイプ1": pokemon_data["types"][0]["type"]["name"],
            "タイプ2": pokemon_data["types"][1]["type"]["name"] if len(pokemon_data["types"]) > 1 else "-"
        }
        pokemon_list.append(pokemon_info)

    return pokemon_list

all_pokemon_data = get_pokemon_data()

# ファイルに出力する
filename = "pokemon_data.csv"
with open(filename, "w", encoding="utf-8") as file:
    file.write("図鑑番号,名前,HP,攻撃,防御,特攻,特防,素早さ,タイプ1,タイプ2\n")
    for pokemon in all_pokemon_data:
        stats = pokemon["種族値"]
        file.write(f"{pokemon['図鑑番号']},{pokemon['名前']},{stats['HP']},{stats['攻撃']},{stats['防御']},{stats['特攻']},{stats['特防']},{stats['素早さ']},{pokemon['タイプ1']},{pokemon['タイプ2']}\n")

print(f"ポケモンデータを {filename} に出力しました。")
