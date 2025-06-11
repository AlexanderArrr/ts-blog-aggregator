import { exit } from "process";
import { CommandsRegistry, handlerLogin, registerCommand, runCommand } from "./commands";
import { readConfig, setUser } from "./config";

function main() {
    const registry: CommandsRegistry = {};

    registerCommands(registry);

    const rawArgs = process.argv;
    const args = rawArgs.slice(2);
    if (args.length < 2) {
        console.log("no arguments were given")
        exit(1);
    }

    const cmdName = args[0];
    const cmdArgs = args.splice(1);

    runCommand(registry, cmdName, ...cmdArgs);
}

function registerCommands(registry: CommandsRegistry) {
    registerCommand(registry, "login", handlerLogin);
}

main();