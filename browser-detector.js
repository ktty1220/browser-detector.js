(function () {
 /*!
  * 参考: JSでのUA条件分岐便利スニペット | World Wide Web Guide
  * http://w3g.jp/blog/tools/js_browser_sniffing
  */
  var _ua = (function(){
    return {
      ltIE6:typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
      ltIE7:typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
      ltIE8:typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
      ltIE9:document.uniqueID && typeof window.matchMedia == "undefined",
      gtIE10:document.uniqueID && window.matchMedia,
      Trident:document.uniqueID,
      Gecko:'MozAppearance' in document.documentElement.style,
      Presto:window.opera,
      Blink:window.chrome,
      Webkit:typeof window.chrome == "undefined" && 'WebkitAppearance' in document.documentElement.style,
      Touch:typeof document.ontouchstart != "undefined",
      Mobile:typeof window.orientation != "undefined",
      ltAd4_4:typeof window.orientation != "undefined" && typeof(EventSource) == "undefined",
      Pointer:window.navigator.pointerEnabled,
      MSPoniter:window.navigator.msPointerEnabled
    }
  })();

  // <html>タグの現在のclassを取得
  var htmlElememnt = document.getElementsByTagName('html')[0];

  // JavaScript有効環境である事を示す
  var htmlClass = htmlElememnt.className.replace(/\bno-js\b/ig, '') + ' js';

  // ブラウザ判定
  if (_ua.Trident) {
    htmlClass += ' ie';
    var _ie = 0;
    if (_ua.ltIE6) {
      /*!
       * 参考: Attack of the IE Conditional Comment… - Ajaxian
       * http://ajaxian.com/archives/attack-of-the-ie-conditional-comment
       */
      var div = document.createElement('div');
      div.innerHTML = '<!--[if IE 6]><i></i><![endif]-->';
      if (div.getElementsByTagName('i')[0]) { _ie = 6; }
    }
    else if (_ua.ltIE7) { _ie = 7; }
    else if (_ua.ltIE8) { _ie = 8; }
    else if (_ua.ltIE9) { _ie = 9; }
    else if (_ua.gtIE10) { _ie = document.documentMode; }
    // var is_ie10 = !!window.navigator.msPointerEnabled;
    // var is_ie11 = !!window.navigator.pointerEnabled;
    if (_ie > 0) { htmlClass += ' ie' + _ie; }

    // IEx以下のクラス作成
    var ltie = '';
    for (var iev = 6; iev <= 11; iev++) { if (_ie < iev) { ltie += ' lt-ie' + iev; } }
    htmlClass += ltie;
  }
  else if (_ua.Gecko)  { htmlClass += ' gecko firefox'; }
  else if (_ua.Blink)  { htmlClass += ' blink chrome';  } // 新Operaはこちら
  else if (_ua.Presto) { htmlClass += ' presto opera';  } // このOperaは古いOpera
  else if (_ua.Webkit) { htmlClass += ' webkit safari'; }

  if (_ua.Mobile) { htmlClass += ' mobile'; } // スマホやタブレットなど
  if (_ua.Touch)  { htmlClass += ' touch';  } // デスクトップを含めたタッチ対応デバイス

  // 旧IEとそれ以外の括り
  if (/ie[678]/.test(htmlClass)) { htmlClass += ' old-ie'; }
  else { htmlClass += ' modern'; }

  // <html>タグのclassを設定
  htmlElememnt.className = htmlClass.replace(/^\s+/, '');
})();
