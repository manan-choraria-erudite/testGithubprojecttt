import { LightningElement, api } from 'lwc';
import lookUpSearch from "@salesforce/apex/CustomLookupSearchController.lookUpSearch";
export default class LookupField extends LightningElement {
  @api objName;
    @api iconName;
    @api sourceObj;
    @api searchPlaceholder='Search';
    isValSelect;
    selectedValue;
    searchValue;
    optionsToDisplay;
    blurTimeout;
    Class = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';

    // @wire(lookUpSearch, {searchValue : '$searchValue', objectLabel : '$objName', sourceObject :'$sourceObj', forAssistant: '$forAssistant'})
    // wiredRecords({ error, data }) {
    //     if (data) {
    //         console.log('data-rec-' + data);
    //         this.error = undefined;
    //         this.optionsToDisplay = data;
    //     } else if (error) {
    //         this.error = error;
    //         this.optionsToDisplay = undefined;
    //     }
    // }

    connectedCallback(){
        this.getData();
    }

    async getData(){
        await lookUpSearch({searchValue : this.searchValue, objectLabel : this.objName, sourceObject :this.sourceObj, forAssistant: this.forAssistant})
        .then(data=>{

                console.log('data-rec-' + JSON.stringify(data));
                this.error = undefined;
                this.optionsToDisplay = data;
            
        })
    }

    blurtime(){
        this.blurTimeout = setTimeout(() =>  {this.Class = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 400);
    }

    optionsClickHandler(event){
        let Id = event.currentTarget.dataset.id;
        let Name = event.currentTarget.dataset.name;
        const selectedEvent = new CustomEvent('lookup', { 
            detail: {
                data : {
                    id          : Id,
                    name        : Name,
                }
            }
        });
        this.dispatchEvent(selectedEvent);
        this.selectedValue = Name;
        this.isValSelect = true;   
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }     
        this.Class = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }

    handleOnChange(event){
        this.searchValue = event.target.value;
    }

    handleOnClick(){
        this.searchValue = '';
        this.Class = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    handleRemove(){
        this.isValSelect = false;
    }
}