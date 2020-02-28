import SignedUrl from "./signedUrl";
import UploadConfiguration from "./uploadConfiguration";
import UploadResponse from "./uploadReponse";
import FileInfo from "./fileInfo";

export default interface Uploader {
  getSignedUrl(): Promise<SignedUrl>;
  getConfigurations(): Promise<UploadConfiguration>;
  parseResponse(response: Response): Promise<UploadResponse>;
  prepareToSend(fileInfo: FileInfo): Promise<Buffer>;
}
