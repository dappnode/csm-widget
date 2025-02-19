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
  Performance: [
    {
      title: 'Operator in status stuck in latest report 🚨',
      value:
        "An operator is in a 'stuck' state for the specified epoch range. Performance should be checked.",
    },
    {
      title: 'Operator bad performance in latest report 🚨',
      value:
        "The operator's performance was below the acceptable threshold during the specified epoch range.",
    },
    {
      title: 'Operator good performance in latest report ✅',
      value:
        "The operator's performance exceeded the threshold during the specified epoch range.",
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
      title: 'New distribution log updated 📦',
      value:
        'A new distribution log has been updated and will be used for validator performance visualization.',
    },
    {
      title: 'Execution client does not have logs receipts 🚨',
      value:
        'The execution client is missing log receipts, preventing event scanning. Update your configuration or switch to a compatible client.',
    },
    {
      title: 'CsModule events notifications 📋',
      value:
        'Covers updates on rewards, penalties, new keys, and manager address proposals for the Lido CSModule smart contract.',
    },
  ],
};

export default function NotificationsTypes() {
  return (
    <Section title="Available Notifications">
      {Object.entries(avaliableNotifications).map(([key, value]) => (
        <AccordionNavigatable summary={key} key={key} defaultExpanded={true}>
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
