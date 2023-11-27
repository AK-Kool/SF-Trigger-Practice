import { LightningElement } from 'lwc';
import signinTemplate from './signinTemplate.html';
import signupTemplate from './signupTemplate.html';
import renderTemplate from './renderMethod.html';
export default class RenderMethod extends LightningElement {

    selectedBtn = ''
    render(){
        return this.selectedBtn === 'Signup' ? signupTemplate :
            this.selectedBtn === 'Signin' ? signinTemplate :
            renderTemplate
    }
    handleClick(event){
  
        this.selectedBtn = event.target.label;
    }
    submitHandler(){
        console.log("signup completed");
    }
    submitHandler1(){
        console.log("signin completed");
    }
}