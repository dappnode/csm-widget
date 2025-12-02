import React from 'react';
import { Faq } from 'types';
import { FaqLink } from 'shared/components';

export const Notifications3: Faq = {
  title: 'How to Create a Telegram Bot and Get the Bot Token?',
  anchor: 'how-to-create-a-telegram-bot-and-get-the-bot-token',
  content: (
    <div>
      <ol>
        <li>
          Open Telegram and search for{' '}
          <FaqLink href="https://web.telegram.org/a/#93372553">
            <code>@BotFather</code>
          </FaqLink>
          .
        </li>

        <li>
          Start a chat with BotFather and type <code>/newbot</code>.
        </li>

        <li>
          Follow the instructions to name your bot and choose a username (must
          end with <code>bot</code>).
        </li>

        <li>
          Once created, BotFather will send you the bot token.
          <ul>
            <li>
              Example: <code>123456789:ABCDefghIJKLMNOPQRSTuvwxYZ</code>.
            </li>
          </ul>
        </li>

        <li>
          Open the chat with your bot and click the <code>Start</code> button.
        </li>
      </ol>
    </div>
  ),
};
