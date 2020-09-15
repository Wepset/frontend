import api from './../service/api.js';

class Consumer {
    /** @var {String} */
    static PDF = "127.0.0.1:8080/api/consumers/pdf";

    /** @var {String} */
    static CSV = "127.0.0.1:8080/api/consumers/csv";

    get(params) {
        const elements = Object.entries(params);

        const args = elements.map(arr => arr.join('=').toUpperCase());

        return api.get(`getconsumers?${args.join('&')}`);
    }
}

export default Consumer;