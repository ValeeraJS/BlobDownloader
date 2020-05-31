(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.BlobDownloader = factory());
}(this, (function () { 'use strict';

	/**
	 * @author hypnosnova / https://github.com/HypnosNova
	 */
	// enum ETarget {
	//     SELF = "_self",
	//     BLANK = "_blank"
	// };
	class BlobDownloader {
	    constructor(url) {
	        this.state = BlobDownloader.NONE;
	        this.link = document.createElement('a');
	        this.link.download = "download";
	        if (url) {
	            this.update(url);
	        }
	    }
	    async update(url) {
	        // this.link.target = target;
	        this.state = BlobDownloader.PROGRESSING;
	        return fetch(url).then((res) => {
	            return res.blob();
	        }).then((blob) => {
	            this.state = BlobDownloader.READY;
	            this.blob = blob;
	            this.blobUrl = URL.createObjectURL(blob);
	            this.link.href = this.blobUrl;
	        });
	    }
	    download() {
	        if (this.state === BlobDownloader.READY) {
	            // document.body.appendChild(this.link);
	            this.link.click();
	            // document.body.removeChild(this.link);
	        }
	        else {
	            console.error("The file hasn't been ready.");
	        }
	    }
	    static async download(url) {
	        await BlobDownloader.instance.update(url);
	        BlobDownloader.instance.download();
	        return BlobDownloader.instance;
	    }
	}
	BlobDownloader.READY = 1;
	BlobDownloader.NONE = 0;
	BlobDownloader.ERROR = -1;
	BlobDownloader.PROGRESSING = 2;
	BlobDownloader.instance = new BlobDownloader();

	return BlobDownloader;

})));
