import Uploader from "./contracts/uploader";
import UploadResponse from "./contracts/uploadReponse";
import FileInfo from "./contracts/fileInfo";
import { httpRequest } from "./utils/httpRequest";

export default class EasyUpload {
  constructor(private uploader: Uploader) {}

  async sendFile(fileInfo: FileInfo): Promise<UploadResponse> {
    const { signedUrl } = await this.uploader.getSignedUrl();
    const { headers, sendMethod } = await this.uploader.getConfigurations();
    const body = await this.uploader.prepareToSend(fileInfo);

    const response = await httpRequest(signedUrl, {
      headers: headers,
      method: sendMethod,
      body: body
    });

    return await this.uploader.parseResponse(response);
  }
}
