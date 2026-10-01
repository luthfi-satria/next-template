'use client';

import BadgeShowcase from '@/components/common/badges/badge';
import BlocksShowcase from '@/components/common/blocks/block';
import ButtonShowcase from '@/components/common/buttons/button';
import StatsCardShowcase from '@/components/common/cards/stats-card';
import Heading from '@/components/common/headings/heading';
import InputShowcase from '@/components/common/inputs/input';
import HeadingShowcase from '@/components/common/typography/heading';
import WelcomeCardShowcase from '@/components/common/welcome-cards/welcome-card';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import styles from './page.module.scss';

export default function ComponentsPage() {
  return (
    <DashboardLayout>
      <div className={styles.showcaseContainer}>
        <Heading as="h1" variant="large" className={styles.pageTitle}>
          Component Showcase
        </Heading>

        <HeadingShowcase />
        <ButtonShowcase />
        <InputShowcase />
        <BadgeShowcase />
        <StatsCardShowcase />
        <WelcomeCardShowcase />
        <BlocksShowcase />
      </div>
    </DashboardLayout>
  );
}
