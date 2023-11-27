import { api, LightningElement } from 'lwc';
import getAccountObject from '@salesforce/apex/AccountHelper.getAccountObject';

export default class AccountLwc extends LightningElement 
{
    @api recordId;
    accountUrl;
    accOwnerName;

    connectedCallback(){
        getAccountObject(
            {
                accId: this.recordId
            }
        ).then((result) => {
            this.accountUrl = `/${result.OwnerId}`;
            this.accOwnerName = result.Owner.Name;
        }).catch((error) => {
            alert(`Error Message: ${error.body.message}`);
        });
    }
}