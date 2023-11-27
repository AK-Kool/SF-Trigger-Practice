import { api, LightningElement } from 'lwc';

export default class ShowCasesMain extends LightningElement 
{
    @api recordId;
    isOpen = false;
    isFooterVisible = false;

    connectedCallback()
    {
        this.isFooterVisible = true;
    }

    handleClick()
    {
        this.isOpen = true;
    }
    handleCancel()
    {
        this.isOpen = false;
    }
    handleHideFooter()
    {
        this.isFooterVisible = false;
    }
    handleShowFooter(){
        this.isFooterVisible = true;
    }
}