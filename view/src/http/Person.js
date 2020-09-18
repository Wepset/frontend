import api from './../service/api.js';

class Person {
    /**
     * Display the specified resource.
     *
     * @param {Object} params
     */
    get(queryString) {
        return api.get(`people?${queryString}`);
    }
}

export default Person;