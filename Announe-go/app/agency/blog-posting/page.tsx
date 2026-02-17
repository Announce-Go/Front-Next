import { BlogPostingList } from "@/Features/blog-posting/ui/BlogPostingList"
import { FileText } from "lucide-react"

export default function AgencyBlogPostingPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            블로그 포스팅 관리
          </h1>
          <p className="text-muted-foreground mt-1">
            담당 광고주의 블로그 포스팅을 등록하고 관리합니다.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* 포스팅 목록 */}
        <BlogPostingList />
      </div>
    </div>
  )
}