import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Header from '../sections/Header/Header'
import Footer from '../sections/Footer'
import styled from '@emotion/styled'
import { Container } from './Container'
import NavBar from '../sections/NavBar/NavBar'
import SocialMediaNav from '../sections/SocialMediaNav/SocialMediaNav'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css, keyframes } from "@emotion/react"
import { FullBleed } from '../sections/FullBleed'

const Content = styled.main`
min-height: calc(100vh - 150px);
`
const shortcodes = {}

const Toc = styled.ul`
  position: fixed;
  left: calc(50% + 400px);
  top: 110px;
  max-height: 70vh;
  width: 310px;
  display: flex;
`
const InnerScroll = styled.div`
  overflow: hidden;
  overflow-y: scroll;
`


const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  console.log('data.mdx', data)
  return (
    // <Layout location={location} title={siteTitle}>
    //   <Seo
    //     title={post.frontmatter.title}
    //     description={post.frontmatter.description || post.excerpt}
    //   />
<>

    <MDXProvider components={shortcodes}>
      <Content>
        <Container>
          <FullBleed css={css`
                  position:relative;
                  height: 40rem;
                  text-align: center;
                  background-origin: padding-box;
                  background-color: white;
                  background: linear-gradient(0deg, rgba(0,0,0, 0.9) 15%,  rgba(0,0,0, 0) 100%), url(${post.frontmatter.headingImage.publicURL});
                  -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
                  mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
                  background-position: center;
                  background-size: cover;
                  background-repeat: no-repeat;
                  text-shadow: 1px 1px 1px #824708, 3px 3px 5px #7F501C; 
                  margin-bottom: -15rem;
          `}>
            <section css={css`
              padding:1rem 0rem 0rem;
            `}>
              <Link to={post.fields.slug}
                css={css` 
                //padding: 0rem 1rem;
                  color: white; 
                  text-decoration: none;
                  position: relative;
                  overflow: hidden;
                  transition: background 175ms ease-in-out;
                  h1{
                    font-size: 3rem;
                    -webkit-box-decoration-break: clone;
                    box-decoration-break: clone;
                  }
                  &:hover{
                      color:white; 
                      background: #ffa039;
                      p{
                          span{
                              background: #ffa039;
                          }
                      }
                  }
                  span{
                    -webkit-box-decoration-break: clone;
                    box-decoration-break: clone;
                    padding: 0.2rem 1rem;
                  }
              `}
              >
                <h1
                  css={css`
                  display:inline;   
                  text-shadow: 1px 1px 1px #824708, 3px 3px 5px #7F501C; 
                  padding: 0px 1rem 0px 1rem;
              `}>{post.frontmatter.title}</h1><br /> <br />
                <span>Last Edit: {post.frontmatter.date}</span> <br />
                <span>  Author: {post.frontmatter.author}</span> <br />
                <span> Editor: {post.frontmatter.editor}</span>


              </Link>


            </section>



          </FullBleed>
          {/* <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header> */}
          <article css={css`
            z-index:1;
          `}>
            <MDXRenderer >{post.body}</MDXRenderer>
          </article>

          <nav css={css`
            z-index:1;
          `}>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </Container>
      </Content>
    </MDXProvider>

{typeof post.tableOfContents.items === 'undefined' ? null : (
  <Toc>
    <InnerScroll>
      <h2>Table of contents</h2>
      {post.tableOfContents.items.map(i => (
        <li key={i.url}>
          <a href={i.url} key={i.url}>
            {i.title}
          </a>
        </li>
      ))}
    </InnerScroll>
  </Toc>
)}

</>


  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        author
        editor
        headingImage {
          publicURL
        }
      }
      tableOfContents
      fields {
        slug
      }
      wordCount {
        paragraphs
        sentences
        words
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
