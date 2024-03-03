import React from 'react';
import { useScreenSize } from '../../hooks/useScreenSize';

type SvgWrapperProps = {
  viewBox: string;
  title: string;
};

export const SvgWrapper: React.FC<SvgWrapperProps> = ({ viewBox, title, children }) => {
  const { isPrint } = useScreenSize();

  return (
    <svg viewBox={viewBox} height={isPrint ? 31 : 62}>
      <title>{title}</title>
      {children}
    </svg>
  );
};
