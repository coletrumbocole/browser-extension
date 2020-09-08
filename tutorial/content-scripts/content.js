console.log("content.js loaded")
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("content.js onMessage.addListener callback invoked")
  console.log("message is: ")
  console.log(request)
  console.log("sender is: ")
  console.log(sender)
  console.log("sendresponse is: ")
  console.log(sendResponse)
  $("body").prepend( // I only have access to the DOM of a page, but not its JS. My JQuery will not interact with a page's  JQuery
      `<img  src="${request.url}" id="${request.imageDivId}"
             class="slide-image" /> `
  );
  $("head").prepend(
      `<style>
        .slide-image {
            height: auto;
            width: 100vw;
        }
      </style>`
  );
  $(`#${request.imageDivId}`).click(function() {
      $(`#${request.imageDivId}`).remove(`#${request.imageDivId}`);
  });
  sendResponse({ fromcontent: "This message is from content.js" }); // the message I'm listening for comes from the extension, via popup.js, via chrome.tabs.sendMessage.
}).finally(function(){console.log("finally")});
console.log("content.js onMessage.addListener code block passed") // nevver reached because line 26 broke script. but listener still worked fine.
// do all my content scripts end up together in one file? like typically hapens with <script> in HTML? 
// I read earlier they are isolated. But isolated from each other too? I thought just isolated from page and extension. Each has its own thread. Each content script has its own thread too? I could check in Task Manager