// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var counter = 0;
      var row = this.get(rowIndex);
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++; 
        }
        if (counter > 1) {
          return true;
        }

      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var row = 0;
      var flag = false;
      // Iterate through rows in the array. If row is undefined, that's the end of it.
      while (this.get(row) !== undefined) {
        flag = this.hasRowConflictAt(row);
        // Increment row.
        if (flag) {
          return flag;
        }
        row++;
      } return flag;
      //return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var row = 0;
      var colArr = [];
      var counter = 0;
      while (this.get(row) !== undefined) {
        colArr.push(this.get(row)[colIndex]);
        row++;
      }
      for (var i = 0; i < colArr.length; i++) {
        if (colArr[i] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = 0;
      var flag = false;
      // Iterate through rows in the array. If row is undefined, that's the end of it.
      while (this.get(n) !== undefined) {
        flag = this.hasColConflictAt(n);
        // Increment row.
        if (flag) {
          return flag;
        }
        n++;
      } return flag;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var col = majorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var diag = [];
      var count = 0;
      while (col < this.get('n') && row < this.get('n')) {
        if (col >= 0) {
          diag.push(this.get(row)[col]);
        }
        col++;
        row++;
      }
      for (var i = 0; i < diag.length; i++) {
        if (diag[i] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Get size of board; n defines the max number of columns and rows.
      var size = this.get('n');
      
      // Define the starting column index using a math equation that depends on size.
      // Ex: n = 4, so:
      //
      var index = -size + 1;
      
      // Iterate through possible equations
      while (index < size) {
        if (this.hasMajorDiagonalConflictAt(index)) {
          console.log(true);
          return true;
        }
        index++;
      }
      console.log(false);
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      console.log("starting index: ", minorDiagonalColumnIndexAtFirstRow);
      var col = minorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var diag = [];
      var count = 0;
      while (col >= 0 && row < this.get('n')) {
        if (row >= 0) {
          diag.push(this.get(row)[col]);
        }
        col--;
        row++;
        
      }
      for (var i = 0; i < diag.length; i++) {
        if (diag[i] === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // Get size of board; n defines the max number of columns and rows.
      var size = this.get('n');
      
      // Define the starting column index using a math equation that depends on size.
      // Ex: n = 4, so:
      var maxIndex = size * 2 - 1;
      var index = maxIndex;
      
      // Iterate through possible equations
      while (index > 0) {
        if (this.hasMinorDiagonalConflictAt(index)) {
          console.log(true);
          return true;
        }
        index--;
      }
      console.log(false);
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
