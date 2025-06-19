import { fetchCommets } from "@/lib/api";
import useSWR from "swr";

// const fetcher = (url: string) =>
//   fetch(url).then((res) => {
//     if (!res.ok) throw new Error("Failed to fetch comments");
//     return res.json();
//   });

export function useComments(postId?: number, open?: boolean) {
  const shouldFetch = open && !!postId;

  const {
    data: comments,
    error,
    isLoading,
  } = useSWR(shouldFetch ? `${postId}` : null, fetchCommets);

  return {
    comments: comments ?? [],
    error,
    isLoading,
  };
}
