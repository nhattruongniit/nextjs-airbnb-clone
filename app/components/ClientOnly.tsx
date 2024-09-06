// using by fix hydration issue
'use client';

import React from 'react';

function ClientOnly({ children }: React.PropsWithChildren) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, [])

  if(!hasMounted) {
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}

export default ClientOnly