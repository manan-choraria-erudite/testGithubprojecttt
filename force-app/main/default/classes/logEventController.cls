public with sharing class logEventController {
    @AuraEnabled
    public static String saveData(String eventId, String subject,String startDateTime,String endDateTime, Boolean isAllDay, String attendeeId, String relatedToId,String assignedToId,String eventType,String meetingSetBy,String Description ){
        try{
            Event eventToBeAdded=new Event();
            if(subject!=null && Schema.sObjectType.Event.fields.Subject.isCreateable()){
                eventToBeAdded.subject=Subject;
            }
            if(Schema.sObjectType.Event.fields.StartDateTime.isCreateable()){
                eventToBeAdded.StartDateTime=(Datetime)JSON.deserialize('"'+startDateTime+'"', DateTime.class);
            }
            if(Schema.sObjectType.Event.fields.EndDateTime.isCreateable()){
                eventToBeAdded.EndDateTime=(Datetime)JSON.deserialize('"'+endDateTime+'"', DateTime.class);
            }
            if(Schema.sObjectType.Event.fields.IsAllDayEvent.isCreateable()){
                eventToBeAdded.IsAllDayEvent=isAllDay;
            }
            if(attendeeId!=null && Schema.sObjectType.Event.fields.WhoId.isCreateable()){
                eventToBeAdded.WhoId=attendeeId;
            }
            if(relatedToId!=null && relatedToId!='' && Schema.sObjectType.Event.fields.WhatId.isCreateable()){
                eventToBeAdded.WhatId=relatedToId;
            }
            if(assignedToId!=null && assignedToId!='' && Schema.sObjectType.Event.fields.OwnerId.isCreateable()){
                eventToBeAdded.OwnerId=assignedToId;
            }
            if(meetingSetBy!='' && meetingSetBy!=null && Schema.sObjectType.Event.fields.Meeting_Set_By__c.isCreateable()){
                eventToBeAdded.Meeting_Set_By__c =meetingSetBy;
            }
            if(eventType!='' && eventType!=null && Schema.sObjectType.Event.fields.Type.isCreateable()){
                eventToBeAdded.Type =eventType;
            }
            if(Description!=null && Description!='' && Schema.sObjectType.Event.fields.Description.isCreateable()){
                eventToBeAdded.Description=Description;
            }
            if(eventId!=null && eventId!=''){
                eventToBeAdded.Id=eventId;
                if(Schema.sObjectType.Event.isCreateable() && Schema.sObjectType.Event.isUpdateable()){
                    upsert eventToBeAdded Id;
                }
            }
            else{
                if(Schema.sObjectType.Event.isCreateable()){
                    insert eventToBeAdded; 
                }
            }
            return eventToBeAdded.id;
    }
    catch(Exception e){
        String msg=e.getMessage();
        throw new AuraHandledException(msg);
    }
    } 
    @AuraEnabled(cacheable=True)
    public static String getContactName(String conId){
        if(Schema.sObjectType.Contact.fields.Name.isAccessible()){
        	return [SELECT Name FROM Contact where Id=:conId WITH USER_MODE LIMIT 1 ].Name;
    	}
        else{
            throw new AuraHandledException('Insufficient contact permissions');
        }
    }
    @AuraEnabled
    public static eventObjectWrapper getEventData(String eventId){
        try{
            eventObjectWrapper eventToReturn=new eventObjectWrapper();
            if(Schema.sObjectType.Event.fields.Subject.isAccessible() && Schema.sObjectType.Event.fields.StartDateTime.isAccessible() && Schema.sObjectType.Event.fields.EndDateTime.isAccessible() && Schema.sObjectType.Event.fields.Meeting_Set_By__c.isAccessible() && Schema.sObjectType.Event.fields.IsAllDayEvent.isAccessible() && Schema.sObjectType.Event.fields.WhoId.isAccessible() && Schema.sObjectType.Event.fields.WhatId.isAccessible() && Schema.sObjectType.Event.fields.OwnerId.isAccessible() && Schema.sObjectType.Event.fields.Type.isAccessible() && Schema.sObjectType.Event.fields.Description.isAccessible()){
                Event fetchedEvent= [SELECT Subject,Meeting_Set_By__c,StartDateTime,EndDateTime,IsAllDayEvent,WhoId,WhatId,OwnerId,Type,Description FROM EVENT WHERE id=:eventId WITH USER_MODE LIMIT 1];
                String whoIdRetrieve=fetchedEvent.WhoId;
                String conEmail=[SELECT Email FROM CONTACT WHERE ID=:whoIdRetrieve WITH USER_MODE LIMIT 1].Email;
                eventToReturn.Subject=fetchedEvent.Subject;
                eventToReturn.MeetingSetByC=fetchedEvent.Meeting_Set_By__c;
                eventToReturn.StartDateTime=fetchedEvent.StartDateTime.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                eventToReturn.endDateTime=fetchedEvent.EndDateTime.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
                eventToReturn.IsAllDayEvent=fetchedEvent.IsAllDayEvent;
                eventToReturn.WhoId=fetchedEvent.WhoId;
                eventToReturn.WhatId=fetchedEvent.WhatId;
                eventToReturn.OwnerId=fetchedEvent.OwnerId;
                eventToReturn.Type=fetchedEvent.Type;
                eventToReturn.Description=fetchedEvent.Description;
                eventToReturn.attendeeEmail=conEmail;
                return eventToReturn;
            }
            else{
                throw new AuraHandledException('Insufficient permissions on Event');
            }
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
    public class eventObjectWrapper{
        @AuraEnabled public String Subject;
        @AuraEnabled public String MeetingSetByC;
        @AuraEnabled public String StartDateTime;
        @AuraEnabled public String EndDateTime;
        @AuraEnabled public Boolean IsAllDayEvent;
        @AuraEnabled public String WhoId;
        @AuraEnabled public String WhatId;
        @AuraEnabled public String OwnerId;
        @AuraEnabled public String Type;
        @AuraEnabled public String Description;
        @AuraEnabled public String attendeeEmail;
    }
    @AuraEnabled
    public static Boolean deleteEvent(String eventId){
        event eventToBeDeleted=new event();
        eventToBeDeleted.Id=eventId;
        if(Schema.sObjectType.Event.isDeletable()){
            delete eventToBeDeleted;
            return true;
        }
        else{
            throw new AuraHandledException('Insufficient permissions on Event');
        }
    }
    
    @AuraEnabled(cacheable=True)
    public static List<eventWrapper> fetchEvents(String subject,String StartDateTime,String EndDateTime){
        DateTime StartDateTimeSerialized=(Datetime)JSON.deserialize('"'+StartDateTime+'"', DateTime.class);
        DateTime EndDateTimeSerialized=(Datetime)JSON.deserialize('"'+EndDateTime+'"', DateTime.class);
        List<Event> fetchedEvent=new List<Event>();
        if(Schema.sObjectType.Event.fields.Subject.isAccessible() && Schema.sObjectType.Event.fields.StartDateTime.isAccessible() && Schema.sObjectType.Event.fields.EndDateTime.isAccessible() && Schema.sObjectType.Event.fields.Meeting_Set_By__c.isAccessible() && Schema.sObjectType.Event.fields.IsAllDayEvent.isAccessible() && Schema.sObjectType.Event.fields.WhoId.isAccessible() && Schema.sObjectType.Event.fields.WhatId.isAccessible() && Schema.sObjectType.Event.fields.OwnerId.isAccessible() && Schema.sObjectType.Event.fields.Type.isAccessible() && Schema.sObjectType.Event.fields.Description.isAccessible()){
            fetchedEvent=[SELECT Id, Subject,Who.Name,StartDateTime,EndDateTime from Event where Subject=:subject and StartDateTime=:StartDateTimeSerialized and EndDateTime=:EndDateTimeSerialized];
            List<eventWrapper> eventList =new List<eventWrapper>();
            for(Event currentEvent:fetchedEvent){
                eventWrapper ew = new eventWrapper();
                ew.subject = currentEvent.subject;
                ew.evtId = currentEvent.Id;
                ew.StartDateTime=currentEvent.StartDateTime;
                ew.EndDateTime=currentEvent.EndDateTime;
                ew.WhoId=currentEvent.Who.Name;
                eventList.add(ew);
            }
            return eventList;
        }
        else{
            throw new AuraHandledException('Insufficient event permissions');
        }

    }

    public class eventWrapper{
        @AuraEnabled public String WhoId;
        @AuraEnabled public DateTime StartDateTime;
        @AuraEnabled public DateTime EndDateTime;
        @AuraEnabled public string subject;
        @AuraEnabled public string evtId;
    }
}