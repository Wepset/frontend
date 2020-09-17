import api from './../service/api.js';

class Product {
    /** @var {String} */
    static PDF = "127.0.0.1:8080/api/products/pdf";

    /** @var {String} */
    static CSV = "127.0.0.1:8080/api/products/csv";

    /**
     * Display a listing of the resource.
     * 
     * @param {Void}
     */
    index() {
        return api.get('products');
    }

    /**
     * Get an listing of products with some conditions.
     * 
     * @param {String} args 
     */
    get(args) {
        return api.get(`getproducts?${args}`);
    }
}

export default Product;