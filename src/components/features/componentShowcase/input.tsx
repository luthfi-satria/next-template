'use client';

import { useState } from 'react';
import styles from '@/app/components/page.module.scss';
import Block from '@/components/common/blocks/block';
import Grid from '@/components/common/blocks/grid';
import Card from '@/components/common/cards/card';
import Heading from '@/components/common/headings/heading';
import Input from '@/components/common/inputs/input';
import Label from '@/components/common/inputs/label';

export default function InputShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  return (
    <Block as="section" className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Input Components
      </Heading>

      <Grid>
        <Card>
          <Label>Input - Default</Label>
          <Block as="div" className={styles.componentContent}>
            <Input
              type="text"
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setInputError(false);
              }}
            />
          </Block>
        </Card>

        {/* Input - With Error */}
        <Card>
          <Label>Input - With Error</Label>
          <Block as="div" className={styles.componentContent}>
            <Input
              type="text"
              placeholder="Invalid input..."
              error={inputError}
              errorText="This field is required"
              onClick={() => setInputError(true)}
            />
          </Block>
        </Card>

        {/* Input - Disabled */}
        <Card>
          <Label>Input - Disabled</Label>
          <Block as="div" className={styles.componentContent}>
            <Input type="text" placeholder="Disabled input..." disabled />
          </Block>
        </Card>

        {/* Input - With Value */}
        <Card>
          <Label>Input - With Value</Label>
          <Block as="div" className={styles.componentContent}>
            <Input type="text" placeholder="With value" defaultValue="Sample value" />
          </Block>
        </Card>

        {/* Input - Email */}
        <Card>
          <Label>Input - Email</Label>
          <Block as="div" className={styles.componentContent}>
            <Input type="email" placeholder="your@email.com" />
          </Block>
        </Card>

        {/* Input - Password */}
        <Card>
          <Label>Input - Password</Label>
          <Block as="div" className={styles.componentContent}>
            <Input type="password" placeholder="••••••••" />
          </Block>
        </Card>
      </Grid>
    </Block>
  );
}
