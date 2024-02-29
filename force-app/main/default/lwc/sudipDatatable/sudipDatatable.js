import getPicklistValues from "@salesforce/apex/SudipAccountData.getPicklistValues";

const columns = [
{
            label: 'Name',
            fieldName: 'Name',
            type: 'text'
        },
        {
            label: 'Skill Set',
            fieldName: 'id',
            type: 'skillSetColumn',
            typeAttributes: {
                action: 'ADD',
            }
        },
];

export default class SudipDatatable extends LightningElement {
dataList = [];
picklistValues = [];
columns = columns;

    connectedCallback() {
     getPicklistValues()
        .then((result) => {
            this.dataList = result.accData;
            this.picklistValues = result.skillSetOptions;
            console.log('FINAL RESULT :'+JSON.stringify(result));
            console.log('Getting dataList :',JSON.stringify(this.dataList));   
            console.log('picklist values :',JSON.stringify(this.picklistValues));    
        })
        .catch((error) => {
          console.error("error occurred--" + error);
        });
    
    }

}