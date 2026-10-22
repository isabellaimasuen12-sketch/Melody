import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") === "albums" ? "albums" : "songs";
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 50);

  try {
    const r = await fetch(
      `https://rss.applemarketingtools.com/api/v2/us/music/most-played/${limit}/${kind}.json`,
      { next: { revalidate: 3600 } }
    );
    return NextResponse.json(await r.json());
  } catch (error) {
    return NextResponse.json({ message: "Chart failed" }, { status: 500 });
  }
}