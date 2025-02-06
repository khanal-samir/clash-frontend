// server side fetching faster than client side fetching also provides caching

import { CLASH_URL } from "@/lib/apiEndPoints";

export async function fetchClashes(token: string) {
  const res = await fetch(CLASH_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      // caching
      revalidate: 60 * 60, //time for caching
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();

  if (response?.data) {
    return response?.data;
  }
  return [];
}

export async function fetchClash(id: number) {
  const res = await fetch(`${CLASH_URL}/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return null;
}
