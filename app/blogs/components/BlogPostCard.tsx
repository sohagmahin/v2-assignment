import React from "react";
import type { Post, User } from "@/types";

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
      className="border rounded p-4 bg-white dark:bg-gray-900 shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={!!onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
          {post.title}
        </h2>
        <button
          aria-label={liked ? "Unlike post" : "Like post"}
          onClick={(e) => {
            e.stopPropagation();
            onLike(post.id);
          }}
          className={`ml-2 text-xl transition ${
            liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
          }`}
        >
          ♥
        </button>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        by {author?.name || "Unknown"}
      </div>
      <div className="text-gray-800 dark:text-gray-200">
        {post.body.slice(0, 100)}
        {post.body.length > 100 ? "..." : ""}
      </div>
    </div>
  );
}
