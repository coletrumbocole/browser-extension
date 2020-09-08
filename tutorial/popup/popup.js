// all of this runs in popup window, in extension, not on browswer tab
const sendMessageId = document.getElementById('sendMessageId') // at what point does js move to the next line? Will this continue in the background? If I remember right, only IO -ish things happen asynchronously. finding something in the DOM seems like a UI (main) thread kind of thing, not an IO thing. But how can I be sure?
// these don't show up in console of a regular tab, only in console of extension's popup
// console.log("sendMessageId is: ")
// console.log(sendMessageId)
if (sendMessageId) {
  sendMessageId.onclick = function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          url: chrome.extension.getURL("images/stars.jpeg"),
          imageDivId: `${guidGenerator()}`,
          tabId: tabs[0].id
        },
        {},
        function(response) {
          console.log("got response from content.js: " + response)
          window.close();
        }
      );
      function guidGenerator() {
        const S4 = function () {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
      }
    });
  };
}