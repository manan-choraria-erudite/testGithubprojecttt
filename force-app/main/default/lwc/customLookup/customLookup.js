import { LightningElement,wire,api,track } from 'lwc';
import getResults from '@salesforce/apex/lwcCustomLookupController.getResults';
import getContactName from '@salesforce/apex/logEventController.getContactName';

export default class LwcCustomLookup extends LightningElement {
    @api customNameField;
    @api searchedEmail;
    @api customLabel='Name';
    @api objectName = 'Contact';
    @api fieldName = 'Email';
    @api selectRecordId = '';
    @api selectRecordName;
    @api Label;
    @api searchRecords = [];
    @api required = false;
    @api iconName = 'standard:contact';
    @api LoadingText = false;
    @track txtclassname = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    @track messageFlag = false;
    @track iconFlag =  false;
    @track clearIconFlag = true;
    @track inputReadOnly = false;
    @track typeInput=false;
    @track isSelectionCombo=false;
    @track focusClass='slds-input slds-combobox__input slds-has-focus';
   
   @wire(getResults,{ObjectName:'$objectName', fieldName: '$fieldName', value: '$searchedEmail',customNameField:'$customNameField'})
   getSearchValues({error,data}){
       if(data){
           if(this.searchedEmail=='none'){
               this.resetData();
           }
           else{
               if(data.length>0){
            this.typeInput=false;
           console.log('data'+data);
           this.searchRecords= data;
            this.LoadingText = false;
            
            this.txtclassname =  data.length > 0 ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            if(this.searchedEmail.length > 0 && data.length == 0) {
                this.messageFlag = true;
            }
            else {
                this.messageFlag = false;
            }
            this.selectRecordId=data[0].recId;
            this.selectRecordName=data[0].recName;

            if(this.selectRecordId != null && this.selectRecordId.length > 0) {
                this.iconFlag = false;
                this.clearIconFlag = true;
            }
            else {
                this.iconFlag = true;
                this.clearIconFlag = false;
            }
            this.isSelectionCombo=false;
            this.txtclassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
       }
           }
       if(this.objectName!='contact'){
       const idSelected=new CustomEvent('idselected',{detail:this.selectRecordId});
       this.dispatchEvent(idSelected);
       }
       }
       else if(error){
        console.log('this.email'+this.searchedEmail);
          console.log('-------error-------------'+JSON.stringify(error)); 
       }
   }

@wire(getContactName,{conId:'$selectRecordId'})
conNameResult({error,data}){
    if(data){
        this.selectRecordName=data;
        if(this.searchedEmail=='none'){
            this.resetData();
        }
        else{
         this.typeInput=false;
         this.LoadingText = false;    
            this.txtclassname =  data.length > 0 ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            if(this.searchedEmail.length > 0 && data.length == 0) {
                this.messageFlag = true;
            }
            else {
                this.messageFlag = false;
            }
            if(this.selectRecordId != null && this.selectRecordId.length > 0) {
                this.iconFlag = false;
                this.clearIconFlag = true;
            }
            else {
                this.iconFlag = true;
                this.clearIconFlag = false;
            }
            this.isSelectionCombo=false;
            this.txtclassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        }
            //this.selectRecordId=data[0].recId;
    }
    else if(error){
        console.log('---error---'+JSON.stringify(error));
    }
}
   handleBlur(event){
       setTimeout(()=>{
           console.log('event'+JSON.stringify(event));
            this.isSelectionCombo=false;
            this.txtclassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            this.focusClass="slds-input slds-combobox__input";
       },500);
       
   }
    searchField(event) {
        this.isSelectionCombo=true;
        var currentText = event.target.value;
        this.LoadingText = true;
        
        getResults({ ObjectName: this.objectName, fieldName: this.customNameField, value: currentText,customNameField:this.customNameField})
        .then(result => {
            this.searchRecords= result;
            this.LoadingText = false;
            
            this.txtclassname =  result.length > 0 ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            if(currentText.length > 0 && result.length == 0) {
                this.messageFlag = true;
            }
            else {
                this.messageFlag = false;
            }

            if(this.selectRecordId != null && this.selectRecordId.length > 0) {
                this.iconFlag = false;
                this.clearIconFlag = true;
            }
            else {
                this.iconFlag = true;
                this.clearIconFlag = false;
            }
        })
        .catch(error => {
            console.log('error-------------'+error);
            console.log(error);
        });
        
    }
    
   setSelectedRecord(event) {
       console.log('Entered');
        var currentRecId = event.currentTarget.dataset.id;
        var selectName = event.currentTarget.dataset.name;
        console.log('selectName'+selectName);
        this.selectRecordName = event.currentTarget.dataset.name;
        console.log('selectedRecordName'+this.selectRecordName);
        this.selectRecordId = currentRecId;
        this.inputReadOnly = true;
        // const selectedEvent = new CustomEvent('selected', { detail: {selectName, currentRecId}, });
        // // Dispatches the event.
        // this.dispatchEvent(selectedEvent);
        this.typeInput=false;
        this.isSelectionCombo=false;
        this.txtclassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        this.iconFlag = false;
        this.clearIconFlag = true;
        if(this.objectName!='contact'){
        const idSelected=new CustomEvent('idselected',{detail:this.selectRecordId});
        this.dispatchEvent(idSelected);
        }
    }
    
    resetData(event) {
        this.typeInput=true;
        this.txtclassname='slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open';
        this.selectRecordName = "";
        this.selectRecordId = "";
        this.inputReadOnly = false;
        this.iconFlag = true;
        this.clearIconFlag = false;
        const idSelected=new CustomEvent('idselected',{detail:undefined});
        this.dispatchEvent(idSelected);
    }

}