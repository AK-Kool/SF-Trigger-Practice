import { LightningElement, track } from 'lwc';

export default class SearchEmailLwc extends LightningElement 
{
    @track hasValidInput = false;
    @track isModalOpen = false;
    _inputValue ;
    

    get comboboxClass(){
        if(this.hasValidInput)
            return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
        return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    }
    get inputVal()
    {
        if(this._inputValue)
            return this._inputValue;
        return '';    
    }


    // Handling Inputs
    handleInput(event){
        if(event.target.value.toString().trim() !== '')
        {
            this.hasValidInput = true;
            this._inputValue = event.target.value.toString().trim();
        }
        else
            this.hasValidInput = false;
    }

    handleListboxClick(){
        console.log(this._inputValue);
        this.isModalOpen = true;
    }
    handleModalCancel()
    {
        this.isModalOpen = false;
    }
}