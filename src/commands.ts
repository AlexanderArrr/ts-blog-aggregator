import { setUser } from "./config";
import { createUser, getUser } from "./lib/db/queries/users";

type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("login usage:\nlogin <username>");
    };

    const userName = args[0];

    const user = await getUser(userName);
    if (!user) {
        throw new Error(`user ${userName} does not exist`);
    }

    setUser(userName);
    console.log(`User ${userName} has been set!`);
};

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length != 1) {
        throw new Error("register usage:\nregister <username>");
    };

    const userName = args[0];
    const user = await createUser(userName);
    if (!user) {
        throw new Error("user already exists");
    };

    setUser(userName);
    console.log(`User ${userName} was created:`);
    console.log(user);
};

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