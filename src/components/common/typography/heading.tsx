import styles from '@/app/components/page.module.scss';
import Heading from '@/components/common/headings/heading';

export default function HeadingShowcase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Heading Components
      </Heading>

      <div className={styles.componentGrid}>
        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Heading H1 - Large</div>
          <div className={styles.componentContent}>
            <Heading as="h1" variant="large">
              Large Heading
            </Heading>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Heading H2 - Medium</div>
          <div className={styles.componentContent}>
            <Heading as="h2" variant="medium">
              Medium Heading
            </Heading>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Heading H3 - Small</div>
          <div className={styles.componentContent}>
            <Heading as="h3" variant="small">
              Small Heading
            </Heading>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Heading H4 - Small</div>
          <div className={styles.componentContent}>
            <Heading as="h4" variant="small">
              H4 Small Heading
            </Heading>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Heading H5 - Small</div>
          <div className={styles.componentContent}>
            <Heading as="h5" variant="small">
              H5 Small Heading
            </Heading>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Heading H6 - Small</div>
          <div className={styles.componentContent}>
            <Heading as="h6" variant="small">
              H6 Small Heading
            </Heading>
          </div>
        </div>
      </div>
    </section>
  );
}
