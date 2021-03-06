const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');
const invert = require('lodash/invert');
const britishToAmericanSpelling = invert(americanToBritishSpelling);
const britishToAmericanTitles = invert(americanToBritishTitles);

class Translator {
    translate(text, locale, highlight=false) {
        let translation = [];
        let textArray = text.split(' ');
        for (let i = 0; i < textArray.length; i++) {
            const currWord = textArray[i];
            let punctuation = currWord.match(/[.,!?]$/g);
            let translatedWord = this.processWord(currWord, locale);
            if (translatedWord) {
                if(i === 0) translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
                if (this.isTitle(currWord, locale)) translation.push(highlight ? this.wrap(translatedWord) : translatedWord);
                else if (punctuation) translation.push((highlight ? this.wrap(translatedWord) : translatedWord) + punctuation[0]);
                else translation.push(highlight ? this.wrap(translatedWord) : translatedWord);
                continue;
            }
            let j = i + 1;
            let currJoinedWords = [textArray[i]];
            let translatable = false;
            let latestJoinedWord;
            let k;
            while(j < i + 4 && j < textArray.length) {
                currJoinedWords.push(textArray[j]);
                let joinedWords = this.processWord(currJoinedWords.join(' '), locale);
                if (joinedWords) {
                    latestJoinedWord = joinedWords;
                    k = j;
                }
                j++;
            }
            if (latestJoinedWord) {
                const punctuation = textArray[k].match(/[.,!?]$/g);
                if (i === 0) latestJoinedWord = latestJoinedWord.charAt(0).toUpperCase() + latestJoinedWord.slice(1);
                translatable = true;
                if (punctuation) translation.push((highlight ? this.wrap(latestJoinedWord) : latestJoinedWord) + punctuation[0]);
                else translation.push(highlight ? this.wrap(latestJoinedWord) : latestJoinedWord);
                i = k;
            }
            if (!translatable) translation.push(currWord);
        }
        translation[0] = translation[0].charAt(0).toUpperCase() + translation[0].slice(1);
        translation = translation.join(' ');
        if (translation === text) return 'Everything looks good to me!';
        else return translation;
    }

    processWord(word, locale) {
        let modifiedWord = word.toLowerCase();
        if (locale === 'american-to-british') {
            if (this.isTitle(modifiedWord, locale)) {
                let translatedWord = americanToBritishTitles[modifiedWord];
                return translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
            }
            modifiedWord = modifiedWord.replace(/[.,!?]$/g, '');
            if (this.isTime(modifiedWord, locale)) {
                let charArray = [...modifiedWord];
                let index = modifiedWord.indexOf(':');
                charArray[index] = '.';
                return charArray.join('');
            }
            if (modifiedWord in americanOnly) {
                return americanOnly[modifiedWord];
            }
            if (modifiedWord in americanToBritishSpelling) {
                return americanToBritishSpelling[modifiedWord];
            }
            return false;
        }
        else {
            if (this.isTitle(modifiedWord, locale)) {
                let translatedWord = britishToAmericanTitles[modifiedWord];
                return translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
            }
            modifiedWord = modifiedWord.replace(/[.,!?]$/g, '');
            if (this.isTime(modifiedWord, locale)) {
                let charArray = [...modifiedWord];
                let index = modifiedWord.indexOf('.');
                charArray[index] = ':';
                return charArray.join('');
            }
            if (modifiedWord in britishOnly) {
                return britishOnly[modifiedWord];
            }
            if (modifiedWord in britishToAmericanSpelling) {
                return britishToAmericanSpelling[modifiedWord]
            }
            return false;
        }
    }

    isTitle(text, locale) {
        if (locale === 'american-to-british') {
            return text.toLowerCase() in americanToBritishTitles;
        }
        else return text in britishToAmericanTitles;
    }

    isTime(text, locale) {
        if(text.split(' ').length > 1) return false;
        if (locale === 'american-to-british') {
            const regex = /\d{1,2}:\d{1,2}/;
            return regex.test(text);
        }
        else {
            const regex = /\d{1,2}.\d{1,2}/;
            return regex.test(text);
        }
    }

    wrap(text) {
        return '<span class="highlight">' + text + '</span>';
    }
}

module.exports = Translator;