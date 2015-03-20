v0 is for the basic tictactoe game.


---

| **Path** | **Method**|
|:---------|:----------|
|/games | GET |

**Request Parameters**<br />
_Required:_
none

_Optional:_
none

**Response**
Returns the list of games played

_Sample_

<table border='1'><tr><td><pre>
[{<br>
"id": "305710",<br>
"href": "http://localhost:3007/rest/games/305710"<br>
}, {<br>
"id": "150103",<br>
"href": "http://localhost:3007/rest/games/150103"<br>
}, {<br>
"id": "555211",<br>
"href": "http://localhost:3007/rest/games/555211"<br>
}]<br>
</pre></td></tr></table>

TODO:what if there are lots of games? <br>
is there some pagination model?<br>
<hr />
<table><thead><th> <b>Path</b> </th><th> <b>Method</b></th></thead><tbody>
<tr><td>/games/XXXXXX </td><td> GET </td></tr></tbody></table>

<b>Request Parameters</b><br />
<i>Required:</i>
XXXXXX = this is the id of the game<br>
<br>
<i>Optional:</i>
- playersMove<br />
Example: to find which player has the next move for game 59599.<br>
<table><thead><th> '<a href='http://localhost:3007/rest/games/59599?playersMove'>http://localhost:3007/rest/games/59599?playersMove</a>' </th></thead><tbody>
- gameStatus<br />
Example: to find which player has won game 59599 (or if it is in progress, or a 'cat').<br>
<tr><td> '<a href='http://localhost:3007/rest/games/59599?playersMove'>http://localhost:3007/rest/games/59599?playersMove</a>' </td></tr></tbody></table>

<b>Response</b>
Returns the details of the game specified by XXXXXX<br>
<table border='1'><tr><td><pre>
{<br>
"game": {<br>
"id": "305710",<br>
"playersMove": "X",<br>
"gameStatus": "In Progress",<br>
"validMoves": [<br>
"center",<br>
"upper-left",<br>
"center-right"<br>
],<br>
"currentBoard": {<br>
"upper-left": "",<br>
"top-center": "X",<br>
"upper-right": "O",<br>
"center-left": "X",<br>
"center": "",<br>
"center-right": "",<br>
"lower-left": "O",<br>
"bottom-center": "X",<br>
"lower-right": "O"<br>
}<br>
}<br>
}<br>
</pre></td></tr></table>
TODO:what details?<br>
TODO:what is the format of the id?<br>
<br>
<hr />
<table><thead><th> <b>Path</b> </th><th> <b>Method</b></th></thead><tbody>
<tr><td>/games/XXXXXX </td><td> POST </td></tr></tbody></table>

<b>Request Parameters</b>
<i>Required:</i>
id:<br>
Example:<br />
<table><thead><th> '<a href='http://localhost:3007/rest/games?id=090210'>http://localhost:3007/rest/games?id=090210</a>' </th></thead><tbody>
<i>Optional:</i></tbody></table>

<b>Response</b>
TBD<br>
<br>
<br>
TODO:what details?<br>
TODO:what is the format of the id?<br>
<br>
<hr />
<table><thead><th> <b>Path</b> </th><th> <b>Method</b></th></thead><tbody>
<tr><td>/games/XXXXXX/moves </td><td> GET </td></tr></tbody></table>

<b>Request Parameters</b>
<i>Required:</i>

<i>Optional:</i>

<b>Response</b>
Returns the moves of the game specified by XXXXXX<br>
<table border='1'><tr><td><pre>
{"game":<br>
{<br>
"id":"305710",<br>
"moves": [<br>
{<br>
"moveNum":1,<br>
"player":"X",<br>
"move":"center"<br>
},{<br>
"moveNum":2,<br>
"player":"O",<br>
"move":"upper-left"<br>
},{<br>
"moveNum":3,<br>
"player":"X",<br>
"move":"upper-right"<br>
}<br>
]<br>
}<br>
}<br>
</pre></td></tr></table>
TODO:what details?<br>
TODO:what is the format of the id?<br>
<br>
<hr />
<table><thead><th> <b>Path</b> </th><th> <b>Method</b></th></thead><tbody>
<tr><td>/games/XXXXXX/moves/XX </td><td> POST </td></tr></tbody></table>

<b>Request Parameters</b>
<i>Required:</i>
XX: this is the move number being set<br>
player: Specify the mark of the player taking their turn<br>
move: Specify the location of the move<br>
Example:<br />
<table><thead><th> '<a href='http://localhost:3007/rest/games/090210/moves/4?player='>http://localhost:3007/rest/games/090210/moves/4?player=</a>"O"&move="top-center"' </th></thead><tbody></tbody></table>

<i>Optional:</i>
none<br>
<b>Response</b>
TBD<br>
<br>
TODO:what details?<br>
TODO:what is the format of the id?<br>
<hr />
<table><thead><th> <b>Path</b> </th><th> <b>Method</b></th></thead><tbody>
<tr><td>/players </td><td> GET </td></tr></tbody></table>

<b>Request Parameters</b>
<i>Required:</i>

<i>Optional:</i>

<b>Response</b>
Returns a link to both the 'X' player and the 'O' player<br>
<table border='1'><tr><td><pre>
[{<br>
"player":"X",<br>
"href":"http://localhost:3007/rest/players/X"<br>
},{<br>
"player":"O",<br>
"href":"http://localhost:3007/rest/players/O"<br>
}]<br>
<br>
</pre></td></tr></table>

<hr />
<table><thead><th> <b>Path</b> </th><th> <b>Method</b></th></thead><tbody>
<tr><td>/players/[X|O] </td><td> GET </td></tr></tbody></table>

<b>Request Parameters</b>
<i>Required:</i>

<i>Optional:</i>

<b>Response</b>
Returns details of the registered player specified by XXXXXX<br>
<table border='1'><tr><td><pre>
{"player": [<br>
{<br>
"playerMark":"X",<br>
"gamesPlayed": 40,<br>
"playedGameList": ["10101","13990"...],<br>
"gamesWon": 10,<br>
"wonGameList": ["90210","33822",...],<br>
"gamesLost": 10,<br>
"lostGameList": ["38020","010948",...],<br>
"catGame": 10,<br>
"catGameList": ["39100","94022",...],<br>
"forfietGame": 0,<br>
"forfeitGameList": ["05553","42029",...]<br>
}<br>
]<br>
}<br>
</pre></td></tr></table>
TODO:what details?<br>
TODO:what is the format of the id?