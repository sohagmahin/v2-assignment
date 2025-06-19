import React from "react";
import type { Post, User } from "@/types";
import { useComments } from "../hooks/useComments";
import { BaseModal } from "@/components/baseModal";
import { MessageCircle } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface BlogDetailModalProps {
  post: Post | null;
  author: User | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BlogDetailModal({
  post,
  author,
  open,
  onOpenChange,
}: BlogDetailModalProps) {
  const { comments, isLoading, error } = useComments(post?.id, open);

  if (!post) return null;

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={post.title}
      description={`by ${author?.name || "Unknown"}`}
    >
      <div>
        <div className="mb-4 text-gray-800 dark:text-gray-200 whitespace-normal text-sm">
          {post.body}
        </div>

        {isLoading && <div>Loading comments...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {/* Comments Section */}
        {comments && comments.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white opacity-90">
                Comments ({comments.length})
              </h3>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mr-2"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex-shrink-0">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {getInitials(comment.name)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {comment.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {comment.email}
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-700 dark:text-gray-300">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
}
