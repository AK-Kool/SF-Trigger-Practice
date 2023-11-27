import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class SearchAndNewCase extends LightningElement 
{
    isNewOpen = false;
    handleNew()
    {
        this.isNewOpen = true;
        const newEvt = new CustomEvent('new');
        this.dispatchEvent(newEvt);
    }
    handleSubmit()
    {

    }
    handleSuccess()
    {
        const event = new ShowToastEvent({
            title: 'Case',
            message: 'Updated Successfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
        this.isNewOpen = false;

        const newCompleteEvt = new CustomEvent('newcomplete');
        this.dispatchEvent(newCompleteEvt);
    }
}