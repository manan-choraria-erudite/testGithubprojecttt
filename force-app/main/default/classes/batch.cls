public class batch implements Database.Batchable<sObject>,Database.Stateful
{
    public Integer recordsProcessed = 0;
	  public Database.QueryLocator start(Database.BatchableContext bc) 
      {
          String query = 'SELECT ID, BillingStreet, BillingCity, BillingState, BillingPostalCode, (SELECT ID, MailingStreet, MailingCity, MailingState, MailingPostalCode FROM Contacts) FROM Account';

        return Database.getQueryLocator(query);
      }
    
     public void execute(Database.BatchableContext bc, List<Account> scope){
        // process each batch of records
        List<Contact> contacts = new List<Contact>();
         
        for (Account account : scope) 
        {
            for (Contact contact : account.contacts) 
            {
                contact.MailingStreet = account.BillingStreet;
                contact.MailingCity = account.BillingCity;
                contact.MailingState = account.BillingState;
                contact.MailingPostalCode = account.BillingPostalCode;
                // add contact to list to be updated
                contacts.add(contact);
                // increment the instance member counter
                recordsProcessed = recordsProcessed + 1;
                system.debug('NUMBER OF RECORDS PROCESSED : ' +recordsProcessed);
            }
        }
        update contacts;
    }
    
    public void finish(Database.BatchableContext bc){
       // Database.executeBatch(new Batch(), 100);
    }
}