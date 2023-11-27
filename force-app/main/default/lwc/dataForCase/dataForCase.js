import { api, LightningElement , track, wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CASE_CHANNEL from '@salesforce/messageChannel/Case_Channel__c';
import { columns } from 'c/datatableColumns';
import fetchCases from '@salesforce/apex/CaseController.fetchCases';

export default class DataForCase extends LightningElement 
{
    @api recordId;
    columns = columns;
    @track data;
    cloneData;

    @wire(MessageContext)
    messageContext

    async connectedCallback()
    {
        await fetchCases(
            { accId: this.recordId }
        ).then(result =>{
            if(result !== null)
            {
                this.data = result.map(row => {
                    return {
                        Id: row.Id,
                        caseNumber: row.CaseNumber !== undefined ? row.CaseNumber : 0,
                        caseNumberWithUrl: row.Id !== undefined ? `/${row.Id}` : '#',
                        caseSubject: row.Subject !== undefined ? row.Subject : 'NA',
                        caseSubjectWithUrl: row.Id !== undefined ? `/${row.Id}` : '#',
                        caseOwner: row.Owner.Name !== null ? row.Owner.Name : 'NA',
                        caseOwnerWithUrl: row.OwnerId !== undefined ? `/${row.OwnerId}` : '#',
                        caseStatus: row.Status !== undefined ? row.Status : 'NA',
                        isDisabled: row.Status !== undefined ? (row.Status === 'Closed' ? true : false) : true
                    };
                });
                this.cloneData = [...this.data];
            }
            else{
                alert('No Data Found.');
            }
        }).catch(error => {
            alert('Error Occcured');
        });
    }

    handleRadioButton(event){
        if(event.target.value === 'all')
        {
            this.data = [...this.cloneData];
        }
        else if(event.target.value === 'closed')
        {
            this.data = [...this.cloneData];
            this.data = this.data.filter(row => {
                if(row.caseStatus === 'Closed')
                {
                    return row;
                }
            });
        }
        else if(event.target.value === 'open')
        {
            this.data = [...this.cloneData];
            this.data = this.data.filter(row => {
                if(row.caseStatus !== 'Closed')
                {
                    return row;
                }
            });
        }
    }

    handleRowAction(event)
    {
        const caseId = event.detail.row.Id;
        const caseEvt = new CustomEvent('caseselect', 
            {
                detail: caseId
            }        
        );
        this.dispatchEvent(caseEvt);
    }
    handleInput(event)
    {
        this.data = [...this.cloneData];
        if(event.target.value === '')
        {
            this.data = [...this.cloneData];
        }
        else{
            this.data = this.data.filter(row => {
                if(JSON.stringify(row).toString().toLowerCase().trim().includes(event.target.value.toString().toLowerCase().trim()))
                {
                    return row;
                }
            });
        }
    }
}