import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Shell } from '~/components/react/Terminal/Shell';
import { resetShellStore } from '~/components/react/Terminal/store';

const typeAndEnter = async (user: ReturnType<typeof userEvent.setup>, text: string) => {
  const input = screen.getByLabelText('terminal input');

  await user.click(input);
  await user.type(input, text);
  await user.keyboard('{Enter}');
};

describe('Shell', () => {
  beforeEach(() => {
    resetShellStore();
  });

  it('mounts with the welcome banner', () => {
    render(<Shell />);

    expect(screen.getByText(/chadlefort\.com shell ready/i)).toBeInTheDocument();
    expect(screen.getByText(/type 'help' for commands/i)).toBeInTheDocument();
  });

  it('echoes the typed command and prints help output', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'help');

    expect(screen.getByText('available commands:')).toBeInTheDocument();
    expect(screen.getByText(/ls \[-la\] \[path\]/)).toBeInTheDocument();
  });

  it('whoami returns chad with title', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'whoami');

    expect(screen.getByText(/Senior Frontend Engineer from Mandeville, LA/i)).toBeInTheDocument();
  });

  it('echo prints the trailing argument', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'echo hello world');

    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('ls renders the virtual filesystem entries', async () => {
    const user = userEvent.setup();

    const { container } = render(<Shell />);

    await typeAndEnter(user, 'ls');

    expect(within(container).getByText('ABOUT.md')).toBeInTheDocument();
    expect(within(container).getByText('README.md')).toBeInTheDocument();
    expect(within(container).getByText('projects/')).toBeInTheDocument();
  });

  it('cd updates pwd', async () => {
    const user = userEvent.setup();

    render(<Shell />);

    await typeAndEnter(user, 'cd projects');
    await typeAndEnter(user, 'pwd');

    // pwd echoes once; status pills also render the path, so allow multiple matches.
    expect(screen.getAllByText('~/development/chadlefort.com/projects').length).toBeGreaterThan(0);
  });

  it('cat ABOUT.md renders the markdown body', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'cat ABOUT.md');

    expect(screen.getByText('Chad Lefort')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('clear empties the output', async () => {
    const user = userEvent.setup();

    render(<Shell />);

    await typeAndEnter(user, 'help');
    expect(screen.getByText('available commands:')).toBeInTheDocument();

    await typeAndEnter(user, 'clear');
    expect(screen.queryByText('available commands:')).not.toBeInTheDocument();
  });

  it('unknown commands suggest the closest match', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'lx');

    expect(screen.getByText(/lx: command not found\. did you mean 'ls'\?/)).toBeInTheDocument();
  });

  it('tab completes a partial command name', async () => {
    const user = userEvent.setup();

    render(<Shell />);

    const input = screen.getByLabelText('terminal input') as HTMLInputElement;

    await user.click(input);
    await user.type(input, 'ec');
    await user.keyboard('{Tab}');

    expect(input.value).toBe('echo ');
  });

  it('arrow-up recalls the previous command', async () => {
    const user = userEvent.setup();

    render(<Shell />);

    await typeAndEnter(user, 'whoami');

    const input = screen.getByLabelText('terminal input') as HTMLInputElement;

    await user.click(input);
    await user.keyboard('{ArrowUp}');

    expect(input.value).toBe('whoami');
  });

  it('git status reflects the status-line counts', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'git status');

    expect(screen.getByText(/On branch feat\/redesign/)).toBeInTheDocument();
    expect(screen.getByText(/modified:\s+ABOUT\.md/)).toBeInTheDocument();
    expect(screen.getByText(/modified:\s+skills\.json/)).toBeInTheDocument();
    expect(screen.getByText(/2 files changed, \d+ insertions\(\+\), 0 deletions\(-\)/)).toBeInTheDocument();
  });

  it('ctrl+l clears the output', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'help');
    expect(screen.getByText('available commands:')).toBeInTheDocument();

    const input = screen.getByLabelText('terminal input');

    await user.click(input);
    await user.keyboard('{Control>}l{/Control}');

    expect(screen.queryByText('available commands:')).not.toBeInTheDocument();
  });

  it('neofetch prints fastfetch-style header', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'neofetch');

    expect(screen.getByText(/chad@chadlefort\.com/)).toBeInTheDocument();
    expect(screen.getByText(/Title: Senior Frontend Engineer/)).toBeInTheDocument();
  });

  it('contact lists email and primary socials', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'contact');

    expect(screen.getByText(/email\s+chad@chadlefort\.com/)).toBeInTheDocument();
    expect(screen.getByText(/github\s+https:\/\/github\.com\/ChadLefort/)).toBeInTheDocument();
  });

  it('socials lists every social link', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'socials');

    expect(screen.getByText(/github\s+https:\/\/github\.com\/ChadLefort/)).toBeInTheDocument();
    expect(screen.getByText(/bluesky\s+https:\/\/bsky\.app/)).toBeInTheDocument();
  });

  it('vim quip resets after :q!', async () => {
    const user = userEvent.setup();

    render(<Shell />);
    await typeAndEnter(user, 'vim');
    await typeAndEnter(user, ':q!');

    expect(screen.getByText(/wrote 0 bytes\. you escaped/)).toBeInTheDocument();
  });

  it('history persists across remounts via the store', async () => {
    const user = userEvent.setup();

    const { unmount } = render(<Shell />);

    await typeAndEnter(user, 'echo persisted');
    unmount();

    render(<Shell />);

    expect(screen.getByText('persisted')).toBeInTheDocument();
  });
});
