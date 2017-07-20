#!/bin/bash

rm -Rf ../remix ./remix.zip ./browser-solidity-master

echo "Fetching the Remix IDE..."
wget https://codeload.github.com/ethereum/browser-solidity/zip/master
mv master remix.zip

echo "Extracting..."
unzip remix.zip

echo "Building..."
cd browser-solidity-master
npm install
cd ..

mkdir -p ../remix
cp -R ./browser-solidity-master/{assets,build,*.html,*.js,*.png} ../remix

echo "Cleanup..."
rm -Rf ./remix.zip ./browser-solidity-master

echo "Done"
