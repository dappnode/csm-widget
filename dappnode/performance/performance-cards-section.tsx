import { Stack } from 'shared/components';
import { PerformanceCard } from './components/performance-card';
import { Link, Loader } from '@lidofinance/lido-ui';
import { dappnodeLidoDocsUrls } from 'dappnode/utils/dappnode-docs-urls';
import { useGetPendingReports } from 'dappnode/hooks/use-get-pending-reports';
import { useFrameInfo } from 'modules/web3';
import { countCalendarDaysLeft } from 'utils';

export const PerformanceCardsSection = () => {
  const { pendingReports, isLoading } = useGetPendingReports();

  const { data: rewardsFrame } = useFrameInfo((data) => ({
    nextDistribution: data.lastReport + data.frameDuration,
  }));
  const daysUntilNextReport = countCalendarDaysLeft(
    rewardsFrame?.nextDistribution,
  );

  return (
    <Stack wrap>
      <PerformanceCard
        title="Next Lido report in:"
        tooltip="The time remaining until the next Lido CSM report"
      >
        {daysUntilNextReport} {daysUntilNextReport === 1 ? 'day' : 'days'}
      </PerformanceCard>
      <PerformanceCard
        title="Pending data:"
        tooltip={
          <p>
            This represents the number of reports yet to be processed. If you
            have active validators, it may include the performance of them.
            These reports will be parsed automatically within the next hours.
            Learn more about it in our{' '}
            <Link href={dappnodeLidoDocsUrls.pendingHashes}>
              our Documentation
            </Link>
          </p>
        }
      >
        {isLoading ? (
          <Loader size="small" />
        ) : (
          <p>
            {pendingReports} {pendingReports === 1 ? 'report' : 'reports'}
          </p>
        )}
      </PerformanceCard>
    </Stack>
  );
};
