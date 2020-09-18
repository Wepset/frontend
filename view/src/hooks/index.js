import React from 'react';

import { ProductsProvider } from './products';

function AppProvider({ children }) {
  return (
    <ProductsProvider>
      {children}
    </ProductsProvider>
  );
}

export default AppProvider;