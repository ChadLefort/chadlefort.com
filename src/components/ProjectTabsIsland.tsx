import { Code2, FileText, Images } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { PROJECT_GALLERY_OPEN_EVENT } from '~/components/ProjectGallery/constants';
import { ProjectGallery } from '~/components/ProjectGallery/ProjectGallery';
import type { GalleryImage } from '~/components/ProjectGallery/types';
import type { Skill } from '~/data/skills';
import { focusRing } from '~/utils/focusRing';
import { skillIcon } from '~/utils/skillIcon';

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
  extend: focusRing,
  base: [
    'inline-flex shrink-0 items-center gap-2 px-5 py-3 whitespace-nowrap',
    'text-sm font-semibold tracking-wide text-fg-muted',
    'border-b-2 border-transparent',
    'cursor-pointer transition duration-[var(--motion-duration-state)] ease-[var(--motion-ease-settle)]'
  ],
  variants: {
    isHovered: {
      true: 'text-fg'
    },
    isSelected: {
      true: 'border-accent text-fg'
    }
  }
});

const tabPanelStyles = tv({
  base: ['outline-none', '[animation:tab-panel-in_var(--motion-duration-state)_var(--motion-ease-out)_both]']
});

const skillIconStyles = tv({
  base: 'size-5 md:size-6',
  extend: skillIcon
});

const symbolId = (icon: string) => (icon.includes(':') ? `ai:${icon}` : `ai:local:${icon}`);

const SkillIcon: FC<{ skill: Skill }> = ({ skill }) => (
  <svg className={skillIconStyles({ tone: skill.iconTone })} aria-hidden="true">
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
      <TabList
        aria-label="Project sections"
        className="border-panel-border mb-10 flex min-w-0 items-center gap-2 overflow-x-auto border-b pb-px"
      >
        <Tab id={DESCRIPTION_TAB} className={(renderProps) => tabStyles(renderProps)}>
          <FileText className="size-4" aria-hidden="true" />
          Case study
        </Tab>
        <Tab id={SKILLS_TAB} className={(renderProps) => tabStyles(renderProps)}>
          <Code2 className="size-4" aria-hidden="true" />
          Stack
        </Tab>
        {hasGallery && (
          <Tab id={GALLERY_TAB} className={(renderProps) => tabStyles(renderProps)}>
            <Images className="size-4" aria-hidden="true" />
            Screenshots
          </Tab>
        )}
      </TabList>

      <TabPanel id={DESCRIPTION_TAB} className={tabPanelStyles()}>
        <div className="project-panel rounded-3xl p-8 md:p-16">
          <div className="project-prose">{description}</div>
        </div>
      </TabPanel>

      <TabPanel id={SKILLS_TAB} className={tabPanelStyles()}>
        <ul className="flex min-w-0 flex-wrap justify-center gap-3 md:gap-4" aria-label={`${title} stack`}>
          {projectSkills.map((skill) => (
            <li key={skill.name}>
              <div className="skill-badge">
                <SkillIcon skill={skill} />
                <span className="text-fg/90 min-w-0 text-sm font-semibold tracking-wide break-words">{skill.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </TabPanel>

      {hasGallery && (
        <TabPanel id={GALLERY_TAB} className={tabPanelStyles()}>
          <ProjectGallery images={galleryImages} title={title} openRequest={heroOpenRequest} />
        </TabPanel>
      )}
    </Tabs>
  );
};
