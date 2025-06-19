import React from "react";
import { Skeleton } from "./Skeleton";

interface AlbumCardProps {
  album: { id: number; title: string; userName: string };
  onClick: () => void;
  isLoading?: boolean;
}

export function AlbumCard({ album, onClick, isLoading }: AlbumCardProps) {
  if (isLoading) {
    return <Skeleton className="h-20 w-full mb-4" />;
  }
  return (
    <div
      className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition flex flex-col gap-1 focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
      onClick={onClick}
    >
      <span className="font-semibold text-base text-gray-900 dark:text-gray-100 truncate">
        {album.title}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
        by {album.userName}
      </span>
    </div>
  );
}
