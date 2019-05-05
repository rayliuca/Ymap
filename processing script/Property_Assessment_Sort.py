# -*- coding: utf-8 -*-
"""
Ymap project

By Ray Liu
"""

import json
import csv
import math

input_file_name='EdmontonPA'
output_prefix='year'

start_year=2010
end_year=2020
max_line_per_file=10000

keys_to_remove=['Suite','House Number','Street Name','Legal Description']

f = open(input_file_name+".csv", 'r')
reader = csv.DictReader(f)


output_files= [None] * (end_year+1)

for i in range(start_year,end_year+1):
    output_files[i]=open(input_file_name+'_out/'+output_prefix+str(i)+'.js', 'a')
    output_files[i].write(output_prefix+str(i)+'= {')
    
file_line_tractker= [0] * (end_year+1)

for x in reader:
    acc_num=int(x['Account Number'])
    current_year=int(x['Assessment Year'])
    for k in keys_to_remove:
        del x[k]
    output_files[current_year].write(str(acc_num)+':')
    json.dump(x, output_files[current_year])
    output_files[current_year].write(', \n')
    file_line_tractker[current_year] = file_line_tractker[current_year] +1
    if file_line_tractker[current_year]%max_line_per_file ==0 :
        output_files[current_year].write('}')
        output_files[current_year].close()
        output_files[current_year]=open(input_file_name+'_out/'+output_prefix+str(current_year)+'_'+str(math.floor(file_line_tractker[current_year]/max_line_per_file))+'.js', 'a')
        output_files[current_year].write(output_prefix+str(current_year)+'_'+str(math.floor(file_line_tractker[current_year]/max_line_per_file))+'= {')


        
data_list=open(input_file_name+'_out/data_list.js', 'a')
data_list.write('data_list={')
    
for i in range(start_year,end_year+1):
    data_list.write('\''+ output_prefix+str(i)+'\' :' + str(math.floor(file_line_tractker[i]/max_line_per_file)) + ',' )
    output_files[i].write('}')
    output_files[i].close()

data_list.write('}')
data_list.close()

