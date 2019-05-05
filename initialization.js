

//here we setup the data-loading and tag select menu 
setup_select("load data list", time_option_list);
setup_select("tag1", tag_list);
/////////////////////////////////////////////////

//here we setup the first data set menu
data_1 = document.getElementById("data 1");
	data_1.addEventListener("change", function() {

});
/////////////////////////////////////////////////

//here is the second data set menu
//It is a lot longer becasue I want to plot different output values 
//when data2 is not "None", so I need to update the colour slider here.
data_2 = document.getElementById("data 2");
data_2.addEventListener("change", function() {
	if (get_selected_options("data 2")[0] !== "None") {
		try {
			//if there is a output value type change, destroy the old slider
			window.parameter1_colour_slider.noUiSlider.destroy();
			window.parameter1_colour_slider = [];
		} catch (error) {}
		if (typeof(window.parameter1_change_colour_slider) === "undefined" || typeof(window.parameter1_change_colour_slider.noUiSlider) === "undefined") {
			//create the proper slider with proper parameters
			window.parameter1_change_colour_slider = document.getElementById("colour slider");
			noUiSlider.create(window.parameter1_change_colour_slider, {
				start: default_change_colour_range,
				connect: true,
				range: {
					"min": change_colour_range[0],
					"max": change_colour_range[1]
				},
				format: wNumb({
					decimals: 3,
					suffix: "%",
				})
			});

			window.colour_value = document.getElementById("colour value");
			//make the small text below the slider, showing the value range
			parameter1_change_colour_slider.noUiSlider.on("update", function(values) {
				window.colour_value.innerHTML = values.join(" to ");
			});

		}

	} else {
		//same as above, just the oppsite situation
		try {
			window.parameter1_change_colour_slider.noUiSlider.destroy();
			window.parameter1_change_colour_slider = [];
		} catch (err) {}
		if (typeof(window.parameter1_colour_slider) === "undefined" || typeof(window.parameter1_colour_slider.noUiSlider) === "undefined") {
			window.parameter1_colour_slider = document.getElementById("colour slider");
			noUiSlider.create(parameter1_colour_slider, {
				start: default_slider1_range,
				connect: true,
				range: {
					"min": default_slider1_range[0],
					"max": default_slider1_range[1]
				},
				format: wNumb({
					decimals: 0,
				})
			});

			window.colour_value = document.getElementById("colour value");

			parameter1_colour_slider.noUiSlider.on("update", function(values) {
				window.colour_value.innerHTML = values.join(" to ");
			});

		}

	}
});
/////////////////////////////////////////////////


//These two (update_slider and update_slider_range) are functions 
//to help us control the noUiSlider
let update_slider = function(slider, handle, value) {
	if (handle === "low") {
		if (value < slider.noUiSlider.options.range.min) {
			slider.noUiSlider.updateOptions({
				start: [value, slider.noUiSlider.get()[1]],
				range: {
					"min": value,
					"max": slider.noUiSlider.options.range.max
				}
			});
		} else {
			slider.noUiSlider.set([value, null]);
		}
	}
	if (handle === "high") {
		if (value > slider.noUiSlider.options.range.max) {
			slider.noUiSlider.updateOptions({
				start: [slider.noUiSlider.get()[0], value],
				range: {
					"min": slider.noUiSlider.options.range.min,
					"max": value
				}
			});
		} else {
			slider.noUiSlider.set([null, value]);
		}
	}
};

let update_slider_range = function(slider, handle, value) {
	if (handle === "low") {
		if (value < slider.noUiSlider.options.range.min) {
			slider.noUiSlider.updateOptions({
				range: {
					"min": value,
					"max": slider.noUiSlider.options.range.max
				}
			});
		}
	}
	if (handle === "high") {
		if (value > slider.noUiSlider.options.range.max) {
			slider.noUiSlider.updateOptions({
				range: {
					"min": slider.noUiSlider.options.range.min,
					"max": value
				}
			});
		}
	}
};
/////////////////////////////////////////////////

//the setup for the first filter. In the origal Ymap, this will be the assessment value 
const parameter1_slider = document.getElementById("parameter1 slider");

//setup it is a noUiSlider  
noUiSlider.create(parameter1_slider, {
	start: default_slider1_range,
	connect: true,
	range: {
		"min": default_slider1_range[0],
		"max": default_slider1_range[1]
	},
});

