import React from "react";
import type { Photo } from "@/types";
import Image from "next/image";

interface PhotoItemProps {
  photo: Photo;
}

export function PhotoItem({ photo }: PhotoItemProps) {
  return (
    <div className="flex items-center gap-4 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      {/* https://dummyjson.com/image/400x200/008080/ffffff?text=Hello+Peter */}
      <Image
        src={photo.thumbnailUrl}
        alt={photo.title}
        width={64}
        height={64}
        className="w-16 h-16 object-cover rounded border border-gray-200 dark:border-gray-700"
        loading="lazy"
      />
      <div className="flex flex-col">
        <span className="font-medium text-sm text-gray-900 dark:text-gray-100 text-ellipsis">
          {photo.title}
        </span>
        <a
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary underline mt-1"
        >
          View full size
        </a>
      </div>
    </div>
  );
}
