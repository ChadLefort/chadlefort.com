import type { FC, ReactNode } from 'react';
import { FileText, Images } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import { ProjectGallery } from '~/components/react/ProjectGallery';

type GalleryImage = {
  src: string;
  fullAvif: string;
  thumbSrc: string;
  thumbAvif: string;
  thumbWebp: string;
  thumbSizes: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
};

type Props = {
  hasGallery: boolean;
  galleryImages: GalleryImage[];
  title: string;
  description?: ReactNode;
};

const tabClass =
  'project-tab cursor-pointer text-fg-muted hover:text-fg focus-visible:ring-accent data-[selected]:border-accent data-[selected]:text-fg inline-flex items-center gap-2 border-b-2 border-transparent px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:ring-2 focus-visible:outline-none outline-none';

export const ProjectTabsIsland: FC<Props> = ({ hasGallery, galleryImages, title, description }) => (
  <Tabs>
    <TabList aria-label="Project sections" className="border-glass-border mb-10 flex items-center gap-2 border-b">
      <Tab id="description" className={tabClass}>
        <FileText className="h-4 w-4" aria-hidden="true" />
        Description
      </Tab>
      {hasGallery && (
        <Tab id="gallery" className={tabClass}>
          <Images className="h-4 w-4" aria-hidden="true" />
          Images
        </Tab>
      )}
    </TabList>

    <TabPanel id="description" className="outline-none">
      <div className="tile bg-tile-alt border-glass-border rounded-3xl border p-8 md:p-16">
        <div className="project-prose">{description}</div>
      </div>
    </TabPanel>

    {hasGallery && (
      <TabPanel id="gallery" className="outline-none">
        <ProjectGallery images={galleryImages} title={title} />
      </TabPanel>
    )}
  </Tabs>
);
