/**
 * @author hypnosnova / https://github.com/HypnosNova
 */
export default class BlobDownloader {
    static readonly READY = 1;
    static readonly NONE = 0;
    static readonly ERROR = -1;
    static readonly PROGRESSING = 2;
    url: string;
    blob: Blob;
    state: number;
    private static readonly instance;
    private readonly link;
    private blobUrl;
    constructor(urlOrBlob?: string | Blob, fileName?: string);
    update(urlOrBlob: string | Blob, fileName?: string): Promise<void | this>;
    download(fileName?: string): this;
    static download(url: string, defaultName?: string): Promise<BlobDownloader>;
    private setBlob;
}
