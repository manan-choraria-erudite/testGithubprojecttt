import { LightningElement } from 'lwc';
export default class Picklist extends LightningElement {

   options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
handleChange(event)
{
    console.log('Value changed');
}
}