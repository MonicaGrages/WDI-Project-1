$(document).ready(function() {


  var createAndShowSecretWord = {
    wordBank : ['tacos', 'watermelon', 'hat'],
    generateRandomSecretWord : function () {
      //will get random secret word from word bank and
      //add hidden letter list to game board
      var randomIndexNumber = Math.floor(createAndShowSecretWord.wordBank.length*(Math.random()));
      secretWord = createAndShowSecretWord.wordBank[randomIndexNumber];
      return secretWord;
      // createAndShowSecretWord.returnTheSecretWord(theSecretWord);
    },
    // returnTheSecretWord : function (theSecretWord) {
    //   console.log('returnTheSecretWord has: '+theSecretWord);
    //   return theSecretWord;
    //   this is not working
    // },

    showHiddenLetterList : function() {
      var hiddenLetterArray = [];
      for (var i=0; i<game.secretWord.length; i++) {
        hiddenLetterArray.push('_ ');
      }
      $('#hiddenLetterList').append(hiddenLetterArray.join(' '));
      // for (var i=0; i<theSecretWord.length; i++) {
      //   $('#hiddenLetterList').append(secretWordAsArray[i]); //add an underscore for each letter in the secret word
      // }
    }
  };


  var game = {
    isOngoing : false,
    startGame : function () {
      // called by start button click handler
      //should call generateRandomSecretWord and createLetterBoard
      if (game.isOngoing === false) {
        game.isOngoing = true;
        game.createLetterBoard();
        createAndShowSecretWord.showHiddenLetterList();
      } else if (game.isOngoing === true) {
        return;
      }
    },

    createLetterBoard : function() {
      //will make the letter board show up after game starts
      //could just add a class to an already existing letter board that makes its visibility not hidden?
      letterBoard.showLetters();
    },

    numberOfGuessesRemaining : 6,

    secretWord : createAndShowSecretWord.generateRandomSecretWord(),

    evaluateGuess : function (theClickedLetter, theSecretWord) {
      //how do I get the random secret word here?
      var secretWordAsArray = theSecretWord.split("");
      // for (var i=0; i<theSecretWord.length; i++) {
      //   secretWordAsArray[i] = "_ ";
      //   $('#hiddenLetterList').html(secretWordAsArray.join(' '));
      // }
      for (var i=0; i<theSecretWord.length; i++) {
          if(theClickedLetter === (theSecretWord[i]).toUpperCase()) {
            console.log('match');
            theCurrentDisplayArray = ($('#hiddenLetterList').html()).split("");
            console.log(theCurrentDisplayArray);
          }
        }
      // $('hiddenLetterList').html(secretWordAsArray.join(' '));
      // for (var i=0; i<theSecretWord.length; i++) {
      //   if (theClickedLetter === (theSecretWord[i]).toUpperCase()) {
      //     console.log('match');
      //     return;
      //   }
      // }
      // console.log('miss');
      // game.numberOfGuessesRemaining --;
      // $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining);
      // if (game.numberOfGuessesRemaining === 0) {
      //   game.endGame();
      // }
    },

    endGame : function () {
      console.log('game over');
      //win vs loss?
      //create reset button
      game.isOngoing = false;
    },

    resetGame : function () {
      //
    }

  };



  var letterBoard = {
    lettersArray : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    showLetters : function() {
      for (var i=0; i<letterBoard.lettersArray.length; i++) {
        $('#letterBoard').append('<button>'+letterBoard.lettersArray[i]+'</button>');
      }
    },
  };




  var scoreBoard = {
    //Ice Box
  };



  var buttonHandlers = {
    startClickHandler : function(event) {
      event.preventDefault();
      game.startGame();
    },
    resetClickHandler : function() {
      //event handler for reset button click
    },
    letterClickHandler : function (event) {
      event.preventDefault();
      var $theClickedLetter = $(event.target);
      game.evaluateGuess($theClickedLetter.html(), game.secretWord);
      console.log($theClickedLetter.html());
    }
  };

  // var secretWordAsArray = secretWord.split("");

  $('#startButton').on('click', buttonHandlers.startClickHandler);
  $('#letterBoard').on('click', buttonHandlers.letterClickHandler);
  //put reset button click event handler here and call resetClickHandler



//below is the end of the document.ready function
});
