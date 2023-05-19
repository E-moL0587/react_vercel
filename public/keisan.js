function p_name(file) {
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

var ps = '';
var phy = '';
var spe = '';

function move(file1, file2) {
    var name = document.getElementById('p_name').value;
    var move = document.getElementById('p_move').value;
    var nm = 0;

    fetch(file1)
    .then(response => response.text())
    .then(data => {
        var p_move = parseCSV(data);
        for (var i = 0; i < p_move.length; i++) {
            if (move == p_move[i][0]) {
                document.getElementById("atk_data").innerHTML = '威力: '+p_move[i][1];
                document.getElementById("atype_data").innerHTML = 'タイプ: '+p_move[i][2];
                document.getElementById("ps_data").innerHTML = '分類: '+p_move[i][3];
                nm = p_move[i][1];
                ps = p_move[i][3];
                phy = p_move[1][3];
                spe = p_move[13][3];
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
                if (ps == phy) document.getElementById("sv").value = p_name[i][3];
                if (ps == spe) document.getElementById("sv").value = p_name[i][5];
                document.getElementById("mv").value = nm;
            }
        }
    })
    .catch(error => {
        console.log('ファイルの読み込みエラー:', error);
    });
}

function q_name(file) {
    var name2 = document.getElementById('q_name').value;

    fetch(file)
    .then(response => response.text())
    .then(data => {
        var q_name = parseCSV(data);
        for (var i = 0; i < q_name.length; i++) {
            if (name2 == q_name[i][1]) {
                document.getElementById("number_data2").innerHTML = '図鑑番号: '+q_name[i][0];
                document.getElementById("iv_data2").innerHTML = '種族値: '+q_name[i][2]+'-'+q_name[i][3]+'-'+q_name[i][4]+'-'+q_name[i][5]+'-'+q_name[i][6]+'-'+q_name[i][7];
                document.getElementById("type_data2").innerHTML = 'タイプ: '+q_name[i][8]+','+q_name[i][9];
                if (ps == phy) document.getElementById("sv2").value = q_name[i][4];
                if (ps == spe) document.getElementById("sv2").value = q_name[i][6];
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

    let sv2 = parseFloat(document.getElementById('sv2').value); //種族値の値を取得

    var ev2 = parseFloat(document.getElementById('ev2').value); //努力値の値を取得
    var iv2 = parseFloat(document.getElementById('iv2').value); //個体値の値を取得
    var lv2 = parseFloat(document.getElementById('lv2').value); //レベルの値を取得
    var mm2 = parseFloat(document.getElementById('mm2').value); //補正値の値を取得

    // 計算
    if (parseFloat(sv) > 0) {

        var A = Math.floor((Math.floor((sv *2+iv +Math.floor(ev /4))*lv /100)+5)*mm );
        var B = Math.floor((Math.floor((sv2*2+iv2+Math.floor(ev2/4))*lv2/100)+5)*mm2);
        var damage = Math.floor(Math.floor(Math.floor(lv*2/5+2)*mv*A/B)/50+2);
        document.getElementById("damage_value").innerHTML = '結果: '+Math.floor(damage*0.85)+'~'+Math.floor(damage*1.00)+'ダメージ';
    }

    // エラー表示
    else { alert("値が入力されていません。"); }

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
