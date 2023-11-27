import { LightningElement, track, wire } from 'lwc';
import getAllCustomObjects from '@salesforce/apex/ObjectAndFieldController.getAllCustomObjects';

export default class ObjectWIthFields extends LightningElement 
{
    @track options;

    _isDropsownOpen = false;
    _inputValue = '';
    _searchResult;
    _hasFocus = false;
    _cancelBlur = false;

    @wire(getAllCustomObjects)
    wiredCallback({error,data}){
        if(error){
            alert(JSON.stringify(error));
        }else if(data){
            console.log(JSON.stringify(data));
            this.options = [];
            data.forEach(element => {
                let op = { label: element.SobjectType, value: element.SobjectType };
                this.options.push(op);
            });
            //alert(JSON.stringify(this.options.length));
        }
    }


    get dropdownClass()
    {
        if(this._isDropsownOpen)
            return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
        else
            return 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';    
    }
    
    get getRecentRecords(){
        return [
            { label: 'Account', key: 'acc', id: 'acc1', xlink: '/_slds/icons/standard-sprite/svg/symbols.svg#account' },
            { label: 'Contact', key: 'con', id: 'con1', xlink: '/_slds/icons/standard-sprite/svg/symbols.svg#contact' },
            { label: 'Opportunity', key: 'opp', id: 'opp1', xlink: '/_slds/icons/standard-sprite/svg/symbols.svg#opportunity' }
        ];
    }
    get isRecentRecordsVisible(){
        if(this.getInputValue === '')
            return true;
        else
            return false;    
    }

    renderedCallback(){
        let abc = this.template.querySelector('[data-id="in1"]').value;
        console.log(abc);
    }

    handleInputValue(event)
    {
        this._inputValue = event.target.value;
        if(this.getInputValue != '')
        {
            let cloneOptions = [...this.options];
            this._searchResult = [];
            this._searchResult = cloneOptions.filter(row => {
                if(row.label.toLowerCase().toString().includes(this._inputValue.trim().toLowerCase()))
                    return row;
            });
            //alert(JSON.stringify(this._searchResult));
            //console.log('#######'+JSON.stringify(this._searchResult));
        }
    }
    get searchResultsObject(){
        if(this._searchResult !== undefined)
            return this._searchResult
        else
            return '';
    }
    get getSearchedOptions()
    {
        //console.log('QQQ : ' + JSON.stringify(this.searchResultsObject));
        if(this.searchResultsObject.length !== 0)
        {
            console.log('@@@@@@ : '+JSON.stringify(this.searchResultsObject.length));
            let abc = [];
            abc = this.searchResultsObject;
            abc = abc.map(row => {
                return { label : row.label , key: row.label + 'key', id: row.label + 'id' , xlink: '/_slds/icons/standard-sprite/svg/symbols.svg#account' };
            });
            console.log('@@@@@@ : '+JSON.stringify(abc));
            return abc;
        }
        else
        {
            return [{ label: 'No Result Found.', key: 'err', id: 'err1', xlink: '/_slds/icons/utility-sprite/svg/symbols.svg#error'}];
        }       
    }

    get getInputValue()
    {
        if(this._inputValue.trim() !== '')
        {
            return this._inputValue;
        }    
        else
            return '';  
    }

    handleInputClick()
    {
        console.log('CLicked.');
        this._isDropsownOpen = true;
    }
    handleInputBlur()
    {
        if(this._cancelBlur)
            return;
        this._isDropsownOpen = false;
        this._hasFocus = false;
    }
    handleFocus()
    {
        this._hasFocus = true;
    }
    handleResultClick(event){
        const recordId = event.currentTarget.dataset.recordid;
        alert(`Id is ${recordId}`);
        this._isDropsownOpen = false;
    }
    handleComboboxMouseUp(event)
    {
        this._cancelBlur = false;
        //alert(`Mouse Up Event is Called. ${event.button}`);
    }
    handleComboboxMouseDown(event){
        console.log(`Main Button Number is ${event.button}`);
        if(event.button === 0){
            this._cancelBlur = true;
        }
    }
}