const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    suite('American English to British English', function() {
        test('Translate (Mangoes are my favorite fruit.) to British English', function(done){
            let translator = new Translator();
            const text = 'Mangoes are my favorite fruit.';
            const translation = 'Mangoes are my favourite fruit.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (I ate yogurt for breakfast.) to British English', function(done){
            let translator = new Translator();
            const text = 'I ate yogurt for breakfast.';
            const translation = 'I ate yoghurt for breakfast.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (We had a party at my friend\'s condo.) to British English', function(done){
            let translator = new Translator();
            const text = 'We had a party at my friend\'s condo.';
            const translation = 'We had a party at my friend\'s flat.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (Can you toss this in the trashcan for me?) to British English', function(done){
            let translator = new Translator();
            const text = 'Can you toss this in the trashcan for me?';
            const translation = 'Can you toss this in the bin for me?';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (The parking lot was full.) to British English', function(done){
            let translator = new Translator();
            const text = 'The parking lot was full.';
            const translation = 'The car park was full.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (Like a high tech Rube Goldberg machine.) to British English', function(done){
            let translator = new Translator();
            const text = 'Like a high tech Rube Goldberg machine.';
            const translation = 'Like a high tech Heath Robinson device.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (To play hooky means to skip class or work.) to British English', function(done){
            let translator = new Translator();
            const text = 'To play hooky means to skip class or work.';
            const translation = 'To bunk off means to skip class or work.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (No Mr. Bond, I expect you to die.) to British English', function(done){
            let translator = new Translator();
            const text = 'No Mr. Bond, I expect you to die.';
            const translation = 'No Mr Bond, I expect you to die.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (Dr. Grosh will see you now.) to British English', function(done){
            let translator = new Translator();
            const text = 'Dr. Grosh will see you now.';
            const translation = 'Dr Grosh will see you now.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });

        test('Translate (Lunch is at 12:15 today.) to British English', function(done){
            let translator = new Translator();
            const text = 'Lunch is at 12:15 today.';
            const translation = 'Lunch is at 12.15 today.';
            assert.equal(translator.translate(text, 'american-to-british'), translation);
            done();
        });
    });

    suite('British English to American English', function() {
        test('Translate (We watched the footie match for a while.) to American English', function(done) {
            const text = 'We watched the footie match for a while.';
            const translation = 'We watched the soccer match for a while.';
            done();
        });

        test('Translate (Paracetamol takes up to an hour to work.) to American English', function(done) {
            const text = 'Paracetamol takes up to an hour to work.';
            const translation = 'Tylenol takes up to an hour to work.';
            done();
        });

        test('Translate (First, caramelise the onions.) to American English', function(done) {
            const text = 'First, caramelise the onions.';
            const translation = 'First, caramelize the onions.';
            done();

        });

        test('Translate (I spent the bank holiday at the funfair.) to American English', function(done) {
            const text = 'I spent the bank holiday at the funfair.';
            const translation = 'I spent the public holiday at the carnival.';
            done();

        });

        test('Translate (I had a bicky then went to the chippy.) to American English', function(done) {
            const text = 'I had a bicky then went to the chippy.';
            const translation = 'I had a cookie then went to the fish-and-chip shop.';
            done();

        });

        test('Translate (I\'ve just got bits and bobs in my bum bag.) to American English', function(done) {
            const text = 'I\'ve just got bits and bobs in my bum bag.';
            const translation = 'I\'ve just got odds and ends in my fanny pack.';
            done();

        });

        test('Translate (The car boot sale at Boxted Airfield was called off.) to American English', function(done) {
            const text = 'The car boot sale at Boxted Airfield was called off.';
            const translation = 'The swap meet at Boxted Airfield was called off.';
            done();

        });

        test('Translate (Have you met Mrs Kalyani?) to American English', function(done) {
            const text = 'Have you met Mrs Kalyani?';
            const translation = 'Have you met Mrs. Kalyani?';
            done();

        });

        test('Translate (Prof Joyner of King\'s College, London.) to American English', function(done) {
            const text = 'Prof Joyner of King\'s College, London.';
            const translation = 'Prof. Joyner of King\'s College, London.';
            done();

        });

        test('Translate (Tea time is usually around 4 or 4.30.) to American English', function(done) {
            const text = 'Tea time is usually around 4 or 4.30.';
            const translation = 'Tea time is usually around 4 or 4:30.';
            done();

        });

        test('Highlight translation in (Mangoes are my favorite fruit.)', function(done) {
            const text = 'Mangoes are my favorite fruit.';
            const translation = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
            done();

        });

        test('Highlight translation in (I ate yogurt for breakfast.)', function(done) {
            const text = 'I ate yogurt for breakfast.';
            const translation = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
            done();

        });

        test('Highlight translation in (We watched the footie match for a while.)', function(done) {
            const text = 'We watched the footie match for a while.';
            const translation = 'We watched the <span class="highlight">soccer</span> match for a while.';
            done();

        });

        test('Highlight translation in (Paracetamol takes up to an hour to work.)', function(done) {
            const text = 'Paracetamol takes up to an hour to work.';
            const translation = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
            done();

        });
    });
});
