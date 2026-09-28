"use client";

import { useEffect, useState } from "react";
import { connect, disconnect, getLocalStorage, isConnected } from "@stacks/connect";
import { useAtomValue, useSetAtom } from "jotai";
import { addressAtom, isMountedAtom } from "../store/wallet";

function getStoredStxAddress() {
  const stored = getLocalStorage();

  if (!stored) return null;

  return (
    stored.addresses?.stx?.find((entry) => entry.address.startsWith("S"))
      ?.address ??
    stored.addresses?.stx?.[0]?.address ??
    null
  );
}

function getResponseStxAddress(
  addresses: Array<{ address: string; symbol?: string }>
) {
  return (
    addresses.find((entry) => entry.symbol === "STX")?.address ??
    addresses.find((entry) => entry.address.startsWith("S"))?.address ??
    addresses[0]?.address ??
    null
  );
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const setAddress = useSetAtom(addressAtom);
  const setMounted = useSetAtom(isMountedAtom);

  useEffect(() => {
    if (isConnected()) {
      setAddress(getStoredStxAddress());
    } else {
      setAddress(null);
    }

    setMounted(true);
  }, [setAddress, setMounted]);

  return <>{children}</>;
}

export function WalletConnect() {
  const address = useAtomValue(addressAtom);
  const isMounted = useAtomValue(isMountedAtom);
  const setAddress = useSetAtom(addressAtom);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);

    try {
      const response = await connect();
      const addr = getResponseStxAddress(response.addresses);
      if (addr) setAddress(addr);
    } catch (e) {
      console.error("[scaffold-stacks] connection failed:", e);
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    disconnect();
    setAddress(null);
  };

  if (!isMounted) {
    return <div style={{ width: 140, height: 38 }} />;
  }

  if (!address) {
    return (
      <button
        onClick={handleConnect}
        disabled={connecting}
        className="bg-[#434242] w-[135px] h-[40px] rounded-[40px] border-[1px] border-[#1F1E1F] text-[12px] text-[#F4F3EF] font-mono"
      >
        {connecting ? "Connecting..." : "Connect wallet"}
      </button>
    );
  }

  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="flex items-center gap-[18px]">
      <div className="bg-[#434242] w-[135px] h-[40px] rounded-[40px] border-[1px] border-[#1F1E1F] text-[12px] text-[#F4F3EF] font-mono flex items-center justify-center">
        {short}
      </div>

      <button
        onClick={handleDisconnect}
        className="text-[12px] text-[#9ca3af]"
      >
        Disconnect
      </button>
    </div>
  );
}
