# Chrome Extension Template

A basic template for building Chrome extensions using Manifest V3.

## Features

- Popup UI with HTML, CSS, and JavaScript
- Background service worker
- Content script for interacting with web pages
- Chrome storage API integration
- Message passing between components

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" and select the extension directory

## Structure

- `manifest.json`: Configuration file for the extension
- `popup.html`: HTML for the extension popup
- `popup.js`: JavaScript for the popup functionality
- `background.js`: Background service worker script
- `content.js`: Content script that runs in the context of web pages
- `styles.css`: CSS styles for the popup
- `icons/`: Directory containing extension icons

## Development

To make changes to the extension:

1. Edit the files as needed
2. Go to `chrome://extensions/` and click the refresh icon on your extension
3. If you're working on the background script, you may need to click "service worker" link to see console logs

## License

[MIT License](LICENSE)
