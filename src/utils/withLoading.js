import React from 'react';
import Button from '../components/Button/Button.component';
import Loading from '../Loading/Loading.component';

const withLoading =
  (Component) =>
  ({ isLoading, ...rest }) =>
    isLoading ? <Loading /> : <Component {...rest} />;

export const ButtonWithLoading = withLoading(Button);
