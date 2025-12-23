import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { getAuthCheck } from "@/lib/server-auth";
import { PlaceDashboard } from "@/features/ranking/components/PlaceDashboard";
import { authKeys } from "@/hooks/queries/useRanking";

export default async function RankingPlacePage() {
  const { role } = await getAuthCheck();
  console.log(`userRole`, role);

  /**
   * 렌더링 순서
   * 1. 권한체크 후 쿼리키와 쿼리함수를 미리 실행
   * 2. 쿼리프리치
   * 3. 렌더링
   * */
  const queryClient = new QueryClient();

  console.log(`#####`, authKeys(role).queryKey);

  await queryClient.prefetchQuery({
    queryKey: authKeys(role).queryKey,
    queryFn: authKeys(role).queryFn,
    staleTime: 60 * 1000,
    gcTime: 3 * 60 * 1000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlaceDashboard />
    </HydrationBoundary>
  );
}
