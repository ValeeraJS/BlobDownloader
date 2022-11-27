/**
 * @author hypnosnova / https://github.com/HypnosNova
 */
export default class BlobDownloader {
    #private;
    static readonly State: {
        ERROR: number;
        NONE: number;
        PROGRESSING: number;
        READY: number;
    };
    static download(url: string | Blob, defaultName?: string): Promise<BlobDownloader>;
    blob: Blob;
    state: number;
    private readonly link;
    constructor(urlOrBlob?: string | Blob, fileName?: string);
    update(urlOrBlob: string | Blob, fileName?: string): Promise<this>;
    download(fileName?: string): this;
    private setBlob;
}
