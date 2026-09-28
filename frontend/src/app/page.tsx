"use client";

import { useState } from "react";
import { useCounter_SignGuestbook } from "@/generated/hooks";
import { stringAsciiCV } from '@stacks/transactions';

export default function Home() {
  const [message, setMessage] = useState("");

  const guestbook = useCounter_SignGuestbook();

  async function submitMessage() {
    const value = message.trim();

    if (!value || value.length > 160) return;

    await guestbook.call([stringAsciiCV(value)]);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-[#0b0d12] text-white">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-400">STACKS</p>
            <h1 className="text-2xl font-bold">Onchain Guestbook</h1>
          </div>

        </header>

        <h2 className="mb-3 text-4xl font-bold">
          Leave your mark on Stacks.
        </h2>

        <p className="mb-8 text-gray-400">
          Write a message and publish it directly onchain.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={160}
            placeholder="Say hello..."
            className="min-h-32 w-full rounded-xl border border-white/10 bg-black/20 p-4 text-white outline-none"
          />

          <button
            onClick={submitMessage}
            disabled={!message.trim() || guestbook.loading}
            className="mt-4 rounded-xl bg-teal-400 px-5 py-3 font-semibold text-black disabled:opacity-40"
          >
            {guestbook.loading ? "Confirm in wallet..." : "Sign Guestbook"}
          </button>

          {guestbook.txid && (
            <p className="mt-4 break-all text-sm text-teal-300">
              Transaction: {guestbook.txid}
            </p>
          )}

          {guestbook.error && (
            <p className="mt-4 text-sm text-red-400">
              {JSON.stringify(guestbook.error)}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
