This is a water quality data visualization and exploration tool.

We are happy to receive any feedback using [github issues][]

The main applications pulls from a file generated from the noaa api and a datagarrison stream to share the current conditions of Pier 17.

Water Day!

To start developing:

     npm install
     npm start
     xdg-open http://localhost:3000 || open $_

If you run into an error with `libffi` you might need to export it's path in your package config.

     export PKG_CONFIG_PATH=/usr/local/Cellar/libffi/3.2.1/lib/pkgconfig/

# technology

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
We use paperjs for the animation.


[github issues]: https://github.com/reaktor/pluspool-led/issues
