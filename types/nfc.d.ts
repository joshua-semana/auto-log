interface NDEFRecord {
  encoding: string;
  data: ArrayBuffer;
  mediaType?: string;
  id?: string;
}

interface NDEFMessage {
  records: NDEFRecord[];
}

interface NDEFReadingEvent {
  message: NDEFMessage;
  serialNumber: string;
}

declare class NDEFReader {
  scan(): Promise<void>;
  write(message: string | Uint8Array | ArrayBuffer): Promise<void>;
  makeReadOnly(): Promise<void>;

  addEventListener(type: 'reading', listener: (event: NDEFReadingEvent) => void): void;
  addEventListener(type: 'readingerror', listener: () => void): void;
  removeEventListener(type: 'reading', listener: (event: NDEFReadingEvent) => void): void;
  removeEventListener(type: 'readingerror', listener: () => void): void;
}