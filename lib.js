
// controls the throbber
let throbber = function(on) {
	if (on === 0) {
		document.getElementById("overlay").style.display = "none";
	} else {
		document.getElementById("overlay").style.display = "block";

	}

};

// we need to keep track of the file loading process
let queue_length = 0;
let loading_queue = function(num = 1) {
	//if this function is called, change the queue_length
	queue_length = queue_length + num;
	throbber(1);
	
	// turn off the throbber once there is no more queue
	if (num < 0 && queue_length === 0) {
		throbber(0);
	}
};

// this will setup select menus 
let setup_select = function(select_menu_id, options_array) {
	
	let menu = document.getElementById(select_menu_id);
	// if the input options_array is not actually an array but an 
	// object, we will set it up as an optgroup list
	if (Object.prototype.toString.call(options_array) === "[object Object]") {
		// the object keys will be our optgroup name so we need to get them
		let keys = Object.keys(options_array);
		let key_count = keys.length;
		let optgroup_array = [];
		//extract the array in each object
		for (let i = 0; i < key_count; i++) {
			optgroup_array[parseInt(i,10)] = document.createElement("optgroup");
			optgroup_array[parseInt(i,10)].id = keys[parseInt(i,10)];
			optgroup_array[parseInt(i,10)].label = keys[parseInt(i,10)];
			let optgroup_options = options_array[keys[parseInt(i,10)]];
			
			//active each of the option in the group as options
			let options = [];
			for (let j = 0; j < optgroup_options.length; j++) {
				options[parseInt(j,10)] = document.createElement("option");
				options[parseInt(j,10)].id = optgroup_options[parseInt(j,10)];
				options[parseInt(j,10)].text = optgroup_options[parseInt(j,10)];
				options[parseInt(j,10)].value = optgroup_options[parseInt(j,10)];
				optgroup_array[parseInt(i,10)].appendChild(options[parseInt(j,10)]);

			}
			// add it to the menu
			menu.appendChild(optgroup_array[parseInt(i,10)]);

		}
		
		// relaod the menu so changes will show up
		let elems = document.querySelectorAll("select");
		let instances = M.FormSelect.init(elems, materialize_options);

		return;
	}

	//here we deal with the simple array situation 
	let option_len = options_array.length;
	try {
		//check to see if there are options that are not supposed to be here
		let current_options = menu.options;
		for (let i = current_options.length - 1; i >= 0; i--) {
			if (current_options[parseInt(i,10)].value !== "None"){ menu.remove(i);}
		}
	} catch (error) {
		// no action expected
	}

	let options = [];
	for (let i = 0; i < option_len; i++) {
		//add each member to the option list
		options[parseInt(i,10)] = document.createElement("option");
		options[parseInt(i,10)].text = options_array[parseInt(i,10)];
		options[parseInt(i,10)].value = options_array[parseInt(i,10)];
		menu.add(options[parseInt(i,10)]);
	}
	elems = document.querySelectorAll("select");
	instances = M.FormSelect.init(elems, materialize_options);

};

// this function is to fuse small segments of data together
let fuse_data = function(obj_list, str) {
	for (let j = 1; j <= obj_list[str.toString()]; j++) {
		// try case is used since the data might not be required yet
		// since we will be calling this function many times,
		// it will fuse everything eventually
		try {
			// this try case is for array type of data
			window[str.toString()] = window[str.toString()].concat(window[str.toString() + "_" + String(j)]);

			window[str.toString() + "_" + String(j)] = [];

		} catch (err) {
			// the try case for object data type
			try {
				window[str.toString()]=Object.assign(window[str.toString()],window[str.toString()+"_"+String(j)]);
				window[str.toString()+"_"+String(j)]={};

			} catch (err) {
				// no action expected
			}

		}

	}

};

// we need a function to get all the data segments   
let get_file = function(obj_list, str, path_to_data) {

	if (typeof obj_list[str.toString()] !== "undefined" && obj_list[str.toString()] !== null) {
		// get the small segments of the data
		require([path_to_data + "\\" + str]);
		for (let i = 1; i <= obj_list[str.toString()]; i++) {
			loading_queue(1);
			require([path_to_data + "\\" + str + "_" + String(i)], function() {
				loading_queue(-1);
				// call the fuse_data function to piece segments together
				fuse_data(obj_list, str);
			});

		}

	}

};



// this is for us to get the selected options in a menu easier
// give an id, it will return selected options in an array.
let get_selected_options = function(menu_id) {
	let selected = document.getElementById(menu_id).selectedOptions;
	let value_array = [];
	for (let i = 0; i < selected.length; i++) {
		value_array[parseInt(i,10)] = selected[parseInt(i,10)].value;
	}

	return value_array;
};

