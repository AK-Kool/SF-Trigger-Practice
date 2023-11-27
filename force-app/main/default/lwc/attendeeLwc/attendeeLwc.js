import { api, LightningElement , track, wire } from 'lwc';
import getContacts from '@salesforce/apex/AttendeeApex.getContacts';
import getAttendees from '@salesforce/apex/AttendeeApex.getAttendees';

const columns = [
    { 
        label : 'Name' , 
        fieldName : 'nameWithUrl',
        type : 'url' ,
        sortable : true ,
        cellAttributes: { 
            class: 'slds-text-title_caps'
        },
        typeAttributes : {
            label : { fieldName : 'Name' } ,
            target : '_blank'
        } 
    },
    { label : 'Email' , fieldName : 'Email' , type: 'email' , sortable : true },
    { 
        label: 'Action',
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
            iconName: 'action:delete',
            title: 'Preview',
            variant: 'border-filled',
            alternativeText: 'Delete'
        }
    }
];

export default class AttendeeLwc extends LightningElement 
{
    value = 'both';
    @track isOpen = false;

    @api recordId;

    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    columns = columns;
    @track data;
    masterData;
    @wire(getContacts)
    wiredCallback({error,data}){
        if(data)
        {
            this.data = data.map((row) => {
                return { Name : row.Name , nameWithUrl : '/' + row.Id , Email : row.Email};
            });
            this.masterData = [...this.data];
        }
        else if(error)
        {
            alert(JSON.stringify(error));
        }
    }
    handleClick()
    {
        this.isOpen = true;
    }
    handleClose()
    {
        this.data = [...this.masterData];
        this.isOpen = false;
    }

    sortBy(field, reverse, primer) {  
        if(field === 'nameWithUrl')
            field = 'Name';
        
        const key = primer
            ? function(x) {
                  return primer(x[field]);
              }
            : function(x) {
                  return x[field];
              };

        return function(a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.data];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.data = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }
    handleSearch(event)
    {
        this.data = [...this.masterData];
        this.data = this.data.filter((row) => {   
            if(JSON.stringify(row).toString().includes(event.target.value.toString()))
            {
                return row;
            }
        });
    }
    handleRowAction(event)
    {
        alert(JSON.stringify(event.detail));
        getAttendees({eventId:this.recordId,
                      attendeeType : 'both'})
        .then(() => {
            alert('SUCCESS');
        }).catch(error => {
            alert('ERROR : ' + JSON.stringify(error));
        });
    }
    get options() {
        return [
            { label: 'Contact', value: 'con' },
            { label: 'Lead', value: 'lead' },
            { label: 'Both', value: 'both' },
        ];
    }
    handleChange(event) {
        this.value = event.detail.value;
    }
}