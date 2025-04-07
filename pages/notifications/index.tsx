import { PATH } from 'consts/urls';
import { NotificationsPage } from 'dappnode/notifications/notifications-page';
import { getFaqNotifications } from 'lib/getFaq';
import { getProps } from 'lib/getProps';
import { Gate, GateLoaded, Navigate } from 'shared/navigate';

const Page = () => (
  <GateLoaded>
    <Gate rule="IS_NODE_OPERATOR" fallback={<Navigate path={PATH.HOME} />}>
      <NotificationsPage />
    </Gate>
  </GateLoaded>
);

export default Page;

// It must be getServerSideProps instead of getStaticProps because we need to check the maintenance status on every request.
export const getServerSideProps = getProps(getFaqNotifications);
