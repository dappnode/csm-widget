import { ReactComponent as BeaconchaLink } from 'assets/icons/beaconcha-link.svg';
import { getExternalLinks } from 'consts/external-links';
import { MATOMO_CLICK_EVENTS_TYPES } from 'consts/matomo-click-events';
import { FC } from 'react';
import { MatomoLink } from '../matomo-link/matomo-link';

const { beaconchain } = getExternalLinks();

// Dappnode: Allow validatorIndex prop for cases where pubkey is not available
interface BeaconchainPubkeyLinkProps {
  pubkey?: string;
  validatorIndex?: string | number;
}

export const BeaconchainPubkeyLink: FC<BeaconchainPubkeyLinkProps> = ({
  pubkey,
  validatorIndex,
}) => {
  let href = '';
  if (beaconchain) {
    if (pubkey) {
      href = `${beaconchain}/validator/${pubkey}`;
    } else if (validatorIndex !== undefined && validatorIndex !== null) {
      href = `${beaconchain}/validator/${validatorIndex}`;
    }
  }

  if (!href) return null;

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
