import { LightningElement } from 'lwc';

export default class LifeCycleParent extends LightningElement {

    constructor()
    {
        super();
        console.log('parent constructor');

    }
    connectedCallback()
    {
        console.log('parent connected call back');
    }
    renderedCallback()
    {
        console.log('cparent rendered callback');
    }
    disconnectedCallback()
    {
        console.log('parent disconnected callback');
    }
}