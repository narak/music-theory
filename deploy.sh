#!/bin/bash

SSH_STR=$1
echo "Deploying to: $SSH_STR"
scp build.tgz $SSH_STR:~

ssh -t $SSH_STR "tar -xvf build.tgz -C /srv/www/www.alsilog.com/public/music-theory"
