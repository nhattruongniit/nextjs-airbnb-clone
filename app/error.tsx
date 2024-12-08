'use client';

import React from 'react';
import EmptyState from './components/EmptyState';

interface ErrorStateProps {
  error: Error;
}

function Error({ error }: ErrorStateProps) {

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState 
      title="Error"
      subtitle="An error occurred. Please try again later."
    />
  )
}

export default Error