public class AccountQueueable implements Queueable {
    public List<Account> accList;
    
    public AccountQueueable(List<Account> accList){
        this.accList = accList;
    }
    
    public void execute(QueueableContext context) {
        for(Account acc : accList){
            // Update the Account Name 
            acc.Name = acc.Name + 'sfdcpoint';
            System.debug('updated account name:' +acc.Name);
        }
        update accList;
    }
}