public class getAccountSourcePicklist {

@AuraEnabled
 public static AccountData getPicklistValuesForCombo() {
    //     List<String> picklistValues = new List<String>();
        
    //     // Use Schema to describe the object and field
    //     Schema.DescribeFieldResult fieldResult = Schema.getGlobalDescribe().get(objectName).getDescribe().fields.getMap().get(fieldName).getDescribe();
        
      
    //         List<Schema.PicklistEntry> entries = fieldResult.getPicklistValues();
            
    //         // Extract and add picklist values to the list
    //         for (Schema.PicklistEntry entry : entries) {
    //             picklistValues.add(entry.getLabel());
    //         }
        
        
    //     return picklistValues;
    // }


AccountData ad = new AccountData();
String strObjectName = 'Account';
//String strPicklistField = 'AccountSource';
String strPicklistField = 'Active__c';	

List<PicklistOption> picklistValues = new List<PicklistOption>();
List<Account> accList = [SELECT id, Name FROM Account LIMIT 25];

Schema.SObjectType objSobjectType = Schema.getGlobalDescribe().get(strObjectName);
Schema.DescribeSObjectResult objDescribeSobject = objSobjectType.getDescribe();

Map<String, Schema.SObjectField> mapFields = objDescribeSobject.fields.getMap();

List<Schema.PicklistEntry> lstPickListValues = mapFields.get(strPicklistField).getDescribe().getPickListValues();

for (Schema.PicklistEntry objPickList : lstPickListValues) {
    System.debug('Value = ' +objPickList.getValue() +' , Label = ' +objPickList.getLabel());
    PicklistOption pOtions = new PicklistOption(objPickList.getLabel(), objPickList.getValue());
     picklistValues.add(pOtions);
}

ad.accData = accList;
ad.status = picklistValues;
return ad;
}



public class PicklistOption {
@AuraEnabled public String label;
@AuraEnabled public String value;
    public PicklistOption(String label, String value) 
    {
    this.label = label;
    this.value = value; 
    }
}

public class AccountData
{
@AuraEnabled public List<Account> accData;
@AuraEnabled public List<PicklistOption> status;
}
}