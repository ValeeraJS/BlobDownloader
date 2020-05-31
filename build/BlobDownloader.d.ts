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
    constructor(url?: string, defaultName?: string);
    update(url: string, defaultName?: string): Promise<void>;
    download(defaultName?: string): this;
    static download(url: string, defaultName?: string): Promise<BlobDownloader>;
}
