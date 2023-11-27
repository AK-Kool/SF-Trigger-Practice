import { LightningElement, track } from 'lwc';
import getSingleContact from '@salesforce/apex/contactController.getSingleContact'
export default class PrepopulateLwc extends LightningElement 
{
    @track inVal;
    @track isReadOnly = false;
    @track isDisabled = false;
    connectedCallback()
    {
        getSingleContact().then(result => {
            this.inVal = result.FirstName + ' ' + result.LastName;
            this.isReadOnly = true;
            this.isDisabled = true;
        }).catch(error => {
            alert('error occured' + JSON.stringify(error));
        });
    }
}