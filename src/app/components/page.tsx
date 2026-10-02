'use client';

import Block from '@/components/common/blocks/block';
import Heading from '@/components/common/headings/heading';
import BadgeShowcase from '@/components/features/componentShowcase/badge';
import BlocksShowcase from '@/components/features/componentShowcase/block';
import ButtonShowcase from '@/components/features/componentShowcase/button';
import HeadingShowcase from '@/components/features/componentShowcase/heading';
import InputShowcase from '@/components/features/componentShowcase/input';
import StatsCardShowcase from '@/components/features/componentShowcase/stats-card';
import WelcomeCardShowcase from '@/components/features/componentShowcase/welcome-card';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import styles from './page.module.scss';

export default function ComponentsPage() {
  return (
    <DashboardLayout>
      <Block as="div" className={styles.showcaseContainer}>
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
      </Block>
    </DashboardLayout>
  );
}
