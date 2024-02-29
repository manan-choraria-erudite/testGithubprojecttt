public with sharing class CustomLookupSearchController {
    
    @AuraEnabled
    public static List<sObject> lookUpSearch(String searchValue, String objectLabel) {
        System.debug('lookUpSearch CALLED');
        List<sObject> returnLookUpList = new List<sObject>();
      
            String queryString = null;
            if(searchValue == null || searchValue == ''){
                queryString = 'Select Id, Name from '+objectLabel+' ORDER BY LastViewedDate LIMIT 5';
            }
            else {
                queryString = 'Select Id, Name from '+objectLabel+' Where Name Like  \'%' + searchValue + '%\' LIMIT  5';
            }
            System.debug('queryString--'+ queryString);
            returnLookUpList = database.query(queryString);
        
        return returnLookUpList;
    }
}