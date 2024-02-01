import { getPostBySlug } from 'lib/api'
import Container from 'components/container'
import PostHeader from 'components/post-header'
import Image from 'next/image'

const Schedule = ({ title, publish, content, eyecatch, categories }) => (
  <Container>
    <article>
      <PostHeader title={title} subtitle='Blog Article' publish={publish} />
      <figure>
        <Image
          src={eyecatch.url}
          alt=''
          layout='responsive'
          width={eyecatch.width}
          height={eyecatch.height}
          sizes='(min-width: 1152px) 1152px, 100vw'
          priority
        />
      </figure>
    </article>
  </Container>
)

const getStaticProps = async () => {
  const slug = 'schedule'

  const post = await getPostBySlug(slug)

  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories
    }
  }
}

export { getStaticProps }
export default Schedule
