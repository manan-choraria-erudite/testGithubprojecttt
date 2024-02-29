public with sharing class Userdetails {
     @AuraEnabled
    public static List<User> Userdetailsmethod() 
    {
        List<User> usersList = [SELECT name,email FROM User where isActive= True];
        system.debug('userlist===>'+usersList);
        return usersList;
      }
 
      @AuraEnabled
      public static void SendEmailmethod (List<String> toAddress, List<String> ccAddress, List<String> bccAddress, String subject, String body) 
              {

                 system.debug('email toaddress'+toAddress);
                 system.debug('email ccaddress'+ccAddress);
                 system.debug('email bccaddress'+bccAddress);
                 system.debug('email subject'+subject);
                 system.debug('email body'+body);

                  Messaging.reserveSingleEmailCapacity(1);
                  try 
                  {
                      messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
                      mail.setToAddresses(toAddress);
                      mail.setCcAddresses(ccAddress);
                      mail.setBccAddresses(bccAddress);
                      mail.setSubject(subject);
                      mail.setHtmlBody(body);
                      Messaging.sendEmail(new List<messaging.SingleEmailMessage>{ mail });
                  } 
                  
                  catch (exception e) 
                  {
                      throw new AuraHandledException(e.getMessage());
                  }
              }
}