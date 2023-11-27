import { api, LightningElement } from 'lwc';

export default class SearchModalView extends LightningElement 
{
    @api searchString;

    handleCancel(){
        const cancelEvent = new CustomEvent('cancel');
        this.dispatchEvent(cancelEvent);
    }
}