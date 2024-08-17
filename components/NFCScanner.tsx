import { useState } from "react";
import { NDEFReader } from "ndef";
import { Button } from "./ui/button";

interface NDEFRecord {
  encoding: string;
  data: ArrayBuffer;
  mediaType?: string;
  id?: string;
}

const NFCScanner = () => {
  const [scanning, setScanning] = useState(false);

  const startScan = async () => {
    if ("NDEFReader" in window) {
      const reader = new NDEFReader();

      try {
        console.log("Scan started...");
        setScanning(true);

        await reader.scan();

        reader.onreading = (event) => {
          const { message } = event;

          message.records.forEach((record: NDEFRecord) => {
            const textDecoder = new TextDecoder(record.encoding);
            const rfidData = textDecoder.decode(record.data);

            console.log("RFID Detected:", rfidData);
          });

          setScanning(false);
        };
      } catch (error) {
        console.error("Error during scan:", error);
        setScanning(false);
      }
    } else {
      console.error("Web NFC API is not supported in this browser.");
    }
  };

  return (
    <div>
      <Button onClick={startScan} disabled={scanning}>
        {scanning ? "Scanning in progress..." : "Scan RFID"}
      </Button>
    </div>
  );
};

export default NFCScanner;
