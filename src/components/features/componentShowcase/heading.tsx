import styles from '@/app/components/page.module.scss';
import Block from '@/components/common/blocks/block';
import Grid from '@/components/common/blocks/grid';
import Card from '@/components/common/cards/card';
import Heading from '@/components/common/headings/heading';
import Label from '@/components/common/inputs/label';

export default function HeadingShowcase() {
  return (
    <Block as="section" className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Heading Components
      </Heading>

      <Grid>
        <Card>
          <Label variant="div">Heading H1 - Large</Label>
          <Block as="div" className={styles.componentContent}>
            <Heading as="h1" variant="large">
              Large Heading
            </Heading>
          </Block>
        </Card>

        <Card>
          <Label variant="div">Heading H2 - Medium</Label>
          <Block as="div" className={styles.componentContent}>
            <Heading as="h2" variant="medium">
              Medium Heading
            </Heading>
          </Block>
        </Card>

        <Card>
          <Label variant="div">Heading H3 - Small</Label>
          <Block as="div" className={styles.componentContent}>
            <Heading as="h3" variant="small">
              Small Heading
            </Heading>
          </Block>
        </Card>

        <Card>
          <Label variant="div">Heading H4 - Small</Label>
          <Block as="div" className={styles.componentContent}>
            <Heading as="h4" variant="small">
              H4 Small Heading
            </Heading>
          </Block>
        </Card>

        <Card>
          <Label variant="div">Heading H5 - Small</Label>
          <Block as="div" className={styles.componentContent}>
            <Heading as="h5" variant="small">
              H5 Small Heading
            </Heading>
          </Block>
        </Card>

        <Card>
          <Label variant="div">Heading H6 - Small</Label>
          <Block as="div" className={styles.componentContent}>
            <Heading as="h6" variant="small">
              H6 Small Heading
            </Heading>
          </Block>
        </Card>
      </Grid>
    </Block>
  );
}
