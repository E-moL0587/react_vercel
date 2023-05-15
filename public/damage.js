function func() {

    let sv = Number(document.getElementById('sv').value); //種族値の値を取得
    let ev = Number(document.getElementById('ev').value); //努力値の値を取得
    let mv = Number(document.getElementById('mv').value); //技威力の値を取得
    let iv = Number(document.getElementById('iv').value); //個体値の値を取得
    let lv = Number(document.getElementById('lv').value); //レベルの値を取得
    let mm = Number(document.getElementById('mm').value); //補正値の値を取得

    //入力した値が0以上の場合計算処理する
    if (parseFloat(sv) > 0) {  //parseFloat(文字列変数)⇒数値に変換

        let A = Math.floor((Math.floor((sv*2+iv+Math.floor(ev/4))*lv/100)+5)*mm);
        let B = 189
        let damage = Math.floor(Math.floor(Math.floor(lv*2/5+2)*mv*A/B)/50+2);

        document.getElementById("damage_value0.85").value = Math.floor(damage*0.85);
        document.getElementById("damage_value1.00").value = Math.floor(damage*1.00);
    }

    // エラー表示
    else { alert("値をちゃんと入れてくれないと悲しみます(´；ω；`)ｳｩｩ..."); }
}
