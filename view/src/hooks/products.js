import React, { createContext, useContext, useState } from 'react';

const ProductsContext = createContext({
  products: [],
  seller: {},
  customer: {},
});

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState({});
  const [customer, setCustomer] = useState({});

  return (
    <ProductsContext.Provider value={{products, setProducts, seller, setSeller, customer, setCustomer}}>
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