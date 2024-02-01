import { getPostBySlug } from 'lib/api'
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

const Schedule = props => {
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
            src={props.eyecatch.url}
            alt=''
            layout='responsive'
            width={props.eyecatch.width}
            height={props.eyecatch.height}
            sizes='(min-width: 1152px) 1152px, 100vw'
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
      </article>
    </Container>
  )
}
export default Schedule

export const getStaticProps = async () => {
  const slug = 'schedule'

  const post = await getPostBySlug(slug)

  const description = extractText(post.content)
  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
      description: description
    }
  }
}
