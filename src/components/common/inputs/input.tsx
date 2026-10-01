'use client';

import { useState } from 'react';
import styles from '@/app/components/page.module.scss';
import Heading from '@/components/common/headings/heading';

export default function InputShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);

  return (
    <section className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Input Components
      </Heading>

      <div className={styles.componentGrid}>
        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Input - Default</div>
          <div className={styles.componentContent}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setInputError(false);
              }}
            />
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Input - With Error</div>
          <div className={styles.componentContent}>
            <div>
              <input
                type="text"
                className={`${styles.input} ${styles.error}`}
                placeholder="Invalid input..."
                onClick={() => setInputError(true)}
              />
              {inputError && <div className={styles.errorText}>This field is required</div>}
            </div>
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Input - Disabled</div>
          <div className={styles.componentContent}>
            <input type="text" className={styles.input} placeholder="Disabled input..." disabled />
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Input - With Value</div>
          <div className={styles.componentContent}>
            <input
              type="text"
              className={styles.input}
              placeholder="With value"
              defaultValue="Sample value"
            />
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Input - Email</div>
          <div className={styles.componentContent}>
            <input type="email" className={styles.input} placeholder="your@email.com" />
          </div>
        </div>

        <div className={styles.componentCard}>
          <div className={styles.componentLabel}>Input - Password</div>
          <div className={styles.componentContent}>
            <input type="password" className={styles.input} placeholder="••••••••" />
          </div>
        </div>
      </div>
    </section>
  );
}
