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

const Post = props => {
  return (
    <Container>
      <Meta
        pageTitle={props.title}
        pageDesc={props.description}
        pageImg={props.eyecatch.url}
        pageImgW={props.eyecatch.width}
        pageImgH={props.eyecatch.height}
      />
      <article>
        <PostHeader
          title={props.title}
          subtitle='Blog Article'
          publish={props.publish}
        />
        <figure>
          <Image
            key={props.eyecatch.url}
            src={props.eyecatch.url}
            alt=''
            layout='responsive'
            width={props.eyecatch.width}
            height={props.eyecatch.height}
            sizes='(min-width: 1152px) 1152px, 100vw'
            priority
            placeholder='blur'
            blurDataURL={props.eyecatch.blurDataURL}
          />
        </figure>
        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={props.content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={props.categories} />
          </TwoColumnSidebar>
        </TwoColumn>
        <Pagination
          prevText={props.prevPost.title}
          prevUrl={`/blog/${props.prevPost.slug}`}
          nextText={props.nextPost.title}
          nextUrl={`/blog/${props.nextPost.slug}`}
        />
      </article>
    </Container>
  )
}
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
