import { serverFetch } from "@/Featchs/api/server-fetch"
import { TestFilter } from "./test-filter"
type SEARCH_PARAMS = {
  keyword: string   
  status: string;
  page: string;
  page_size: string;
}


export async function TestList({PropsSearchParams}: {PropsSearchParams?: SEARCH_PARAMS}) {


console.log(`PropsSearchParams`, PropsSearchParams)

const data = await serverFetch(`/api/v1/agency/place-rank/tracking?${new URLSearchParams(PropsSearchParams).toString()}`, {
  cache: "no-store",
})

  console.log(`data`, data)

  return (
    <div>
      <h1>Test List</h1>
      <TestFilter propsSearchParams={PropsSearchParams} />

      <div>

      </div>
    </div>
  )
} 