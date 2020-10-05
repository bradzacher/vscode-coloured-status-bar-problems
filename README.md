# vscode-coloured-status-bar-problems

[![version](https://vsmarketplacebadge.apphb.com/version-short/bradzacher.vscode-coloured-status-bar-problems.svg)](https://marketplace.visualstudio.com/items?itemName=bradzacher.vscode-coloured-status-bar-problems)
[![installs](https://vsmarketplacebadge.apphb.com/installs-short/bradzacher.vscode-coloured-status-bar-problems.svg)](https://marketplace.visualstudio.com/items?itemName=bradzacher.vscode-coloured-status-bar-problems)
[![rating](https://vsmarketplacebadge.apphb.com/rating-short/bradzacher.vscode-coloured-status-bar-problems.svg)](https://marketplace.visualstudio.com/items?itemName=bradzacher.vscode-coloured-status-bar-problems)

Adds simple coloured statusbar items mirroring the style of the base vscode statusbar icons.

![Demo showing icons](https://raw.githubusercontent.com/bradzacher/vscode-coloured-status-bar-problems/master/screenshot.png)

## Usage

When the extension is installed, the icons will be displayed on the lower left hand corner.

After installing this extension, you should turn off the default item by right clicking on it and selecting "Hide 'Problems'" from the menu.

## Options

By default the extension will use your theme's error/warning/info colours to colour the items.

You can override this using one of the options:

- The colour when there is at least one problem of the type:
  - `coloured-status-bar-problems.colour.error.active` (defaults to your theme's `problemsErrorIcon.foreground` colour).
  - `coloured-status-bar-problems.colour.warning.active` (defaults to your theme's `problemsWarningIcon.foreground` colour).
  - `coloured-status-bar-problems.colour.info.active` (defaults to your theme's `problemsInfoIcon.foreground` colour).
- The colour when there are **no** problems of the type (defaults to your theme's default status bar text colour):
  - `coloured-status-bar-problems.colour.error.none`
  - `coloured-status-bar-problems.colour.warning.none`
  - `coloured-status-bar-problems.colour.info.none`
