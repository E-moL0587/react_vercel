function p_name() {
    var name = document.getElementById('p_name').value;
    if (name == "ガブリアス") document.getElementById("sv").value = 130;
}

function move() {
    var move = document.getElementById('move').value;
    if (move == "ストーンエッジ") document.getElementById("mv").value = 100;
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