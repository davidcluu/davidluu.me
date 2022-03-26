import type { ReactNode } from 'react';

import { Fragment, useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export default ClientOnly;
