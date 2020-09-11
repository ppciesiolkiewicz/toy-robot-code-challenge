import Direction from './Direction';


describe('Direction', () => {
    let direction: any;

    describe('constructor()', () => {
        const tests = [
            {
                initialDirection: 'NORTH',
                expectedVector: [0, 1]
            },
            {
                initialDirection: 'WEST',
                expectedVector: [-1, 0]
            },
            {
                initialDirection: 'SOUTH',
                expectedVector: [0, -1]
            },
            {
                initialDirection: 'EAST',
                expectedVector: [1, 0]
            }
        ];

        tests.forEach(({ initialDirection, expectedVector }) => {
            it(`Should have ${expectedVector} vector for ${initialDirection}`, () => {
                // @ts-ignore
                direction = new Direction(initialDirection);

                expect(direction.vector).toEqual(expectedVector);
            });
        });
    });

    describe('left()', () => {
        const tests = [
            {
                initialDirection: 'NORTH',
                expectedDirection: new Direction('WEST')
            },
            {
                initialDirection: 'WEST',
                expectedDirection: new Direction('SOUTH')
            },
            {
                initialDirection: 'SOUTH',
                expectedDirection: new Direction('EAST')
            },
            {
                initialDirection: 'EAST',
                expectedDirection: new Direction('NORTH')
            }
        ];

        tests.forEach(({ initialDirection, expectedDirection }) => {
            it(`Should rotate from ${initialDirection} to ${expectedDirection}`, () => {
                // @ts-ignore
                direction = new Direction(initialDirection);

                direction.left();
                expect(direction).toEqual(expectedDirection);
            });
        });
    });

    describe('right()', () => {
        const tests = [
            {
                initialDirection: 'NORTH',
                expectedDirection: new Direction('EAST')
            },
            {
                initialDirection: 'EAST',
                expectedDirection: new Direction('SOUTH')
            },
            {
                initialDirection: 'SOUTH',
                expectedDirection: new Direction('WEST')
            },
            {
                initialDirection: 'WEST',
                expectedDirection: new Direction('NORTH')
            }
        ];

        tests.forEach(({ initialDirection, expectedDirection }) => {
            it(`Should rotate from ${initialDirection} to ${expectedDirection}`, () => {
                // @ts-ignore
                direction = new Direction(initialDirection);

                direction.right();
                expect(direction).toEqual(expectedDirection);
            });
        });
    });

    describe('toString()', () => {
        const tests = [
            'NORTH', 'EAST', 'WEST', 'SOUTH'
        ];

        tests.forEach(directionString => {
            it(`Should return right string for ${directionString}`, () => {
                // @ts-ignore
                direction = new Direction(directionString);

                expect(direction.toString()).toEqual(directionString);
                expect(`${direction}`).toEqual(directionString);
            });
        });
    });
});
