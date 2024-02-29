import { LightningElement, api } from 'lwc';
import getPicklistValues from "@salesforce/apex/SudipAccountData.getPicklistValues";

export default class SudipSkillSetCell extends LightningElement {
    @api action;
    @api uniqueId;
    isModalOpen = false;
    selectedValues = false;
    options = [];
    selectedOptions = [];
    showButton = true;
    showEdit = false;
    editButtonClicked = false;
    //
    prevSelectedValues = [];
    //



    connectedCallback() {


        console.log('this.action from cell : ' + this.action);
        console.log('this.uniqueId from cell : ' + this.uniqueId);

        getPicklistValues()
            .then((result) => {

                this.picklistValues = result.skillSetOptions;
                console.log('picklist values :', JSON.stringify(this.picklistValues));
                this.options = this.picklistValues;

            })
            .catch((error) => {
                console.error("error occurred--" + error);
            });

        // this.uniqueId =  

    }

    get isEditMode() {
        if (this.action == 'EDIT') {
            return true;
        }
        else {
            return false;
        }
    }

    handleAddSkills() {
        this.showButton = false;
        this.isModalOpen = true;
        this.selectedValues = false;
        console.log('Modal opening!!');
    }

    handleSkillChange(event) {
        this.selectedOptions = event.detail.value;
        console.log('Selected values =>  ' + this.selectedOptions);



        this.prevSelectedValues = this.selectedOptions;
        console.log('prevSelectedValues  =>  ' + this.prevSelectedValues);


    }

    cancelSelection() {

        this.isModalOpen = false;
        this.showButton = true;
        this.prevSelectedValues = this.selectedOptions;
        this.selectedValues = true;


        if (this.showEdit) {
            this.showButton = false;

        }

        else if (this.showButton) {
            this.selectedValues = false;
        }

        console.log('PREVIOUSLY SELECTED VALUES : ' + this.prevSelectedValues);

    }

    saveSelection(event) {
        // sending custom event with Id, selectedValues to parent
        console.log('Account ID =>' + this.uniqueId);
        console.log('Selected values to be passed=>  ' + this.selectedOptions);

        //need to send account ID and selectedValues 
        const dataBundle = {Id: this.uniqueId, newSource: this.selectedOptions};

        console.log('FINAL DATA SENDING ::>'+JSON.stringify(dataBundle));

        const sendData = new CustomEvent('passdata', {bubbles: true , composed : true,  detail: dataBundle });
        this.dispatchEvent(sendData);



        this.showButton = false;
        this.isModalOpen = false;
        this.selectedValues = true;
        this.showEdit = true;

    }
    handleEditClick() {
        this.selectedValues = false;
        this.showButton = false;
        this.isModalOpen = true;
        this.editButtonClicked = true;

    }

    hideSelectionModal()
    {
        this.isModalOpen = false;
    }
}