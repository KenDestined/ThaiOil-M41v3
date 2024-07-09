import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { refreshApex } from '@salesforce/apex';
 
export default class CtrComUtility extends LightningElement {
    recordId;
    recordTypeId;
    fieldApiName;

    connectedCallback() {
        console.log('[connectedCallback] -----' + this.recordId);
        this.dispatchEvent(new CustomEvent('ready'));
    }

    @wire(getRecord, {recordId: '$recordId', fields: '$fields'})
    wiredRecordInfo({error, data}) {
        if(data) {
            console.log('[wiredRecordInfo] data -----', data);
            this.dispatchEvent(new CustomEvent('recordinfo', {detail: {data: data}}));
        } else {
            console.log('[wiredRecordInfo] error -----', error);
        }
    }

    @api
    getRecordInfo(value, recordId) {
        this.fields = value;
        this.recordId = recordId;
        return refreshApex(this.wiredRecordInfo);
    }

    @wire(getPicklistValues, {recordTypeId: '$recordTypeId', fieldApiName: '$fieldApiName'})
    wiredPicklistValues({error, data}) {
        if(data) {
            console.log('[wiredPicklistValues] data -----', data);
            this.dispatchEvent(new CustomEvent('picklistvalues', {detail: {data: data}}));
        } else {
            console.log('[wiredPicklistValues] error -----', error);
        }
    }

    @api
    getPicklistValues(value, recordTypeId) {
        this.fieldApiName = value;
        this.recordTypeId = recordTypeId;
        refreshApex(this.wiredPicklistValues);
    }
}