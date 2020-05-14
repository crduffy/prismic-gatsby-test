
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
              primary {
                text
              }
            }
            ... on PRISMIC_PostBodyQuote {
              type
              label
              primary {
                quote
              }
            }
            ... on PRISMIC_PostBodyImage_with_caption {
              type
              label
              primary {
                image
                caption
              }
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

const mapMeta = node => {
    const { _meta, ...rest } = node

    return {
        ..._meta,
        ...rest
    }
}
const mapTitle = node => {
    const { title, ...rest } = node

    return {
        ...title.text,
        ...rest
    }
}
const mapBody = node => {
    const { _meta, ...rest } = node

    return {
        ..._meta,
        ...rest
    }
}
const queries = [
    {
        query: myQuery,
        transformer: ({ data }) => data.prismic.allPosts.edges.map(edge => edge.node).map(mapMeta),

        settings: {
            // optional, any index settings
        },
        //matchFields: ['uid', 'modified'], // Array<String> overrides main match fields, optional
    },
];

module.exports = queries