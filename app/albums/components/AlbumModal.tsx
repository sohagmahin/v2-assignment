"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { PhotoItem } from "./PhotoItem";
import { Skeleton } from "./Skeleton";
import type { Photo } from "@/types";

interface AlbumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  album: { id: number; title: string; userName: string } | null;
  photos: Photo[];
  isLoading: boolean;
}

export function AlbumModal({
  open,
  onOpenChange,
  album,
  photos,
  isLoading,
}: AlbumModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40 animate-fadeIn" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 focus:outline-none">
          <Dialog.Title className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
            {album?.title}
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            by {album?.userName}
          </Dialog.Description>
          <div className="flex flex-col gap-3">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))
              : photos
                  .slice(0, 5)
                  .map((photo) => <PhotoItem key={photo.id} photo={photo} />)}
            {!isLoading && photos.length === 0 && (
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                No photos found.
              </span>
            )}
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none hover:cursor-pointer"
              type="button"
            >
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
