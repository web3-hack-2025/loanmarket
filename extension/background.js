// Background script that runs in the background

// Listen for installation
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension installed');
  
  // Initialize storage with default values
  chrome.storage.sync.set({
    isEnabled: true,
    lastClicked: null
  }, function() {
    console.log('Default settings saved');
  });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getStatus') {
    chrome.storage.sync.get('isEnabled', function(data) {
      sendResponse({isEnabled: data.isEnabled});
    });
    return true; // Required for async sendResponse
  }
});
