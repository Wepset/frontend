import api from './../service/api.js';

class Product {
    /** @var {String} */
    static PDF = "127.0.0.1:8080/api/products/pdf";

    /** @var {String} */
    static CSV = "127.0.0.1:8080/api/products/csv";

    get(args) {
        return api.get('products');
    }
}

export default Product;