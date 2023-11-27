import { LightningElement, track } from 'lwc';

export default class ParentLWC extends LightningElement 
{
    @track sum = 0;
    hasSumValue = false;
    handleClick()
    {
        this.sum = parseInt(this.template.querySelector('[data-id="n1"]').value) + parseInt(this.template.querySelector('[data-id="n2"]').value);
        this.hasSumValue = true;
        //alert(this.template.querySelector('[data-id="n1"]').value);
    }
}