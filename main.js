$(document).ready(function() {


  var createAndShowSecretWord = {
    wordBank : ['tacos', 'watermelon', 'hat'],
    generateRandomSecretWord : function () {
      var randomIndexNumber = Math.floor(createAndShowSecretWord.wordBank.length*(Math.random()));
      secretWord = createAndShowSecretWord.wordBank[randomIndexNumber];
      return secretWord;
    },


    showHiddenLetterList : function() {
      var hiddenLetterArray = [];
      for (var i=0; i<game.secretWord.length; i++) {
        hiddenLetterArray.push('_ ');
        $('#hiddenLetterList').append('<span id=letter-'+i+'>'+hiddenLetterArray[i]+'</span>');
      }
    }
  };


  var game = {
    isOngoing : false,
    startGame : function () {
        game.isOngoing = true;
        createAndShowSecretWord.showHiddenLetterList();
        letterBoard.showLetters();
        $('#startButton').remove();
        $('#buttonContainer').html('<button id="resetButton">Reset Game</button>');
        $('#letterBoard').prop('disabled', false);
    },
    numberOfGuessesRemaining : 6,
    numberOfCorrectGuesses: 0,
    secretWord : createAndShowSecretWord.generateRandomSecretWord(),
    evaluateGuess : function (theClickedLetter, theSecretWord) {
      var numberLettersTheGuessDoesNotMatch = 0;
      for (var i=0; i<theSecretWord.length; i++) {
        if(theClickedLetter === (theSecretWord[i]).toUpperCase()){
          console.log('match');
           $('#letter-'+i).html(theSecretWord[i]);
           game.numberOfCorrectGuesses ++;
           if (game.numberOfCorrectGuesses === theSecretWord.length) {
             game.endGame("You Win! ");
            }
          }
        else if (theClickedLetter !== (theSecretWord[i]).toUpperCase()){
          numberLettersTheGuessDoesNotMatch ++;
        }
      }
      if (numberLettersTheGuessDoesNotMatch === theSecretWord.length) {
        if (game.numberOfGuessesRemaining >= 1) {
          game.numberOfGuessesRemaining --;
          console.log('miss');
          $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining);
        }
      }
      if (game.numberOfGuessesRemaining === 0) {
        game.endGame('You Lose');
      }
    },
    endGame : function (winOrLossMessage) {
      game.isOngoing = false;
      $('#letterBoard').prop('disabled', true);
      $('#letterBoard').html('<span class="winOrLossMessage">'+winOrLossMessage+'</span>');
      $('#hiddenLetterList').html(game.secretWord);

    },
    resetGame : function () {
      //called by reset button click
      //can I add are you sure prompt if game.isOngoing === true?
      console.log('reset');
      game.secretWord = createAndShowSecretWord.generateRandomSecretWord();
      $('#hiddenLetterList').empty();
      $('#letterBoard').empty();
      game.numberOfGuessesRemaining = 6;
      $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining);
      game.numberOfCorrectGuesses = 0;
      game.startGame();
    }
  };



  var letterBoard = {
    lettersArray : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    showLetters : function() {
      for (var i=0; i<letterBoard.lettersArray.length; i++) {
        $('#letterBoard').append('<button class="btn">'+letterBoard.lettersArray[i]+'</button>');
      }
      $('#letterBoard').prop('disabled', false);
    },
    disableGuessedLetters : function (theClickedLetter) {
        theClickedLetter.addClass('btn disabled');
        theClickedLetter.prop('disabled', true);
    }
  };




  var scoreBoard = {
    //Ice Box
  };



  var buttonHandlers = {
    startClickHandler : function(event) {
      event.preventDefault();
      game.startGame();
    },
    letterClickHandler : function (event) {
      event.stopPropagation();
      var $theClickedLetter = $(event.target);
      if (game.isOngoing === true && $theClickedLetter.attr('id') !== 'letterBoard') {
        game.evaluateGuess($theClickedLetter.html(), game.secretWord);
        letterBoard.disableGuessedLetters($theClickedLetter);
      }
    },
    resetClickHandler : function (event) {
      if (game.isOngoing === true){
        if (confirm('Are you sure you want to reset the game?') === true) {
          game.resetGame();
        } else {
          return;
        }
      } else if (game.isOngoing === false) {
        game.resetGame();
      }
    }
  };


  $('#startButton').on('click', buttonHandlers.startClickHandler);
  $('#letterBoard').on('click', buttonHandlers.letterClickHandler);
  $('#buttonContainer').on('click', '#resetButton', buttonHandlers.resetClickHandler);



//below is the end of the document.ready function
});
