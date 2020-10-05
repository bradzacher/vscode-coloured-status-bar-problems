/*
Most of this code is based off of the implementation in vscode:
https://github.com/microsoft/vscode/blob/7cc88f5caa54026ab5baf2445349b0d45417f1b2/src/vs/workbench/contrib/markers/browser/markers.contribution.ts#
*/

import * as vscode from 'vscode';

import { getConfig } from './getConfig';
import { ItemType } from './ItemType';

type MarkerStatistics = {
  errors: number;
  warnings: number;
  infos: number;
  unknowns: number;
};

type ItemText = {
  text: string;
  shown: boolean;
  count: number;
};

// The default problems item is priority 50: https://github.com/microsoft/vscode/blob/7cc88f5caa54026ab5baf2445349b0d45417f1b2/src/vs/workbench/contrib/markers/browser/markers.contribution.ts#L288
// so we setup to display these items slightly to the left of it
const BASE_PRIORITY = 50;
const PRIORITY: Readonly<Record<ItemType, number>> = {
  [ItemType.Error]: BASE_PRIORITY + 0.3,
  [ItemType.Warning]: BASE_PRIORITY + 0.2,
  [ItemType.Info]: BASE_PRIORITY + 0.1,
};

class ProblemsStatusBarItem {
  private statusBarItem: vscode.StatusBarItem;
  private readonly interval: NodeJS.Timeout;
  private readonly type: ItemType;

  public constructor(type: ItemType) {
    this.type = type;
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      PRIORITY[this.type],
    );
    this.statusBarItem.command = 'workbench.actions.view.toggleProblems';

    this.interval = setInterval(() => this.refreshUI(), 2000);
    vscode.languages.onDidChangeDiagnostics(() => this.refreshUI());

    this.refreshUI();
  }

  public dispose(): void {
    this.statusBarItem.dispose();
    clearInterval(this.interval);
  }

  private refreshUI(): void {
    const diagnostics = vscode.languages.getDiagnostics();
    const stats: MarkerStatistics = {
      errors: 0,
      warnings: 0,
      infos: 0,
      unknowns: 0,
    };
    diagnostics.forEach(([_, diags]) => {
      diags.forEach(diag => {
        switch (diag.severity) {
          case vscode.DiagnosticSeverity.Error:
            stats.errors += 1;
            break;

          case vscode.DiagnosticSeverity.Warning:
            stats.warnings += 1;
            break;

          case vscode.DiagnosticSeverity.Information:
            stats.infos += 1;
            break;

          default:
            stats.unknowns += 1;
        }
      });
    });

    this.statusBarItem.tooltip = this.getTooltip(stats);
    const { text, shown, count } = this.getDisplayOptions(stats);
    this.statusBarItem.text = text;

    // hide the item as appropriate
    if (shown) {
      this.statusBarItem.show();
    } else {
      this.statusBarItem.hide();
    }

    const config = getConfig();

    // only colour the item if there are items for it
    if (count > 0) {
      this.statusBarItem.color = config[this.type].active;
    } else {
      this.statusBarItem.color = config[this.type].empty;
    }
  }

  private getTooltip(stats: MarkerStatistics): string {
    const titles: Array<string> = [];

    if (stats.errors > 0) {
      titles.push(`${stats.errors} Errors`);
    }

    if (stats.warnings > 0) {
      titles.push(`${stats.warnings} Warnings`);
    }

    if (stats.infos > 0) {
      titles.push(`${stats.infos} Infos`);
    }

    if (titles.length === 0) {
      return 'No Problems';
    }

    return titles.join(', ');
  }

  private getDisplayOptions(stats: MarkerStatistics): ItemText {
    switch (this.type) {
      case ItemType.Error:
        return {
          text: `$(error) ${this.packNumber(stats.errors)}`,
          shown: true,
          count: stats.errors,
        };

      case ItemType.Warning:
        return {
          text: `$(warning) ${this.packNumber(stats.warnings)}`,
          shown: true,
          count: stats.warnings,
        };

      case ItemType.Info:
        return {
          text: `$(info) ${this.packNumber(stats.infos)}`,
          shown: stats.infos > 0,
          count: stats.infos,
        };

      default:
        throw new Error('Unexpected item type.');
    }
  }

  private packNumber(n: number): string {
    if (n > 9999) {
      return '10k+';
    }

    if (n > 999) {
      return `${n.toString().charAt(0)}K`;
    }

    return n.toString();
  }
}

export { ProblemsStatusBarItem };
