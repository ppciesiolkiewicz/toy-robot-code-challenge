import * as fs from 'fs';
import Robot from './Robot';
import CommandsParser from './CommandsParser';

jest.mock('./Robot');
jest.mock('fs');
jest.mock('yargs', () => ({
    option: () => ({
        help: () => ({
            argv: {
                commandsPath: 'commandsPath'
            }
        })
    })
}));

const fsMock: any = fs;


describe('CommandsParser', () => {
    let commandsParser: any;
    const readFileSyncMock = jest.fn();

    beforeAll(() => {
        fsMock.readFileSync.mockImplementation(readFileSyncMock);
    });

    describe('When commands are correct', () => {
        const tests = [
            {
                comamndsString: 'PLACE 1,2,NORTH',
                expectRobotWasActioned: (robot: Robot) => expect(robot.place).toHaveBeenCalledWith(1, 2, 'NORTH'),
            },
            {
                comamndsString: 'LEFT',
                expectRobotWasActioned: (robot: Robot) => expect(robot.left).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'LEFT   SOMETHING SOMETHING',
                expectRobotWasActioned: (robot: Robot) => expect(robot.left).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'RIGHT',
                expectRobotWasActioned: (robot: Robot) => expect(robot.right).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'RIGHT 2 5',
                expectRobotWasActioned: (robot: Robot) => expect(robot.right).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'REPORT',
                expectRobotWasActioned: (robot: Robot) => expect(robot.report).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'MOVE',
                expectRobotWasActioned: (robot: Robot) => expect(robot.move).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'PLACE 1,2,NORTH\nLEFT\nRIGHT\nREPORT\nMOVE',
                expectRobotWasActioned: (robot: Robot) => {
                    expect(robot.place).toHaveBeenCalledWith(1, 2, 'NORTH'),
                    expect(robot.left).toHaveBeenCalledTimes(1)
                    expect(robot.right).toHaveBeenCalledTimes(1)
                    expect(robot.report).toHaveBeenCalledTimes(1)
                    expect(robot.move).toHaveBeenCalledTimes(1)
                },
            },
            {
                comamndsString: 'PLACE 1,2,NORTH\nINVALID  \n NOT VALID \n @22y21321 \nLEFT\n LEFT',
                expectRobotWasActioned: (robot: Robot) => {
                    expect(robot.place).toHaveBeenCalledWith(1, 2, 'NORTH'),
                    expect(robot.left).toHaveBeenCalledTimes(1)
                },
            }
        ];

        tests.forEach(({ comamndsString, expectRobotWasActioned }) => {
            it(`Should execute correct robot commands for:\n ${comamndsString}`, () => {
                readFileSyncMock.mockReturnValue(comamndsString);
                const robot = new Robot(5);
                commandsParser = new CommandsParser();
    
                commandsParser.executeCommands(robot);
                expectRobotWasActioned(robot);
            });
        });
    });
});