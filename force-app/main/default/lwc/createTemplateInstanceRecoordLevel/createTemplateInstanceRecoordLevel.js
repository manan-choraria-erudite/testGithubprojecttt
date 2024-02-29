import { LightningElement } from 'lwc';
export default class CreateTemplateInstanceRecoordLevel extends LightningElement {


  
// 


    menuLabel(event) {
        this.fetchInstance();
        console.log('fetch instance called : ');
        this.selectedlabel = event.currentTarget.label;
        console.log('Selected label : ' + this.selectedlabel);


        if (this.selectedlabel == 'Preview') 
        {
            console.log('Preview is selected');
            this.showPreview = true;
           // this.pdfURL = `${ewSignServerURL}/fetchPdfWithCoordinates?uuid=${this.selectedValueUUID}&uuid_template_instance=${this.selectedValueUUID}`;
            console.log("PDFURL:" + this.pdfURL);
        }

        else if (this.selectedlabel == 'Audit Trail') 
        {
            console.log('Audit Trail is selected');
            this.showAuditLogs = true;
        }

        else if (this.selectedlabel == 'Send Reminder') 
        {
            console.log('Send Reminder is selected');
            this.showSendReminder = true;
        }


    }

// custom tab starts

// isFirstTabActive = true;
// isSecondTabActive = false;
    
//     get firstTabClass() {
//         return this.isFirstTabActive ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item';
//     }

//     get secondTabClass() {
//         return this.isSecondTabActive ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item';
//     }

//     get firstTabContentClass() {
//         return this.isFirstTabActive ? 'slds-tabs_default__content slds-show' : 'slds-tabs_default__content slds-hide';
//     }

//     get secondTabContentClass() {
//         return this.isSecondTabActive ? 'slds-tabs_default__content slds-show' : 'slds-tabs_default__content slds-hide';
//     }

 
// handleTabClick(event) {
//     const clickedTab = event.target.getAttribute('data-tab');
//     if (clickedTab === '1') {
//         this.isFirstTabActive = true;
//         this.isSecondTabActive = false;
//     } else if (clickedTab === '2') {
//         this.isFirstTabActive = false;
//         this.isSecondTabActive = true;
//     }
// }

//custom tab ends
}