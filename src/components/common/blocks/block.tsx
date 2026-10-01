import styles from '@/app/components/page.module.scss';
import Blocks from '@/components/common/blocks/blocks';
import Heading from '@/components/common/headings/heading';

export default function BlocksShowcase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Block Components
      </Heading>

      <div className={styles.componentGrid}>
        <Blocks as="div" className={styles.componentCard}>
          <div className={styles.componentLabel}>Block - Div</div>
          <p>Block component as div element</p>
        </Blocks>

        <Blocks as="section" className={styles.componentCard}>
          <div className={styles.componentLabel}>Block - Section</div>
          <p>Block component as section element</p>
        </Blocks>

        <Blocks as="article" className={styles.componentCard}>
          <div className={styles.componentLabel}>Block - Article</div>
          <p>Block component as article element</p>
        </Blocks>

        <Blocks as="main" className={styles.componentCard}>
          <div className={styles.componentLabel}>Block - Main</div>
          <p>Block component as main element</p>
        </Blocks>
      </div>
    </section>
  );
}
