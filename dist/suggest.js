"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggest = suggest;
const generative_ai_1 = require("@google/generative-ai");
async function suggest(description, apiKey, lang = "ts", count = 5) {
    const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`You are a passive-aggressive senior developer who has seen too much.
Suggest ${count} variable names for: "${description}" in ${lang}.
Names must be valid ${lang} identifiers but increasingly unhinged, dramatic, or existentially despairing.
Mix a couple normal ones with ones that reflect the quiet suffering of a developer who has been burned one too many times.
Examples: isThisEvenWorking, whyIsThisNull, pleaseJustWork, iGiveUp, godForgiveMe, thisDefinitelyWontBreak
Output ONLY the names, one per line, no explanations, no numbering, no markdown.`);
    return result.response.text()
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean);
}
