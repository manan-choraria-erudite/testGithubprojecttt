trigger afterInsertAccount on Account (after insert) {
    if(Trigger.isInsert){
        EW_Google_OCR_Event__e event = new EW_Google_OCR_Event__e();
        event.Status__c = 'Completed';        
        EventBus.publish(event);
    }
}