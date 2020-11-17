(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.BlobDownloader = factory());
}(this, (function () { 'use strict';

	/**
	 * @author hypnosnova / https://github.com/HypnosNova
	 */
	class BlobDownloader {
	    constructor(urlOrBlob, fileName) {
	        this.state = BlobDownloader.NONE;
	        this.link = document.createElement('a');
	        if (urlOrBlob) {
	            this.update(urlOrBlob, fileName);
	        }
	    }
	    async update(urlOrBlob, fileName) {
	        this.link.download = fileName || "download";
	        this.state = BlobDownloader.PROGRESSING;
	        if (typeof urlOrBlob === "string") {
	            return fetch(urlOrBlob).then((res) => {
	                return res.blob();
	            }).then((blob) => {
	                this.setBlob(blob);
	                return this;
	            }).catch((error) => {
	                this.state = BlobDownloader.ERROR;
	                console.error(error);
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
	        if (this.state === BlobDownloader.READY) {
	            this.link.click();
	        }
	        else {
	            console.error("The file hasn't been ready.");
	        }
	        return this;
	    }
	    static async download(url, defaultName) {
	        let ins = BlobDownloader.instance;
	        await ins.update(url);
	        return ins.download(defaultName);
	    }
	    setBlob(blob) {
	        this.state = BlobDownloader.READY;
	        this.blob = blob;
	        this.blobUrl = URL.createObjectURL(blob);
	        this.link.href = this.blobUrl;
	        return this;
	    }
	}
	BlobDownloader.READY = 1;
	BlobDownloader.NONE = 0;
	BlobDownloader.ERROR = -1;
	BlobDownloader.PROGRESSING = 2;
	BlobDownloader.instance = new BlobDownloader();

	return BlobDownloader;

})));
