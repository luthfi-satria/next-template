import styles from '@/app/components/page.module.scss';
import Heading from '@/components/common/headings/heading';

export default function BadgeShowcase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Badge Components
      </Heading>

      <div className={styles.componentGrid}>
        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Badge - Default</div>
          <div className={styles.stateVariation}>
            <span className={`${styles.badge} ${styles.default}`}>Default</span>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Badge - Success</div>
          <div className={styles.stateVariation}>
            <span className={`${styles.badge} ${styles.success}`}>✓ Success</span>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Badge - Error</div>
          <div className={styles.stateVariation}>
            <span className={`${styles.badge} ${styles.error}`}>✕ Error</span>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Badge - Warning</div>
          <div className={styles.stateVariation}>
            <span className={`${styles.badge} ${styles.warning}`}>⚠ Warning</span>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Badge - Info</div>
          <div className={styles.stateVariation}>
            <span className={`${styles.badge} ${styles.info}`}>ℹ Info</span>
          </div>
        </div>
      </div>
    </section>
  );
}
