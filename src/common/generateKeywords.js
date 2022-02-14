const createKeywords = (name) => {
  const arrName = [];
  let curName = "";
  name.split("").forEach((letter) => {
    curName += letter;
    arrName.push(curName);
  });
  return arrName;
};

export const generateKeywords = (name = "") => {
  const temp = [];
  const tempName = String(name).toLocaleLowerCase();
  let lastWord = "";
  tempName.split(" ").forEach((e) => {
    temp.push(`${lastWord} ${e}`);
    temp.push(lastWord);
    lastWord = `${lastWord} ${e}`;

    temp.push(...createKeywords(e));
  });
  return temp
    .map((d) => String(d).trim())
    .filter((v, i, arr) => arr.indexOf(v) === i);
};
