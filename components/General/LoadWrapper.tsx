import { FC, ReactNode } from 'react';
import LoadingState from '../../types/loadingState';

interface LoadingProps {
  loadingState: LoadingState,
  children: ReactNode
}

const LoadWrapper: FC<LoadingProps> = ({ loadingState, children }) => {
  switch (loadingState) {
  case LoadingState.PENDING:
    return <p>Loading...</p>;
  case LoadingState.FAILED:
    return <p>Failed to load data.</p>;
  }

  return (
    <>
      {children}    
    </>
  );
};

export default LoadWrapper;