import { FC } from 'react';
import { Button, Link } from '@lidofinance/lido-ui';
import useDappnodeUrls from 'dappnode/hooks/use-dappnode-urls';
import useApiBrain from 'dappnode/hooks/use-brain-keystore-api';
import { useGetInfraStatus } from 'dappnode/hooks/use-get-infra-status';
import { Loader } from '@lidofinance/lido-ui';
import { ErrorWrapper } from 'dappnode/components/text-wrappers';
import { CHAINS } from '@lidofinance/lido-ethereum-sdk';
import useGetRelaysData from 'dappnode/hooks/use-get-relays-data';
import { StatusTitle } from 'shared/components/status-chip/status-chip';
import { StepsProps } from '../steps';
import { Step } from '../step-wrapper';
import { ButtonsRow, InfraInstalledLabel, Step2InfraRow } from '../styles';
import { useDappStatus } from 'modules/web3';

export const NodeStep: FC<StepsProps> = ({
  step,
  title,
  setStep,
}: StepsProps) => {
  const { ECStatus, CCStatus, isECLoading, isCCLoading } = useGetInfraStatus();
  const { error: brainError, isLoading: brainLoading } = useApiBrain();
  const { isMEVRunning, isLoading: relaysLoading } = useGetRelaysData();

  const isECSynced: boolean = ECStatus === 'SYNCED';
  const isCCSynced: boolean = CCStatus === 'SYNCED';

  const isSignerInstalled: boolean = brainError ? false : true;

  const isMEVInstalled: boolean = isMEVRunning ?? false;

  const isNextBtnDisabled: boolean =
    !isECSynced || !isCCSynced || !isSignerInstalled || !isMEVInstalled;

  const { stakersUiUrl: stakersUrl } = useDappnodeUrls();

  const { chainId } = useDappStatus();

  return (
    <>
      <Step stepNum={step.toString()} title={title}>
        <p>
          In order to be a Node Operator you must have a synced{' '}
          {CHAINS[chainId]} Node and run MEV Boost.
        </p>
        <Step2InfraRow>
          <p>Execution Client</p>
          <p>{'->'}</p>
          <p>
            {isECLoading ? (
              <Loader size="small" color="secondary" />
            ) : (
              <InfraInstalledLabel $isInstalled={isECSynced}>
                {StatusTitle[ECStatus || 'NOT_INSTALLED']}
              </InfraInstalledLabel>
            )}
          </p>
        </Step2InfraRow>
        <Step2InfraRow>
          <p>Consensus Client</p>
          <p>{'->'}</p>

          <p>
            {isCCLoading ? (
              <Loader size="small" color="secondary" />
            ) : (
              <InfraInstalledLabel $isInstalled={isCCSynced}>
                {StatusTitle[CCStatus || 'NOT_INSTALLED']}
              </InfraInstalledLabel>
            )}
          </p>
        </Step2InfraRow>
        <Step2InfraRow>
          <p>Web3signer</p>
          <p>{'->'}</p>
          <p>
            {brainLoading ? (
              <Loader size="small" color="secondary" />
            ) : (
              <InfraInstalledLabel $isInstalled={isSignerInstalled}>
                {isSignerInstalled ? 'Installed' : 'Not installed'}
              </InfraInstalledLabel>
            )}
          </p>
        </Step2InfraRow>
        <Step2InfraRow>
          <p>MEV Boost</p>
          <p>{'->'}</p>
          <p>
            {relaysLoading ? (
              <Loader size="small" color="secondary" />
            ) : (
              <InfraInstalledLabel $isInstalled={isMEVInstalled}>
                {isMEVInstalled ? 'Installed' : 'Not installed'}
              </InfraInstalledLabel>
            )}
          </p>
        </Step2InfraRow>
        {!isECSynced ||
          (!isCCSynced && (
            <div>
              <ErrorWrapper>
                You must have a synced {CHAINS[chainId]} Node and run MEV Boost.
              </ErrorWrapper>
            </div>
          ))}
        {!!brainError && (
          <div>
            <ErrorWrapper>You must have Web3Signer installed.</ErrorWrapper>
          </div>
        )}
        <Link href={stakersUrl}>Set up your node</Link>{' '}
      </Step>

      <ButtonsRow>
        <Button
          variant="outlined"
          onClick={() => {
            setStep((prevState) => prevState - 1);
          }}
        >
          Back
        </Button>

        <Button
          onClick={() => {
            setStep((prevState) => prevState + 1);
          }}
          disabled={
            isNextBtnDisabled || isECLoading || isCCLoading || brainLoading
          }
        >
          {'Next'}
        </Button>
      </ButtonsRow>
    </>
  );
};
