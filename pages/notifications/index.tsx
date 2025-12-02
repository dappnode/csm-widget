import { PATH } from 'consts/urls';
import { NotificationsPage } from 'dappnode/notifications/notifications-page';
import { getProps } from 'utilsApi';
import { Gate, GateLoaded, Navigate } from 'shared/navigate';

const Page = () => (
  <GateLoaded>
    <Gate rule="IS_NODE_OPERATOR" fallback={<Navigate path={PATH.HOME} />}>
      <NotificationsPage />
    </Gate>
  </GateLoaded>
);

export default Page;

export const getServerSideProps = getProps();
