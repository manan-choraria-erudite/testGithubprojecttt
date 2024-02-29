import { LightningElement } from 'lwc';
export default class Tab extends LightningElement {


// custom tab starts

isFirstTabActive = true;
isSecondTabActive = false;
    
    // get firstTabClass() {
    //     return this.isFirstTabActive ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item';
    // }

    // get secondTabClass() {
    //     return this.isSecondTabActive ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item';
    // }

    // get firstTabContentClass() {
    //     return this.isFirstTabActive ? 'slds-tabs_default__content slds-show' : 'slds-tabs_default__content slds-hide';
    // }

    // get secondTabContentClass() {
    //     return this.isSecondTabActive ? 'slds-tabs_default__content slds-show' : 'slds-tabs_default__content slds-hide';
    // }

 
handleTabClick(event) {
    const clickedTab = event.target.getAttribute('data-tab');
    if (clickedTab === '1') 
    {
        this.isFirstTabActive = true;
        this.isSecondTabActive = false;
    } else if (clickedTab === '2')
     {
        this.isFirstTabActive = false;
        this.isSecondTabActive = true;
    }
}

//custom tab ends

}