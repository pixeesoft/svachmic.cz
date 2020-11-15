import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import React from "react"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const hyperlinks = data.site.siteMetadata.hyperlinks

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} hyperlinks={hyperlinks}>
        <SEO title="Blog" />
        <Bio />
        <p>
          Zatím zde není žádný příspěvek.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle} hyperlinks={hyperlinks}>
      <SEO title="Blog" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const readingTime = Math.ceil(post.fields.readingTime.minutes)

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                <small>{post.frontmatter.date}{' '}&bull;{' '}<span role="img" aria-label="coffee emoji reading time">☕️</span> {readingTime} min čtení</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        hyperlinks {
            pixeesoft
            github
            stackoverflow
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
          readingTime {
            text
            minutes
          }
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`