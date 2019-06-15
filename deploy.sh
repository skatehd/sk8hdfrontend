#!/usr/bin/sh
set -e 

echo 'Building'
npm run build

echo 'Git init'
cd dist/
git init
git add .
git commit -a -m "deploying"

# Tell Gihub about our custom domain
echo 'sk8hd.de' > CNAME 

echo 'Pushing to Github pages'
git push -f https://github.com/skatehd/skatehd.github.io.git master
