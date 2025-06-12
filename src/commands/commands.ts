import { setUser } from "../config";
import { createUser, getUser } from "../lib/db/queries/users";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]): Promise<void> {
    const cmd = registry[cmdName];
    if (cmd === undefined) {
        throw new Error(`no function called ${cmdName} is registered`);
    }
    await registry[cmdName](cmdName, ...args);
}