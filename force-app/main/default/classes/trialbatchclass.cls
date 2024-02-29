public class trialbatchclass implements Database.Batchable<sObject>  {
   
    public Integer recordsProcessed = 0;

    public Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT ID, Paid_Date__c, Total_Amount__c, Enrollment_Application__r.ID,  Enrollment_Application__r.X1_30_Paid_Amount__c ,Enrollment_Application__r.X31_60_Paid_Amount__c , Enrollment_Application__r.X60_Paid_Amount__c FROM Paymenting__c';
        return Database.getQueryLocator(query);
    }

    public void execute(Database.BatchableContext bc, List<sObject> scope) {
        // process each batch of records
        List<Paymenting__c> paying = new List<Paymenting__c>();

        for (sObject obj : scope) {
            Paymenting__c pay = (Paymenting__c) obj;

            Date today = System.today();
            Date thirtyDaysAgo = today.addDays(-30);
            Date sixtyDaysAgo = today.addDays(-60);

            // Retrieve the parent record from the relationship field
            Enrollment_Application__c EnrollApplication = pay.Enrollment_Application__r;

            // Perform your logic
            if (pay.Paid_Date__c >= thirtyDaysAgo && pay.Paid_Date__c <= today) {
                pay.Total_Amount__c = EnrollApplication.X1_30_Paid_Amount__c;
            } else if (pay.Paid_Date__c > sixtyDaysAgo && pay.Paid_Date__c < thirtyDaysAgo) {
                pay.Total_Amount__c = EnrollApplication.X31_60_Paid_Amount__c;
            } else {
                pay.Total_Amount__c = EnrollApplication.X60_Paid_Amount__c;
            }

            // add payment record to list to be updated
            paying.add(pay);

            recordsProcessed = recordsProcessed + 1;
            system.debug('NUMBER OF RECORDS PROCESSED : ' + recordsProcessed);
        }
        update paying;
    }

    public void finish(Database.BatchableContext bc) {
        // Your finish logic, if any
    }


}