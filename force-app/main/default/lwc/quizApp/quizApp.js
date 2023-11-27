import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    
    selected = {} //for storing values
    correctAnswers = 0; // to show the number of  correct answewres
    isSubmitted = false; //to display a toast message
    myQuestions = [
        {
            id:"Questions1",
            question:"Which of the following is not a template loop ?",
            answer:{
                a:"for:each",
                b:"Iterator",
                c:"map loop"
            },
            correctAnswer:"c"
        },
        {
            id:"Questions2",
            question:"Which of the file is invalid in LWC Component ?",
            answer:{
                a:".svg",
                b:".js",
                c:".apex"
            },
            correctAnswer:"c"
        },
        {
            id:"Questions3",
            question:"Which of the following is not a directive ?",
            answer:{
                a:"for:each",
                b:"if:true",
                c:"@track"
            },
            correctAnswer:"c"
        }
    ]
    //enabling and disabling submit button
    get allNotSelected()
    {
        return !(Object.keys(this.selected).length === this.myQuestions.length)
    }
    // getter method for applying dynamic styling for our result
    get isScoredFull()
    {
        return `slds-text-heading-large ${this.myQuestions.length === this.correctAnswers ? 
        'slds-text-color_success':'slds-text-color_error'}`
    }
     // change handler called on every click of the options
    changeHandler(event)
    {
        console.log("name", event.target.name);
        console.log("value",event.target.value);
        const {name,value} =event.target;  // short hand notation for the below 2 lines
        //const name = event.target.name;
        //const value = event.target.value;
        this.selected = {...this.selected, [name]:value};
    }
      // form submit handler
    submitHandler(event)
    {
      event.preventDefault();
      let correct = this.myQuestions.filter(item=>this.selected[item.id] === item.correctAnswer);
      this.correctAnswers = correct.length;
      this.isSubmitted = true;
      console.log("this.correctAnswers", this.correctAnswers);
    }
    //form reset handler
    resetHandler()
    {
       this.selected = {};
       this.correctAnswers = 0;
       this.isSubmitted = false;
    }
}