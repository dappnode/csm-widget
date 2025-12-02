import { REPORT_TIMESTAMPS_BY_NETWORK } from 'consts';
import { useDappStatus } from 'modules/web3';

export const useGetNextReport = () => {
  const { chainId } = useDappStatus();
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const deploymentTimestamp = REPORT_TIMESTAMPS_BY_NETWORK[chainId];

  const reportsIntervalDays = chainId === 1 ? 28 : 7;
  const reportsIntervalSeconds = reportsIntervalDays * 24 * 60 * 60;

  const secondsSinceDeployment = currentTimestamp - deploymentTimestamp;

  const reportsCompleted = Math.floor(
    secondsSinceDeployment / reportsIntervalSeconds,
  );

  const nextReportTimestamp =
    deploymentTimestamp + (reportsCompleted + 1) * reportsIntervalSeconds; // +1 because we want the next report

  const secondsUntilNextReport = nextReportTimestamp - currentTimestamp;
  const daysUntilNextReport = Math.ceil(
    secondsUntilNextReport / (24 * 60 * 60),
  );

  return daysUntilNextReport;
};
