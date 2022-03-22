function l(length = 50) {
  console.log("-".repeat(length));
}
l();
l();

const path = `${__dirname}\\src\\assets\\i18n`;

const en = require(`${path}\\en`);
const tr = require(`${path}\\tr`);

const k = Object.keys;

const enKeys = k(en);
const trKeys = k(tr);

console.log("en => ", enKeys.length);
console.log("tr => ", trKeys.length);
l();

const missingEnKeys = enKeys.filter(k => trKeys.includes(k) === false);
const missingTrKeys = trKeys.filter(k => enKeys.includes(k) === false);

console.log("missing en keys in tr => ", missingEnKeys.length);
console.log("missing tr keys in en => ", missingTrKeys.length);

l();
console.log("🍕  working on generate new files");
const newEn = { ...en };
const newTr = {};
// setup new english file base on en and include missing keys

if (missingTrKeys.length > 0) {
  for (const key of missingTrKeys) {
    newEn[key] = "*****";
  }
}

const newEnKeys = k(newEn);

for (const key of newEnKeys) {
  newTr[key] = tr[key] || "*****";
}

console.log("new en file key length =>", newEnKeys.length);
console.log("new tr file key length =>", k(newTr).length);

l();
const fs = require("fs");
console.log("💾  save en file..");
fs.writeFileSync(path + "\\en.json", JSON.stringify(newEn));

console.log("💾  save tr file..");
fs.writeFileSync(path + "\\tr.json", JSON.stringify(newTr));