// load selected files and the geo file
let user_load = function() {
	throbber(1);
	let available_data = get_selected_options("load data list");
	setup_select("data 1", available_data);
	setup_select("data 2", available_data);
	for (let year_count = 0; year_count < available_data.length; year_count++) {
		get_file(window[input_data_catalog.toString()], input_data_file_pefix + available_data[parseInt(year_count,10)], input_data_folder);
	}

	if (typeof(window[input_geo_file_prefix.toString()]) === "undefined") {
		// the geo location of the accounts
		get_file(window[input_geo_catalog.toString()], input_geo_file_prefix, input_geo_folder);

	}

};

// This will select data points. If it does not meet the criteria
// this function will return 0. If it fits, it returns 1. 
// idk if there is a more elegant way to code this 
let data_selector = function(data_point, geo_data, selected_tag) {
	
	// essentially this will return if any criteria is not met
	// hopefully will increase the efficiency than simple if else
	switch (true) {
		case parseInt(data_point[parameter1.toString()],10) < parseInt(parameter1_lower_bound.value,10):
			return 0;
		case parseInt(data_point[parameter1.toString()],10) > parseInt(parameter1_upper_bound.value,10):
			return 0;
		case parseInt(data_point[parameter2.toString()],10) < parseInt(parameter2_lower_bound.value,10):
			return 0;
		case parseInt(data_point[parameter2.toString()],10) > parseInt(parameter2_upper_bound.value,10):
			return 0;
		case true:
			for (tag_count = 0; tag_count < selected_tag.length; tag_count++) {
				let current_tag = data_point[tag1.toString()];
				if (current_tag === selected_tag[tag_count.toString()]) {
					return 1;
				}

			}
			

	}

	return 0;
};



// get points to plot base on some requirements
// not really useful right now, but it will be used to
// filter the data points when the UI is implemented 
let getPoints = function(str1, str2, loc) {

	let result_loc = [];
	let arr_length = window[input_id_catalog.toString()].length;
	let tag1_selected=get_selected_options("tag1");
	for (let i = 0; i < arr_length; i++) {
		if (i > arr_length) {break;}
		try {
			let acc_num = window[input_id_catalog.toString()][parseInt(i,10)];
			let prop_info_obj = loc[parseInt(acc_num,10)];
			
			if (str2 === "None") {
				// first case where the second data set is not selected
				let data1 = window[input_data_file_pefix.toString() + str1.toString()];
				if (data_selector(data1[parseInt(acc_num,10)], loc[parseInt(acc_num,10)], tag1_selected)) {
					result_loc[parseInt(i,10)] = [data1[parseInt(acc_num,10)][parameter1.toString()], prop_info_obj.Latitude, prop_info_obj.Longitude, acc_num];
					//here is where you can change the output data formula
				}
			} else {
				// when the second data set is selected
				let data1 = window[input_data_file_pefix.toString() + str1.toString()];
				let data2 = window[input_data_file_pefix.toString() + str2.toString()];
				if (data_selector(data1[parseInt(acc_num,10)], loc[parseInt(acc_num,10)], tag1_selected)) {
					result_loc[parseInt(i,10)] = [data2[parseInt(acc_num,10)][parameter1.toString()] / data1[parseInt(acc_num,10)][parameter1.toString()] - 1, prop_info_obj.Latitude, prop_info_obj.Longitude, acc_num];
					//here is where you can change the output data formula
				}

			}
		} catch (err) {}

	}

	return result_loc;

};



// get the RGB color to plot on the border of the circle markers
let get_color = function(val, min_val, max_val) {
	//re adjust the val to a scale of 100 between min_val and max_val 
	val = (val - min_val) / (max_val - min_val) * 100;
	switch (true) {
		//if val is absolutely inside of the bounds  
		case (val > 0 && val < 100):
			color_index = parseInt(val / 100 * (RGB_steps), 10);
			color_x = val - parseInt(val / (100 / RGB_steps), 10) * 100 / RGB_steps;
			//the RGB_gradient_function is essentially a linear interpolation between two rgb settings
			//RGB_gradient_function is nested arrays in the form of [[R=[slope, intercept],G=....],[R=....]...]
			r = RGB_gradient_function[parseInt(color_index,10)][0][0] * (val) / RGB_steps / 100 + RGB_gradient_function[parseInt(color_index,10)][0][1];
			g = RGB_gradient_function[parseInt(color_index,10)][1][0] * (val) / RGB_steps / 100 + RGB_gradient_function[parseInt(color_index,10)][1][1];
			b = RGB_gradient_function[parseInt(color_index,10)][2][0] * (val) / RGB_steps / 100 + RGB_gradient_function[parseInt(color_index,10)][2][1];
			break;
			
		//if val is absolutely outside of the bounds  
		case (val < 0 || val > 100):
			return "rgb(175, 175, 175)";

			
		//then we have the two boundary conditions
		case (val === 0):
			[r, g, b] = RGB_gradient[0];
			break;

		case (val === 100):
			[r, g, b] = RGB_gradient[parseInt(RGB_steps,10)];
			break;
	}

	try {
		return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
	} catch (err) {
		console.log(val);
	}

};

