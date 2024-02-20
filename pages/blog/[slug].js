import { getPostBySlug, getAllSlugs } from 'lib/api'
import Container from 'components/container'
import PostHeader from 'components/post-header'
import PostBody from 'components/post-body'
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar
} from 'components/two-column'
import ConvertBody from 'components/convert-body'
import Image from 'next/image'
import PostCategories from 'components/post-categories'
import Meta from 'components/meta'
import { extractText } from 'lib/extract-text'
import { eyecatchLocal } from 'lib/constants'
import { getPlaiceholder } from 'plaiceholder'
import { prevNextPost } from 'lib/prev-next-post'
import Pagination from 'components/pagination'

const Post = props => {}
export default Post

export const getStaticPaths = async () => {
  const allSlugs = await getAllSlugs()
  return {
    paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
    fallback: false
  }
}

export const getStaticProps = async context => {
  const slug = context.params.slug
  const post = await getPostBySlug(slug)

  const description = extractText(post.content)
  const eyecatch = post.eyecatch ?? eyecatchLocal

  const { base64 } = await getPlaiceholder(eyecatch.url)
  eyecatch.blurDataURL = base64

  const allSlugs = await getAllSlugs()
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)
  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: eyecatch,
      categories: post.categories,
      description: description,
      prevPost: prevPost,
      nextPost: nextPost
    }
  }
}
