trigger AccountSample on Account (before insert, before update) 
{
    for (Account acc : Trigger.new) 
    {
        String currentUserId = System.UserInfo.getUserId();
        System.debug('Current User Id: ' + currentUserId);
    }
    //first user id : 0055i00000AzhI6AAJ
    //second user id : 
}