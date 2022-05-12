#!/usr/bin/env node

// Import Modules
const fs = require("fs")
const request = require("request")
const readline = require("readline")

const rl = readline.createInterface(process.stdin, process.stdout)

// Process CMD
const args = process.argv.slice(2)
const version = args[0]
let url: String

if (version) url = `https://cdn.jsdelivr.net/npm/paml@${version}`
else url = `https://cdn.jsdelivr.net/npm/paml`

request(url, (err: Error, [], body: String) => {
    if (err) throw err

    let fileName: String
    if (version) fileName = `paml@${version}.min.js`
    else fileName = `paml.min.js`

    if (fs.existsSync(fileName)) {
        rl.question(`File ${fileName} already exists in this directory. Are you sure you want to overwrite this file?\n(Y/N) `, (answer: String) => {
            answer = answer.toLowerCase()
            if (answer === "y" || answer === "yes" || answer === "ye") {
                if (body.startsWith("Failed")) {
                    console.log(`Version ${version} doesn't exist.`)
                    rl.close()
                } else {
                    fs.writeFile(fileName, body, (err: Error) => {
                        if (err) throw err
                    })
                    console.log("Created new PAML file.")
                    rl.close()
                }
            } else {
                console.log("Aborted.")
                rl.close()
            }
        })
    } else {
        if (body.startsWith("Failed")) {
            console.log(`Version ${version} doesn't exist.`)
            rl.close()
        } else {
            fs.writeFile(fileName, body, (err: Error) => {
                if (err) throw err
            })
            console.log("Created new PAML file.")
            rl.close()
        }
    }
})
