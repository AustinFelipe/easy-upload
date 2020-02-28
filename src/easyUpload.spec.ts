import EasyUpload from "./easyUpload";
import testApp, { PORT, SEND_FILE_URL } from "../testServer";
import TestUploader from "../testServer/testUploadImplementation";
import TestFileInfo from "../testServer/testFileInfoImplementation";
import { Server } from "http";

describe("test uploader implementation", () => {
  let server: Server;

  beforeAll(() => {
    server = testApp.listen(PORT);
  });

  it("should work with default implementation", async () => {
    const uploaderImpl = new TestUploader();
    const uploader = new EasyUpload(uploaderImpl);
    const fileInfo = new TestFileInfo();

    const result = await uploader.sendFile(fileInfo);

    expect(result.url).toBe(SEND_FILE_URL);
  });

  afterAll(() => {
    server.close();
  });
});
