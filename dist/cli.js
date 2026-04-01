#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suggest_1 = require("./suggest");
const LANGS = ["ts", "js", "python", "rust", "go", "java", "csharp"];
async function getStdin() {
    if (process.stdin.isTTY)
        return null;
    return new Promise(resolve => {
        let data = "";
        process.stdin.setEncoding("utf8");
        process.stdin.on("data", chunk => (data += chunk));
        process.stdin.on("end", () => resolve(data.trim() || null));
    });
}
async function main() {
    const args = process.argv.slice(2);
    if (args.includes("--help") || args.includes("-h") || args.length === 0) {
        console.log(`
  varname — because naming things is the second hardest problem in computer science
             (the first is your life choices that led you here)

  usage: varname <description> [--lang ts|js|python|rust|go|java|csharp]

  example:
    varname "checks if user is logged in"
    varname "the thing that breaks in prod" --lang python
    echo "i have no idea what this does" | varname
`);
        process.exit(0);
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("\n  GEMINI_API_KEY is not set.");
        console.error("  get a free key: https://aistudio.google.com/app/apikey");
        console.error("  then: export GEMINI_API_KEY=your_key\n");
        process.exit(1);
    }
    let lang = "ts";
    const positional = [];
    for (let i = 0; i < args.length; i++) {
        if (args[i] === "--lang" && args[i + 1]) {
            lang = args[++i];
            if (!LANGS.includes(lang)) {
                console.error(`  invalid lang. options: ${LANGS.join(", ")}`);
                process.exit(1);
            }
        }
        else if (!args[i].startsWith("-")) {
            positional.push(args[i]);
        }
    }
    const stdin = await getStdin();
    const description = stdin ?? positional.join(" ");
    if (!description) {
        console.error("  you need to describe the variable. i know, it's hard. that's why you're here.\n");
        process.exit(1);
    }
    console.log("\n  thinking... (and judging you a little)\n");
    try {
        const names = await (0, suggest_1.suggest)(description, apiKey, lang);
        console.log(`  suggestions for "${description}":\n`);
        for (const name of names)
            console.log(`    ${name}`);
        console.log("\n  good luck. you'll need it.\n");
    }
    catch (err) {
        console.error("  something broke. classic.\n", err);
        process.exit(1);
    }
}
main();
