
(function() {
  // console.log("js/background.js");

  chrome.runtime.onInstalled.addListener(function() {
    // console.log("onInstalled");
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // console.log("onMessage:", message);
  });
})();
