// const audio = document.querySelector(".key");

"use strict";
{
  window.addEventListener("keydown", (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    console.log(audio);
    console.log(e.keyCode);
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
