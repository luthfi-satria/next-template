import styles from '@/app/themes/page.module.scss';
import Heading from '@/components/common/headings/heading';
import ThemeFilter from './filter';

export default function HeaderThemes() {
  return (
    <div className={styles.header}>
      <Heading as="h1" variant="large">
        Themes & Styles Guide
      </Heading>
      <p>
        Visual documentation of SCSS tokens, color schemes, typography, and component layout
        variables.
      </p>

      <ThemeFilter />
    </div>
  );
}
