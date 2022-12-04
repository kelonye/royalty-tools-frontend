import { styled } from '@mui/material';

export const Container = styled('div')(({ theme: { breakpoints } }) => ({
  display: 'grid',
  gridTemplateAreas: `
    "summary table"
    "chart table"
  `,
  gap: '0.25rem',
  flex: 1,
}));
