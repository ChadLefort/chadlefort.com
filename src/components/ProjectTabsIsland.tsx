import { Code2, FileText, Images } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import type { GalleryImage } from '~/components/ProjectGallery';
import { PROJECT_GALLERY_OPEN_EVENT, ProjectGallery } from '~/components/ProjectGallery';

type Skill = {
  name: string;
  icon: string;
  color?: string;
};

type Props = {
  hasGallery: boolean;
  galleryImages: GalleryImage[];
  projectSkills: Skill[];
  title: string;
  description?: ReactNode;
};

const DESCRIPTION_TAB = 'description';
const SKILLS_TAB = 'skills';
const GALLERY_TAB = 'gallery';
type TabKey = typeof DESCRIPTION_TAB | typeof SKILLS_TAB | typeof GALLERY_TAB;

const tabStyles = tv({
  base: [
    'inline-flex items-center gap-2 px-5 py-3',
    'text-sm font-semibold tracking-wide text-fg-muted hover:text-fg',
    'border-b-2 border-transparent data-[selected]:border-accent data-[selected]:text-fg',
    'cursor-pointer transition outline-none focus-visible:ring-accent focus-visible:ring-2 focus-visible:outline-none'
  ]
});

const skillIconStyles = tv({
  base: 'size-5 transition-transform duration-200 group-hover:scale-105 motion-reduce:group-hover:scale-100 md:size-6'
});

const symbolId = (icon: string) => (icon.includes(':') ? `ai:${icon}` : `ai:local:${icon}`);

const SkillIcon: FC<{ skill: Skill }> = ({ skill }) => (
  <svg className={skillIconStyles()} style={skill.color ? { color: skill.color } : undefined} aria-hidden="true">
    <use href={`#${symbolId(skill.icon)}`} />
  </svg>
);

export const ProjectTabsIsland: FC<Props> = ({ hasGallery, galleryImages, projectSkills, title, description }) => {
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
        <Tab id={DESCRIPTION_TAB} className={tabStyles()}>
          <FileText className="size-4" aria-hidden="true" />
          Description
        </Tab>
        <Tab id={SKILLS_TAB} className={tabStyles()}>
          <Code2 className="size-4" aria-hidden="true" />
          Skills Used
        </Tab>
        {hasGallery && (
          <Tab id={GALLERY_TAB} className={tabStyles()}>
            <Images className="size-4" aria-hidden="true" />
            Images
          </Tab>
        )}
      </TabList>

      <TabPanel id={DESCRIPTION_TAB} className="tab-panel outline-none">
        <div className="tile bg-tile-alt border-glass-border rounded-3xl border p-8 md:p-16">
          <div className="project-prose">{description}</div>
        </div>
      </TabPanel>

      <TabPanel id={SKILLS_TAB} className="tab-panel outline-none">
        <ul className="flex flex-wrap justify-center gap-3 md:gap-4" aria-label={`${title} skills`}>
          {projectSkills.map((skill) => (
            <li key={skill.name}>
              <div className="group card card-hover flex items-center gap-2 rounded-full px-3 py-2 md:px-4">
                <SkillIcon skill={skill} />
                <span className="text-fg/90 text-sm font-semibold tracking-wide">{skill.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </TabPanel>

      {hasGallery && (
        <TabPanel id={GALLERY_TAB} className="tab-panel outline-none">
          <ProjectGallery images={galleryImages} title={title} openRequest={heroOpenRequest} />
        </TabPanel>
      )}
    </Tabs>
  );
};
