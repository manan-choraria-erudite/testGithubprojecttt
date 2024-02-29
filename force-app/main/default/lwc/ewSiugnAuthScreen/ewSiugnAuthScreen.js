import { LightningElement, api } from 'lwc';
export default class EwSiugnAuthScreen extends LightningElement {


   @api userName;
    @api isConnectionExist;

    password;
    securityToken;   

    connected;
    activated;

    userNamePlaceholder = "Enter your Username here...";
    passwordPlaceholder = "Enter your Password here...";
    securityTokenPlaceholder = "Enter your Security Token here...";
    isLoading = false;

  handleChange(event) {
        this[event.target.name] = event.target.value;
    }


}