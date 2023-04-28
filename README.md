This is a water quality data visualization and exploration tool. You can view it on https://water.pluspool.org.

If you are interested in helping out, check [the projects board][] and reach out in #pluspool and via pluspool@reaktor.com.

We are happy to receive any feedback using [github issues][]

___

**Bills supported by +Pool:**
- https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=5871055&GUID=BDDE92D1-845D-44FB-ABD0-93F64E8D1832&Options=Advanced&Search=
- https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=6067581&GUID=E4D4A627-CF16-4E44-B459-BA7235FBA878&Options=ID%7CText%7C&Search=962
___


# Architecture

## repositories

    [reaktor/pluspool-led]                   application respository, built with Next.js
    [reaktor/pluspool-serverless]            New version of data scraping collection managed by AWS CDK Application
    [reaktor/pluspool-led-scrape-data]       Legacy version data scraping tool, able to run every 6 minutes on Github Actions
    [jedahan/predicted-mpn]                  npm package for turning rainfall data into predicted bacteria amount

## data sources

datagarrison - used for central park rainfall data, and the sensor in pier 17

noaa tides and currents - used for speed and direction of water flow

## credentials

We have credentials in our 1password pluspool vault, ask to be added there

We use google analytics to look at pageviews - ask an existing GA admin to add you as an admin for the dashboard property

## hosting

    AWS            Data collection functionality and s3 bucket for samples data
    Vercel         Application hosting
    netlify        Leagcy :: for application hosting
    digital ocean  Legacy :: for grabbing all the data and uploading to s3
    mediatemple    nameserver for water.pluspool.org


# Development

To start developing:

     npm install
     npm start
     xdg-open http://localhost:3000 || open $_

# Deployments

**New:**

Deployments are done with [Vercel](https://vercel.com/plus-pool/). Any pushes to the `stable` branch trigger a deploy.
Vercel hosts our Next.js app with SSG(Static Site Generation) and ISR (Incremental Static Regeneration).

**AWS CDK Step function worfklow also triggers a site deploy via deploy hook everytime data scraping completes based on its cron schedule**

__

**Legacy:** site settings can still be viewed, but dns zones are deleted and repository link disabled.

Deployments are done with [Netlify](https://www.netlify.com/). Any pushes to the `stable` branch trigger a deploy. 
Netlify is a static site hosting service therefore `npm run deploy` runs `next build` as well as `next export`.
This will generate a static file version of our site inside `/out` directory. More info about static export in Next
can be found [here](https://nextjs.org/docs#static-html-export).

## Configuration for S3

For info on the S3 configuration for the data files look [here](https://github.com/reaktor/pluspool-serverless).

## Configuration for Vercel

### Build settings

- Repository: `github.com/reaktor/pluspool-led`
- Base directory: `Not set`
- Build command: `npm run build`
- Output directory: `Next.js default`

### Deploy contexts

- Production branch: `stable`
- Deploy previews: `Automatically build deploy previews for all pull requests`
- Branch deploys: `Deploy all branches pushed to the repository`

# Technology

Project built with Next.js


[github issues]: https://github.com/reaktor/pluspool-led/issues
[the projects board]: https://github.com/reaktor/pluspool-led/projects
[reaktor/pluspool-led]: https://github.com/reaktor/pluspool-led
[reaktor/pluspool-led-scrape-data]: https://github.com/reaktor/pluspool-led-scrape-data
[jedahan/predicted-mpn]: https://github.com/jedahan/predicted-mpn
