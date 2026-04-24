import type { FC } from 'react';

export const TrafficLights: FC = () => (
  <div className="mr-1 flex shrink-0 items-center gap-[7px] pr-3 pl-1 sm:mr-2 sm:pr-4 sm:pl-2">
    <span
      aria-hidden="true"
      className="bg-mac-red inline-block h-3 w-3 rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
    />
    <span
      aria-hidden="true"
      className="bg-mac-yellow inline-block h-3 w-3 rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
    />
    <span
      aria-hidden="true"
      className="bg-mac-green inline-block h-3 w-3 rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)]"
    />
  </div>
);
