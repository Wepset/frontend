import api from './../service/api.js';

class Product {
    /**
     * Get an listing of products with some conditions.
     * 
     * @param {String} args 
     */
    get(queryString) {
        return api.get(`products?${queryString}`);
    }
}

export default Product;