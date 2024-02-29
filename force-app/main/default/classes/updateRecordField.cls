public class updateRecordField {

    @AuraEnabled
    public static void updateAccountSourceById(String accountId, String newSource, String status) {
        System.debug('AccountID is :'+accountId);
        System.debug('newSource is :'+newSource);
        System.debug('Status value is:'+status);
        Account accToUpdate = [SELECT Id, Account_Source__c, Active__c FROM Account WHERE Id = :accountId LIMIT 1];

        if (accToUpdate != null) {
            // Update the AccountSource field.
            String multiPicklistValue = String.join(newSource.split(','), ';');
            accToUpdate.Account_Source__c = multiPicklistValue;
            accToUpdate.Active__c = status;
            try {
                update accToUpdate;
                System.debug('Account Source updated successfully.');
            } catch (Exception e) {
                System.debug('An error occurred while updating the Account Source: ' + e.getMessage());
            }
        } else {
            System.debug('Account with ID ' + accountId + ' not found.');
        }
    }
}