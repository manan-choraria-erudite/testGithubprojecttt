import { LightningElement, api, track, wire } from 'lwc';
import getPicklistValues from "@salesforce/apex/SudipAccountData.getPicklistValues";

// import {loadStyle} from 'lightning/platformResourceLoader';
// import lwcDatatableStyle from '@salesforce/resourceUrl/lwcDatatableStyle';

const columns = [
{
            label: 'Name',
            fieldName: 'Name',
            type: 'text',
            wrapText:true,
            
        },
         {
            label: 'Button group',
            fieldName: 'id',
            type: 'lookupColumn',
            wrapText:true
        },
        {
            label: 'Skill Set',
            fieldName: 'id',
            type: 'skillSetColumn',
            wrapText:true,
            typeAttributes: {
                uniqueId: {fieldName: "Id"},    
                action: {fieldName: "action"},
            }
        },
//         {
//             label: 'Lookup Field',       
//             fieldName: 'id', 
//             type: 'lookupColumn', 
//             wrapText: true,
//             typeAttributes: {
                
//             objName: 'Contact',          
//             iconName: 'standard:contact',
//             sourceObj: 'Account'
          
               
//         }    
//    },


{
            label: 'Status',
            fieldName: 'id',
            type: 'pick',
            wrapText:true
        }





];
export default class SkillsCustomDatatable extends LightningElement {
    // @api action = 'ADD';
   @api action; 
   @api uniqueId;



    //get the action value from the buttonModalDatatable
    dataList = [];
picklistValues = [];
columns = columns;
    isRendered = false;
    isCssLoaded = false;



// 
 showSpinner = false;
    @track data = [];
    @track contactData;
    @track draftValues = [];
    lastSavedData = [];
// 




    connectedCallback() {}

    

        renderedCallback(){
            if(!this.isRendered) {
            
                getPicklistValues()
                .then((result) => {
                    let dataList = result.accData;
                    dataList.map(data => {
                        data.action = this.action;  
                    })
                    
                    this.dataList = dataList;
                    this.picklistValues = result.skillSetOptions;
                    console.log('FINAL RESULT :'+JSON.stringify(result));
                    console.log('Getting dataList :',JSON.stringify(this.dataList));   
                    console.log('picklist values :',JSON.stringify(this.picklistValues));   
                    
                })
                .catch((error) => {
                console.error("error occurred--" + error);
                });


                console.log('action value in skillsCustomDatatable ====>>>' +this.action);
                this.isRendered = true;
            }



            // for the custom css to wrap the table header label
        /*
            if(this.isCssLoaded){
                return
            } 
    
            this.isCssLoaded = true
    
            loadStyle(this, lwcDatatableStyle).then(()=>{
                console.log("Loaded Successfully");
            }).catch(error=>{ 
                console.log(error);
            });
        */
        }

    handleSaveSelectedSkills(event) {
        console.log(event.detail);
      
    }


}