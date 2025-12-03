import { FC } from 'react';
import { Faq } from 'shared/components';

import { NotificationsComponent } from './notifications-component';
import { Layout } from 'shared/layout';
import NotificationsTypes from './notifications-types';
import { FAQ_NOTIFICATIONS } from 'faq';

export const NotificationsPage: FC = () => (
  <Layout
    title="Notifications"
    subtitle="Forward notifications via Dappnode's Notification System"
  >
    <NotificationsComponent />
    <NotificationsTypes />
    <Faq items={FAQ_NOTIFICATIONS} />
  </Layout>
);
