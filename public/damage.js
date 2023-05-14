let weight; //変数 体重
let height; //変数 身長

//関数作成
function func() {

    weight = document.getElementById('weight').value; //体重の値を取得
    height = document.getElementById('height').value; //身長の値を取得

    //入力した値が0以上の場合計算処理する
    if (parseFloat(weight) > 0 && parseFloat(height) > 0) {  //parseFloat(文字列変数)⇒数値に変換

        //BMI計算
        let bmi = weight / (height * height);

        //計算式表示
        document.getElementById("bmi_weight_value").value = weight;
        document.getElementById("bmi_height_value1").value = height;
        document.getElementById("bmi_height_value2").value = height;

        //BMI結果表示
        document.getElementById("bmi_value").value = Math.round(bmi * 100) / 100;  //小数点桁数指定で四捨五入の場合、桁数をずらしてあげる.    
    }
    //入力された値が0以上でない場合エラー
    else {
        //エラー表示
        alert("値をちゃんと入れてくれないと悲しみます(´；ω；`)ｳｩｩ...");
    }


}
