import styles from '@/app/components/page.module.scss';
import Block from '@/components/common/blocks/block';
import Grid from '@/components/common/blocks/grid';
import Card from '@/components/common/cards/card';
import Heading from '@/components/common/headings/heading';
import Label from '@/components/common/inputs/label';

type AllowedTags = 'div' | 'section' | 'article' | 'main' | 'span';
export default function BlockShowcase() {
  const blockElements: AllowedTags[] = ['div', 'section', 'article', 'main', 'span'];
  return (
    <Block as="section" className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Block Components
      </Heading>

      <Grid>
        {blockElements.map((element) => (
          <Card key={element}>
            <Label variant="div">
              Block - {element.charAt(0).toUpperCase() + element.slice(1)}
            </Label>
            <p>Block component as {element} element</p>
          </Card>
        ))}
      </Grid>
    </Block>
  );
}
