public class updateRecordFromLWC 
{

     @AuraEnabled(cacheable = true)
    public static void updateRecord(String recordId, String selectedStage, String selectedStatus, String rejectedValue) 
    {
        Enrollment_Application__c myRecord = [SELECT Id, Stage__c, Status__c, Rejected_Reason__c, Total_Incentive__c FROM Enrollment_Application__c WHERE Id = :recordId LIMIT 1];


 if (selectedStatus != 'Paid' && myRecord.Total_Incentive__c > 0)
 
  {
    myRecord.Stage__c = selectedStage;
    myRecord.Status__c = selectedStatus;
    myRecord.Rejected_Reason__c = rejectedValue;

        update myRecord;
        system.debug('Stage__c' +myRecord.Stage__c);
        system.debug('Status__c' +myRecord.Status__c);
        system.debug('Rejected_Reason__c' +myRecord.Rejected_Reason__c);
        System.debug('In if part where not paid and incentive > 0');
 }

else if(selectedStatus == 'Paid' && myRecord.Total_Incentive__c == 0)
{
 system.debug('In else PAID AND TOTAL INCENTIVE IS ZERO');
throw new AuraHandledException('Validation Failed: Field value is "Paid" and total incentive is 0.');

}
    }

}