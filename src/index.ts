import Robot from './Robot';
import CommandsParser from './CommandsParser';

const WORLD_SIZE = 5;
const r = new Robot(WORLD_SIZE);
const cp = new CommandsParser();
cp.executeCommands(r);