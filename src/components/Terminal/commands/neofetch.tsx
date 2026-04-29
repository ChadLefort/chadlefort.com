import { locationShort, site, yearsOfExperience } from '~/data/site';
import type { Command } from './types';

const C_PATH = 'M48 32H184V64H88V156H184V188H48Z';
const L_PATH = 'M224 32H264V156H352V188H224Z';

const TerminalMonogram = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 400 220"
    className="text-accent h-40 w-auto shrink-0 sm:h-48"
    shapeRendering="crispEdges"
  >
    <g fill="none" stroke="currentColor" strokeWidth="6" opacity="0.7">
      <path d={C_PATH} transform="translate(20 18)" />
      <path d={L_PATH} transform="translate(20 18)" />
    </g>
    <g fill="none" stroke="currentColor" strokeWidth="6" opacity="0.85">
      <path d={C_PATH} transform="translate(12 10)" />
      <path d={L_PATH} transform="translate(12 10)" />
    </g>
    <g fill="currentColor">
      <path d={C_PATH} />
      <path d={L_PATH} />
    </g>
  </svg>
);

const PaletteRow = () => (
  <div className="mt-3 flex gap-1">
    <span className="bg-term-tab-active inline-block h-4 w-8" />
    <span className="bg-term-add inline-block h-4 w-8" />
    <span className="bg-term-branch inline-block h-4 w-8" />
    <span className="bg-term-info inline-block h-4 w-8" />
    <span className="bg-term-del inline-block h-4 w-8" />
    <span className="bg-term-prompt inline-block h-4 w-8" />
    <span className="bg-term-fg inline-block h-4 w-8" />
    <span className="bg-term-comment inline-block h-4 w-8" />
  </div>
);

type InfoRow = { label?: string; value: string; rule?: boolean };

const HEADER = 'chad@chadlefort.com';

const formatInfoRows = (info: InfoRow[]) =>
  info
    .map((row) => {
      if (row.rule) return '-'.repeat(HEADER.length);
      if (row.label) return `${row.label}: ${row.value}`;

      return row.value;
    })
    .join('\n');

export const neofetch: Command = (_args, ctx) => {
  const years = yearsOfExperience();
  const info: InfoRow[] = [
    { value: HEADER },
    { rule: true, value: '' },
    { label: 'Title', value: site.jobTitle },
    { label: 'Location', value: locationShort },
    { label: 'Timezone', value: `${site.location.timezone} (${site.location.timezoneShort})` },
    { label: 'Uptime', value: `${years}+ years coding` },
    { label: 'GitHub', value: site.social.github.replace('https://', '') },
    { label: 'LinkedIn', value: site.social.linkedin.replace('https://www.', '') }
  ];

  ctx.append([
    {
      kind: 'node',
      node: (
        <div className="flex flex-col items-start gap-6 py-4 sm:flex-row sm:gap-12">
          <div className="pt-4 sm:pt-8">
            <TerminalMonogram />
          </div>
          <div>
            <pre className="text-term-fg font-mono whitespace-pre">{formatInfoRows(info)}</pre>
            <PaletteRow />
          </div>
        </div>
      )
    }
  ]);
};
