import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

import { useCoralCube } from '@app/contexts/coral-cube';

import * as S from './DateRangePicker.styled';

const DateRangePicker: React.FC = () => {
  const { date, setDate } = useCoralCube();

  return (
    <S.Container>
      <DatePicker
        label='Date'
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </S.Container>
  );
};

export default DateRangePicker;
