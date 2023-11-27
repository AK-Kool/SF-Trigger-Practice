import { api, LightningElement, wire } from 'lwc';
import fetchCases from '@salesforce/apex/CaseController.fetchCases';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

const columns = [
    {
        label: 'Case Number',
        fieldName: 'caseNumberWithUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'caseNumber'},
            target: '_blank'
        }
    },
    {
        label: 'Subject',
        fieldName: 'caseSubjectWithUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'caseSubject' },
            target: '_blank'
        }
    },
    {
        label: 'Status',
        fieldName: 'caseStatus'
    },
    {
        label: 'Owner',
        fieldName: 'caseOwner'
    },
    {
        label: 'Action',
        type: 'button',
        typeAttributes: {
            label: 'Quick Close',
            name: 'close',
            disabled: { fieldName: 'isDisabled' },
            value: 'close',
            iconPosition: 'left'
        }
    }
];

export default class ShowCases extends LightningElement 
{
    @api recordId;

    firstPart = false;
    secondPart = false;

    caseRecordId;

    columns = columns;
    data;
    hasData = false;

    get isLoading()
    {
        if(this.data)
            return false;
        return true;    
    }

    async connectedCallback()
    {
        this.firstPart = true;
        await fetchCases({ accId: this.recordId })
                .then(result => {
                    if(result !== null)
                    {
                        this.data = result.map(row => {
                            return {
                                Id: row.Id, 
                                caseNumber: row.CaseNumber ,
                                caseNumberWithUrl: '/' + row.Id,
                                caseSubject: row.Subject,
                                caseSubjectWithUrl: '/' + row.Id,
                                caseStatus: row.Status,
                                caseOwner: row.Owner.Name,
                                isDisabled: row.Status === 'Closed' ? true : false
                            };
                        });
                        this.hasData = true;
                    }
                    else{

                    }
                }).catch(error => {
                    alert('Error in calling fetchCase function.');
                });
    }
    handleRowAction(event)
    {
        this.caseRecordId = event.detail.row.Id;
        this.firstPart = false;
        this.secondPart = true;
        const hideFooterEvt = new CustomEvent('hidefooter');
        this.dispatchEvent(hideFooterEvt);
    }

    handleSubmit()
    {

    }
    handleSuccess()
    {
        const event = new ShowToastEvent({
            title: 'Case',
            message: 'Updated Successfully',
            variant: 'success'
        });
        this.dispatchEvent(event);
        this.firstPart = true;
        this.secondPart = false;
    }
    handleBack()
    {
        this.firstPart = true;
        this.secondPart = false;
        const showFooterEvt = new CustomEvent('showfooter');
        this.dispatchEvent(showFooterEvt);
    }
    handleNew()
    {
        this.firstPart = false;
        const hideFooterEvt = new CustomEvent('hidefooter');
        this.dispatchEvent(hideFooterEvt);
    }
    handleNewComplete()
    {
        this.firstPart = true;
        const showFooterEvt = new CustomEvent('showfooter');
        this.dispatchEvent(showFooterEvt);
    }
}