import { MATOMO_CLICK_EVENTS_TYPES } from 'consts/matomo-click-events';
import { FC, useCallback } from 'react';
import { Button } from '@lidofinance/lido-ui';
import { Step } from '../step-wrapper';
import { StepsProps } from '../steps';
import { useDappStatus } from 'modules/web3';
import { CHAINS } from '@lidofinance/lido-ethereum-sdk';
import NextLink from 'next/link';
import { Note } from 'shared/components';
import { Link } from '@lidofinance/lido-ui';
import { PATH } from 'consts/urls';
import { trackMatomoEvent } from 'utils';
import { dappnodeLidoDocsUrls } from 'dappnode/utils/dappnode-docs-urls';
import { ButtonsRow } from '../styles';
import { WITHDRAWAL_VAULT_BY_NETWORK } from 'consts';

export const KeysWithdrawalStep: FC<StepsProps> = ({
  step,
  title,
  setStep,
}: StepsProps) => {
  const { chainId } = useDappStatus();

  const withdrawalByAddress = WITHDRAWAL_VAULT_BY_NETWORK[chainId];

  const handleClick = useCallback(() => {
    trackMatomoEvent(MATOMO_CLICK_EVENTS_TYPES.starterPackCreateNodeOperator);
  }, []);

  return (
    <>
      <Step stepNum={step.toString()} title={title}>
        <p>
          In order to run a validator, you need to generate the necessary
          keystores and deposit data.
        </p>

        <p>
          Set <b>{withdrawalByAddress}</b> as the withdrawal address while
          generating the keystores. This is the Lido Withdrawal Vault on{' '}
          {CHAINS[chainId]}
        </p>
        <p>
          Prepare your deposit data (.json file) for submitting your keys in the
          next step.
        </p>
        <p>
          Just generate the keys, do <b>NOT</b> execute the deposits.
        </p>
      </Step>
      <Note>
        You can find a guide on how to generate keys in{' '}
        <Link href={dappnodeLidoDocsUrls.generateKeys}>our Documentation</Link>.
      </Note>
      <ButtonsRow>
        <Button
          variant="outlined"
          onClick={() => {
            setStep((prevState) => prevState - 1);
          }}
        >
          Back
        </Button>

        <NextLink href={PATH.CREATE} passHref legacyBehavior>
          <Button onClick={handleClick}>Next</Button>
        </NextLink>
      </ButtonsRow>
    </>
  );
};
