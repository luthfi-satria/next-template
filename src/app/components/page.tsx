'use client';

import { useState } from 'react';

import Blocks from '@/components/common/blocks/blocks';
import Heading from '@/components/common/headings/heading';
import QuickStatsCard from '@/components/features/dashboard/quick-stats-card';
import WelcomeCard from '@/components/features/dashboard/welcome-card';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import styles from './page.module.scss';

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className={styles.showcaseContainer}>
        <Heading as="h1" variant="large" className={styles.pageTitle}>
          Component Showcase
        </Heading>

        {/* Heading Component Section */}
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

        {/* Button Component Section */}
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

        {/* Input Component Section */}
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
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Disabled input..."
                  disabled
                />
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

        {/* Badge Component Section */}
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

        {/* Stats Card Section */}
        <section className={styles.section}>
          <Heading as="h2" variant="medium" className={styles.sectionTitle}>
            Stats Card Components
          </Heading>

          <div className={styles.statsGrid}>
            <QuickStatsCard
              title="Total Users"
              value="12,345"
              icon="👥"
              trend="↑ 12% from last month"
            />
            <QuickStatsCard
              title="Revenue"
              value="$45,231"
              icon="💰"
              trend="↑ 8% from last month"
            />
            <QuickStatsCard
              title="Active Sessions"
              value="1,234"
              icon="⚡"
              trend="↓ 3% from last month"
            />
            <QuickStatsCard
              title="Completed Tasks"
              value="856"
              icon="✓"
              trend="↑ 24% from last month"
            />
          </div>
        </section>

        {/* Welcome Card Section */}
        <section className={styles.section}>
          <Heading as="h2" variant="medium" className={styles.sectionTitle}>
            Welcome Card Components
          </Heading>

          <div className={styles.welcomeCardContainer}>
            <WelcomeCard userName="John Doe" />
            <WelcomeCard userName="Jane Smith" />
          </div>
        </section>

        {/* Blocks Component Section */}
        <section className={styles.section}>
          <Heading as="h2" variant="medium" className={styles.sectionTitle}>
            Block Components
          </Heading>

          <div className={styles.componentGrid}>
            <Blocks as="div" className={styles.componentCard}>
              <div className={styles.componentLabel}>Block - Div</div>
              <p>Block component as div element</p>
            </Blocks>

            <Blocks as="section" className={styles.componentCard}>
              <div className={styles.componentLabel}>Block - Section</div>
              <p>Block component as section element</p>
            </Blocks>

            <Blocks as="article" className={styles.componentCard}>
              <div className={styles.componentLabel}>Block - Article</div>
              <p>Block component as article element</p>
            </Blocks>

            <Blocks as="main" className={styles.componentCard}>
              <div className={styles.componentLabel}>Block - Main</div>
              <p>Block component as main element</p>
            </Blocks>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
