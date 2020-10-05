import { ThemeColor, workspace } from 'vscode';

import { ItemType } from './ItemType';

type Config = {
  [ItemType.Error]: {
    active: string | ThemeColor;
    empty: string | ThemeColor | undefined;
  };
  [ItemType.Warning]: {
    active: string | ThemeColor;
    empty: string | ThemeColor | undefined;
  };
  [ItemType.Info]: {
    active: string | ThemeColor;
    empty: string | ThemeColor | undefined;
  };
};

function orDefault(
  input: string | undefined,
  defaultValue: ThemeColor,
): string | ThemeColor {
  if (input == null || input.length === 0) {
    return defaultValue;
  }
  return input;
}

function getDefaultColours(): Readonly<Record<ItemType, ThemeColor>> {
  return {
    [ItemType.Error]: new ThemeColor('problemsErrorIcon.foreground'),
    [ItemType.Warning]: new ThemeColor('problemsWarningIcon.foreground'),
    [ItemType.Info]: new ThemeColor('problemsInfoIcon.foreground'),
  };
}
function getConfig(): Config {
  const config = workspace.getConfiguration('coloured-status-bar-problems');

  const defaults = getDefaultColours();
  const colours = {
    [ItemType.Error]: {
      active: orDefault(
        config.get<string>('colour.error.active'),
        defaults[ItemType.Error],
      ),
      empty: config.get<string>('colour.error.none'),
    },
    [ItemType.Warning]: {
      active: orDefault(
        config.get<string>('colour.warning.active'),
        defaults[ItemType.Warning],
      ),
      empty: config.get<string>('colour.warning.none'),
    },
    [ItemType.Info]: {
      active: orDefault(
        config.get<string>('colour.info.active'),
        defaults[ItemType.Info],
      ),
      empty: config.get<string>('colour.info.none'),
    },
  };

  return colours;
}

export { getConfig };
export type { Config };
