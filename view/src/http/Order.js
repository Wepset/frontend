import api from './../service/api.js';

class Order {
    create(id) {
        return api.post('orders', { id: id });
    }

    index() {
        return api.get('orders');
    }
}

export default Order;