import React from 'react';

import { DEFAULT_QUERY, useRequest } from '@app/hooks/useRequest';
import { useCoralCube } from '@app/contexts/coral-cube';

import { formatNumber, formatPreciseNumber } from '@app/utils/bn';

import * as S from './Summary.styled';

type SummaryData = {
  totalSales: number;
  totalPaidSales: number;
  totalRoyaltyPaid: number;
  totalPotentialRoyalty: number;
};

const Summary: React.FC = () => {
  const { collection } = useCoralCube();
  const endpoint = collection ? `/summary/${collection}` : null;
  const { result: summary } = useRequest<SummaryData>(endpoint, DEFAULT_QUERY);

  return (
    <S.Container className='p-4'>
      {!summary ? null : (
        <>
          <div>Royalty</div>
          <div>
            {!summary.totalPotentialRoyalty
              ? 0
              : formatNumber(
                  summary.totalRoyaltyPaid / summary.totalPotentialRoyalty
                )}
            % ({formatPreciseNumber(summary.totalRoyaltyPaid)}/
            {formatPreciseNumber(summary.totalPotentialRoyalty)} SOL) earned
            royalty
          </div>
          <div>Sales</div>
          <div>
            {!summary.totalSales
              ? 0
              : formatNumber(summary.totalPaidSales / summary.totalSales)}
            % ({summary.totalPaidSales}/{summary.totalSales}) paid sales
          </div>
        </>
      )}
    </S.Container>
  );
};

export default Summary;
