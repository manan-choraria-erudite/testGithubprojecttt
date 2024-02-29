import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';

const columns = [
        {
            label: 'Account name',
            fieldName: 'Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Type',
            fieldName: 'Type',
            type: 'text',
            sortable: true
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',
            type: 'currency',
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone',
            sortable: true
        },
        {
            label: 'Website',
            fieldName: 'Website',
            type: 'url',
            sortable: true
        },
        {
            label: 'Rating',
            fieldName: 'Rating',
            type: 'text',
            sortable: true
        }

];

export default class SampleDatatable extends LightningElement {
    columns = columns;
   
    pageSizeOptions = [10, 25, 50, 75, 100];
    option =[{'label':'10', 'value':'10'},
    {'label':'25', 'value':'25'},
    {'label':'50', 'value':'50'},
    {'label':'75', 'value':'75'},
    {'label':'100', 'value':'100'}];
    pageSize = 10;
    accList = [];
    accListTemp = [];
    totalPage = 0;
    startingRecord = 1;
    endingRecord = 0;
    page = 1;
    isPreviousDisable = false;
    isNextDisable = false;

    @wire(getAccountList)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accList = data;
            // this.accListTemp = data;
            console.log("This is the data"+JSON.stringify(data));
            console.log("This is the data from accList"+JSON.stringify(this.accList));
            console.log("This is the data from accListTemp"+JSON.stringify(this.accListTemp));


        this.totalPage = Math.ceil(this.accList.length / this.pageSize);
        this.displayRecordPerPage(this.page);
       
        } else if (error) {
            console.log(error);
        }
    }

    handleRecordsPerPage(event) {
        this.pageSize = parseInt(event.target.value);
        this.totalPage = Math.ceil(this.accList.length / this.pageSize);
        this.page = 1;
        this.displayRecordPerPage(this.page);

        console.log("page size :" +this.pageSize);
         console.log("total page :" +this.totalPage);
    }

    previousHandler() {
        if (this.page > 1) {
            this.page--;
            this.displayRecordPerPage(this.page);
        }
    }

    nextHandler() {
        if (this.page < this.totalPage) {
            this.page++;
            this.displayRecordPerPage(this.page);
        }
    }

    displayRecordPerPage(page) {
        this.startingRecord = (page - 1) * this.pageSize;
        this.endingRecord = Math.min(this.startingRecord + this.pageSize - 1, this.accList.length - 1);
        this.isPreviousDisable = this.page === 1;
        this.isNextDisable = this.page === this.totalPage;
        console.log(this.accList);
        this.accListTemp = [];
        this.accListTemp = this.accList.slice(this.startingRecord, this.endingRecord + 1);
        console.log("ACCLISTTEMP: ===" + JSON.stringify(this.accListTemp));
        console.log("ACCLISTTEMP: ===" + typeof(this.accListTemp));
    }
}