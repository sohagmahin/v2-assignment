import type { Album, Photo, User } from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchAlbums(): Promise<Album[]> {
  const res = await fetch(`${BASE_URL}/albums`);
  if (!res.ok) throw new Error("Failed to fetch albums");
  return res.json();
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function fetchPhotosByAlbum(albumId: number): Promise<Photo[]> {
  const res = await fetch(`${BASE_URL}/photos?albumId=${albumId}`);
  if (!res.ok) throw new Error("Failed to fetch photos");
  return res.json();
}
