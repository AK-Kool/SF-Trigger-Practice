import { LightningElement, api } from 'lwc';

export default class LifeCycleChild extends LightningElement {
    
    @api session ='UI';

    constructor()
    {
        super();
        console.log('child constructor');

    }
    connectedCallback()
    {
        console.log('child connected call back');
    }
    renderedCallback()
    {
        console.log('child rendered callback');
    }
    disconnectedCallback()
    {
        console.log('child disconnected callback');
    }

}