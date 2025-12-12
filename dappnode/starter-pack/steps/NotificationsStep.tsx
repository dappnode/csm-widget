import { FC } from 'react';
import { Link, Button } from '@lidofinance/lido-ui';
import { Step } from '../step-wrapper';
import { StepsProps } from '../steps';
import { useDappStatus } from 'modules/web3';
import { CHAINS } from '@lidofinance/lido-ethereum-sdk';
import { ButtonsRow } from '../styles';

export const NotificationsStep: FC<StepsProps> = ({
  step,
  title,
  setStep,
}: StepsProps) => {
  const { chainId } = useDappStatus();

  return (
    <>
      <Step stepNum={step.toString()} title={title}>
        <p>
          Dappnode&apos;s notification system allows you to receive alerts
          regarding your node and Lido validators directly in your Dappmanager
          UI under the{' '}
          <Link href="http://my.dappnode/notifications/inbox">
            Notifications Inbox
          </Link>
          , or on your phone if you are a{' '}
          <Link href="http://my.dappnode/premium/activate">Premium</Link> user.
        </p>

        <p>
          By default, all notifications are enabled, but you can customize which
          ones you want to receive in the{' '}
          <Link href="http://my.dappnode/notifications/settings">
            Notifications Settings tab
          </Link>{' '}
          under the Lido CSM {CHAINS[chainId]} section.
        </p>

        <p>
          We highly recommend keeping these notifications enabled to quickly
          detect underperformance and avoid penalties.
        </p>
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
        >
          {'Next'}
        </Button>
      </ButtonsRow>
    </>
  );
};
