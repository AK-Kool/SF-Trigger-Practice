import { LightningElement } from 'lwc';

export default class Looping extends LightningElement {
   carLst = ["ford","audi","maruti","Renault","Merc"];

   ceoLst = [
       {
           id:1,
           company:"Google",
           name:"Sundar Pichai"
       },
       {
           id:2,
           company:"Apple Inc",
           name:"Tim Cook"
       },
       {
           id:3,
           company:"Facebook",
           name:"Mark Zukerberg"
       },
       {
           id:4,
           company:"Amazon",
           name:"Jeff Bezos"
       },
   ]



}