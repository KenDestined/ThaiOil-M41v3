({
    enableEditMode: function () {
        this.component.set("v.isEdit", true);
        console.log("enableEditMode");
        console.log(this.component.get("v.isEdit"));
    },

    disableEditMode: function () {
        this.component.set("v.isEdit", false);
        console.log("disableEditMode");
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

    getRequestChangeCreditCondition: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        if (this.getBU() === "TX") {
            return committeeInfo.RequestToChangeCreditTX__c;
        } else {
            return committeeInfo.RequestToChangeCredit__c;
        }
    },

    getSubTypeCondition: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        return committeeInfo.SubTypeCondition__c;
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

    getCEOEmail: function () {
        const lstCEO = this.component.get("v.lstCEO");
        if ($A.util.isArray(lstCEO) && !$A.util.isEmpty(lstCEO)) {
            return lstCEO[0].Email;
        } else {
            return "";
        }
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
                "Customer": "TOP Change Customer Credit Condition",
                "Supplier": "TOP Change Supplier Credit Condition",
            },
            "TX": {
                "Customer": "TX Change Customer Credit Condition",
                "Supplier": "TX Change Customer Credit Condition",
            },
            "LABIX": {
                "Customer": "TOP Change Customer Credit Condition",
                "Supplier": "TOP Change Supplier Credit Condition",
            },
        };
        return buMapping[bu][counterpartyType] || "Committee TOP";
    },

    getFinalCreditRating: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        const requestChangeCreditCodition = this.getRequestChangeCreditCondition() || "";
        const requestChangeCreditCoditionLowerCase = requestChangeCreditCodition.toLowerCase();
        const subTypeCondition = this.getSubTypeCondition() || "";
        const subTypeConditionLowerCase = subTypeCondition.toLowerCase();

        if (requestChangeCreditCoditionLowerCase === "request to change credit condition") {
            if (subTypeConditionLowerCase === "change credit condition") {
                return committeeInfo.FinIntCrRating__c || committeeInfo.FinancialInformation__r.InternalCreditRating__c;
            } else {
                return committeeInfo.FinancialInformation__r.InternalCreditRating__c;
            }
        } else {
            return committeeInfo.FinancialInformation__r.InternalCreditRating__c;
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

    getSpecialGroupedCommittees: function () {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const committeeInfo = _THIS_.component.get("v.committeeInfo");
            const action = _THIS_.component.get("c.getChangeCreditCommittees");
            const params = {
                "rqChange": committeeInfo.RequestToChangeCredit__c,
                "subType1": committeeInfo.SubTypeCondition__c,
                "subType2": (committeeInfo.SubTypeCondition__c === "Expand Temporary Credit Line" || committeeInfo.SubTypeCondition__c === "Internal False") ? "" : committeeInfo.SubTypeCondition2__c,
                "salesOrg": _THIS_.getSubBU(),
                "type": _THIS_.isDomesticOrInternational(),
                "chgAmount": committeeInfo.ChangeCreditAmount__c,
            };

            action.setParams(params);
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    const specialGroupedCommittees = response.getReturnValue();
                    _THIS_.component.set("v.specialGroupedCommittees", specialGroupedCommittees);
                    resolve(specialGroupedCommittees)
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

    getCEO: function (salesOrg, counterpartyType, type, hasCrude, interByTX) {
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            const action = _THIS_.component.get("c.getCEO")
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
                    _THIS_.component.set("v.lstCEO", response.getReturnValue())
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
        return new Promise($A.getCallback(function (resolve, reject) {
            const bu = _THIS_.component.get("v.bu");
            const action = _THIS_.component.get("c.getCommitteeInfo");
            action.setParams({
                "recordId": _THIS_.component.get("v.recordId"),
                "templateType": _THIS_.getEmailTemplateType(bu)
            });
            action.setCallback(this, function (response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    const committeeInfo = response.getReturnValue();
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
            EmailAuthorization__c: committeeInfo.EmailAuthorization__c,
            CommitteeAttachment__c: committeeInfo.CommitteeAttachment__c,
            BuyTradeDCLCondition__c: committeeInfo.BuyTradeDCLCondition__c,
            BuyTradeEndorsement__c: committeeInfo.BuyTradeEndorsement__c,
            CashOnDelivery__c: committeeInfo.CashOnDelivery__c,
            CommitteeName__c: committeeInfo.CommitteeName__c,
            Currency__c: committeeInfo.Currency__c,
            TotalSecuredAmount__c: committeeInfo.TotalSecuredAmount__c,
            TotalSecuredCurrency__c: committeeInfo.TotalSecuredCurrency__c,
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
            FinIntCrRating__c: committeeInfo.FinIntCrRating__c,
            FinCrLimit__c: committeeInfo.FinCrLimit__c,
            FinCrCond__c: committeeInfo.FinCrCond__c,
            FinPaymentCond__c: committeeInfo.FinPaymentCond__c,
            FinOtherCondition__c: committeeInfo.FinOtherCondition__c,
            OtherCondition__c: committeeInfo.OtherCondition__c,
            EmailTo__c: committeeInfo.EmailTo__c,
            EmailCC__c: committeeInfo.EmailCC__c,
            EmailUrgent__c: committeeInfo.EmailUrgent__c,
            Subject__c: committeeInfo.Subject__c,
            Message__c: committeeInfo.Message__c,
            RequestToChangeCredit__c: committeeInfo.RequestToChangeCredit__c,
        })
        this.component.set("v.subBU", this.getSubBU());
        this.component.set("v.creditOwner", this.getCreditOwner());
        this.component.set("v.creditOwnerOld", this.getCreditOwner());
        this.component.set("v.counterpartyType", this.getCounterpartyType());
        this.component.set("v.interestedProduct", this.getInterestedProduct());
        this.component.set("v.hasCrudeProduct", this.hasCrudeProduct());
        this.component.set("v.committeeStatus", this.getCommitteeStatus());
        this.setEmailInfo(committeeInfo);
        this.calTotalSecuredAmount();
        this.toggleCommitteeSelection(committeeInfo.EmailAuthorization__c);
        console.log('Debug setCommitteeInfo',committeeInfo);
        this.toggleMailToCommittee(committeeInfo.EmailAuthorization__c);
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
        replacedMessage = replacedMessage.replace("{$ProductTX$}", this.getInterestedProduct());
        if (requestFormObj
            && requestFormObj.FinCrCond__c
        ) {
            replacedMessage = replacedMessage.replace("{$FinalCreditCondition$}", requestFormObj.FinCrCond__c);
        } else {
            replacedMessage = replacedMessage.replace("{$FinalCreditCondition$}", "");
        }
        if (requestFormObj
            && requestFormObj.TermOfPayment__c
        ) {
            if (this.getPaymentTerm(requestFormObj.TermOfPayment__c))
                replacedMessage = replacedMessage.replace("{$TermOfPayment$}", this.getPaymentTerm(requestFormObj.TermOfPayment__c).Name);
        } else {
            replacedMessage = replacedMessage.replace("{$TermOfPayment$}", "");
        }

        let bu = this.component.get('v.bu');
        if (bu == 'TOP' || bu == 'LABIX') {
            if (requestFormObj && requestFormObj.FinPaymentCond__c) {
                replacedMessage = replacedMessage.replace("{$FinalCondition$}", requestFormObj.FinPaymentCond__c);
            } else {
                replacedMessage = replacedMessage.replace("{$FinalCondition$}", "");
            }
        } else if (bu == 'TX') {
            if (requestFormObj && requestFormObj.FinOtherCondition__c) {
                replacedMessage = replacedMessage.replace("{$FinalCondition$}", requestFormObj.FinOtherCondition__c);
            } else {
                replacedMessage = replacedMessage.replace("{$FinalCondition$}", "");
            }
        }
        if (requestFormObj
            && requestFormObj.CashOnDelivery__c
        ) {
            replacedMessage = replacedMessage.replace("{$CashOnDelivery$}", requestFormObj.CashOnDelivery__c);
        } else {
            replacedMessage = replacedMessage.replace("{$CashOnDelivery$}", "");
        }
        if (requestFormObj
            && requestFormObj.HavingCollateral__c
        ) {
            replacedMessage = replacedMessage.replace("{$HavingCollateral$}", requestFormObj.HavingCollateral__c);
        } else {
            replacedMessage = replacedMessage.replace("{$HavingCollateral$}", "");
        }
        if (requestFormObj
            && requestFormObj.BuyTradeEndorsement__c
        ) {
            replacedMessage = replacedMessage.replace("{$BuyTradeEndorsement$}", requestFormObj.BuyTradeEndorsement__c);
        } else {
            replacedMessage = replacedMessage.replace("{$BuyTradeEndorsement$}", "");
        }
        if (requestFormObj
            && requestFormObj.TotalSecuredAmount__c
        ) {
            replacedMessage = replacedMessage.replace("{$TotalSecuredAmount$}", $A.localizationService.formatNumber(requestFormObj.TotalSecuredAmount__c));
        } else {
            replacedMessage = replacedMessage.replace("{$TotalSecuredAmount$}", "");
        }
        if (requestFormObj
            && requestFormObj.TotalSecuredCurrency__c
        ) {
            replacedMessage = replacedMessage.replace("{$CreditLimitCurrency$}", requestFormObj.TotalSecuredCurrency__c);
        } else {
            replacedMessage = replacedMessage.replace("{$CreditLimitCurrency$}", "");
        }
        if (requestFormObj
            && requestFormObj.FinRiskCategory__c
        ) {
            replacedMessage = replacedMessage.replace("{$FinRiskCategory$}", requestFormObj.FinRiskCategory__c);
        } else {
            replacedMessage = replacedMessage.replace("{$FinRiskCategory$}", "");
        }
        if (requestFormObj
            && requestFormObj.FinCrLimit__c
        ) {
            replacedMessage = replacedMessage.replace("{$FinalCreditLimit$}", $A.localizationService.formatNumber(requestFormObj.FinCrLimit__c));
        } else {
            replacedMessage = replacedMessage.replace("{$FinalCreditLimit$}", "");
        }
        if (requestFormObj
            && requestFormObj.FinIntCrRating__c
        ) {
            replacedMessage = replacedMessage.replace("{$FinalInternalCreditRating$}", requestFormObj.FinIntCrRating__c);
        } else {
            replacedMessage = replacedMessage.replace("{$FinalInternalCreditRating$}", "");
        }
        if (requestFormObj
            && requestFormObj.RequestToChangeCredit__c
        ) {
            replacedMessage = replacedMessage.replace("{$RequesttoChangeCredit$}", requestFormObj.RequestToChangeCredit__c);
        } else {
            replacedMessage = replacedMessage.replace("{$RequesttoChangeCredit$}", "");
        }

        this.component.set("v.previewEMailInfo", {
            EmailTo__c: emailTo,
            EmailCC__c: emailCC,
            Subject__c: subject,
            Message__c: replacedMessage,
        });

        let cmpCTRFileUpload = this.component.find("CTRFileUpload");
        if (!$A.util.isEmpty(cmpCTRFileUpload)) {
            if ($A.util.isArray(cmpCTRFileUpload)) {
                cmpCTRFileUpload = cmpCTRFileUpload[0];
            }
            this.component.set("v.previewEmailAttachments", cmpCTRFileUpload.getMergedAttachments());
        }
    },

    calTotalSecuredAmount: function () {
        const requestFormObj = this.component.get("v.requestFormObj");
        const amount1 = Number(requestFormObj.FinAmountBankGuarantee__c);
        const amount2 = Number(requestFormObj.FinAmountBuyTrade__c);
        const amount3 = Number(requestFormObj.FinAmountDCLCondition__c);
        // const amount4 = Number(requestFormObj.FinAmountOpenedCredit__c);
        const amount4 = 0;
        const amount5 = Number(requestFormObj.FinAmountCreditTerm__c);

        const totalAmount = (amount1 + amount2 + amount3 + amount4 + amount5).toFixed(2).split(".");
        const formattedTotalAmount = totalAmount[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + (totalAmount[1] ? "." + totalAmount[1] : "")
        this.component.set("v.totalAmount", formattedTotalAmount);
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

    saveRequestFormSH: function () {
        const message = "The request form has been saved!";
        return this.saveRequestFormServerAction("c.saveReqFormItemSH", message, false);
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

    submitToCommittees: function () {
        return this.saveRequestFormServerAction("c.saveReqFormItemAndSubmitToCommittees", "The request has been submitted", true);
    },

    submitToCEO: function () {
        return this.saveRequestFormServerAction("c.saveReqFormItemAndSubmitToCEO", "The request has been submitted", true);
    },

    submitNoApproval: function () {
        return this.saveRequestFormServerAction("c.saveReqFormItemAndSubmitNoApproval", "The request has been submitted", true);
    },

    saveRequestFormServerAction: function (actionName, successMessage, isSubmit) {
        console.log('Debug save request actionname',actionName)
        const _THIS_ = this;
        return new Promise($A.getCallback(function (resolve, reject) {
            _THIS_.setEmailRequestForm();

            const uploadList = _THIS_.component.get("v.requestFormObj.CommitteeAttachment__c");
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
                "selectedCreditOwner": _THIS_.component.get('v.creditOwner'),
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

    setEmailAuthorizationTX: function () {
        const bu = this.getBU();
        if (bu === "TX") {
            this.component.set("v.requestFormObj.EmailAuthorization__c", "committee required");
            let cmp = this.component.find("EmailAuthorization");
            if (!$A.util.isEmpty(cmp)) {
                if ($A.util.isArray(cmp)) {
                    cmp = cmp[0];
                }
                cmp.set("v.value", "Committee Required")
            }
        }
    },

    setDefaultFinalCreditCondition: function () {
        const committeeInfo = this.component.get("v.committeeInfo");
        const requestChangeCreditCodition = this.getRequestChangeCreditCondition() || "";
        const requestChangeCreditCoditionLowerCase = requestChangeCreditCodition.toLowerCase();
        const subTypeCondition = this.getSubTypeCondition() || "";
        const subTypeConditionLowerCase = subTypeCondition.toLowerCase();

        if (requestChangeCreditCoditionLowerCase === "request to change credit condition") {
            if (subTypeConditionLowerCase === "change credit condition") {
                this.component.set('v.requestFormObj.FinIntCrRating__c', committeeInfo.FinIntCrRating__c);
                this.component.set('v.requestFormObj.FinCrLimit__c', committeeInfo.FinCrLimit__c);
                this.component.set('v.requestFormObj.FinCrCond__c', committeeInfo.FinCrCond__c);
            } else if (subTypeConditionLowerCase === "expand credit line") {
                this.component.set('v.requestFormObj.FinIntCrRating__c', committeeInfo.FinancialInformation__r.InternalCreditRating__c);
                this.component.set('v.requestFormObj.FinCrLimit__c', committeeInfo.FinCrLimit__c);
                this.component.set('v.requestFormObj.FinCrCond__c', committeeInfo.FinancialInformation__r.Credit_Condition__c);
            }
        } else {
            this.component.set('v.requestFormObj.FinIntCrRating__c', committeeInfo.FinancialInformation__r.InternalCreditRating__c);
            this.component.set('v.requestFormObj.FinCrLimit__c', committeeInfo.FinancialInformation__r.CreditLimit__c);
            this.component.set('v.requestFormObj.FinCrCond__c', committeeInfo.FinancialInformation__r.Credit_Condition__c);
        }
    },

    setFinalCreditConditionVisibility: function (creditCondition) {
        const bu = this.getBU();

        if (!(bu === "TX")) {
            if (creditCondition == "Open Account") {
                this.component.set("v.isCreditLimitDisable", true);
                this.component.set("v.isTradeCreditDisable", false);
            } else if (
                creditCondition == "Open Account With Collateral"
                || creditCondition == "L/C"
                || creditCondition == "Domestic L/C"
            ) {
                this.component.set("v.isTradeCreditDisable", true);
                this.component.set("v.isCreditLimitDisable", true);
            } else if (
                creditCondition == "Cash in Advance"
                || creditCondition == "Others"
            ) {
                this.component.set("v.isTradeCreditDisable", false);
                this.component.set("v.isCreditLimitDisable", false);
            } else {
                this.component.set("v.isTradeCreditDisable", false);
                this.component.set("v.isCreditLimitDisable", false);
            }
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

    resetCommittee: function (emailAuthorization) {
        const bu = this.getBU();
        const subBU = this.getSubBU();
        const lstCompany = [subBU];
        const groupedCommittees = this.component.get("v.groupedCommittees");
        const lstCommittee = this.convertGroupedCommitteesToList(groupedCommittees);
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            item.checked = false;
            return String(item.BU__c).includes(bu)
        })
        const lstFilteredCommitteesInCompany = lstFilteredCommittees.filter((item) => {
            return lstCompany.some((company) => {
                const fieldName = company + "__c"
                return !!(item[fieldName])
            })
        })

        if (emailAuthorization === "ceo required") {
            const selectedCommittees = [];
            lstFilteredCommitteesInCompany.forEach((item) => {
                selectedCommittees.push(item.DeveloperName)
            });
            this.component.set("v.selectedCommittees", selectedCommittees);
        } else {
            this.component.set("v.selectedCommittees", []);
        }
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany);
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

    convertChangeCreditCommitteesToList: function (changeCommittees) {
        changeCommittees.forEach(function (item) {
            const position = item.Position__c || "";
            item.Parent__c = position ;
            if (position.includes("TRCR")) {
                item.Parent__c = "TRCR" ;
            } else if (position.includes("CMDP")) {
                item.Parent__c = "CMDP" ;
            } else if (position.includes("TXIP")) {
                item.Parent__c = "TXIP" ;
            }
            item.Label = item.DeveloperName;
        });
        return changeCommittees;
    },

    defaultFinalCreditCondition: function () {
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

            !FinCrCond__c && this.component.find("TXFinCrCond").set("v.value", Credit_Condition__c)
            !TermOfPayment__c && this.component.find("TXTermOfPayment").set("v.value", PaymentTerm__c)
            !FinRiskCategory__c && this.component.find("TXFinRiskCategory").set("v.value", RiskCategory__c)
            !FinCrLimit__c && this.component.find("TXFinCrLimit").set("v.value", CreditLimit__c)
            !FinCrLimitCur__c && this.component.find("TXFinCrLimitCur").set("v.value", CreditLimitCurrency__c)
            !FinIntCrRating__c && this.component.find("TXFinIntCrRating").set("v.value", InternalCreditRating__c)
            !FinOtherCondition__c && this.component.find("TXFinOtherCondition").set("v.value", OtherCondition__c)
            !FinCashOnDelivery__c && this.component.find("TXFinCashOnDelivery").set("v.value", CashOnDelivery__c)

            if (this.component.find("TXFinCashOnDelivery").get("v.value") == "No") {
                if (!FinHavingCollateral__c) {
                    this.component.find("TXFinHavingCollateral").set("v.value", HavingCollateral__c)
                    this.component.find("TXFinAmountBankGuarantee").set("v.value", AmountBankGuarantee__c)
                }
                if (!FinHavingCreditTermOrLetter__c) {
                    this.component.find("TXFinHavingCreditTermOrLetter").set("v.value", HavingCreditTermOrLetter__c)
                    this.component.find("TXFinAmountCreditTerm").set("v.value", AmountCreditTerm__c)
                }
                if (!FinBuyTradeEndorsement__c) {
                    this.component.find("TXFinBuyTradeEndorsement").set("v.value", BuyTradeEndorsement__c)
                    this.component.find("TXFinAmountBuyTrade").set("v.value", AmountBuyTrade__c)
                }
                if (!FinBuyTradeDCLCondition__c) {
                    this.component.find("TXFinBuyTradeDCLCondition").set("v.value", BuyTradeDCLCondition__c)
                    this.component.find("TXFinAmountDCLCondition").set("v.value", AmountDCLCondition__c)
                }
                if (!FinHavingOpenedCredit__c) {
                    this.component.find("TXFinHavingOpenedCredit").set("v.value", HavingOpenedCredit__c)
                    this.component.find("TXFinAmountOpenedCredit").set("v.value", AmountOpenedCredit__c)
                }
                !FinTotalSecuredCurrency__c && this.component.find("FinTotalSecuredCurrency").set("v.value", FinCrLimitCur__c) //
            }

            this.calTotalSecuredAmount(component);
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
                // this.setFinalCreditConditionVisibility(Credit_Condition__c)
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
                    // this.setFinalCreditConditionVisibility(Credit_Condition__c)
                } else if (ExemptionResult__c) {
                    !FinCrCond__c && this.component.find("FinCrCond").set("v.value", ApprovalTrader_CreditCondition__c)
                    !FinCrLimit__c && this.component.find("FinCrLimit").set("v.value", ApprovalTrader_CreditLimit__c)
                    !FinCrLimitCur__c && this.component.find("FinCrLimitCur").set("v.value", ApprovalTrader_CreditLimitCurrency__c)
                    !FinTradeCrIns__c && this.component.find("FinTradeCrIns").set("v.value", ApprovalTrader_TradeCreditInsurance__c)
                    !FinTradeCrInsCu__c && this.component.find("FinTradeCrInsCu").set("v.value", ApprovalTrader_TradeCreditCurrency__c)
                    !TermOfPayment__c && this.component.find("TermOfPayment").set("v.value", ApprovalTrader_PaymentTerm__c)
                    !FinPaymentCond__c && this.component.find("FinPaymentCond").set("v.value", ApprovalTrader_PaymentCondition__c)
                    !FinIntCrRating__c && this.component.find("FinIntCrRating").set("v.value", ApprovalTrader_CreditRating__c)
                    // this.setFinalCreditConditionVisibility(ApprovalTrader_CreditCondition__c)
                } else {
                    !FinCrCond__c && this.component.find("FinCrCond").set("v.value", Credit_Condition__c)
                    !FinCrLimit__c && this.component.find("FinCrLimit").set("v.value", CreditLimit__c)
                    !FinCrLimitCur__c && this.component.find("FinCrLimitCur").set("v.value", CreditLimitCurrency__c)
                    !FinTradeCrIns__c && this.component.find("FinTradeCrIns").set("v.value", Trade_Credit_Insurance__c)
                    !FinTradeCrInsCu__c && this.component.find("FinTradeCrInsCu").set("v.value", TradeCreditInsuranceCurrency__c)
                    !TermOfPayment__c && this.component.find("TermOfPayment").set("v.value", PaymentTerm__c)
                    !FinPaymentCond__c && this.component.find("FinPaymentCond").set("v.value", PaymentCondition__c)
                    !FinIntCrRating__c && this.component.find("FinIntCrRating").set("v.value", InternalCreditRating__c)
                    // this.setFinalCreditConditionVisibility(Credit_Condition__c)
                }
            }
        } catch (ex) {
            console.log("Debug ex", ex)
        }
    },

    defaultChangeCreditCommittee: function (lstCommittee, lstCompany, committeeInfo) {
        const selectedCommittees = [];
        const emailAuthorization = lstCommittee[0].EmailAuthorization__c;

        lstCommittee.forEach((item) => {
            if (item.IsDefault__c) {
                selectedCommittees.push(item.DeveloperName);
            }
        })

        let cmpEmailAuthorization = this.component.find("EmailAuthorization");
        console.log('Debug defaultChangeCreditCommittee ',cmpEmailAuthorization)
        if (!$A.util.isEmpty(cmpEmailAuthorization)) {
            if ($A.util.isArray(cmpEmailAuthorization)) {
                cmpEmailAuthorization = cmpEmailAuthorization[0];
            }
            console.log('EmailAuthorization is blank default EmailAuthorization = ',emailAuthorization)
            cmpEmailAuthorization.set('v.value', emailAuthorization);
            this.toggleMailToCommittee(emailAuthorization);
        }

        this.component.set("v.selectedCommittees", selectedCommittees);
        this.component.set("v.lstCommittees", lstCommittee);
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
        const requestChangeCreditCodition = (this.getRequestChangeCreditCondition() || "").toLowerCase();
        console.log('Debug defaultTOPCommitteeCustomer',requestChangeCreditCodition, lstCommittee,lstCompany,creditRating,country,buProfile)
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

        var forceDefaultCommittee = [];
        if(requestChangeCreditCodition.includes('block')) {
            forceDefaultCommittee = ['EVPF','EVPC'];
        }
        console.log('Debug filtered committees',lstFilteredCommittees,lstFilteredCommitteesInCompany)
        // Set Default Committees
        lstCompany.forEach((company) => {
            const fieldName = company + "__c"
            lstFilteredCommitteesInCompany.forEach((item) => {
                if (item[fieldName]) {
                    const rating = item[fieldName].split(",")
                    if (rating.indexOf(creditRating) > -1) {
                        if('checked' in item) {
                            item.checked = false;
                        }

                        if(forceDefaultCommittee.length > 0) {
                            console.log('Debug forceDefaultCommittee',item.Parent__c,forceDefaultCommittee.includes(item.Parent__c))
                            if(forceDefaultCommittee.includes(item.Parent__c)) {
                                selectedCommittees.push(item.DeveloperName);
                            }
                        } else {
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
                }
            })
        })
        console.log('Debug selected committee #before',selectedCommittees)
        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)
        
        console.log('Debug selectedCommittees #after',this.component.get('v.selectedCommittees'))
        
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

    loadChangeCreditCommittee: function (lstCommittee, lstCompany, committeeInfo) {
        const selectedCommittees = !$A.util.isEmpty(committeeInfo.CommitteeName__c)
            ? committeeInfo.CommitteeName__c.split(",")
            : [];

        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstCommittee)
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
        const bu = this.getBU()
        const creditRating = this.getFinalCreditRating();
        const selectedCommittees = !$A.util.isEmpty(committeeInfo.CommitteeName__c)
            ? committeeInfo.CommitteeName__c.split(",")
            : [];
        const includedCommittees = [];

        // Filter for Business Unit TOP/TX
        const lstFilteredCommittees = lstCommittee.filter((item) => {
            return String(item.BU__c).includes(bu)
        })

        // Set Required Committees
        lstCompany.forEach((company) => {
            const fieldName = company + "__c"
            lstFilteredCommittees.forEach((item) => {
                if (item[fieldName]) {
                    const rating = item[fieldName].split(",")
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

        if (String(committeeInfo.EmailAuthorization__c).toLowerCase() === "committee required") {
            this.component.set("v.includedCommittees", includedCommittees)
        }
        this.component.set("v.selectedCommittees", selectedCommittees)
        this.component.set("v.lstCommittees", lstFilteredCommitteesInCompany)
    },

    loadTXCommitteeSupplier: function (lstCommittee, lstCompany, committeeInfo) {
        const bu = this.getBU()
        const selectedCommittees = !$A.util.isEmpty(committeeInfo.CommitteeName__c)
            ? committeeInfo.CommitteeName__c.split(",")
            : [];

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
        const selectedCommittees = !$A.util.isEmpty(committeeInfo.CommitteeName__c)
            ? committeeInfo.CommitteeName__c.split(",")
            : [];

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
        const selectedCommittees = !$A.util.isEmpty(committeeInfo.CommitteeName__c)
            ? committeeInfo.CommitteeName__c.split(",")
            : []

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

    toggleCommitteeSelection: function (emailAuthorization) {
        const emailAuthorizationLowerCase = emailAuthorization ? emailAuthorization.toLowerCase() : "";

        if (emailAuthorizationLowerCase === "ceo required") {
            this.component.set("v.enableCommitteeSelection", true);
        } else if (emailAuthorizationLowerCase === "committee required") {
            this.component.set("v.enableCommitteeSelection", true);
        } else {
            this.component.set("v.enableCommitteeSelection", false);
        }
    },

    toggleMailToCommittee: function (emailAuthorization) {
        const emailAuthorizationLowerCase = emailAuthorization ? emailAuthorization.toLowerCase() : "";
        console.log('Debug toggleMailToCommittee',emailAuthorizationLowerCase)
        if (emailAuthorizationLowerCase === "ceo required") {
            this.component.set("v.enableMailToCommittee", true);
        } else if (emailAuthorizationLowerCase === "committee required") {
            this.component.set("v.enableMailToCommittee", true);
        } else {
            this.component.set("v.enableMailToCommittee", false);
        }
    },

    alertTXRequiredCreditInsurance: function () {
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