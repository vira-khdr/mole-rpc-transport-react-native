class TransportWebViewToRN {
    constructor({ windowListener }) {
        this.windowListener = windowListener;
    }

    async onData(callback) {
        this.windowListener.addEventListener(async reqData => {
            const resData = await callback(reqData);

            if (!resData) return;

            this.windowListener.postMessage(resData);
        });
    }

    async sendData(data) {
        this.windowListener.postMessage(data);
    }
}

export default TransportWebViewToRN;
