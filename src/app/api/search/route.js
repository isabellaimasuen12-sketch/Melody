import { NextResponse } from "next/server";

export async function GET(request) {
  const query = new URL(request.url).searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { message: "Please enter a search term" },
      { status: 400 }
    );
  }

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=15`;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Music service returned an error" },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      songs: data.results || [],
      artists: [],
      albums: [],
    });
  } catch (error) {
    console.error("Search API error:", error);

    return NextResponse.json(
      { message: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}
