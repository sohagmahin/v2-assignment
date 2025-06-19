import React from "react";
import type { Post, User } from "@/types";
import { useComments } from "../hooks/useComments";

interface BlogDetailModalProps {
  post: Post | null;
  author: User | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  liked: boolean;
  onLike: (postId: number) => void;
}

export default function BlogDetailModal({
  post,
  author,
  open,
  onOpenChange,
  liked,
  onLike,
}: BlogDetailModalProps) {
  const { comments, isLoading, error } = useComments(post?.id, open);
  if (!open || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">
          {post.title}
        </h2>
        <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
          by {author?.name || "Unknown"}
        </div>
        <button
          aria-label={liked ? "Unlike post" : "Like post"}
          onClick={() => onLike(post.id)}
          className={`mb-4 text-xl transition ${
            liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
          }`}
        >
          ♥
        </button>
        <div className="mb-4 text-gray-800 dark:text-gray-200 whitespace-pre-line">
          {post.body}
        </div>
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {isLoading && <div>Loading comments...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="max-h-48 overflow-y-auto space-y-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded p-2 bg-gray-50 dark:bg-gray-800"
            >
              <div className="font-medium text-gray-700 dark:text-gray-200">
                {comment.name}
              </div>
              <div className="text-xs text-gray-500">{comment.email}</div>
              <div className="text-gray-800 dark:text-gray-100">
                {comment.body}
              </div>
            </div>
          ))}
          {comments.length === 0 && !isLoading && !error && (
            <div className="text-gray-500">No comments yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
