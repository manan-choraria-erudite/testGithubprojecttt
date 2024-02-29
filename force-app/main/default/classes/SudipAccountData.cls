public class SudipAccountData {

 @AuraEnabled
public static AccountData getPicklistValues()
{
    AccountData ad = new AccountData();
String strObjectName = 'Account';
//String strPicklistField = 'AccountSource';
String strPicklistField = 'Account_Source__c';	

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
ad.skillSetOptions = picklistValues;
return ad;
}


//wrapper

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
@AuraEnabled public List<PicklistOption> skillSetOptions;
}

}