import React from 'react';
import { Faq } from 'types';
import { FaqLink } from 'shared/components';

export const Notifications1: Faq = {
  title: 'Why are notifications crucial?',
  anchor: 'why-are-notifications-crucial',
  content: (
    <div>
      <p>
        Notifications are essential for staying informed about critical events
        within the Lido CSM protocol. By receiving alerts about exit requests,
        deposits, penalties, slashing incidents, and smart contract events, you
        can proactively manage your staking operations and address issues
        promptly.
      </p>
      <p>
        Staying informed helps reduce risks while maintaining transparency and
        control over your activities, ensuring smooth and efficient
        participation in the protocol.
      </p>
      <p>
        Learn more about this notifications in{' '}
        <FaqLink href="https://docs.dappnode.io/docs/user/staking/ethereum/lsd-pools/lido/notifications">
          our documentation{' '}
        </FaqLink>
      </p>
    </div>
  ),
};
