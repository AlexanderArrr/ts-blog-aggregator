import { readConfig, setUser } from "./config";

function main() {
    setUser("Alex");
    console.log(readConfig());
}

main();