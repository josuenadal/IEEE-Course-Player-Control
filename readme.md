# IEEE Course Player Control
- working as of February 5, 2026

A small Firefox browser extension that enhances your learning experience by allowing you to control the IEEE course player using keyboard shortcuts.
| Control | Key |
|--------|-----|
| Seek Back | F1 |
| Toggle Play | F2 |
| Seek Forward | F3 | 

## Features
- Keyboard Control: Navigate video lectures with simple key presses.
  - You can change the keys to whatever firefox supports: [https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands)
- Easy to Use: Once installed, the shortcuts work immediately on IEEE course pages.

## Installation (as a Temporary Add-on)

Since this extension is not yet published on Mozilla's official add-on site, you can install it temporarily for testing and development:
- Clone or download this repository to your computer.
- Open Firefox and navigate to [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) (or just copy n paste it into the browser).
- Navigate to the folder where you saved the extension files and select manifest.json.
- The extension is now installed and active until you restart Firefox.