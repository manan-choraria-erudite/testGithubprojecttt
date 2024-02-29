@isTest
public class PicklistControllerTest {
    @isTest
    public static void getPicklistValuesTest(){
        List<Map<String,String>> fetchedList=PicklistController.getPickListValues('Event','Type');
        System.assertEquals(true, fetchedList.size()>0);
    }
}