import React, { createContext, useContext, useState } from 'react';

const ProductsContext = createContext({
  products: [],
});

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  return (
    <ProductsContext.Provider value={{products, setProducts}}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within an ProductsProvider');
  }

  return context;
}