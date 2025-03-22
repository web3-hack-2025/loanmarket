// Content script that runs in the context of web pages

// Listen for messages from the popup - keeping this for status reporting
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'get_status') {
    // Check if the menu items were injected
    const loanItem = document.querySelector('#sidebar-item-loan');
    const identityItem = document.querySelector('#sidebar-item-identity');
    
    if (loanItem && identityItem) {
      sendResponse({
        message: 'Menu items were successfully injected!',
        success: true
      });
    } else {
      sendResponse({
        message: 'Menu items have not been injected yet. Retrying now...',
        success: false
      });
      
      // Try to inject again
      injectMenuItems();
    }
  }
});

// Function to inject menu items under the Dashboard sidebar item
function injectMenuItems() {
  // Look for the Dashboard sidebar item
  const dashboardItem = document.querySelector('#sidebar-item-home\\.dashboard');
  
  if (dashboardItem) {
    console.log('Found Dashboard sidebar item, injecting menu items...');
    
    // Check if menu items already exist to avoid duplicates
    const existingLoanItem = document.querySelector('#sidebar-item-loan');
    const existingIdentityItem = document.querySelector('#sidebar-item-identity');
    
    if (existingLoanItem || existingIdentityItem) {
      console.log('Menu items already exist, skipping injection');
      return;
    }
    
    // Create Loan menu item
    const loanItem = createMenuItem('Loan', 'loan');
    
    // Create Identity menu item
    const identityItem = createMenuItem('Identity', 'identity');
    
    // Get the parent element of the Dashboard item
    const parentElement = dashboardItem.parentElement;
    
    // Insert the new menu items after the Dashboard item
    if (parentElement) {
      parentElement.insertBefore(identityItem, dashboardItem.nextSibling);
      parentElement.insertBefore(loanItem, dashboardItem.nextSibling);
      console.log('Menu items injected successfully!');
    } else {
      console.error('Could not find parent element of Dashboard item');
    }
  } else {
    console.error('Could not find Dashboard sidebar item, will retry later');
    
    // If the dashboard item isn't found immediately, try again after a delay
    // This handles cases where the page loads the sidebar dynamically
    setTimeout(injectMenuItems, 1000);
  }
}

// Helper function to create a menu item with the same styling as the Dashboard item
function createMenuItem(text, id) {
  // Clone the Dashboard item to maintain styling
  const dashboardItem = document.querySelector('#sidebar-item-home\\.dashboard');
  if (!dashboardItem) return null;
  
  const menuItem = dashboardItem.cloneNode(true);
  
  // Update the ID
  menuItem.id = `sidebar-item-${id}`;
  
  // Update the href
  menuItem.href = `http://localhost:5173/${id}`;
  
  // Remove the 'active' class and aria-current attribute
  menuItem.classList.remove('active');
  menuItem.removeAttribute('aria-current');
  
  // Update the text content
  const textSpan = menuItem.querySelector('span');
  if (textSpan) {
    textSpan.textContent = text;
    textSpan.classList.remove('text-primary-default');
  }
  
  // Remove the blue indicator on the right
  const indicator = menuItem.querySelector('.bg-primary-default.absolute.right-0');
  if (indicator) {
    indicator.remove();
  }
  
  // Update the SVG icon (optional: you could replace with a different icon)
  const svgContainer = menuItem.querySelector('.flex.justify-center.items-center.mr-2');
  if (svgContainer) {
    const svg = svgContainer.querySelector('svg');
    if (svg) {
      svg.classList.remove('stroke-primary-default');
    }
  }
  
  return menuItem;
}

// Example: Add a custom style to the page
function addCustomStyle() {
  chrome.storage.sync.get('isEnabled', function(data) {
    if (data.isEnabled) {
      const style = document.createElement('style');
      style.textContent = `
        .chrome-extension-highlight {
          background-color: yellow !important;
          border: 2px solid red !important;
        }
      `;
      document.head.appendChild(style);
    }
  });
}

// Function to find and replace the $0 span with $21,012
function updateDollarAmount() {
  console.log('Waiting for page to fully load...');
  
  // Wait for the page to be fully loaded
  if (document.readyState === 'complete') {
    console.log('Page is already loaded, waiting 20 seconds...');
    setTimeout(findAndReplaceAmount, 20000);
  } else {
    console.log('Waiting for page to load...');
    window.addEventListener('load', function() {
      console.log('Page loaded, waiting 20 seconds...');
      setTimeout(findAndReplaceAmount, 20000);
    });
  }
  
  function findAndReplaceAmount() {
    console.log('Searching for $0 span element...');
    // Use a more specific selector to find spans with exact $0 text content
    const spans = document.querySelectorAll('span');
    
    for (const span of spans) {
      if (span.textContent === '$0') {
        console.log('Found $0 span, replacing with $21,012');
        span.textContent = '$21,012';
        console.log('Replacement complete!');
        return;
      }
    }
    
    console.log('Could not find span with $0 content');
  }
}

// Run when the content script is injected
(function() {
  console.log('Content script loaded, injecting menu items...');
  
  // Try to inject menu items immediately
  injectMenuItems();
  
  // Run the function to update dollar amount
  updateDollarAmount();
  
  // Also set up a mutation observer to detect if the sidebar is added dynamically
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if the dashboard item exists now
        const dashboardItem = document.querySelector('#sidebar-item-home\\.dashboard');
        if (dashboardItem) {
          injectMenuItems();
        }
      }
    });
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Check with background script if the extension is enabled
  chrome.runtime.sendMessage({action: 'getStatus'}, function(response) {
    if (response && response.isEnabled) {
      addCustomStyle();
    }
  });
})();
