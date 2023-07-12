"use strict";
// カスタムデータ属性
// htmlはdata-から始める
// JavaScriptは要素を取得してからdataset.keyで呼び出し
// 2単語以上の場合は-を削って先頭を大文字に
// const audio = document.querySelector(".key");
// console.log(audio.dataset.key);

{
  window.addEventListener("keydown", (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    console.log(audio);
    if (!audio) {
      return;
    }
    // 再生位置を0秒に戻す（連続で押したときに反応するように）
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
  });

  function removeTransition(e) {
    // どのプロパティのイベントなのかを引数で指定しないとすべてに適用されてしまう
    // transitionendイベントのコールバック関数の引数はelapsedTimeとpropertyNameの2つ
    if (e.propertyName !== "transform") return;

    // this=e.target イベントが発生した要素
    e.target.classList.remove("playing");
    // console.log(this);  /*div .key*/
  }
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    // CSSトランジションが終了したタイミングで発火
    key.addEventListener("transitionend", removeTransition);
  });
}
