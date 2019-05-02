# -*- coding: utf-8 -*-
"""
Ymap project

By Ray Liu
"""

import json
import csv
import math
import os

input_file_name='prop_info'
output_file_name='prop_info'

#max_line_per_file=10000
max_line_per_file=10000
keys_to_remove=['Suite','House Number','Street Name','Legal Description']

f = open(input_file_name+".csv", 'r')
reader = csv.DictReader(f)

account_list = open(input_file_name+"_out/account_list.js", 'a+')
account_list.write("account_list=[")
account_list_array=[]


output_files=open(input_file_name+'_out/'+output_file_name+'.js', 'a+')
output_files.write(output_file_name+' = {')

    
file_line_tractker= 0

for x in reader:
    for k in keys_to_remove:
        del x[k]
    
    acc_num=int(x["Account Number"])
    output_files.write(str(acc_num)+':')            
    json.dump(x, output_files)
    output_files.write(', \n')
    
    account_list.write(str(acc_num)+', ')
    
    
    file_line_tractker = file_line_tractker +1  
    if file_line_tractker%max_line_per_file ==0 :
        output_files.write('}')
        output_files.close()
        output_files=open(input_file_name+'_out/'+output_file_name+'_'+str(math.floor(file_line_tractker/max_line_per_file))+'.js', 'a+')
        output_files.write(output_file_name+'_'+str(math.floor(file_line_tractker/max_line_per_file))+'= {')



os.makedirs(input_file_name+'_out', exist_ok=True)

data_list=open(input_file_name+'_out/prop_list.js', 'a+')
data_list.write('prop_list={')

data_list.write('\''+ output_file_name+'\' :' + str(math.floor(file_line_tractker/max_line_per_file)) + ',' )
output_files.write('}')
output_files.close()
    
data_list.write('}')
data_list.close()

account_list.write("]")
account_list.close()


    
    
