import useSWR from "swr";
import { fetchAlbums, fetchUsers, fetchPhotosByAlbum } from "@/lib/api";
import type { User } from "@/types";

interface AlbumWithUserName {
  userId: number;
  id: number;
  title: string;
  userName: string;
}

export function useAlbums() {
  // Get albums data
  const {
    data: albums,
    error: albumsError,
    isLoading: albumsLoading,
  } = useSWR("albums", fetchAlbums);

  // Get users information
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR("users", fetchUsers);

  const isLoading = albumsLoading || usersLoading;
  const error = albumsError || usersError;

  // Map user names to albums
  const albumsWithUser: AlbumWithUserName[] =
    albums && users
      ? albums.map((album) => ({
          ...album,
          userName:
            users.find((u: User) => u.id === album.userId)?.name ||
            "Unknown User",
        }))
      : [];

  return { albums: albumsWithUser, isLoading, error };
}

export function usePhotosByAlbum(albumId: number) {
  return useSWR(albumId ? ["photos", albumId] : null, () =>
    fetchPhotosByAlbum(albumId)
  );
}
