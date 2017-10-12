/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var copyBoard = function(board) {
    var newBoard = [];
    var size = board.get('n');
    for (var r = 0; r < size; r++) {
      var row = board.get(r);
      var arr = [];
      for (var c = 0; c < size; c++) {
        arr.push(row[c]);
      }
      newBoard.push(arr);
    }
    return newBoard;
  };
  
  
  
  var solution; //fixme
  var board = new Board({n: n});
  var row = 0;
  var col = 0;
  var flag = false;
  // while loop if row is less than size of the board
  while (row < n) {
    board.get(row, col);
    if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
      solution = copyBoard(board);
    } else {
      board = copyBoard(board);
    }
    console.log(board);
    col++;
    if (col >= n) {
      col = 0;
      row++;
    }
  }
  //function to copy board onto new board
  
  //  // place chess piece on board
  //  // var flag = check for failures on board
  //  // if flag is true
  //    // solution = board
  //  // increment the column
  //  // if column is >= size of board
  //    // set column equal to 0
  //    // increment row by 1
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
