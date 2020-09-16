import * as yargs from 'yargs';
import * as fs from 'fs';
import Robot, { DirectionStringType } from './Robot';

const COMMANDS_MAP: { [key: string]: any } = {
    'PLACE': (commandLine: string) => {
        const splitted = commandLine.split(' ');
        const args: string[] = splitted[1].split(',');
        const x: number = Number(args[0]);
        const y: number = Number(args[1]);
        const facing: DirectionStringType = args[2] as DirectionStringType;

        return (r: Robot) => r.place(x, y, facing);
    },
    'LEFT': (commandLine: string) => (r: Robot) => r.rotateLeft(),
    'RIGHT': (commandLine: string) => (r: Robot) => r.rotateRight(),
    'MOVE': (commandLine: string) => (r: Robot) => r.move(),
    'REPORT': (commandLine: string) => (r: Robot) => r.report(),
};

class CommandsParser {
    commands: ((r: Robot) => void)[];

    constructor() {
        const argv = (yargs as any)
            .option('commandsPath', {
                type: 'path',
                alias: 'c',
                describe: 'path to commands file'
            })
            .help()
            .argv
        const commandsString = fs.readFileSync(argv.commandsPath, 'utf-8');
        
        this.commands = commandsString.split('\n').map(line => {
            const splitted = line.split(' ');
            const command = splitted[0];

            const commandCreator = COMMANDS_MAP[command];
            return commandCreator && commandCreator(line);
        }).filter(Boolean);
    }

    executeCommands(r: Robot) {
        this.commands.forEach(c => {
            c(r)
        });
    }
}

export default CommandsParser;