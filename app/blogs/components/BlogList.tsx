"use client";
import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import type { Post } from "@/types";
import BlogPostCard from "./BlogPostCard";
import BlogDetailModal from "./BlogDetailModal";
import { useInfinitePosts } from "../hooks/usePosts";
import { Skeleton } from "@/app/albums/components/Skeleton";
import { useUsers } from "@/hooks/userUser";

const POSTS_PER_PAGE = 10;

export default function BlogList() {
  const {
    posts,
    isLoading,
    error: postError,
    hasMore,
    isLoadingMore,
    loadMore,
  } = useInfinitePosts(POSTS_PER_PAGE);
  const { users, error: usersError } = useUsers();

  const [selectedUserId, setSelectedUserId] = useState<number | "all">("all");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // const [users, setUsers] = useState<User[]>([]);

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

  // Load likes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("likedPosts");
    if (stored) setLikedPosts(JSON.parse(stored));
  }, []);

  // Save likes to localStorage
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedUserId === "all") return posts;
    return posts?.filter((post) => post?.userId === selectedUserId);
  }, [posts, selectedUserId]);

  const handleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-5 px-4">
      {/* heading */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Blogs
          </h1>
          <p className="text-sm opacity-60">
            Discover interesting articles and stories
          </p>
        </div>
        {/* Author filter */}
        <div className="flex flex-col items-start sm:items-end gap-0.5">
          <label htmlFor="author" className="font-medium text-sm opacity-60">
            Filter by author
          </label>
          <select
            id="author"
            className="border rounded px-2 py-1"
            value={selectedUserId}
            onChange={(e) =>
              setSelectedUserId(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
          >
            <option value="all">All</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts */}
      <div className="grid gap-4">
        {filteredPosts?.map((post) => {
          const author = users?.find((u) => u.id === post.userId);
          return (
            <BlogPostCard
              key={post.id}
              post={post}
              author={author}
              liked={likedPosts.includes(post.id)}
              onLike={handleLike}
              onClick={() => setSelectedPost(post)}
            />
          );
        })}
        {filteredPosts?.length === 0 && (
          <div className="text-gray-500">No posts found for this author.</div>
        )}
      </div>

      {/* Post Error */}
      {postError && (
        <div className="text-red-500 mb-4">
          Failed to load posts. Please try again.
        </div>
      )}

      {/* Users Error */}
      {usersError && (
        <div className="text-red-500 mb-4">
          Failed to load posts. Please try again.
        </div>
      )}

      {/* Initial Skeleton */}
      {isLoading &&
        Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full mt-5" />
        ))}

      {/* Infinity Skeleton */}
      {isLoadingMore && selectedUserId == "all" && (
        <Skeleton className="h-20 w-full mt-5" />
      )}
      <div ref={loadMoreRef}></div>

      <BlogDetailModal
        post={selectedPost}
        author={users?.find((u) => u.id === selectedPost?.userId)}
        open={!!selectedPost}
        onOpenChange={(open) => {
          if (!open) setSelectedPost(null);
        }}
      />
    </div>
  );
}
