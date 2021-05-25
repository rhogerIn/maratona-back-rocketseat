const Database = require('./config');


const initDb = {
    async  initDb(){
        const db = await Database(); // await para que o código só prossiga, quando a conexão for finalizada.

        await db.exec(`CREATE TABLE profile (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            avatar TEXT,
                            monthly_budget INT,
                            days_per_week INT,
                            hours_per_day INT,
                            vacation_per_year INT,
                            value_hour INT
                        )`);

        await db.exec(`CREATE TABLE jobs (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            daily_hours INT,
                            total_hours INT,
                            created_at DATETIME
                        )`);

        await db.run(`INSERT INTO profile (name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour)
              VALUES(
                  "Warden",
                  "https://avatars.githubusercontent.com/u/67068084?v=4",
                  3000,
                  5,
                  5,
                  4,
                  70
              )`);

        await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, created_at)
              VALUES(
                  "Gran",
                  2,
                  1,
                  1617514376018
              )`);

        await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, created_at)
              VALUES(
                  "Fintech",
                  3,
                  24,
                  1617514376018
              )`);

        await db.close();
    }
}

initDb.initDb();