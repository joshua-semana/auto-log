"use client";

import NFCScanner from "@/components/NFCScanner";

export default function Home() {
  return (
    <main className="container py-4 text-center h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Welcome to AutoLog!</h1>
      <p className="text-lg max-w-lg mb-2">
        Press the button below to scan an RFID using your device NFC and see its details.
      </p>
      <NFCScanner />
    </main>
  );
}
