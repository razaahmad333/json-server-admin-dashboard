import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import dotenv from 'dotenv'

dotenv.config()

const file = process.env.DB_FILE_ABS_PATH;

const adapter = new JSONFile(file)

const db = new Low(adapter, {})

try{
    await db.read()
} catch (err) {
    console.log(err)
}


export { db };