/**
 * @author hypnosnova / https://github.com/HypnosNova
 */
class BlobDownloader {
    constructor(url, defaultName) {
        this.state = BlobDownloader.NONE;
        this.link = document.createElement('a');
        if (url) {
            this.update(url, defaultName);
        }
    }
    async update(url, defaultName) {
        this.link.download = defaultName || "download";
        this.state = BlobDownloader.PROGRESSING;
        return fetch(url).then((res) => {
            return res.blob();
        }).then((blob) => {
            this.state = BlobDownloader.READY;
            this.blob = blob;
            this.blobUrl = URL.createObjectURL(blob);
            this.link.href = this.blobUrl;
        }).catch((error) => {
            this.state = BlobDownloader.ERROR;
            console.error(error);
        });
    }
    download(defaultName) {
        if (defaultName) {
            this.link.download = defaultName;
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
}
BlobDownloader.READY = 1;
BlobDownloader.NONE = 0;
BlobDownloader.ERROR = -1;
BlobDownloader.PROGRESSING = 2;
BlobDownloader.instance = new BlobDownloader();

export default BlobDownloader;
