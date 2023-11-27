import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LoginLwc extends LightningElement 
{
    @track isOpen = false;
    handleLogin()
    {
        this.isOpen = true;
    }
    handleClose()
    {
        this.isOpen = false;
    }
    handleClick()
    {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       
        if(re.test(String(this.template.querySelector('[data-id="em"]').value).toLowerCase())
                || this.template.querySelector('[data-id="txt"]').value !== '')
        {
            const evt = new ShowToastEvent({
                title: 'LOGIN',
                message: 'Text Val : ' + this.template.querySelector('[data-id="txt"]').value 
                         + 'Email :' + this.template.querySelector('[data-id="em"]').value,
                variant: 'success',
            });
            this.dispatchEvent(evt);
        }
    }
}