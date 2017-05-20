# Ipsigma
Ipsigma is an exceedingly simple, React-based application for building Lorem Ipsum generators, used by a lot of folks to generate filler text to demo layouts for print or web.  I originally built Ipsigma to power PikaIpsum (www.pikaipsum.com). Though it would not be hard to roll your own solution, I figured open sourcing this would also provide a good example to learn from of an easy-to-understand, straightforward implementation of React components.

## Development Setup
The "dist" folder includes a compiled JavaScript file with everything you need to run Ipsigma out of the box. However, if you wish to make any modifications, you'll need to do a little bit of setup.

After downloading the repository, install all of the NPM and Bower repositories:
	`npm install`
	`bower install`

This will enable you to build the project using gulp, which will create the main.js file imported in index.html:
	`gulp`

At this point, the app should run! If you want to customize what types of generators are available, edit the constructor of `IpsigmaGenerator.js` in the src folder, where it defines the “types” state variable.
