import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateAccountSourceById from "@salesforce/apex/updateRecordField.updateAccountSourceById";


export default class ButtonModalDatatable extends LightningElement {

    action;
    showModal = false;
    accountId;
    status;
    newSource = [];



    openAddModal() {
        this.action = 'ADD';
        this.showModal = true;
    }

    openEditModal() {
        this.action = 'EDIT';
        this.showModal = true;
    }

    hideModalBox() {
        this.showModal = false;
    }

    handlePassData(event) {
        // Access the data sent from the child component
        const receivedData = event.detail;
        console.log('Data received from Child Component:', receivedData);


    }



    accIdTemp = null;

    connectedCallback() {

        document.addEventListener('passdata', (event) => {
            console.log('Recieved ID from custom event :' + event.detail.Id);
            console.log('Recieved newSource from custom event :' + event.detail.newSource);

            this.accountId = event.detail.Id;
            this.newSource = event.detail.newSource;
            this.status = event.detail.status;

            this.accIdTemp = this.accountId != null && this.accountId != undefined && this.accountId != '' ? this.accountId : 'test';

            console.log('this.accountId : ' + this.accountId);
            console.log('this.newSource : ' + this.newSource);

        });


            document.addEventListener('statuschanged', (event) => {
            console.log('Recieved status from custom event :' + event.detail.status);
            this.status = event.detail.status;
            console.log('this.status recieved: ' + this.status);

        });       
    }


    handleSave(event) {

        console.log('Received custom event:', JSON.stringify(event.detail));
        console.log('this.accountId : ' + this.accountId);
        console.log(' this.accIdTemp : ', this.accIdTemp);
        console.log('this.newSource : ' + this.newSource.toString());


 document.addEventListener('statuschanged', (event) => {
            console.log('Recieved status from custom event :' + event.detail.status);
            this.status = event.detail.status;
            console.log('this.status recieved Finally: ' + this.status);

        });   

        //require Id and newSource
        updateAccountSourceById({ accountId: this.accountId, newSource: this.newSource.toString(), status: this.status })
            .then(result => {
                console.log('Apex method executed successfully:', result);
                //if successful then show the success toast message

              
                    const toastEvent = new ShowToastEvent({
                        title: 'Success',
                        message: 'Data updated successfully',
                        variant: 'success',
                    });
                    this.dispatchEvent(toastEvent);
           

                //if successfully executed then clode the modal 
                 this.showModal = false;
            })
            .catch(error => {
                console.error('Error calling Apex method:', error);
            });
    }




    showToastMessage(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }




}