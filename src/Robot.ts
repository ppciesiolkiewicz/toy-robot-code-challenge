import Direction, { DirectionStringType } from './Direction';

class Robot {
    private tableSize: number;
    private x?: number;
    private y?: number;
    private facing?: Direction;

    constructor(tableSize: number) {
        this.tableSize = tableSize;
        this.x = undefined;
        this.y = undefined;
        this.facing = undefined;
    }

    private isPlaced(): boolean {
        return this.x !== undefined && this.y !== undefined && this.facing !== undefined;
    }

    place(x: number, y: number, facing: DirectionStringType): void {
        if (x >= 0 && y >= 0 && x < this.tableSize && y < this.tableSize) {
            this.x = x;
            this.y = y;
            this.facing = new Direction(facing);
        }
    }

    move(): void {
        if (!this.isPlaced()) {
            return;
        }

        const newX = this.x! + this.facing!.vector[0];
        const newY = this.y! + this.facing!.vector[1];

        if (newX >= 0 && newY >= 0 && newX < this.tableSize && newY < this.tableSize) {
            this.x! = newX;
            this.y! = newY;
        }
    }

    left(): void {
        if (!this.isPlaced()) {
            return;
        }

        this.facing!.left();
    }

    right(): void {
        if (!this.isPlaced()) {
            return;
        }

        this.facing!.right();
    }

    report(): void {
        if (!this.isPlaced()) {
            return;
        }

        console.log(this.x, this.y, `${this.facing}`);
    }
}

export type { DirectionStringType };
export default Robot;
