import { FC } from 'react';
import { Layout } from 'shared/layout';
import { WelcomeSection } from './welcome-section-component';
import { WarningWrapper } from 'dappnode/components/text-wrappers';
import { LoaderBanner } from 'shared/navigate/splash/loader-banner';

export const ECScanningPage: FC = () => {
  return (
    <Layout>
      <WelcomeSection>
        <WarningWrapper>
          <h2>Execution client scanning blocks</h2>
        </WarningWrapper>
        <p>To retrieve data, this UI scans blockchain events.</p>
        <p>
          The first login may take a few minutes, depending on your execution
          client.
        </p>
        <LoaderBanner />
      </WelcomeSection>
    </Layout>
  );
};
