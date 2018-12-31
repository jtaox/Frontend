#!/bin/bash

count=0
for file in *
do
	if [ -f  "$file" ]  && [ ! -x "$file" ]
	then
		chmod 777 "$file"
		echo "$file 添加权限成功"
		count=$[$count + 1]
	fi
done
if [ $count -ne 0 ]
then
	echo "$count个文件添加权限成功"
else
	echo "没有新文件"
fi	
