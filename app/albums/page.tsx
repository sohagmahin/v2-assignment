"use client";
import React, { useState } from "react";
import { useAlbums, usePhotosByAlbum } from "./hooks/useAlbums";
import { AlbumCard } from "./components/AlbumCard";
import { AlbumModal } from "./components/AlbumModal";
import { Skeleton } from "./components/Skeleton";

export default function AlbumsPage() {
  const { albums, isLoading, error } = useAlbums();

  const [selectedAlbum, setSelectedAlbum] = useState<{
    id: number;
    title: string;
    userName: string;
  } | null>(null);

  const { data: photos = [], isLoading: isPhotoLoading } = usePhotosByAlbum(
    selectedAlbum?.id ?? 0
  );

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Albums
      </h1>
      {error && (
        <div className="text-red-500 mb-4">
          Failed to load albums. Please try again.
        </div>
      )}
      <div className="grid gap-4">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            onClick={() => setSelectedAlbum(album)}
          />
        ))}

        {/* Render 4 Skeleton */}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
      </div>
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
