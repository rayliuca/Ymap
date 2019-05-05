# Structure 
## File Structure
These are the necessary files

```
.
- index.html
- lib.js
- initialization.js
- config.js
- :input_data_folder
	- : input_data_catalog_file
	- (A bunch of data files, in the naming style of -> :input_data_file_pefix+ some_identifier+”_"+:number+".js” )
- :input_geo_folder
	- :input_id_catalog_file
	- (A bunch of data files, in the naming style of -> :input_geo_file_prefix+”_"+:number+".js” )

```


## data Structure

#### : input_data_catalog_file (data_list.js)
Include an object :input_data_catalog with keys as the :input_data_file_pefix+ some_identifier and the value equal to the number of files for each data set. For example: 

```
	data_list={'year2010' :0,'year2011' :0,'year2012' :33,'year2013' :34,'year2014' :35,'year2015' :36,'year2016' :38,'year2017' :38,'year2018' :39,'year2019' :0,'year2020' :0,}
```

#### Data files (i.e. year2015_1.js)
&nbsp;&nbsp;&nbsp;&nbsp;Data sets will be partitioned into many .js files. For example, year2015.js, year2015_1.js, year2015_2.js… you get the idea. Inside of each partitioned file, there will be an object name same as the file name, with data on each data point stored inside the object as objects. Each data point object will use their id as the key. For example:

```
	year2015_1= {5226204:{"Account Number": "5226204", "Lot Size": "587.59", "Assessment Year": "2015", "Garage": "Y", "Neighbourhood": "OVERLANDERS", "Assessed Value": "319000.00", "Assessment Class": "Residential", "Actual Year Built": "1977", "Zoning": "RF1"}, 4067948:{"Account Number": "4067948", "Lot Size …….
```


&nbsp;&nbsp;&nbsp;&nbsp;In the above example, 5226204 is the Account Number of the data point, which is used as the first layer key, so the data point is faster to find. The amount of information in the second layer object is optional, as long as you have all the parameters you want to filter.

#### : input_geo_catalog_file (prop_list.js)
&nbsp;&nbsp;&nbsp;&nbsp;Same as the : input_data_catalog_file, except we only expect one key. For example:
const prop_list={'prop_info' :39};
which means there are prop_list.js to prop_list_39.js files.

#### Geologic information files (i.e. prop_info_1.js)
&nbsp;&nbsp;&nbsp;&nbsp;I have decided to separate the geo info from the data file to save space. The structure is similar to the data files. It will be easier to just look at the [Edmonton assessment example]( https://raw.githubusercontent.com/rayliuca/Ymap/master/prop_info_out/prop_info_10.js) if you still don’t get it.

#### :input_id_catalog_file (account_list.js)
&nbsp;&nbsp;&nbsp;&nbsp;This is a list of all the IDs we have. It is a simple array.

