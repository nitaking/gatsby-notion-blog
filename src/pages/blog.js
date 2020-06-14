import React from "react"
// eslint-disable-next-line no-unused-vars
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
`

const MarkerHeader = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
`

const Tags = styled.h6`
  display: inline;
  color: gray;
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <Content>
        <h1>Blog</h1>
        {data.allPosts.nodes.map((node) => {
          return (
            <div key={node}>
              <Link
                to={`posts/${node.url}/`}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <MarkerHeader>{node.Page}</MarkerHeader>
                <div>
                  <ArticleDate>{node.publish_date}</ArticleDate>
                  <ReadingTime> - {node.read_time || '?'} MIN READ</ReadingTime>
                </div>
                <Tags>Tags: {node.tags && node.tags.join(", ")}</Tags>
                <p
                  style={{ color: "black" }}
                  dangerouslySetInnerHTML={{ __html: node.desc }}
                ></p>
              </Link>
            </div>
          )
        })}
      </Content>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allPosts(
      filter: { publish: { eq: true } }
      sort: { fields: [publish_date], order: DESC }
    ) {
      nodes {
        Page
        tags
        # desc
        content_type
        # status
        url
        read_time
        # cover_image
        slug
        publish_date(fromNow: false)
      }
    }
  }
`
