import { Toaster as Sonner, type ToasterProps } from 'sonner';

const resolveTheme = (): ToasterProps['theme'] => {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={resolveTheme()}
      richColors
      closeButton
      className="toaster group"
      style={{
        ['--normal-bg' as any]: 'var(--popover)',
        ['--normal-text' as any]: 'var(--popover-foreground)',
        ['--normal-border' as any]: 'var(--border)'
      }}
      {...props}
    />
  );
};

export { Toaster };
