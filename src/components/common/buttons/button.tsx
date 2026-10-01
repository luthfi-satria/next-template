'use client';

import { useState } from 'react';
import styles from '@/app/components/page.module.scss';
import Heading from '@/components/common/headings/heading';

export default function ButtonShowcase() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  return (
    <section className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Button Components
      </Heading>

      <div className={styles.componentGrid}>
        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Button - Default</div>
          <div className={styles.stateVariation}>
            <button
              type="button"
              className={styles.button}
              onClick={() => setSelectedButton('default')}
            >
              Default
            </button>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Button - Primary</div>
          <div className={styles.stateVariation}>
            <button
              type="button"
              className={`${styles.button} ${styles.primary}`}
              onClick={() => setSelectedButton('primary')}
            >
              Primary
            </button>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Button - Success</div>
          <div className={styles.stateVariation}>
            <button
              type="button"
              className={`${styles.button} ${styles.success}`}
              onClick={() => setSelectedButton('success')}
            >
              Success
            </button>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Button - Danger</div>
          <div className={styles.stateVariation}>
            <button
              type="button"
              className={`${styles.button} ${styles.danger}`}
              onClick={() => setSelectedButton('danger')}
            >
              Danger
            </button>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Button - Outline</div>
          <div className={styles.stateVariation}>
            <button
              type="button"
              className={`${styles.button} ${styles.outline}`}
              onClick={() => setSelectedButton('outline')}
            >
              Outline
            </button>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Button - Disabled</div>
          <div className={styles.stateVariation}>
            <button type="button" className={styles.button} disabled>
              Disabled
            </button>
          </div>
        </div>
      </div>

      {selectedButton && (
        <div className={styles.feedbackText}>
          Last clicked button: <strong>{selectedButton}</strong>
        </div>
      )}
    </section>
  );
}
