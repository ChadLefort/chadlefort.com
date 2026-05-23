import { expect, type Page } from '@playwright/test';

export const terminalLocator = (page: Page) => page.getByLabel('Terminal', { exact: true });

export const waitForTerminalReady = async (page: Page) => {
  await page.goto('/');
  const terminal = terminalLocator(page);

  await expect(terminal).toBeVisible();
  await expect(terminal.getByText('clefort').first()).toBeVisible();

  return terminal;
};

export const maximizeTerminal = async (page: Page) => {
  await waitForTerminalReady(page);
  await page.getByRole('button', { name: 'Maximize terminal (interactive shell)' }).click();
  await expect(page.getByText(/chadlefort\.com shell ready/i)).toBeVisible();

  const input = page.getByLabel('terminal input');
  await expect(input).toBeVisible();

  return input;
};
