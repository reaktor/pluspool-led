This is a water quality data visualization and exploration tool. You can view it on https://water.pluspool.org.

If you are interested in helping out, check [the projects board][] and reach out in #pluspool and via pluspool@reaktor.com.

We are happy to receive any feedback using [github issues][]

# Architecture

## repositories
```
reaktor/pluspool-led                   application respository, built in react
reaktor/pluspool-led-scrape-data       data scraping tool, runs every 6 minutes on a digitalocean box
jedahan/predicted-mpn                  npm package for turning rainfall data into predicted bacteria amount
```
## data sources

datagarrison - used for central park rainfall data, and the sensor in pier 17

noaa tides and currents - used for speed and direction of water flow

## hosting
```
s3             for samples data
netlify        for application hosting
digital ocean  for grabbing all the data and uploading to s3
mediatemple    ns for water.pluspool.org
```

# Development

To start developing:

     npm install
     npm start
     xdg-open http://localhost:3000 || open $_

# Deployments

Deployments are done with [Netlify](https://www.netlify.com/). Any pushes to the `stable` branch trigger a deploy. 
Netlify is a static site hosting service therefore `npm run deploy` runs `next build` as well as `next export`.
This will generate a static file version of our site inside `/out` directory. More info about static export in Next
can be found [here](https://nextjs.org/docs#static-html-export).

## Configuration for S3

For info on the S3 configuration for the data files look [here](https://github.com/reaktor/pluspool-led-scrape-data).

## Configuration for Netlify

### Build settings

- Repository: `github.com/reaktor/pluspool-led`
- Base directory: `Not set`
- Build command: `npm run deploy`
- Publish directory: `/out`

### Deploy contexts

- Production branch: `stable`
- Deploy previews: `Automatically build deploy previews for all pull requests`
- Branch deploys: `Deploy all branches pushed to the repository`

# Technology

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


[github issues]: https://github.com/reaktor/pluspool-led/issues
[the projects board]: https://github.com/reaktor/pluspool-led/projects
