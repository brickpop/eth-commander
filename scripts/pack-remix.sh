#!/bin/bash

rm -Rf ../remix ./remix.zip ./browser-solidity-gh-pages

echo "Fetching the Remix IDE..."
wget https://codeload.github.com/ethereum/browser-solidity/zip/gh-pages
mv gh-pages remix.zip

echo "Extracting..."
unzip remix.zip
mv browser-solidity-gh-pages ../remix
rm ../remix/*.zip

echo "Cleanup..."
rm -Rf ./remix.zip ./browser-solidity-gh-pages
