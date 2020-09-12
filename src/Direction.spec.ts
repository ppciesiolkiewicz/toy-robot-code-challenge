import Direction, { DirectionStringType } from './Direction';


describe('Direction', () => {
    let direction: any;

    describe('constructor()', () => {
        describe('When direction is valid', () => {
            const tests: { initialDirection: DirectionStringType, expectedVector: [number, number] }[] = [
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
                    direction = new Direction(initialDirection);

                    expect(direction.vector).toEqual(expectedVector);
                });
            });
        });

        describe('When direction is invalid', () => {
            it('Should throw an error', () => {
                // @ts-ignore
                expect(() => new Direction('INVALID')).toThrow(/Invalid direction provided/);
            });

            it('Should throw an error', () => {
                // @ts-ignore
                expect(() => new Direction(undefined)).toThrow(/Invalid direction provided/);
            });
        });
    });

    describe('rotateLeft()', () => {
        const tests: { initialDirection: DirectionStringType, expectedDirection: Direction }[] = [
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
                direction = new Direction(initialDirection);

                direction.rotateLeft();
                expect(direction).toEqual(expectedDirection);
            });
        });
    });

    describe('rotateRight()', () => {
        const tests: { initialDirection: DirectionStringType, expectedDirection: Direction }[] = [
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
                direction = new Direction(initialDirection);

                direction.rotateRight();
                expect(direction).toEqual(expectedDirection);
            });
        });
    });

    describe('toString()', () => {
        const tests: DirectionStringType[] = [
            'NORTH', 'EAST', 'WEST', 'SOUTH'
        ];

        tests.forEach(directionString => {
            it(`Should return rotateRight string for ${directionString}`, () => {
                direction = new Direction(directionString);

                expect(direction.toString()).toEqual(directionString);
                expect(`${direction}`).toEqual(directionString);
            });
        });
    });
});
