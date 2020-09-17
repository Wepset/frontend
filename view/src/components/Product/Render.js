class Render {
    /**
     * Constructor Method.
     * 
     * @param {Object} Args
     */
    constructor(Args = {}) {
        this.__ARGS = Args;

        if (this.isDatasetCorrect(this.__ARGS.header.fields, this.__ARGS.body.dataset) === false) {
            console.error(`dataset or header are wrong formatted.`);
        }
    }

    /**
     * Validate if the number of indexes in header and body content are equals.
     * 
     * @param {Object} Fields 
     * @param {Object} Dataset
     * 
     * @return {Boolean}
     */
    isDatasetCorrect(Fields = {}, Dataset = {}) {
        const __HEADER_LENGTH = Object.keys(Fields).length;

        Dataset.forEach((Element, Index, Array) => {
            if (Object.keys(Element).length !== __HEADER_LENGTH) {
                return false;
            }
        });

        return true;
    }

    main() {
        const main = document.createElement("div");
        main.class = "blurry box";
        document.body.appendChild(main);
    }
}