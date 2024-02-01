import { createServer } from "http";
import * as cron from 'node-cron';
import app from "./app";
import initializeDb from "./db";
import batteryLevelChecker from "@dm/dal/cron/batteryLevelChecker";
import manageBatteryLevel from "@dm/dal/cron/manageBatteryLevel";
import { config } from "@config";


initializeDb()

const server = createServer(app);
const port = 4000;

cron.schedule(config.cron.manageBatteryLevel, manageBatteryLevel);
cron.schedule(config.cron.batteryLevelChecker, batteryLevelChecker);

server.listen(port, () => {

    console.log(`App listening on port ${port}`);
});
