/**
 * @author hypnosnova / https://github.com/HypnosNova
 */

export default class BlobDownloader {
	public static readonly State = {
		ERROR: -1,
		NONE: 0,
		PROGRESSING: 2,
		READY: 1
	};

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	static readonly #instance = new BlobDownloader();
	public static async download(
		url: string | Blob,
		defaultName?: string
	): Promise<BlobDownloader> {
		const ins = BlobDownloader.#instance;

		await ins.update(url);

		return ins.download(defaultName);
	}

	#preClick = false;

	public blob: Blob;
	public state = BlobDownloader.State.NONE;

	private readonly link = window.document.createElement("a");

	public constructor(urlOrBlob?: string | Blob, fileName?: string) {
		if (urlOrBlob) {
			this.update(urlOrBlob, fileName);
		}
	}

	public async update(urlOrBlob: string | Blob, fileName?: string): Promise<this> {
		this.link.download = fileName || "download";
		this.state = BlobDownloader.State.PROGRESSING;

		if (typeof urlOrBlob === "string") {
			return fetch(urlOrBlob)
				.then((res: Response) => {
					return res.blob();
				})
				.then((blob: Blob) => {
					this.setBlob(blob);
					if (this.#preClick) {
						this.download();
					}

					return this;
				})
				.catch((error: any) => {
					this.state = BlobDownloader.State.ERROR;
					console.error(error);
					this.#preClick = false;

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
		if (this.state === BlobDownloader.State.READY) {
			this.link.click();
			this.#preClick = false;
		} else {
			if (this.state === BlobDownloader.State.PROGRESSING) {
				this.#preClick = true;
			} else {
				console.error("The file is not ready yet.");
			}
		}

		return this;
	}

	private setBlob(blob: Blob): this {
		this.state = BlobDownloader.State.READY;
		this.blob = blob;
		this.link.href = URL.createObjectURL(blob);

		return this;
	}
}
