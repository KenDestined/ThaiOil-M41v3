({
	getRequestItems : function(component, event, helper, recordId) 
    {
        var action = component.get("c.getRequestFormItem");
        action.setParams({
            "recID": recordId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                try
                {
                    var requestList = response.getReturnValue();
                    console.log('---requestList---',JSON.parse(JSON.stringify(requestList)));
                    if(requestList != null)
                    {	
                        console.log('---Get BU Name---');
                        //Get BU Name
                        var actionBU = component.get("c.getBUInfo");
                        actionBU.setParams({
                            "recordId": recordId
                        });
                        actionBU.setCallback(this, function(response){
                            var state1 = response.getState();
                            console.log('---state1---'+state1);
                            if (state1 === "SUCCESS") 
                            {
                                //ADMIN TEST
                                //component.set("v.BUInfo.BusinessUnit__c",'TOP');
                                //BUName = 'TOP';
                                //console.log('---BUName-2--'+BUName);
                                console.log('Debug requestList',requestList)
                                var recordtypeName = requestList[0].RecordTypeName__c;
                                var ExcelTemplate = requestList[0].ExcelTemplate__c;
                                var ImportExcelSummary = requestList[0].ImportExcelSummary__c;
                                var InternalCreditRating = requestList[0].FinIntCrRating__c;
                                var InternalCreditRatingTOP = requestList[0].InternalCreditRatingTOP__c;
                                var InternalCreditRatingTX = requestList[0].InternalCreditRating__c;
                                var RequestToChangeCredit =  requestList[0].RequestToChangeCredit__c;
        						var SubTypeCondition = requestList[0].SubTypeCondition__c;
        						var SubTypeCondition2 = requestList[0].SubTypeCondition2__c;
                                var ChangeCreditAmount = requestList[0].ChangeCreditAmount__c;
                                var AmountCRNum = requestList[0].AmountCRNum__c;
                                var EffectiveDateForm = requestList[0].EffectiveDateForm__c;
                                var EffectiveDateTo = requestList[0].EffectiveDateTo__c;
                                var CreditCondition = requestList[0].FinCrCond__c;
                                var CreditLimit = requestList[0].FinCrLimit__c;
                                var CreditLimitCurrency = requestList[0].FinCrLimitCur__c;
                                var TradeCreditInsurance = requestList[0].FinTradeCrIns__c;
                                var TradeCreditInsuranceCurrency = requestList[0].FinTradeCrInsCu__c;
                                var email = requestList[0].CTRRequestFormHeader__r.Email__c;
                                var fname = requestList[0].CTRRequestFormHeader__r.FirstName__c;
                                var lname = requestList[0].CTRRequestFormHeader__r.LastName__c;
                                var mobile = requestList[0].CTRRequestFormHeader__r.MobilePhone__c;
                                var approvalStep = requestList[0].Approval_Step__c;
                                var TRCR = requestList[0].CreditOwner__c;
                                var isTRCR = requestList[0].isTRCR__c;
                                var accountId = requestList[0].Customer__c;
                                var finKey = requestList[0].FinancialKey__c;
                                var Total =	requestList[0].TotalSecuredAmount__c;
                                var TotalCredit =	requestList[0].TotalCreditAmount__c;
                                var status =	requestList[0].Status__c;
                                var FCreditCondition = requestList[0].FinancialInformation__c ? requestList[0].FinancialInformation__r.Credit_Condition__c : null;
                                var FCreditLimit = requestList[0].FinancialInformation__c ? requestList[0].FinancialInformation__r.CreditLimitType__c : null;
                                var FInternalCreditRating = requestList[0].FinancialInformation__c ? requestList[0].FinancialInformation__r.InternalCreditRating__c : null;
                                var FCreditLimitCur = requestList[0].FinancialInformation__c ? requestList[0].FinancialInformation__r.CurrencyLocal__c : null;
                                // var finInfo = requestList[0].FinancialInformation__c ? JSON.parse(JSON.stringify(requestList[0].FinancialInformation__r)) : null;
                                var FTermOfPayment = requestList[0].IntegrationMessage__c;
                                
                                console.log('Checkpoint after setting variable')
                                console.log('---onload-0.1--'+RequestToChangeCredit);
                                if(FCreditCondition != undefined && FCreditCondition != '')
                                {
                                    component.set('v.CreditCondition',FCreditCondition);
                                }
                                if(FCreditLimit != undefined && FCreditLimit != '')
                                {
                                    component.set('v.CreditLimit',FCreditLimit);
                                }
                                if(FInternalCreditRating != undefined && FInternalCreditRating != '')
                                {
                                    component.set('v.InternalCreditRating',FInternalCreditRating);
                                }
                                if(FCreditLimitCur != undefined && FCreditLimitCur != '') {
                                    component.set('v.CreditLimitCurrency',FCreditLimitCur);
                                }
                                if(FTermOfPayment != undefined && FTermOfPayment != '') {
                                    component.set('v.PaymentTerm',FTermOfPayment);
                                }
                                
                                console.log('***Debug creditownerid',TRCR)
                                if(TRCR != null && TRCR != '')
                                {
                                    console.log('---1--');
                                    component.set("v.CreditOwnerId",TRCR); 
                                }
                                else
                                {
                                    console.log('---2--'+isTRCR);
                                    if(isTRCR != null && isTRCR != undefined && isTRCR != '')
                                    {
                                        if(isTRCR.includes($A.get("$SObjectType.CurrentUser.Id")))
                                        {
                                            TRCR = $A.get("$SObjectType.CurrentUser.Id");
                                            component.set("v.TRCRId",$A.get("$SObjectType.CurrentUser.Id")); 
                                            component.set("v.CreditOwnerId",TRCR);
                                        }
                                    }
                                    
                                }

                                //set current user incase no value in database
                                console.log('Debug isTRCR',isTRCR)
                                if(isTRCR != null && isTRCR != '' && isTRCR != undefined)
                                    {
                                        console.log('---isTRCR----'+isTRCR);
                                        var where = 'AND Id IN '+isTRCR;
                                        component.set("v.TRCROwnerWhereCondition",where); 
                                        console.log('---isTRCR--WHERE--'+where);
                                        
                                    }
                                console.log('---CurrentStepUserId--'+TRCR);
                                component.set('v.CurrentStepUserId',TRCR);
                                
                                /*
                                var CashOnDelivery = requestList[0].CashOnDelivery__c;
                                var HavingCollateral = requestList[0].HavingCollateral__c;
                                var BuyTradeEndorsement = requestList[0].BuyTradeEndorsement__c;
                                var BuyTradeDCLCondition = requestList[0].BuyTradeDCLCondition__c;
                                var HavingOpenedCredit = requestList[0].HavingOpenedCredit__c;
                                var isTRCR = requestList[0].isTRCR__c;
                                var WaiveRequest = requestList[0].WaiveRequest__c;
                                var TypeOfBusiness = requestList[0].TypeOfBusiness__c;
                                var TraderRemark = requestList[0].TraderRemark__c;
                                var ApproverStep = requestList[0].ApproverStep__c;
                                var TraderWaiveRequest = requestList[0].TraderWaive__c;
                                var TraderCreditRating = requestList[0].ApprovalTrader_CreditRating__c;
                                var SHAgree = requestList[0].Approval_SHAgree__c;
                                var VPAgree = requestList[0].Approval_VPAgree__c;
                                var PaymentTerm = requestList[0].PaymentTerm__c;
                                var PaymentCondition = requestList[0].PaymentCondition__c;
                                var IsTraderSaved = requestList[0].IsTraderSaved__c;
                                var ApproverHeadId = requestList[0].OwnersSectionHead__c;
                                var ApproverVPId = requestList[0].OwnersCMVP__c;
                                var ApproverTraderId = requestList[0].OwnerId;
                                var PerformanceBond = requestList[0].PerformanceBond__c;
                                var HavingCreditTerm = requestList[0].HavingCreditTermorLetter__c;
                                var TRCR = requestList[0].CreditOwner__c;
                                var TraderCreditCondition = requestList[0].ApprovalTrader_CreditCondition__c;*/
                                
                                //set recordtype & BU
                                if(recordtypeName.includes("Customer")){
                                    recordtypeName = "Customer";
                                }else if(recordtypeName.includes("Supplier")){
                                    recordtypeName = "Supplier";
                                }
                                var BUInfo = component.get("v.BUInfo");
                                console.log('---BUInfo---'+BUInfo);
                                var BUName = BUInfo.BusinessUnit__c;
                                console.log('---BUName---'+BUName);
                                
                                
                                console.log('---email--'+email);
                                console.log('---fname--'+fname);
                                console.log('---mobile--'+mobile);
                                
                                if(email == null || email == '')
                                    email = '';
                                if(fname == undefined || fname == null || fname == '')
                                    fname = '';
                                if(lname == undefined || lname == null || lname == '')
                                    lname = '';
                                if(mobile == null || mobile == '')
                                    mobile = '';
                                
                                component.set("v.EmailStr",email); 
                                component.set("v.ContactStr",fname+' '+lname); 
                                component.set("v.TelephoneStr",mobile); 
                                component.set('v.ApprovalStep',approvalStep);
                                component.set('v.Status',status);
                                
                                
                                //assign approver step
                                /*if(ApproverStep == '' || ApproverStep == null ||  ApproverStep == undefined)
                                    ApproverStep = 'TRCR';
                                component.set("v.ApproverStepVal",ApproverStep);
                                console.log('---approvalstep--'+component.get("v.ApproverStepVal")); */
                                
                                
                                
                                //Default value
                                if(BUName == "TX")
                                { 
                                    console.log('---Total---'+Total);
                                    //set number format
                                    if(Total != '' && Total >0){
                                       	var parts = Total.toFixed(2).split(".");
                                    	var num = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + (parts[1] ? "." + parts[1] : "");
 
                                    }else{
                                       num = 0; 
                                    }                         
                                    component.set("v.TotalAmount",num);

                                    if(TotalCredit != '' && TotalCredit >0){
                                       	var partscredit = TotalCredit.toFixed(2).split(".");
                                    	var numcredit = partscredit[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + (partscredit[1] ? "." + parts[1] : "");
 
                                    }else{
                                        numcredit = 0; 
                                    }                         
                                    component.set("v.TotalCreditAmount",numcredit);
                                    component.set("v.CurrencyDisable",true); 

                                    if(!RequestToChangeCredit) {
                                        RequestToChangeCredit = 'Request to Change Credit Condition'; //
                                    }

                                    var cmpICR = component.find('ChangeCreditInternalCreditRating');
                                    if(cmpICR) {
                                        if(InternalCreditRatingTX == '' || InternalCreditRatingTX == undefined) {
                                            InternalCreditRatingTX = 'N/A';
                                        }
                                        cmpICR.set('v.value',InternalCreditRatingTX);
                                    }
                                } else {
                                    var cmpICR = component.find('InternalCreditRating');
                                    if(cmpICR) {
                                        if(InternalCreditRatingTOP == '' || InternalCreditRatingTOP == undefined) {
                                            InternalCreditRatingTOP = 'N/A';
                                        }
                                        cmpICR.set('v.value',InternalCreditRatingTOP);
                                    }
                                }
                                console.log('Before setting sharepoint link ',ImportExcelSummary,requestList[0].ImportExcelSummary__c)
                                component.set("v.SharePointLink",ImportExcelSummary);
                                component.set("v.RecordTypeName",recordtypeName);
                                //component.set("v.ApproverStepVal",ApproverStep);
                                //console.log('---TypeOfBusiness---'+TypeOfBusiness);
                                //component.set("v.TypeOfBusiness",TypeOfBusiness);
                                console.log('-----InternalCreditRating-----'+InternalCreditRating);
                                if(InternalCreditRating == '' || InternalCreditRating == undefined)
                                	InternalCreditRating = 'N/A';
                                
                                if(CreditCondition == '' || CreditCondition == undefined)
                                    CreditCondition = 'Open Account';
                                
                                if(!CreditLimitCurrency)// == '' || CreditLimitCurrency == undefined)
                                    CreditLimitCurrency = 'THB';
                                
                                if(TradeCreditInsurance && !TradeCreditInsuranceCurrency)// == '' || TradeCreditInsuranceCurrency == undefined)
                                    TradeCreditInsuranceCurrency = 'THB';
                                
                                //Render picklist
                                component.find("RequestToChangeCredit").set("v.value",RequestToChangeCredit);
                                component.find("RequestToChangeCreditTX").set("v.value",RequestToChangeCredit);
                                component.find("RequestToChangeCredithidden").set("v.value",RequestToChangeCredit);
                                component.find("SubTypeCondition").set("v.value",SubTypeCondition);
                                component.find("SubTypeCondition2").set("v.value",SubTypeCondition2);
                                component.find("ChangeCreditAmount").set("v.value",ChangeCreditAmount);
                                component.find("ChangeCreditAmountnumber").set("v.value",AmountCRNum);
                                component.find("EffectiveDateForm").set("v.value",EffectiveDateForm);
                                component.find("EffectiveDateTo").set("v.value",EffectiveDateTo);
                                component.find("ChangeCreditCreditCondition").set("v.value",CreditCondition);
                                // component.find("ChangeCreditInternalCreditRating").set("v.value",InternalCreditRating);
                                component.find("ChangeCreditFinInternalCreditRating").set("v.value",InternalCreditRating);
                                component.find("ChangeCreditCreditLimitCurrency").set("v.value",CreditLimitCurrency);
                                component.find("ChangeCreditTradeCreditInsuranceCurrency").set("v.value",TradeCreditInsuranceCurrency);
                                component.set('v.dataLoaded',true);
                                // var action2 = component.get('c.handleRenderCreditConditionFields');
                                // $A.enqueueAction(action2);
                                helper.handleRenderCreditConditionFields(component, event, helper, false)
                                //var actioncalTotalAmont = component.get('c.calTotalAmont');
                                //$A.enqueueAction(actioncalTotalAmont);
                                
                                /*
                                
                                //Set value in Exising section
                                var actionExsiting = component.get("c.getExtingFinancialInfo");
                                actionExsiting.setParams({
                                    "key": finKey,
                                    "accountId": accountId,
                                });
                                actionExsiting.setCallback(this, function(responseExisting) {
                                    var stateExisting = responseExisting.getState();
                                    if (stateExisting === "SUCCESS") 
                                    {
                                        try
                                        {
                                            console.log('---finKey---'+finKey);
                                            console.log('---accountId---'+accountId);
                                            var finList = responseExisting.getReturnValue();
                                            console.log('---finList---'+finList);
                                            if(finList != undefined && finList != '' && finList != null)
                                            {
                                                var CreditCondition = finList[0].Credit_Condition__c;
                                                var CreditLimit = finList[0].CreditLimit__c;
                                                var InternalCreditRating = finList[0].InternalCreditRating__c;
                                                var PaymentCondition = finList[0].PaymentCondition__c;
                                                
                                                if(CreditCondition != undefined && CreditCondition != '')
                                                {
                                                    component.set('v.CreditCondition',CreditCondition);
                                                }
                                                if(CreditLimit != undefined && CreditLimit != '')
                                                {
                                                    component.set('v.CreditLimit',CreditLimit);
                                                }
                                                if(InternalCreditRating != undefined && InternalCreditRating != '')
                                                {
                                                    component.set('v.InternalCreditRating',InternalCreditRating);
                                                }
                                                if(PaymentCondition != undefined && PaymentCondition != '')
                                                {
                                                    component.set('v.PaymentCondition',PaymentCondition);
                                                }
                                            }
                                            
                                        }
                                        catch(ex2)
                                        {
                                            console.error('----ERROR---'+ex2.message);
                                        }
                                        
                                    }
                                });
                            	$A.enqueueAction(actionExsiting);*/
                                
                                console.log('---Done---');
                        }
                    });
                    $A.enqueueAction(actionBU);
                }
                }
                catch(ex)
                {
                    console.error('----ERROR---'+ex.message);
                }
                
            }
        });
        
        $A.enqueueAction(action);
        $A.get('e.force:refreshView').fire();
    },
    
    getBUInformation : function(component, event, helper, recordId) 
    {
        try
        {
            console.log('---getBUInfo---');
            var action = component.get("c.getBUInfo");
            action.setParams({
                "recordId": recordId
            });
            action.setCallback(this, function(response){
                
                var state = response.getState();
                console.log('---state---'+state);
                
                if (state == "SUCCESS") {
                    var uInfo = response.getReturnValue();
                    component.set("v.BUInfo",uInfo);
                    component.set("v.LogInUserId",$A.get("$SObjectType.CurrentUser.Id"));
                    console.log('---v.LogInUserId---'+component.get('v.LogInUserId'));
                    this.getRequestItems(component,event, helper, recordId);
                }
            }
                              );
            $A.enqueueAction(action);
        }
        catch(ex)
        {
            console.log('---ex---'+JSON.stringtify(ex));
        }
        
    },

    handleRenderCreditConditionFields: function(component, event, helper, isBtnChange) { 
        try{
            console.log('---RenderCreditConditionFields--');
            var RequestToChangeCredit = component.find("RequestToChangeCredit").get("v.value"); 
            console.log('-0--RequestToChangeCredit---'+RequestToChangeCredit);
            var SubTypeCondition = component.find("SubTypeCondition").get("v.value"); 
            console.log('-1--SubTypeCondition---'+SubTypeCondition);
            var SubTypeCondition2 = component.find("SubTypeCondition2").get("v.value"); 
            console.log('-2--SubTypeCondition2---'+SubTypeCondition2);
            var CreditCondition = component.find("ChangeCreditCreditCondition").get("v.value"); 
            console.log('-3--CreditCondition---'+CreditCondition);
            var buInfo = component.get("v.BUInfo"); 
            var latestChangeCreditCreditCondition = component.get('v.latestChangeCreditCreditCondition');
            
            component.set('v.IsDescriptionDisable',false);
            component.set('v.IsRequiredEffectiveDate',true);
            
            component.set('v.IsChangeCreditPaymentTermDisable',true);
            component.set('v.IsCreditLimitRequried', true);
            component.set('v.IsAmountDisable',true);
            component.set('v.IsChangePerfBondConditionEnabled',false);

            var IsCreditUnlimitedEnabled = false;
            var IsCreditLimitInputDisable = false;
            var IsEffectiveDateToVisible = true;
            if(buInfo.BusinessUnit__c != "TX")
            {
            	//component.set('v.IsChangeCreditPaymentTermDisable',false);
                component.set('v.IsPaymentConditionRequried',true);
                //component.find("RequestToChangeCredithidden").set("v.value",""); 
            }
            else
            {
                var txvalue = component.find("RequestToChangeCreditTX").get("v.value"); 
                component.find("RequestToChangeCredithidden").set("v.value",txvalue); 
                RequestToChangeCredit = txvalue;
            }
            console.log('-0.1--RequestToChangeCredit---'+RequestToChangeCredit);
            if(RequestToChangeCredit == 'Request to Change Credit Condition')
            {
                component.set('v.IsSubTypeConditionDisable',false);
                component.set('v.IsEffectiveDateDisable',false);
                
                if (SubTypeCondition == 'Expand Temporary Credit Line')
                {   
                    
                    component.find("SubTypeCondition2").set("v.value","");
                    component.find("SubTypeConditionhidden").set("v.value","Expand Temporary Credit Line");
                    
                    if(component.find("SubTypeConditionhidden").get("v.value"))
                    {
                        component.set('v.IsAmountDisable',false);
                    }
                    
                    console.log('-2--SubTypeCondition2-start--'+component.find("SubTypeCondition2").get("v.value"));
                    component.set('v.IsCreditLimitDisable',true);
                    component.set('v.IsSubTypeCondition2Disable',true);                
                    component.set('v.IsTradeCreditInsuranceDisable',true);
                    component.set('v.IsInternalCreditRatingDisable',true);
                    
                    component.set('v.IsChangeCreditCreditConditionDisable',true);
                    
                    
                    console.log('-2--SubTypeConditionhidden-start--');
                    console.log('-2--SubTypeConditionhidden-get--'+component.find("SubTypeConditionhidden").get("v.value"));
                }
                else if (SubTypeCondition == 'Expand Credit Line')
                {   
                    component.find("SubTypeCondition2").set("v.value","");
                    component.set('v.IsCreditLimitDisable',false);
                    
                    component.set('v.IsSubTypeCondition2Disable',true);
                    component.set('v.IsAmountDisable',true);
                    component.set('v.IsTradeCreditInsuranceDisable',true);
                    component.set('v.IsInternalCreditRatingDisable',true);
                    component.set('v.IsChangeCreditCreditConditionDisable',true);
                    IsEffectiveDateToVisible = false;
                    
                    if(buInfo.BusinessUnit__c!="TX")
                    {
                        component.set('v.IsRequiredEffectiveDate',false);
                    } else {
                        IsCreditLimitInputDisable = true;
                    }
                }
                else if (SubTypeCondition == 'Change Credit Condition')
                {
                    CreditCondition = component.find("ChangeCreditCreditCondition").get("v.value"); 
                    console.log('-4--CreditCondition---'+CreditCondition);
                    
                    component.set('v.IsChangeCreditCreditConditionDisable',false);
                    component.set('v.IsInternalCreditRatingDisable',false);
                    component.set('v.IsCreditLimitDisable',false);
                    component.find("SubTypeCondition2").set("v.value","");
                    component.set('v.IsSubTypeCondition2Disable',true);
                    component.set('v.IsAmountDisable',true);
                    console.log('---5---'+component.get('v.IsPaymentConditionRequried'));
                    console.log('Debug buInfo.BusinessUnit__c',buInfo.BusinessUnit__c);
                    if(buInfo.BusinessUnit__c != 'TX') {
                        component.set('v.IsRequiredEffectiveDate',false);
                        console.log('Set IsRequiredEffectiveDate',component.get('v.IsRequiredEffectiveDate'))
                    } else {
                        IsCreditLimitInputDisable = true;
                    }
                    
                    if(CreditCondition == 'Open Account' )
                    {
                        component.set('v.IsTradeCreditInsuranceDisable',false);
                        component.set('v.IsPaymentConditionRequried',false);

                        // component.find("ChangeCreditCreditCondition").set("v.value",'');
                        // component.find("ChangeCreditInternalCreditRating").set("v.value",'');
                        // component.find("ChangeCreditCreditLimitCurrency").set("v.value",'');
                        // component.find("ChangeCreditTradeCreditInsuranceCurrency").set("v.value",'');
                        // component.find("PaymentCondition").set("v.value",'');

                        

                        if(buInfo.BusinessUnit__c != 'TX') {
                            IsCreditUnlimitedEnabled = true;
                            component.set('v.IsCreditLimitRequried', false);
                        }
                    }
                    //else if(CreditCondition == 'L/C' || CreditCondition == 'Domestic L/C' || CreditCondition == 'Open Account With Collateral')
                    else if( CreditCondition == 'Open Account With Collateral')
                    {
                        console.log('---6---');
                        component.set('v.IsTradeCreditInsuranceDisable',false);
                        component.set('v.IsPaymentConditionRequried',false);

                        // component.find("ChangeCreditCreditCondition").set("v.value",'');
                        // component.find("ChangeCreditInternalCreditRating").set("v.value",'');
                        // component.find("ChangeCreditCreditLimitCurrency").set("v.value",'');
                        // component.find("ChangeCreditTradeCreditInsuranceCurrency").set("v.value",'');
                        // component.find("PaymentCondition").set("v.value",'');
                        
                        if(buInfo.BusinessUnit__c != 'TX')
                        {
                            // IsCreditUnlimitedEnabled = true;
							component.set('v.IsCreditLimitRequried', false);
                        }
                        console.log('---7---');
                    }
                    else if(CreditCondition == 'Cash in Advance' || CreditCondition == 'Others')
                    {

                        // component.find("ChangeCreditCreditCondition").set("v.value",'');
                        // component.find("ChangeCreditInternalCreditRating").set("v.value",'');
                        // component.find("ChangeCreditCreditLimitCurrency").set("v.value",'');
                        // component.find("ChangeCreditTradeCreditInsuranceCurrency").set("v.value",'');
                        // component.find("PaymentCondition").set("v.value",'');
                        
                        component.set('v.IsCreditLimitDisable',true);
                        component.set('v.IsTradeCreditInsuranceDisable',true);
                        component.set('v.IsPaymentConditionRequried',false);
                        console.log('---88---'+component.get('v.IsPaymentConditionRequried'));
                        
                    }
                    else
                    {
                        component.set('v.IsTradeCreditInsuranceDisable',true);  
                        component.set('v.IsCreditLimitDisable',true);
                    }
                    
                    if(buInfo.BusinessUnit__c=="TX")
                    {
                        component.set('v.IsCreditLimitDisable',false);
                    }
                    else
                    {
                        component.set('v.IsChangeCreditPaymentTermDisable',false);
                    }
                    console.log('---8---');
                }
                else if (SubTypeCondition == 'Others')
                {
                    component.find("SubTypeCondition2").set("v.value","");
                    component.set('v.IsChangeCreditCreditConditionDisable',true);
                    component.set('v.IsInternalCreditRatingDisable',true);
                    component.set('v.IsSubTypeCondition2Disable',true);
                    component.set('v.IsAmountDisable',true);
                    component.set('v.IsCreditLimitDisable',true);
                    component.set('v.IsTradeCreditInsuranceDisable',true);
                    component.set('v.IsDescriptionDisable',true);
                }
                else if (SubTypeCondition == 'Change Performance Bond Condition')
                {
                    component.set('v.IsChangePerfBondConditionEnabled',true);

                    component.find("SubTypeCondition2").set("v.value","");
                    component.set('v.IsChangeCreditCreditConditionDisable',true);
                    component.set('v.IsInternalCreditRatingDisable',true);
                    component.set('v.IsSubTypeCondition2Disable',true);
                    component.set('v.IsAmountDisable',true);
                    component.set('v.IsCreditLimitDisable',true);
                    component.set('v.IsTradeCreditInsuranceDisable',true);
                }
                else
                {
                    component.set('v.IsChangeCreditCreditConditionDisable',true);
                    component.set('v.IsInternalCreditRatingDisable',true);
                    component.set('v.IsSubTypeCondition2Disable',true);
                    component.set('v.IsAmountDisable',true);
                    component.set('v.IsCreditLimitDisable',true);
                    component.set('v.IsTradeCreditInsuranceDisable',true);
                    component.set('v.IsDescriptionDisable',false);
                }
                
                if(buInfo.BusinessUnit__c!="TX" && SubTypeCondition != 'Change Credit Condition')
                {
                    component.set('v.IsChangeCreditPaymentTermDisable',true);
                }
                
            }
            else if(RequestToChangeCredit == 'Request to reduce/waive late payment')
            {
                SubTypeCondition = component.find("SubTypeCondition").get("v.value"); 
                console.log('-1--SubTypeCondition---'+SubTypeCondition);
                SubTypeCondition2 = component.find("SubTypeCondition2").get("v.value"); 
                console.log('-2--SubTypeCondition2---'+SubTypeCondition2);
                
                component.set('v.IsSubTypeConditionDisable',false);
                if(SubTypeCondition == 'Others' ||SubTypeCondition == 'Early payment for next invoice')
                {
                    component.find("SubTypeCondition2").set("v.value","");
                    component.set('v.IsSubTypeCondition2Disable',true);
                    component.set('v.IsAmountDisable',true);
                    component.set('v.IsCreditLimitDisable',true);
                    component.set('v.IsTradeCreditInsuranceDisable',true);
                    component.set('v.IsInternalCreditRatingDisable',true);
                    component.set('v.IsEffectiveDateDisable',true);
                    component.set('v.IsChangeCreditCreditConditionDisable',true);
                    if(SubTypeCondition == 'Others')
                        component.set('v.IsDescriptionDisable',true);
                }
                else if(SubTypeCondition == 'Customer False')
                {
                    
                    component.set('v.IsSubTypeCondition2Disable',false);
                    if(SubTypeCondition2 == 'Others')
                    {
                        component.set('v.IsAmountDisable',true);
                        component.set('v.IsCreditLimitDisable',true);
                        component.set('v.IsTradeCreditInsuranceDisable',true);
                        component.set('v.IsInternalCreditRatingDisable',true);
                        component.set('v.IsEffectiveDateDisable',true);
                        component.set('v.IsChangeCreditCreditConditionDisable',true);
                        component.set('v.IsDescriptionDisable',true);
                    }
                    else if(SubTypeCondition2 == 'Not first time of late payment' || SubTypeCondition2 == 'First time of late payment')
                    {
                        component.set('v.IsAmountDisable',false);
                        component.set('v.IsCreditLimitDisable',true);
                        component.set('v.IsTradeCreditInsuranceDisable',true);
                        component.set('v.IsInternalCreditRatingDisable',true);
                        component.set('v.IsEffectiveDateDisable',true);
                        component.set('v.IsChangeCreditCreditConditionDisable',true);
                    }
                }
                else if(SubTypeCondition == 'Internal False')
                {
                    component.find("SubTypeCondition2").set("v.value","");
                    component.set('v.IsAmountDisable',false);
                    
                    component.set('v.IsEffectiveDateDisable',true);
                    component.set('v.IsSubTypeCondition2Disable',true);
                    component.set('v.IsCreditLimitDisable',true);
                    component.set('v.IsTradeCreditInsuranceDisable',true);
                    component.set('v.IsInternalCreditRatingDisable',true);
                    component.set('v.IsChangeCreditCreditConditionDisable',true);
                    
                    component.find("SubTypeConditionhidden").set("v.value","Internal False");
                    console.log('-2--SubTypeConditionhidden-start--');
                    console.log('-2--SubTypeConditionhidden-get--'+component.find("SubTypeConditionhidden").get("v.value"));
                }
                else
                {
                    component.set('v.IsEffectiveDateDisable',true);
                    component.set('v.IsSubTypeCondition2Disable',true);
                    component.set('v.IsCreditLimitDisable',true);
                    component.set('v.IsTradeCreditInsuranceDisable',true);
                    component.set('v.IsInternalCreditRatingDisable',true);
                    component.set('v.IsChangeCreditCreditConditionDisable',true);
                    component.set('v.IsAmountDisable',true);
                }
            }
            else if(RequestToChangeCredit == 'Request to set due date of debit/credit note' || RequestToChangeCredit == 'Other requests' || RequestToChangeCredit == 'Request to block')
            {
                component.find("SubTypeCondition2").set("v.value","");
                component.set('v.IsSubTypeConditionDisable',true);
                component.set('v.IsSubTypeCondition2Disable',true);
                component.set('v.IsAmountDisable',true);
                component.set('v.IsCreditLimitDisable',true);
                component.set('v.IsTradeCreditInsuranceDisable',true);
                component.set('v.IsInternalCreditRatingDisable',true);
                component.set('v.IsEffectiveDateDisable',true);
                component.set('v.IsChangeCreditCreditConditionDisable',true);
                component.set('v.IsDescriptionDisable',true);
            }

            component.set('v.IsCreditUnlimitedEnabled',IsCreditUnlimitedEnabled);
            component.find("SubTypeCondition").set("v.value",SubTypeCondition);
            component.set('v.IsEffectiveDateToVisible',IsEffectiveDateToVisible);
            

            console.log('Debug latest IsRequiredEffectiveDate',component.get('v.IsRequiredEffectiveDate'));
            if(isBtnChange && latestChangeCreditCreditCondition != CreditCondition) {
                // clear credit value
                console.log('Check component',component.find('ChangeCreditCreditLimit'),component.find('ChangeCreditTradeCreditInsurance'),component.find('PaymentTermTXasdasdad'),component.find('PaymentCondition'))
                helper.resetValue(component, event, helper);
                console.log('Debug change condition',latestChangeCreditCreditCondition,CreditCondition)
            }

            if(IsCreditLimitInputDisable) {
                var creditLimit = component.find('ChangeCreditCreditLimit')
                if (creditLimit) {
                    var totalCreditAmount = component.get('v.OriginalTotalCreditAmount');
                    console.log('Debug totalCreditAmount',totalCreditAmount)
                    creditLimit.set('v.value',totalCreditAmount)
                    console.log('Debug ChangeCreditCreditLimit',component.find('ChangeCreditCreditLimit').get('v.value'));
                }
            }
            component.set('v.IsCreditLimitInputDisable',IsCreditLimitInputDisable);
            component.set('v.latestChangeCreditCreditCondition',CreditCondition);
        }
        catch(ex)
        {
            console.error('ex---'+ex.message);            
        }
    },

    resetValue : function(component, event, helper) {
        console.log('reset value',component.find('ChangeCreditCreditLimitCurrency'))
        component.find('ChangeCreditCreditLimit').set('v.value','');
        component.find('ChangeCreditTradeCreditInsurance').set('v.value','');
        component.find('ChangeCreditCreditLimitCurrency').set('v.value','');
        component.find('ChangeCreditTradeCreditInsuranceCurrency').set('v.value','');

        if(Array.isArray(component.find('PaymentTermTX'))) {
            var cmpArr = component.find('PaymentTermTX');
            for(var i = 0; i < cmpArr.length; i++) {
                cmpArr[i].set('v.value','');
            }
        } else {
            component.find('PaymentTermTX').set('v.value','');
        }

        if(Array.isArray(component.find('PaymentCondition'))) {
            var cmpArr = component.find('PaymentCondition');
            for(var i = 0; i < cmpArr.length; i++) {
                cmpArr[i].set('v.value','');
            }
        } else {
            component.find('PaymentCondition').set('v.value','');
        }
    },

    validateEffectiveDate : function(component, event, helper) {
        var isValid = true;
        if(!component.get('v.IsEffectiveDateDisable')) {
            var effectiveDateFrom = component.find('EffectiveDateForm').get('v.value');
            var effectiveDateTo = component.find('EffectiveDateTo').get('v.value');
            console.log('validateEffectiveDate ',effectiveDateFrom,effectiveDateTo)
            
            if(effectiveDateTo < effectiveDateFrom) {
                isValid = false;
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": 'The Effective-date-to cannot be earlier than the effective-date-from.',
                    "type" : "error"
                });
                toastEvent.fire();
            }
        }

        return isValid;
    },
})