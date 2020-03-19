#!/bin/bash
PUBLIC_PATH="music-theory"

echo "Starting build..."
yarn
PRODUCTION=true PUBLIC_PATH=$PUBLIC_PATH yarn build

echo "Creating bundle..."
mkdir -p temp/static
cp -r static temp
rm temp/static/index*
sed "s~\[\[PUBLIC_PATH\]\]~${PUBLIC_PATH}~g" static/index_prod.html > temp/index.html
tar -czvf build.tgz temp/*
rm -rf temp

echo '-- Done --'
