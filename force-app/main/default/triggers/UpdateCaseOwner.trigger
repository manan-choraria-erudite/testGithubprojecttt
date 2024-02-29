trigger UpdateCaseOwner on AgentWork (after update) {
    Set < Id > setChatIds = new Set < Id >();

for ( AgentWork objAWT : trigger.new ) {

String strWorkItemId = objAWT.WorkItemId;

if ( objAWT.AcceptDateTime != null && trigger.oldMap.get( objAWT.Id ).AcceptDateTime == null && strWorkItemId.startsWith( '570' ) ) {
    setChatIds.add( objAWT.WorkItemId );

}

}

if (setChatIds.size() > 0 ) {

List < Case > listCases = new List < Case >();

for ( LiveChatTranscript objLCT : [ SELECT Id, OwnerId, CaseId FROM LiveChatTranscript WHERE Id IN: setChatIds AND CaseId != null ] ) {

listCases.add( new Case( Id = objLCT.CaseId, OwnerId = objLCT.OwnerId ) );

}

if ( listCases.size() > 0 ) {

update listCases;

}

}

}