export interface SelectedFile {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}
export interface CompressedFile {
  before: SelectedFile;
  after: SelectedFile;
}
