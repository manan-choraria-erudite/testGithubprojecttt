import { LightningElement,api,track } from 'lwc';
import deleteEvent from '@salesforce/apex/logEventController.deleteEvent';
import fetchEvents from '@salesforce/apex/logEventController.fetchEvents';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class LogEventParent extends LightningElement {
    @track eventList
    @api flexipageRegionWidth;
    startDate;
    endDate;
    Attendes;
    @api messageBody;
    //organizer;
    @api dates;
    @api people;
    @api subject;
    @api location;
    @api source;
    @track eventId;
    isButton=true;
    isChild=false;
    isSave=true;
    isEdit=false;
    @track hasRendered=false;
    isMultipleEvents=false;

    connectedCallback() {
        this.startDate=this.dates.start;
        this.endDate=this.dates.end;
        // for(i=0;i<this.people.requiredAttendees.length;i++){
        //     this.Attendes.push(this.people.requiredAttendees[i].email);
        // }
        // for(i=0;i<this.people.optionalAttendees.length;i++){
        //     this.Attendes.push(this.people.optionalAttendees[i].email);
        // }
        console.log('this.people'+JSON.stringify(this.people));
        if(this.people.requiredAttendees.length>0){
        console.log('this.people'+JSON.stringify(this.people));
        this.Attendes=this.people.requiredAttendees[0].email;
        console.log('this.startDate'+this.Attendes);
        }
        else{
            this.Attendes='none';
        }
        // if(Object.keysthis.people.organizer.keys.length>0){
        //     console.log('this.people'+JSON.stringify(this.people));
        //     this.organizer=this.people.organizer[0].email;
        //     console.log('this.startDate'+this.Attendes);
        //     }
        //     else{
        //         this.organizer='none';
        //     }
    }
    handalClickTest(event){
        this.eventId=event.target.value;
        console.log('test click'+this.eventId);
    }
    handalEditClick(event){
        this.isMultipleEvents=false;
        this.isButton=false;
        this.isChild=true;
    }
    handleDelete(event){
        deleteEvent({eventId:this.eventId})
        .then(Result=>{
            this.isEdit=false;
            this.isSave=true;
            const event = new ShowToastEvent({
                title: 'Event Deleted',
                message:'Your Event record is deleted successfully',
                variant:'success'
            });
            this.dispatchEvent(event);
        })
        .catch(Error=>{
            console.log('ERRor'+Error);
        })
    }
    handleSaveData(event){
        this.eventId=event.detail;
        this.isSave=false;
        this.isEdit=true;
        this.isButton=true;
        this.isChild=false;
        this.hasRendered=false;
    }
    renderedCallback(){
        var oldStartDate=this.startDate;
        var oldEndDate=this.endDate;
        var oldAttendes=this.Attendes;
        var isAttendeeChanged=true;
        if(this.people.requiredAttendees.length>0 && oldAttendes==this.people.requiredAttendees[0].email){
            console.log('Error in this part');
            isAttendeeChanged=false;
        } 
        if(this.hasRendered == false || oldStartDate!=this.dates.start || oldEndDate!=this.dates.end || isAttendeeChanged){
            this.startDate=this.dates.start;
            this.endDate=this.dates.end;
            console.log('-this.startDate- '+this.startDate);
            console.log('-this.endDate- '+this.endDate);
            console.log('this.people'+JSON.stringify(this.people));
            if(this.people.requiredAttendees.length>0){
            console.log('this.people'+JSON.stringify(this.people));
            this.Attendes=this.people.requiredAttendees[0].email;
            }
            else{
                this.Attendes='none';
            }
            
            console.log('@@@ PARENT: DATES: '+ JSON.stringify(this.dates));
            console.log('@@@ messageBody'+this.messageBody);
            console.log('this.subject'+this.subject);
            console.log('this.eventId'+this.eventId);
            if(this.subject != null && this.startDate != null && this.endDate != null){
                this.fetchEventsBasedOnDifferentValues(this.subject, this.startDate, this.endDate,this.hasRendered);
            }
            this.hasRendered=true;
            
        }
    }   

    fetchEventsBasedOnDifferentValues(subejct, startDate, endDate,rendered){
        if(rendered==false){
        fetchEvents({subject: subejct, StartDateTime: startDate, EndDateTime: endDate})
        .then(result => {
            console.log('@@result '+JSON.stringify(result))
            if(result != null && result.length > 0){
                if(result.length == 1){
                    this.eventId=result[0].evtId;
                    this.isSave=false;
                    this.isEdit=true;
                    this.isButton=true;
                    this.isChild=false;
                }
                else{
                    this.isButton=false;
                    this.isChild=false;
                    this.eventList=result;
                    this.isMultipleEvents=true;
                }
                
            }
        }).catch(error => {
            console.log('ERRor'+JSON.stringify(error));
        })
    }
    }
    handleClick(event){
        this.startDate=this.dates.start;
        this.endDate=this.dates.end;
        this.isButton=false;
        this.isChild=true;
        
        console.log('startDate'+this.startDate);
        console.log('endDate'+this.endDate);
    }
    handleModalClose(event){
        this.isButton=true;
        this.isChild=false;
        this.hasRendered=false;
    }
    // renderedCallback(){
    //     this.startDate=this.dates.start;
    //     this.endDate=this.dates.end;
    //     console.log('this.startDate'+this.startDate);
    // }
}