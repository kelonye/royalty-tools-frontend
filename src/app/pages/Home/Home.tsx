import React from 'react';

import * as S from './Home.styled';
import Summary from './components/Summary';
import Chart from './components/Chart';
import Table from './components/Table';
import CollectionSwitcher from './components/CollectionSwitcher';
import DateRangePicker from './components/DateRangePicker';

const Home: React.FC = () => {
  return (
    <>
      <div className='flex justify-between items-center my-4'>
        <CollectionSwitcher />
        <DateRangePicker />
      </div>
      <S.Container className='mb-4'>
        <Summary />
        <Chart />
        <Table />
      </S.Container>
    </>
  );
};

export default Home;
