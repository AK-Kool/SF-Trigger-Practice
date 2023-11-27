import { LightningElement } from 'lwc';

export default class SplitModal extends LightningElement 
{
    handleClose()
    {
        const closeEvt = new CustomEvent(
            'close'
        );
        this.dispatchEvent(closeEvt);
    }
    handleTab1(e)
    {
        alert(e.target.id);
    }
}