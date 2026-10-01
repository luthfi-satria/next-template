import styles from '@/app/themes/page.module.scss';
import { BREAKPOINTS, SPACING_TOKENS } from '@/constants/themes';
import { useThemeStore } from '@/stores/theme-store';
export default function SpacingThemes() {
  const { handleCopy } = useThemeStore();
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Spacing Scale & Breakpoints</h2>
        <p>Konsistensi ukuran margin, padding, dan batas layar responsif.</p>
      </div>

      <div className={styles.twoColumnGrid}>
        <div className={styles.cardBox}>
          <h3>Spacing Tokens</h3>
          <div className={styles.spacingList}>
            {SPACING_TOKENS.map((item) => (
              <button
                type="button"
                key={item.name}
                className={styles.spacingRow}
                onClick={() => handleCopy(item.name)}
              >
                <span className={styles.spacingCode}>{item.name}</span>
                <div className={styles.spacingBarWrapper}>
                  <div className={styles.spacingBar} style={{ width: item.size }} />
                </div>
                <span className={styles.spacingVal}>{item.size}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.cardBox}>
          <h3>Responsive Breakpoints</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Value</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              {BREAKPOINTS.map((bp) => (
                <tr key={bp.name} onClick={() => handleCopy(bp.name)}>
                  <td>
                    <code>{bp.name}</code>
                  </td>
                  <td>
                    <strong>{bp.val}</strong>
                  </td>
                  <td>{bp.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
