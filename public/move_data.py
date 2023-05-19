import requests

def get_move_data():
    url = "https://pokeapi.co/api/v2/move?limit=50"  # 取得する技の数に合わせてリクエストURLを調整してください
    response = requests.get(url)
    data = response.json()
    move_list = []

    for move in data["results"]:
        move_url = move["url"]
        move_data = requests.get(move_url).json()
        move_info = {
            "技名": move["name"],
            "威力": move_data["power"] if move_data["power"] else "-",
            "タイプ": move_data["type"]["name"]
        }
        move_list.append(move_info)

    return move_list

all_move_data = get_move_data()

# ファイルに出力する
filename = "move_data.csv"
with open(filename, "w", encoding="utf-8") as file:
    file.write("技名,威力,タイプ\n")
    for move in all_move_data:
        file.write(f"{move['技名']},{move['威力']},{move['タイプ']}\n")

print(f"技データを {filename} に出力しました。")
