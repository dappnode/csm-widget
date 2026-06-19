/* eslint-disable no-irregular-whitespace */
import { expect } from '@playwright/test';
import { test } from '../../../test.fixture';
import { qase } from 'playwright-qase-reporter/playwright';
import { formatBalance } from 'utils/format-balance';
import { PAGE_WAIT_TIMEOUT } from 'tests/shared/consts/timeouts';
import { DATA_UNAVAILABLE } from 'consts/text';

test.describe('Dashboard. Bond & Rewards. Latest reward distribution section.', async () => {
  test.beforeEach(async ({ widgetService }) => {
    await widgetService.dashboardPage.open();
  });

  test(
    qase(136, 'Should correctly display common information'),
    async ({ widgetService, csmSDK }) => {
      const latestRewardsDistribution =
        widgetService.dashboardPage.bondRewards.latestRewardsDistribution;

      test.skip(
        !(await latestRewardsDistribution.isVisible()),
        'Latest rewards distribution is hidden when there are no reports yet',
      );

      await expect(latestRewardsDistribution.rowHeader).toContainText(
        'Latest rewards distribution',
      );
      await expect(latestRewardsDistribution.rowHeader).toContainText(
        /Report frame: \w{3} \d{2} — \w{3} \d{2}/,
      );

      const nodeOperatorId = BigInt(
        await widgetService.extractNodeOperatorId(),
      );
      const lastRewards =
        await csmSDK.rewards.getOperatorRewardsInLastReport(nodeOperatorId);

      await test.step('Verify latest reward amount', async () => {
        const expectedBalance = lastRewards
          ? `${formatBalance(lastRewards.distributed).trimmed}\u00A0stETH`
          : DATA_UNAVAILABLE;
        const commonBalance =
          await latestRewardsDistribution.commonBalance_Text.textContent();
        expect(commonBalance).toEqual(expectedBalance);
      });

      if (lastRewards?.distributed === 0n) {
        await test.step('Verify "Why" link', async () => {
          await latestRewardsDistribution.commonBalance_SubText.click();

          const whyModal = widgetService.dashboardPage.whyModal;
          await whyModal.waitFor({ state: 'visible' });
          const expectedTextContent =
            'Why didn’t I get rewards?There are main reason of you getting no reward within a frame:If your validator’s performance was below the threshold within the CSM Performance Oracle frame the validator does not receive rewards for the given frame. Read more about the CSM Performance Oracle.';
          await expect(whyModal).toContainText('Why didn’t I get rewards?');
          await expect(whyModal).toContainText(expectedTextContent);
        });

        await test.step('Verify closing modal', async () => {
          const whyModal = widgetService.dashboardPage.whyModal;
          await whyModal.getByRole('button').click();
          await whyModal.waitFor({ state: 'hidden' });
        });
      }
    },
  );

  test(
    qase(188, 'Should correctly open etherscan by link'),
    async ({ widgetService, widgetConfig, csmSDK }) => {
      const latestRewardsDistribution =
        widgetService.dashboardPage.bondRewards.latestRewardsDistribution;

      test.skip(
        !(await latestRewardsDistribution.isVisible()),
        'Latest rewards distribution is hidden when there are no reports yet',
      );

      const txHash = await csmSDK.rewards.getLastReportTransactionHash();
      test.skip(
        !txHash,
        'Latest rewards distribution transaction hash is not available',
      );

      await latestRewardsDistribution.expand();
      const [etherscanPage] = await Promise.all([
        widgetService.dashboardPage.waitForPage(PAGE_WAIT_TIMEOUT),
        latestRewardsDistribution.lastRewardsInfo
          .getByText('View on Etherscan')
          .click(),
      ]);
      expect(etherscanPage.url()).toContain(
        `${widgetConfig.standConfig.networkConfig.scan}tx/`,
      );
    },
  );

  test.skip(
    qase(143, 'Tooltip verification for "Keys over threshold" field'),
    async () => {},
  );
  test(
    qase(137, 'Upcoming Rewards Distribution Verification'),
    async ({ widgetService }) => {
      const latestRewardsDistribution =
        widgetService.dashboardPage.bondRewards.latestRewardsDistribution;

      test.skip(
        !(await latestRewardsDistribution.isVisible()),
        'Latest rewards distribution is hidden when there are no reports yet',
      );

      await latestRewardsDistribution.expand();

      await test.step('Verify "Next rewards distribution" info', async () => {
        await expect(
          latestRewardsDistribution.nextRewardsInfo.getByText(
            'Next rewards distribution',
          ),
        ).toBeVisible();

        await test.step('Verify report frame information', async () => {
          await expect(latestRewardsDistribution.reportFrame).toContainText(
            /Report frame: \w{3} \d{2} — \w{3} \d{2}/,
          );
        });
      });

      await test.step('Verify expected days for reward', async () => {
        await expect(
          latestRewardsDistribution.nextRewardsInfo.getByText(
            /Expected|Oracle report is delayed/,
          ),
        ).toBeVisible();

        const expectedDaysVisible =
          await latestRewardsDistribution.expectedDays.isVisible();
        if (expectedDaysVisible) {
          await expect(latestRewardsDistribution.expectedDays).toContainText(
            /Today|in \d+ days?/,
          );
        } else {
          await expect(
            latestRewardsDistribution.nextRewardsInfo.getByText(
              'Oracle report is delayed',
            ),
          ).toBeVisible();
        }
      });
    },
  );
});
