import type { CollectionEntry } from 'astro:content';
import { Temporal } from '@js-temporal/polyfill';
import { parseUsDate } from '~/utils/date';

export type ProjectEntry = CollectionEntry<'projects'>;

export const compareProjects = (a: ProjectEntry, b: ProjectEntry) => {
  const featuredDelta = Number(b.data.featured) - Number(a.data.featured);

  if (featuredDelta !== 0) return featuredDelta;

  const endDelta = Temporal.PlainDate.compare(parseUsDate(b.data.end), parseUsDate(a.data.end));

  if (endDelta !== 0) return endDelta;

  return a.id.localeCompare(b.id);
};

export const sortProjects = (projects: ProjectEntry[]) => projects.toSorted(compareProjects);
