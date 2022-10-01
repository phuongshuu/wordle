const TIMES_TRY = 6;
const GAME_STATE = {
    START: "START",
    END: "END"
}
class Worldle {
    constructor(words){
        this.dictionay = {};
        let listWord = words.split(",");
        for (let word of listWord) this.dictionay[word.trim()] = 1;
        this.word = "";
    }

    resetTimesTry(){
        this.timesTry = TIMES_TRY;
    }

    generateWord(){
        let keys = Object.keys(this.dictionay);
        if (keys.length <= 0){
            this.endGame();
            return;
        }
        console.log(keys);
        console.log(this.dictionay);
        this.word = keys[Math.floor(Math.random() * keys.length)];
        this.resetTimesTry();
        console.log("Gen: " + this.word);
    }

    guessWord(word){
        if (!this.checkValid(word)){
            return;
        }
        console.log(this.checkCorrect(word));
        if (this.checkCorrect(word)) {
            console.log("Congrats!, Word is " + word);
            this.endGame();
            return;
        }
        this.timesTry --;
        for (let i = 0; i < word.length; i ++){
            let letter = word[i];
            if (!this.checkLetterInWord(letter)) {
                console.log("Letter " + letter + " is not in Word");
                continue;
            }
            if (!this.checkLetterIsCorrectPlace(letter, i)){
                console.log("Letter " + letter + " is in word but not in correct place");
                continue;
            }
            console.log("Letter " + letter + " is in right place");
        }
        if (this.timesTry <= 0){
            console.log("Your are lose!");
            this.endGame();
        }
    }

    startGame(){
        this.state = GAME_STATE.START;
        this.generateWord();
    }

    isEnd(){
        return this.state == GAME_STATE.END;
    }

    endGame(){
        this.state = GAME_STATE.END;
    }

    checkLetterInWord(letter){
        return this.word.indexOf(letter) >= 0;
    }

    checkLetterIsCorrectPlace(letter, idx){
        return this.word[idx] == letter;
    }

    checkCorrect(word){
        return word == this.word;
    }

    checkValid(word){
        if (!this.dictionay[word]) {
            console.log("Word not in dictionay");
            return false;
        }
        return true;
    }

}

function main(){
    const dictionay = prompt("Welcome, Input words in dictionay: ", {});
    if (!dictionay) {
        console.log("Error");
        return;
    }
    console.log("Dictionay: ");
    console.log(dictionay);
    let wordle = new Worldle(dictionay);
    wordle.startGame();
    while (!wordle.isEnd()){
        let timesTry = wordle.timesTry;
        const word = prompt("You have " + timesTry + " times to try, guess word, type c to exit", "");
        if (word ==  "c") break;
        wordle.guessWord(word);
    }
}

main();