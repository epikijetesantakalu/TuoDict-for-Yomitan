import fs from "fs";
import { execSync } from "child_process";

function importData() {
    const termBank = fs.readFileSync("./term_bank_1.json");
    return JSON.parse(termBank);
}

function generateAudioFile(word) {
    const pronunciation = word
            .replace(/\d/g, '$& ')
            .replace(/([snm(ng)])([123])\s(y?[aiueo])/g, (_, p1, p2, p3) => `${p1}${p2} ${p1}${p3}`) //母音の連音
            .replace(/l([123])\s(y?[aiueo])/g, (_, p1, p2) => `ll${p1} l${p2}`) //dark Lにはならない
            .replace(/s([123])\s([xqj])/g, (_, p1, p2) => `x${p1} ${p2}`) //x, q, jの連音
            .replace(/s([123])\sz/g, (_, p1) => `z${p1} z`) //zの連音
            .split(" ").join("");

    execSync(`espeak-ng -vphn ${pronunciation} -w ../phun-audios/wav/${word}.wav`);
    execSync(`ffmpeg -i ../phun-audios/wav/${word}.wav ../phun-audios/mp3/${word}.mp3 -y`);
}

const data = await importData();

for (let i = 0; i < data.length; i++) {
    generateAudioFile(data[i][1]);
}