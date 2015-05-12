These are the tools and configuration used for this project:
  * MEAN stack (MongoDB, Express.js, Angular.js, Node.js)
    * MongoDB (http://www.mongodb.org/downloads)
      * There are some configuration requirements before the server will run
      * http://docs.mongodb.org/manual/installation/
      * keep default port of 27017
    * Express.js (http://expressjs.com/starter/installing.html)
      * Loopback.js seems to be the real component, but doesn't fit into a mnemonic
      * http://loopback.io/getting-started/
      * Loopback requires python 2.7 (not python 3.x) and Git
      * special windows instructions are here https://github.com/TooTallNate/node-gyp/wiki/Visual-Studio-2010-Setup
    * Anglular.js (include in the &lt;head&gt; tag '&lt;script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js" &gt; &lt;/script &gt; ')
    * Node.js (http://nodejs.org/download/)
  * arc
    * Strongloop offers an API builder called 'arc' it allows you to build an API thorugh a UI
    * http://docs.strongloop.com/display/APIS/Creating+a+new+API
  * rest-tool (http://tombenke.github.io/rest-tool/index.html)
    * This was used for an intial demo rest API
    * the Express/Loopback components may replace this.
  * UMongo - (optional, a MongoDB UI manager)
    * download from http://edgytech.com/umongo/
    * requires java
    * unzip and copy to c:\program files(x86) folder

Once you check out from Git:
 * navigate to the 'tictactoe' folder
 * 'npm install -g strongloop'
 * 'slc arc'
 * This will launch the 'arc' tool for reviewing the API