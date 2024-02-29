import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Userdetailsmethod from '@salesforce/apex/Userdetails.Userdetailsmethod';
import SendEmailmethod from '@salesforce/apex/Userdetails.SendEmailmethod';

export default class emailLWC extends LightningElement {
    isShowModal = false;
    titlevalue;
    store;
    addtemp;
    finalList = [];
    richtextvalue = '';
    titlevalue;
    toAddress = [];
    ccAddress = [];
    bccAddress = [];
    finalusers;
    subject = "";
    body = "";
    emailDetails;

    connectedCallback() {
        this.getusers();
    }


    getusers() {
        Userdetailsmethod()
            .then(result => {
                console.log('result printing : ' + JSON.stringify(result));
                this.store = result;
                console.log('result printing : ' + JSON.stringify(this.store));

                //  console.log("store :" +JSON.stringify(this.store));
                let userArr = [];

                this.store.forEach(user => {
                    console.log('user--' + JSON.stringify(user));
                    // this.finalList = this.finalList.push({'label': user.name , 'value': user.email});
                    userArr.push({ label: user.Name, value: user.Email });
                });

                this.finalList = userArr;
                console.log("finalList useArr :" + JSON.stringify(userArr));
                console.log("finalList is :" + JSON.stringify(this.finalList));

            })
            .catch(error => {
                console.log(error);
            })
    }

    dualListValue;
    changeevent(event) {
        this.toAddress = event.detail.value.toString();
    }

    showModalBox() {
        this.isShowModal = true;
    }

    hideModalBox() {
        this.isShowModal = false;
    }

    titlechange(event) {
        this.titlevalue = event.target.value;
        console.log("Title value is: " + this.titlevalue);
    }
    toAddChange(event) {
        this.toAddress = event.target.value;
        console.log("To address is: " + this.toAddress);
    }
    ccChange(event) {
        this.ccAddress = event.target.value;
        console.log("CC address is: " + this.ccAddress);
    }
    bccChange(event) {
        this.bccAddress = event.target.value;
        console.log("BCC address is: " + this.bccAddress);
    }
    richTextValueChange(event) {
        this.richTextValue = event.target.value;
        console.log("Body text is: " + this.richTextValue);
    }

    //send email
    handleSendEmail() {
        console.log("Handle Send email called before");
        console.log("Handle Send email called after toast");

        this.emailDetails = {
            toAddress: this.toAddress,
            ccAddress: this.ccAddress,
            bccAddress: this.bccAddress,
            subject: this.titlevalue,
            body: this.richTextValue
        };
        console.log('this.richtextvalue' + this.richTextValue);
        SendEmailmethod({ toAddress: this.toAddress, ccAddress: this.ccAddress, bccAddress: this.bccAddress, subject: this.titlevalue, body: this.richTextValue })
            .then(result => {
                console.log("Email Sent");


                //success toast event
                const evt = new ShowToastEvent({
                    title: 'Email sent successfully !!!',
                    // message: 'Opeartion sucessful',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
                //end of toast event

            })
            .catch(error => {
                console.log(error);

                //error toast event
                const evt = new ShowToastEvent({
                    title: 'Sorry email is not sent !!!',
                    // message: 'Opeartion sucessful',
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
                //end of toast event

            });

    }





}
//