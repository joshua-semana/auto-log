import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const NFCScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startScan = async () => {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();

      try {
        setScanning(true);
        setError(null);
        console.log("Scan started...");

        await ndef.scan();
        console.log("> Scan started");

        ndef.addEventListener("readingerror", () => {
          setError("Cannot read data from the NFC tag. Try another one?");
        });

        ndef.addEventListener("reading", (event: NDEFReadingEvent) => {
          const { message, serialNumber } = event;
          const logs = [`Serial Number: ${serialNumber}`, `Records: (${message.records.length})`];

          message.records.forEach((record) => {
            const textDecoder = new TextDecoder(record.encoding);
            const rfidData = textDecoder.decode(record.data);
            logs.push(`RFID Detected: ${rfidData}`);
          });

          console.log(logs.join("\n"));
          alert(logs.join("\n"));
        });
      } catch (error) {
        setError(`Argh! ${error}`);
        console.error("Error during scan:", error);
      } finally {
        setScanning(false);
      }
    } else {
      setError("Web NFC API is not supported in this browser.");
    }

    // Clean up event listeners on component unmount
    return () => {
      const ndef = new NDEFReader();
      ndef.removeEventListener("readingerror", () => {});
      ndef.removeEventListener("reading", () => {});
    };
  };

  return (
    <div>
      <Button onClick={() => startScan()} disabled={scanning}>
        {scanning ? "Scanning in progress..." : "Scan RFID"}
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default NFCScanner;
