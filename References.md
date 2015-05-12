# General References #
  * https://docs.oracle.com/cd/E19776-01/820-4867/index.html
  * http://gafferongames.com/
  * http://tombenke.github.io/rest-tool/index.html

# Angular.js #
**online class to learn AngularJS http://angular.codeschool.com/**

# MongoDB #
  * documentation on basic Create/Read/Update/Delete with MongoDB
http://docs.mongodb.org/manual/crud/

# Express.js #
  * http://expressjs.com/starter/generator.html
  * This is related to loopback.js
    * http://loopback.io/getting-started/
    * Training video https://vimeo.com/109596021

## Set up demo project using Express.js ##
  * install python ( https://www.python.org/downloads/ . If installing on windows, be sure to select option to update windows path)
  * install git ( http://git-scm.com/downloads . If installing on windows, be sure to select option to update windows path)
  * install items listed here https://github.com/TooTallNate/node-gyp/wiki/Visual-Studio-2010-Setup (windows only)
  * npm install -g strongloop
  * follow basic hello-world here http://loopback.io/getting-started/
  * connect to a datasource here http://docs.strongloop.com/display/public/LB/Connect+your+API+to+a+data+source
    * instead of using 'mysql' use 'mongodb' ( http://docs.strongloop.com/display/public/LB/MongoDB+connector )
    * 'npm install loopback-connector-mongodb --save'
    * create a hello-world database in the local mongodb
    * modify server\datasources.json
```
{
  "db": {
    "name": "db",
    "connector": "memory"
  },
  "mongodb": {
    "name": "mongodb",
    "connector": "mongodb",
    "database": "hello-world",
    "host": "127.0.0.1",
    "url": "mongodb://127.0.0.1:27017/"
  }
}
```
    * edit server\model-config.json
```
  ...
  "person": {
    "dataSource": "mongodb",
    "public": true
  }
  ...
```
    * I saw the data in the 'admin' database, which is unexpected, this is certainly a configuration issue, but the data is being saved

# Node.js #
For node.js envrionment
  * download and install node.js http://nodejs.org/download/
  * install rest-tool | `sudo npm install -g rest-tool` |
|:--------------------------------|
  * install mocha (test tool)  | `sudo npm install -g mocha` |
  * run service  | `node server/server.js` |

# rest-tool #
Setup demo project (after install steps above)
```
rest-tool create demo-project
cd demo-project
sudo npm install
rest-tool add -t COLLECTION -p /games -u /games -n Games -d "A service to manage the collection of games"
rest-tool add -t RESOURCE -p /games/game -u /games/{id} -n Game -d "A service to manage an individual game"
rest-tool add -t COLLECTION -p /games/game/moves -u /games/{id}/moves -n Moves -d "A service to manage the collection of game moves"
rest-tool add -t RESOURCE -p /games/game/moves/move -u /games/{id}/moves/{move} -n Move -d "A service to manage an individual game move"
rest-tool add -t COLLECTION -p /players -u /players -n Players -d "A service to manage the collection of players"
rest-tool add -t RESOURCE -p /players/player -u /players/{id} -n Player -d "A service to manage an individual player"

rest-tool docs --update
rest-tool test --update
node server/server.js
```

Check out the work so far:
  * API - http://localhost:3007/rest/games
> > - http://localhost:3007/rest/games/1/
> > - http://localhost:3007/rest/games/1/moves
> > - http://localhost:3007/rest/games/1/moves/1
> > - http://localhost:3007/rest/players
> > - http://localhost:3007/rest/players/X
  * Docs - http://localhost:3007/docs

helpful rest-tool items
  * | rest-tool docs --update |
|:------------------------|
  * | rest-tool test --update |