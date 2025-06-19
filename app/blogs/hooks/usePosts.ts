import useSWRInfinite from "swr/infinite";
import { fetchPaginatedPosts } from "@/lib/api";

export function useInfinitePosts(limit = 20) {
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    // unique key
    (pageIndex) => ["posts", pageIndex],

    // fetcher
    async ([, pageIndex]) => {
      const start = pageIndex * limit;
      return fetchPaginatedPosts(start, limit);
    },
    { revalidateFirstPage: false }
  );

  const isLoading = !data && !error;
  const isLoadingMore = isLoading || isValidating;
  const hasMore = data && data[data.length - 1]?.length === limit;

  function loadMore() {
    if (hasMore) setSize(size + 1);
  }

  const posts = data ? data.flat() : undefined;

  return {
    posts: posts,
    isLoading,
    isLoadingMore,
    error: error,
    hasMore,
    loadMore,
  };
}
