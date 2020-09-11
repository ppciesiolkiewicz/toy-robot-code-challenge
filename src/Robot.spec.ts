import Robot from './Robot';
import Direction from './Direction';

const expectRobotToBeInInitialState = (robot: any) => {
    expect(robot.x).toBeUndefined();
    expect(robot.y).toBeUndefined();
    expect(robot.facing).toBeUndefined();
};

describe('Robot', () => {
    let robot: any;
    const consoleLogSpy = jest.spyOn(global.console, 'log');

    beforeEach(() => {
        robot = new Robot(5);
    });

    describe('place()', () => {
        describe('When placing robot outside of the table - coordinates smaller than 0', () => {
            it('Should not change the robot coordinates', () => {
                robot.place(-1, -1, 'EAST')
                expectRobotToBeInInitialState(robot);
            });
        });

        describe('When placing robot outside of the table - coordinates bigger than table size', () => {
            it('Should not change the robot coordinates', () => {
                robot.place(5, 5, 'EAST')
                expectRobotToBeInInitialState(robot);
            });
        });

        describe('When placing coordinates are not valid types', () => {
            it('Should not change the robot coordinates', () => {
                robot.place('string', null, 'string')
                expectRobotToBeInInitialState(robot);
            });
        });

        describe('When coordinates are on the table', () => {
            it('Should change the robot coordinates', () => {
                robot.place(4, 0, 'EAST')

                expect(robot.x).toEqual(4);
                expect(robot.y).toEqual(0);
                expect(robot.facing).toEqual(new Direction('EAST'));
            });
        });
    });


    describe('left()', () => {
        describe('When robot is not placed', () => {
            it('Should ignore the command', () => {
                robot.left();
                expectRobotToBeInInitialState(robot);
            });
        });

        const tests = [
            {
                args: [0, 0, 'NORTH'],
                expectedFacing: new Direction('WEST')
            },
            {
                args: [0, 0, 'WEST'],
                expectedFacing: new Direction('SOUTH')
            },
            {
                args: [0, 0, 'SOUTH'],
                expectedFacing: new Direction('EAST')
            },
            {
                args: [0, 0, 'EAST'],
                expectedFacing: new Direction('NORTH')
            }
        ];

        tests.forEach(({ args, expectedFacing }) => {
            describe('When robot is placed', () => {
                beforeEach(() => {
                    robot.place(...args);
                });

                it(`Should rotate from ${args[2]} to ${expectedFacing}`, () => {
                    robot.left();
                    expect(robot.facing).toEqual(expectedFacing);
                });

                it('Should not change robot position', () => {
                    expect(robot.x).toEqual(args[0]);
                    expect(robot.y).toEqual(args[1]);
                });
            });
        });
    });

    describe('right()', () => {
        describe('When robot is not placed', () => {
            it('Should ignore the command', () => {
                robot.right();
                expectRobotToBeInInitialState(robot);
            });
        });

        const tests = [
            {
                args: [0, 0, 'NORTH'],
                expectedFacing: new Direction('EAST')
            },
            {
                args: [0, 0, 'EAST'],
                expectedFacing: new Direction('SOUTH')
            },
            {
                args: [0, 0, 'SOUTH'],
                expectedFacing: new Direction('WEST')
            },
            {
                args: [0, 0, 'WEST'],
                expectedFacing: new Direction('NORTH')
            }
        ];

        tests.forEach(({ args, expectedFacing }) => {
            describe('When robot is placed', () => {
                beforeEach(() => {
                    robot.place(...args);
                });

                it(`Should rotate from ${args[2]} to ${expectedFacing}`, () => {
                    robot.right();
                    expect(robot.facing).toEqual(expectedFacing);
                });

                it('Should not change robot position', () => {
                    expect(robot.x).toEqual(args[0]);
                    expect(robot.y).toEqual(args[1]);
                });
            });
        });
    });

    describe('move()', () => {
        describe('When robot is not placed', () => {
            it('Should ignore the command', () => {
                robot.move();
                expectRobotToBeInInitialState(robot);
            });
        });



        const tests = [
            {
                args: [0, 0, 'NORTH'],
                expectedFacing: new Direction('EAST')
            },
            {
                args: [0, 0, 'EAST'],
                expectedFacing: new Direction('SOUTH')
            },
            {
                args: [0, 0, 'SOUTH'],
                expectedFacing: new Direction('WEST')
            },
            {
                args: [0, 0, 'WEST'],
                expectedFacing: new Direction('NORTH')
            }
        ];

        tests.forEach(({ args, expectedFacing }) => {
            describe('When robot is placed', () => {
                beforeEach(() => {
                    robot.place(...args);
                });

                it(`Should rotate from ${args[2]} to ${expectedFacing}`, () => {
                    robot.right();
                    expect(robot.facing).toEqual(expectedFacing);
                });

                it('Should not change robot position', () => {
                    expect(robot.x).toEqual(args[0]);
                    expect(robot.y).toEqual(args[1]);
                });
            });
        });

    });

    describe('report()', () => {
        describe('When robot is not placed', () => {
            it('Should ignore the command', () => {
                robot.report();
                expectRobotToBeInInitialState(robot);
                expect(consoleLogSpy).not.toHaveBeenCalled();
            });
        });

        describe('When robot is placed', () => {
            it('Should console log current robot position and facing', () => {
                robot.place(0, 1, 'EAST');
                robot.report();
                expect(consoleLogSpy).toHaveBeenCalledWith(0, 1, 'EAST');
            });
        });
    });
});