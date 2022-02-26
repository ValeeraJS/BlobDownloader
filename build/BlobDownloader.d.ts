/**
 * @author hypnosnova / https://github.com/HypnosNova
 */
export default class BlobDownloader {
    static readonly State: {
        ERROR: number;
        NONE: number;
        PROGRESSING: number;
        READY: number;
    };
    private static readonly instance;
    static download(url: string | Blob, defaultName?: string): Promise<BlobDownloader>;
    url: string;
    blob: Blob;
    state: number;
    private readonly link;
    private blobUrl;
    constructor(urlOrBlob?: string | Blob, fileName?: string);
    update(urlOrBlob: string | Blob, fileName?: string): Promise<this>;
    download(fileName?: string): this;
    private setBlob;
}
