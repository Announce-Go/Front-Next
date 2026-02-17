import { BlogPostingForm } from "@/Features/blog-posting/ui/BlogPostingForm"

type BlogPostingEditPageProps = {
  params: Promise<{ id: string }>
}

export default async function BlogPostingEditPage({ params }: BlogPostingEditPageProps) {
  const { id } = await params
  return <BlogPostingForm mode="edit" postingId={id} />
}
