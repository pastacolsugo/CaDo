You'll need:
- git
- node
- npm
- mongodb

**************************************
CHECK PROCEDURE on Ubuntu 16.04 LTS
**************************************
To install stuff:
`sudo apt update`

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt install nodejs
```

`sudo npm install npm -g //npm gets installed with nodejs, this is to check for the latest version`

`sudo apt install mongodb`
**************************************

Generate ExpressJS application skeleton: use express-generator

	https://www.npmjs.com/package/express-generator

	>> npm install -g express-generator

	Use Pug as view engine to generate the ExpressApp. The name Jade has been claimed and they had to switch to pug.

	>> express --view=pug

	If there are files in the directory it might overwrite them.

To install the necessary packages you'll have to run
`npm install`
in the proj directory.

Then, run typing `npm start`

While developing on Chrome locally, you can Refresh the page WITHOUT the cache by using cmd+shift+r on mac.
