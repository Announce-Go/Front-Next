import { create } from "zustand"
import { persist } from "zustand/middleware"
import { keywordList as initialKeywordList } from "@/constants/list"

export type KeywordItem = {
  id: number
  keyword: string
  url: string
  rank?: number
}

type CompanyKey = string

type KeywordStore = {
  companyToKeywords: Record<CompanyKey, KeywordItem[]>
  getKeywords: (company: CompanyKey) => KeywordItem[]
  addKeyword: (company: CompanyKey, keyword: string, url: string, rank?: number) => void
  resetCompany: (company: CompanyKey) => void
}

export const useKeywordStore = create<KeywordStore>()(
  persist(
    (set, get) => ({
      companyToKeywords: Object.fromEntries(
        Object.entries(initialKeywordList as Record<string, any[]>).map(([key, arr]) => {
          const safeArr: KeywordItem[] = Array.isArray(arr)
            ? arr
                .filter(
                  (it) =>
                    it &&
                    typeof it.id === "number" &&
                    typeof it.keyword === "string" &&
                    typeof it.url === "string"
                )
                .map((it) => ({ id: it.id, keyword: it.keyword, url: it.url }))
            : []
          return [key, safeArr]
        })
      ) as Record<CompanyKey, KeywordItem[]>,
      getKeywords: (company) => {
        const state = get()
        return state.companyToKeywords[company] ?? []
      },
      addKeyword: (company, keyword, url, rank) => {
        set((state) => {
          const current = state.companyToKeywords[company] ?? []
          const nextId =
            current.length > 0 ? Math.max(...current.map((k) => k.id)) + 1 : 1
          const next: KeywordItem = { id: nextId, keyword, url, rank }
          return {
            companyToKeywords: {
              ...state.companyToKeywords,
              [company]: [...current, next],
            },
          }
        })
      },
      resetCompany: (company) => {
        set((state) => ({
          companyToKeywords: {
            ...state.companyToKeywords,
            [company]: [],
          },
        }))
      },
    }),
    {
      name: "keyword-store-v1",
      partialize: (state) => ({ companyToKeywords: state.companyToKeywords }),
      skipHydration: false,
    }
  )
)


