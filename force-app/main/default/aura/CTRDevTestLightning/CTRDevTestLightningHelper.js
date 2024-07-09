({
    validateRequiredFieldHelper: function (mHeader, mItem, mTypeValidate) {
        console.log('validate helper');
        var validateMissingField = 'Missing Required Field: ';
        var ValidateMessageList = [];
        /*if(mHeader === undefined)
        {
            ValidateMessageList.push('Missing Header Record');
        }
        else
        {
            console.log('validate header:'+mHeader.Country__c);
            if(mTypeValidate == 'Customer')
            {
                //Check Required field.
                //Import data
                if(!mHeader.SalesOrganization__c) {ValidateMessageList.push(validateMissingField+'SalesOrganization__c');}
                if(!mHeader.DistributionChannel__c){ValidateMessageList.push(validateMissingField+'DistributionChannel__c');}
                if(!mHeader.Division__c){ValidateMessageList.push(validateMissingField+'Division__c');}

                //Table Central Data (GENERAL_DATA)
                if(!mHeader.AccountGroup__c){ValidateMessageList.push(validateMissingField+'AccountGroup__c');}
                if(mHeader.Country__c === undefined){ValidateMessageList.push(validateMissingField+'Country__c');}

                //Table Address (ADDR_GENERAL_DATA)
                if(!mHeader.CustomerNameLocal1__c){ValidateMessageList.push(validateMissingField+'CustomerNameLocal1__c');}
                if(!mHeader.CustomerNameEN1__c){ValidateMessageList.push(validateMissingField+'CustomerNameEN1__c');}

                if(mHeader.CityStateLocal__c === undefined){ValidateMessageList.push(validateMissingField+'CityStateLocal__c');}
                if(!mHeader.CityStateLocalText__c){ValidateMessageList.push(validateMissingField+'CityStateLocalText__c');}
                if(mHeader.CityStateEN__c === undefined){ValidateMessageList.push(validateMissingField+'CityStateEN__c');}
                if(!mHeader.CityStateENText__c){ValidateMessageList.push(validateMissingField+'CityStateENText__c');}
                if(!mHeader.StreetLocal__c){ValidateMessageList.push(validateMissingField+'StreetLocal__c');}
                if(!mHeader.StreetEN__c){ValidateMessageList.push(validateMissingField+'StreetEN__c');}
                if(!mHeader.CustomerSearchTermLocal__c){ValidateMessageList.push(validateMissingField+'CustomerSearchTermLocal__c');}
                if(!mHeader.CustomerSearchTermEN__c){ValidateMessageList.push(validateMissingField+'CustomerSearchTermEN__c');}

                //Table Sales Data(SALES_VIEW)
                if(!mHeader.Incoterms__c){ValidateMessageList.push(validateMissingField+'Incoterms__c');}
                //if(!mHeader.Incoterms2__c){ValidateMessageList.push(validateMissingField+'Incoterms2__c');} //Field doesn't created yet
                if(!mHeader.Currency__c){ValidateMessageList.push(validateMissingField+'Currency__c');}
                if(mHeader.TermofPayment__c=== undefined){ValidateMessageList.push(validateMissingField+'TermofPayment__c');}
                //if(!mHeader.CustomerPayment__c){ValidateMessageList.push(validateMissingField+'CustomerPayment__c');} //Field doesn't created yet
                if(!mHeader.TAXClassification__c){ValidateMessageList.push(validateMissingField+'TAXClassification__c');}
            }
            else if(mTypeValidate == 'Supplier')
            {
                //Table Central Data (GENERAL_DATA)
                if(!mHeader.AccountGroup__c){ValidateMessageList.push(validateMissingField+'AccountGroup__c');}

                //Table Address																
                if(!mHeader.CustomerNameLocal1__c){ValidateMessageList.push(validateMissingField+'CustomerNameLocal1__c');}
                if(!mHeader.CustomerNameEN1__c){ValidateMessageList.push(validateMissingField+'CustomerNameEN1__c');}
                if(mHeader.CityStateLocal__c === undefined){ValidateMessageList.push(validateMissingField+'CityStateLocal__c');}
                if(!mHeader.CityStateLocalText__c){ValidateMessageList.push(validateMissingField+'CityStateLocalText__c');}
                if(mHeader.CityStateEN__c === undefined){ValidateMessageList.push(validateMissingField+'CityStateEN__c');}
                if(!mHeader.CityStateENText__c){ValidateMessageList.push(validateMissingField+'CityStateENText__c');}
                if(mHeader.Country__c === undefined){ValidateMessageList.push(validateMissingField+'Country__c');}
                if(!mHeader.Language__c){ValidateMessageList.push(validateMissingField+'Language__c');}
                if(!mHeader.Currency__c){ValidateMessageList.push(validateMissingField+'Currency__c');}
                if(!mHeader.TermofPayment__c){ValidateMessageList.push(validateMissingField+'TermofPayment__c');}
                if(!mHeader.CompanyCode__c){ValidateMessageList.push(validateMissingField+'CompanyCode__c');}
                if(!mHeader.ReconciliationAccount__c){ValidateMessageList.push(validateMissingField+'ReconciliationAccount__c');}
                if(!mHeader.CashManagementGroup__c){ValidateMessageList.push(validateMissingField+'CashManagementGroup__c');}
            }
            
        }
        if(mItem.Status__c != 'New'){ValidateMessageList.push('Status: Allow Only Send to SAP only New Status ');}*/
        if (ValidateMessageList.length == 0) { ValidateMessageList.push('ByPass'); }
        return ValidateMessageList;
    },

    SendToSAP: function (component, event, helper,isIncludeGeneral) {
        component.set('v.loaded', false);
        var action = component.get("c.SubmitToSAP");

        action.setParams({
            mRequestHeader: component.get('v.mRequestHeader'),
            mRequestItem: component.get('v.mRequestItem'),
            mRecordId: component.get('v.recordId'),
            isIncludeGeneral: isIncludeGeneral
        });
        action.setCallback(this, function (response) {
            if (response.getState() === 'SUCCESS') {
                var result = response.getReturnValue();
                console.log('Send to SAP Result: ' + result);
                if (result.includes('Success')) {
                    this.toastEvent('Success', 'Send successfully!', 'success');
                }
                else {
                    this.toastEvent('Error', 'Send unsuccessfully.', 'error');
                }
                console.log('SUCCESS');
            }
            else if (response.getState() === 'ERROR') {
                console.log('ERROR: ', response.message);
                this.toastEvent('Error', 'Internal Error Please contact your administrator.', 'error');
            }
            else {
                console.log('ERROR:: ', response.message);
                this.toastEvent('Error', 'Internal Error Please contact your administrator.', 'error');
            }
            component.set('v.loaded', true);
            this.closeModal(component);
        });
        $A.enqueueAction(action);
    },

    toastEvent: function (Title, Message, Type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": Title,
            "message": Message,
            "type": Type
        });
        toastEvent.fire();
    },

    closeModal: function (component) {
        $A.get("e.force:closeQuickAction").fire();
        component.set("v.isModalOpen", false);
    },

    // handleConditions: function (component, result) {
    //     var mHeader = result.mRequestHeader;
    //     var mItem = result.mRequestItem;
    //     if (result.mRecordTypeName.includes('Initial') || result.mRecordTypeName.includes('Extend')) {
    //         console.log('result:' + result.mRecordTypeName);
    //         console.log('result:' + result.SAPStatus__c);
    //         //console.log('initial'+result.mGeneralViewCreated);
    //         if (result.mRecordTypeName.includes('Initial')) {
    //             component.set("v.isInitial", true);
    //         }
    //         if ((result.mRecordTypeName.includes('Customer') && !result.mAccountNumber) ||
    //             (result.mRecordTypeName.includes('Supplier') && !result.mSupplierNumber)) {
    //             console.log('no gen');

    //             var validatemessage = helper.validateRequiredFieldHelper(mHeader, mItem, component.get("v.mainComponentName"));
    //             if (result.mRecordTypeName.includes('Extend')) {
    //                 component.set('v.DynamicText', 'Inintial Process is not finished yet. Please recheck your SAP Number before Extend');
    //                 component.set("v.AllowSend", false);

    //             }
    //             else {
    //                 if (validatemessage[0] == 'ByPass') {
    //                     component.set('v.mDataReady', true);
    //                     component.set("v.AllowSend", true);

    //                 }
    //                 else {
    //                     component.set("v.AllowSend", false);
    //                     component.set('v.mValidateMessageList', validatemessage);
    //                     console.log('data blank');
    //                 }
    //             }
    //             component.set("v.isGeneralSent", false);

    //         }
    //         else {
    //             console.log(' gen');
    //             //if(component.get("v.mainComponentName") == 'Customer')
    //             if (result.mRecordTypeName.includes('Customer')) {
    //                 if (!mItem.SAPNumber__c) {

    //                     //console.log(' gen1'+ mItem.Customer__r.AccountNumber__c);
    //                     if (mItem.SAPStatus__c == 'Send General View To SAP') {
    //                         console.log(' gen2');
    //                         component.set('v.DynamicText', 'Sending General view to SAP...');
    //                         component.set("v.AllowSend", false);
    //                     }
    //                     else if (mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP' && mItem.SAPCCAMapped__c == true) {
    //                         component.set('v.DynamicText', 'General View has been sent. And CCA has mapped to Salesforce. do you confirmed sales view data before submit again?');
    //                         component.set("v.AllowSend", true);
    //                         component.set("v.ConfirmButtonName", "Confirm")
    //                     }
    //                     else if (mItem.SAPStatus__c == 'SAP Confirmed General View' ||
    //                         (mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP' && mItem.SAPCCAMapped__c == false) || mItem.Customer__r.AccountNumber__c) {
    //                         console.log(' gen3');
    //                         if (result.mQueue == 0) {
    //                             component.set('v.DynamicText', 'General View has been sent. Do you want to inform SAP to mapping CCA and Send Sales data?');
    //                             component.set("v.AllowSend", true);
    //                             component.set("v.ConfirmButtonName", "Inform CCA")
    //                         }
    //                         else {
    //                             component.set('v.DynamicText', 'Account Number: ' + mItem.Customer__r.AccountNumber__c + ' Sales Organization number ' + mItem.SalesOrganization__c + ' is waiting for mapping CCA for ' + result.mQueue + ' record(s). Do you want to pending queue to inform mapping CCA?');
    //                             component.set("v.AllowSend", true);
    //                             component.set("v.ConfirmButtonName", "Queue to Inform CCA")
    //                         }

    //                     }
    //                     else if (mItem.SAPStatus__c == 'Queue CCA') {
    //                         component.set('v.DynamicText', 'Already Submit Queue to Inform CCA');
    //                         component.set("v.AllowSend", false);
    //                     }

    //                     else if (mItem.SAPStatus__c == 'Pending CCA') {
    //                         component.set('v.DynamicText', 'This item has been inform SAP To mapping CCA');
    //                         component.set("v.AllowSend", false);
    //                     }
    //                     else if (mItem.SAPStatus__c == 'Send Sales/Purchasing View To SAP') {
    //                         component.set('v.DynamicText', 'Sending Sales view to SAP...');
    //                         component.set("v.AllowSend", false);
    //                     }
    //                 }
    //                 else {
    //                     if (mItem.SAPStatus__c == 'SAP Confirmed Sales/Purchasing View' && mItem.LatestIntegrationName__c == 'Initial Customer Additional Information' &&
    //                         mItem.IntegrationStatus__c == 'Fail') {
    //                         component.set('v.DynamicText', 'Do you need to submit Additional info again?');
    //                         component.set("v.AllowSend", true);
    //                     }
    //                     else {
    //                         component.set("v.AllowSend", false);
    //                         component.set('v.DynamicText', 'Request has been sync to SAP');
    //                     }


    //                 }

    //             }
    //             //if(component.get("v.mainComponentName") == 'Supplier')
    //             if (result.mRecordTypeName.includes('Supplier')) {
    //                 if (!mItem.SAPNumber__c) {
    //                     if (mItem.SAPStatus__c == 'SAP Confirmed General View' || (mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP' && mItem.Customer__r.SupplierNumber__c)) {
    //                         component.set('v.DynamicText', 'General View has been sent. Do you want to Submit Purchasing data?');
    //                         component.set("v.AllowSend", true);
    //                     }
    //                     else if (mItem.SAPStatus__c == 'Send Sales/Purchasing View To SAP') {
    //                         component.set('v.DynamicText', 'Sending Purchasing view to SAP...');
    //                         component.set("v.AllowSend", false);
    //                     }
    //                 }
    //                 else {
    //                     component.set("v.AllowSend", false);
    //                     component.set('v.DynamicText', 'Request has been sync to SAP');

    //                 }
    //             }
    //             component.set("v.isGeneralSent", true);
    //         }
    //     }

    //     if (result.mRecordTypeName.includes('ShipTo')) {
    //         if (result.mRecordTypeName == 'ShipToCreate') {

    //             if (!mItem.SAPNumber__c) {
    //                 if (!mItem.SAPStatus__c || mItem.SAPStatus__c == 'SAP Confirmed General View' ||
    //                     mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP') {
    //                     component.set('v.mDataReady', true);
    //                     component.set("v.AllowSend", true);
    //                     component.set('v.DynamicText', 'Do you need to confirm to Create ShipTo to SAP?');

    //                     component.set("v.isGeneralSent", true);
    //                 }
    //                 if (mItem.SAPStatus__c == 'Send Sales/Purchasing View To SAP') {
    //                     component.set('v.DynamicText', 'Sending Create Ship to to SAP...');
    //                     component.set("v.AllowSend", false);
    //                 }
    //             }
    //             else {
    //                 component.set("v.AllowSend", false);
    //                 component.set('v.DynamicText', 'Request has been sync to SAP');
    //             }

    //         }
    //         else if (result.mRecordTypeName.includes('ShipToEdit')) {
    //             if (!mItem.SAPNumber__c) {
    //                 if (!result.mAccountNumber) {
    //                     component.set("v.AllowSend", false);
    //                     component.set('v.DynamicText', 'This request has\'t create Customer in SAP yet.');
    //                 }
    //                 else if (!mItem.SAPStatus__c || mItem.SAPStatus__c == 'SAP Confirmed General View' || mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP') {
    //                     component.set('v.mDataReady', true);
    //                     component.set('v.DynamicText', 'Do you need to confirm to Edit ShipTo to SAP?');

    //                     component.set("v.AllowSend", true);
    //                 }
    //                 else if (mItem.SAPStatus__c == 'Send Sales/Purchasing View To SAP') {
    //                     component.set('v.DynamicText', 'Sending Create Edit to to SAP...');
    //                     component.set("v.AllowSend", false);
    //                 }
    //             }
    //             else {
    //                 component.set("v.AllowSend", false);
    //                 component.set('v.DynamicText', 'Request has been sync to SAP');

    //             }

    //             component.set("v.isGeneralSent", true);
    //         }
    //     }

    //     else if (result.mRecordTypeName.includes('Edit')) {
    //         if ((result.mRecordTypeName.includes('Customer') && !result.mAccountNumber) ||
    //             (result.mRecordTypeName.includes('Supplier') && !result.mSupplierNumber)) {
    //             console.log('!result.mAccountNumber')
    //             if (result.mRecordTypeName.includes('Customer') && !result.mAccountNumber) {
    //                 component.set("v.AllowSend", false);
    //                 component.set('v.DynamicText', 'This request has\'t create Customer in SAP yet.');
    //             }
    //             if (result.mRecordTypeName.includes('Supplier') && !result.mSupplierNumber) {
    //                 component.set("v.AllowSend", false);
    //                 component.set('v.DynamicText', 'This request has\'t create Supplier in SAP yet.');
    //             }
    //         }
    //         else {
    //             if (mItem.InternalEditField__c || mHeader.InternalEditField__c) {
    //                 if (result.mRecordTypeName.includes('Customer')) {

    //                     console.log('result.mAccountNumber')
    //                     if (!mItem.SAPNumber__c) {
    //                         console.log('result.1' + mItem.SAPStatus__c);
    //                         if (mItem.SAPStatus__c === 'SAP Confirmed General View' || !mItem.SAPStatus__c || (mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP' && mItem.Customer__r.AccountNumber__c)) {
    //                             component.set('v.DynamicText', 'Do you want to Submit Edit Customer data?');
    //                             component.set("v.AllowSend", true);
    //                         }
    //                         else if (mItem.SAPStatus__c == 'Send Sales/Purchasing View To SAP') {
    //                             component.set('v.DynamicText', 'Sending Edit Customer view to SAP...');
    //                             component.set("v.AllowSend", false);
    //                         }
    //                     }
    //                     else {
    //                         if (mItem.SAPStatus__c == 'SAP Confirmed Sales/Purchasing View' && mItem.LatestIntegrationName__c == 'Initial Customer Additional Information' &&
    //                             mItem.IntegrationStatus__c == 'Fail') {
    //                             component.set('v.DynamicText', 'Do you need to submit Additional info again?');
    //                             component.set("v.AllowSend", true);
    //                         }
    //                         else {
    //                             component.set("v.AllowSend", false);
    //                             component.set('v.DynamicText', 'Request Edit has been sync to SAP');
    //                         }

    //                         console.log('result.2')
    //                     }
    //                 }
    //                 if (result.mRecordTypeName.includes('Supplier')) {
    //                     if (!mItem.SAPNumber__c) {
    //                         if (mItem.SAPStatus__c == 'SAP Confirmed General View' || !mItem.SAPStatus__c || (mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP' && mItem.Customer__r.SupplierNumber__c)) {
    //                             component.set('v.DynamicText', 'Do you want to Submit Edit Purchasing data?');
    //                             component.set("v.AllowSend", true);
    //                         }
    //                         else if (mItem.SAPStatus__c == 'Send Sales/Purchasing View To SAP') {
    //                             component.set('v.DynamicText', 'Sending Edit Purchasing view to SAP...');
    //                             component.set("v.AllowSend", false);
    //                         }
    //                     }
    //                     else {
    //                         component.set("v.AllowSend", false);
    //                         component.set('v.DynamicText', 'Request Edit has been sync to SAP');
    //                     }
    //                 }

    //                 component.set('v.mDataReady', true);
    //                 component.set("v.isGeneralSent", true);
    //             }
    //             else if (!mItem.InternalEditField__c && !mHeader.InternalEditField__c) {
    //                 component.set('v.DynamicText', 'No Edit Field on records.');
    //                 component.set("v.AllowSend", false);
    //             }
    //         }
    //     }
    //     else if (result.mRecordTypeName.includes('Block')) {
    //         if ((result.mRecordTypeName.includes('Customer') && !result.mAccountNumber) ||
    //             (result.mRecordTypeName.includes('Supplier') && !result.mSupplierNumber)) {
    //             if (result.mRecordTypeName.includes('Customer') && !result.mAccountNumber) {
    //                 component.set("v.AllowSend", false);
    //                 component.set('v.DynamicText', 'This request has\'t create Customer in SAP yet.');
    //             }
    //             if (result.mRecordTypeName.includes('Supplier') && !result.mSupplierNumber) {
    //                 component.set("v.AllowSend", false);
    //                 component.set('v.DynamicText', 'This request has\'t create Supplier in SAP yet.');
    //             }
    //         }
    //         else {
    //             if (result.mRecordTypeName.includes('Customer')) {
    //                 if (!mItem.SAPNumber__c) {
    //                     if (mItem.SAPStatus__c == 'SAP Confirmed General View' || (mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP' && mItem.Customer__r.AccountNumber__c)) {
    //                         component.set('v.DynamicText', 'Do you want to Submit Block Customer data?');
    //                         component.set("v.AllowSend", true);
    //                     }
    //                     else if (mItem.SAPStatus__c == 'Send Sales/Purchasing View To SAP') {
    //                         component.set('v.DynamicText', 'Sending Block Customer view to SAP...');
    //                         component.set("v.AllowSend", false);
    //                     }
    //                 }
    //                 else {
    //                     component.set("v.AllowSend", false);
    //                     component.set('v.DynamicText', 'Request Block has been sync to SAP');

    //                 }
    //             }
    //             if (result.mRecordTypeName.includes('Supplier')) {
    //                 if (!mItem.SAPNumber__c) {
    //                     if (mItem.SAPStatus__c == 'SAP Confirmed General View' || (mItem.SAPStatus__c == 'Unsuccessful Send Sales/Purchasing view to SAP' && mItem.Customer__r.SupplierNumber__c)) {
    //                         component.set('v.DynamicText', 'Do you want to Submit Block Purchasing data?');
    //                         component.set("v.AllowSend", true);
    //                     }
    //                     else if (mItem.SAPStatus__c == 'Send Sales/Purchasing View To SAP') {
    //                         component.set('v.DynamicText', 'Sending Block Purchasing view to SAP...');
    //                         component.set("v.AllowSend", false);
    //                     }
    //                 }
    //                 else {
    //                     component.set("v.AllowSend", false);
    //                     component.set('v.DynamicText', 'Request Block has been sync to SAP');

    //                 }
    //             }
    //             component.set('v.mDataReady', true);
    //             component.set("v.isGeneralSent", true);
    //         }
    //     }
    //     else if (result.mRecordTypeName.includes('Change')) {

    //     }
    // },

    handleState: function (component, helper, result) {
        console.log('Run display msg')
        var mHeader = result.mRequestHeader;
        var mItem = result.mRequestItem;
        // result.mQueue = 2; //test

        var configState = helper.getConfigState(result);

        var msg = '';
        var btnList = [];
        console.log('Debug mitem', mItem)
        

        var SAPStatus = mItem.SAPStatus__c;
        var SAPNumber = mItem.SAPNumber__c;
        var SAPCCAMapped = mItem.SAPCCAMapped__c;
        var AccountNumber = result.mAccountNumber;
        var SupplierNumber = result.mSupplierNumber;
        var recordType = result.mRecordTypeName;
        var isGeneralChanged = false;
        var inQueueCCA = result.mQueue > 0;
        var isFound = false;
        var LatestIntegrationName = mItem.LatestIntegrationName__c;
        var IntegrationStatus = mItem.IntegrationStatus__c;

        if(mItem.InternalGeneralChangedField__c) {
            var generalChangedJSON = JSON.parse(mItem.InternalGeneralChangedField__c);
            console.log('Debug general changed json',generalChangedJSON)
            isGeneralChanged = generalChangedJSON.length > 0;
        }

        console.log('SAPStatus:', SAPStatus, 'SAPNumber:', SAPNumber, 'SAPCCAMapped:', SAPCCAMapped, 'recordType:', recordType, 'isGeneralChanged:', isGeneralChanged, 'inQueueCCA:',inQueueCCA, 'AccountNumber:',AccountNumber)

        for (var i = 0; i < configState.length; i++) {
            var state = configState[i];
            for (var j = 0; j < state.conditions.length; j++) {
                var conditions = state.conditions[j];
                // Object.keys(condition).forEach((cond) => {
                // console.log('Check display', i, j, conditions)
                if ('RecordTypeContains' in conditions) {
                    if (!helper.checkRecordTypeContains(recordType, conditions.RecordTypeContains)) {
                        // false in condition
                        continue;
                    }
                }

                if ('GeneralChanged' in conditions && conditions.GeneralChanged != isGeneralChanged) {
                    continue;
                }

                if ('SAPStatus__c' in conditions && conditions.SAPStatus__c != SAPStatus) {
                    continue;
                }

                if ('LatestIntegrationName' in conditions && conditions.LatestIntegrationName != LatestIntegrationName) {
                    continue;
                }

                if ('IntegrationStatus' in conditions && conditions.IntegrationStatus != IntegrationStatus) {
                    continue;
                }

                if ('SAPNumber__c' in conditions) {
                    if (conditions.SAPNumber__c == 'not null') {
                        if(!SAPNumber) {
                            continue;
                        }
                    } else if (conditions.SAPNumber__c != SAPNumber) {
                        continue;
                    }
                }

                if ('inQueueCCA' in conditions && conditions.inQueueCCA != inQueueCCA) {
                    continue;
                }

                if('AccountNumber' in conditions) {
                    if (conditions.AccountNumber == 'not null') {
                        if(!AccountNumber) {
                            continue;
                        }
                    } else if (conditions.AccountNumber != AccountNumber) {
                        continue;
                    }
                }

                if('SupplierNumber' in conditions) {
                    if (conditions.SupplierNumber == 'not null') {
                        if(!SupplierNumber) {
                            continue;
                        }
                    } else if (conditions.SupplierNumber != SupplierNumber) {
                        continue;
                    }
                }

                isFound = true;
                // })
            }
            if (isFound) {
                msg = state.msg;
                btnList = state.btnList;
                break;
            }
        }

        component.set('v.DynamicText', msg);
        component.set('v.buttonList', btnList);
    },

    checkRecordTypeContains: function (recordType, containsList) {
        var response = false;
        for (var i = 0; i < containsList.length; i++) {
            var rt = containsList[i];
            // containsList.forEach(rt => {
            // if(rt.includes('&&')) {
            //     var checkRT = rt.split('&&');
            //     var subResult = true;
            //     for(var j = 0; j < checkRT.length; j++) {
            //         var eactRT = checkRT[j];
            //         if(!recordType.includes(eactRT)) {
            //             subResult = false;
            //             break;
            //         }
            //     }
            //     response = subResult;
            // } else {
            if (recordType.includes(rt)) {
                response = true;
                break;
            }
            // }
        };
        return response;
    },

    previewTable: function (component, event, helper) {
        component.set('v.HeaderFieldHeaderList', [
            { label: 'Field name', fieldName: 'mLabel', type: 'text', wrapText: true },
            { label: 'Current values', fieldName: 'mOldValue', type: 'text' },
            { label: 'Latest values', fieldName: 'mLatestValue', type: 'text' },
        ]);
        component.set('v.loaded',false);
        var action = component.get("c.onloadTable");
        action.setParams({ mItem: component.get('v.mRequestItem') });
        console.log('before apex');

        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log('state: ' + state);

            if (state === 'SUCCESS') {
                var result = response.getReturnValue();

                result.mAllEditList.sort(function (a, b) {
                    if (a.mLabel < b.mLabel) {
                        return -1;
                    }
                    if (a.mLabel > b.mLabel) {
                        return 1;
                    }
                    return 0;
                });

                component.set('v.FieldChanged', result.mAllEditList);
                component.set("v.isPreviewTable", true);

                if (result.mAllEditList.length > 0) {
                    component.set("v.isPreviewTable", true);
                }
                component.set('v.loaded',true);
            }
            else {
                helper.toastEvent('Error', 'Internal Error Please contact your administrator.', 'error');
                console.log('ERROR:: ', data.message);
                helper.closeModal(component);
                component.set('v.loaded', true);

            }
        });
        $A.enqueueAction(action);
    },

    submitWithGeneral: function (component, event, helper) {
        console.log('debug submit with general')
        helper.SendToSAP(component, event, helper, true)
    },

    submitWithOutGeneral: function (component, event, helper) {
        console.log('debug submit without general')
        helper.SendToSAP(component, event, helper, false)
    },

    getConfigState: function(result) {
        // var mHeader = result.mRequestHeader;
        var mItem = result.mRequestItem;
        var counterPartyType = result.mRecordTypeName.includes('Customer') ? 'Customer' : 'Supplier';

        //Customer
        var initialMsg = 'Are you sure you want to send this counterpaty information to SAP?<br/>After the submission, you will not be able to edit this information.';
        var unsuccessGeneralMsg = 'Are you sure you want to send this General View to SAP?';
        var waitingGeneral = 'In progress creating General View in SAP';
        var waitingCCA = 'In progress mapping CCA in SAP';
        var waitingSalesView = 'In progress creating Sales View in SAP';
        var toSendSalesPurchaseView = 'General View has been created, and CCA has been mapped. Do you confirm to submit Sales/Purchasing data to SAP?';
        var initialAnotherItem_Changed = 'General Vew has been created, Are you sure you want to send the edit General View to SAP?'; //
        var initialAnotherItem_NotChanged = 'General View has been created in SAP. And CCA has mapped to Salesforce. Do you confirmed to re-submit create sales view?'; //
        var toQueueCCA = 'Account Number: ' + mItem.Customer__r.AccountNumber__c + ' Sales Organization number ' + mItem.SalesOrganization__c + ' is waiting for mapping CCA for ' + result.mQueue + ' record(s). Do you want to waiting in queue to inform mapping CCA?';
        // Additional Info
        var waitingSendAddInfo = 'In progress creating Additonal Information in SAP';
        var unsuccessSendAddInfo = 'Customer Information has been created. Do you confirm to submit additional data to SAP?';

        //Supplier
        var waitingPurchaseView = 'In progress creating Purchasing View in SAP';
        var toSendPurchaseView = 'General View has been created. Do you confirm to submit Purchasing data to SAP?';
        // var changedGeneralSupplier = 'General View has been created. Do you confirm to submit Purchasing data to SAP?';
        
        //Ship To
        var shipToType = 'Create';
        if(result.mRecordTypeName.includes('Edit')) {
            shipToType = 'Edit';
        }
        // var initialShipTo = 'Are you sure you want to send '+shipToType+' ShipTo data to SAP?';
        var initialShipTo = 'Are you sure you want to send this Ship-to information to SAP?<br/>After the submission, you will not be able to edit this information.';
        var toSendViewShipto = 'General View has been created. Do you confirm to submit '+shipToType+' ShipTo data?';

        //EDIT Customer/Supplier
        // var initialEdit = initialMsg;
        
        var confirmedMsg = 'Request has been sync to SAP';
        
        var configState = [
            // INITIAL + EXTEND CUSTOMER
            //for n item
            {
                msg: initialAnotherItem_NotChanged,
                btnList: [
                    {
                        label: 'Inform CCA',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        AccountNumber: 'not null',
                        GeneralChanged: false,
                        inQueueCCA: false,
                        // to pending cca
                    }
                ]
            },
            {
                msg: initialAnotherItem_Changed,
                btnList: [
                    {
                        label: 'Preview General change',
                        action: 'previewTable',
                        variant: 'brand-outline',
                    },
                    {
                        label: 'Submit General and Inform CCA',
                        action: 'submitWithGeneral'
                    },
                    {
                        label: 'Inform CCA',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        AccountNumber: 'not null',
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        AccountNumber: 'not null',
                        GeneralChanged: true,
                    }
                ]
            },
            {
                msg: toQueueCCA,
                btnList: [
                    {
                        label: 'Inform CCA',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        AccountNumber: 'not null',
                        GeneralChanged: false,
                        inQueueCCA: true
                        // to queue
                    }
                ]
            },
            
            // for first item
            {
                msg: initialMsg,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithOutGeneral'
                    },
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: null,
                    },
                ]
            },
            {
                msg: unsuccessGeneralMsg,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithOutGeneral'
                    },
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        // AccountNumber: null,
                        GeneralChanged: false,
                    }
                ]
            },
            {
                msg: toSendSalesPurchaseView,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithOutGeneral'
                    },
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
                        // GeneralChanged: false,
                    },
                ]
            },
            {
                msg: waitingGeneral,
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'Send General View To SAP',
                        // AccountNumber: null,
                        // GeneralChanged: false,
                    },
                ]
            },
            {
                msg: waitingSalesView,
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend', 'CustomerEdit','CustomerBlock'],
                        SAPStatus__c: 'Send Sales/Purchasing View To SAP',
                        // AccountNumber: null,
                        // GeneralChanged: false,
                    }
                ]
            },

            {
                msg: waitingCCA,
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        AccountNumber: null
                    },
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'Queue CCA',
                    },
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'Pending CCA',
                    }
                ]
            },

            // Additional Info
            {
                msg: waitingSendAddInfo,
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'SAP Confirmed Sales/Purchasing View',
                        LatestIntegrationName: 'Initial Customer Additional Information',
                        IntegrationStatus: 'In Progress'
                    }
                ]
            },
            {
                msg: unsuccessSendAddInfo,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerInitial', 'CustomerExtend'],
                        SAPStatus__c: 'SAP Confirmed Sales/Purchasing View',
                        LatestIntegrationName: 'Initial Customer Additional Information',
                        IntegrationStatus: 'Fail'
                    }
                ]
            },

            // INITIAL + EXTEND SUPPLIER
            {
                msg: toSendPurchaseView,
                btnList: [
                    {
                        label: 'Preview General change',
                        action: 'previewTable',
                        variant: 'brand-outline',
                    },
                    {
                        label: 'Submit All Change',
                        action: 'submitWithGeneral'
                    },
                    {
                        label: 'Submit Purchasing View',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: null,
                        GeneralChanged: true,
                        SupplierNumber: 'not null'
                    },
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        GeneralChanged: true,
                        // SupplierNumber: 'not null'
                    },
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        GeneralChanged: true,
                        SupplierNumber: 'not null'
                    }
                ]
            },
            {
                msg: toSendPurchaseView,
                btnList: [
                    {
                        label: 'Preview General change',
                        action: 'previewTable',
                        variant: 'brand-outline',
                    },
                    {
                        label: 'Submit All Change',
                        action: 'submitWithGeneral'
                    },
                ],
                conditions: [
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: null,
                        GeneralChanged: true,
                        SupplierNumber: null
                    },
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        GeneralChanged: true,
                        SupplierNumber: null
                    }
                ]
            },
            {
                msg: initialMsg,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: null,
                        GeneralChanged: false,
                    }
                ]
            },
            {
                msg: toSendPurchaseView,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        GeneralChanged: false,
                    },
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        GeneralChanged: false,
                    }
                ]
            },
            {
                msg: waitingPurchaseView,
                conditions: [
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend', 'SupplierEdit', 'SupplierBlock'],
                        SAPStatus__c: 'Send Sales/Purchasing View To SAP',
                    }
                ]
            },
            {
                msg: toSendPurchaseView,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['SupplierInitial', 'SupplierExtend'],
                        SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
                    }
                ]
            },

            // SHIP-TO
            {
                msg: initialShipTo,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['ShipToCreate','ShipToEdit'],
                        SAPStatus__c: null,
                    },
                ]
            },
            {
                msg: waitingSalesView,
                conditions: [
                    {
                        RecordTypeContains: ['ShipToCreate','ShipToEdit'],
                        SAPStatus__c: 'Send Sales/Purchasing View To SAP',
                    },
                ]
            },
            {
                msg: toSendViewShipto,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['ShipToCreate','ShipToEdit'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        GeneralChanged: false,
                    },
                    {
                        RecordTypeContains: ['ShipToCreate','ShipToEdit'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        GeneralChanged: false,
                    },
                    {
                        RecordTypeContains: ['ShipToCreate','ShipToEdit'],
                        SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
                    },
                ]
            },
            {
                msg: toSendViewShipto,
                btnList: [
                    {
                        label: 'Preview General change',
                        action: 'previewTable',
                        variant: 'brand-outline',
                    },
                    {
                        label: 'Submit All Change',
                        action: 'submitWithGeneral'
                    },
                    {
                        label: 'Submit Sales View',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['ShipToCreate','ShipToEdit'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['ShipToCreate','ShipToEdit'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        GeneralChanged: true,
                    },
                ]
            },

            //Edit
            {
                msg: initialMsg,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerEdit','SupplierEdit'],
                        SAPStatus__c: null,
                        GeneralChanged: false,
                    }
                ]
            },
            {
                msg: toSendSalesPurchaseView,
                btnList: [
                    {
                        label: 'Submit',
                        action: 'submitWithGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerEdit','SupplierEdit'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        GeneralChanged: false,
                    },
                    {
                        RecordTypeContains: ['CustomerEdit','SupplierEdit'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        GeneralChanged: false,
                    },
                    {
                        RecordTypeContains: ['CustomerEdit','SupplierEdit'],
                        SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
                        GeneralChanged: false,
                    }
                ]
            },
            //Edit -> Customer
            {
                msg: toSendSalesPurchaseView,
                btnList: [
                    {
                        label: 'Preview General change',
                        action: 'previewTable',
                        variant: 'brand-outline',
                    },
                    {
                        label: 'Submit All Change',
                        action: 'submitWithGeneral'
                    },
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerEdit'],
                        SAPStatus__c: null,
                        AccountNumber: null,
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['CustomerEdit'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        AccountNumber: null,
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['CustomerEdit'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        AccountNumber: null,
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['CustomerEdit'],
                        SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
                        AccountNumber: null,
                        GeneralChanged: true,
                    }
                ]
            },
            {
                msg: toSendSalesPurchaseView,
                btnList: [
                    {
                        label: 'Preview General change',
                        action: 'previewTable',
                        variant: 'brand-outline',
                    },
                    {
                        label: 'Submit All Change',
                        action: 'submitWithGeneral'
                    },
                    {
                        label: 'Submit Sales View',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['CustomerEdit'],
                        SAPStatus__c: null,
                        AccountNumber: 'not null',
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['CustomerEdit'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        AccountNumber: 'not null',
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['CustomerEdit'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        AccountNumber: 'not null',
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['CustomerEdit'],
                        SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
                        AccountNumber: 'not null',
                        GeneralChanged: true,
                    }
                ]
            },
            //Edit -> Supplier
            {
                msg: toSendSalesPurchaseView,
                btnList: [
                    {
                        label: 'Preview General change',
                        action: 'previewTable',
                        variant: 'brand-outline',
                    },
                    {
                        label: 'Submit All Change',
                        action: 'submitWithGeneral'
                    },
                ],
                conditions: [
                    {
                        RecordTypeContains: ['SupplierEdit'],
                        SAPStatus__c: null,
                        SupplierNumber: null,
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['SupplierEdit'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        SupplierNumber: null,
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['SupplierEdit'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        SupplierNumber: null,
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['SupplierEdit'],
                        SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
                        SupplierNumber: null,
                        GeneralChanged: true,
                    }
                ]
            },
            {
                msg: toSendSalesPurchaseView,
                btnList: [
                    {
                        label: 'Preview General change',
                        action: 'previewTable',
                        variant: 'brand-outline',
                    },
                    {
                        label: 'Submit All Change',
                        action: 'submitWithGeneral'
                    },
                    {
                        label: 'Submit Purchasing View',
                        action: 'submitWithOutGeneral'
                    }
                ],
                conditions: [
                    {
                        RecordTypeContains: ['SupplierEdit'],
                        SAPStatus__c: null,
                        SupplierNumber: 'not null',
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['SupplierEdit'],
                        SAPStatus__c: 'SAP Confirmed General View',
                        SupplierNumber: 'not null',
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['SupplierEdit'],
                        SAPStatus__c: 'Unsuccessful Send General view to SAP',
                        SupplierNumber: 'not null',
                        GeneralChanged: true,
                    },
                    {
                        RecordTypeContains: ['SupplierEdit'],
                        SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
                        SupplierNumber: 'not null',
                        GeneralChanged: true,
                    }
                ]
            },


            //Block
            // {
            //     msg: initialMsg,
            //     btnList: [
            //         {
            //             label: 'Submit',
            //             action: 'submitWithGeneral'
            //         }
            //     ],
            //     conditions: [
            //         {
            //             RecordTypeContains: ['CustomerBlock','SupplierBlock'],
            //             SAPStatus__c: null,
            //         },
            //         {
            //             RecordTypeContains: ['CustomerBlock','SupplierBlock'],
            //             SAPStatus__c: 'SAP Confirmed General View',
            //         },
            //         {
            //             RecordTypeContains: ['CustomerBlock','SupplierBlock'],
            //             SAPStatus__c: 'Unsuccessful Send Sales/Purchasing view to SAP',
            //         }
            //     ]
            // },

            //COMMON
            {
                msg: confirmedMsg,
                conditions: [
                    {
                        // RecordTypeContains: ['Initial', 'Extend'],
                        SAPStatus__c: 'SAP Confirmed Sales/Purchasing View',
                    },
                ]
            },
        ]

        return configState;
    }
})