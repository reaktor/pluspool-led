This is a water quality data visualization and exploration tool.

We are happy to receive any feedback using [github issues][]

The main applications pulls from a file generated from the noaa api and a datagarrison stream to share the current conditions of Pier 17.

To start developing:

     npm install
     npm start
     xdg-open http://localhost:3000 || open $_

# Deployments

Deployments are done with [Netlify](https://www.netlify.com/). Any pushes to the `stable` branch trigger a deploy. 
Netlify is a static site hosting service therefore `npm run deploy` runs `next build` as well as `next export`.
This will generate a static file version of our site inside `/out` directory. More info about static export in Next
can be found [here](https://nextjs.org/docs#static-html-export).

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
