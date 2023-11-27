import { LightningElement } from 'lwc';

export default class FirstLWC extends LightningElement {

    day = 'day6';

    changeHandler(event)
    {
        this.day = event.target.value;
    }
}