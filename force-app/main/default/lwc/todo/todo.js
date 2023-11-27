import { LightningElement, track, wire  } from 'lwc';
import getPickListValuesIntoList from '@salesforce/apex/ToDo_Apex.getPickListValuesIntoList';
import addTodo from '@salesforce/apex/ToDo_Apex.addTodo';
import getTodos from '@salesforce/apex/ToDo_Apex.getTodos';

export default class Todo extends LightningElement 
{
    @track options;
    @track value;
    @track allTodos;
    @wire(getPickListValuesIntoList)
    wiredCallback({error,data}){
        if(error)
        {
            alert(JSON.stringify(error));
        }
        else if(data)
        {
            this.options = [];
            data.forEach(element => {
                let row = { label : element , value : element };
                this.options.push(row);
            });
        }
    }

    
    handleChange(event)
    {
        this.value = event.detail.value;
    }

    addTodoHandler()
    {
        if ((this.template.querySelector('lightning-input').value) !== ''
            && this.value !== '')
        {
            addTodo({
                name: this.template.querySelector('lightning-input').value,
                type: this.value
            }).then(result => {
                console.log('inserted.');
                this.template.querySelector('lightning-input').value = '';
                this.value = '';
                this.fetchTodos();
            }).catch(error => {
                alert('error');
            });
        }    
        else
        {
            alert('Enter all fields.');
        }
    }
    fetchTodos()
    {
        getTodos().then(result => {
            this.allTodos = result;
        }).catch(error => {
            alert('error at getTodos()');
        });
    }

    get upcomingTask()
    {
        return this.allTodos && this.allTodos.length 
                ? this.allTodos.filter(row => !row.Status__c)
                : [] ;
    }
    get completedTask()
    {
        return this.allTodos && this.allTodos.length ?
            this.allTodos.filter(row => row.Status__c) :
            [];
    }

    handleUpdate()
    {
        this.fetchTodos();
    }

    handleDelete()
    {
        this.fetchTodos();
    }

    connectedCallback()
    {
        this.fetchTodos();
    }
}