import { useEffect } from 'react';
import styles from '@/app/themes/page.module.scss';
import Blocks from '@/components/common/blocks/blocks';
import { useThemeStore } from '@/stores/theme-store';

export default function ColourThemes() {
  const { filteredColor, handleCopy, setFilteredColor } = useThemeStore();
  useEffect(() => {
    if (!filteredColor || filteredColor.length === 0) {
      setFilteredColor();
    }
  }, [filteredColor, setFilteredColor]);

  return (
    <Blocks as="section" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Color Palette</h2>
        <p>Klik pada kartu warna untuk menyalin nama variabel SCSS.</p>
      </div>

      <div className={styles.colorGrid}>
        {filteredColor.map((color) => (
          <button
            key={color.name}
            type="button"
            className={styles.colorCard}
            onClick={() => handleCopy(color.name)}
          >
            <div className={styles.swatch} style={{ backgroundColor: color.hex }} />
            <div className={styles.colorMeta}>
              <span className={styles.category}>{color.category}</span>
              <span className={styles.varName}>{color.name}</span>
              <span className={styles.hex}>{color.hex}</span>
            </div>
          </button>
        ))}
      </div>
    </Blocks>
  );
}
