import React from 'react';
import { Faq } from 'types';
import { FaqLink } from 'shared/components';

export const Notifications2: Faq = {
  title: 'How to Get Your Telegram User ID?',
  anchor: 'how-to-get-your-telegram-user-id',
  content: (
    <div>
      <ol>
        <li>
          Open <FaqLink href="https://web.telegram.org/a/">Telegram</FaqLink>{' '}
          and search for{' '}
          <FaqLink href="https://web.telegram.org/a/#52504489">
            <code>@userinfobot</code>
          </FaqLink>{' '}
          or{' '}
          <FaqLink href="https://web.telegram.org/a/#1533228735">
            <code>@raw_data_bot</code>
          </FaqLink>
          .
        </li>

        <li>Start a chat with the bot by clicking Start.</li>
        <li>The bot will reply with your Telegram ID.</li>
      </ol>
    </div>
  ),
};
