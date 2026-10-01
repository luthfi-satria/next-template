import styles from '@/app/themes/page.module.scss';
import Blocks from '@/components/common/blocks/blocks';
import { useThemeStore } from '@/stores/theme-store';

export default function ThemeFilter() {
  const { setActiveTab, activeTab, search, setSearch } = useThemeStore();
  return (
    <Blocks as="section" className={`div-block ${styles.toolbar}`}>
      <div className={styles.tabs}>
        {(['all', 'colors', 'typography', 'spacing', 'elevation'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Find variable (e.g., $primary, #2563eb)..."
          value={search ?? ''}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </Blocks>
  );
}
