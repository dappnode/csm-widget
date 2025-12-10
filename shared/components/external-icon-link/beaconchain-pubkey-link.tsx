import { KEY_STATUS, KeyWithStatus } from '@lidofinance/lido-csm-sdk';
import { getExternalLinks } from 'consts/external-links';
import { MATOMO_CLICK_EVENTS_TYPES } from 'consts/matomo-click-events';
import { FC } from 'react';
import { hasInterception } from 'utils';
import { MatomoLink } from '../matomo-link/matomo-link';

import { ReactComponent as BeaconchaLink } from 'assets/icons/beaconcha-link.svg';

const { beaconchain } = getExternalLinks();

const NON_DEPOSITED_STATUSES: KEY_STATUS[] = [
  KEY_STATUS.DEPOSITABLE,
  KEY_STATUS.DUPLICATED,
  KEY_STATUS.INVALID,
  KEY_STATUS.NON_QUEUED,
  KEY_STATUS.UNCHECKED,
];

// Dappnode: Allow validatorIndex prop for cases where pubkey is not available
export interface BeaconchainPubkeyLinkProps {
  pubkey?: string;
  validatorIndex?: string | number;
  statuses: KeyWithStatus['statuses'];
}

export const BeaconchainPubkeyLink: FC<BeaconchainPubkeyLinkProps> = ({
  pubkey,
  validatorIndex,
  statuses,
}) => {
  let href = '';
  if (beaconchain) {
    if (pubkey) {
      href = `${beaconchain}/validator/${pubkey}`;
    } else if (validatorIndex !== undefined && validatorIndex !== null) {
      href = `${beaconchain}/validator/${validatorIndex}`;
    }
  }
  const skip = hasInterception(statuses, NON_DEPOSITED_STATUSES);

  if (skip || !href) return null;

  return (
    <MatomoLink
      href={href}
      title="View on beaconcha.in"
      matomoEvent={MATOMO_CLICK_EVENTS_TYPES.beaconchainPubkeyLink}
    >
      <BeaconchaLink />
    </MatomoLink>
  );
};
