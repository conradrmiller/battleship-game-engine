import GAME_ENGINE_CONSTANTS from './GAME_ENGINE_CONSTANTS';

/* 
To add a boat to the board
Need to pick an initial xy
Pick a direction
Generate and array of coordinates in the direction
Validate 
 -> if false re-try

should use a do ... while loop

*/

const getRandomXY = (): number[] => {
    return [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)];
};

const pickADirection = (): string => {
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            return GAME_ENGINE_CONSTANTS.UP;
        case 1:
            return GAME_ENGINE_CONSTANTS.DOWN;
        case 2:
            return GAME_ENGINE_CONSTANTS.LEFT;
        case 3:
            return GAME_ENGINE_CONSTANTS.RIGHT;
        default:
            return '';
    }
};

const validatePlacement = (coordinates: number[][], board: string[][]) => {
    const filtered = coordinates.filter((el) => {
        return (
            board[el[1]] &&
            board[el[1]][el[0]] &&
            board[el[1]][el[0]] === GAME_ENGINE_CONSTANTS.EMPTY
        );
    });
    console.log({ filtered });

    return coordinates.length === filtered.length;
};

const getCoordinateList = (length: number, board: string[][]): number[][] => {
    let coordinateList: number[][] = [];

    do {
        coordinateList = [];
        let xy = getRandomXY();
        let direction = pickADirection();
        coordinateList.push(xy);

        for (let i = 1; i < length; i++) {
            let previous = coordinateList[i - 1];
            switch (direction) {
                case GAME_ENGINE_CONSTANTS.UP:
                    coordinateList.push([previous[0] - 1, previous[1]]);
                    break;
                case GAME_ENGINE_CONSTANTS.DOWN:
                    coordinateList.push([previous[0] + 1, previous[1]]);
                    break;
                case GAME_ENGINE_CONSTANTS.LEFT:
                    coordinateList.push([previous[0], previous[1] - 1]);
                    break;
                case GAME_ENGINE_CONSTANTS.RIGHT:
                    coordinateList.push([previous[0], previous[1] + 1]);
                    break;
            }
        }
    } while (!validatePlacement(coordinateList, board));

    return coordinateList;
};

const placeDestroyer = (board: string[][]) => {
    const coordinates = getCoordinateList(2, board);
    coordinates.forEach((el) => {
        board[el[1]][el[0]] = GAME_ENGINE_CONSTANTS.DESTROYER;
    });
    console.log(coordinates);
};
const placeCruiser = (board: string[][]) => {
    const coordinates = getCoordinateList(3, board);
    coordinates.forEach((el) => {
        board[el[1]][el[0]] = GAME_ENGINE_CONSTANTS.CRUISER;
    });
    console.log(coordinates);
};
const placeBattleship = (board: string[][]) => {
    const coordinates = getCoordinateList(4, board);
    coordinates.forEach((el) => {
        board[el[1]][el[0]] = GAME_ENGINE_CONSTANTS.BATTLESHIP;
    });
    console.log(coordinates);
};

const createGameBoard = (): string[][] => {
    const gameBoard: string[][] = [];

    // Set up the empty Game Board
    for (let i = 0; i < 8; i++) {
        const tempArr = [];
        for (let j = 0; j < 8; j++) {
            tempArr.push(GAME_ENGINE_CONSTANTS.EMPTY);
        }
        gameBoard.push(tempArr);
    }

    placeDestroyer(gameBoard);
    placeCruiser(gameBoard);
    placeBattleship(gameBoard);

    return gameBoard;
};

const startGame = (): string[][] => {
    console.log('startGame');
    return createGameBoard();
};

const shoot = (x: number, y: number): void => {
    // console.log('shoot', x, y);
};

export { startGame, shoot };
