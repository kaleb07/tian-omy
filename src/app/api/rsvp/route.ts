import { NextRequest, NextResponse } from "next/server";

type RsvpPayload = {
  name?: string;
  attendance?: "Yes" | "No" | "Maybe";
  message?: string;
};

export async function POST(request: NextRequest) {
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    return NextResponse.json(
      { ok: false, error: "RSVP is not configured yet." },
      { status: 503 }
    );
  }

  let body: RsvpPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const attendance = body.attendance;
  const message = body.message?.trim() ?? "";

  if (!name || (attendance !== "Yes" && attendance !== "No" && attendance !== "Maybe")) {
    return NextResponse.json(
      { ok: false, error: "Name and attendance are required." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ name, attendance, message }),
    });

    const data = await upstream.json().catch(() => null);

    if (!upstream.ok || !data?.ok) {
      return NextResponse.json(
        { ok: false, error: data?.error || "Failed to save RSVP." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RSVP submission failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save RSVP. Please try again." },
      { status: 502 }
    );
  }
}
