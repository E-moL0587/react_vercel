function calculate() {
    // 入力値の取得
    var value1 = parseFloat(document.getElementById('value1').value);
    var value2 = parseFloat(document.getElementById('value2').value);
    
    // 計算
    var result = value1 + value2;
    
    // 結果の表示
    document.getElementById('result').innerHTML = "結果: " + result;
}