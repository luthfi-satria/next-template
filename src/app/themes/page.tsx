'use client';
import BorderThemes from '@/components/features/themes/border';
import ColourThemes from '@/components/features/themes/colourThemes';
import HeaderThemes from '@/components/features/themes/headerThemes';
import SpacingThemes from '@/components/features/themes/spacing';
import TypographyThemes from '@/components/features/themes/typhography';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { useThemeStore } from '@/stores/theme-store';
import styles from './page.module.scss';

export default function ThemesPage() {
  const { copiedText, activeTab } = useThemeStore();
  return (
    <DashboardLayout>
      <div className={styles.container}>
        {copiedText && (
          <div className={styles.toast}>
            Copied <code>{copiedText}</code> to clipboard!
          </div>
        )}
        <HeaderThemes />
        <main className={`${styles.content}`}>
          {/* SECTION 1: COLORS */}
          {(activeTab === 'all' || activeTab === 'colors') && <ColourThemes />}

          {/* SECTION 2: TYPOGRAPHY */}
          {(activeTab === 'all' || activeTab === 'typography') && <TypographyThemes />}

          {/* SECTION 3: SPACING & BREAKPOINTS */}
          {(activeTab === 'all' || activeTab === 'spacing') && <SpacingThemes />}

          {/* SECTION 4: BORDER RADIUS & ELEVATION */}
          {(activeTab === 'all' || activeTab === 'elevation') && <BorderThemes />}
        </main>
      </div>
    </DashboardLayout>
  );
}
