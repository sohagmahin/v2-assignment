import { BaseModal } from "@/components/baseModal";
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
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={album?.title}
      description={album ? `by ${album.userName}` : ""}
    >
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
    </BaseModal>
  );
}
