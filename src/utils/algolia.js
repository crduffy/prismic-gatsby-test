
const myQuery = `{
  prismic {
    allPosts {
      edges {
        node {
          date
          title
          _meta {
            id
            tags
            uid
            lastPublicationDate
          }
          body {
            ... on PRISMIC_PostBodyText {
              type
              label
            }
            ... on PRISMIC_PostBodyQuote {
              type
              label
            }
            ... on PRISMIC_PostBodyImage_with_caption {
              type
              label
            }
          }
        }
      }
    }
  }
}`;

const flattenMeta = arr =>
    arr.map(({ node: { _meta, ...rest } }) => ({
        ..._meta,
        ...rest,
    }))


const queries = [
    {
        query: myQuery,
        transformer: ({ data }) => flattenMeta(data.prismic.allPosts.edges),

        settings: {
            // optional, any index settings
        },
        //matchFields: ['uid', 'modified'], // Array<String> overrides main match fields, optional
    },
];

module.exports = queries