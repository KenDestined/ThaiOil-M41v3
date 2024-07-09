({
	doInit: function(component, event, helper) {
        var recordId = component.get("v.recordId");
        console.log('--doInit-recordId---'+recordId);
        helper.getBUInformation(component,event, helper, recordId);
        //this.handleRenderCreditConditionFields(component,event, recordId);
        

    },
    toggleSection : function(component, event, helper) {
        var sectionAuraId = event.target.getAttribute("data-auraId");
        var sectionDiv = component.find(sectionAuraId).getElement();
        var sectionState = sectionDiv.getAttribute('class').search('slds-is-open'); 
         
        // -1 open/close section
        if(sectionState == -1){
            sectionDiv.setAttribute('class' , 'slds-section slds-is-open');
        }else{
            sectionDiv.setAttribute('class' , 'slds-section slds-is-close'); 
        }
    },
    handleSaveFunction: function(component, event, helper) {
        try
        {
            console.log('---handleSaveFunction---');
            component.set('v.ButtonLabel','Save');
            
        }
        catch(ex)
        {
            console.log('ex---'+ex.message());            
        }
    },
    handleSubmitFunction: function(component, event, helper) {
        console.log('---handleSubmitFunction---');
        component.set('v.ButtonLabel','Submit');
    },
    handleEditClick: function(component, event, helper) {
        console.log('---handleEditClick---');
        var  RecTypeName = component.get("v.RecordTypeName");
        console.log('---RecTypeName--'+RecTypeName);
        var buInfo = component.get("v.BUInfo"); 
        console.log('---buInfo.BusinessUnit__c---'+buInfo.BusinessUnit__c);
        
        component.set('v.IsPageDisable',false);
        component.set('v.IsButtonDisable',false);
        component.set('v.IsEditButtonDisable',true);
        
        if(buInfo.BusinessUnit__c=="TX")
        {
                
                var CashOnDelivery = component.find("CashOnDelivery").get("v.value");
            	console.log('---EDIT-CashOnDelivery--'+CashOnDelivery);
                var HavingCollateral = component.find("HavingCollateral").get("v.value");
                var BuyTradeEndorsement = component.find("BuyTradeEndorsement").get("v.value");
                var BuyTradeDCLCondition = component.find("BuyTradeDCLCondition").get("v.value");
                var HavingOpenedCredit = component.find("HavingOpenedCredit").get("v.value");

                if(RecTypeName == 'Customer')
                {
                    //enable picklist   
                    if(CashOnDelivery == 'No')
                    {
                        component.set('v.HavingCollateralIsDisable',false);
                        component.set('v.BuyTradeEndorsementIsDisable',false); 
                        component.set('v.BuyTradeDCLConditionIsDisable',false);
                        component.set('v.HavingOpenedCreditIsDisable',false);
                        component.set("v.CurrencyDisable",false);
                        
                        if(HavingCollateral == '' && BuyTradeEndorsement == '' && BuyTradeDCLCondition == '' && HavingOpenedCredit == '')
                        {
                            component.set('v.IsRequired',true);
                            component.set('v.IsShowRequiredMsg',true);
                        }
                        if(HavingCollateral != 'Yes' && BuyTradeEndorsement != 'Yes' && BuyTradeDCLCondition != 'Yes' && HavingOpenedCredit != 'Yes')
                        {
                            component.set('v.IsRequired',true);
                            component.set('v.IsShowRequiredMsg',true);
                        }
                        if(HavingCollateral=='Yes' || BuyTradeEndorsement == 'Yes' || BuyTradeDCLCondition == 'Yes' || HavingOpenedCredit == 'Yes')
                        {
                            component.set('v.IsRequired',false); 
                            component.set('v.IsShowRequiredMsg',false);
                        }
                        
                        if(HavingCollateral == 'Yes'){
                            component.set('v.HavingCollateralIsDisable',false);
                            component.set('v.AmountBankGuaranteeIsDisable',false);
    
                        }else 
                            component.set('v.HavingCollateralIsDisable',false);
                        
                        if(BuyTradeEndorsement == 'Yes'){
                            component.set('v.BuyTradeEndorsementIsDisable',false);
                            component.set('v.AmountBuyTradeIsDisable',false);
                        }else 
                            component.set('v.BuyTradeEndorsementIsDisable',false);
                        
                        if(BuyTradeDCLCondition == 'Yes'){
                            component.set('v.BuyTradeDCLConditionIsDisable',false);
                            component.set('v.AmountDCLConditionIsDisable',false);
                        }else 
                            component.set('v.BuyTradeDCLConditionIsDisable',false);
                        
                        if(HavingOpenedCredit == 'Yes'){
                            component.set('v.HavingOpenedCreditIsDisable',false);
                            component.set('v.AmountOpenedCreditIsDisable',false);
                        }else 
                            component.set('v.HavingOpenedCreditIsDisable',false);
                    }
                    else
                    {
                        console.log('---CashOnDelivery-else--');
                        component.set('v.HavingCollateralIsDisable',true);
                        component.set('v.BuyTradeEndorsementIsDisable',true); 
                        component.set('v.BuyTradeDCLConditionIsDisable',true);
                        component.set('v.HavingOpenedCreditIsDisable',true);
                        component.set("v.CurrencyDisable",true);
                    }
                }
                else if(RecTypeName == 'Supplier')
                {
                    var HavingCreditTermorLetter = component.find("HavingCreditTermorLetter").get("v.value");
                    console.log('---HavingCreditTermorLetter--'+HavingCreditTermorLetter);
                    if(CashOnDelivery == 'No')
                    {
                        console.log('---No1--');
                        component.set('v.HavingCollateralIsDisable',false);
                        component.set('v.radioCreditTermIsDisable',false);
                        component.set("v.CurrencyDisable",false);
                        //enable picklist
                        if(HavingCollateral == 'Yes'){
                            component.set('v.HavingCollateralIsDisable',false);
                            component.set('v.AmountBankGuaranteeIsDisable',false);
    
                        }else 
                            component.set('v.HavingCollateralIsDisable',false);
                        
                        if(HavingCreditTermorLetter == 'Yes'){
                            component.set('v.radioCreditTermIsDisable',false);
                            component.set('v.YesCreditTermIsDisable',false);
                        }else 
                            component.set('v.radioCreditTermIsDisable',false);
                    }else
                    {
                        console.log('---Yes1--');
                        component.set('v.HavingCollateralIsDisable',true);
                        component.set('v.radioCreditTermIsDisable',true);
					}
                }    
        }
    },
    handleSubmit : function(component, event, helper) {
        try
        {
            if(!helper.validateEffectiveDate(component, event, helper)) {
                event.preventDefault();
                return;
            }
            var errormsg= '';
            var ButtonLabel1 = component.get("v.ButtonLabel");
            console.log('---ButtonLabel1---'+ButtonLabel1);
            var buInfo = component.get("v.BUInfo"); 
        	console.log('---buInfo.BusinessUnit__c---'+buInfo.BusinessUnit__c);
            var  RecTypeName = component.get("v.RecordTypeName");
            console.log('---RecTypeName--'+RecTypeName);
            var checkAmountPass;
            if(ButtonLabel1 != undefined && ButtonLabel1 != '')
            {
                console.log('---handleSave---');
                component.set('v.IsPageDisable',true);
                component.set('v.IsButtonDisable',true);
                event.preventDefault();
                const fields = event.getParam('fields');
                
                if(buInfo.BusinessUnit__c=="TX")
                {
                    var RequestToChangeCredit = component.find("RequestToChangeCreditTX").get("v.value");
                    fields.RequestToChangeCredit__c = RequestToChangeCredit;
                    fields.RequestToChangeCreditTX__c = RequestToChangeCredit;

                    component.find("RequestToChangeCreditTX").get("v.value");

                    var cmpICRTX = component.find('InternalCreditRating');
                    if(cmpICRTX) {
                        // component.find('ChangeCreditFinInternalCreditRating').set('v.value',cmpICRTX.get('v.value'));
                        fields.FinIntCrRating__c = cmpICRTX.get('v.value');
                    }
                        var msgErr = 'Amount need to be more than zero';
                        if(RecTypeName == 'Customer') 
                        {
                            var CashOnDelivery1 = component.find("CashOnDelivery").get("v.value");
                            console.log('CashOnDeliverybuInfo is not defined1---' + CashOnDelivery1);
                        
                            var amount2 = component.find("Amount2").get("v.value");
                            var HavingCollateral = component.find("HavingCollateral").get("v.value");
                            console.log('amount2---' + amount2);
                            
                            var amount3 = component.find("Amount3").get("v.value");
                            var BuyTradeEndorsement = component.find("BuyTradeEndorsement").get("v.value");
                            console.log('amount3---' + amount3);
                            
                            var amount4 = component.find("Amount4").get("v.value");
                            var BuyTradeDCLCondition = component.find("BuyTradeDCLCondition").get("v.value");
                            console.log('amount4---' + amount4);
                            
                            var amount5 = component.find("Amount5").get("v.value");
                            var HavingOpenedCredit = component.find("HavingOpenedCredit").get("v.value");
                            console.log('amount5---' + amount5);
                            
                            var amount6 = component.find("Amount6").get("v.value");
                            console.log('amount6---' + amount6);
                            //fields.TotalSecuredAmount__c = amount6;

                            var amount7 = component.find("Amount7").get("v.value");
                            console.log('amount7---' + amount7);
                                                             
                            
                            if((amount2 <= 0 && HavingCollateral == 'Yes') || (amount3 <= 0 && BuyTradeEndorsement == 'Yes') || (amount4 <= 0 && BuyTradeDCLCondition == 'Yes') || (amount5 <= 0 && HavingOpenedCredit == 'Yes'))
                            {
                                checkAmountPass = false;
                                if(amount2 <= 0 && HavingCollateral == 'Yes')
                                    component.set('v.isAmount2Required',true);
                                else if(amount3 <= 0 && BuyTradeEndorsement == 'Yes')
                                    component.set('v.isAmount3Required',true);
                                else if(amount4 <= 0 && BuyTradeDCLCondition == 'Yes')
                                    component.set('v.isAmount4Required',true);
                                else if(amount5 <= 0 && HavingOpenedCredit == 'Yes')
                                    component.set('v.isAmount5Required',true);
                            }
                            
                            if(CashOnDelivery1 == 'Yes')
                            {
                                checkAmountPass = true;
                            }
                            else if(CashOnDelivery1 == 'No')
                            {
                                console.log('----CashOnDelivery1- NO --');
                                if((HavingCollateral == '' && BuyTradeEndorsement == '' && BuyTradeDCLCondition == '' && HavingOpenedCredit == '')||(HavingCollateral == 'Yes' || BuyTradeEndorsement == 'Yes' || BuyTradeDCLCondition == 'Yes' || HavingOpenedCredit == 'Yes'))
                                {
                                    console.log('----ERROR- masg --');
                                    component.set('v.IsRequired',true);
                                    component.set('v.IsShowRequiredMsg',true);
                                }
                            }                    
                        }
                        else
                        {
                            var amount2 = component.find("Amount2").get("v.value");
                            var HavingCollateral = component.find("HavingCollateral").get("v.value");
                            
                            var AmountCreditTerm = component.find("AmountCreditTerm").get("v.value");
                            var HavingCreditTermorLetter = component.find("HavingCreditTermorLetter").get("v.value");
                            
                            console.log('amount2---' + amount2);
                            console.log('AmountCreditTerm---' + AmountCreditTerm);
                            
                            if((amount2 <= 0 && HavingCollateral == 'Yes') || (AmountCreditTerm <= 0 && HavingCreditTermorLetter == 'Yes'))
                            {
                                checkAmountPass = false;
                            }
                            
                            if(HavingCollateral == 'No' && HavingCreditTermorLetter == 'No')
                            {
                                checkAmountPass = false;
                                msgErr = 'Please complete all required fields.';
                                component.set('v.IsShowRequiredMsg',true);
                                //component.set('v.IsRequired',true);
                            }
                                
                        }
                }
                else
                {
                    var RequestToChangeCredit = component.find("RequestToChangeCredit").get("v.value");
                    fields.RequestToChangeCredit__c = RequestToChangeCredit;
                    var cmpICRTOP = component.find('ChangeCreditInternalCreditRating');
                    console.log('Submit top ChangeCreditInternalCreditRating',cmpICRTOP.get('v.value'))
                    if(cmpICRTOP) {
                        fields.FinIntCrRating__c = cmpICRTOP.get('v.value');
                    }
                    // fields.RequestToChangeCreditTX__c = RequestToChangeCredit;
                }
                if(component.get('v.IsSubTypeCondition2Disable') == true)
                {
                    fields.SubTypeCondition2__c = component.find("SubTypeConditionhidden").get("v.value");
                }
                else
                {
                    fields.SubTypeCondition2__c = component.find("SubTypeCondition2").get("v.value");
                }
                
                var CreditOwnerId = component.get('v.CreditOwnerId');
                if(CreditOwnerId) {
                    fields.CreditOwner__c = CreditOwnerId;
                }
                //var RequestToChangeCredit = component.find("RequestToChangeCredit").get("v.value");
                //fields.RequestToChangeCredit__c = RequestToChangeCredit;
                console.log('RequestToChangeCredit__c---'+fields.RequestToChangeCredit__c);
                console.log('RequestToChangeCreditTX__c---'+fields.RequestToChangeCreditTX__);
                
                component.find("RequestToChangeCreditTX").get("v.value");
                var isReassigned = $A.get("$SObjectType.CurrentUser.Id") != CreditOwnerId;
                console.log('Debug reassigned',isReassigned,$A.get("$SObjectType.CurrentUser.Id"),CreditOwnerId)
                if(ButtonLabel1 == 'Submit')
                {
                    var successMsg = 'The new credit condition has been evaluated';
                    if(isReassigned){
                        successMsg = 'The request form has been reassigned to delegated person!';
                    }
                    fields.Status__c = 'In Review';
                    fields.Approval_Step__c = 'Select Committee';
                    
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": successMsg,
                        "type" : "success"
                    });
                    toastEvent.fire();
                }
                else
                {
                    var successMsg = 'The request form has been saved';
                    if(isReassigned){
                        successMsg = 'The request form has been reassigned to delegated person!';
                    }

                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": successMsg,
                        "type" : "success"
                    });
                    toastEvent.fire();
                }
                console.log('Debug total amount before saving total=',component.get('v.TotalAmount'),' Amount6=',component.find("Amount6").get("v.value"));
                console.log('Debug fields update',JSON.parse(JSON.stringify(fields)))
                debugger;
                component.find('recordEditForm').submit(fields); 
                component.set('v.showLoading',true);
            }
            
            
        }
        catch(ex)
        {
            console.error('ex---'+ex.message);            
        }

    },
    handleSuccess: function(component, event, helper) {
        console.log('---handleSuccess--');
        var ButtonLabel1 = component.get("v.ButtonLabel");
        console.log('---ButtonLabel1---'+ButtonLabel1);
        
        //disable fields
        component.set('v.IsEditButtonDisable',false);
        component.set('v.HavingCollateralIsDisable',true);
        component.set('v.BuyTradeEndorsementIsDisable',true); 
        component.set('v.BuyTradeDCLConditionIsDisable',true);
        component.set('v.HavingOpenedCreditIsDisable',true);
        component.set("v.CurrencyDisable",true);
        
        if(ButtonLabel1 != undefined && ButtonLabel1 != '')
        {
            
            window.setTimeout(
                $A.getCallback(function() {
                    component.set('v.showLoading',false);
                    window.location.reload();
                    component.set("v.ButtonLabel",'');
                }), 3000
            );
        } else {
            component.set('v.showLoading',false);
        }
    },
    handleCancel : function(component, event, helper) {
        console.log('button cancel---');
        component.set('v.IsEditButtonDisable',false);
        component.set("v.ButtonLabel",'');
        component.set('v.IsPageDisable',true);
        component.set('v.IsButtonDisable',true);
        
        component.set('v.HavingCollateralIsDisable',true);
        component.set('v.BuyTradeEndorsementIsDisable',true); 
        component.set('v.BuyTradeDCLConditionIsDisable',true);
        component.set('v.HavingOpenedCreditIsDisable',true);
        component.set("v.CurrencyDisable",true);
        component.set("v.AmountBankGuaranteeIsDisable",true);
        component.set("v.AmountBuyTradeIsDisable",true);
        component.set("v.AmountDCLConditionIsDisable",true);
        component.set("v.AmountOpenedCreditIsDisable",true);
        
        /*component.set('v.IsWaiveDisable',true);
        component.set('v.IsTDFieldsDisable',true);
        component.set('v.IsTDWaiveDisable',true);
        component.set('v.IsSHDisable',true);
        component.set('v.IsVPDisable',true);
        component.set('v.radioCreditTermIsDisable',true);
        component.set('v.YesCreditTermIsDisable',true);
        component.set('v.radio2IsDisable',true);
        component.set('v.Yes2IsDisable',true);
        component.set('v.CurrencyDisable',true);
        component.set('v.radio3IsDisable',true);
        component.set('v.Yes3IsDisable',true);
        
        component.set('v.radio4IsDisable',true);
        component.set('v.Yes4IsDisable',true);*/
        
        window.location.reload();
    },

    handleBtnChange : function(component, event, helper) {
        helper.handleRenderCreditConditionFields(component, event, helper, true);
    },

    
    handleRenderPicklist: function(component, event, helper) {
        var  RecTypeName = component.get("v.RecordTypeName");
        console.log('---RecTypeName--'+RecTypeName);
        var buInfo = component.get("v.BUInfo"); 
        console.log('---buInfo.BusinessUnit__c---'+buInfo.BusinessUnit__c);
        
        var CashOnDelivery = component.find("CashOnDelivery").get("v.value");
        var HavingCollateral = component.find("HavingCollateral").get("v.value");

        var fieldName = event.getSource().get('v.fieldName');
        var value = event.getSource().get('v.value');
        if(value == 'Yes') {
            console.log('Debug onChangeTCI',fieldName,value)
            if(fieldName == 'BuyTradeEndorsement__c') {
                // component.find('BuyTradeEndorsement').set('v.value',);
                component.find('BuyTradeDCLCondition').set('v.value','No');
            } else if(fieldName == 'BuyTradeDCLCondition__c') {
                component.find('BuyTradeEndorsement').set('v.value','No');
            }
        }
        
        //1 HavingCollateral
        if(HavingCollateral == 'Yes')
        {
            if(buInfo.BusinessUnit__c != 'TX')
                component.set('v.CurrencyDisable',false);
            
            component.set('v.AmountBankGuaranteeIsDisable',false); 
            component.set('v.Ispass_Excelsummary',true);
            component.set('v.isAmount2Required',true);
        }
        else 
        {
            component.set('v.Ispass_Excelsummary',true);
            component.set('v.isAmount2Required ',false);
            component.set('v.AmountBankGuaranteeIsDisable',true);
            component.find("Amount2").set("v.value",0); 
        }    
        console.log('---1--');
        if(RecTypeName == 'Supplier')
        {
            var HavingCreditTermorLetter = component.find("HavingCreditTermorLetter").get("v.value"); 
            
            if(CashOnDelivery == 'No' && (HavingCollateral == 'Yes' || HavingCreditTermorLetter == 'Yes'))
            {
                component.set('v.IsShowRequiredMsg',false); 
                component.set("v.CurrencyDisable",false);
            }
            
            if(CashOnDelivery == 'No' && (HavingCollateral != 'Yes' && HavingCreditTermorLetter != 'Yes'))
            {
                component.set('v.IsShowRequiredMsg',true); 
                component.set("v.CurrencyDisable",false);
            }
            
            //2 HavingCreditTermorLetter
            if(HavingCreditTermorLetter == 'Yes')
            {
                component.set('v.YesCreditTermIsDisable',false);
                component.set('v.isAmountCreditTermRequired  ',true);
                if(buInfo.BusinessUnit__c != 'TX')
                    component.set('v.CurrencyDisable',false);
            }
            else 
            {
                component.set('v.YesCreditTermIsDisable',true);
                component.find("AmountCreditTerm").set("v.value",0);
                component.set('v.isAmountCreditTermRequired  ',false);
            } 
        } 
        else
        {
            console.log('---2--');
            var BuyTradeEndorsement = component.find("BuyTradeEndorsement").get("v.value");
        	var BuyTradeDCLCondition = component.find("BuyTradeDCLCondition").get("v.value");
        	var HavingOpenedCredit = component.find("HavingOpenedCredit").get("v.value");
            console.log('---2.1--');
            if(CashOnDelivery == 'No' && (HavingCollateral == 'Yes' || BuyTradeEndorsement == 'Yes' || BuyTradeDCLCondition == 'Yes' || HavingOpenedCredit == 'Yes'))
            {
                console.log('---2.2--');
                component.set('v.IsShowRequiredMsg',false); 
                component.set("v.CurrencyDisable",false);
            }
            console.log('---3--');
            if(CashOnDelivery == 'No' && (HavingCollateral != 'Yes' && BuyTradeEndorsement != 'Yes' && BuyTradeDCLCondition != 'Yes' && HavingOpenedCredit != 'Yes'))
            {
                console.log('---3.1--');
                component.set('v.IsShowRequiredMsg',true); 
                component.set("v.CurrencyDisable",false);
            }
            console.log('---4--');
            //3 BuyTradeEndorsement
            if(BuyTradeEndorsement == 'Yes')
            {
                component.set('v.AmountBuyTradeIsDisable',false);
                component.set('v.Ispass_Excelsummary',true);
                component.set('v.isAmount3Required ',true);
                if(buInfo.BusinessUnit__c != 'TX')
                    component.set('v.CurrencyDisable',false);
            }
            else 
            {
                component.set('v.AmountDCLConditionIsDisable',true);
                component.set('v.Ispass_Excelsummary',true);
                component.find("Amount3").set("v.value",0);
                component.set('v.isAmount3Required ',false);
                component.set('v.AmountBuyTradeIsDisable',true);
            }   
            console.log('---5--');
            //4 BuyTradeDCLCondition
            if(BuyTradeDCLCondition == 'Yes')
            {
                component.set('v.AmountDCLConditionIsDisable',false);
                component.set('v.Ispass_Excelsummary',true);
                component.set('v.isAmount4Required ',true);
                if(buInfo.BusinessUnit__c != 'TX')
                    component.set('v.CurrencyDisable',false);
            }
            else 
            {
                component.set('v.AmountDCLConditionIsDisable',true);
                component.set('v.Ispass_Excelsummary',true);
                component.find("Amount4").set("v.value",0);
                component.set('v.isAmount4Required ',false);
            }  
            console.log('---6--');
            //5 HavingOpenedCredit
            if(HavingOpenedCredit == 'Yes')
            {
                component.set('v.AmountOpenedCreditIsDisable',false);
                component.set('v.Ispass_Excelsummary',true);
                component.set('v.isAmount5Required ',true);
                if(buInfo.BusinessUnit__c != 'TX')
                    component.set('v.CurrencyDisable',false);
                
            }else 
            {
                component.set('v.AmountOpenedCreditIsDisable',true);
                component.set('v.Ispass_Excelsummary',true);
                component.find("Amount5").set("v.value",0);
                component.set('v.isAmount5Required ',false);
                
            }   
            console.log('---7--');
        }
        
        let calTotalAmont = component.get('c.calTotalAmont');
        $A.enqueueAction(calTotalAmont); 
    },
    handleCashOnDelivery: function(component, event, helper) {
        try
        {
            console.log('---handleCashOnDelivery---');
            var  CashOnDelivery = component.find("CashOnDelivery").get("v.value"); 
            var  HavingCollateral = component.find("HavingCollateral").get("v.value");
            var  RecTypeName = component.get("v.RecordTypeName");
            var buInfo = component.get("v.BUInfo"); 
            console.log('---buInfo.BusinessUnit__c---'+buInfo.BusinessUnit__c);
            
            if(CashOnDelivery == 'Yes' || CashOnDelivery == '' || CashOnDelivery == undefined)
            {
                component.set('v.Ispass_CashOnDelivery',true);
                component.set('v.HavingCollateralIsDisable',true);
                component.find("Amount2").set("v.value",0);
                //component.find("Total_Secured_Currency__c").set("v.value",'');
                component.set('v.CurrencyDisable',true);
                component.set('v.IsRequired',false);
                component.set('v.IsShowRequiredMsg',false);
                component.find("Total_Secured_Currency__c").set("v.value",'');
                
                if(RecTypeName == 'Customer')
                {
                    //Picklist
                    component.set('v.HavingCollateralIsDisable',true);
                    component.set('v.BuyTradeEndorsementIsDisable',true);
                    component.set('v.BuyTradeDCLConditionIsDisable',true);
                    component.set('v.HavingOpenedCreditIsDisable',true);
                    
                    //Amount
                    component.set('v.AmountBankGuaranteeIsDisable',true);
                    component.set('v.AmountBuyTradeIsDisable',true);
                    component.set('v.AmountDCLConditionIsDisable',true);
                    component.set('v.AmountOpenedCreditIsDisable',true);
                    
                    component.find("Amount2").set("v.value",0);
                    component.find("Amount3").set("v.value",0);
                    component.find("Amount4").set("v.value",0);
                    component.find("Amount5").set("v.value",0);
                    
                    //Reset Value
                    component.find("HavingCollateral").set("v.value",'');
                    component.find("BuyTradeEndorsement").set("v.value",'');
                    component.find("BuyTradeDCLCondition").set("v.value",'');
                    component.find("HavingOpenedCredit").set("v.value",'');
                }
                else if(RecTypeName == 'Supplier')
                {
                    var HavingCreditTermorLetter = component.find("HavingCreditTermorLetter").get("v.value");
                    
                    component.set('v.HavingCollateralIsDisable',true);
                    component.set('v.radioCreditTermIsDisable',true);
                    component.set('v.YesCreditTermIsDisable',true);
                    component.set('v.AmountBankGuaranteeIsDisable',true);
                    component.find("Amount2").set("v.value",0);
                    component.find("AmountCreditTerm").set("v.value",0); 
                    component.find("HavingCollateral").set("v.value",'');
                    component.find("HavingCreditTermorLetter").set("v.value",'');

                    component.set('v.HavingCollateralIsDisable',true);
                    component.set('v.radioCreditTermIsDisable',true);
                }
                //document.getElementById('fieldset1').classList.remove('slds-has-error');
                let calTotalAmont = component.get('c.calTotalAmont');
                $A.enqueueAction(calTotalAmont); 
            }
            else if(CashOnDelivery == 'No')
            {
                //component.find("Total_Secured_Currency__c").set("v.value",'');
                component.set('v.Ispass_CashOnDelivery',true);
                component.set('v.HavingCollateralIsDisable',false);
                component.set('v.BuyTradeEndorsementIsDisable',false);
                component.set('v.BuyTradeDCLConditionIsDisable',false);
                component.set('v.HavingOpenedCreditIsDisable',false);
                component.set('v.IsRequired',true);
                component.set('v.CurrencyDisable',false);
                
                if(RecTypeName == 'Customer')
                {
                    console.log('---1---');
                    if(buInfo.BusinessUnit__c == 'TX')
                    {
                        console.log('---2---');
                        var BuyTradeEndorsement = component.find("BuyTradeEndorsement").get("v.value");
                        var BuyTradeDCLCondition = component.find("BuyTradeDCLCondition").get("v.value");
                        var HavingOpenedCredit = component.find("HavingOpenedCredit").get("v.value");
                        var HavingCreditTermorLetter = component.find("HavingCreditTermorLetter").get("v.value"); 
                        
                        //set required field & err message
                            if(HavingCollateral == '' && BuyTradeEndorsement == '' && BuyTradeDCLCondition == '' && HavingOpenedCredit == '')
                            {
                                console.log('----ERROR- masg --');
                                component.set('v.IsRequired',true);
                                component.set('v.IsShowRequiredMsg',true);
                            }
                            
                            if(HavingCollateral != 'Yes' && BuyTradeEndorsement != 'Yes' && BuyTradeDCLCondition != 'Yes' && HavingOpenedCredit != 'Yes')
                            {
                                console.log('----ERROR- masg --');
                                component.set('v.IsRequired',true);
                                component.set('v.IsShowRequiredMsg',true);
                            }
                        
                    }
                    console.log('---4---');
                }
                else if(RecTypeName == 'Supplier')
                {
                    var HavingCreditTermorLetter = component.find("HavingCreditTermorLetter").get("v.value");
                    console.log('---HavingCreditTermorLetter--'+HavingCreditTermorLetter);
                    
                    //default
                    component.set('v.HavingCollateralIsDisable',false);
                    component.set('v.radioCreditTermIsDisable',false);
                    
                    if(CashOnDelivery == 'No' && (HavingCollateral == 'Yes' || HavingCreditTermorLetter == 'Yes'))
                    {
                        component.set('v.IsShowRequiredMsg',false); 
                    }
                    
                    if(CashOnDelivery == 'No' && (HavingCollateral != 'Yes' && HavingCreditTermorLetter != 'Yes'))
                    {
                        component.set('v.IsShowRequiredMsg',true); 
                    }
                } 
                console.log('---5---');
            } 
            
        }
        catch(ex)
        {
            console.error('---handleCashOnDelivery--erropr-'+ex);
        }
        
    },
    handleCreditLimitCurrency: function(component,event, helper) {
        console.log('--- handleCreditLimitCurrency ---');
        var buInfo = component.get("v.BUInfo"); 
        console.log('---buInfo.BusinessUnit__c---'+buInfo.BusinessUnit__c);
        if(buInfo.BusinessUnit__c == 'TX')
        {
            var CreditLimitCurrency = component.find("Total_Secured_Currency__c").get("v.value");
            component.find("ChangeCreditCreditLimitCurrency").set("v.value",CreditLimitCurrency);
        }
    },
    calTotalAmont: function(component, event, helper) {
        var  RecTypeName = component.get("v.RecordTypeName");
        console.log('---RecTypeName--'+RecTypeName);
        
        if(RecTypeName == 'Customer')
        {
            var amount2 = component.find("Amount2").get("v.value");
            console.log('amount2---' + amount2);
            var amount3 = component.find("Amount3").get("v.value");
            console.log('amount3---' + amount3);
            var amount4 = component.find("Amount4").get("v.value");
            console.log('amount4---' + amount4);

            var amount5 = component.find("Amount5").get("v.value");
            // var amount5 = 0;
            console.log('amount5---' + amount5);
            
            var total = 0;
            console.log('button submittest---');
            total = Number(amount2) + Number(amount3) + Number(amount4);
            //var n=1234.567
            var parts = total.toFixed(2).split(".");
            var num = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 
                (parts[1] ? "." + parts[1] : "");
            console.log('button submittest------'+num);
            component.find("Amount6").set("v.value",num);

            var totalcredit = 0;
            console.log('button submittest---');
            totalcredit = Number(amount2) + Number(amount3) + Number(amount4) + Number(amount5);
            var partscredit = totalcredit.toFixed(2).split(".");
            var numcredit = partscredit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 
                (partscredit[1] ? "." + partscredit[1] : "");
            console.log('button submittest Amount7------'+numcredit);
            component.find("Amount7").set("v.value",numcredit);
            component.set('v.OriginalTotalCreditAmount',totalcredit);

            var SubTypeCondition = component.find("SubTypeCondition");
            console.log('Debug SubTypeCondition',SubTypeCondition,SubTypeCondition.get('v.value'),totalcredit);
            if (SubTypeCondition && (SubTypeCondition.get('v.value') == 'Expand Credit Line' || SubTypeCondition.get('v.value') == 'Change Credit Condition')) {
                component.find("ChangeCreditCreditLimit").set("v.value",totalcredit);
            }
            
        }
        else
        {
            var amount2 = component.find("Amount2").get("v.value");
            var AmountCreditTerm = component.find("AmountCreditTerm").get("v.value");
            
            console.log('amount2---' + amount2);
            console.log('AmountCreditTerm---' + AmountCreditTerm);
            
            var total = 0;
            console.log('button submittest---');
            total = Number(amount2) + Number(AmountCreditTerm);
            //var n=1234.567
            var parts = total.toFixed(2).split(".");
            var num = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 
                (parts[1] ? "." + parts[1] : "");
            console.log('button submittest------'+num);
            component.find("Amount6").set("v.value",num);
        }
    },
    TemplateLink : function(component,event, helper,recordId) {
        var recordId = component.get("v.recordId");
        var action = component.get("c.CTRDownloadExcelTemplate");
        // Set spinner action On!
        component.set("v.showLoading",true);
        action.setParams({
            recordId: recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                const base64 = response.getReturnValue();  // …
                if(!base64.includes('Error'))
                {
                    const link = document.createElement('a');
                    link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + base64;
                    link.download = 'Excel-Template.xlsx';
                    link.click();
                    
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": 'File is generated',
                        "type" : "success"
                    });
                    toastEvent.fire();
                }
                else
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error!",
                        "message": base64,
                        "type" : "error"
                    });
                    toastEvent.fire();
                }
                
                // Set spinner action Off!
                component.set("v.showLoading",false);
            } else {
                console.error("Error fetching Blob file");
                component.set("v.showLoading",false);
            }
        });
        
        $A.enqueueAction(action);
    },
    SharePointLink : function(component,event, helper) {
        var urlval = component.get("v.SharePointLink");
        console.log('---urlval---'+urlval);
        window.open(urlval, '_blank');
    },

    handleLoadForm : function (component, event, helper) {
        var creditLimitCmp = component.find('FinCrLimitType__c');
        console.log('Handle load form',creditLimitCmp,creditLimitCmp.get('v.value'))
        if(creditLimitCmp && creditLimitCmp.get('v.value') && creditLimitCmp.get('v.value') != 'Unlimited') {
            console.log('Set format',creditLimitCmp.get('v.value'))
            var formattedValue = Number(creditLimitCmp.get('v.value')).toLocaleString('en',{minimumFractionDigits: 2,maximumFractionDigits:2});
            creditLimitCmp.set('v.value',formattedValue);
        }
        var buInfo = component.get("v.BUInfo"); 
        console.log('---buInfo.BusinessUnit__c---'+buInfo.BusinessUnit__c);
        if(buInfo.BusinessUnit__c == 'TX')
        {
            var CreditLimitCurrency = component.find('ChangeCreditCreditLimitCurrency')
            if (CreditLimitCurrency) {
                var TotalSecuredCurrency = component.find("Total_Secured_Currency__c").get("v.value");
                CreditLimitCurrency.set('v.value',TotalSecuredCurrency)
            }
            var TotalCreditAmount = component.find('ChangeCreditCreditLimit')
            // console.log('TotalCreditAmount : ' , TotalCreditAmount, component.find("Amount7").get("v.value"));
            if (TotalCreditAmount) {
                var CreditLimitExpand = component.get('v.OriginalTotalCreditAmount')
                TotalCreditAmount.set('v.value',CreditLimitExpand)
            }
        }
    },

    // handleChangeEffectiveDateFrom : function(component, event, helper) {
    //     var effectiveDateFrom = event.getSource().get("v.value");
    //     console.log('Debug effectiveDateFrom',effectiveDateFrom)
    //     component.set('v.effectiveDateFrom',effectiveDateFrom);
    // },

    handleChangeEffectiveDate : function(component, event, helper) {
        helper.validateEffectiveDate(component, event, helper);
        // var effectiveDateFrom = component.find('EffectiveDateForm').get('v.value');
        // var effectiveDateTo = component.find('EffectiveDateTo').get('v.value');
        // var isValid = true;
        // if(effectiveDateTo < effectiveDateFrom) {
        //     isValid = false;
        //     var toastEvent = $A.get("e.force:showToast");
        //     toastEvent.setParams({
        //         "title": "Error!",
        //         "message": 'The Effective-date-to cannot be earlier than the effective-date-from.',
        //         "type" : "error"
        //     });
        //     toastEvent.fire();
        // }
    },
})