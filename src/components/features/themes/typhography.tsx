import styles from '@/app/themes/page.module.scss';
import { useThemeStore } from '@/stores/theme-store';

export default function TypographyThemes() {
  const { handleCopy } = useThemeStore();
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Typography & Font Sizes</h2>
        <p>Pengaturan hierarki teks dan ukuran font standar.</p>
      </div>

      <div className={styles.typoContainer}>
        <button
          type="button"
          className={styles.typoItem}
          onClick={() => handleCopy('$font-size-extra-large')}
        >
          <div className={styles.typoLabel}>
            <code>$font-size-extra-large</code> (2.5rem / 40px)
          </div>
          <h1 style={{ fontSize: '2.5rem' }}>The quick brown fox jumps</h1>
        </button>

        <button
          type="button"
          className={styles.typoItem}
          onClick={() => handleCopy('$font-size-large')}
        >
          <div className={styles.typoLabel}>
            <code>$font-size-large</code> (2rem / 32px)
          </div>
          <h2 style={{ fontSize: '2rem' }}>The quick brown fox jumps</h2>
        </button>

        <button
          type="button"
          className={styles.typoItem}
          onClick={() => handleCopy('$font-size-medium')}
        >
          <div className={styles.typoLabel}>
            <code>$font-size-medium</code> (1.5rem / 24px)
          </div>
          <h3 style={{ fontSize: '1.5rem' }}>The quick brown fox jumps over the lazy dog</h3>
        </button>

        <button
          type="button"
          className={styles.typoItem}
          onClick={() => handleCopy('$font-size-base')}
        >
          <div className={styles.typoLabel}>
            <code>$font-size-base</code> (1rem / 16px) - Body Text
          </div>
          <p style={{ fontSize: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </button>
      </div>
    </section>
  );
}
