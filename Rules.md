# Rules for Ultimate Tic-Tac-Toe #

## Introduction ##
Ultimate TicTacToe is essentially many games being played simultaneously. There are individual games of tictactoe within a larger tictactoe board. You win the larger tictactoe space when you win the smaller tictactoe game. The trick is that your next move is limited by your opponent's last move.

## Goal ##
Get 3 squares in a row, either diagonally, horizontally or vertically in the larger tictactoe board.

## Setting Up the Game Board ##
The standard tictactoe board is the same shape as the pound sign "#". There are two vertical lines crossed by two horizontal lines. These separate the playing area into nine areas (known as 'squares'), upper-left, top center, upper-right, center left, center, center right, lower-left, bottom center, and lower-right.

Inside each of these squares is another, but smaller tictactoe board.
<pre>
# | # | #<br>
-----------<br>
# | # | #<br>
-----------<br>
# | # | #<br>
</pre>


## Gameplay ##
### First Move ###
A player is randomly chosen to play first. That player can choose any square in any of the 'smaller' tictactoe boards to put their mark. Make a note of which square was played for the next player.

The first player will use an 'X' to claim their squares within the smaller games and the second player will use an 'O' to claim their squares.

### Regular Move ###
The player must choose the square in the 'larger' tictactoe board that corresponds to the same square relative to where the previous move was made in the 'smaller' tictactoe board. Within that 'larger' square, that player will mark one square within that larger square's tictactoe board.

For example, the previous player chose from the 'larger' tictactoe board, the center square to make their move. In the 'smaller' tictactoe board, they chose the upper-right corner. That limits the current player to the upper-right square from the larger tictactoe board to make their move. Within the upper-right square of the larger board is where the current player must put their mark. That mark is used to determine where the next player will play.

### Out of Play ###
Eventually, one of the smaller tictactoe games will be won by one of the players (or will be a draw). When this happens, the larger square is 'out of play'. Additionally, a mark is put on that larger square to indicate that it is either won by player 'X' or 'O' or that it was a draw. This is marked by a '-'.

### Moving when your tictactoe board is out of play ###
If, based on the prior move, the next move is in a square that is 'out of play', then the next move can be made in any square that is not 'out of play'

## Winning ##
When the winner of larger squares form a winning move with respect to the larger tictactoe board, the game is over.

(need image samples)