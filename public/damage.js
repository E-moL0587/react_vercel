function func() {



    //入力した値が0以上の場合計算処理する
    if (parseFloat(sv) > 0) {  //parseFloat(文字列変数)⇒数値に変換

        let A = Math.floor((Math.floor((sv*2+iv+Math.floor(ev/4))*lv/100)+5)*mm);
        let B = 189
        let damage = Math.floor(Math.floor(Math.floor(lv*2/5+2)*mv*A/B)/50+2);

        document.getElementById("damage_value0.85").value = Math.floor(damage*0.85);
        document.getElementById("damage_value1.00").value = Math.floor(damage*1.00);
    }
    // エラー表示
    else { alert("値がない箇所があります(´；ω；`)ｳｩｩ..."); }

}

function pika() {
    let text = document.getElementById("data");
    const itemData = (text.value).split(',');
    document.getElementById("sv").value = itemData[1];
    document.getElementById("H").value = itemData[0];
    document.getElementById("A").value = itemData[1];
    document.getElementById("B").value = itemData[2];
    document.getElementById("C").value = itemData[3];
    document.getElementById("D").value = itemData[4];
    document.getElementById("S").value = itemData[5];


    var typelist = ['無','炎','水','草','鋼','電','悪','虫','毒','飛','妖','霊','竜','氷','闘','超','地','岩',''];
    var typelistlit = ['ノーマル','ほのお','みず','くさ','はがね','でんき','あく','むし','どく','ひこう','フェアリー','ゴースト','ドラゴン','こおり','かくとう','エスパー','じめん','いわ',''];

    var result = typelist.indexOf( itemData[6] );
    document.getElementById("type1").value = typelistlit[result];
    var result = typelist.indexOf( itemData[7] );
    document.getElementById("type2").value = typelistlit[result];





}

