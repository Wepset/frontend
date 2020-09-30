import api from './../service/api.js';

class Order {
    /**
     * Display a listing of the resource.
     * 
     * @param {Void}
     */
    index() {
        return api.get('orders');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  {Integer} id
     */
    create(id, quantity) {
        return api.post('orders', { id: id, quantity: quantity });
    }
}

export default Order;