import { api, LightningElement } from 'lwc';
import updateTodo from '@salesforce/apex/ToDo_Apex.updateTodo';
import deleteTodo from '@salesforce/apex/ToDo_Apex.deleteTodo';

export default class ItemTodo extends LightningElement 
{
    @api todoId;
    @api todoName;
    @api todoType;
    @api todoStatus = false;

    get containerClass() {
        return this.todoStatus ? 'todo completed' : 'todo upcoming'
    }

    get iconName() {
        return this.todoStatus ? 'utility:check' : 'utility:add'
    }

    updateHandler()
    {
        updateTodo({
            tId : this.todoId ,
            status : !this.todoStatus
        }).then(result => {
            console.log('updated.');
            let updateEvt = new CustomEvent('update');
            this.dispatchEvent(updateEvt);
        }).catch(error => {
            alert('error at updateTodo in itemTodoJS');
        });
    }
    deleteHandler()
    {
        deleteTodo({
            tId : this.todoId
        }).then(result => {
            console.log('deleted.');
            let deleteEvt = new CustomEvent('delete');
            this.dispatchEvent(deleteEvt);
        }).catch(error => {
            alert('error at deleteTodo in itemTodoJS');
        });
    }
}