// this will generate the legend on the map
let make_legend = function(min, max) {
	min = parseInt(min, 10);
	max = parseInt(max, 10);
	
	legend.onAdd = function(map) {
		let max_min_range = max - min;
		let div = L.DomUtil.create("div", "info legend");
		//make the segments round to 1k if values large enough
		if (max > 100000){ round_stop = 1000;}
		else {round_stop = 1;}
		let legend_step = [];
		
		//generate the vaules to generate legends
		for (let i = 0; i < RGB_steps; i++) {
			legend_step.push(Math.round((max_min_range / (RGB_steps + 1) * (i + 1) + min) / round_stop) * round_stop);
		}
		let grades = legend_step;
		//add the min and max at beginning and the end
		grades.unshift(min);
		grades.push(max);

		let labels = [];
		if (min > 0) {grades.unshift(0);}
		else {grades.unshift(min * 2);}
			// loop through our density intervals and generate a label with a colored square for each interval
		for (let i = 0; i < grades.length; i++) {
			let prefix="";
			let suffix="<br>";
			if (typeof(grades[i-1]) === "undefined") {prefix="< ";}
			else if (typeof(grades[i+1]) === "undefined") {prefix=" >";}
			else {suffix=" &ndash; " + grades[i + 1]+ "<br>";}
			
			div.innerHTML +=
				"<i style=background:" + get_color(grades[parseInt(i,10)] + 1, min, max) + "></i> " +
				prefix+grades[parseInt(i,10)] + suffix;
		}

		return div;
	};

	legend.addTo(mymap);
};


// plot points as circle markers on the leaflet map
function plot_points(arr, parameter2_str) {
	let arr_length = arr.length;
	let marker_plotted = 0;
	try {
		var colour_array = parameter1_colour_slider.noUiSlider.get();
	} catch (err) {
		var colour_array = parameter1_change_colour_slider.noUiSlider.get();
		//since the values are in %, we need to get rid of that symbol
		colour_array[0] = colour_array[0].slice(0, -1);
		colour_array[1] = colour_array[1].slice(0, -1);

	}
	for (let i = 0; i < arr_length; i++) {
		if (typeof arr[parseInt(i,10)] !== "undefined" && arr[parseInt(i,10)] !== null) {
			//make the pop up texts
			if (parameter2_str === "None") {
				text = "<p> "+parameter1+": " + arr[parseInt(i,10)][0].toString() + "</p> <p>"+id_key+": " + arr[parseInt(i,10)][3].toString() + "</p>";

			} else {
				text = "<p> "+parameter1+": " + (arr[parseInt(i,10)][0] * 100).toPrecision(3).toString() + "%</p> <p>"+id_key+": " + arr[parseInt(i,10)][3].toString() + "</p>";
				arr[parseInt(i,10)][0] = arr[parseInt(i,10)][0] * 100;

			}

			//make the marker
			Marker = new L.circle([arr[parseInt(i,10)][1], arr[parseInt(i,10)][2]], {
					radius: c_radius,
					color: (get_color(arr[parseInt(i,10)][0], colour_array[0], colour_array[1]))
				})
				.bindPopup(text) // add the pop up text
				.addTo(data_points);
			marker_plotted++;

		}
	}
	make_legend(colour_array[0], colour_array[1]);
	//console.log(marker_plotted.toString() + " markers plotted");
	return loading_queue(-1);

}

//prepare the action needed and send it to plot
let execute_plot = function() {
	data_points.clearLayers();
	let marker_loc = getPoints(get_selected_options("data 1")[0], get_selected_options("data 2")[0], window[input_geo_file_prefix.toString()]);
	return plot_points(marker_loc, get_selected_options("data 2")[0]);
};

//when the plot! botton pressed, this function will be called
let user_plot = function() {
	throbber(1);
	loading_queue(1);
	// we need tp give throbber some time to react, otherwise 
	// the processes will jam the computer and the throbber will not show up
	setTimeout(function() {
		
		return execute_plot();
	}, 50);

};

