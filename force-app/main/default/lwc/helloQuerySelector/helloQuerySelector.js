import { LightningElement } from 'lwc';

export default class HelloQuerySelector extends LightningElement {

    usernames = ["John","Smith","Ganta","Others"];
    fetchDetailsHandler()
    {
        let elm = this.template.querySelector('h1');
        elm.style.border = '1px solid blue'; 
        console.log(elm.innerText);

        let elm1 = this.template.querySelectorAll('.name');
        Array.from(elm1).forEach(item=>{
            console.log(item.innerText);
            item.setAttribute("title","This is something new!!");
        })

        //lwc:dom = 'manual'

        const childElem = this.template.querySelector('.child');
        childElem.innerHTML = '<p> Hey this is from child</p>';
    }
}