module.exports = {
  siteMetadata: {
    title: `App based on Gatsby using RestCountries API`,
    author: `@mpetricek`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        data: '@import "common.scss";',
        includePaths: ['src/assets/styles'],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "internal__",

        // The url, this should be the endpoint you are attempting to pull data from
        url: `https://restcountries.eu/rest/v2/all`,

        method: "get",

        headers: {
          "Content-Type": "application/json"
        },

        // Request body
        data: {},

        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `countries`,

        // Nested level of entities in response object, example: `data.posts`
        entityLevel: false,
        auth: false,
        params: {
          "fields": "name;alpha2Code;capital;population;area;currencies;flag"
        },

      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            subsets: [`latin`],
          },
          {
            family: `Open Sans`,
            variants: [`400`, , `600`]
          },
        ],
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
