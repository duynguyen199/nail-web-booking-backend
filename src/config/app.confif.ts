export class AppConfig {
    static get graceMinutes(): number {
    return parseInt(process.env.GRACE_MINUTES || '10', 10);
    }
    }