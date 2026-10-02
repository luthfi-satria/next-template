import styles from '@/app/themes/page.module.scss';
import { useThemeStore } from '@/stores/theme-store';

export default function BorderThemes() {
  const { handleCopy } = useThemeStore();
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Borders, Shadows & Elevation</h2>
        <p>Efek kedalaman layer dan sudut kelengkungan elemen.</p>
      </div>

      <div className={styles.demoGrid}>
        <button
          type="button"
          className={`${styles.demoCard} ${styles.shadowSm}`}
          onClick={() => handleCopy('$shadow-sm')}
        >
          <span>$shadow-sm</span>
          <small>Soft Elevation</small>
        </button>
        <button
          className={`${styles.demoCard} ${styles.shadowMd}`}
          onClick={() => handleCopy('$shadow-md')}
          type="button"
        >
          <span>$shadow-md</span>
          <small>Medium Elevation / Card</small>
        </button>
        <button
          className={`${styles.demoCard} ${styles.shadowLg}`}
          onClick={() => handleCopy('$shadow-lg')}
          type="button"
        >
          <span>$shadow-lg</span>
          <small>High Elevation / Modal</small>
        </button>
        <button
          type="button"
          className={`${styles.demoCard} ${styles.radiusLg}`}
          onClick={() => handleCopy('$border-radius-lg')}
        >
          <span>$border-radius-lg</span>
          <small>Rounded 12px</small>
        </button>
      </div>
    </section>
  );
}
