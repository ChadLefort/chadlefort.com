import { Icon } from '@iconify/react';
import { Code2, FileText, Images } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import type { GalleryImage } from '~/components/ProjectGallery';
import { PROJECT_GALLERY_OPEN_EVENT, ProjectGallery } from '~/components/ProjectGallery';
import type { Skill } from '~/data/skills';

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

const tabClass =
  'cursor-pointer text-fg-muted hover:text-fg focus-visible:ring-accent data-[selected]:border-accent data-[selected]:text-fg inline-flex items-center gap-2 border-b-2 border-transparent px-5 py-3 text-sm font-semibold tracking-wide transition focus-visible:ring-2 focus-visible:outline-none outline-none';

const SkillIcon: FC<{ skill: Skill }> = ({ skill }) => {
  const className =
    'size-10 transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100';

  if (skill.icon === 'react-aria') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="200 206 800 790"
        className={className}
        style={skill.color ? { color: skill.color } : undefined}
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M720.67 205.995c146.913 0 266.009 119.096 266.01 266.008 0 118.75-77.815 219.322-185.234 253.518l177.866 222.534C994.438 966.98 980.963 995 956.736 995H795.612a57.8 57.8 0 0 1-43.878-20.177l-54.369-63.402L493.126 653.39c-35.992-45.472-3.608-112.411 54.385-112.413l173.159-.006c38.088 0 68.965-30.88 68.965-68.968-.001-38.088-30.877-68.965-68.965-68.965H429.939c-24.984 0-41.316-11.152-55.945-29.415l-96.645-120.657c-15.155-18.921-1.685-46.97 22.556-46.971ZM396.605 720.706c11.193-15.3 33.838-15.863 45.776-1.138l61.435 77.45h-1.03l32.783 41.916c12.505 15.424 14.374 38.257 2.478 54.156l-61.409 79.455A57.8 57.8 0 0 1 430.903 995H242.276c-24.096 0-37.611-27.752-22.753-46.722l118.469-151.26h-.069Z"
        />
      </svg>
    );
  }

  return (
    <Icon
      icon={skill.icon}
      className={className}
      style={skill.color ? { color: skill.color } : undefined}
      aria-hidden="true"
    />
  );
};

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
        <Tab id={DESCRIPTION_TAB} className={tabClass}>
          <FileText className="size-4" aria-hidden="true" />
          Description
        </Tab>
        <Tab id={SKILLS_TAB} className={tabClass}>
          <Code2 className="size-4" aria-hidden="true" />
          Skills
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

      <TabPanel id={SKILLS_TAB} className="outline-none">
        <ul
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          aria-label={`${title} skills`}
        >
          {projectSkills.map((skill) => (
            <li key={skill.name}>
              <div className="group card card-hover flex h-full flex-col items-center justify-center gap-3 p-5">
                <SkillIcon skill={skill} />
                <span className="text-fg/90 text-center text-xs font-semibold tracking-wide md:text-sm">
                  {skill.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </TabPanel>

      {hasGallery && (
        <TabPanel id={GALLERY_TAB} className="outline-none">
          <ProjectGallery images={galleryImages} title={title} openRequest={heroOpenRequest} />
        </TabPanel>
      )}
    </Tabs>
  );
};
