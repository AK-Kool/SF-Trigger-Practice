import { LightningElement } from 'lwc';

export default class Test123 extends LightningElement {
    input1 = '';
    input2 = '';
    handleInput(e){
        if(e.target.label === 'Input1')
            this.input1 = e.target.value;
        else
            this.input2 = e.target.value;
    }

    handleClick(){
        alert('Input 1: ' + this.input1 + ' & Input 2: ' + this.input2);
    }
}