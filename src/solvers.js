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
  var size = n;
  var currentBoard = new Board({n: size});
  var solutionBoard;
  var row = 0;
  var col = 0;
  var flag = false;

  // Take board object and return the matrix
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
  
  var displayBoard = function(matrix, k) {
    var boardString = '';
    console.log('\nBOARD:');
    console.log('Size: ', k);
    for (var i = 0; i < k; i++) {
      for (var j = 0; j < k; j++) {
        boardString += matrix[i][j] + ' ';
      }
      boardString += '\n';
    }
    console.log(boardString + '\n');
  };
  
  // As long as the row is less than the size...
  while (row < n) {

    // ... Toggle a chess piece on the board.
    currentBoard.togglePiece(row, col);

    // Check for row failures and column failures after placing the piece.
    var hasNoRowConflicts = !currentBoard.hasAnyRowConflicts();
    var hasNoColConflicts = !currentBoard.hasAnyColConflicts();
    
    if (hasNoRowConflicts && hasNoColConflicts) {
      solutionBoard = new Board(copyBoard(currentBoard));
    } else {
      currentBoard = new Board(copyBoard(solutionBoard));
    }

    // If there are NO FAILURES:
    //  ... make the current OBJECT board the solution OBJECT board by creating
    //  a new solution OBJECT board
    //  solutionBoard = currentBoard.
    // Otherwise...
    //  ... currentBoard = solutionBoard.

    col++;
    if (col >= n) {
      col = 0;
      row++;
    }
  } 
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionBoard));
  return copyBoard(solutionBoard);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  total = 1;
  for (var i = 1; i <= n; i++) {
    total *= i;
  }
  return total;
  // var solutionCount = 0;
  // var size = n;

  // var solutionHolder = [];
  // var row = 0;
  // var col = 0;
  // var flag = false;
  // console.log("My size is...", size);

  // // Take board object and return the matrix
  // var copyBoard = function(board) {
  //   var newBoard = [];
  //   var size = board.get('n');
  //   for (var r = 0; r < size; r++) {
  //     var row = board.get(r);
  //     var arr = [];
  //     for (var c = 0; c < size; c++) {
  //       arr.push(row[c]);
  //     }
  //     newBoard.push(arr);
  //   }
  //   return newBoard;
  // };

  // var displayBoard = function(matrix, k) {
  //   var boardString = '';
  //   console.log('BOARD:');
  //   console.log('Size: ', k);
  //   for (var i = 0; i < k; i++) {
  //     for (var j = 0; j < k; j++) {
  //       boardString += matrix[i][j] + ' ';
  //     }
  //     boardString += '\n';
  //   }
  //   console.log(boardString + '\n');
  //   return boardString;
  // };
  
  // // Check for duplicates within the solution array
  // var removeSolutionHolderDuplicates = function(solutionHolder) {
  //   loop1:
  //   for (var cursor = 0; cursor < solutionHolder.length; cursor++) {
  //     loop2:
  //     for (var matrix = 0; matrix < solutionHolder.length; matrix++) {
  //       // If cursor is on one matrix but then we're selecting another 
  //       if (cursor === matrix) {
  //         continue;
  //       } 
  //       flag = true;
  //       loop3:
  //       // Loop through rows.
  //       for (var row = 0; row < solutionHolder[matrix].length; row++) { 
  //         loop4:
  //         for (var element = 0; element < solutionHolder[matrix][row].length; element++) {
  //           if (solutionHolder[cursor][row][element] !== solutionHolder[matrix][row][element]) {
  //             flag = false;
  //             debugger;
  //             break loop3;
  //           }
  //         }
  //       }
  //       if (flag === true) {
  //         console.log(JSON.stringify(solutionHolder[cursor]));
  //         console.log(JSON.stringify(solutionHolder[matrix]));
  //         // remove duplicate array here
  //         solutionHolder.splice(matrix, 1);
  //         console.log(JSON.stringify(solutionHolder));
  //       }
  //       console.log("Solution holder's length now: " + solutionHolder.length);
  //     }
  //   }
  //   return solutionHolder;
  // };
  
  
  
  // // This for loop goes over every possible solution on the board.
  // for (var i = 0; i < size * size; i++) {
    
  //   // Defines board variables...
  //   var currentBoard = new Board({n: size});
  //   var solutionBoard;
    
  //   // As long as the row is less than the size...
  //   console.log('row: ', row, ' col :', col);
    
  //   var rowIteration = 0;
  //   col = i % size;
    
  //   while (rowIteration < size) {
  //     // ... Toggle a chess piece on the board.
  //     currentBoard.togglePiece(row, col);

  //     // Check for row failures and column failures after placing the piece.
  //     var hasNoRowConflicts = !currentBoard.hasAnyRowConflicts();
  //     var hasNoColConflicts = !currentBoard.hasAnyColConflicts();
      
  //     if (hasNoRowConflicts && hasNoColConflicts) {
  //       // Copy new board onto solution board because it rocks
  //       solutionBoard = new Board(copyBoard(currentBoard));
  //     } else {
  //       // Reset current board back to saved solution board because current board sux
  //       currentBoard = new Board(copyBoard(solutionBoard));
  //     }
      
  //     // Add column 
  //     col++;
      
  //     // Reset column if greater than or equal to size and increment row.
  //     if (col >= n) {
  //       col = 0;
  //       row++;
  //       rowIteration++;
  //     }
  //     if (row >= n) {
  //       row = size % row;
        
  //     }
  //   } // END OF WHILE LOOP
  //   rowIteration = 0;
  //   // Reset row count to 0
    
  //   // Display the solution board
  //   var boardView = displayBoard(copyBoard(solutionBoard), size);
  //   boardView;
  //   // Increment the solutions.
  //   solutionHolder.push(copyBoard(solutionBoard));
  //   console.log("All of the solutions for size " + size + ": " + solutionHolder);
  // }
  // solutionHolder = removeSolutionHolderDuplicates(solutionHolder);
  // solutionCount = solutionHolder.length;
  // console.log("New solution holder: " + solutionHolder);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // console.log(solutionHolder);
  // return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  return "no solution";
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  
  // Takes board and returns its matrix.
  var translateBoardToMatrix = function(board) {
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
  
  // Sees if there are conflics on the board.
  var hasQueenConflicts = function(board) {
    var hasNoColConflicts = !board.hasAnyColConflicts();
    var hasNoRowConflicts = !board.hasAnyRowConflicts();
    var hasNoMajorDiagonalConflicts = !board.hasAnyMajorDiagonalConflicts();
    var hasNoMinorDiagonalConflicts = !board.hasAnyMinorDiagonalConflicts();
    if (hasNoColConflicts && hasNoRowConflicts && hasNoMajorDiagonalConflicts && hasNoMinorDiagonalConflicts) {
      return false;
    } else {
      return true;
    }
  }
  
  // remove
  n = 3;
  // remove
  
  // Holds solution variables.
  var solutionHolder = [];
  var solutionCount;
  
  // Get board properties.
  var currentBoard = new Board({n: n});
  var size = n;
  var numOfElements = size * size;
  
  // Recursive function.
  var goThroughSolutionTree = function(previousBoard) {
    // Set row and column equal to 0.
    var row = 0;
    var col = 0;
    
    // Grab matrix from previous board so you can read it.
    var boardMatrix = translateBoardToMatrix(previousBoard);
    
    // Create new board so you don't mutate original.
    var board = new Board(boardMatrix);
    debugger;
    // Iterate through elements on the board.
    for (var element = 0; element < numOfElements; element++) {
      debugger;
      var conflicts = false;
      if (boardMatrix[row][col] === 0) {
        debugger;
        // Toggle piece.
        board.togglePiece(row, col);
        // Check for conflicts after placing piece on board.
        conflicts = hasQueenConflicts(board);
        if (!conflicts) {
          debugger;
          // Create new board.
          var boardMatrix = translateBoardToMatrix(board);
          var newBoard = new Board(boardMatrix);
          // Recurse through function with new board possibility.
          goThroughSolutionTree(newBoard);
        } else if (boardMatrix[row][col] === 1) {
          
          board.togglePiece(row, col);
        }
      }  
      // Add to column.
      col++;
      // Reset column and row.
      // This if statement moves to next line on matrix.
      if (col % size === 0) {
        col = 0;
        row++;
      }
    }
    console.log(translateBoardToMatrix(board));
    solutionHolder.push(translateBoardToMatrix(board));
  };
  
  // Set initial piece at top left corner and enter recursive tree.
  currentBoard.togglePiece(0, 0);
  goThroughSolutionTree(currentBoard);
  console.log(JSON.stringify(solutionCount));
  solutionCount = solutionHolder.length;
  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  //return solutionCount;
  return solutionCount;
};
