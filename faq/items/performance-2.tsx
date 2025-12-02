import React from 'react';
import { Faq } from 'types';

export const Performance2: Faq = {
  title: 'Where does the data come from?',
  anchor: 'where-does-the-data-come-from',
  content: (
    <div>
      <p>
        We obtain the performance data of all Lido operators through its Smart
        Contract. The Lido CSM team distributes reports from all validators via
        IPFS hashes and Lido CSM package proccess it. Since this data is
        provided by Lido, is crucial in determining whether your validators
        qualify for rewards.
      </p>
    </div>
  ),
};
