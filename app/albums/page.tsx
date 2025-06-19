"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { usePhotosByAlbum, useInfiniteAlbums } from "./hooks/useAlbums";
import { AlbumCard } from "./components/AlbumCard";
import { AlbumModal } from "./components/AlbumModal";
import { Skeleton } from "./components/Skeleton";

export default function AlbumsPage() {
  const { albums, isLoading, error, hasMore, isLoadingMore, loadMore } =
    useInfiniteAlbums(20);

  const [selectedAlbum, setSelectedAlbum] = useState<{
    id: number;
    title: string;
    userName: string;
  } | null>(null);

  // Observer for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    // eslint-disable-next-line
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoadingMore) {
        loadMore();
      }
    },
    [hasMore, isLoadingMore, loadMore]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(handleObserver);
    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);
    return () => observer.current?.disconnect();
  }, [handleObserver]);

  const { data: photos = [], isLoading: isPhotoLoading } = usePhotosByAlbum(
    selectedAlbum?.id ?? 0
  );

  return (
    <div className="max-w-2xl mx-auto py-5 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Albums
        </h1>
        <p className="text-sm opacity-60">
          Browse through beautiful photo collections
        </p>
      </div>
      {error && (
        <div className="text-red-500 mb-4">
          Failed to load albums. Please try again.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onClick={() => setSelectedAlbum(album)}
          />
        ))}

        {/* Render 4 Skeleton */}
        {isLoading &&
          isLoadingMore &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}

        {/* Render infinity Skeleton */}
        {isLoadingMore && <Skeleton className="h-20 w-full" />}
      </div>
      <div ref={loadMoreRef} />
      <AlbumModal
        open={!!selectedAlbum}
        onOpenChange={(open) => {
          if (!open) setSelectedAlbum(null);
        }}
        album={selectedAlbum}
        photos={photos}
        isLoading={isPhotoLoading}
      />
    </div>
  );
}
