import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
export default class Notifications extends LightningElement {

    toastHandler(){
       this.showToast("Success !","Account created","success");
    }

    toastHandler1(){
        this.showToast("Error","Account creation failed","error");
    }

    showToast(title,message,variant){
        const event = new ShowToastEvent({
            title,
            message,
            variant
        })
        this.dispatchEvent(event);
    }
}