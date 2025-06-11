import fs from "fs";
import os from "os";
import path from "path";
import { config } from "process";
import { json } from "stream/consumers";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(userName: string): void {
    const cfg = readConfig();
    cfg.currentUserName = userName;

    writeConfig(cfg);
}

export function readConfig(): Config {
    const cfgPath = getConfigFilePath();

    const data = fs.readFileSync(cfgPath, "utf-8");
    const rawConfig = JSON.parse(data);

    return validateConfig(rawConfig);

}

function getConfigFilePath(): string {
    const configFileName = ".gatorconfig.json"
    const cfgPath = path.join(os.homedir(), configFileName);
    return cfgPath;
}

function writeConfig(cfg: Config): void {
    const rawConfig = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };

    const data = JSON.stringify(rawConfig, null, 2);
    fs.writeFileSync(getConfigFilePath(), data, {encoding: "utf8"});
}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("db_url is required in config file");
    }
    if (
        !rawConfig.current_user_name ||
        typeof rawConfig.current_user_name !== "string"
    ) {
        throw new Error("current_user_name is required in config file");
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    }

    return config
}