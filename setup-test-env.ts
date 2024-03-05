import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.stubGlobal('jest', vi);

vi.mock('gatsby', async () => {
  const gatsby = await vi.importActual<typeof import('gatsby')>('gatsby');
  const mockUseStaticQuery = {
    file: {
      childImageSharp: {
        fluid: {
          aspectRatio: 1,
          src: '',
          srcSet: '',
          sizes: '',
          base64: '',
          tracedSVG: '',
          srcWebp: '',
          srcSetWebp: ''
        }
      }
    }
  };

  return {
    ...gatsby,
    graphql: vi.fn(),
    useStaticQuery: vi.fn().mockImplementation(() => mockUseStaticQuery)
  };
});
