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

    constructor(urlOrBlob?: string | Blob, fileName?: string) {
        if (urlOrBlob) {
            this.update(urlOrBlob, fileName);
        }
    }

    public async update(urlOrBlob: string | Blob, fileName?: string): Promise<this> {
        this.link.download = fileName || "download";
        this.state = BlobDownloader.PROGRESSING;

        if (typeof urlOrBlob === "string") {
            return fetch(urlOrBlob).then((res: Response) => {
                return res.blob();
            }).then((blob: Blob) => {
                this.setBlob(blob);
                return this;
            }).catch((error: any) => {
                this.state = BlobDownloader.ERROR;
                console.error(error);
                return this;
            });
        } else {
            return Promise.resolve(this.setBlob(urlOrBlob));
        }
    }

    public download(fileName?: string): this {
        if (fileName) {
            this.link.download = fileName;
        }
        if (this.state === BlobDownloader.READY) {
            this.link.click();
        } else {
            console.error("The file hasn't been ready.");
        }
        return this;
    }

    public static async download(url: string | Blob, defaultName?: string): Promise<BlobDownloader> {
        let ins = BlobDownloader.instance;
        await ins.update(url);
        return ins.download(defaultName);
    }

    private setBlob(blob: Blob): this {
        this.state = BlobDownloader.READY;
        this.blob = blob;
        this.blobUrl = URL.createObjectURL(blob);
        this.link.href = this.blobUrl;
        return this;
    }
}
