(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BlobDownloader = factory());
})(this, (function () { 'use strict';

	/**
	 * @author hypnosnova / https://github.com/HypnosNova
	 */
	class BlobDownloader {
	    static State = {
	        ERROR: -1,
	        NONE: 0,
	        PROGRESSING: 2,
	        READY: 1
	    };
	    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	    static #instance = new BlobDownloader();
	    static async download(url, defaultName) {
	        const ins = BlobDownloader.#instance;
	        await ins.update(url);
	        return ins.download(defaultName);
	    }
	    #preClick = false;
	    blob;
	    state = BlobDownloader.State.NONE;
	    link = window.document.createElement("a");
	    constructor(urlOrBlob, fileName) {
	        if (urlOrBlob) {
	            this.update(urlOrBlob, fileName);
	        }
	    }
	    async update(urlOrBlob, fileName) {
	        this.link.download = fileName || "download";
	        this.state = BlobDownloader.State.PROGRESSING;
	        if (typeof urlOrBlob === "string") {
	            return fetch(urlOrBlob)
	                .then((res) => {
	                return res.blob();
	            })
	                .then((blob) => {
	                this.setBlob(blob);
	                if (this.#preClick) {
	                    this.download();
	                }
	                return this;
	            })
	                .catch((error) => {
	                this.state = BlobDownloader.State.ERROR;
	                console.error(error);
	                this.#preClick = false;
	                return this;
	            });
	        }
	        else {
	            return Promise.resolve(this.setBlob(urlOrBlob));
	        }
	    }
	    download(fileName) {
	        if (fileName) {
	            this.link.download = fileName;
	        }
	        if (this.state === BlobDownloader.State.READY) {
	            this.link.click();
	            this.#preClick = false;
	        }
	        else {
	            if (this.state === BlobDownloader.State.PROGRESSING) {
	                this.#preClick = true;
	            }
	            else {
	                console.error("The file is not ready yet.");
	            }
	        }
	        return this;
	    }
	    setBlob(blob) {
	        this.state = BlobDownloader.State.READY;
	        this.blob = blob;
	        this.link.href = URL.createObjectURL(blob);
	        return this;
	    }
	}

	return BlobDownloader;

}));
//# sourceMappingURL=BlobDownloader.js.map
