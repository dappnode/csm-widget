import React from 'react';
import { Faq } from 'types';

export const Performance4: Faq = {
  title: 'Where is this data stored?',
  anchor: 'where-is-this-data-stored',
  content: (
    <div>
      <p>
        The data collected from the Lido Smart Contract is stored in the
        Dappnode Lido package. Note that this data will include all samples from
        the validator; so the historical data from before the installation will
        be available.
      </p>
    </div>
  ),
};
