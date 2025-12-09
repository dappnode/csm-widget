/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import { Faq } from 'shared/components';
import { Layout } from 'shared/layout';
import { useGetPerformanceByRange } from 'dappnode/hooks/use-get-performance-by-range';
import { Range } from './types';

import { PerformanceTableSection } from './performance-table-section';
import { PerformanceChartSection } from './performance-chart-section';
import { RangeSelector } from './components/range-selector';
import { PerformanceCardsSection } from './performance-cards-section';
import { getConfig } from 'config';
import { FAQ_PERFORMANCE } from 'faq';
import { useDappStatus } from 'modules/web3';

export const PerformancePage: FC = () => {
  const { chainId } = useDappStatus();
  const { defaultChain } = getConfig();
  const [range, setRange] = useState<Range>('ever');
  const { isLoading, validatorsStats, threshold, thresholdsByEpoch } =
    useGetPerformanceByRange(range);

  // console.log('validatorsStats', validatorsStats);
  // console.log('threshold', threshold);
  // console.log('thresholdsByEpoch', thresholdsByEpoch);

  // const { operatorData, isLoading } = useGetOperatorPerformance();

  return (
    <Layout
      title="Dappnode Validators"
      subtitle="Monitor the performance of your Node Operator validators"
    >
      <PerformanceCardsSection />
      <RangeSelector
        chainId={chainId || defaultChain}
        range={range}
        setRange={setRange}
      />

      <PerformanceChartSection
        isLoading={isLoading}
        thresholdsByEpoch={thresholdsByEpoch}
        range={range}
        chainId={chainId || defaultChain}
      />

      <PerformanceTableSection
        isLoading={isLoading}
        validatorsStats={[]}
        threshold={0.5}
      />

      <Faq items={FAQ_PERFORMANCE} />
    </Layout>
  );
};
