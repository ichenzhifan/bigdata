#!/bin/sh


if [ $# == 0 ]  ; then 
echo "USAGE: $0 [TYPE|MODULE_NAME] MODULE_NAME FILE_NAME" 
echo " e.g.: $0 CDR_CALL_20040701" 
exit 1; 
fi

if [ $#  == 2 ] && [ "$2" != "remove" ] ; then 
echo "USAGE: $0  MODULE_NAME remove" 
exit 1; 
fi

basedir=app/modules

if [ $#  == 2 ] && [ "$2" == "remove" ] ; then 
rm -rf ${basedir}/$1
echo remove MODULE[$1] success !!!
exit 0; 
fi


if [ $# == 1 ];then
	mkdir ${basedir}/$1 
	mkdir ${basedir}/$1/controllers 
	mkdir ${basedir}/$1/directives 
	mkdir ${basedir}/$1/services 
	mkdir ${basedir}/$1/filters 
	mkdir ${basedir}/$1/views
        content=`cat templates/index.js`
	echo "${content/xxx/$1}" > ${basedir}/$1/index.js
	echo generate MODULE[$1] success!!!
        exit 0	
fi

#dirname=${basedir}${param%\/*}
#filename=${param##*\/}

#sh develop.sh controller app/app name
type=$1
dirname=${basedir}/$2
#echo mkdir ${dirname}
if [ ${type} == "directive" ]
then
        content=`cat templates/directive.js`
	jadename=$2\/views\/$3.html
	echo "${content/xxx/${jadename}}" > ${dirname}/${type}s/$3.js 
	touch ${dirname}/views/$3.jade
	tmpdirectname=`echo $3| awk -F '.' '{print $1; for(i=2;i<=NF;i++) {printf "%s%s", toupper(substr($i,1,1)),substr($i,2)}}'` 
	directname=`echo ${tmpdirectname} | tr -d ' '`
	register=.directive\(\'${directname}\'\,\ require\(\'./directives/$3.js\'\)\)
	echo ${register} >> ${dirname}/index.js
        echo generate DIRECTIVE[$3] success !!!        
elif [ ${type} == "controller" ];then
	cp templates/controller.js ${dirname}/${type}s/$3.js
	tmpdirectname=`echo $3| awk -F '.' '{print $1; for(i=2;i<=NF;i++) {printf "%s%s", toupper(substr($i,1,1)),substr($i,2)}}'` 
	directname=`echo ${tmpdirectname} | tr -d ' '`
	register=.controller\(\'${directname}Ctrl\'\,\ require\(\'./controllers/$3.js\'\)\)
	echo ${register} >> ${dirname}/index.js
        echo generate CONTROLLER[$3] success !!!        
elif [ ${type} == "service" ];then
	cp templates/service.js ${dirname}/${type}s/$3.js
	tmpdirectname=`echo $3| awk -F '.' '{print $1; for(i=2;i<=NF;i++) {printf "%s%s", toupper(substr($i,1,1)),substr($i,2)}}'` 
	directname=`echo ${tmpdirectname} | tr -d ' '`
	register=.factory\(\'${directname}Service\'\,\ require\(\'./services/$3.js\'\)\)
	echo ${register} >> ${dirname}/index.js
        echo generate SERVICE[$3] success !!!        
elif [ ${type} == "filter" ];then
	cp templates/filter.js ${dirname}/${type}s/$3.js
	tmpdirectname=`echo $3| awk -F '.' '{print $1; for(i=2;i<=NF;i++) {printf "%s%s", toupper(substr($i,1,1)),substr($i,2)}}'` 
	directname=`echo ${tmpdirectname} | tr -d ' '`
	register=.filter\(\'${directname}Filter\'\,\ require\(\'./filters/$3.js\'\)\)
	echo ${register} >> ${dirname}/index.js
        echo generate FILTER[$3] success !!!        
fi












