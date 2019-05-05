# Ymap

[![rayliu.ca](https://img.shields.io/website/https/ymap.rayliu.ca.svg?down_message=failing&label=build&up_message=passing)](https://ymap.rayliu.ca)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rayliuca/Ymap/master/LICENSE)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7440bc9c90c7466494e4268fe1d1c520)](https://www.codacy.com/app/rayliuca/Ymap?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rayliuca/Ymap&amp;utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/f7f25493fc388f34ebeb/maintainability)](https://codeclimate.com/github/rayliuca/Ymap/maintainability)

Ymap is an open-sourced, accessible, and interactive tool to visualize geologic data. 

- Uses HTML and JavaScript
- Tested with Chrome and FireFox
- Accessible on all OS
- Magic


## Features!

  - Compare between any two data sets (or just plot one)
  - Filter with parameters of your choosing using sliders and menus
  - Change the colour scale
  - Points stay at the same size regardless of the zoom 


### Example


The default example is to study the property assessment trend in Edmonton, Canada. Here you can plot a single year of assessment or compare the change between any two years while filtering the data set based on zoning, assessment value, and lot size.

Try it out online at [ymap.rayliu.ca](https://ymap.rayliu.ca/)
<kbd>
![imag](https://raw.githubusercontent.com/rayliuca/Ymap/master/img/example_edmonton.png)
</kbd>

### Tech

Ymap uses some external scripts to work properly:

* [Leaflet] - Create the map!
* [noUiSlider] - Good-looking sliders
* [Wnumb] - Format numbers
* [RequireJS] - Get the data files
* [MaterializeCSS] - Fancy text boxes and menus


### Modification

##### How do I use this thing?

To plot your own data, there are some things you will need to do

-	Replace the example data with your data (obviously)
-	Update the config.js file to your desired setting 
-	Update the HTML code to match your text 


### Todos

 - Add statistical analysis of the plotted points (mean, weighted mean, median, mode, FWHM?,  fast Fourier transform??)
- Add a plot with the distribution of parameter 1 and 2
- Add another example
- Auto update HTML texts from the config file
- Prettify the UI and its responsiveness


License
----

This repo is released under MIT license


[Leaflet]: <https://github.com/Leaflet/Leaflet>
[noUiSlider]: <https://github.com/Leaflet/Leaflet>
[Wnumb]: <https://github.com/Leaflet/Leaflet>
[RequireJS]: <https://github.com/Leaflet/Leaflet>
[MaterializeCSS]: <https://github.com/Leaflet/Leaflet>
