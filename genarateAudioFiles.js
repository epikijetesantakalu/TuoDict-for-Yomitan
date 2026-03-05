import fs from "fs";
import { execSync } from "child_process";

function importData() {
    const termBank = fs.readFileSync("./term_bank_1.json");
    return JSON.parse(termBank);
}

function generateAudioFile(pronunciation) {
    execSync(`espeak-ng -vphn ${pronunciation} -w ../phun-audios/wav/${pronunciation}.wav`);
    execSync(`ffmpeg -i ../phun-audios/wav/${pronunciation}.wav ../phun-audios/mp3/${pronunciation}.mp3 -y`);
}

const data = await importData();

for (let i = 0; i < data.length; i++) {
    generateAudioFile(data[i][1]);
}