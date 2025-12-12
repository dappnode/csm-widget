import React from 'react';
import { Faq } from 'types';
import {
  FaqChainName,
  FaqOnlyMainnet,
  FaqOnlyTestnet,
} from 'shared/components';

export const Performance3: Faq = {
  title: 'How often is the data updated?',
  anchor: 'how-often-is-the-data-updated',
  content: (
    <div>
      <p>
        The Lido CSM team distributes a new report every{' '}
        <FaqOnlyTestnet>7 days, so it can take up to a weekly</FaqOnlyTestnet>
        <FaqOnlyMainnet>
          28 days, so it can take up to almost a monthly
        </FaqOnlyMainnet>{' '}
        delay in <FaqChainName /> network when checking your current performance
        compared to other Lido operators.
      </p>
    </div>
  ),
};
