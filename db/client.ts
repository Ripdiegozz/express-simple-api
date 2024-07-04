import * as sql3 from "sqlite3"

const db = new sql3.Database('./db.sql')

export default db;
