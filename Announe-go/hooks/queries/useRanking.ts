/**
 * Ranking
 * Keys + useQuery 훅
 */

export const authKeys = (role: string) => {
  return queryKeys[role];
};

const adminPlaceKeys = {
  all: ["adminPlaceList"] as const,
  list: () => [...adminPlaceKeys.all, "list"] as const,
};

const adminPlaceFn = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users?_limit=5"
  );

  const data = await res.json();

  return data;
};

const queryKeys = {
  admin: {
    queryKey: adminPlaceKeys.list(),
    queryFn: adminPlaceFn,
  },
};
