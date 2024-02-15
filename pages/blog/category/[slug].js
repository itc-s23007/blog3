import { getAllCategories, getAllPostsByCategory } from 'lib/api'
import Container from 'components/container'
import PostHeader from 'components/post-header'
import Posts from 'components/posts'
import { getPlaiceholder } from 'plaiceholder'

import { eyecatchLocal } from 'lib/constants'
const Category = ({ name, posts }) => {
  return (
    <Container>
      <PostHeader title={name} subtitle='Blog Category' />
      <Posts posts={posts} />
    </Container>
  )
}

const getStaticPaths = async () => {
  const allCats = await getAllCategories()
  return {
    paths: allCats.map(({ slug }) => `/blog/category/${slug}`),
    fallback: false
  }
}

const getStaticProps = async context => {
  const catSlug = context.params.slug

  const allCats = await getAllCategories()
  const cat = allCats.find(({ slug }) => slug === catSlug)

  const posts = await getAllPostsByCategory(cat.id)

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url)
    post.eyecatch.blurDataURL = base64
  }
  return {
    props: {
      name: cat.name,
      posts
    }
  }
}

export default Category
export { getStaticPaths, getStaticProps }
