type BlocksProps = React.HTMLAttributes<HTMLElement> & {
  as: 'div' | 'section' | 'article' | 'main' | 'span' | 'p';
  children?: React.ReactNode;
};
export default function Block({ as: Component, children, ...rest }: BlocksProps) {
  return (
    <Component className={`${rest.className ?? ''}`} {...rest}>
      {children}
    </Component>
  );
}
