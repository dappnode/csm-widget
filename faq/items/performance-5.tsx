import React from 'react';
import { Faq } from 'types';

export const Performance5: Faq = {
  title: 'Is the data accurate?',
  anchor: 'is-the-data-accurate',
  content: (
    <div>
      <p>
        To calculate the efficiency, which is used to compare with the Lido
        threshold, we rely on data from the Lido Smart Contract. This source is
        considered 100% accurate since it`s the data that will be used by Lido
        when allocating the rewards.
      </p>
    </div>
  ),
};
