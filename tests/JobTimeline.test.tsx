import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { JobTimeline } from '~/components/react/JobTimeline';
import type { Job } from '~/data/jobs';

const jobs: Job[] = [
  {
    company: 'Riverside Insights',
    role: 'Senior Frontend Engineer',
    start: 'April 2024',
    end: 'Present',
    bullets: ['Built assessment dashboards', 'Improved design-system consistency']
  },
  {
    company: 'CDIT',
    role: 'Senior Frontend Engineer',
    start: 'December 2020',
    end: 'April 2024',
    bullets: ['Shipped a mobile-first cart', 'Improved release velocity']
  }
];

describe('JobTimeline', () => {
  it('renders employment history entries, dates, and bullets for both sides of the timeline', () => {
    render(<JobTimeline jobs={jobs} />);

    const history = screen.getByRole('list', { name: /employment history/i });
    const items = history.querySelectorAll(':scope > li');

    expect(items).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Riverside Insights', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CDIT', level: 3 })).toBeInTheDocument();
    expect(screen.getAllByText('Senior Frontend Engineer')).toHaveLength(2);
    expect(screen.getAllByText(/April 2024/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/December 2020/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Built assessment dashboards')).toBeInTheDocument();
    expect(screen.getByText('Improved release velocity')).toBeInTheDocument();
  });
});
