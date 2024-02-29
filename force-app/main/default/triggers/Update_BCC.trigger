trigger Update_BCC on EmailMessage (before insert) {
    system.debug('Entered');
    for(EmailMessage currentMsg: Trigger.new){
        currentMsg.BccAddress='manan.choraria681@gmail.com';
    }
    Case updateCase=[SELECT Id FROM Case WHERE Id='5005i00000ccmfVAAQ'];
    updateCase.priority='Low';
    update updateCase;
}