import 'dotenv/config';

export const config = {
    db: {
        username: process.env.db_username,
        password: process.env.db_password,
        host: process.env.db_host,
        port: Number(process.env.db_port),
        name: process.env.db_name,
    },
    cron: {
        manageBatteryLevel: process.env.MANAGE_BATTERY_LEVEL_SCHEDULE!,
        batteryLevelChecker: process.env.BATTERY_LEVEL_CHECKER_SCHEDULE!,
    }
};