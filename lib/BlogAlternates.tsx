'use client'

import { createContext, useContext } from 'react'
import type { BlogSlugPair } from '@/lib/site-nav'

// Which articles exist in which language. The header's language switcher needs
// this to send a reader from a Danish post to its English translation, but the
// pairing lives on the filesystem and can only be read on the server. The
// locale layout reads it once and hands it down through here.
const BlogAlternatesContext = createContext<BlogSlugPair[]>([])

export function BlogAlternatesProvider({
  pairs,
  children,
}: {
  pairs: BlogSlugPair[]
  children: React.ReactNode
}) {
  return <BlogAlternatesContext.Provider value={pairs}>{children}</BlogAlternatesContext.Provider>
}

export function useBlogAlternates(): BlogSlugPair[] {
  return useContext(BlogAlternatesContext)
}
