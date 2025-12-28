
export interface OCRResult {
  text: string;
  success: boolean;
  error?: string;
}

export interface FileData {
  base64: string;
  mimeType: string;
  previewUrl: string;
}
