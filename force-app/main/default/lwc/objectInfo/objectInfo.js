import { LightningElement } from 'lwc';

export default class ObjectInfo extends LightningElement 
{
    _isOpen = false;
    _loaded = 0;
    _searchString = '';

    get lookupClass()
    {
        if(this._isOpen)
            return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
        return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';    
    }

    connectedCallback()
    {
        
    }

    handleClick(){
        
    }

    handleInput(event){
        if(event.target.value.trim() !== '')
        {
            this._isOpen = true;
            this._searchString = event.target.value.trim();
        }
        else{
            this._isOpen = false;
        }
    }
    handleClick(){
        if(this._searchString === '')
            this._isOpen = true;
    }
    handleBlur()
    {
        console.log('Called Blur.');
        this._isOpen = false;
    }
}