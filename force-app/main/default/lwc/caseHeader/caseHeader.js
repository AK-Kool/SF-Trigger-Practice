import { LightningElement , wire} from 'lwc';
import getInstanceName from '@salesforce/apex/CaseController.getInstanceName';

export default class CaseHeader extends LightningElement 
{
    @wire(getInstanceName)
    org;
}