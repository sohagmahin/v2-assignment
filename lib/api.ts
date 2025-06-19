import type { Album, Comment, Photo, Post, User } from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchAlbums(): Promise<Album[]> {
  const res = await fetch(`${BASE_URL}/albums`);
  if (!res.ok) throw new Error("Failed to fetch albums");
  return res.json();
}

export async function fetchPaginatedAlbums(
  start: number,
  limit: number
): Promise<Album[]> {
  const res = await fetch(`${BASE_URL}/albums?_start=${start}&_limit=${limit}`);
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

export async function fetchPost(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchPaginatedPosts(
  start: number,
  limit: number
): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?_start=${start}&_limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchCommets(postId: string): Promise<Comment[]> {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}
