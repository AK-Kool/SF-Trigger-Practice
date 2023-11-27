import { api, LightningElement } from 'lwc';

export default class TestSiteLwc extends LightningElement 
{
    @api message;
    @api recordId;

    connectedCallback()
    {
        console.log(`LWC: ${this.message}`);
        console.log(`LWC: ${this.recordId}`);
    }
}