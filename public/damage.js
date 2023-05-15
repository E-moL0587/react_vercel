let sv;
let iv;
let lv;

//関数作成
function func() {

    sv = document.getElementById('sv').value; //種族値の値を取得
    iv = document.getElementById('iv').value; //個体値の値を取得
    lv = document.getElementById('lv').value; //レベルの値を取得

    //入力した値が0以上の場合計算処理する
    if (parseFloat(sv) > 0) {  //parseFloat(文字列変数)⇒数値に変換

        //BMI計算
        let damage = sv;

        //計算式表示
        document.getElementById("damage_value").value = Math.round(damage * 100) / 100;  //小数点桁数指定で四捨五入の場合、桁数をずらしてあげる.    
    }

    // エラー表示
    else { alert("値をちゃんと入れてくれないと悲しみます(´；ω；`)ｳｩｩ..."); }
}
