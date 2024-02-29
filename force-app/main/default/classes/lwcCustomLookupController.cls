public with sharing class lwcCustomLookupController {
    
    @AuraEnabled(cacheable=true)
    public static List<SObJectResult> getResults(String ObjectName, String fieldName, String value,String customNameField) {
        if(value==''){
            throw new AuraHandledException('Empty Value');
        }
        system.debug('value'+value);
        if(ObjectName=='contact'){
        List<SObJectResult> sObjectResultList = new List<SObJectResult>();
        List<Id> conIds=new List<Id>();
        for(sObject so : Database.Query('Select Id,'+customNameField+' FROM '+ObjectName+' WHERE '+fieldName+' LIKE \'%' + value + '%\' WITH USER_MODE')) {
            String fieldvalue = (String)so.get(customNameField);
            sObjectResultList.add(new SObjectResult(fieldvalue, so.Id));
            conIds.add(so.Id);
        }
        return sObjectResultList;
        }
        else if(ObjectName=='User'){
            List<SObJectResult> sObjectResultList = new List<SObJectResult>();
            String userId=UserInfo.getUserId();
            String userName=UserInfo.getName();    
            sObjectResultList.add(new SObjectResult(userName, userId));
            for(User currentUser: [SELECT Id,Name FROM USER WHERE Id!=:userId]){
                sObjectResultList.add(new SObjectResult(currentUser.Name, currentUser.Id));
            }
            return sObjectResultList;
        }
        else{
            List<SObJectResult> accountList = new List<SObJectResult>();
            List<SObJectResult> sObjectResultList = new List<SObJectResult>();
            List<Id> conIds=new List<Id>();
            system.debug('Select Id FROM Contact'+' WHERE '+fieldName+'=' + value);
            for(sObject so : Database.Query('Select Id FROM Contact'+' WHERE '+fieldName+'=' + '\''+value+ '\' WITH USER_MODE')) {
                //String fieldvalue = (String)so.get(customNameField);
                //sObjectResultList.add(new SObjectResult(fieldvalue, so.Id));
                conIds.add(so.Id);
            }
            if(conIds.size()>0){
             for(sObject so:Database.query('SELECT Id,Name FROM Account WHERE Id in (SELECT AccountId FROM Contact WHERE ID in:conIds WITH USER_MODE)')){
                String fieldvalue = (String)so.get('Name');
                accountList.add(new SObjectResult(fieldvalue, so.Id));
             }
             return accountList;
            }
            else{
                return sObjectResultList;
            }
        }
    }
    
    public class SObJectResult {
        @AuraEnabled
        public String recName;
        @AuraEnabled
        public Id recId;
        
        public SObJectResult(String recNameTemp, Id recIdTemp) {
            recName = recNameTemp;
            recId = recIdTemp;
        }
    }
}