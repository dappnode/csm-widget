import { MATOMO_CLICK_EVENTS_TYPES } from 'consts/matomo-click-events';
import { FC } from 'react';
import { MatomoLink } from 'shared/components';
import { Button } from '@lidofinance/lido-ui';
import { Step } from '../step-wrapper';
import { StepsProps } from '../steps';
import { useDappStatus } from 'modules/web3';
import { CHAINS } from '@lidofinance/lido-ethereum-sdk';

export const BondStep: FC<StepsProps> = ({
  step,
  title,
  setStep,
}: StepsProps) => {
  const { chainId } = useDappStatus();

  return (
    <>
      <Step stepNum={step.toString()} title={title}>
        <p>
          Bond is a security collateral submitted by Node Operators <br />
          before uploading validator keys, covering potential losses from
          inappropriate actions.
        </p>
        <ul>
          <li>
            {' '}
            <p>
              It can be claimed or reused once the validator exits and any
              losses are covered.
            </p>
          </li>
          <br />
          <li>
            {' '}
            <p>
              2.4 {CHAINS[chainId]} ETH (stETH / wstETH equivalent) is required
              for the first validator{' '}
            </p>
          </li>
        </ul>

        <MatomoLink
          href="https://operatorportal.lido.fi/modules/community-staking-module#block-e4a6daadca12480d955524247f03f380"
          matomoEvent={MATOMO_CLICK_EVENTS_TYPES.starterPackBondLink}
        >
          Learn more
        </MatomoLink>
      </Step>
      <Button
        onClick={() => {
          setStep((prevState) => prevState + 1);
        }}
      >
        Next
      </Button>
    </>
  );
};
