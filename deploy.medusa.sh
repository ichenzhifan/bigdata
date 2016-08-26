#!/bin/sh

cp app/modules/dashboard/directives/main.header.medusa.js app/modules/dashboard/directives/main.header.js 

export NODE_ENV=production 
gulp build
tar -zcv -f bigdata.tar.gz --exclude=node_modules --exclude=test dist/*

server="115.231.96.71"
user="playbi"
appdir="/biServer/medusa-bi/portal"

scp bigdata.tar.gz $user@$server:$appdir

ssh $user@$server " 
  cd $appdir
  mkdir -p bigdata & tar -xvzf bigdata.tar.gz -C bigdata 
  cd bigdata 
"
rm -rf bigdata.tar.gz
