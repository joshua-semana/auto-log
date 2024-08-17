declare module 'ndef' {
  export class NDEFReader {
    scan(): Promise<void>;
    write(data: string): Promise<void>;
    onreading: (event: any) => void;
  }
}
