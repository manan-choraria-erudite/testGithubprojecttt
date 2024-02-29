import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { CloseActionScreenEvent } from 'lightning/actions';
// import { CloseActionScreenEvent } from 'lightning/platformShowToastEvent';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateRecord from '@salesforce/apex/updateRecordFromLWC.updateRecord';

export default class InputLWC extends LightningElement {
    @api recordId;
    // ///////////////////////////////////////////////
    @wire(getRecord, { recordId: '$recordId', fields: ['Enrollment_Application__c.Stage__c', 'Enrollment_Application__c.Total_Incentive__c'] }) record;
    // ///////////////////////////////////////////////

    // values to be used in apex

    selectedStage;
    selectedStatus;
    // values to be used in apex
    show;
    New;
    Submitted;
    Paid;
    Rejected = false;
    rejectedValue = '';

    get picklistOptions1() {
        return [
            { label: 'New', value: 'New' },
            { label: 'Submitted', value: 'Submitted' },
            { label: 'Paid', value: 'Paid' },
            { label: 'Rejected', value: 'Rejected' },
        ];
    }

    get picklistOptions2() {
        return [
            { label: 'Draft', value: 'Draft' },
        ];
    }
    get picklistOptions3() {
        return [
            { label: 'Need More Information', value: 'Need More Information' },
            { label: 'Submitted', value: 'Submitted' },
        ];
    }
    get picklistOptions4() {
        return [
            { label: 'Complete', value: 'Complete' },
            { label: 'Paid', value: 'Paid' },
        ];
    }

    StageChange(event) {
        this.selectedStage = event.detail.value;

        if (this.selectedStage === 'New') {
            this.New = true;
            this.Submitted = false;
            this.Paid = false;
            this.Rejected = false;
        }
        if (this.selectedStage === 'Submitted') {
            this.Submitted = true;
            this.Paid = false;
            this.New = false;
            this.Rejected = false;
        }
        if (this.selectedStage === 'Paid') {
            this.Paid = true;
            this.New = false;
            this.Submitted = false;
            this.Rejected = false;
        }
        if (this.selectedStage === 'Rejected') {
            this.Paid = false;
            this.New = false;
            this.Submitted = false;
            this.Rejected = true;
        }
    }

    StatusChange(event) {
        this.selectedStatus = event.detail.value;
        this.show = true;
    }

    handleRejected(event) {
        this.rejectedValue = event.target.value;
        this.Paid = false;
        this.New = false;
        this.Submitted = false;
        this.Rejected = true;
        this.show = true;
    }

    handleClick() {
        updateRecord({ recordId: this.recordId, selectedStage: this.selectedStage, selectedStatus: this.selectedStatus, rejectedValue: this.rejectedValue })
            .then(result => {
                //Check if the record data is available
                if (this.record.data) {
                    const fieldData = this.record.data.fields;
                    const fieldValue = fieldData.Stage__c.value;
                    const totalIncentive = fieldData.Total_Incentive__c.value;

                    // Perform your validation
                    if (fieldValue === 'Paid' && totalIncentive === 0) {
                        const evt = new ShowToastEvent
                            ({
                                title: 'Warning',
                                message: 'Error occurred',
                                varient: 'Warning',
                                mode: 'dismissable'
                            });
                        this.dispatchEvent(evt);
                        return; // Stop further execution
                    }

                    console.log('RECORD NOT UPDATED');
                }
                else {
                    console.log('Record updated');
                }

            })



            .catch(error => {
                console.log('ERROR OCCURRED');
                console.log(error);
            });

        console.log('selectedStage: ' + this.selectedStage);
        console.log('selectedStatus: ' + this.selectedStatus);
        console.log('rejectedValue: ' + this.rejectedValue);
        this.dispatchEvent(new CloseActionScreenEvent());
    }



closeAction()
{
    this.dispatchEvent(new CloseActionScreenEvent());
}
//final close
}