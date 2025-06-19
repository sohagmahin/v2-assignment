import useSWR from "swr";
import { fetchUsers } from "@/lib/api";
import { User } from "@/types";

export function useUsers() {
  const { data: users, error, isLoading } = useSWR<User[]>("users", fetchUsers);

  return {
    users,
    error,
    isLoading,
  };
}
