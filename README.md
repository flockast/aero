Aero
===========

## Requirements
You only need <b>node.js</b> pre-installed and you’re good to go.

## Setup
Install dependencies<br>
`$ npm install` or `$ yarn`

## Development
Run the local webpack-dev-server with livereload and autocompile on [http://localhost:8080/](http://localhost:8080/)<br>
`$ npm run dev` or `$ yarn dev`

## Deployment
Build the current application<br>
`$ npm run build` or `$ yarn build`

## Configure
file <b>package.json</b> have config
```sh
  "config": {
    "src": {
      "base": "./src",
      "styles": "/styles/index.scss",
      "js": "/js/index.js",
      "templates": "/templates"
    },
    "build": {
      "base": "dist",
      "styles": "bundle.[name].css",
      "js": "bundle.[name].js"
    },
    "copy": [
      {
        "from": "/favicon.ico",
        "to": "[name].[ext]"
      }
    ],
    "pages": [
      {
        "from": "/pages/index.njk",
        "to": "index.html"
      }
    ],
    "publicPath": ""
  }
```
