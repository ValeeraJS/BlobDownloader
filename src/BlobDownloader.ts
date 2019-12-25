/**
 * @author hypnosnova / https://github.com/HypnosNova
 */

export default class BlobDownloader {
    public static readonly READY = 1;
    public static readonly NONE = 0;
    public static readonly ERROR = -1;
    public static readonly PROGRESSING = 2;

    public url: string;
    public blob: Blob;
    public state = BlobDownloader.NONE;

    private static readonly instance = new BlobDownloader();
    private readonly link = document.createElement('a');
    private blobUrl: string;

    constructor(url?: string) {
        this.link.download = "download";
        if (url) {
            this.update(url);
        }
    }

    public async update(url: string) {
        this.state = BlobDownloader.PROGRESSING;
        return fetch(url).then((res: Response) => {
            return res.blob();
        }).then((blob: Blob) => {
            this.state = BlobDownloader.READY;
            this.blob = blob;
            this.blobUrl = URL.createObjectURL(blob);
            this.link.href = this.blobUrl;
        }).catch((error: any) => {
            this.state = BlobDownloader.ERROR;
            console.error(error);
        });
    }

    public download() {
        if (this.state === BlobDownloader.READY) {
            this.link.click();
        } else {
            console.error("The file hasn't been ready.");
        }
    }

    public static async download(url: string) {
        await BlobDownloader.instance.update(url);
        BlobDownloader.instance.download();
        return BlobDownloader.instance;
    }
}