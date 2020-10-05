// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import type * as vscode from 'vscode';

import { ItemType } from './ItemType';
import { ProblemsStatusBarItem } from './ProblemsStatusBarItem';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    new ProblemsStatusBarItem(ItemType.Error),
    new ProblemsStatusBarItem(ItemType.Warning),
    new ProblemsStatusBarItem(ItemType.Info),
  );
}

export { activate };
