#!/usr/bin/sh
set -e 

echo 'Setting Domain'
echo "export default 'https://api.sk8hd.de'" > src/apiUrl.ts

echo 'Building'
npm run build

echo "export default 'http://127.0.0.1:8000'" > src/apiUrl.ts


cd dist/

echo 'Adding github things'
# Tell Gihub about our custom domain
echo 'www.sk8hd.de' > CNAME

echo 'Git init'
git init
git add .
git commit -a -m "deploying"


echo 'Pushing to Github pages'
git push -f https://github.com/skatehd/skatehd.github.io.git master

