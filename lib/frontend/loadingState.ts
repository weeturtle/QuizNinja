import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingState from '../../types/loadingState';

const loadingState = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.PENDING);
  const [error, setError] = useState('');

  useEffect(() => {
    const routeEventStart = () => setLoadingState(LoadingState.PENDING);
    const routeEventEnd = () => setLoadingState(LoadingState.FULFILLED);
    const routeEventError = (error: Error) => {
      setError(error.message);
      setLoadingState(LoadingState.FAILED);
    };

    Router.events.on('routeChangeStart', routeEventStart);
    Router.events.on('routeChangeComplete', routeEventEnd);
    Router.events.on('routeChangeError', routeEventError);

    return () => {
      Router.events.off('routeChangeStart', routeEventStart);
      Router.events.off('routeChangeComplete', routeEventEnd);
      Router.events.off('routeChangeError', routeEventError);
    };
  });

  return {loadingState, error, setLoadingState};
};

export default loadingState;