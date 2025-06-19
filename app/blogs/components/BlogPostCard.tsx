import React from "react";
import type { Post, User } from "@/types";
import { Heart } from "lucide-react";

interface BlogPostCardProps {
  post: Post;
  author: User | undefined;
  liked: boolean;
  onLike: (postId: number) => void;
  onClick?: () => void;
}

export default function BlogPostCard({
  post,
  author,
  liked,
  onLike,
  onClick,
}: BlogPostCardProps) {
  return (
    <div
      className={
        "w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition flex flex-col gap-1 focus:outline-none focus:ring-2 focus:ring-primary hover:cursor-pointer"
      }
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={!!onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-base text-gray-900 dark:text-gray-100">
          {post.title}
        </h2>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike(post.id);
          }}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all duration-200 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 ${
            liked &&
            "!bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
          }`}
        >
          <Heart
            className={`w-3 h-3 transition-all duration-200",
                ${liked && "fill-current"}`}
          />
          <span>{liked ? "Liked" : "Like"}</span>
        </button>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
        by {author?.name || "Unknown"}
      </div>
      <div className="text-lg text-gray-800 dark:text-gray-200 opacity-85">
        {post.body.slice(0, 100)}
        {post.body.length > 100 ? "..." : ""}
      </div>
    </div>
  );
}
