import type { ReactNode } from 'react';

import { Fragment, useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  PlaceholderComponent?: React.ComponentType<any>;
}

const ClientOnly = ({
  children,
  PlaceholderComponent,
  ...props
}: ClientOnlyProps): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return PlaceholderComponent ? <PlaceholderComponent {...props} /> : null;
  }

  return <Fragment>{children}</Fragment>;
};

export default ClientOnly;
