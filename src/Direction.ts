enum DIRECTION {
    NORTH = 0,
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
};

const VECTOR_MAP: { [key: number]: [number, number] } = {
    0: [0, 1],
    1: [1, 0],
    2: [0, -1],
    3: [-1, 0],
};

export type DirectionStringType = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

class Direction {
    direction: DIRECTION;
    vector: [number, number];

    constructor(direction: DirectionStringType) {
        if (!Object.keys(DIRECTION).includes(direction)) {
            throw new Error('Invalid direction provided');
        }

        this.direction = DIRECTION[direction];
        this.vector = VECTOR_MAP[this.direction];
    }

    rotateLeft() {
        this.direction = (this.direction - 1) === -1 ? DIRECTION.WEST : this.direction! - 1;
        this.vector = VECTOR_MAP[this.direction];
    }


    rotateRight() {
        this.direction = (this.direction + 1) % (Object.keys(DIRECTION).length / 2);
        this.vector = VECTOR_MAP[this.direction];
    }

    toString() {
        return DIRECTION[this.direction];
    }
}

export default Direction;