type BlocksProps = React.HTMLAttributes<HTMLElement> & {
  as: 'div' | 'section' | 'article' | 'main';
  children: React.ReactNode;
};
export default function Blocks({ as: Component, children, ...rest }: BlocksProps) {
  return (
    <Component className={`${rest.className ?? ''}`} {...rest}>
      {children}
    </Component>
  );
}
