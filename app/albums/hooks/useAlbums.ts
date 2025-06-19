import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import {
  fetchAlbums,
  fetchUsers,
  fetchPhotosByAlbum,
  fetchPaginatedAlbums,
} from "@/lib/api";
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

export function useInfiniteAlbums(limit = 20) {
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useSWR("users", fetchUsers);

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    // unique key
    (pageIndex) => ["albums", pageIndex],

    // fetcher
    async ([, pageIndex]) => {
      const start = pageIndex * limit;
      return fetchPaginatedAlbums(start, limit);
    },
    { revalidateFirstPage: false }
  );

  const albums = (data?.flat() ?? []).map((album) => ({
    ...album,
    userName:
      users?.find((u: User) => u.id === album.userId)?.name || "Unknown User",
  }));

  const isLoading = (!data && !error) || usersLoading;
  const isLoadingMore = isLoading || isValidating;
  const hasMore = data && data[data.length - 1]?.length === limit;

  function loadMore() {
    if (hasMore) setSize(size + 1);
  }

  return {
    albums,
    isLoading,
    isLoadingMore,
    error: error || usersError,
    hasMore,
    loadMore,
  };
}

export function usePhotosByAlbum(albumId: number) {
  return useSWR(albumId ? ["photos", albumId] : null, () =>
    fetchPhotosByAlbum(albumId)
  );
}
