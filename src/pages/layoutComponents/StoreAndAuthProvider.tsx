import store from 'store/store';
import React from 'react';
import { Provider } from 'react-redux';
import AuthProvider from './AuthProvider';

const StoreAndAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <>{children}</>
      </AuthProvider>
    </Provider>
  );
};

export default StoreAndAuthProvider;
