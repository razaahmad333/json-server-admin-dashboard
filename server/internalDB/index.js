
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')

if(!file){
    console.log("File does not exist")
    fs.writeFile(file, JSON.stringify({}), (err) => {
        if(err){
            console.log(err)
        }
    })
}

const adapter = new JSONFile(file)

const __db = new Low(adapter, {})

export async function __readDatabase(){
    await __db.read()
    return typeof __db.data === "object" ? __db.data : {}
}

export async function __writeDatabase(data){
    await __readDatabase()
    __db.data = data
    await __db.write()
}

export default __db;