import {LightningElement, api,track,wire} from 'lwc';
import saveData from '@salesforce/apex/logEventController.saveData';
import getEventData from '@salesforce/apex/logEventController.getEventData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getResults from '@salesforce/apex/lwcCustomLookupController.getResults';
import getPickListValues from '@salesforce/apex/PicklistController.getPickListValues';
//import getFieldLabel from '@salesforce/apex/PicklistController.getFieldLabel';

export default class SampleEmailAppPane extends LightningElement {
    @track selectedLabel;
    @track attendeeOptions=[];
    @track SetByOptions;
    @track selectedSetBy;
    @track EventTypeoptions;
    @track isPicklistDisabled=false;
    @track isAttributeRequired=false;
    @track selectedEvent; 
    isLoader=false;
    @api messageBody;
    @api subject;
    @track isAllDay=false;
    // @api people;
    @api id;
    @api itemId;
    @api emailId;
    //@api eventId;
    @api startDate;
    @api endDate;
    @api isRender=false;
    @api dates;
    @api attendee='';
    @api eventId;
    @track attendeeId;
    @track attendeeName;
    @track relatedToId;
    @track assignedToId;
    assignedTo='Not None';
    handleCheckboxChange(event){
        this.isAllDay=event.target.checked;
        console.log('Checkedddd'+this.isAllDay);
    }
    selectionChangeHandler(event){
        this.selectedEvent=event.target.value;
        //this.selectedLabel=event.target.label;
    }
    selectionSetByChangeHandler(event){
        this.selectedSetBy=event.target.value;
    }
    handleRadioChange(event){
        console.log('event.detail'+JSON.stringify(event.detail));
        this.attendeeId=event.detail.value;
        //var selectedLabel=
        //console.log('eventDetail'+event.target);
        //this.attendeeName=event.detail.label;
    }
    connectedCallback() {
        this.isLoader=true;
        console.log('startDateChild'+this.startDate);
        console.log('@@ CHILD: '+ JSON.stringify(this.dates));
        console.log('Message Body'+this.messageBody);
        getPickListValues({objApiName:'Event',fieldName:'Type'})
        .then(data => {
            this.EventTypeoptions = data;
        })
        .catch(error => {
            this.displayError(error);
        });
        getPickListValues({objApiName:'Event',fieldName:'Meeting_Set_By__c'})
        .then(data => {
            this.SetByOptions = data;
        })
        .catch(error => {
            console.log('Error'+error);
        });
        setTimeout(()=>{
        if(this.eventId!=null&&this.eventId!==undefined){
            getEventData({eventId:this.eventId})
            .then(result=>{
                console.log('@@@@@data'+JSON.stringify(result));
                this.subject=result.Subject;
                this.startDate=result.StartDateTime;
                console.log('Start Date'+this.startDate);
                this.endDate=result.EndDateTime;
                this.messageBody=result.Description;
                this.isAllDay=result.IsAllDayEvent;
                this.attendeeId=result.WhoId;
                this.relatedToId=result.WhatId;
                this.assignedToId=result.ownerId;
                this.selectedSetBy=result.MeetingSetByC;
                this.selectedEvent=result.Type;
                this.attendee=result.attendeeEmail;

                if(this.selectedEvent){
                var event=this.template.querySelector('[data-id="event_type"]');
                console.log(event);
                console.log(this.selectedEvent);
                event.value=this.selectedEvent;
                }

                if(this.selectedSetBy){
                var setBy=this.template.querySelector('[data-id="set_by"]');
                console.log(setBy);
                console.log(this.selectedSetBy);
                setBy.value=this.selectedSetBy;
                
                }
                this.isLoader=false;
                // this.SetByOptions.forEach(item => {
                //     if(item.value==this.selectedEvent){
                //         item.selected='selected';
                //     }
                // })
                // this.EventTypeoptions.forEach(item => {
                //     if(item.value==this.selectedSetBy){
                //         item.selected='selected';
                //     }
                // })
                
            })
            .catch(Error=>{
                console.log('@@@Parent Error----'+Error);
            })
        }
        else{
            this.isLoader=false;
        }},500);
    }
    handleStartDateChange(event){
        this.startDate=event.target.value;
        console.log('this.startDate'+this.startDate);
    }
    handleEndDateChange(event){
        this.endDate=event.target.value;
    }
    @wire(getResults,{ObjectName:'contact',fieldName:'Email',value:'$attendee',customNameField:'Name'})
    attendeeResults({error,data}){
        if(data){
            console.log('data---'+JSON.stringify(this.attendee));
            if(this.attendee!='none' && data.length>0){
            this.attendeeOptions=[];
            for(var i=0;i<data.length;i++){
                this.attendeeOptions.push({'label':data[i].recName,'value':data[i].recId});
                }
            }
        }
        else if(error){
            console.log('Error'+error);
        }
    }
    handlClose(event){
        const closeEvent=new CustomEvent('closeselected');
        this.dispatchEvent(closeEvent);
    }
    handleSubjectChange(event){
        this.subject=event.target.value;
    }
    handleSave(event){
        this.isLoader=true;

        if(!this.attendeeId) {
            
        }
        saveData({eventId:this.eventId,startDateTime:this.startDate,endDateTime:this.endDate,subject:this.subject,isAllDay:this.isAllDay,attendeeId:this.attendeeId,relatedToId:this.relatedToId,assignedToId:this.assignedToId,meetingSetBy:this.selectedSetBy,eventType:this.selectedEvent,Description:this.messageBody})
        .then(result=>{
            if(!this.attendeeId || this.attendeeId==''){
            const event = new ShowToastEvent({
                title: 'Enter Valid Name',
                message:'Please select valid value of name',
                variant:'error'
            });
            this.dispatchEvent(event);
            this.isLoader=false;
            return;
        }
                this.eventId=result;
                this.isLoader=false;
                const event = new ShowToastEvent({
                    title: 'Email Logged',
                    message:'Your Email is logged successfully',
                    variant:'success'
                });
                this.dispatchEvent(event);
                const saveSelectedData=new CustomEvent('savesuccessful',{
                    detail:this.eventId
                });
                this.dispatchEvent(saveSelectedData);

        })
        .catch(Error=>{
                const event = new ShowToastEvent({
                    title: 'Error Occured',
                    message:Error.body.message,
                    variant:'error'
                });
                this.dispatchEvent(event);
                this.isLoader=false;
                console.log('Error'+Error);
        })
    }
    // renderedCallback(){
    //     if(this.isRender){
    //         console.log('@@ CHILD: '+ JSON.stringify(this.dates));
    //         // this.subject=this.subject+'Testing Render';
    //         this.isRender=false;
    //     }

    // }
    @api get Dates(){
        return this.startDate
    }
    handleAttendee(event){
        this.attendeeId=event.detail;
    }
    handleAssignedTo(event){
        this.assignedToId=event.detail;
    }
    handleRelatedTo(event){
        this.relatedToId=event.detail;
    }
}