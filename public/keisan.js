function n_name(file) {
    var name = document.getElementById('p_name').value;

    fetch(file)
    .then(response => response.text())
    .then(data => {
        var p_name = parseCSV(data);
        for (var i = 0; i < p_name.length; i++) {
            if (name == p_name[i][1]) {
                document.getElementById("number_data").innerHTML = '図鑑番号: '+p_name[i][0];
                document.getElementById("iv_data").innerHTML = '種族値: '+p_name[i][2]+'-'+p_name[i][3]+'-'+p_name[i][4]+'-'+p_name[i][5]+'-'+p_name[i][6]+'-'+p_name[i][7];
                document.getElementById("type_data").innerHTML = 'タイプ: '+p_name[i][8]+','+p_name[i][9];
            }
        }
    })
    .catch(error => {
        console.log('ファイルの読み込みエラー:', error);
    });
}

function move(file1, file2) {
    var name = document.getElementById('p_name').value;
    var move = document.getElementById('p_move').value;

    let meg = '';
    let num = 0;

    fetch(file1)
    .then(response => response.text())
    .then(data => {
        var p_move = parseCSV(data);
        for (var i = 0; i < p_move.length; i++) {
            if (move == p_move[i][0]) {
                meg = p_move[i][1];
                num = p_move[i][2];
            }
        }
    })
    .catch(error => {
        console.log('ファイルの読み込みエラー:', error);
    });

    fetch(file2)
    .then(response => response.text())
    .then(data => {
        var p_name = parseCSV(data);
        for (var i = 0; i < p_name.length; i++) {
            if (name == p_name[i][1]) {
                if (meg == '物理') document.getElementById("sv").value = p_name[i][3];
                if (meg == '特殊') document.getElementById("sv").value = p_name[i][5];
                document.getElementById("mv").value = num;
            }
        }
    })
    .catch(error => {
        console.log('ファイルの読み込みエラー:', error);
    });
}

function cal() {
    let sv = parseFloat(document.getElementById('sv').value); //種族値の値を取得
    let mv = parseFloat(document.getElementById('mv').value); //技威力の値を取得

    var ev = parseFloat(document.getElementById('ev').value); //努力値の値を取得
    var iv = parseFloat(document.getElementById('iv').value); //個体値の値を取得
    var lv = parseFloat(document.getElementById('lv').value); //レベルの値を取得
    var mm = parseFloat(document.getElementById('mm').value); //補正値の値を取得

    // 計算
    if (parseFloat(sv) > 0) {  //parseFloat(文字列変数)⇒数値に変換

        var A = Math.floor((Math.floor((sv*2+iv+Math.floor(ev/4))*lv/100)+5)*mm);
        var B = 189
        var damage = Math.floor(Math.floor(Math.floor(lv*2/5+2)*mv*A/B)/50+2);

        document.getElementById("damage_value").innerHTML = Math.floor(damage*0.85)+"~"+Math.floor(damage*1.00);
    }

    // エラー表示
    else { alert("値がない箇所があります(´；ω；`)ｳｩｩ..."); }

}





function parseCSV(csv) {
    var lines = csv.split("\n");
    var data = [];

    for (var i = 0; i < lines.length; i++) {
      var cells = lines[i].split(",");
      data.push(cells);
    }

    return data;
  }
