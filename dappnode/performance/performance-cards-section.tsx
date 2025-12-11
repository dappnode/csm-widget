import { Stack } from 'shared/components';
import { PerformanceCard } from './components/performance-card';
('dappnode/utils/dappnode-docs-urls');
import { useFrameInfo } from 'modules/web3';
import { countCalendarDaysLeft } from 'utils';

export const PerformanceCardsSection = () => {
  const { data: rewardsFrame } = useFrameInfo((data) => ({
    nextDistribution: data.lastReport + data.frameDuration,
  }));
  const daysUntilNextReport = countCalendarDaysLeft(
    rewardsFrame?.nextDistribution,
  );

  return (
    <Stack justify="center">
      <PerformanceCard
        title="Next Lido report in:"
        tooltip="The time remaining until the next Lido CSM report"
      >
        {daysUntilNextReport} {daysUntilNextReport === 1 ? 'day' : 'days'}
      </PerformanceCard>
    </Stack>
  );
};
