@isTest
public class lwcCustomLookupControllerTest {
    @testSetup
    public static void setUpData(){
        Contact con=new Contact();
        con.LastName='Test Con';
        insert con;
        
        Account acc=new Account();
        acc.Name='Test Account';
        insert acc;
        
    }
    @isTest
    public static void getResultsTest(){
        Contact fetchedContact=[SELECT Id,LastName FROM Contact WITH USER_MODE LIMIT 1];
        Account fetchedAccount=[SELECT Id,Name FROM Account WITH USER_MODE LIMIT 1];
        List<lwcCustomLookupController.SObJectResult> fetchedResultsContact=lwcCustomLookupController.getResults('contact', 'Lastname', 'Test', 'LastName');
        List<lwcCustomLookupController.SObJectResult> fetchedResultsAccount=lwcCustomLookupController.getResults('Account', 'Name', 'Test', 'Name');
        List<lwcCustomLookupController.SObJectResult> fetchedResultsUser=lwcCustomLookupController.getResults('User', 'Name', 'Test', 'Name');
        System.assertEquals(1, fetchedResultsContact.size());
    }
}