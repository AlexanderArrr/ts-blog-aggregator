import { setUser } from "../config";
import { createUser, getUser, resetUsers } from "../lib/db/queries/users";

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

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void> {
    await resetUsers();
    console.log("The table 'users' has been successfully reset!");
}