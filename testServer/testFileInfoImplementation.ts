import FileInfo from "../src/contracts/fileInfo";

export default class TestFileInfo implements FileInfo {
  name: string = "test.jpg";
  fileType: string = "jpeg";
}
