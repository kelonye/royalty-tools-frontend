import { styled } from '@mui/material';

import { BORDER_RADIUS } from '@app/config';

export const Container = styled('div')(
  ({ theme: { breakpoints, palette } }) => ({
    backgroundColor: palette.background.paper,
    borderRadius: BORDER_RADIUS,
    gridArea: 'summary',

    div: {
      '&:nth-child(odd)': {
        fontSize: '1rem',
      },
      '&:nth-child(even)': {
        fontSize: '0.75rem',
        marginBottom: '1rem',
      },
    },
  })
);
