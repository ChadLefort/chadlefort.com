import { FileText, Images } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import type { GalleryImage } from '~/components/ProjectGallery';
import { PROJECT_GALLERY_OPEN_EVENT, ProjectGallery } from '~/components/ProjectGallery';

type Props = {
  hasGallery: boolean;
  galleryImages: GalleryImage[];
  title: string;
  description?: ReactNode;
};

const DESCRIPTION_TAB = 'description';
const GALLERY_TAB = 'gallery';
type TabKey = typeof DESCRIPTION_TAB | typeof GALLERY_TAB;

const tabClass =
  'cursor-pointer text-fg-muted hover:text-fg focus-visible:ring-accent data-[selected]:border-accent data-[selected]:text-fg inline-flex items-center gap-2 border-b-2 border-transparent px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:ring-2 focus-visible:outline-none outline-none';

export const ProjectTabsIsland: FC<Props> = ({ hasGallery, galleryImages, title, description }) => {
  const [selectedKey, setSelectedKey] = useState<TabKey>(DESCRIPTION_TAB);
  const [heroOpenRequest, setHeroOpenRequest] = useState(0);

  useEffect(() => {
    if (!hasGallery) return;

    const handleOpenGallery = () => {
      setSelectedKey(GALLERY_TAB);
      setHeroOpenRequest((count) => count + 1);
    };

    window.addEventListener(PROJECT_GALLERY_OPEN_EVENT, handleOpenGallery);

    return () => window.removeEventListener(PROJECT_GALLERY_OPEN_EVENT, handleOpenGallery);
  }, [hasGallery]);

  return (
    <Tabs selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(key as TabKey)}>
      <TabList aria-label="Project sections" className="border-glass-border mb-10 flex items-center gap-2 border-b">
        <Tab id={DESCRIPTION_TAB} className={tabClass}>
          <FileText className="size-4" aria-hidden="true" />
          Description
        </Tab>
        {hasGallery && (
          <Tab id={GALLERY_TAB} className={tabClass}>
            <Images className="size-4" aria-hidden="true" />
            Images
          </Tab>
        )}
      </TabList>

      <TabPanel id={DESCRIPTION_TAB} className="outline-none">
        <div className="tile bg-tile-alt border-glass-border rounded-3xl border p-8 md:p-16">
          <div className="project-prose">{description}</div>
        </div>
      </TabPanel>

      {hasGallery && (
        <TabPanel id={GALLERY_TAB} className="outline-none">
          <ProjectGallery images={galleryImages} title={title} openRequest={heroOpenRequest} />
        </TabPanel>
      )}
    </Tabs>
  );
};
