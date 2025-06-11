import { setUser } from "./config";

type CommandHandler = (cmdName: string, ...args: string[]) => void;

export function handlerLogin(cmdName: string, ...args: string[]): void {
    if (args.length !== 1) {
        throw new Error("login usage:\nlogin <username>");
    }

    const userName = args[0];
    setUser(userName);
    console.log(`User ${userName} has been set!`);
}

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
    const cmd = registry[cmdName];
    if (cmd === undefined) {
        throw new Error(`no function called ${cmdName} is registered`);
    }
    registry[cmdName](cmdName, ...args);
}