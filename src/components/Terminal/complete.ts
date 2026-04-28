export const COMMANDS = [
  'ls',
  'la',
  'll',
  'cd',
  'cat',
  'pwd',
  'tree',
  'open',
  'whoami',
  'echo',
  'date',
  'history',
  'clear',
  'help',
  'contact',
  'socials',
  'neofetch',
  'fastfetch'
];

const editDistance = (a: string, b: string): number => {
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }

  return dp[a.length][b.length];
};

export const closestCommand = (cmd: string): string | null => {
  const candidates = COMMANDS.map((c) => ({ c, d: editDistance(cmd, c) })).sort((a, b) => a.d - b.d);

  return candidates[0] && candidates[0].d <= 2 ? candidates[0].c : null;
};

export const findCommonPrefix = (matches: string[]): string => {
  if (matches.length === 0) return '';

  let common = matches[0];

  for (const m of matches.slice(1)) {
    let i = 0;

    while (i < common.length && i < m.length && common[i].toLowerCase() === m[i].toLowerCase()) i += 1;

    common = common.slice(0, i);
  }

  return common;
};
