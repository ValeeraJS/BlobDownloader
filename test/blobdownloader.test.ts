/* eslint-disable max-nested-callbacks */
import BlobDownloader from "../src/BlobDownloader";
import { expect } from "chai";

describe("normal api", function () {
	it("url in blobdownloader", function () {
		const downloader = new BlobDownloader("./../examples/test.png", "xxx.png");

		downloader.download();
		expect(downloader.state).to.equal(BlobDownloader.State.PROGRESSING);
	});
	it("update url", function () {
		const downloader = new BlobDownloader();

		downloader.update("./../examples/test.png").then(() => {
			expect(downloader.state).to.equal(BlobDownloader.State.READY);
		});
	});
	it("update url error", function () {
		const downloader = new BlobDownloader();

		downloader.update("./../examples/zzzz.png").catch(() => {
			expect(downloader.state).to.equal(BlobDownloader.State.READY);
		});
	});
});

describe("static api", function () {
	it("download url", function () {
		BlobDownloader.download("./../examples/test.png", "xxx.png");
		expect(BlobDownloader).to.equal(BlobDownloader);
	});
});
