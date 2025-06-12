import { exit } from "process";
import { CommandsRegistry, handlerLogin, handlerRegister, registerCommand, runCommand } from "./commands";
import { readConfig, setUser } from "./config";

async function main() {
    const registry: CommandsRegistry = {};
    registerCommand(registry, "login", handlerLogin);
    registerCommand(registry, "register", handlerRegister);

    const rawArgs = process.argv;
    const args = rawArgs.slice(2);
    if (args.length < 2) {
        console.log("no arguments were given")
        exit(1);
    }

    const cmdName = args[0];
    const cmdArgs = args.splice(1);

    try {
        await runCommand(registry, cmdName, ...cmdArgs);
    } catch(err) {
        if (err instanceof Error) {
            console.error(`Error running command '${cmdName}': ${err.message}`);
        } else {
            console.error(`Error running command '${cmdName}': ${err}`);
        }
        process.exit(1);
    }

    process.exit(0);
}

main();