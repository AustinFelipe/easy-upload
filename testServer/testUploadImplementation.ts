import Uploader from "../src/contracts/uploader";
import UploadConfiguration from "../src/contracts/uploadConfiguration";
import UploadResponse from "../src/contracts/uploadReponse";
import FileInfo from "../src/contracts/fileInfo";
import SignedUrl from "../src/contracts/signedUrl";
import { PORT } from "./index";
import { httpRequest } from "../src/utils/httpRequest";

class TestSignedUrl implements SignedUrl {
  signedUrl: string = "";
}

class TestUploadConfiguration implements UploadConfiguration {
  headers: Record<string, string> = {
    "Content-Type": "multipart/form-data"
  };
  sendMethod: string = "POST";
}

class TestUploadResponse implements UploadResponse {
  url: string = "";
}

export default class TestUploader implements Uploader {
  async getSignedUrl(): Promise<SignedUrl> {
    const response = await httpRequest(`http://localhost:${PORT}/signedUrl`);
    const { url } = await response.json();
    const result = new TestSignedUrl();

    result.signedUrl = url;

    return result;
  }

  getConfigurations(): Promise<UploadConfiguration> {
    return new Promise(resolve => resolve(new TestUploadConfiguration()));
  }

  async parseResponse(response: Response): Promise<UploadResponse> {
    const { url } = await response.json();
    const uploadResponse = new TestUploadResponse();

    uploadResponse.url = url;

    return uploadResponse;
  }

  prepareToSend(_fileInfo: FileInfo): Promise<Buffer> {
    return new Promise(resolve => resolve(Buffer.alloc(0)));
  }
}
