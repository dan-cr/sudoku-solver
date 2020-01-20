// 2D Maze Array
const puzzle = [
    [8,6,0,0,2,0,0,0,0],
    [0,0,0,7,0,0,0,5,9],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,6,0,8,0,0],
    [0,4,0,0,0,0,0,0,0],
    [0,0,5,3,0,0,0,0,7],
    [0,0,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,6,0,0],
    [0,0,7,5,0,9,0,0,0]
];

// Get possible cells for a given cell object
function getPossibleValues(puzzle, {row, col}) {

    // Get entire row and column
    let r = getRow(puzzle, row);
    let c = getColumn(puzzle, col);

    // Use a set to retain only unique values from both the combined row and column
    let uniqueValues = [...new Set([...r, ...c])];

    // Return only unique values that are not present within our allowed values
    return [1,2,3,4,5,6,7,8,9].filter(num => {
        return !uniqueValues.includes(num);
    });
}

// Get puzzle row by row index
function getRow(puzzle, row) {
    return puzzle[row];
}

// Get puzzle column by column index
function getColumn(puzzle, column) {
    return puzzle.map(row => {
        return row[column];
    });
}

// Get cell value by current cell object
function getCellValue(puzzle, {row, col}) {
    return puzzle[row][col];
}

// Set cell value
function setCellValue(puzzle, {row, col}, val) {
    puzzle[row][col] = val;
}

// Solve puzzle using a recursive backtracking method
function solveSoduku(puzzle, {row, col}) {

    // Column copy
    let column;

    // Navigate to next row and reset column index
    if (col == puzzle.length) {
        col = 0;
        row++;

        // End of puzzle
        if (row == puzzle.length) {
            return true;
        }
    }
    
    // Skip already filled in cells
    if (getCellValue(puzzle, {row, col}) != 0) {
        column = col + 1;
        return solveSoduku(puzzle, {row, col: column});
    }
    
    for (let value = 1; value <= puzzle.length; value++) {
        if (getPossibleValues(puzzle, {row, col}).includes(value)) {
            setCellValue(puzzle, {row, col}, value);
            column = col + 1;
            if (solveSoduku(puzzle, {row, col:column})) {
                return true;
            }
            setCellValue(puzzle, {row, col}, 0);
        }
    }
    
    return false;
}