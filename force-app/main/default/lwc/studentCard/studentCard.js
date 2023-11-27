import { LightningElement } from 'lwc';

export default class StudentCard extends LightningElement 
{
    _buttonClass = 'slds-dropdown-trigger slds-dropdown-trigger_click';
    get buttonClass()
    {
        return this._buttonClass;
    }

    _showModal = false;
    get showModal()
    {
        return this._showModal;
    }

    handleButtonDown()
    {
        this._buttonClass = (this._buttonClass === 'slds-dropdown-trigger slds-dropdown-trigger_click') ? 
                'slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 
                'slds-dropdown-trigger slds-dropdown-trigger_click';
    }

    handleEditSplit()
    {
        this._buttonClass = 'slds-dropdown-trigger slds-dropdown-trigger_click';
        this._showModal = true;
    }
    handleModalClose()
    {
        this._showModal = false;
    }
}