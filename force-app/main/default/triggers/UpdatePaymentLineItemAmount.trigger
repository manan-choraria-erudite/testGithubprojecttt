trigger UpdatePaymentLineItemAmount on Payment_Line_item__c (before insert, before update) 
{
    Map<Id, Measure_Line_Item__c> relatedMLIMap = new Map<Id, Measure_Line_Item__c>();
    
    //set of ids
    Set<Id> MLIIds = new Set<Id>();
    for (Payment_Line_item__c paymentItem : Trigger.new) {
        MLIIds.add(paymentItem.Measure_Line_Item__c);
    }
    
   
    relatedMLIMap = new Map<Id, Measure_Line_Item__c>([SELECT Id, Total_Incentive__c FROM Measure_Line_Item__c WHERE Id IN :MLIIds]);
    
    // Update the Amount field on Payment Line Item with Total Incentive value
    for (Payment_Line_item__c paymentItem : Trigger.new) {
        if (relatedMLIMap.containsKey(paymentItem.Measure_Line_Item__c)) {
            Measure_Line_Item__c relatedMeasureLineItem = relatedMLIMap.get(paymentItem.Measure_Line_Item__c);
            paymentItem.Amount__c = relatedMeasureLineItem.Total_Incentive__c;
        }
    }
}