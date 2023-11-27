import { LightningElement } from 'lwc';

export default class CaseFooter extends LightningElement 
{
    handleCancel()
    {
        const closeEvt = new CustomEvent('close');
        this.dispatchEvent(closeEvt);
    }
}