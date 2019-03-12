$("#start").on("click", function(){
    $("#start").remove();
    game.loadQuestion();
})
$(document).on("click", ".answer-button", function(e){
    game.clicked(e);
})
$(document).on("click", "#Replay", function(){
    game.reset();
})

//create list of questions and answer
var qa = [
{
    question: "What award, often cited as the most prestigious award in electronic media, is administered By Grady College?", 
    choices: ["The GLAAD Media Awards", "The Pulitzer Prizes", "Peabody Awards", "Tony Awards"],
    rightAnswer: "Peabody Awards",
},
{
    question: "Which is not one the three pillars of the arch?", 
    choices: ["Courage", "Wisdom","Justice","Moderation"],
    rightAnswer: "Courage",
},
{
    question: "Chartered by the Georgia General Assembly, UGA became America's first state-chartered university on what date?", 
    choices: ["September 17, 1787","January 27, 1785","January 25, 1785", "February 13, 1786"],
    rightAnswer: "January 27, 1785",
},
{
    question: "Which of the following local Athens restauarnts inspired the name for the rock band R.E.M's album Automatic for the People?" , 
    choices: ["Kelly's Jamaican Foods", "Peaches","Mayflower Restaraunt","Weaver D's"],
    rightAnswer: "Weaver D's",
},
{
    question: "Of the UGA alumni below: Which is not one of the first African American four-year graduates?", 
    choices: ["Dr. Harold A. Black", "Dr. Mary B. Diallo", "Mary Frances Early", "Ms. Kerry Miller"],
    rightAnswer: "Mary Frances Early",
}];
 var game = {
     questions: qa,
     questionIndex: 0,
     clock: 15,
     correct: 0,
     incorrect: 0,
     unanswered: 0,
     countdown: function(){
         game.clock --;
         $(".timeremaining").html(game.clock);
         if (game.clock =0){
             console.log("Time's up!");
             game.timesUp();
         }
     },
     loadQuestion: function(){
         timer = setInterval(game.clock,1000);
         $(".timeremaining").html(game.clock);
         $(".Questions").html("<h2>" +qa[game.questionIndex].question+ "</h2>");
         for (var i =0; i<qa[game.questionIndex].choices.length; i++){
             $(".Questions").append('<button class = "answer-button" id = "button-' + i +' "data-name= " '+ qa[game.questionIndex].choices[i]+' ">'+qa[game.questionIndex].choices[i]+'</button>');
         }
        
     },
     nextQuestion: function(){
         game.clock = 15;
         $(".timer").html(game.clock);
         game.questionIndex++;
         game.loadQuestion();
     },
     timesUp: function(){
         clearInterval(timer);
         game.unanswered++;
         $(".Questions").html("<h2>Time Elapsed!</h2>");
         $(".Questions").append("<h3>The correct answer was:" + qa[game.questionIndex].rightAnswer+ "</h2>");
         if(game.questionIndex==qa.length -1){
            setTimeout(game.results, 3*1000);
        }else{
            setTimeout(game.nextQuestion, 3*1000);
        }
     },
     results: function(){
         clearInterval(timer);
         $(".Questions").html("<h2>Final Results!</h2>");
         $(".Questions").append("<h3>Correct: "+game.correct+"</h3>");
         $(".Questions").append("<h3>Incorrect: "+game.incorrect+"</h3>");
         $(".Questions").append("<h3>Unanswered: "+game.unanswered+"</h3>");
         $(".Questions").append("<button id ='Replay'>Replay</button>");
     },
     clicked: function(e){
         clearInterval(timer);
         if($(e.target).data("name")==qa[game.questionIndex].rightAnswer){
             game.answeredRight();
         }else{
             game.answeredWrong();
         }
     },
     answeredRight: function(){
         clearInterval(timer);
         game.correct++;
         $(".Questions").html("<h2> You got it Right!</h2>");
         if(game.questionIndex==qa.length -1){
             setTimeout(game.results, 3*1000);
         }else{
             setTimeout(game.nextQuestion, 3*1000);
         }
     },
     answeredWrong: function(){
        clearInterval(timer);
        game.incorrect++;
        $(".Questions").html("<h2> Nope thats not it!</h2>");
        $(".Questions").append("<h3>The correct answer was:" + qa[game.questionIndex].rightAnswer+ "</h2>");
        if(game.questionIndex==qa.length -1){
            setTimeout(game.results, 3*1000);
        }else{
            setTimeout(game.nextQuestion, 3*1000);
        }
     },
     reset: function(){
         game.questionIndex=0;
         game.clock=0;
         game.correct=0;
         game.incorrect=0;
         game.unanswered=0;
         game.loadQuestion();
     }

 }