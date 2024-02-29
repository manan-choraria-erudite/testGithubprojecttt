import { LightningElement } from 'lwc';
export default class EwSignTabNavigation extends LightningElement {

    completed = false;
    pending = false;
    expiring = false;
    rejected = false;


    completedfun()
    {
        console.log("Completed called");
        console.log("this.completed before : "+this.completed);
         this.completed = true;
         this.pending = false;
         this.expiring= false;
         this. rejected = false;
         console.log("this.completed after : "+this.completed);
       
    }
     pendingfun()
    {
        console.log("Pending called");
        console.log("this.pending before : "+this.pending);
         this.completed = false;
         this.pending = true;
         this.expiring= false;
         this. rejected = false;
         console.log("this.pending after : "+this.pending);
       
    }
     expiringfun()
    {
        console.log("expiring called");
        console.log("this.expiring before : "+this.expiring);
         this.completed = false;
         this.pending = false;
         this.expiring= true;
         this. rejected = false;
         console.log("this.expiring after : "+this.expiring);
       
    }
     rejectedfun()
    {
        console.log("rejected called");
        console.log("this.rejected before : "+this.rejected);
         this.completed = false;
         this.pending = false;
         this.expiring= false;
         this. rejected = true;
         console.log("this.rejected after : "+this.rejected);
       
    }

}