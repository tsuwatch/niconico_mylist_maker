var parentId = chrome.contextMenus.create({
  "title": "選択した動画を作成するマイリストに追加する",
  "type": "normal",
  "contexts": ["link"],
  "onclick": addNicovideo()
});

function addNicovideo() {
  return function(info, tab) {
    if (info.linkUrl.match(new RegExp("https?:\/\/.*(?:nicovideo\.jp|nico\.ms).*\/(sm[0-9]+)"))) {
      videoId = RegExp.$1;
      var key = localStorage.length;
      localStorage.setItem(key, videoId);
    } else {
      alert('ニコニコ動画の動画ではないか，未対応のURLです');
    }
  }
}
