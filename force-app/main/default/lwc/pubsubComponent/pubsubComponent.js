import { LightningElement } from 'lwc';
import { subscribe, unsubscribe } from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import Id from "@salesforce/user/Id";
export default class PubsubComponent extends LightningElement {
    subscription;
    
    // channelName = '/event/EW_Google_OCR_Event__e'; 
    isLoading = true;

    connectedCallback()
    {   
        console.log('pubSub connected called....');     
        this.isLoading = false;
        this.handleSubscribe(); 
        
    }
    
    async handleSubscribe() {
        console.log('subscribe36............');
        // const messageCallback = (response) => {
        //    console.log('this.subscription .... '+JSON.stringify(response));
        // };

        // subscribe(this.channelName, -1, this.refreshElement).then(response => {
        //     this.subscription = response;
        //    console.log('subscription @@@@ .... '+JSON.stringify(response));
            
        // });
        try{
            const messageCallback = (response) => {
                console.log('response @@@ '+JSON.stringify(response));
                this.refreshElement();
                
            };

            subscribe(this.channelName, -1, messageCallback).then(response => {
                console.log('subscribe @@@ '+JSON.stringify(response));
                this.subscription = response;
            });

        }catch(e){
            console.log('error ### '+e);

        }
        

        console.log('subscribe Last............');
    }

    refreshElement(){
        console.log('refresh called.....');
        window.location.reload();
    }

    handleUnsubscribe() {
        unsubscribe(this.subscription, response => {
            // console.log('unsubscribe() response: ', JSON.stringify(response));
        });
    }
    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Ticket Submited',
            message: 'toast success.',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    disconnectedCallback()
    {
        this.handleUnsubscribe();
    }
}