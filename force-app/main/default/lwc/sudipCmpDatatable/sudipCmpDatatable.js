import LightningDatatable from 'lightning/datatable';
import subComponent from './subComponent.html';
import lookupColumn from './lookupColumn.html';
import pick from './pick.html';

export default class SudipCmpDatatable extends LightningDatatable {

       static customTypes = {
        skillSetColumn: {
            template: subComponent,
            standardCellLayout: true,
            typeAttributes: ['action', 'uniqueId']
        },
        // lookupColumn:{
        //     template: lookupColumn,
        //     standardCellLayout: true,
        //     typeAttributes: ['objName','iconName','sourceObj']
        // },
        lookupColumn: {
            template: lookupColumn,
            standardCellLayout: true,
            typeAttributes: ['value', 'fieldName', 'object', 'context', 'name', 'fields', 'target']
        },

         pick: {
            template: pick,
            standardCellLayout: true,
        }


       

    };


    handlePassedData()
    {
        console.log("Getting data to sudipCmpDatatable component from cell component:"+event.detail);
        console.log("Getting data to sudipCmpDatatable component from cell component:"+JSON.stringify(event.detail));

    }


}