/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = await graphql(`
  query {
      allPosts(filter: {publish: {eq: true}, content_type: {eq: "article"}}) {
          nodes {
            slug
            url
          }
        }
      }
    `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors);
    }

    result.data.allPosts.nodes.forEach(({ slug, url }) => {
      createPage({
        path: `blog/posts/${url}`,
        component: path.resolve(`./src/templates/blogPost.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: slug,
        },
      });
    });
  });

  return Promise.all([blogPost]);


  // const { createPage } = actions
  // const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  // return graphql(`
  //   {
  //     allMarkdownRemark {
  //       edges {
  //         node {
  //           frontmatter {
  //             path
  //             draft
  //             date
  //           }
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).then(result => {
  //   if (result.errors) {
  //     return Promise.reject(result.errors)
  //   }
  //   result.data.allMarkdownRemark.edges
  //     .filter(({ node }) => !node.frontmatter.draft)
  //     .forEach(({ node }) => {
  //       createPage({
  //         path: node.frontmatter.path,
  //         component: blogPostTemplate,
  //         slug: node.fields.slug,
  //         context: {},
  //       })
  //     })
  // })
}
