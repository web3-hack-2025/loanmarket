// Popup script that runs when the popup is opened

document.addEventListener('DOMContentLoaded', function() {
  // Get reference to the button and result div
  const actionButton = document.getElementById('actionButton');
  const resultDiv = document.getElementById('result');
  
  // Function to check the status of menu injection
  function checkInjectionStatus() {
    // Get the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const activeTab = tabs[0];
      
      // Update button text to show it's checking
      actionButton.textContent = 'Checking...';
      
      // Send a message to the content script to get the status
      chrome.tabs.sendMessage(activeTab.id, {"message": "get_status"}, function(response) {
        // Reset button text
        actionButton.textContent = 'Check Status';
        
        if (response && response.message) {
          resultDiv.textContent = response.message;
          resultDiv.style.color = response.success ? '#4CAF50' : '#FF9800'; // Green for success, orange for pending
        } else {
          resultDiv.textContent = 'Error: Could not check injection status. Make sure you are on the correct page.';
          resultDiv.style.color = '#F44336'; // Red color for error
        }
        
        // Store the last check time
        chrome.storage.sync.set({lastChecked: new Date().toISOString()}, function() {
          console.log('Timestamp saved');
        });
      });
    });
  }
  
  // Add click event listener to the button
  actionButton.addEventListener('click', checkInjectionStatus);
  
  // Check status automatically when popup opens
  checkInjectionStatus();
  
  // Check if we have stored data
  chrome.storage.sync.get('lastChecked', function(data) {
    if (data.lastChecked) {
      const date = new Date(data.lastChecked);
      const statusInfo = document.createElement('div');
      statusInfo.textContent = 'Last checked: ' + date.toLocaleString();
      statusInfo.style.fontSize = '11px';
      statusInfo.style.marginTop = '8px';
      statusInfo.style.color = '#666';
      resultDiv.appendChild(statusInfo);
    }
  });
});
