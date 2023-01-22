const keywordList = ["Friend","Space","Sunshine","Present","Smile",
"Love","Tomorrow","Nourish","Ball","Cost",
"Winter","Beauty","Rain","Happiness","Camp",
"Direction","Age","Friday","Royal","Hunger","Loss",
"Tree","Mirror","Empty","Money","Hair",
"Inspire","Door","Excess","Luck","Intelligence",
"Gratitude","Water","Beginning","Responsibility","Animal",
"Country","Assignment","Special","Mystery","Hero",
"Dreaming","Boredom","News","Rebel","Glitter"
,"Blue","Parents","Train","Candle"]


function getPromptWord(max) {
    var randNum = Math.floor(Math.random() * max);
    return keywordList[randNum-1];
}

console.log(getPromptWord(keywordList.length))

