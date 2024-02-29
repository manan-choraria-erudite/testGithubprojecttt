import { LightningElement } from 'lwc';
import getPicklistValues from "@salesforce/apex/SudipAccountData.getPicklistValues";
import getPicklistValuesForCombo from "@salesforce/apex/getAccountSourcePicklist.getPicklistValuesForCombo";

export default class Pick extends LightningElement {
options = [];
status;
 showHelpText = false;
  htmlHelpText = "<p>This is the help text which is used</p><br>" +
                 "<p>to guide you for this psecific field</p><br>";

  connectedCallback() {
        // this.fetchPicklistValues();
          getPicklistValuesForCombo()
            .then((result) => {

                this.picklistValues = result.status;
                console.log('Hello !@!@!@! picklist values for status:', JSON.stringify(this.picklistValues));
                this.options = this.picklistValues;

            })
            .catch((error) => {
                console.error("error occurred--" + error);
            });
    }
//    options = [
//         { label: 'Option 1', value: 'option1' },
//         { label: 'Option 2', value: 'option2' },
//         { label: 'Option 3', value: 'option3' },
//     ];
handleChange(event)
{
    console.log('event.target.value status :'+event.target.value);
    this.status = event.target.value;
    this.dispatchEvent(new CustomEvent('statuschanged', {
            detail: {
                data: { status: this.status }
            }
        }));
        console.log('event dispatched from pick with status::>>'+this.status);
}

// fetchPicklistValues() {
    // getPicklistValues({ objectName: 'Account', fieldName: 'AccountSource' })
    //     .then((result) => {
    //         let dataList = result.accData;
    //         dataList.map(data => {
    //             data.action = this.action;  
    //         })
            
    //         this.dataList = dataList;
    //         this.picklistValues = result.skillSetOptions;
    //         this.options =  this.picklistValues;
    //         console.log('@$##^%$^%#$FINAL RESULT :'+JSON.stringify(result));
    //         console.log('1$#%#^$^#$@Getting dataList :',JSON.stringify(this.dataList));   
    //         console.log('@!$#%$^#%^@!picklist values :',JSON.stringify(this.picklistValues));   
            
    //     })
    //     .catch((error) => {
    //         console.error("error occurred--" + error);
    //     });
// }


 handleClickHelp() {
        console.log('handleClickHelp--');

        this.showHelpText = !this.showHelpText;
    }

}