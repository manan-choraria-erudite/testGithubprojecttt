@isTest
public with sharing class logEventControllerTest {
    @testSetup
    public static void setUpData(){
        Event newEvent= new Event();
        newEvent.Subject='Test Subject';
        newEvent.StartDateTime=System.now();
        newEvent.EndDateTime=System.now().addHours(1);
        newEvent.isAllDayEvent=false;
        newEvent.Description='This is a test event';
        newEvent.Meeting_Set_By__c='Brad Frank';
        newEvent.Type='1st Meeting (prospect)';
        newEvent.OwnerId=UserInfo.getUserId();
        
        Account newAccount=new Account();
        newAccount.Name='Testing account';
        insert newAccount;
        
        Contact newContact=new Contact();
        newContact.LastName='Testing last Name';
        newContact.AccountId=newAccount.Id;
        insert newContact;
        
        newEvent.WhoId=newContact.Id;
        newEvent.WhatId=newContact.AccountId;
        insert newEvent;
    }
    @isTest
    public static void saveDataTestInsert(){
        Event fetchedEvent=[SELECT Id, Subject,Meeting_Set_By__c,StartDateTime,EndDateTime,IsAllDayEvent,WhoId,WhatId,OwnerId,Type,Description FROM EVENT WITH USER_MODE LIMIT 1];
        String StartDateTime=fetchedEvent.StartDateTime.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
        String EndDateTime=fetchedEvent.EndDateTime.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
        String resultedData=logEventController.saveData(fetchedEvent.Id,fetchedEvent.Subject,StartDateTime,EndDateTime,fetchedEvent.IsAllDayEvent,fetchedEvent.WhoId,fetchedEvent.WhatId,fetchedEvent.OwnerId,fetchedEvent.Type,fetchedEvent.Meeting_Set_By__c,fetchedEvent.Description);
        System.assertEquals(fetchedEvent.Id, resultedData, 'Check if event is updated');
    }
    @isTest
    public static void saveDataTestUpdate(){
        Event fetchedEvent=[SELECT Id, Subject,Meeting_Set_By__c,StartDateTime,EndDateTime,IsAllDayEvent,WhoId,WhatId,OwnerId,Type,Description FROM EVENT WITH USER_MODE LIMIT 1];
        String StartDateTime=fetchedEvent.StartDateTime.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
        String EndDateTime=fetchedEvent.EndDateTime.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
        String resultedData=logEventController.saveData(null,fetchedEvent.Subject,StartDateTime,EndDateTime,fetchedEvent.IsAllDayEvent,fetchedEvent.WhoId,fetchedEvent.WhatId,fetchedEvent.OwnerId,fetchedEvent.Type,fetchedEvent.Meeting_Set_By__c,fetchedEvent.Description);
        System.assertEquals(true, resultedData!=null, 'Check if event is inserted');
    }
    @isTest
    public static void getContactNameTest(){
        Contact con=[SELECT Id,Name FROM Contact WHERE LastName='Testing last Name' LIMIT 1];
        String fetchedConName=logEventController.getContactName(con.Id);
        System.assertEquals(con.Name, fetchedConName);
    }
    @isTest
    public static void getEventDataTest(){
        Event fetchedEvent=[SELECT Id,Subject FROM EVENT WITH USER_MODE LIMIT 1];
        logEventController.eventObjectWrapper fetchedWrapper=logEventController.getEventData(fetchedEvent.Id);
        system.assertEquals(fetchedEvent.Subject,fetchedWrapper.Subject);
    }
    @isTest
    public static void fetchEventsTest(){
        Event fetchedEvent=[SELECT Id,Subject,StartDateTime,EndDateTime FROM EVENT WITH USER_MODE LIMIT 1];
        String StartDateTime=fetchedEvent.StartDateTime.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
        String EndDateTime=fetchedEvent.EndDateTime.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
        List<logEventController.eventWrapper> fetchedEvents=logEventController.fetchEvents(fetchedEvent.subject, StartDateTime, EndDateTime);
        System.assertEquals(1,fetchedEvents.size());
    }
    @isTest
    public static void deleteEventTest(){
        Event fetchedEvent=[SELECT Id FROM EVENT WITH USER_MODE LIMIT 1];
        Test.startTest();
        Boolean fetchedWrapper=logEventController.deleteEvent(fetchedEvent.Id);
        Test.stopTest();
        system.assertEquals(true,fetchedWrapper);
    }
    
}