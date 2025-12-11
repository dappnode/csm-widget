import { Section } from 'shared/components';
import { AccordionNavigatable } from 'shared/components/accordion-navigatable';
import { NotificationsList } from './styles';

const avaliableNotifications = {
  Exits: [
    {
      title: 'Validator requires exit 🚨',
      value:
        'One of your validators has been requested to exit. It will be done automatically',
    },
    {
      title: 'Validator failed to exit, manual exit required 🚪',
      value:
        'Your validator failed to exit automatically and requires manual intervention.',
    },
    {
      title: 'Validator successfully exited 🚪',
      value:
        'Your validator has successfully entered the exit queue without requiring manual action.',
    },
  ],

  Relays: [
    {
      title: 'Blacklisted relay 🚨',
      value:
        'A blacklisted relay is currently being used, which is not allowed.',
    },
    {
      title: 'Missing mandatory relay ⚠️',
      value:
        'No mandatory relays are currently in use. Add at least one mandatory relay in the stakers UI.',
    },
  ],
  Others: [
    {
      title: 'Execution client does not have logs receipts 🚨',
      value:
        'The execution client is missing log receipts, preventing event scanning. Update your configuration or switch to a compatible client.',
    },
  ],
};

export default function NotificationsTypes() {
  return (
    <Section title="Available Notifications">
      {Object.entries(avaliableNotifications).map(([key, value]) => (
        <AccordionNavigatable
          summary={key}
          key={key}
          defaultExpanded={true}
          id={key}
        >
          <NotificationsList>
            {value.map((notification, i) => (
              <li key={i}>
                <b>{notification.title}</b> - <span>{notification.value}</span>
              </li>
            ))}
          </NotificationsList>
        </AccordionNavigatable>
      ))}
    </Section>
  );
}
