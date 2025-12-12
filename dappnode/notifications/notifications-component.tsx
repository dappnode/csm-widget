import { Block, Stack } from 'shared/components';
import { Link } from '@lidofinance/lido-ui';
import { CHAINS } from '@lidofinance/lido-ethereum-sdk';
import { useDappStatus } from 'modules/web3';

export const NotificationsComponent = () => {
  const { chainId } = useDappStatus();

  return (
    <>
      <Block>
        <Stack gap="sm" direction="column">
          <p>
            Dappnode&apos;s notification system allows you to receive alerts
            regarding your node and Lido validators directly in your Dappmanager
            UI under the{' '}
            <Link href="http://my.dappnode/notifications/inbox">
              Notifications Inbox
            </Link>
            , or on your phone if you are a{' '}
            <Link href="http://my.dappnode/premium/activate">Premium</Link>{' '}
            user.
          </p>{' '}
          <p>
            By default, all notifications are enabled, but you can customize
            which ones you want to receive in the{' '}
            <Link href="http://my.dappnode/notifications/settings">
              Notifications Settings tab
            </Link>{' '}
            under the Lido CSM {CHAINS[chainId]} section.
          </p>
          <p>
            We highly recommend keeping these notifications enabled to quickly
            detect underperformance and avoid penalties.
          </p>
        </Stack>
      </Block>
    </>
  );
};
