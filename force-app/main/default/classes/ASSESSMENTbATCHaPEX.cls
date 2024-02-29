public class ASSESSMENTbATCHaPEX implements Database.Batchable<sObject> {

    public Integer recordsProcessed = 0;

    public Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT ID, Paid_Date__c, Total_Amount__c, Enrollment_Application__r.ID, Enrollment_Application__r.X1_30_Paid_Amount__c, Enrollment_Application__r.X31_60_Paid_Amount__c, Enrollment_Application__r.X60_Paid_Amount__c FROM Paymenting__c';
        return Database.getQueryLocator(query);
    }

    public void execute(Database.BatchableContext bc, List<Paymenting__c> scope) {
        // process each batch of records
        List<Paymenting__c> paying = new List<Paymenting__c>();

        for (Paymenting__c obj : scope) {
            Paymenting__c pay = (Paymenting__c) obj;

            Date today = System.today();
            Date thirtyDaysAgo = today.addDays(-30);
            Date sixtyDaysAgo = today.addDays(-60);

            // for 1-30
            if (pay.Paid_Date__c >= thirtyDaysAgo && pay.Paid_Date__c <= today) {
                pay.Total_Amount__c = pay.Enrollment_Application__r.X1_30_Paid_Amount__c;
            }
            // for 31-60
            else if (pay.Paid_Date__c > sixtyDaysAgo && pay.Paid_Date__c < thirtyDaysAgo) {
                pay.Total_Amount__c = pay.Enrollment_Application__r.X31_60_Paid_Amount__c;
            }
            // greater than 60
            else {
                pay.Total_Amount__c = pay.Enrollment_Application__r.X60_Paid_Amount__c;
            }

            // add Paymenting__c record to the list to be updated
            paying.add(pay);
            System.debug('PAY record : '+pay);
             System.debug('PAYING LIST : '+paying);

            // increment the instance member counter
            recordsProcessed = recordsProcessed + 1;
            System.debug('NUMBER OF RECORDS PROCESSED: ' + recordsProcessed);
        }

        update paying;
    }

    public void finish(Database.BatchableContext bc) {
        // Any necessary post-processing logic can be added here
    }
}