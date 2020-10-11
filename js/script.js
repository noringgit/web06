'use strict';


//やりたいこと
// (1)縮小画像をcanvasで張り付ける
// (2)javascriptで画像の色を取得する
// (3)取得したrgbaをランダムに選んでHTMLに表示させる


//------- canvasの準備
// canvas idのcolorの要素をcanvasに代入
// text.pngは非表示にする（CSS）
let canvas = document.getElementById('color');

//------- 描画機能が利用できるように2Dコンテキストを取得
let ctx = canvas.getContext('2d');

let imageColor = new Image();
imageColor.src = '../images/test.png';



//------- 画像が読み込まれたらデータを取得する（できた！）
imageColor.addEventListener('load', function() {
    ctx.drawImage(imageColor, 0, 0, 10, 7);
    let imageData = ctx.getImageData(0, 0, 10, 7);
    let data = imageData.data;
    console.log(data); //チェック用
    console.log(imageData); //チェック用

    // drawImageは読み込み失敗防止のため、onloadもしくはaddEventListenerを使用する
    // drawImageメソッド(描画するイメージ, sx, sy, sw, sh, dx, dy, dw, dh)
    // 単位はピクセル
    // 表示位置

    //------- 数字を4つずつに分割した配列にする（できた！）
	    const sliceByNumber = function(array, number) {
	        const length = Math.ceil(array.length / number);
	        return new Array(length).fill().map((_, i) =>
	            array.slice(i * number, (i + 1) * number));
	    };
	    // console.log(sliceByNumber(data, 4));
	    let colors = sliceByNumber(data, 4);

	    console.log(colors); //4分割にした配列を格納！



    //------- 配列からランダムで10色選択をする（できた！）

    //元の配列をコピー
	    const selected = randomSelect(colors.slice(), 10);

	    function randomSelect(array, num) {
	        let newArray = [];
	        while (newArray.length < num && colors.length > 0) {
	            const rand = Math.floor(Math.random() * colors.length);
	            newArray.push(colors[rand]);
	            colors.splice(rand, 1);
	        }
	        return newArray;
	    }

    //呼び出し
    	let answer = randomSelect(colors, 10); //選ばれた10色の配列を格納

    // 配列colorからランダムにnum個の要素を取り出す
    // 空の配列はnum（10）より小さく且つcolorの数が0より大きい
    // 配列からランダムな要素を選ぶ
    // 選んだ要素を別の配列に登録する
    // spliceでもとの配列からは削除する（ダブリ防止）
    // 配列colorに色が格納されていて、そこからrandomSelectファンクションで、10色ランダムに選んでいる



	// html上にカラーバーを表示させる
    	document.getElementById('c0').style.backgroundColor = `rgba(${answer[0]})`;
	    document.getElementById('c1').style.backgroundColor = `rgba(${answer[1]})`;
	    document.getElementById('c2').style.backgroundColor = `rgba(${answer[2]})`;
	    document.getElementById('c3').style.backgroundColor = `rgba(${answer[3]})`;
	    document.getElementById('c4').style.backgroundColor = `rgba(${answer[4]})`;
	    document.getElementById('c5').style.backgroundColor = `rgba(${answer[5]})`;
	    document.getElementById('c6').style.backgroundColor = `rgba(${answer[6]})`;
	    document.getElementById('c7').style.backgroundColor = `rgba(${answer[7]})`;
	    document.getElementById('c8').style.backgroundColor = `rgba(${answer[8]})`;
	    document.getElementById('c9').style.backgroundColor = `rgba(${answer[9]})`;
	    

    //代入する部分に「''」はいらない（おそらく仕様）



	//------- カラーバーをアニメーションさせる（できた）

		let c_animation = function() {
		  const items = document.querySelectorAll('.c_item');
		  items.forEach((item,index) => {
		    const order = index + 1;
		    const delay = order * 200;
		    console.log(item);
		    setTimeout(function() {
		      item.classList.add('appear');
		    }, delay);
		  });
		}();

// htmlの.c_itemから要素を丸ごと取得
// forEachで配列繰り返し
// setTimeoutで表示を遅延させる
// .c_itemを.appearにチェンジすることで非表示から表示にしている
// 詰まったところ⇒cssの設定で優先ポイントが、.c_item>.appearだったために表示がされなかった。
// appearのポイントを上げて解決

}); //imageColor.addEventListenerの閉じタグ