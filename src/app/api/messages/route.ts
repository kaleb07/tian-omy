import { NextResponse } from "next/server";

type WishMessage = {
  name: string;
  message: string;
  timestamp?: string;
  attendance?: string;
};

export async function GET() {
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    return NextResponse.json(
      { ok: false, error: "Messages are not configured yet.", messages: [] },
      { status: 503 }
    );
  }

  try {
    const bustCacheUrl = `${appsScriptUrl}?t=${Date.now()}`;
    const upstream = await fetch(bustCacheUrl, { cache: "no-store" });
    const data = await upstream.json().catch(() => null);

    if (!upstream.ok || !data?.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error || "Failed to load messages.", messages: [] },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, messages: (data.messages ?? []) as WishMessage[] });
  } catch (error) {
    console.error("Fetching messages failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load messages.", messages: [] },
      { status: 502 }
    );
  }
}
