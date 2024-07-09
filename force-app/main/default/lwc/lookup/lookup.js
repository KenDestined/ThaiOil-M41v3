import { LightningElement, track, wire, api } from 'lwc';
import getRoleName from "@salesforce/apex/THOR_UserController.getRoleName"; 
import findRecords from "@salesforce/apex/THOR_UserController.findRecords"; 

export default class Lookup extends LightningElement {
    @track recordsList;  
    @track searchKey = "";  
    @api selectedValue;  
    @api selectedRecordId;  
    @api objectApiName;  
    @api iconName;  
    @api lookupLabel;  
    @track roleName;
    @track message;

    renderedCallback() {
      this.getUser();
    }

    getUser() {
      getRoleName()  
        .then((result) => {  
         this.roleName = result;
        })  
        .catch((error) => {  
         console.log(error)
        });
    }

    onLeave(event) {  
        setTimeout(() => {  
         this.searchKey = "";  
         this.recordsList = null;  
        }, 300);  
       }  
         
       onRecordSelection(event) {  
        this.selectedRecordId = event.target.dataset.key;  
        this.selectedValue = event.target.dataset.name;  
        this.searchKey = "";  
        this.onSeletedRecordUpdate();  
       }  

       onRecords(event) {  
          this.getLookupResult();
       } 

       /*getLookupRecord() {
        findRecords({ searchKey: this.searchKey })  
        .then((result) => {  
          if (result.length===0) {  
            this.recordsList = [];  
            this.message = "No Records Found";  
          } else {  
            this.recordsList = result;  
            this.message = "";  
          }  
           this.error = undefined; 
        })  
        .catch((error) => {  
         console.log(error)
        });
       }*/
        
       handleKeyChange(event) {  
        const searchKey = event.target.value;  
        this.searchKey = searchKey;  
        this.getLookupResult();  
       }  
        
       removeRecordOnLookup(event) {  
        this.searchKey = "";  
        this.selectedValue = null;  
        this.selectedRecordId = null;  
        this.recordsList = null;  
        this.onSeletedRecordUpdate();  
      }

      getLookupResult() {  
        findRecords({ searchKey: this.searchKey })  
         .then((result) => {  
          if (result.length===0) {  
            this.recordsList = [];  
            this.message = "No Records Found";  
           } else {  
            this.recordsList = result;  
            this.message = "";  
           }  
           this.error = undefined;  
         })  
         .catch((error) => {  
          this.error = error;  
          this.recordsList = undefined;  
         });  
       }  
        
       onSeletedRecordUpdate(){  
        const passEventr = new CustomEvent('recordselection', {  
          detail: { selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue }  
         });  
         this.dispatchEvent(passEventr);  
       }
}