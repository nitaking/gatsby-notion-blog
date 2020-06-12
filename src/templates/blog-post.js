import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  // eslint-disable-next-line no-unused-vars
  const {
    posts: {
      title,
      tags,
      publish_date,
      html,
      url,
      slug,
      desc,
      color,
      cover_image,
    },
  } = data

  return (
    <Layout>
      <div id="main">
        <div>{tags && tags.join(", ")}</div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    posts(slug: { eq: $slug }) {
      html
      publish_date
      url
    }
  }
`
// export const query = graphql`
//   query($slug: String!) {
//     posts(slug: { eq: $slug }) {
//       html
//       tags
//       publish_date
//       url
//       desc
//       color
//     }
//   }
// `
