echo ==============
echo deploying
echo ==============
npm run build

cd dist/ || exit
zip -r -q dist .
scp -i ~/.ssh/ssh_key.txt /Users/victor/Documents/mina-web/dist/dist.zip root@66.42.59.134:/home/app/build/build.zip
ssh -i ~/.ssh/ssh_key.txt  root@103.179.191.52 <<-'ENDSSH'
    #Connected
    cd /home/app/build && unzip -o -q build.zip
    cd /home/app/build && npm install
    cd /home/app/build && node index.js
ENDSSH

echo ==============
echo success
echo ==============