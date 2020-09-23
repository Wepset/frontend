import React, { createContext, useContext, useState, useCallback } from 'react';
import PersonService from '../http/Person';

const ProductsContext = createContext({
  products: [],
  seller: {},
  customer: {},
});

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState({});
  const [customer, setCustomer] = useState({});

  const searchPerson = useCallback((e) => {
    const stringSearched = e.target.value.toUpperCase();
    const regexSearch = stringSearched.match(/^\d+$/);
    let queryString = ``;

    if (regexSearch) {
      queryString = `id=${stringSearched}`;
    } else {
      queryString = `razao_social_nome=${stringSearched}`;
    }

    const person = new PersonService();

    return person.get(queryString);
  }, []);

  return (
    <ProductsContext.Provider value={{products, setProducts, seller, setSeller, customer, setCustomer, searchPerson}}>
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