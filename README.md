# gatsby-source-patreon

Gastby source plugin for pulling your campaign data from [Patreon](https://www.patreon.com). This plugin uses the V2 API from Patreon that is still in active development.
Expect things to break. When they do create an issue on Github.

This plugin will only work when you are a Patreon creator and will only pull data from your own campaigns.

Campaign data is only download at build time so you will need to either manually rebuild your site when campaign data changes or use a
webhook to trigger a build.

## Install

1. `yarn add gatsby-source-patreon`
1. Create a new API client on [Patreon's website](https://www.patreon.com/portal/registration/register-clients). Select V2 as the API version.
1. Add this configuration to your `gatsby-config.js`:
```
{
    resolve: `gatsby-source-patreon`,
    options: {
        token: '<CREATOR_ACCESS_TOKEN>',
        refreshToken: '<CREATOR_REFRESH_TOKEN>'
    }
}
```
1. Replace `<CREATOR_ACCESS_TOKEN>` and `<CREATOR_REFRESH_TOKEN>` with the tokens you received from Patreon when creating the client.

## Usage
Most data about campaigns is optional and will return `null` values when they are left blank. Gatsby ignores these when
building the GraphQL schema causing errors in your query when you request a field that's null. To check which fields / types
are available run this query in your local GraphiQL UI after you've build your site.

```
{
    __type(name: "PatreonCampaign") {
        fields {
            name
            description
        }
    }
}
```

Then to query your campaigns run:

```
{
    allPatreonCampaign {
        edges {
          node {
            id
            creationName
          }
        }
    }
}
```

## Access tokens
The access token you receive from Patreon when creating the client are valid for one month. This source plugin will not
automatically refresh that token. When you receive `401 Unauthorized` errors from Patreon when building your site it is
time to [refresh the tokens](https://www.patreon.com/portal/registration/register-clients) and update the config.


## Current limitations

- The plugin is currently limited to campaign data only. Data from members, benefits, goals etc. will follow
- Pagination is currently not supported. The plugin will pull the default number of campaigns
- The plugin uses V2 of the Patreon api. This API is still in development so things might break.
- The is_nsfw field from the campaign data is missing as there is a bug preventing the plugin to request it.
