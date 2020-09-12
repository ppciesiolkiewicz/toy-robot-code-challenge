import * as yargs from 'yargs';
import * as fs from 'fs';
import Robot, { DirectionStringType } from './Robot';

const COMMANDS_MAP: { [key: string]: any } = {
    'PLACE': (x: number, y: number, facing: DirectionStringType) => (r: Robot) => r.place(x, y, facing),
    'LEFT': (r: Robot) => r.rotateLeft(),
    'RIGHT': (r: Robot) => r.rotateRight(),
    'MOVE': (r: Robot) => r.move(),
    'REPORT': (r: Robot) => r.report(),
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

            if (command === 'PLACE') {
                const args: (string|number)[] = splitted[1].split(',');
                args[0] = Number(args[0]);
                args[1] = Number(args[1]);

                return COMMANDS_MAP[command](...args);
            }

            return COMMANDS_MAP[command];
        }).filter(Boolean);
    }

    executeCommands(r: Robot) {
        this.commands.forEach(c => {
            c(r)
        });
    }
}

export default CommandsParser;