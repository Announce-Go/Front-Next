import { KeywordList } from "@/components/user/KeywordList"
import { ArrowLeftIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { KeywordAdd } from "@/components/user/KeywordAdd"
import Link from "next/link"


export default function UserPlacePage() {
  return (
    <div>
      <div className="mb-4">
        <Link href={`/user/place/`}>
          <ArrowLeftIcon className="size-5 cursor-pointer w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 p-2 text-white" />
        </Link>
      </div>
      <h1 className="text-lg font-bold mb-4 bg-orange-500 text-white p-4 rounded-lg">키워드 리스트</h1>

      <Separator className="my-4" />

      <KeywordAdd />


      <KeywordList />
    </div>
  )
}