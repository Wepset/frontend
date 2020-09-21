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
    create(id) {
        return api.post('orders', { id: id });
    }
}

export default Order;