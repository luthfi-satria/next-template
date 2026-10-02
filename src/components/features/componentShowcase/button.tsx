'use client';

import { useState } from 'react';
import styles from '@/app/components/page.module.scss';
import Block from '@/components/common/blocks/block';
import Grid from '@/components/common/blocks/grid';
import ButtonComponent, { type ButtonVariant } from '@/components/common/buttons/button';
import Card from '@/components/common/cards/card';
import Heading from '@/components/common/headings/heading';
import Label from '@/components/common/inputs/label';

export default function ButtonShowcase() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const buttonVariants: ButtonVariant[] = [
    'default',
    'primary',
    'success',
    'danger',
    'outline',
    'disabled',
  ];
  return (
    <Block as="section" className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Button Components
      </Heading>

      <Grid>
        {buttonVariants.map((variant) => (
          <Card key={variant}>
            <Label variant="div">
              Button - {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Label>
            <Block as="div" className={styles.stateVariation}>
              <ButtonComponent
                type="button"
                variant={variant}
                onClick={() => setSelectedButton(variant)}
                disabled={variant === 'disabled'}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </ButtonComponent>
            </Block>
          </Card>
        ))}
      </Grid>

      {selectedButton && (
        <Block as="div" className={styles.feedbackText}>
          Last clicked button: <strong>{selectedButton}</strong>
        </Block>
      )}
    </Block>
  );
}
