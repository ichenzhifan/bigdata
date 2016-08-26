#!/bin/sh

cp app/modules/dashboard/directives/main.header.medusa.js app/modules/dashboard/directives/main.header.js 

export NODE_ENV=testMedusa
gulp build
cd dist
tar -zcv -f bigdata.tar.gz --exclude=node_modules --exclude=test ./*

server="172.16.10.59"
user="moretv"
appdir="/home/moretv/swc/bigdata/public"

scp bigdata.tar.gz $user@$server:$appdir

ssh $user@$server " 
  cd $appdir
  mkdir -p medusa & tar -xvzf bigdata.tar.gz -C medusa
  rm bigdata.tar.gz
"
rm -rf bigdata.tar.gz