//get the text boxs in the html
parameter1_lower_bound = document.getElementById("parameter1 lower bound");
parameter1_upper_bound = document.getElementById("parameter1 upper bound");

//listen to changes
parameter1_lower_bound.addEventListener("change", function() {
	update_slider_range(parameter1_colour_slider, "low", this.value - 0);
	update_slider(parameter1_slider, "low", this.value - 0);
});

parameter1_upper_bound.addEventListener("change", function() {
	update_slider_range(parameter1_colour_slider, "high", this.value - 0);
	update_slider(parameter1_slider, "high", this.value - 0);
});

//listen to changes on the slider
parameter1_slider.noUiSlider.on("update", function(values, handle) {

	let value = values[parseInt(handle,10)];

	if (!handle) {
		parameter1_lower_bound.value = value;
	} else {
		parameter1_upper_bound.value = (value);
	}
	//since the text boxs are controlled by materializeCSS
	//we need to reload them
	let elems = document.querySelectorAll("select");
	let instances = M.FormSelect.init(elems, materialize_options);
});
/////////////////////////////////////////////////

// this will be the second slider, which is the lot size, originally
// same details as parameter1
const parameter2_slider = document.getElementById("parameter2 slider");

noUiSlider.create(parameter2_slider, {
	start: default_slider2_range,
	connect: true,
	range: {
		"min": default_slider2_range[0],
		"max": default_slider2_range[1]
	}

});

parameter2_lower_bound = document.getElementById("parameter2 lower bound");
parameter2_upper_bound = document.getElementById("parameter2 upper bound");

parameter2_lower_bound.addEventListener("change", function() {
	update_slider(parameter2_slider, "low", this.value - 0);

});

parameter2_upper_bound.addEventListener("change", function() {
	update_slider(parameter2_slider, "high", this.value - 0);
});

parameter2_slider.noUiSlider.on("update", function(values, handle) {

	let value = values[parseInt(handle,10)];

	if (!handle) {
		parameter2_lower_bound.value = value;
	} else {
		parameter2_upper_bound.value = (value);
	}
	let elems = document.querySelectorAll("select");
	let instances = M.FormSelect.init(elems, materialize_options);
});
/////////////////////////////////////////////////

//create the colour slider fo the first time
parameter1_colour_slider = document.getElementById("colour slider");
noUiSlider.create(parameter1_colour_slider, {
	start: default_slider1_range,
	connect: true,
	range: {
		"min": default_slider1_range[0],
		"max": default_slider1_range[1]
	},
	format: wNumb({
		decimals: 0,
	})
});
window.colour_value = document.getElementById("colour value");

parameter1_colour_slider.noUiSlider.on("update", function(values) {
	window.colour_value.innerHTML = values.join(" to ");
});

///////////////////////////////////////////////// sliders finished



//map initialiating 
// set up the map use leaflet
let mymap = L.map("mapid", {
	renderer: L.canvas(),
	markerZoomAnimation: false,
	zoomAnimation: false,

});

mymap.setView(map_start_center, 12);
// add map tile from wikimedia. Thanks wiki!
L.tileLayer("https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png", {
	maxZoom: 18,
	attribution: '<a href="https://rayliu.ca">Ray Liu</a>, ' +
		'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
	id: "OpenStreetMap.Mapnik"
}).addTo(mymap);
// set a layer group so the points can be easily removed
data_points = L.layerGroup().addTo(mymap);

// setup the legend layer
let legend = L.control({
	position: "bottomright"
});

let popup = L.popup(); // set the pop up layer
/////////////////////////////////////////////////


/////Colour functions setup
RGB_gradient_function = [];
RGB_steps = RGB_gradient.length - 1;

for (let i = 0; i < RGB_steps; i++) {
	RGB_gradient_function[parseInt(i,10)] = [];
	for (let j = 0; j < 3; j++) {
		RGB_gradient_function[parseInt(i,10)].push([(RGB_gradient[parseInt(i + 1,10)][parseInt(j,10)] - RGB_gradient[parseInt(i,10)][parseInt(j,10)]) * RGB_steps, RGB_gradient[parseInt(i,10)][parseInt(j,10)]]);
	}

}




