chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("cole was here")
  console.log("cwh request was: ")
  console.log(request)
})