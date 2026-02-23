import { TestList } from "./test-list";

type SEARCH_PARAMS = {
  keyword: string   
  status: string;
  page: string;
  page_size: string;
}


export default async function TestRankPage({ searchParams }: { searchParams?: Promise<SEARCH_PARAMS> }) {


  const params = await searchParams;

  

  return (
    <div>
      <h1>Test Rank Page</h1>
      <TestList PropsSearchParams={params} />
    </div>
  )
}