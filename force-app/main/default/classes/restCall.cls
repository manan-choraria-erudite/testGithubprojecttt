@RestResource(urlMapping='/Dialogflow')
global class restCall {
    @HTTPPost
    global static string createRecords(){
        //response from Google Assistant as a JSON
        String request = RestContext.request.requestBody.toString();
        System.debug('request'+request);
    //deserialize the JSON
        MapURL orp = (MapURL)JSON.deserialize(request, MapURL.class);
        System.debug('mapURL'+orp);
        string str=orp.queryResult.intent.displayName;

        System.debug('str'+str);
        //check whether it is an account
        if((str.contains('New')||(str.contains('Add')) ||(str.contains('Create'))) &&(str.contains('account'))){
            account acc= new account();
            acc.name=orp.queryResult.parameters.Name;
            acc.Phone=orp.queryResult.parameters.phone;
            //acc.Email__c=orp.result.parameters.Email;
            insert acc;
        }
    //check whether it is a contact
        else if((str.contains('New')||(str.contains('Add')) ||(str.contains('Create'))) &&(str.contains('Contact'))){
            contact con= new contact();
            con.LastName = orp.queryResult.parameters.Name;
            con.Phone = orp.queryResult.parameters.phone;
            //con.Email = orp.result.parameters.Email;
            insert con;
        }
        String s= 'Success';
        return s;
    }
    //wrapper to get the values from the JSON
    //
    public class MapURL {
    	public QueryResult queryResult;
    } 
    
    public class QueryResult {
        public Parameters parameters;
        public Intent intent;
    }
    
    public class Parameters {
        public String Phone;
        public String Name;
    }
    
    public class Intent {
        public String name;
        public String displayName;
    }
    /*
    global class mapurl{
        global queryResult result;
    }
    global class queryResult{
        global parameters parameters;
        global intent intent;
        //global string resolvedQuery;
    }
    global class parameters{
        global String Phone;
        global String Name;
        //global String Email;
    }
    global class intent{
        global String name;
        global String displayName;
    }*/
}