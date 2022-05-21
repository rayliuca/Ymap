// This file contains the settings for Ymap at 
// https://github.com/rayliuca/Ymap
// Most of the modifications will be here, except some front end stuff

let id_key="Account Number";
let parameter1="Assessed Value";
let parameter2="Lot Size";
let tag1="Zoning";


let input_data_file_pefix="year";
let input_data_folder="EdmontonPA_out";
let input_data_catalog_file="data_list.js";
let input_data_catalog="data_list";

let input_geo_file_prefix="prop_info";
let input_geo_folder="prop_info_out";
let input_geo_catalog_file="prop_list.js";
let input_geo_catalog="prop_list";

let input_id_catalog_file="account_list.js";
let input_id_catalog="account_list";



//Choose the default start location
let map_start_center=[53.532146, -113.502502];

//The size of the circle marker
let c_radius = 3; // set circle radius to be 3m

//here we can set the default parameter for the filters
let default_tag_selection = ["RF1", "RF2", "RF3"];
let default_slider1_range = [100000, 800000];
let default_slider2_range = [100, 2000];
let default_change_colour_range = [-10, 10];
let change_colour_range = [-25, 25];

//In the example, this is the list years of parameter1s that you can load 
let time_option_list = ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];

//In the example, this is the zoning list
let tag_list = {
	"Special":["All"],
	"Residential Zones": ["RF1", "RF2", "RF3", "RSL", "PRL", "RF4", "RF5", "RF6", "RA7", "RA8", "RA9", "RR", "UCRH"],
	"Commercial Zones": ["CNC", "CSC", "CB1", "CB2", "CB3", "CHY"],
	"Industrial Zones": ["IB", "IL", "IM", "IH"],
	"Urban Services Zones": ["US", "PU", "MA", "AP", "NA", "A", "AN", "AJ", "Community Services Zones"],
	"Agricultural and Reserve Zones": ["AG", "AGU", "AGI"],
	"Direct Control Provisions": ["DC1", "DC2"]
};

//This the colour gradient for the markers, you can add as many 
//colour you want. They are linear spaced
let RGB_gradient = [
	[151, 237, 229],
	[96, 196, 145],
	[47, 140, 68],
	[165, 139, 33],
	[206, 149, 43],
	[237, 89, 75],
	[174, 100, 214],
];

//If you wish, the option for materializeCSS can be set here
let materialize_options="";
