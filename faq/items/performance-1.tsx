import React from 'react';
import { Faq } from 'types';

export const Performance1: Faq = {
  title: 'What is the Lido threshold?',
  anchor: 'what-is-the-lido-threshold',
  content: (
    <div>
      <p>
        The Lido threshold is the value that determines whether a validator
        should receive rewards or not. It is calculated with the average of all
        the efficiencies (attestation rates) of all validators.
      </p>
      <p>
        Validators with an efficiency higher than the threshold will get
        rewards, while those below it won`t.
      </p>
    </div>
  ),
};
