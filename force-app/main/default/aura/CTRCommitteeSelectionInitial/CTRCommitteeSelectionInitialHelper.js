({
    enableEditMode: function () {
        this.component.set("v.isEdit", true);
    },

    disableEditMode: function () {
        this.component.set("v.isEdit", false);
    },

    setIsDataLoading: function (value) {
        this.component.set("v.isDataLoading", value);
    },

    setIsDataSaving: function (value) {
        this.component.set("v.isDataSaving", value);
    },

    getBU: function () {
        return this.component.get("v.bu");
    },

    getSubBU: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.SubBU__c) {
            return committeeInfo.SubBU__c;
        }
        return "";
    },

    getRequestType: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.RecordType && committeeInfo.RecordType.Name) {
            const recordTypeName = committeeInfo.RecordType.Name.toLowerCase();
            if (recordTypeName.includes("new")) {
                return "Initial";
            } else if (recordTypeName.includes("extend")) {
                return "Extend";
            } else if (recordTypeName.includes("block")) {
                return "Block";
            } else if (recordTypeName.includes("credit")) {
                return "Change Credit";
            }
        }
        return "";
    },

    getCounterpartyType: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.RecordType && committeeInfo.RecordType.Name) {
            const recordTypeName = committeeInfo.RecordType.Name.toLowerCase();
            if (recordTypeName.includes("customer")) {
                return "Customer";
            } else if (recordTypeName.includes("supplier")) {
                return "Supplier";
            } else if (recordTypeName.includes("hedging")) {
                return "Hedging";
            }
        }
        return "";
    },

    getInterestedProduct: function () {
        const bu = this.getBU();
        const counterpartyType = this.getCounterpartyType();
        const committeeInfo = this.component.get("v.committeeInfo");
        let interestedProduct = "";
        if (bu === "TX") {
            if (counterpartyType === "Supplier") {
                interestedProduct = committeeInfo.InterestedProductTypeAsSupplierTX__c;
            } else {
                interestedProduct = committeeInfo.InterestedProductTypeAsCustomerTX__c;
            }
        } else {
            if (counterpartyType === "Supplier") {
                interestedProduct = committeeInfo.InterestedProductTypeAsSupplierTOP__c;
            } else {
                interestedProduct = committeeInfo.InterestedProductTypeAsCustomerTOP__c;
            }
        }
        return interestedProduct ? interestedProduct.split(",") : [];
    },

    getSalesOrg: function () {
        const bu = this.getBU();
        const committeeInfo = this.component.get("v.committeeInfo");
        if (bu === "TX") {
            return committeeInfo.SalesOrganizationTX__c;
        } else {
            return committeeInfo.SalesOrganizationTOP__c;
        }
    },

    getPurchasingOrg: function () {
        const bu = this.getBU();
        const committeeInfo = this.component.get("v.committeeInfo")
        if (bu === "TX") {
            return committeeInfo.PurchasingOrganizationTX__c;
        } else {
            return committeeInfo.PurchasingOrganizationTOP__c;
        }
    },

    hasCrudeProduct: function () {
        const products = this.getInterestedProduct();
        const hasCrudeProduct = products
            .map((item) => item.trim().toLowerCase())
            .includes("crude");
        return hasCrudeProduct;
    },

    getCountry: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.CTRRequestFormHeader__r && committeeInfo.CTRRequestFormHeader__r.Country__r && committeeInfo.CTRRequestFormHeader__r.Country__r.Code__c) {
            return committeeInfo.CTRRequestFormHeader__r.Country__r.Code__c;
        }
        return "";
    },

    getCMVP: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.OwnersCMVP__c) {
            return committeeInfo.OwnersCMVP__c;
        }
        return "";
    },

    getCMVPDecision: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.CMVPPreScreenDecision__c) {
            return committeeInfo.CMVPPreScreenDecision__c;
        }
        return "";
    },

    hasWaive: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.TraderWaive__c && committeeInfo.TraderWaive__c.toLowerCase() === "yes") {
            return true;
        }
        return false;
    },

    getExemptionResultSH: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.Approval_SHAgree__c && committeeInfo.Approval_SHAgree__c.toLowerCase() === "yes") {
            return true;
        }
        return false;
    },

    getExemptionResultVP: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.Approval_VPAgree__c && committeeInfo.Approval_VPAgree__c.toLowerCase() === "yes") {
            return true;
        }
        return false;
    },

    getExemptionResult: function () {
        if (this.getExemptionResultSH() && this.getExemptionResultVP()) {
            return true;
        }
        return false;
    },

    getEmailTemplateType: function () {
        const bu = this.getBU();
        const counterpartyType = this.component.get("v.counterpartyType");
        const buMapping = {
            "TOP": {
                "Customer": "Committee TOP",
                "Supplier": "Committee TOP",
            },
            "TX": {
                "Customer": "Committee Customer TX",
                "Supplier": "Committee Supplier TX",
            },
            "LABIX": {
                "Customer": "Committee LABIX",
                "Supplier": "Committee LABIX",
            },
        };
        return buMapping[bu][counterpartyType] || "Committee TOP";
    },

    getFinalCreditRating: function () {
        const committeeInfo = this.component.get("v.committeeInfo");

        const bu = this.getBU();
        const FinIntCrRating__c = committeeInfo.FinIntCrRating__c;
        const TraderWaive__c = this.hasWaive();
        const ExemptionResult__c = this.getExemptionResult();
        const counterpartyType = this.getCounterpartyType();
        const InternalCreditRating__c = committeeInfo.InternalCreditRating__c;
        const InternalCreditRatingTOP__c = committeeInfo.InternalCreditRatingTOP__c;
        const ApprovalTrader_CreditRating__c = committeeInfo.ApprovalTrader_CreditRating__c;

        if (FinIntCrRating__c) {
            return FinIntCrRating__c;
        }

        if (TraderWaive__c && ExemptionResult__c) {
            if (bu === "TOP") {
                if (counterpartyType === "Supplier") {
                    return InternalCreditRatingTOP__c;
                } else {
                    return ApprovalTrader_CreditRating__c;
                }
            }
        }

        if (bu === "TX") {
            return InternalCreditRating__c;
        } else {
            return InternalCreditRatingTOP__c;
        }
    },

    isDomesticOrInternational: function () {
        return this.getCountry() === "TH" ? "Domestic" : "International";
        // return this.component.get("v.committeeInfo").ServiceArea__c;
    },

    isInterByTX: function () {
        return false;
    },

    getStatus: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.Status__c) {
            return committeeInfo.Status__c;
        }
        return "";
    },

    getApprovalStep: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.Approval_Step__c) {
            return committeeInfo.Approval_Step__c;
        }
        return "";
    },

    getPaymentTerm: function (id) {
        const masterPaymentTerm = this.component.get("v.masterPaymentTerm");
        return masterPaymentTerm[id];
    },

    getCreditOwner: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.CreditOwner__c) {
            return committeeInfo.CreditOwner__c;
        }
        return "";
    },

    getCreditOwnerSectionHead: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.CreditOwnerSectionHead__c) {
            return committeeInfo.CreditOwnerSectionHead__c;
        }
        return "";
    },

    getCommitteeStatus: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (committeeInfo.CommitteeStatus__c) {
            return committeeInfo.CommitteeStatus__c;
        }
        return "";
    },

    getAccountName: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (
            committeeInfo.CTRRequestFormHeader__r
            && committeeInfo.CTRRequestFormHeader__r.Customer__r
            && committeeInfo.CTRRequestFormHeader__r.Customer__r.Name
        ) {
            return committeeInfo.CTRRequestFormHeader__r.Customer__r.Name;
        }
        return "";
    },

    getCurrentUser: function () {
        return $A.get("$SObjectType.CurrentUser.Id");
    },

    getCurrentUserBUProfile: function () {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const action = _THIS_.component.get("c.getCurrentUserBUProfile");
            action.setParams({
                "recordId": _THIS_.component.get("v.recordId")
            });
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    const buProfile = response.getReturnValue();
                    _THIS_.component.set("v.buProfile", buProfile);
                    _THIS_.component.set("v.bu", buProfile.BusinessUnit__c);
                    resolve(buProfile);
                } else {
                    reject(response.getError());
                }
            });
            $A.enqueueAction(action);
        }));
    },

    getRequestCounterpartyType: function () {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const action = _THIS_.component.get("c.getRequestCounterpartyType");
            action.setParams({
                "recordId": _THIS_.component.get("v.recordId")
            });
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    _THIS_.component.set("v.counterpartyType", response.getReturnValue());
                    resolve(response.getReturnValue());
                } else {
                    reject(response.getError());
                }
            });
            $A.enqueueAction(action);
        }));
    },

    getMasterPaymentTerm: function () {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const action = _THIS_.component.get("c.getMasterPaymentTerm");
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    const masterPaymentTerm = response.getReturnValue();
                    _THIS_.component.set("v.masterPaymentTerm", masterPaymentTerm);
                    resolve(masterPaymentTerm)
                } else {
                    console.error("Error fetching committees: " + state);
                    reject(response.getError())
                }
            });
            $A.enqueueAction(action);
        }))
    },

    getGroupedCommittees: function () {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const action = _THIS_.component.get("c.getGroupedCommittees");
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    const groupedCommittees = response.getReturnValue();
                    _THIS_.component.set("v.groupedCommittees", groupedCommittees);
                    resolve(groupedCommittees)
                } else {
                    console.error("Error fetching committees: " + state);
                    reject(response.getError())
                }
            });
            $A.enqueueAction(action);
        }))
    },

    getTRCR: function (salesOrg, counterpartyType, type, hasCrude, interByTX) {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const action = _THIS_.component.get("c.getTRCR")
            action.setParams({
                "salesOrg": salesOrg,
                "recordType": counterpartyType,
                "type": type,
                "hasCrude": hasCrude,
                "interByTX": interByTX,
            })
            action.setCallback(this, function (response) {
                let state = response.getState()
                if (state === "SUCCESS") {
                    resolve(response.getReturnValue())
                } else {
                    reject(response.getError())
                }
            });
            $A.enqueueAction(action);
        }));
    },

    getTRCRSectionHead: function (salesOrg, counterpartyType, type, hasCrude, interByTX) {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const action = _THIS_.component.get("c.getTRCRSectionHead")
            action.setParams({
                "salesOrg": salesOrg,
                "recordType": counterpartyType,
                "type": type,
                "hasCrude": hasCrude,
                "interByTX": interByTX,
            })
            action.setCallback(this, function (response) {
                let state = response.getState()
                if (state === "SUCCESS") {
                    resolve(response.getReturnValue())
                } else {
                    reject(response.getError())
                }
            });
            $A.enqueueAction(action);
        }));
    },

    getCommitteeInfo: function () {
        const _THIS_ = this;
        console.log('Debug email template type', _THIS_.getEmailTemplateType(_THIS_.component.get("v.bu")))
        return new Promise($A.getCallback(function (resolve, reject) {
            const bu = _THIS_.component.get("v.bu");
            const action = _THIS_.component.get("c.getCommitteeInfo");
            action.setParams({
                "recordId": _THIS_.component.get("v.recordId"),
                "templateType": _THIS_.getEmailTemplateType()
            });
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    const committeeInfo = response.getReturnValue();
                    console.log('Debug committee info',committeeInfo)
                    if (committeeInfo) {
                        _THIS_.setCommitteeInfo(committeeInfo);
                    }
                    resolve(committeeInfo);
                } else {
                    console.log("get committee info error: " + JSON.stringify(response.getError()));
                    reject(response.getError());
                }
            });
            $A.enqueueAction(action);
        }));
    },

    setCommitteeInfo: function (committeeInfo) {
        this.component.set("v.committeeInfo", committeeInfo);

        this.component.set("v.emailUrgent", committeeInfo.EmailUrgent__c ? "Yes" : "No");
        this.component.set("v.requestFormObj", {
            CommitteeAttachment__c: committeeInfo.CommitteeAttachment__c,
            BuyTradeDCLCondition__c: committeeInfo.BuyTradeDCLCondition__c,
            BuyTradeEndorsement__c: committeeInfo.BuyTradeEndorsement__c,
            CashOnDelivery__c: committeeInfo.CashOnDelivery__c,
            CommitteeName__c: committeeInfo.CommitteeName__c,
            Currency__c: committeeInfo.Currency__c,
            HavingCollateral__c: committeeInfo.HavingCollateral__c,
            HavingOpenedCredit__c: committeeInfo.HavingOpenedCredit__c,
            AmountBankGuarantee__c: committeeInfo.AmountBankGuarantee__c || 0.00,
            AmountBuyTrade__c: committeeInfo.AmountBuyTrade__c || 0.00,
            AmountDCLCondition__c: committeeInfo.AmountDCLCondition__c || 0.00,
            AmountOpenedCredit__c: committeeInfo.AmountOpenedCredit__c || 0.00,
            AmountCreditTerm__c: committeeInfo.AmountCreditTerm__c || 0.00,
            FinBuyTradeDCLCondition__c: committeeInfo.FinBuyTradeDCLCondition__c,
            FinBuyTradeEndorsement__c: committeeInfo.FinBuyTradeEndorsement__c,
            FinHavingCollateral__c: committeeInfo.FinHavingCollateral__c,
            FinCashOnDelivery__c: committeeInfo.FinCashOnDelivery__c,
            FinHavingOpenedCredit__c: committeeInfo.FinHavingOpenedCredit__c,
            Name: committeeInfo.Name,
            FinAmountBankGuarantee__c: committeeInfo.FinAmountBankGuarantee__c || 0.00,
            FinAmountBuyTrade__c: committeeInfo.FinAmountBuyTrade__c || 0.00,
            FinAmountDCLCondition__c: committeeInfo.FinAmountDCLCondition__c || 0.00,
            FinAmountOpenedCredit__c: committeeInfo.FinAmountOpenedCredit__c || 0.00,
            FinAmountCreditTerm__c: committeeInfo.FinAmountCreditTerm__c || 0.00,
            FinTotalSecuredCurrency__c: committeeInfo.FinTotalSecuredCurrency__c,
            FinHavingCreditTermOrLetter__c: committeeInfo.FinHavingCreditTermOrLetter__c,
            FinCrCond__c: committeeInfo.FinCrCond__c,
            FinPaymentCond__c: committeeInfo.FinPaymentCond__c,
            FinOtherCondition__c: committeeInfo.FinOtherCondition__c,
            OtherCondition__c: committeeInfo.OtherCondition__c,
            TermOfPayment__c: committeeInfo.TermOfPayment__c,
            EmailTo__c: committeeInfo.EmailTo__c,
            EmailCC__c: committeeInfo.EmailCC__c,
            EmailUrgent__c: committeeInfo.EmailUrgent__c,
            Subject__c: committeeInfo.Subject__c,
            Message__c: committeeInfo.Message__c,
        })
        this.component.set("v.subBU", this.getSubBU());
        this.component.set("v.creditOwner", this.getCreditOwner());
        this.component.set("v.creditOwnerOld", this.getCreditOwner());
        // this.component.set("v.counterpartyType", this.getCounterpartyType());
        this.component.set("v.interestedProduct", this.getInterestedProduct());
        this.component.set("v.hasCrudeProduct", this.hasCrudeProduct());
        this.component.set("v.committeeStatus", this.getCommitteeStatus());
        this.setEmailInfo(committeeInfo);
        this.calTotalSecuredAmount();
    },

    setEmailInfo: function (committeeInfo) {
        try {
            if (!committeeInfo.Subject__c.includes("[RequestNo.:")) {
                const part = committeeInfo.Subject__c.split(":");
                if (part.length === 1) {
                    part[0] = `[RequestNo.:${committeeInfo.Name}] : ${part[0]}`;
                } else {
                    part[0] = part[0].trim();
                    part[0] = `${part[0]}[RequestNo.:${committeeInfo.Name}] `;
                }
                committeeInfo.Subject__c = part.join(":");
            }
            this.component.set("v.requestFormObj.Subject__c", committeeInfo.Subject__c || "");

            this.component.set("v.emailInfo", {
                Subject__c: committeeInfo.Subject__c || "",
                EmailTo__c: committeeInfo.EmailTo__c || "",
                EmailCC__c: committeeInfo.EmailCC__c || "",
                Message__c: committeeInfo.Message__c || "",
            })
        } catch (ex) {
            console.error(ex);
        }
    },

    setEmailRequestForm: function () {
        const emailUrgent = this.component.get("v.emailUrgent") === "Yes";
        this.component.set("v.requestFormObj.EmailUrgent__c", emailUrgent);
        this.component.set("v.requestFormObj.EmailCC__c", this.component.get("v.emailInfo.EmailCC__c"));
        this.component.set("v.requestFormObj.Subject__c", this.component.get("v.emailInfo.Subject__c"));
        this.component.set("v.requestFormObj.Message__c", this.component.get("v.emailInfo.Message__c"));
    },

    setPreviewEMailInfo: function () {
        const requestFormObj = this.component.get("v.requestFormObj");

        const emailTo = !$A.util.isEmpty(this.component.get("v.emailInfo.EmailTo__c")) ? String(this.component.get("v.emailInfo.EmailTo__c")) : "";
        const emailCC = !$A.util.isEmpty(this.component.get("v.emailInfo.EmailCC__c")) ? String(this.component.get("v.emailInfo.EmailCC__c")) : "";
        const subject = !$A.util.isEmpty(this.component.get("v.emailInfo.Subject__c")) ? String(this.component.get("v.emailInfo.Subject__c")) : "";
        const message = !$A.util.isEmpty(this.component.get("v.emailInfo.Message__c")) ? String(this.component.get("v.emailInfo.Message__c")) : "";

        let replacedMessage = message;
        replacedMessage = replacedMessage.replace("{$AccountName$}", this.getAccountName);
        replacedMessage = replacedMessage.replace("{$RecordType$}", this.getCounterpartyType());

        if (requestFormObj && requestFormObj.FinCrCond__c ) {
            replacedMessage = replacedMessage.replace("{$FinalCreditCondition$}", requestFormObj.FinCrCond__c);
        }
        // if (requestFormObj && requestFormObj.FinCrLimit__c ) {
        //     replacedMessage = replacedMessage.replace("{$FinCrLimit$}", requestFormObj.FinCrLimit__c);
        // }
        console.log('Debug preview email info ',JSON.parse(JSON.stringify(requestFormObj)))
        if (requestFormObj ) {
            console.log('Debug IsCreditUnlimitedEnabled',requestFormObj.FinCrLimit__c,this.component.find("FinCrLimit").get('v.value'),this.component.get('v.IsCreditUnlimitedEnabled'));
            var replaceCreditLimit = requestFormObj.FinCrLimit__c;
            if(this.component.get('v.IsCreditUnlimitedEnabled') && !requestFormObj.FinCrLimit__c) {
                replaceCreditLimit = 'Unlimited'
            }
            
            console.log('Debug replaceCreditLimit',replaceCreditLimit)
            if(replaceCreditLimit) {
                replacedMessage = replacedMessage.replace("{$FinCrLimit$}", replaceCreditLimit);
            }
        }
        if (requestFormObj && requestFormObj.FinCrLimitCur__c ) {
            replacedMessage = replacedMessage.replace("{$FinCrLimitCur$}", requestFormObj.FinCrLimitCur__c);
        }
        if (requestFormObj && requestFormObj.TermOfPayment__c ) {
            if (this.getPaymentTerm(requestFormObj.TermOfPayment__c))
                replacedMessage = replacedMessage.replace("{$TermOfPayment$}", this.getPaymentTerm(requestFormObj.TermOfPayment__c).Name);
        }

        var bu = this.component.get('v.bu');
        console.log('Debug setPreviewEmailInfo',bu,JSON.parse(JSON.stringify(requestFormObj)))
        if (bu == 'TOP' || bu == 'LABIX') {
            if (requestFormObj && requestFormObj.FinPaymentCond__c) {
                replacedMessage = replacedMessage.replace("{$FinalCondition$}", requestFormObj.FinPaymentCond__c);
            }
        } else if (bu == 'TX') {
            if (requestFormObj && requestFormObj.FinOtherCondition__c) {
                replacedMessage = replacedMessage.replace("{$FinalCondition$}", requestFormObj.FinOtherCondition__c);
            }
        }
        this.component.set("v.previewEMailInfo", {
            EmailTo__c: emailTo,
            EmailCC__c: emailCC,
            Subject__c: subject,
            Message__c: replacedMessage,
        });
        this.component.set("v.previewEmailAttachments", this.component.find("CTRFileUpload").getMergedAttachments());
    },

    calTotalSecuredAmount: function () {
        const requestFormObj = this.component.get("v.requestFormObj");
        const amount1 = Number(requestFormObj.FinAmountBankGuarantee__c);
        const amount2 = Number(requestFormObj.FinAmountBuyTrade__c);
        const amount3 = Number(requestFormObj.FinAmountDCLCondition__c);
        const amount4 = Number(requestFormObj.FinAmountOpenedCredit__c);
        // const amount4 = 0;
        const amount5 = Number(requestFormObj.FinAmountCreditTerm__c);

        const totalAmount = (amount1 + amount2 + amount3 + amount5).toFixed(2).split(".");
        const formattedTotalAmount = totalAmount[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + (totalAmount[1] ? "." + totalAmount[1] : "")
        this.component.set("v.totalAmount", formattedTotalAmount);

        const totalCreditAmount = (amount1 + amount2 + amount3 + amount4 + amount5).toFixed(2).split(".");
        const formattedTotalCreditAmount = totalCreditAmount[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + (totalCreditAmount[1] ? "." + totalCreditAmount[1] : "")
        this.component.set("v.totalCreditAmount", formattedTotalCreditAmount);
    },

    saveRequestForm: function () {
        const creditOwner = this.component.get("v.creditOwner");
        const creditOwnerOld = this.component.get("v.creditOwnerOld");
        if (creditOwner && creditOwner != creditOwnerOld) {
            this.component.set("v.requestFormObj.CreditOwner__c", creditOwner);
            return this.saveRequestFormServerAction("c.saveReqFormItem", "The request form has been reassigned to delegated person!", false);
        } else {
            this.component.set("v.requestFormObj.CreditOwner__c", creditOwnerOld);
            return this.saveRequestFormServerAction("c.saveReqFormItem", "The request form has been saved!", false);
        }
    },

    submitToSH: function () {
        const bu = this.getBU();
        const message = (bu === "TX")
            ? "The request form has been submitted to FA Manager successfully"
            : (bu === "LABIX")
                ? "The request form has been submitted to FALB Manager successfully"
                : "The request form has been submitted to TRCR Section Head successfully";
        return this.saveRequestFormServerAction("c.saveReqFormItemAndSubmitToSH", message, true);
    },

    saveRequestFormSH: function () {
        const message = "The request form has been saved!";
        return this.saveRequestFormServerAction("c.saveReqFormItemSH", message, false);
    },

    submitToCommittees: function () {
        return this.saveRequestFormServerAction("c.saveReqFormItemAndSubmitToCommittees", "The request form has been submitted to Committee!", true);
    },

    saveRequestFormServerAction: function (actionName, successMessage, isSubmit) {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            _THIS_.setEmailRequestForm();

            const uploadList = _THIS_.component.get("v.requestFormObj.CommitteeAttachment__c");
            console.log('Debug submitted data',JSON.parse(JSON.stringify(_THIS_.component.get("v.requestFormObj"))))
            debugger;
            const action = _THIS_.component.get(actionName);
            action.setParams({
                "recordId": _THIS_.component.get("v.recordId"),
                "reqFormObj": _THIS_.component.get("v.requestFormObj"),
                "isSubmit": isSubmit,
                "uploadedList": (uploadList !== "[]") ? uploadList : "",
                "templateType": _THIS_.getEmailTemplateType(),
                "profile": _THIS_.getBU()
            });
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    _THIS_.showToast(successMessage, "success");
                    resolve(state);
                } else if (state === "ERROR") {
                    const errors = response.getError();
                    if (errors && errors[0] && errors[0].message) {
                        _THIS_.showToast(errors[0].message, "error");
                        console.log("Error message: " + errors[0].message);
                    }
                    reject(errors);
                }
            });
            $A.enqueueAction(action);
        }));
    },

    revertToTRCR: function () {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const action = _THIS_.component.get("c.revertToTRCR");
            action.setParams({
                "recordId": _THIS_.component.get("v.recordId"),
                "comment": _THIS_.component.get("v.requestFormObj.Comment__c"),
            });
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    const isReverted = response.getReturnValue();
                    if (isReverted) {
                        _THIS_.showToast("The request has been reverted to Credit Team!", "success");
                        // $A.get("e.force:refreshView").fire();
                        resolve(isReverted);
                    } else {
                        _THIS_.showToast("Cannot revert to Credit Team", "error");
                    }
                } else {
                    const errors = response.getError();
                    reject(errors);
                }
            });
            $A.enqueueAction(action);
        }));
    },

    uploadFileToSharePoint: function () {
        this.setIsDataSaving(true);
        const action = this.component.get("c.sendFiletoHeroku");
        action.setParams({
            "recordId": this.component.get("v.recordId"),
            "uploadedList": this.component.get("v.uploadedFile")
        });
        action.setCallback(this, function (res) {
            const state = res.getState();
            if (state === "SUCCESS") {
                this.showToast("Files submitted!", "success");
            }
            this.setIsDataSaving(false);
        });
        $A.enqueueAction(action);
    },

    setFinalCreditConditionVisibility: function (creditCondition) {
        const bu = this.getBU();

        if (!(bu === "TX")) {
            var IsCreditUnlimitedEnabled = false;
            if (creditCondition == "Open Account") {
                this.component.set("v.isCreditLimitDisable", true);
                this.component.set("v.isTradeCreditDisable", true);
                IsCreditUnlimitedEnabled = true;
            } else if (
                creditCondition == "Open Account With Collateral"
            ) {
                this.component.set("v.isTradeCreditDisable", true);
                this.component.set("v.isCreditLimitDisable", true);
            } else if (
                creditCondition == "Cash in Advance"
                || creditCondition == "L/C"
                || creditCondition == "Domestic L/C"
                || creditCondition == "Others"
            ) {
                this.component.set("v.isTradeCreditDisable", false);
                this.component.set("v.isCreditLimitDisable", false);
            } else {
                this.component.set("v.isTradeCreditDisable", false);
                this.component.set("v.isCreditLimitDisable", false);
            }

            this.component.set('v.IsCreditUnlimitedEnabled',IsCreditUnlimitedEnabled);
        }
    },

    setRequirePaymentCondition: function (creditCondition) {
        const bu = this.getBU();
        this.component.set("v.requiredPaymentCondition", false);

        // if (bu === "TOP") {
        //     if (
        //         creditCondition == "Cash in Advance"
        //         || creditCondition == "Others"
        //     ) {
        //         this.component.set("v.requiredPaymentCondition", false);
        //     } else {
        //         this.component.set("v.requiredPaymentCondition", true);
        //     }
        // } else if (bu === "LABIX") {
        //     this.component.set("v.requiredPaymentCondition", false);
        // }
    },

    setRequireCreditLimit: function (creditCondition) {
        const bu = this.getBU();
        console.log('Debug setRequireCreditLimit',creditCondition)
        var isCreditLimitRequired = false;
        if (bu != "TX") {
            if (creditCondition == "Open Account With Collateral") {
                isCreditLimitRequired = true;
            }
        }
        this.component.set("v.isCreditLimitRequired", isCreditLimitRequired);
    },

    resetFinalCreditCondition: function () {
        try {
            const bu = this.getBU();

            if (bu === "TX") {
                this.component.find("TXTermOfPayment").set("v.value", "");
                this.component.find("TXFinRiskCategory").set("v.value", "");
                this.component.find("TXFinCrLimit").set("v.value", "");
                this.component.find("TXFinCrLimitCur").set("v.value", "");
            } else {
                this.component.find("FinCrLimit").set("v.value", "");
                this.component.find("FinCrLimitCur").set("v.value", "");
                this.component.find("FinTradeCrIns").set("v.value", "");
                this.component.find("FinTradeCrInsCu").set("v.value", "");
                this.component.find("TermOfPayment").set("v.value", "");
                this.component.find("FinPaymentCond").set("v.value", "");
            }
        } catch (ex) {
            console.error(ex);
        }
    },

    canEdit: function (trcrList, trcrHeadList) {
        const status = this.getStatus();
        const approvalStep = this.getApprovalStep();
        const creditOwner = this.getCreditOwner();
        const creditOwnerSectionHead = this.getCreditOwnerSectionHead();
        const committeeStatus = this.getCommitteeStatus();
        const currentUser = this.getCurrentUser();
        const bu = this.getBU();

        let canEdit = false;
        if (bu === "TX") {
            if (status === "In Review" && approvalStep === "Select Committee") {
                if (!committeeStatus || committeeStatus === "Draft") {
                    if (!creditOwner && $A.util.isArray(trcrList)) {
                        canEdit = trcrList.findIndex((item) => {
                            return currentUser === item.Id;
                        }) > -1;
                    } else if (currentUser === creditOwner) {
                        this.component.set("v.canEdit", true);
                    }
                } else if (committeeStatus === "Waiting Section Head Review") {
                    if (!creditOwnerSectionHead && $A.util.isArray(trcrHeadList)) {
                        canEdit = trcrHeadList.findIndex((item) => {
                            return currentUser === item.Id;
                        }) > -1;
                    } else if (currentUser === creditOwnerSectionHead) {
                        canEdit = true;
                    }
                }
            }
        } else {
            if (status === "In Review" && approvalStep === "Select Committee") {
                if (!committeeStatus || committeeStatus === "Draft" || committeeStatus === "Reverted to Credit Team") {
                    if (!creditOwner && $A.util.isArray(trcrList)) {
                        canEdit = trcrList.findIndex((item) => {
                            return currentUser === item.Id;
                        }) > -1;
                    } else if (currentUser === creditOwner) {
                        canEdit = true;
                    }
                } else if (committeeStatus === "Waiting Section Head Review") {
                    if (!creditOwnerSectionHead && $A.util.isArray(trcrHeadList)) {
                        canEdit = trcrHeadList.findIndex((item) => {
                            return currentUser === item.Id;
                        }) > -1;
                    } else if (currentUser === creditOwnerSectionHead) {
                        canEdit = true;
                    }
                }
            }

            this.component.set("v.canEdit", canEdit);
        }
    },

    convertGroupedCommitteesToList: function (groupedCommittee) {
        const lstCommittee = [];
        groupedCommittee.forEach(function (item) {
            lstCommittee.push(...item.committees);
        });
        const bu = this.getBU();
        if (bu === "LABIX") {
            lstCommittee.forEach(function (item) {
                const position = item.Parent__c || "";
                if (position.includes("CM LABIX")) {
                    item.Parent__c = "LABIX Commercial Manager" ;
                }
            });
        }
        return lstCommittee;
    },

    defaultFinalCreditCondition: function () {
        console.log('Debug defaultFinalCreditCondition')
        const bu = this.getBU();
        if (bu === "TX") {
            this.defaultTXFinalCreditCondition();
        } else {
            this.defaultTOPFinalCreditCondition();
        }
    },

    defaultTXFinalCreditCondition: function () {
        try {
            const committeeInfo = this.component.get("v.committeeInfo");

            const FinalPerformanceBond__c = committeeInfo.FinalPerformanceBond__c;
            const FinCrCond__c = committeeInfo.FinCrCond__c;
            const FinCrLimit__c = committeeInfo.FinCrLimit__c;
            const FinCrLimitCur__c = committeeInfo.FinCrLimitCur__c;
            const FinTradeCrIns__c = committeeInfo.FinTradeCrIns__c;
            const FinTradeCrInsCu__c = committeeInfo.FinTradeCrInsCu__c;
            const TermOfPayment__c = committeeInfo.TermOfPayment__c;
            const FinPaymentCond__c = committeeInfo.FinPaymentCond__c;
            const FinRiskCategory__c = committeeInfo.FinRiskCategory__c;
            const FinIntCrRating__c = committeeInfo.FinIntCrRating__c;
            const FinOtherCondition__c = committeeInfo.FinOtherCondition__c;
            const FinCashOnDelivery__c = committeeInfo.FinCashOnDelivery__c;
            const FinHavingCollateral__c = committeeInfo.FinHavingCollateral__c;
            const FinHavingCreditTermOrLetter__c = committeeInfo.FinHavingCreditTermOrLetter__c;
            const FinBuyTradeEndorsement__c = committeeInfo.FinBuyTradeEndorsement__c;
            const FinBuyTradeDCLCondition__c = committeeInfo.FinBuyTradeDCLCondition__c;
            const FinHavingOpenedCredit__c = committeeInfo.FinHavingOpenedCredit__c;
            const FinAmountBankGuarantee__c = committeeInfo.FinAmountBankGuarantee__c;
            const FinAmountCreditTerm__c = committeeInfo.FinAmountCreditTerm__c;
            const FinAmountBuyTrade__c = committeeInfo.FinAmountBuyTrade__c;
            const FinAmountDCLCondition__c = committeeInfo.FinAmountDCLCondition__c;
            const FinAmountOpenedCredit__c = committeeInfo.FinAmountOpenedCredit__c;
            const FinTotalSecuredCurrency__c = committeeInfo.FinTotalSecuredCurrency__c;

            const PerformanceBond__c = committeeInfo.PerformanceBond__c;
            const Credit_Condition__c = committeeInfo.Credit_Condition__c;
            const CreditLimit__c = committeeInfo.CreditLimit__c;
            const CreditLimitCurrency__c = committeeInfo.CreditLimitCurrency__c;
            const Trade_Credit_Insurance__c = committeeInfo.Trade_Credit_Insurance__c;
            const TradeCreditInsuranceCurrency__c = committeeInfo.TradeCreditInsuranceCurrency__c;
            const PaymentTerm__c = committeeInfo.PaymentTerm__c;
            const PaymentCondition__c = committeeInfo.PaymentCondition__c;
            const RiskCategory__c = committeeInfo.RiskCategory__c;
            const InternalCreditRating__c = committeeInfo.InternalCreditRating__c;
            const OtherCondition__c = committeeInfo.OtherCondition__c;
            const CashOnDelivery__c = committeeInfo.CashOnDelivery__c;
            const HavingCollateral__c = committeeInfo.HavingCollateral__c;
            const HavingCreditTermOrLetter__c = committeeInfo.HavingCreditTermOrLetter__c;
            const BuyTradeEndorsement__c = committeeInfo.BuyTradeEndorsement__c;
            const BuyTradeDCLCondition__c = committeeInfo.BuyTradeDCLCondition__c;
            const HavingOpenedCredit__c = committeeInfo.HavingOpenedCredit__c;
            const AmountBankGuarantee__c = committeeInfo.AmountBankGuarantee__c;
            const AmountCreditTerm__c = committeeInfo.AmountCreditTerm__c;
            const AmountBuyTrade__c = committeeInfo.AmountBuyTrade__c;
            const AmountDCLCondition__c = committeeInfo.AmountDCLCondition__c;
            const AmountOpenedCredit__c = committeeInfo.AmountOpenedCredit__c;


            const cmpTXFinCrCond = this.component.find("TXFinCrCond")
            if (!FinCrCond__c && cmpTXFinCrCond) {
                cmpTXFinCrCond.set("v.value", Credit_Condition__c)
            }
            const cmpTXTermOfPayment = this.component.find("TXTermOfPayment")
            if (!TermOfPayment__c && cmpTXTermOfPayment) {
                cmpTXTermOfPayment.set("v.value", PaymentTerm__c)
            }
            const cmpTXFinRiskCategory = this.component.find("TXFinRiskCategory")
            if (!FinRiskCategory__c && cmpTXFinRiskCategory) {
                cmpTXFinRiskCategory.set("v.value", RiskCategory__c)
            }
            const cmpTXFinCrLimit = this.component.find("TXFinCrLimit")
            if (!FinCrLimit__c && cmpTXFinCrLimit) {
                cmpTXFinCrLimit.set("v.value", CreditLimit__c)
            }
            const cmpTXFinCrLimitCur = this.component.find("TXFinCrLimitCur")
            if (!FinCrLimitCur__c && cmpTXFinCrLimitCur) {
                cmpTXFinCrLimitCur.set("v.value", CreditLimitCurrency__c)
            }
            const cmpTXFinIntCrRating = this.component.find("TXFinIntCrRating")
            if (!FinIntCrRating__c && cmpTXFinIntCrRating) {
                cmpTXFinIntCrRating.set("v.value", InternalCreditRating__c)
            }
            const cmpTXFinOtherCondition = this.component.find("TXFinOtherCondition")
            if (!FinOtherCondition__c && cmpTXFinOtherCondition) {
                cmpTXFinOtherCondition.set("v.value", OtherCondition__c)
            }
            const cmpTXFinCashOnDelivery = this.component.find("TXFinCashOnDelivery")
            if (!FinCashOnDelivery__c && cmpTXFinCashOnDelivery) {
                cmpTXFinCashOnDelivery.set("v.value", CashOnDelivery__c)
            }

            if (cmpTXFinCashOnDelivery && cmpTXFinCashOnDelivery.get("v.value") == "No") {
                if (!FinHavingCollateral__c) {
                    const cmpTXFinHavingCollateral = this.component.find("TXFinHavingCollateral")
                    if (cmpTXFinHavingCollateral) {
                        cmpTXFinHavingCollateral.set("v.value", HavingCollateral__c)
                    }
                    const cmpTXFinAmountBankGuarantee = this.component.find("TXFinAmountBankGuarantee")
                    if (cmpTXFinAmountBankGuarantee) {
                        cmpTXFinAmountBankGuarantee.set("v.value", AmountBankGuarantee__c)
                    }
                }
                // if (!FinHavingCreditTermOrLetter__c) {
                //     const cmpTXFinHavingCreditTermOrLetter = this.component.find("TXFinHavingCreditTermOrLetter")
                //     if (cmpTXFinHavingCreditTermOrLetter) {
                //         cmpTXFinHavingCreditTermOrLetter.set("v.value", HavingCreditTermOrLetter__c)
                //     }
                //     const cmpTXFinAmountCreditTerm = this.component.find("TXFinAmountCreditTerm")
                //     if (cmpTXFinAmountCreditTerm) {
                //         cmpTXFinAmountCreditTerm.set("v.value", AmountCreditTerm__c)
                //     }
                // }
                if (!FinBuyTradeEndorsement__c) {
                    const cmpTXFinBuyTradeEndorsement = this.component.find("TXFinBuyTradeEndorsement")
                    if (cmpTXFinBuyTradeEndorsement) {
                        cmpTXFinBuyTradeEndorsement.set("v.value", BuyTradeEndorsement__c)
                    }
                    const cmpTXFinAmountBuyTrade = this.component.find("TXFinAmountBuyTrade")
                    if (cmpTXFinAmountBuyTrade) {
                        cmpTXFinAmountBuyTrade.set("v.value", AmountBuyTrade__c)
                    }
                }
                if (!FinBuyTradeDCLCondition__c) {
                    const cmpTXFinBuyTradeDCLCondition = this.component.find("TXFinBuyTradeDCLCondition")
                    if (cmpTXFinBuyTradeDCLCondition) {
                        cmpTXFinBuyTradeDCLCondition.set("v.value", BuyTradeDCLCondition__c)
                    }
                    const cmpTXFinAmountDCLCondition = this.component.find("TXFinAmountDCLCondition")
                    if (cmpTXFinAmountDCLCondition) {
                        cmpTXFinAmountDCLCondition.set("v.value", AmountDCLCondition__c)
                    }
                }
                if (!FinHavingOpenedCredit__c) {
                    const cmpTXFinHavingOpenedCredit = this.component.find("TXFinHavingOpenedCredit")
                    if (cmpTXFinHavingOpenedCredit) {
                        cmpTXFinHavingOpenedCredit.set("v.value", HavingOpenedCredit__c)
                    }
                    const cmpTXFinAmountOpenedCredit = this.component.find("TXFinAmountOpenedCredit")
                    if (cmpTXFinAmountOpenedCredit) {
                        cmpTXFinAmountOpenedCredit.set("v.value", AmountOpenedCredit__c)
                    }
                }
                if (!FinTotalSecuredCurrency__c) {
                    const cmpTXFinTotalSecuredCurrency = this.component.find("TXFinTotalSecuredCurrency")
                    if (cmpTXFinTotalSecuredCurrency) {
                        cmpTXFinTotalSecuredCurrency.set("v.value", CreditLimitCurrency__c)
                    }
                }

            }

            this.calTotalSecuredAmount(this.component);
        } catch (ex) {
            console.log("Debug ex", ex)
        }
    },

    defaultTOPFinalCreditCondition: function () {
        try {
            const committeeInfo = this.component.get("v.committeeInfo");
            const TraderWaive__c = this.hasWaive();
            const ExemptionResult__c = this.getExemptionResult();
            const counterpartyType = this.getCounterpartyType();
            const hasCrudeProduct = this.hasCrudeProduct();

            const FinalPerformanceBond__c = committeeInfo.FinalPerformanceBond__c;
            const FinCrCond__c = committeeInfo.FinCrCond__c;
            const FinCrLimit__c = committeeInfo.FinCrLimit__c;
            const FinCrLimitCur__c = committeeInfo.FinCrLimitCur__c;
            const FinTradeCrIns__c = committeeInfo.FinTradeCrIns__c;
            const FinTradeCrInsCu__c = committeeInfo.FinTradeCrInsCu__c;
            const TermOfPayment__c = committeeInfo.TermOfPayment__c;
            const FinPaymentCond__c = committeeInfo.FinPaymentCond__c;
            const FinIntCrRating__c = committeeInfo.FinIntCrRating__c;

            const PerformanceBond__c = committeeInfo.PerformanceBond__c;
            const Credit_Condition__c = committeeInfo.Credit_Condition__c;
            const CreditLimit__c = committeeInfo.CreditLimit__c;
            const CreditLimitCurrency__c = committeeInfo.CreditLimitCurrency__c;
            const Trade_Credit_Insurance__c = committeeInfo.Trade_Credit_Insurance__c;
            const TradeCreditInsuranceCurrency__c = committeeInfo.TradeCreditInsuranceCurrency__c;
            const PaymentTerm__c = committeeInfo.PaymentTerm__c;
            const PaymentCondition__c = committeeInfo.PaymentCondition__c;
            const InternalCreditRating__c = committeeInfo.InternalCreditRatingTOP__c;

            const TDPerformanceBond__c = committeeInfo.TDPerformanceBond__c;
            const ApprovalTrader_CreditCondition__c = committeeInfo.ApprovalTrader_CreditCondition__c;
            const ApprovalTrader_CreditLimit__c = committeeInfo.ApprovalTrader_CreditLimit__c;
            const ApprovalTrader_CreditLimitCurrency__c = committeeInfo.ApprovalTraderCreditLimitCurrency__c;
            const ApprovalTrader_TradeCreditInsurance__c = committeeInfo.ApprovalTrader_TradeCreditInsurance__c;
            const ApprovalTrader_TradeCreditCurrency__c = committeeInfo.ApprovalTraderTradeCreditCurrency__c;
            const ApprovalTrader_PaymentTerm__c = committeeInfo.ApprovalTrader_PaymentTerm__c;
            const ApprovalTrader_PaymentCondition__c = committeeInfo.ApprovalTrader_PaymentCondition__c;
            const ApprovalTrader_CreditRating__c = committeeInfo.ApprovalTrader_CreditRating__c;
            console.log('Debug defaultTOPFinalCreditCondition ',committeeInfo)
            if (counterpartyType === "Supplier") {
                !FinCrCond__c && this.component.find("FinCrCond").set("v.value", Credit_Condition__c)
                !FinCrLimit__c && this.component.find("FinCrLimit").set("v.value", CreditLimit__c)
                !FinCrLimitCur__c && this.component.find("FinCrLimitCur").set("v.value", CreditLimitCurrency__c)
                !FinTradeCrIns__c && this.component.find("FinTradeCrIns").set("v.value", Trade_Credit_Insurance__c)
                !FinTradeCrInsCu__c && this.component.find("FinTradeCrInsCu").set("v.value", TradeCreditInsuranceCurrency__c)
                !TermOfPayment__c && this.component.find("TermOfPayment").set("v.value", PaymentTerm__c)
                !FinPaymentCond__c && this.component.find("FinPaymentCond").set("v.value", PaymentCondition__c)
                !FinIntCrRating__c && this.component.find("FinIntCrRating").set("v.value", InternalCreditRating__c)
                if (hasCrudeProduct) {
                    if (!TraderWaive__c) {
                        !FinalPerformanceBond__c && this.component.find("FinalPerformanceBond").set("v.value", PerformanceBond__c)
                    } else if (ExemptionResult__c) {
                        !FinalPerformanceBond__c && this.component.find("FinalPerformanceBond").set("v.value", TDPerformanceBond__c)
                    } else {
                        !FinalPerformanceBond__c && this.component.find("FinalPerformanceBond").set("v.value", PerformanceBond__c)
                    }
                }
                this.setFinalCreditConditionVisibility(Credit_Condition__c)
                this.setRequirePaymentCondition(Credit_Condition__c)
                this.setRequireCreditLimit(Credit_Condition__c)
            } else {
                if (!TraderWaive__c) {
                    !FinCrCond__c && this.component.find("FinCrCond").set("v.value", Credit_Condition__c)
                    !FinCrLimit__c && this.component.find("FinCrLimit").set("v.value", CreditLimit__c)
                    !FinCrLimitCur__c && this.component.find("FinCrLimitCur").set("v.value", CreditLimitCurrency__c)
                    !FinTradeCrIns__c && this.component.find("FinTradeCrIns").set("v.value", Trade_Credit_Insurance__c)
                    !FinTradeCrInsCu__c && this.component.find("FinTradeCrInsCu").set("v.value", TradeCreditInsuranceCurrency__c)
                    !TermOfPayment__c && this.component.find("TermOfPayment").set("v.value", PaymentTerm__c)
                    !FinPaymentCond__c && this.component.find("FinPaymentCond").set("v.value", PaymentCondition__c)
                    !FinIntCrRating__c && this.component.find("FinIntCrRating").set("v.value", InternalCreditRating__c)
                    this.setFinalCreditConditionVisibility(Credit_Condition__c)
                    this.setRequirePaymentCondition(Credit_Condition__c)
                    this.setRequireCreditLimit(Credit_Condition__c)
                } else if (ExemptionResult__c) {
                    !FinCrCond__c && this.component.find("FinCrCond").set("v.value", ApprovalTrader_CreditCondition__c)
                    !FinCrLimit__c && this.component.find("FinCrLimit").set("v.value", ApprovalTrader_CreditLimit__c)
                    !FinCrLimitCur__c && this.component.find("FinCrLimitCur").set("v.value", ApprovalTrader_CreditLimitCurrency__c)
                    !FinTradeCrIns__c && this.component.find("FinTradeCrIns").set("v.value", ApprovalTrader_TradeCreditInsurance__c)
                    !FinTradeCrInsCu__c && this.component.find("FinTradeCrInsCu").set("v.value", ApprovalTrader_TradeCreditCurrency__c)
                    !TermOfPayment__c && this.component.find("TermOfPayment").set("v.value", ApprovalTrader_PaymentTerm__c)
                    !FinPaymentCond__c && this.component.find("FinPaymentCond").set("v.value", ApprovalTrader_PaymentCondition__c)
                    !FinIntCrRating__c && this.component.find("FinIntCrRating").set("v.value", ApprovalTrader_CreditRating__c)
                    this.setFinalCreditConditionVisibility(ApprovalTrader_CreditCondition__c)
                    this.setRequirePaymentCondition(Credit_Condition__c)
                    this.setRequireCreditLimit(Credit_Condition__c)
                } else {
                    !FinCrCond__c && this.component.find("FinCrCond").set("v.value", Credit_Condition__c)
                    !FinCrLimit__c && this.component.find("FinCrLimit").set("v.value", CreditLimit__c)
                    !FinCrLimitCur__c && this.component.find("FinCrLimitCur").set("v.value", CreditLimitCurrency__c)
                    !FinTradeCrIns__c && this.component.find("FinTradeCrIns").set("v.value", Trade_Credit_Insurance__c)
                    !FinTradeCrInsCu__c && this.component.find("FinTradeCrInsCu").set("v.value", TradeCreditInsuranceCurrency__c)
                    !TermOfPayment__c && this.component.find("TermOfPayment").set("v.value", PaymentTerm__c)
                    !FinPaymentCond__c && this.component.find("FinPaymentCond").set("v.value", PaymentCondition__c)
                    !FinIntCrRating__c && this.component.find("FinIntCrRating").set("v.value", InternalCreditRating__c)
                    this.setFinalCreditConditionVisibility(Credit_Condition__c)
                    this.setRequirePaymentCondition(Credit_Condition__c)
                    this.setRequireCreditLimit(Credit_Condition__c)
                }
            }
        } catch (ex) {
            console.log("Debug ex", ex)
        }
    },

    loadCommittee: function (lstCommittee, lstCompany, committeeInfo) {
        const bu = this.getBU();
        const counterpartyType = this.getCounterpartyType();
        if (bu === "TX") {
            if (counterpartyType === "Customer") {
                this.loadTXCommitteeCustomer(lstCommittee, lstCompany, committeeInfo);
            } else {
                this.loadTXCommitteeSupplier(lstCommittee, lstCompany, committeeInfo);
            }
        } else {
            if (counterpartyType === "Customer") {
                this.loadTOPCommitteeCustomer(lstCommittee, lstCompany, committeeInfo);
            } else {
                this.loadTOPCommitteeSupplier(lstCommittee, lstCompany, committeeInfo);
            }
        }
    },

    loadTXCommitteeCustomer: function (lstCommittee, lstCompany, committeeInfo) {
        const creditRating = this.getFinalCreditRating();
        const includedCommittees = []
        const bu = this.getBU()
        const selectedCommittees = committeeInfo.CommitteeName__c.split(",")

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(bu)
        })

        // Set Required Committees
        lstCompany.forEach((company) => {
            const fieldName = company + "__c"
            lstFilteredCommittees.forEach((item) => {
                if (item[fieldName]) {
                    const requiredCreditRating = "*" + creditRating; //here
                    const rating = item[fieldName].split(",")
                    if (rating.indexOf(requiredCreditRating) > -1) {
                        includedCommittees.push(item.DeveloperName)
                    }
                }
            })
        })

        // Filter for Specific Sub BU
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        console.log('Debug includedCommittees ', includedCommittees)
        console.log('Debug selectedCommittees ', selectedCommittees)
        this.component.set("v.includedCommittees", includedCommittees)
        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)
    },

    loadTXCommitteeSupplier: function (lstCommittee, lstCompany, committeeInfo) {
        const bu = this.getBU()
        const selectedCommittees = committeeInfo.CommitteeName__c.split(",")

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(bu)
        })

        // Filter for Specific Sub BU
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)
    },

    loadTOPCommitteeCustomer: function (lstCommittee, lstCompany, committeeInfo) {
        const bu = this.getBU()
        const selectedCommittees = committeeInfo.CommitteeName__c.split(",")

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(bu)
        })

        // Filter for Specific Sub BU
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)
    },

    loadTOPCommitteeSupplier: function (lstCommittee, lstCompany, committeeInfo) {
        const bu = this.getBU()
        const selectedCommittees = committeeInfo.CommitteeName__c.split(",")

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(bu)
        })

        // Filter for Specific Sub BU
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)
    },

    defaultCommittee: function (lstCommittee, lstCompany, committeeInfo) {
        const bu = this.getBU();
        const counterpartyType = this.getCounterpartyType();
        const interestedProduct = this.getInterestedProduct();
        const country = this.getCountry();
        const cmvp = this.getCMVP();
        const cmvpDecision = this.getCMVPDecision();
        const creditRating = this.getFinalCreditRating();

        if (bu === "TX") {
            if (counterpartyType === "Customer") {
                this.defaultTXCommitteeCustomer(lstCommittee, lstCompany, creditRating, bu, interestedProduct);
            } else {
                this.defaultTXCommitteeSupplier(lstCommittee, lstCompany, creditRating, bu, interestedProduct);
            }
        } else {
            if (counterpartyType === "Customer") {
                this.defaultTOPCommitteeCustomer(lstCommittee, lstCompany, creditRating, cmvp, cmvpDecision, country, bu, interestedProduct);
            } else {
                this.defaultTOPCommitteeSupplier(lstCommittee, lstCompany, creditRating, cmvp, cmvpDecision, country, bu, interestedProduct);
            }
        }
    },

    defaultTXCommitteeCustomer: function (lstCommittee, lstCompany, creditRating, buProfile) {
        const selectedCommittees = []
        const includedCommittees = []

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(buProfile)
        })

        // Set Default Committees
        lstCompany.forEach((company) => {
            const fieldName = company + "__c"
            lstFilteredCommittees.forEach((item) => {
                if (item[fieldName]) {
                    const rating = item[fieldName].split(",")
                    if (rating.indexOf(creditRating) > -1) {
                        selectedCommittees.push(item.DeveloperName)
                    }
                    const requiredCreditRating = "*" + creditRating;
                    if (rating.indexOf(requiredCreditRating) > -1) {
                        includedCommittees.push(item.DeveloperName)
                    }
                }
            })
        })

        // Filter for Specific Sub BU
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        this.component.set("v.includedCommittees", includedCommittees)
        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)

        if (!creditRating) {
            this.showToast("INFO-0001", "info")
        }
    },

    defaultTXCommitteeSupplier: function (lstCommittee, lstCompany, creditRating, buProfile) {
        const selectedCommittees = []
        const includedCommittees = []

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(buProfile)
        })

        // Filter for Specific Sub BU
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        // Set Default Committees
        lstFilteredCommitteesInCompany.forEach((item) => {
            selectedCommittees.push(item.DeveloperName)
        })

        this.component.set("v.includedCommittees", includedCommittees)
        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)
    },

    defaultTOPCommitteeCustomer: function (lstCommittee, lstCompany, creditRating, cmvpOwner, cmvpPreScreenDecision, country, buProfile) {
        const selectedCommittees = []

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(buProfile)
        })

        // Filter for Specific Sub BU
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        // Set Default Committees
        lstCompany.forEach((company) => {
            const fieldName = company + "__c"
            lstFilteredCommitteesInCompany.forEach((item) => {
                if (item[fieldName]) {
                    const rating = item[fieldName].split(",")
                    if (rating.indexOf(creditRating) > -1) {
                        if (item.Parent__c === "CMVP") {
                            if (cmvpOwner && cmvpPreScreenDecision === "Pass" && country === "TH") {
                                selectedCommittees.push(item.DeveloperName)
                            }
                        } else if (item.Parent__c === "SA09") {
                            if (cmvpOwner && cmvpPreScreenDecision === "Pass" && country !== "TH") {
                                selectedCommittees.push(item.DeveloperName)
                            }
                        } else {
                            selectedCommittees.push(item.DeveloperName)
                        }
                    }
                }
            })
        })

        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)

        if (!creditRating) {
            this.showToast("INFO-0001", "info")
        }
    },

    defaultTOPCommitteeSupplier: function (lstCommittee, lstCompany, creditRating, cmvpOwner, cmvpPreScreenDecision, country, buProfile) {
        const selectedCommittees = []

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(buProfile)
        })

        // Filter for Specific Sub BU
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        // Set Default Committees
        lstCompany.forEach((company) => {
            const fieldName = company + "__c"
            lstFilteredCommitteesInCompany.forEach((item) => {
                if (item[fieldName]) {
                    const rating = item[fieldName].split(",")
                    if (rating.indexOf(creditRating) > -1) {
                        if (item.Parent__c === "CMVP") {
                            if (cmvpOwner && cmvpPreScreenDecision === "Pass" && country === "TH") {
                                selectedCommittees.push(item.DeveloperName)
                            }
                        } else if (item.Parent__c === "SA09") {
                            if (cmvpOwner && cmvpPreScreenDecision === "Pass" && country !== "TH") {
                                selectedCommittees.push(item.DeveloperName)
                            }
                        } else {
                            selectedCommittees.push(item.DeveloperName)
                        }
                    }
                }
            })
        })

        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)

        if (!creditRating) {
            this.showToast("INFO-0001", "info")
        }
    },

    setCreditOwnerWhereCondition: function (trcrList) {
        const trcrIdList = trcrList.map((item) => {
            return `'${item.Id.trim()}'`;
        });
        if (trcrIdList.length > 0) {
            this.component.set("v.TRCROwnerWhereCondition", `AND Id IN (${trcrIdList.join(",")})`);
        }
    },

    alertTXRequiredCreditInsurance: function () {
        const obj = this.component.get("v.requestFormObj");
        const counterpartyType = this.getCounterpartyType();
        if (obj.FinCashOnDelivery__c === "Yes") {
            this.component.set("v.isShowRequiredMsg", false);
            return true;
        }

        if (counterpartyType === "Supplier") {
            if (
                !(obj.FinHavingCollateral__c === "Yes"
                    || obj.FinHavingCreditTermOrLetter__c === "Yes")
            ) {
                this.component.set("v.isShowRequiredMsg", true);
                return false;
            }
        } else {
            if (
                !(obj.FinHavingCollateral__c === "Yes"
                    || obj.FinBuyTradeDCLCondition__c === "Yes"
                    || obj.FinBuyTradeEndorsement__c === "Yes"
                    || obj.FinHavingOpenedCredit__c === "Yes")
            ) {
                this.component.set("v.isShowRequiredMsg", true);
                return false;
            }
        }
        this.component.set("v.isShowRequiredMsg", false);
        return true;
    },

    verifyTXCreditInsurance: function () {
        const obj = this.component.get("v.requestFormObj");
        const counterpartyType = this.getCounterpartyType();
        if (obj.FinCashOnDelivery__c === "Yes") {
            return true;
        }
        if (counterpartyType === "Supplier") {
            if (
                !(obj.FinHavingCollateral__c === "Yes"
                    || obj.FinHavingCreditTermOrLetter__c === "Yes")
            ) {
                this.showToast("Please select ‘Yes’ at least one.", "error");
                return false;
            }
        } else {
            if (
                !(obj.FinHavingCollateral__c === "Yes"
                    || obj.FinBuyTradeDCLCondition__c === "Yes"
                    || obj.FinBuyTradeEndorsement__c === "Yes"
                    || obj.FinHavingOpenedCredit__c === "Yes")
            ) {
                this.showToast("Please select ‘Yes’ at least one.", "error");
                return false;
            }
        }

        if (obj.FinHavingCollateral__c === "Yes" && obj.FinAmountBankGuarantee__c <= 0) {
            this.showToast("Amount need to be more than zero", "error");
            return false;
        }
        if (obj.FinHavingCreditTermOrLetter__c === "Yes" && obj.FinAmountCreditTerm__c <= 0) {
            this.showToast("Amount need to be more than zero", "error");
            return false;
        }
        if (obj.FinBuyTradeEndorsement__c === "Yes" && obj.FinAmountBuyTrade__c <= 0) {
            this.showToast("Amount need to be more than zero", "error");
            return false;
        }
        if (obj.FinBuyTradeDCLCondition__c === "Yes" && obj.FinAmountDCLCondition__c <= 0) {
            this.showToast("Amount need to be more than zero", "error");
            return false;
        }
        if (obj.FinHavingOpenedCredit__c === "Yes" && obj.FinAmountOpenedCredit__c <= 0) {
            this.showToast("Amount need to be more than zero", "error");
            return false;
        }

        return true;
    },

    showToast: function (message, toastType) {
        const toastTitle =
            (toastType === "success") ?
                "Success!"
                : (toastType === "error") ?
                    "Error!"
                    : (toastType === "warning") ?
                        "Warning!"
                        : "Information!";
        const toastParams = {
            title: toastTitle,
            type: toastType,
            message: this.messageTranslation(message),
            duaration: 12000,
        };
        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams(toastParams);
        toastEvent.fire();
    },

    messageTranslation: function (codeOrMessage) {
        const message = {
            "INFO-0001": "No credit rating and cannot default committees, please select committees manually",
        }

        if (message[codeOrMessage]) {
            return message[codeOrMessage];
        } else {
            return codeOrMessage;
        }
    },
})