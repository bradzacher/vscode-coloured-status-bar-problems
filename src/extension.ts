// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ProblemsStatusBarItem, ItemType } from './ProblemsStatusBarItem';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    new ProblemsStatusBarItem(ItemType.Error),
    new ProblemsStatusBarItem(ItemType.Warning),
    new ProblemsStatusBarItem(ItemType.Info),
  );
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
function deactivate(): void {}

export { activate, deactivate };
