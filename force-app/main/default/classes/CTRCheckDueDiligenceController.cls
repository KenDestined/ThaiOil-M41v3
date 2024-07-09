/**
 * Description: Logic to fetch Due Diligence details for CTRCheckDueDiligence
 */
public without sharing class CTRCheckDueDiligenceController {
    private static final String CLASSNAME = CTRCheckDueDiligenceController.class.getName();
    private static final String CTRDUEDILIGENCEDECISION = 'CTRDueDiligenceDecision';
    private static final String CTRDUEDILIGENCERISKLEVEL = 'CTRDueDiligenceRiskLevel';
    private static final String CTRDUEDILIGENCERISKLEVELCSS = 'CTRDueDiligenceRiskLevelCSS';
    private static final String CTRDUEDILIGENCERESULTACTOR = 'CTRDueDiligenceResultActor';
    private static final List<String> riskLevelDeveloperNames = new List<String> {CTRDUEDILIGENCEDECISION, CTRDUEDILIGENCERISKLEVELCSS}; // custom metadata
    private static final String userLanguageTH = 'TH';
    private static final String FOUND = 'Found';
    private static final String NOTFOUND = 'Not Found';
    private static final String NOTAVAILABLE = 'Not Available';
    private static final String YES = 'Yes';
    private static final String NO = 'No';
    private static final String SPACE = ' ';
    private static final String LOWRISK = 'Low Risk';
    private static final String MEDIUMRISK = 'Medium Risk';
    private static final String HIGHRISK = 'High Risk';
    private static final String HIGHHIGHRISK = 'Very High Risk';
    private static final List<String> sortRiskValues = new List<String> {HIGHHIGHRISK, HIGHRISK, MEDIUMRISK, LOWRISK};
    // public static List<CTR_RiskCountry__c> riskCountryList = new List<CTR_RiskCountry__c>();
    public static CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c();
    public static Map<String, List<CTR_RiskCountry__c>> riskLevelMap = new Map<String, List<CTR_RiskCountry__c>>();
    public static Map<String, List<CTRCDDSanction__c>> cddSanctionMap = new Map<String, List<CTRCDDSanction__c>>();
    // public static Map<String, List<CTRCDDNACCTransaction__c>> cddNaccTransactionMap = new Map<String, List<CTRCDDNACCTransaction__c>>();
    public static List<CTRNews__c> newsList = new List<CTRNews__c>();
    public static List<CTRCDDNACCTransaction__c> cddNaccTransactionList = new List<CTRCDDNACCTransaction__c>();
    public static List<CTRRequestFormHeader__c> reqHeaderList = new List<CTRRequestFormHeader__c>();
    public static List<String> destinationCountryList = new List<String>();
    private static String accountName;
    private static String reqHeaderName;
    private static Set<String> reportNameSet;
    private static final String DUEDILIGENCE = 'DueDiligence';
    private static final String CHECKDUEDILIGENCE = 'CheckDueDiligence';
    private static final String CRUDE = 'Crude';
    private static final String RISKLEVELBYSYSTEMFIELD = 'RiskLevelbySystem__c';
    private static final String FINALRISKLEVELFIELD = 'FinalRiskLevel__c';
    private static final String STATUSFIELD = 'Status__c';
    private static final String APPROVALSTEPFIELD = 'Approval_Step__c';
    private static final String INREVIEWSTATUS = 'In Review';
    private static final String REJECTEDSTATUS = 'Rejected';
    private static final String APPROVEDSTATUS = 'Approved';
    private static final String CREDITRATINGSTEP = 'Credit Rating';
    private static final String INFORMCOUNTERPARTY = 'Inform Counterparty';
    private static final String SELECTCOMMITTEE = 'Select Committee';
    private static final String CUSTOMER = 'Customer';
    private static final String SUPPLIER = 'Supplier';

    @AuraEnabled
    public static Map<String, Object> retrieveRiskLevel(String recordId) {
        Map<String, Object> result = new Map<String, Object>();
        List<Map<String, Object>> items = new List<Map<String, Object>>();
        Boolean displayReviewOnCheckDue = false;
        String dueDiligenceReviewSection = '';
        try {
            CTRBuProfile__mdt buProfile = retrieveBusinessUnitFromProfile(recordId);
            List<CTRRequestFormItem__c> reqItems = retrieveRequestItem(recordId);
            System.debug('reqItems -----' + reqItems);
            if(!reqItems.isEmpty()) {
                CTRRequestFormItem__c reqItem = reqItems[0];
                Map<String, Object> recordTypeConfigMap = retrieveDueDiligenceDecision(reqItem.RecordType.DeveloperName); // retrieve recordtype decision from custom metadata
                String riskLevelConfigName = CTRDUEDILIGENCERISKLEVEL;
                if(recordTypeConfigMap != null && !recordTypeConfigMap.isEmpty() && recordTypeConfigMap.get('riskLevel') != null && !String.isBlank(String.valueOf(recordTypeConfigMap.get('riskLevel')))) {
                    riskLevelConfigName = (String) recordTypeConfigMap.get('riskLevel');
                    displayReviewOnCheckDue = (Boolean) recordTypeConfigMap.get('displayReviewOnCheckDue');
                    if(displayReviewOnCheckDue) {
                        dueDiligenceReviewSection = retrieveDueDiligenceReviewSection(recordId);

                        result.put('displayReviewOnCheckDue', displayReviewOnCheckDue);
                        if(!String.isBlank(dueDiligenceReviewSection)) {
                            Map<String, Object> reviewSectionMap = (Map<String, Object>) JSON.deserializeUntyped(dueDiligenceReviewSection);
                            Map<String, Object> sectionMap = (Map<String, Object>) reviewSectionMap.get('sectionMap');
                            for(String section : sectionMap.keySet()) {
                                if(getTypeOfObject(sectionMap.get(section)) == 'Object') {
                                    Map<String, Object> detailMap = (Map<String, Object>) sectionMap.get(section);
                                    System.debug('detailMap -----' + detailMap);
                                    Boolean isValid = validateActor(recordId, (String) detailMap.get('actorStep'), UserInfo.getUserId(), CHECKDUEDILIGENCE, buProfile, reqItems);
                                    // detailMap.put('hasPermission', isValid); // for testing
                                    detailMap.put('hasPermission', true);
                                    break; // check first section only
                                }
                            }
                            
                            result.put('dueDiligenceReviewSection', JSON.serialize(reviewSectionMap)); 
                        }
                    }
                }
                System.debug('riskLevelConfigName -----' + riskLevelConfigName);
                Map<String, CTRGeneralSetting__mdt> riskLevelConfigMap = getGeneralSetting(new List<String> {riskLevelConfigName, CTRDUEDILIGENCERISKLEVELCSS}); // retrieve label & button css from custom metadata
                List<String> riskLevels = riskLevelConfigMap?.get(riskLevelConfigName)?.Value__c?.split(';'); // fields to display
                String riskLevelLabel = riskLevelConfigMap?.get(riskLevelConfigName)?.LongValue__c; // field's label
                Map<String, Object> riskLevelLabelMap = (!String.isBlank(riskLevelLabel) ? (Map<String, Object>) JSON.deserializeUntyped(riskLevelLabel) : null);
                String riskLevelCss = riskLevelConfigMap?.get(CTRDUEDILIGENCERISKLEVELCSS)?.LongValue__c; // button css
                System.debug('riskLevelCss -----' + riskLevelCss);
                if(riskLevels != null && !String.isBlank(riskLevelCss)) {
                    // retrieve value form CTRRequestFormItem__c
                    // String query = 'SELECT Id, ' + String.join(riskLevels, ', ') + ' FROM CTRRequestFormItem__c WHERE Id =: recordId LIMIT 1';
                    // System.debug('query -----' + query);
                    // List<CTRRequestFormItem__c> reqItems = Database.query(query);
                    Map<String, Schema.SObjectField> fieldMap = Schema.CTRRequestFormItem__c.SObjectType.getDescribe().fields.getMap();
                    Map<String, Object> riskLevelCssMap = (Map<String, Object>) JSON.deserializeUntyped(riskLevelCss);
                    System.debug(CLASSNAME + '.retrieveRiskLevel riskLevelCssMap -----' + riskLevelCssMap);
                    for(String field : riskLevels) {
                        List<Object> options = (List<Object>) JSON.deserializeUntyped(JSON.serialize(CTRInitialCustomerTOP.getPicklistValue(field, 'CTRRequestFormItem__c')));
                        if(options != null && !options.isEmpty()) {
                            for(Object option : options) {
                                Map<String, Object> optionMap = (Map<String, Object>) option;
                                String value = (String) optionMap.get('value');
                                if(riskLevelCssMap.containsKey(value) && riskLevelCssMap.get(value) != null) {
                                    optionMap.putAll((Map<String, Object>) riskLevelCssMap.get(value));
                                    optionMap.put('isSelected', (!String.isBlank(String.valueOf(reqItem.get(field))) && reqItem.get(field) == value ? true : false));
                                    System.debug('option -----' + optionMap);
                                }
                            }
                        }
                        String fieldLabel = fieldMap.get(field).getDescribe().getLabel();
                        Boolean disabled = false;
                        String actorStep = '';
                        if(buProfile != null && !String.isBlank(buProfile.BusinessUnit__c) && riskLevelLabelMap != null && !riskLevelLabelMap.isEmpty() && riskLevelLabelMap.containsKey(buProfile.BusinessUnit__c)) {
                            System.debug(CLASSNAME + '.retrieveRiskLevel bu -----' + buProfile.BusinessUnit__c);
                            Map<String, Object> fieldConfigMap = (Map<String, Object>) riskLevelLabelMap.get(buProfile.BusinessUnit__c);
                            if(fieldConfigMap != null && !fieldConfigMap.isEmpty() && fieldConfigMap.containsKey(field)) {
                                Map<String, Object> labelMap = (Map<String, Object>) fieldConfigMap.get(field);
                                System.debug(CLASSNAME+'.labelMap ---- '+labelMap);
                                if(labelMap.containsKey('label')) { fieldLabel = (String) labelMap.get('label'); }
                                if(labelMap.containsKey('disabled')) { disabled = (Boolean) labelMap.get('disabled'); }
                                if(labelMap.containsKey('actorStep')) {
                                    actorStep = (String) labelMap.get('actorStep');
                                    System.debug(CLASSNAME + '.actorStep ---- ' +actorStep);
                                    Boolean isValid = validateActor(recordId, actorStep, UserInfo.getUserId(), CHECKDUEDILIGENCE, buProfile, reqItems);
                                    System.debug(CLASSNAME + '.retrieveRiskLevel isValid -----' + isValid);
                                    disabled = !isValid;
                                } else { disabled = true; }
                            }
                        }
                        items.add(new Map<String, Object> {
                            'fieldName' => field,
                            'fieldLabel' => fieldLabel,
                            'options' => options,
                            'disabled' => disabled,
                            'additionalInfo' => (field == RISKLEVELBYSYSTEMFIELD && String.isBlank(String.valueOf(reqItems[0].get(field))) ? '(' + NOTAVAILABLE + ')' : ''),
                            'actorStep' => actorStep
                        });
                    }
                }
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        System.debug(CLASSNAME + '.retrieveRiskLevel items -----' + items);
        result.put('riskLevelList', items);
        return result;
    }

    private static Map<String, Object> retrieveDueDiligenceDecision(String recordType) {
        Map<String, CTRGeneralSetting__mdt> configMap = getGeneralSetting(new List<String> {CTRDUEDILIGENCEDECISION}); // retrieve recordtype decision from custom metadata
        String decisionConfig = configMap?.get(CTRDUEDILIGENCEDECISION)?.LongValue__c;
        Map<String, Object> decisionConfigMap = (!String.isBlank(decisionConfig) ? (Map<String, Object>) JSON.deserializeUntyped(decisionConfig) : null);
        System.debug('decisionConfigMap -----' + decisionConfigMap);
        if(decisionConfigMap != null && !decisionConfigMap.isEmpty() && decisionConfigMap.containsKey(recordType)) {
            return (Map<String, Object>) decisionConfigMap.get(recordType);
        } else {
            return null;
        }
    }

    private static String getTypeOfObject(Object o) {
        if(o == null) return '';
        String result = 'Object';
        if(o instanceof Boolean) { result = 'Boolean'; }
        else if(o instanceof String) { result = 'Boolean'; }
        else if(o instanceof List<Object>) { result = 'List'; }
        return result;
    }

    @AuraEnabled
    public static String retrieveDueDiligenceResult(String recordId, Boolean displayRiskBySystem) {
        Map<String, Object> result = new Map<String, Object>();
        List<Object> resultList = new List<Object>();
        Map<String, String> riskLevelBySystemMap = new Map<String, String>();
        try {
            if(!String.isBlank(recordId)) {
                reqItem = retrieveRequestItem(recordId)[0];

                Map<String, CTRGeneralSetting__mdt> configMap = getGeneralSetting(new List<String> {CTRDUEDILIGENCERESULTACTOR}); // retrieve actor label from custom metadata
                String actorConfig = configMap?.get(CTRDUEDILIGENCERESULTACTOR)?.LongValue__c;
                Map<String, Object> actorConfigMap = (!String.isBlank(actorConfig) ? (Map<String, Object>) JSON.deserializeUntyped(actorConfig) : null);

                CTRBuProfile__mdt buProfile = retrieveBusinessUnitFromProfile(recordId);
                String userLanguage = userLanguageTH;
                if(buProfile != null) {
                    userLanguage = buProfile.Language__c;
                }
                List<CTRDueDiligenceTemplate__c> templateList = [SELECT Id, Name, BusinessUnit__c, RecordTypes__c, Level__c, RiskLevel__c, Position__c, HidePosition__c, Parent__c, Parent__r.Name, ValueTH__c, ValueEN__c, LinkToNEWS__c, AnswerCode__c, 
                                                                 ReportDeveloperName__c, ReportLink__c, Actor__c FROM CTRDueDiligenceTemplate__c WHERE Active__C = TRUE AND BusinessUnit__c INCLUDES (:buProfile.BusinessUnit__c) AND RecordTypes__c INCLUDES (:reqItem.RecordType.DeveloperName) ORDER BY Parent__c, Level__c, Position__c];
                Map<String, List<Object>> templateMap = new Map<String, List<Object>>();
                Map<Integer, String> levelResultMap = new Map<Integer, String>();
                Boolean isNotAvailable = false;
                if(!templateList.isEmpty()) {
                    fetchDueDiligenceAnswer(reqItem);
                    // retrieve report
                    Set<String> reportNames = new Set<String>();
                    for(CTRDueDiligenceTemplate__c template : templateList) {
                        if(!String.isBlank(template.ReportDeveloperName__c)) { reportNames.add(template.ReportDeveloperName__c); }
                    }
                    Map<String, String> reportMap = new Map<String, String>();
                    if(!reportNames.isEmpty()) {
                        List<Report> reportList = [SELECT Id, FolderName, Name, Description, DeveloperName FROM Report WHERE DeveloperName =: reportNames];
                        if(!reportList.isEmpty()) {
                            for(Report eachReport : reportList) {
                                reportMap.put(eachReport.DeveloperName, eachReport.Id);
                            }
                        }
                    }

                    for(CTRDueDiligenceTemplate__c template : templateList) {
                        System.debug(CLASSNAME + '.retrieveDueDiligenceResult Level__c/RiskLevel__c -----Level__c:' + + template.Level__c + '/RiskLevel__c:' + template.RiskLevel__c + '/Actor__c:' + template.Actor__c);
                        Set<String> levelResults = new Set<String>();
                        if(template.Level__c != null) {
                            List<Object> levelList = new List<Object>();
                            if(templateMap != null && !templateMap.isEmpty() && templateMap.containsKey(template.RiskLevel__c)) {
                                levelList.addAll((List<Object>) templateMap.get(template.RiskLevel__c));
                            }
                            System.debug('levelList -----' + levelList);
                            List<Object> actorList = new List<Object>();
                            if(!String.isBlank(template.Actor__c)) {
                                for(Object actor : levelList) {
                                    Map<String, Object> actorMap = (Map<String, Object>) actor;
                                    if(actorMap.get('actor') == template.Actor__c) {
                                        actorList = (List<Object>) actorMap.get('actorList');
                                        break;
                                    }
                                }
                            }

                            if(!String.isBlank(template.Parent__c)) {
                                for(Object parent : actorList) {
                                    Map<String, Object> parentMap = (Map<String, Object>) parent;
                                    if(parentMap.get('name') == template.Parent__r.Name) {
                                        List<Object> childList = new List<Object>();
                                        if(parentMap.containsKey('childList')) {
                                            childList.addAll((List<Object>) parentMap.get('childList'));
                                        }
                                        Map<String, Object> childMap = new Map<String, Object>();
                                        childMap.put('name', template.Name);
                                        childMap.put('position', (parentMap.get('position') != null ? parentMap.get('position') + '.' : '') + template.Position__c);
                                        childMap.put('detail', (userLanguage == userLanguageTH ? template.ValueTH__c : template.ValueEN__c));
                                        String value = getDueDiligenceAnswer(!String.isBlank(template.AnswerCode__c) ? template.AnswerCode__c : '');
                                        if(value == NOTAVAILABLE && !isNotAvailable) { isNotAvailable = true; }
                                        childMap.put('value', value);
                                        levelResults.add(!String.isBlank(value) ? value : NOTFOUND); // assign value
                                        if(value == FOUND && reportMap != null && !reportMap.isEmpty() && reportMap.containsKey(template.ReportDeveloperName__c) && !String.isBlank(template.ReportLink__c)) {
                                            childMap.put('reportLink', constructReportLink(reportMap.get(template.ReportDeveloperName__c), template.ReportLink__c));
                                        }
                                        childMap.put('hidePosition', template.HidePosition__c);
                                        childMap.put('linkToNews', template.LinkToNEWS__c);
                                        childList.add(childMap);
                                        // parentMap.put('value', '');
                                        parentMap.put('childList', childList);
                                        break;
                                    }
                                }
                            } else {
                                Map<String, Object> detailMap = new Map<String, Object>();
                                detailMap.put('name', template.Name);
                                detailMap.put('position', Integer.valueOf(template.Position__c));
                                detailMap.put('detail', (userLanguage == userLanguageTH ? template.ValueTH__c : template.ValueEN__c));
                                String value = getDueDiligenceAnswer(!String.isBlank(template.AnswerCode__c) ? template.AnswerCode__c : '');
                                if(value == NOTAVAILABLE && !isNotAvailable) { isNotAvailable = true; }
                                detailMap.put('value', value);
                                levelResults.add(!String.isBlank(value) ? value : NOTFOUND); // assign value
                                if(value == FOUND && reportMap != null && !reportMap.isEmpty() && reportMap.containsKey(template.ReportDeveloperName__c) && !String.isBlank(template.ReportLink__c)) {
                                    detailMap.put('reportLink', constructReportLink(reportMap.get(template.ReportDeveloperName__c), template.ReportLink__c));
                                }
                                detailMap.put('hidePosition', template.HidePosition__c);
                                detailMap.put('linkToNews', template.LinkToNEWS__c);
                                actorList.add(detailMap);
                            }

                            Boolean actorFound = false;
                            if(levelList != null && !levelList.isEmpty()) {
                                for(Object actor : levelList) {
                                    Map<String, Object> actorMap = (Map<String, Object>) actor;
                                    if(actorMap.get('actor') == template.Actor__c) {
                                        actorMap.put('actorList', actorList);
                                        actorFound = true;
                                        break;
                                    }
                                }
                            }
                            if(!actorFound) {
                                String actor = template.Actor__c;
                                if(actorConfigMap != null && !actorConfigMap.isEmpty() && actorConfigMap.containsKey(buProfile.BusinessUnit__c)) {
                                    Map<String, Object> actorByBuMap = (Map<String, Object>) actorConfigMap.get(buProfile.BusinessUnit__c);
                                    if(actorByBuMap != null && !actorByBuMap.isEmpty() && actorByBuMap.containsKey(actor) && actorByBuMap.get(actor) != null) {
                                        actor = (String) actorByBuMap.get(actor);
                                    }
                                }
                                levelList.add(new Map<String, Object> {'actor' => template.Actor__c, 'actorLabel' => actor, 'actorList' => actorList});
                            }
                            System.debug('levelList -----' + levelList);

                            if(levelList != null && !levelList.isEmpty()) {
                                templateMap.put(template.RiskLevel__c, levelList);
                            }
                            System.debug('level ' + template.Level__c + ' levelResults -----' + levelResults);
                            System.debug('contains ' + FOUND + levelResults.contains(FOUND));
                            System.debug('levelResultMap -----' + levelResultMap);
                            Integer levelResultMapKey = Integer.valueOf(template.Level__c);
                            if(levelResultMap != null && !levelResultMap.isEmpty() && levelResultMap.containsKey(levelResultMapKey)) {
                                levelResults.add(levelResultMap.get(levelResultMapKey));
                            }
                            levelResultMap.put(Integer.valueOf(template.Level__c), (levelResults != null && !levelResults.isEmpty() && levelResults.contains(FOUND) ? FOUND : NOTFOUND));
                        }
                    }
                }
                if(templateMap != null && !templateMap.isEmpty()) {
                    for(String key : templateMap.keySet()) {
                        resultList.add(new Map<String, Object> {
                            'riskLevel' => key,
                            'details' => templateMap.get(key)
                        });
                    }
                }
                if(displayRiskBySystem && levelResultMap != null && !levelResultMap.isEmpty()) {
                    List<String> riskLevels = CTRGeneralSetting__mdt.getInstance('CTRDueDiligenceRiskLevel')?.Value__c?.split(';'); // retrieve fields
                    System.debug('riskLevels -----' + riskLevels);
                    if(riskLevels != null && !riskLevels.isEmpty()) {
                        riskLevelBySystemMap.put('fieldName', riskLevels[0]);
                        String value = (isNotAvailable ? '' : calculateRiskLevelBySystem(reqItem, levelResultMap));
                        riskLevelBySystemMap.put('value', value);
                        updateRiskLevelBySystem(riskLevels[0], value, riskLevels, reqItem, true, 'submit');
                    }
                }
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        result.put('resultList', resultList);
        result.put('riskLevelBySystem', riskLevelBySystemMap);
        return (result != null && !result.isEmpty() ? JSON.serialize(result) : null);
    }

    @AuraEnabled
    public static CTRBuProfile__mdt retrieveBusinessUnitFromProfile(String recordId) {
        return CTRBuProfileController.checkBusinessUnitFromProfile(UserInfo.getUserId(), recordId);
    }

    public static Map<String, CTRGeneralSetting__mdt> getGeneralSetting(List<String> developerNames) {
        List<CTRGeneralSetting__mdt> configs = [SELECT Id, DeveloperName, Value__c, LongValue__c FROM CTRGeneralSetting__mdt WHERE DeveloperName = :developerNames];
        Map<String, CTRGeneralSetting__mdt> configMap = new Map<String, CTRGeneralSetting__mdt>();
        if(configs != null && !configs.isEmpty()) {
            for(CTRGeneralSetting__mdt config : configs) {
                configMap.put(config.DeveloperName, config);
            }
        }
        return configMap;
    }

    @AuraEnabled
    public static void updateDueDiligence(String riskLevelInfo, String actionType) {
        try {
            if(!String.isBlank(riskLevelInfo)) {
                // CTRRequestFormItem__c reqItem = (CTRRequestFormItem__c) JSON.deserialize(riskLevelInfo, CTRRequestFormItem__c.class);
                Map<String, Object> reqItem = (Map<String, Object>) JSON.deserializeUntyped(riskLevelInfo);
                System.debug('reqItem -----' + reqItem);
                CTRRequestFormItem__c retrieveReqItem = retrieveRequestItem((String) reqItem.get('Id'))[0]; // 26/03/2024
                Map<String, Object> recordTypeConfigMap = retrieveDueDiligenceDecision(retrieveReqItem.RecordType.DeveloperName); // retrieve recordtype decision from custom metadata
                Map<String, Schema.SObjectField> fieldMap = Schema.CTRRequestFormItem__c.SObjectType.getDescribe().fields.getMap();
                for(String key : reqItem.keySet()) {
                    Object value = reqItem.get(key);
                    if(fieldMap.get(key).getDescribe().getType() == Schema.DisplayType.DATETIME && value != null) {
                        // List<String> dateAndTime = String.valueOf(value).split('T');
                        // List<String> dates = String.valueOf(dateAndTime[0]).split('-');
                        // Date constructDate = Date.newInstance(Integer.valueOf(dates[0]) + (UserInfo.getLocale() == 'th_TH' || UserInfo.getLocale() == 'th' || UserInfo.getLocale() == 'TH' ? 543 : 0), Integer.valueOf(dates[1]), Integer.valueOf(dates[2]));
                        // List<String> times = String.valueOf(dateAndTime[1]).split(':');
                        // String second = String.valueOf(times[2]).substring(0, 1);
                        // List<String> timeSecond = String.valueOf(times[2]).split('\\.');
                        // Time constructTime = Time.newInstance(Integer.valueOf(times[0]), Integer.valueOf(times[1]), Integer.valueOf(timeSecond[0]), Integer.valueOf(timeSecond[1].substringBefore('Z')));
                        // System.debug('constructTime -----' + constructTime);
                        // value = Datetime.newInstance(constructDate, constructTime).addHours(7);
                        value = Datetime.valueOfGMT(String.valueOf(value).replace('T', ' ').substringBefore('\\.'));
                    }
                    retrieveReqItem.put(key, value);
                }
                System.debug('retrieveReqItem -----' + retrieveReqItem);
                List<String> riskLevels = CTRGeneralSetting__mdt.getInstance((String) recordTypeConfigMap.get('riskLevel'))?.Value__c?.split(';'); // retrieve fields
                updateRiskLevelBySystem(riskLevels[0], (String) reqItem.get(riskLevels[0]), riskLevels, retrieveReqItem, false, actionType);
                // update reqItem;
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled
    public static String retrieveDueDiligenceReviewSection(String recordId) {
        Map<String, Object> sectionMap = new Map<String, Object>();
        CTRBuProfile__mdt buProfile = retrieveBusinessUnitFromProfile(recordId);
        List<CTRRequestFormItem__c> reqItems = retrieveRequestItem(recordId);
        // String isDom = 'Domestic'; // default
        // if(!reqItems.isEmpty()) {
        //     if(!String.isBlank(reqItems[0].CTRRequestFormHeader__c) && !String.isBlank(reqItems[0].CTRRequestFormHeader__r.Country__c) && !String.isBlank(reqItems[0].CTRRequestFormHeader__r.Country__r.Code__c) && reqItems[0].CTRRequestFormHeader__r.Country__r.Code__c != 'TH') {
        //         isDom = 'International';
        //     }
        // }
        String isDom =(String.isNotBlank(reqItems[0].ServiceArea__c)) ? reqItems[0].ServiceArea__c: 'Domestic';
        try {
            Map<String, Object> recordTypeConfigMap = retrieveDueDiligenceDecision(reqItems[0].RecordType.DeveloperName); // retrieve recordtype decision from custom metadata
            if(recordTypeConfigMap != null && !recordTypeConfigMap.isEmpty() && recordTypeConfigMap.containsKey('resultReview')) {
                String resultReviewConfig = (String) recordTypeConfigMap.get('resultReview');
                Map<String, CTRGeneralSetting__mdt> configMap = getGeneralSetting(new List<String> {resultReviewConfig});
                if(configMap != null && !configMap.isEmpty() && configMap.containsKey(resultReviewConfig)) {
                    String sectionLabel = configMap.get(resultReviewConfig)?.LongValue__c;
                    Map<String, Object> sectionLabelMap = (!String.isBlank(sectionLabel) ? (Map<String, Object>) JSON.deserializeUntyped(sectionLabel) : null);
                    if(buProfile != null && !String.isBlank(buProfile.BusinessUnit__c)) {
                        String businessUnitKey = buProfile.BusinessUnit__c + isDom;
                        if(sectionLabelMap.containsKey(businessUnitKey)) {
                            sectionMap.putAll((Map<String, Object>) sectionLabelMap.get(businessUnitKey));
                        } else if(sectionLabelMap.containsKey(buProfile.BusinessUnit__c)) {
                            sectionMap.putAll((Map<String, Object>) sectionLabelMap.get(buProfile.BusinessUnit__c));
                        }
                    }
                }
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        System.debug('sectionMap -----' + sectionMap);
        return (sectionMap != null && !sectionMap.isEmpty() ? JSON.serialize(new Map<String, Object> {'sectionMap' => sectionMap, 'isTX' => (buProfile.BusinessUnit__c == 'TX' ? true : false)}) : null);
    }

    private static String getDueDiligenceAnswer(String answerCode) {
        String result = '';
        accountName = '';
        reqHeaderName = '';
        if(!String.isBlank(answerCode)) {
            result = NOTFOUND;
            switch on answerCode {
                when 'AC01', 'AC05', 'AC12' {
                    if(riskLevelMap != null && !riskLevelMap.isEmpty()) {
                        switch on answerCode {
                            when 'AC01'  {
                                if(riskLevelMap.containsKey('3')) { result = FOUND; }
                            }
                            when 'AC05' {
                                if(riskLevelMap.containsKey('1*') || riskLevelMap.containsKey('2')) { result = FOUND; }
                            }
                            when 'AC12' {
                                if(riskLevelMap.containsKey('1')) { result = FOUND; }
                            }
                        }
                    }
                    // result = FOUND; // testing
                }
                when 'AC02', 'AC03', 'AC06', 'AC07', 'AC08', 'AC09', 'AC10' {
                    if(cddSanctionMap != null && !cddSanctionMap.isEmpty()) {
                        List<CTRCDDSanction__c> cddSanctionList = new List<CTRCDDSanction__c>();
                        switch on answerCode {
                            when 'AC02' {
                                if(cddSanctionMap.containsKey('GProcurement') && cddSanctionMap.get('GProcurement') != null) { cddSanctionList = cddSanctionMap.get('GProcurement'); }
                            }
                            when 'AC03' {
                                if(cddSanctionMap.containsKey('WorldCheckOne') && cddSanctionMap.get('WorldCheckOne') != null) { cddSanctionList = cddSanctionMap.get('WorldCheckOne'); }
                            }
                            when 'AC06' {
                                if(cddSanctionMap.containsKey('WorldCheckOneCountry') && cddSanctionMap.get('WorldCheckOneCountry') != null) { cddSanctionList = cddSanctionMap.get('WorldCheckOneCountry'); }
                            }
                            when 'AC07' {
                                if(cddSanctionMap.containsKey('UNSanction') && cddSanctionMap.get('UNSanction') != null) { cddSanctionList = cddSanctionMap.get('UNSanction'); }
                            }
                            when 'AC08' {
                                if(cddSanctionMap.containsKey('UNThailand') && cddSanctionMap.get('UNThailand') != null) { cddSanctionList = cddSanctionMap.get('UNThailand'); }
                            }
                            when 'AC09' {
                                if(cddSanctionMap.containsKey('WebUN')) { // || cddSanctionMap.containsKey('WebUNEntities') // 02/04/2024
                                    if(cddSanctionMap.containsKey('WebUN') && cddSanctionMap.get('WebUN') != null) {
                                        cddSanctionList.addAll(cddSanctionMap.get('WebUN'));
                                    }
                                    // if(cddSanctionMap.containsKey('WebUNEntities') && cddSanctionMap.get('WebUNEntities') != null) {
                                    //     cddSanctionList.addAll(cddSanctionMap.get('WebUNEntities'));
                                    // }
                                }
                            }
                            when 'AC10' {
                                if(cddSanctionMap.containsKey('LedWebsite')) { cddSanctionList = cddSanctionMap.get('LedWebsite'); }
                            }
                        }
                        if(!cddSanctionList.isEmpty()) {
                            for(CTRCDDSanction__c record : cddSanctionList) {
                                if(record.IntegrationStatus__c != 'Success') {
                                    result = NOTAVAILABLE;
                                    break;
                                } else if(record.FindingWeb__c == FOUND && result != FOUND) {
                                    result = FOUND;
                                    accountName = record.Account__r.Name;
                                    reqHeaderName = record.RequestFormHeader__r.Name;
                                }
                            }
                        }
                        // result = FOUND; // testing
                    }
                }
                when 'AC04' {
                    result = NO;
                    // if(newsList != null && !newsList.isEmpty()) { result = YES; }
                    if(reqItem != null && !String.isBlank(reqItem.ResultFromNewsScreening__c) && reqItem.ResultFromNewsScreening__c.contains('Has compliance')) { result = YES; }
                }
                when 'AC11' {
                    if(cddNaccTransactionList != null && !cddNaccTransactionList.isEmpty()) {
                        for(CTRCDDNACCTransaction__c record : cddNaccTransactionList) {
                            if(record.IntegrationStatus__c != 'Success') {
                                result = NOTAVAILABLE;
                                break;
                            } else if(record.FindingWeb__c == FOUND && result != FOUND) {
                                result = FOUND;
                            }
                        }
                    }
                }
                when 'AC13' {
                    if(destinationCountryList != null && !destinationCountryList.isEmpty()) {
                        System.debug(answerCode + ' -----' + destinationCountryList);
                        // if(!String.isBlank(reqHeaderList[0].Country__c) && !String.isBlank(reqHeaderList[0].Country__r.Code__c) && new List<String> {'VN', 'LA', 'KH'}.contains(reqHeaderList[0].Country__r.Code__c)) { result = FOUND; }
                        for(String country : destinationCountryList) {
                            if(new List<String> {'VN', 'LA', 'KH'}.contains(country)) {
                                result = FOUND;
                                break;
                            }
                        }
                    }
                }
                when else {
                    result = NOTFOUND;
                }
            }
        }
        return result;
    }

    private static String constructReportLink(String reportId, String reportLink) {
        System.debug(CLASSNAME + '.constructReportLink reportId -----' + reportId);
        reportLink = reportLink.replace('{reportId}', reportId);
        if(reportLink.contains('{accountName}') && !String.isBlank(accountName)) {
            reportLink = reportLink.replace('{accountName}', accountName);
        }
        if(reportLink.contains('{reqHeaderName}') && !String.isBlank(reqHeaderName)) {
            reportLink = reportLink.replace('{reqHeaderName}', reqHeaderName);
        }
        if(reportLink.contains('{nameSet}') && !reportNameSet.isEmpty()) {
            reportLink = reportLink.replace('{nameSet}', String.join(new List<String>(reportNameSet), ', '));
        }
        System.debug(CLASSNAME + '.constructReportLink reportLink -----' + reportLink);
        return reportLink;
    }

    private static void fetchDueDiligenceAnswer(CTRRequestFormItem__c reqItem) {
        if(!String.isBlank(reqItem.CTRRequestFormHeader__c)) {
            Date lastNMonth = System.today().addMonths(-3);
            List<CTRShippingCountry__c> shippingCountryList = [SELECT Id, ShippingCountry__c FROM CTRShippingCountry__c WHERE CTRRequestFormItem__c =: reqItem.Id];
            if(!shippingCountryList.isEmpty()) {
                for(CTRShippingCountry__c shipCountry : shippingCountryList) {
                    if(!String.isBlank(shipCountry.ShippingCountry__c)) { destinationCountryList.add(shipCountry.ShippingCountry__c); }
                }
            }
            reqHeaderList = [SELECT Id, Name, Country__c, Country__r.Code__c, Customer__c, Customer__r.Name, CEOFirstName__c, CEOLastName__c, 
                             (SELECT Id, Account__c, Account__r.Name, Shareholders__c, Shareholders__r.Name, FindingWeb__c, PositionType__c, Type__c, IntegrationStatus__c, IntegrationMessage__c, RequestFormHeader__c, RequestFormHeader__r.Name FROM CTR_CDD_Sanction__r), // WHERE FindingWeb__c =: FOUND 
                             (SELECT Id, Headline__c, Keyword__c, SourceURL__c, Date__c, Source__c, Content__c FROM CTR_News__r WHERE Date__c >=: lastNMonth), 
                             (SELECT Id, Name, Customer__c, Customer__r.Name FROM CTRShareholder__r) 
                             FROM CTRRequestFormHeader__c WHERE Id =: reqItem.CTRRequestFormHeader__c];
            if(!reqHeaderList.isEmpty()) {
                if(!String.isBlank(reqHeaderList[0].Country__c) && !String.isBlank(reqHeaderList[0].Country__r.Code__c)) { destinationCountryList.add(reqHeaderList[0].Country__r.Code__c); }
                List<CTR_RiskCountry__c> latestVersionList = [SELECT Version__c FROM CTR_RiskCountry__c ORDER BY CreatedDate DESC LIMIT 1]; // get latest version
                if(!latestVersionList.isEmpty() && destinationCountryList != null && !destinationCountryList.isEmpty()) {
                    List<CTR_RiskCountry__c> riskCountryList = [SELECT Version__c, Level__c, LevelText__c, CountryCode__c, CountryName__c FROM CTR_RiskCountry__c WHERE CountryCode__c =: destinationCountryList AND Version__c =: latestVersionList[0].Version__c ORDER BY Level__c ASC, CreatedDate DESC]; // CountryCode__c =: reqHeaderList[0].Country__r.Code__c
                    System.debug(CLASSNAME + '.fetchDueDiligenceAnswer riskCountryList -----' + riskCountryList);
                    if(!riskCountryList.isEmpty()) {
                        for(CTR_RiskCountry__c rc : riskCountryList) {
                            if(riskLevelMap == null || riskLevelMap.isEmpty() || (riskLevelMap != null && !riskLevelMap.isEmpty() && !riskLevelMap.containsKey(rc.Level__c))) {
                                riskLevelMap.put(rc.Level__c, new List<CTR_RiskCountry__c>());
                            }
                            riskLevelMap.get(rc.Level__c).add(rc);
                        }
                    }
                }

                System.debug(CLASSNAME + '.fetchDueDiligenceAnswer reqHeaderList[0].CTR_CDD_Sanction__r -----' + reqHeaderList[0].CTR_CDD_Sanction__r);
                if(reqHeaderList[0].CTR_CDD_Sanction__r != null && !reqHeaderList[0].CTR_CDD_Sanction__r.isEmpty()) {
                    for(CTRCDDSanction__c ds : reqHeaderList[0].CTR_CDD_Sanction__r) {
                        if(cddSanctionMap == null || cddSanctionMap.isEmpty() || (cddSanctionMap != null && !cddSanctionMap.isEmpty() && !cddSanctionMap.containsKey(ds.Type__c))) {
                            cddSanctionMap.put(ds.Type__c, new List<CTRCDDSanction__c>());
                        }
                        cddSanctionMap.get(ds.Type__c).add(ds);
                    }
                }
    
                System.debug(CLASSNAME + '.fetchDueDiligenceAnswer reqHeaderList[0].CTRNews__r -----' + reqHeaderList[0].CTR_News__r);
                if(reqHeaderList[0].CTR_News__r != null && !reqHeaderList[0].CTR_News__r.isEmpty()) {
                    newsList = reqHeaderList[0].CTR_News__r;
                }
                
                Set<String> nameQueries = new Set<String>();
                Set<Id> shareHolders = new Set<Id>();
                reportNameSet = new Set<String>();
                if(!String.isBlank(reqHeaderList[0].Customer__c)) {
                    nameQueries.add(reqHeaderList[0].Customer__r.Name);
                }
                List<String> nameMergedSet = new List<String>();
                if(!String.isBlank(reqHeaderList[0].CEOFirstName__c)) { nameMergedSet.add(reqHeaderList[0].CEOFirstName__c); }
                if(!String.isBlank(reqHeaderList[0].CEOLastName__c)) { nameMergedSet.add(reqHeaderList[0].CEOLastName__c); }
                if(!nameMergedSet.isEmpty()) {
                    nameQueries.add(String.join(nameMergedSet, SPACE));
                }
                System.debug(CLASSNAME + '.fetchDueDiligenceAnswer reqHeaderList[0].CTRShareholder__r -----' + reqHeaderList[0].CTRShareholder__r);
                if(reqHeaderList[0].CTRShareholder__r != null && !reqHeaderList[0].CTRShareholder__r.isEmpty()) {
                    for(CTRShareholder__c sh : reqHeaderList[0].CTRShareholder__r) {
                        // if(!String.isBlank(sh.Customer__c)) { nameQueries.add(sh.Customer__r.Name); }
                        shareHolders.add(sh.Id);
                        reportNameSet.add(sh.Name); // variable for report
                    }
                }

                List<String> whereQueries = new List<String>();
                if(!nameQueries.isEmpty()) {
                    whereQueries.add('Name =: nameQueries');
                    reportNameSet.addAll(nameQueries); // variable for report
                }
                if(!shareHolders.isEmpty()) {
                    whereQueries.add('Shareholder__c =: shareHolders');
                }
                if(!whereQueries.isEmpty()) {
                    String cddNaccTransactionQuery = 'SELECT Name, PositionType__c, Customer__c, Shareholder__c, FindingWeb__c, IntegrationStatus__c FROM CTRCDDNACCTransaction__c WHERE ' + String.join(whereQueries, ' OR ');
                    System.debug(CLASSNAME + '.fetchDueDiligenceAnswer cddNaccTransactionQuery -----' + cddNaccTransactionQuery);
                    cddNaccTransactionList = Database.query(cddNaccTransactionQuery);
                    System.debug(CLASSNAME + '.fetchDueDiligenceAnswer cddNaccTransactionList -----' + cddNaccTransactionList);
                }
            }
        }
    }

    private static String calculateRiskLevelBySystem(CTRRequestFormItem__c reqItem, Map<Integer, String> levelResultMap) {
        System.debug(CLASSNAME + '.calculateRiskLevelBySystem levelResultMap -----' + levelResultMap);
        String result = '';
        List<CTRComplianceRiskLevelEvaluation__mdt> riskLevelList = [SELECT Id, DeveloperName, SuggestedResult__c, Active__c, 
                                                                     (SELECT Id, DeveloperName, Level__c, Value__c, News__c, ComplianceRiskNews__c FROM CTRComplianceRiskLevelMatrix__r WHERE Active__c = TRUE) 
                                                                     FROM CTRComplianceRiskLevelEvaluation__mdt WHERE Active__c = TRUE ORDER BY SuggestedResult__c DESC];
        if(!riskLevelList.isEmpty()) {
            for(CTRComplianceRiskLevelEvaluation__mdt eva : riskLevelList) {
                Boolean allConditionResult = true;
                if(eva.CTRComplianceRiskLevelMatrix__r != null && !eva.CTRComplianceRiskLevelMatrix__r.isEmpty()) {
                    for(CTRComplianceRiskLevelMatrix__mdt matrix : eva.CTRComplianceRiskLevelMatrix__r) {
                        System.debug(CLASSNAME + '.calculateRiskLevelBySystem matrix -----' + matrix);
                        if(matrix.Level__c != null) {
                            if(!String.isBlank(matrix.Value__c)) {
                                if(levelResultMap != null && !levelResultMap.isEmpty() && levelResultMap.containsKey(Integer.valueOf(matrix.Level__c))) {
                                    if(matrix.Value__c != levelResultMap.get(Integer.valueOf(matrix.Level__c))) { allConditionResult = false; }
                                }
                            }
                            if(!String.isBlank(matrix.News__c)) {
                                String newsResult = (newsList != null && !newsList.isEmpty() ? FOUND : NOTFOUND);
                                if(matrix.News__c != newsResult) { allConditionResult = false; }
                            }
                            if(!String.isBlank(matrix.ComplianceRiskNews__c)) {
                                String hasComplianceVal = (!String.isBlank(reqItem.ResultFromNewsScreening__c) && reqItem.ResultFromNewsScreening__c.contains('Has compliance') ? YES : NO);
                                // if(matrix.ComplianceRiskNews__c != reqItem.Compliancerisknews__c) { allConditionResult = false; }
                                if(matrix.ComplianceRiskNews__c != hasComplianceVal) { allConditionResult = false; }
                            }
                        } else {
                            allConditionResult = false;
                        }

                        if(!allConditionResult) { break; }
                    }

                    if(allConditionResult) {
                        result = eva.SuggestedResult__c;
                        break;
                    }
                }
            }
        }
        System.debug(CLASSNAME + '.calculateRiskLevelBySystem result -----' + result);
        return result;
    }

    private static void updateRiskLevelBySystem(String fieldName, String riskValue, List<String> riskLevels, CTRRequestFormItem__c reqItem, Boolean isBypass, String actionType) {
        if(!String.isBlank(fieldName) && reqItem != null) {
            if(reqItem.get(fieldName) != riskValue || !isBypass) {
                CTRBuProfile__mdt buProfile = retrieveBusinessUnitFromProfile(reqItem.Id);
                System.debug(CLASSNAME + '.updateRiskLevelBySystem buProfile -----' + buProfile);
                String sObjectName = reqItem.Id.getSobjectType().getDescribe().getName();
                System.debug(CLASSNAME + '.updateRiskLevelBySystem sObjectName -----' + sObjectName);

                Schema.SObjectType sObjectType = ((SObject)Type.forName(sObjectName).newInstance()).getSObjectType();
                sObject sObjToUpdate = reqItem; // sObjectType.newSObject();
                // sObjToUpdate.put('Id', reqItem.Id);
                sObjToUpdate.put(fieldName, riskValue);
                Set<String> riskValues = new Set<String>();
                riskValues.add(riskValue);
                Boolean allRiskValid = true;
                if(!riskLevels.isEmpty()) {
                    for(String riskField : riskLevels) {
                        if(riskField == fieldName) continue;

                        if(reqItem.get(riskField) != null && !String.isBlank(String.valueOf(reqItem.get(riskField)))) { 
                            String value = (String) reqItem.get(riskField);
                            riskValues.add(value);
                            sObjToUpdate.put(riskField, value);
                        } else { allRiskValid = false; break; }
                    }
                }
                System.debug(CLASSNAME + '.updateRiskLevelBySystem allRiskValid -----' + allRiskValid);
                String finalRiskValue = '';
                if(allRiskValid && !riskValues.isEmpty() && !sortRiskValues.isEmpty()) {
                    for(String sortRisk : sortRiskValues) {
                        if(riskValues.contains(sortRisk)) {
                            finalRiskValue = sortRisk;
                            break;
                        }
                    }
                }
                if(allRiskValid && !String.isBlank(finalRiskValue)) {
                    if(actionType == 'submit') {
                        sObjToUpdate.put(FINALRISKLEVELFIELD, finalRiskValue);

                        if(reqItem.RecordType.DeveloperName.contains('Initial')) {
                            switch on finalRiskValue {
                                when 'Low Risk', 'Medium Risk' {
                                    if(reqItem.RecordType.DeveloperName.contains(SUPPLIER)) { // 26/03/2024
                                        if(buProfile != null && buProfile.BusinessUnit__c == 'TX') {
                                            sObjToUpdate.put(APPROVALSTEPFIELD, SELECTCOMMITTEE);
                                        } else {
                                            sObjToUpdate.put(STATUSFIELD, APPROVEDSTATUS);
                                            sObjToUpdate.put(APPROVALSTEPFIELD, INFORMCOUNTERPARTY);
                                        }
                                    } else {
                                        sObjToUpdate.put(STATUSFIELD, INREVIEWSTATUS);
                                        sObjToUpdate.put(APPROVALSTEPFIELD, CREDITRATINGSTEP);
                                    }
                                }
                                when 'Very High Risk' {
                                    sObjToUpdate.put(STATUSFIELD, REJECTEDSTATUS);
                                    sObjToUpdate.put(APPROVALSTEPFIELD, INFORMCOUNTERPARTY);
                                }
                            }
                        }
                    }
                    
                }
                update sObjToUpdate;
            }
        }
    }

    @AuraEnabled
    public static Boolean validateActor(String recordId, String actorStep, String userId, String process) {
        System.debug(CLASSNAME + '.validateActor -----' + recordId + '/' + actorStep + '/' + userId);
        List<CTRRequestFormItem__c> reqItemList = retrieveRequestItem(recordId);
        CTRBuProfile__mdt buProfile = retrieveBusinessUnitFromProfile(recordId);
        return validateActor(recordId, actorStep, userId, process, buProfile, reqItemList);
    }

    public static Boolean validateActor(String recordId, String actorStep, String userId, String process, CTRBuProfile__mdt buProfile, List<CTRRequestFormItem__c> reqItemList) {
        System.debug(CLASSNAME + '.validateActor -----' + recordId + '/' + actorStep + '/' + userId);
        Boolean isValid = false;
        try {
            if(!String.isBlank(recordId) && !String.isBlank(actorStep) && !String.isBlank(userId)) {
                // List<CTRRequestFormItem__c> reqItemList = retrieveRequestItem(recordId);
                // CTRBuProfile__mdt buProfile = retrieveBusinessUnitFromProfile(recordId);
                if(!reqItemList.isEmpty()) {
                    CTRRequestFormItem__c reqItem = reqItemList[0];
                    switch on actorStep {
                        when 'Trader' {
                            if(process == CHECKDUEDILIGENCE) {
                                if(userId == reqItem.OwnerId) { isValid = true; }
                            } else {
                                if(userId == reqItem.OwnersSectionHead__c) { isValid = true; } // 30/03/2024
                            }
                        }
                        when else {
                            List<User> userList = [SELECT Id, Employee_Id__c FROM User WHERE Id =: userId AND IsActive = TRUE AND Employee_Id__c != NULL];
                            if(!userList.isEmpty()) {
                                String employeeId = userList[0].Employee_Id__c;
                                List<CTRActorInProcess__mdt> actorList = retrieveActor(reqItem, employeeId, actorStep, buProfile, process);
                                System.debug(CLASSNAME + '.validateActor actorList -----' + actorList);
                                if(!actorList.isEmpty()) { isValid = true; }
                            }
                        }
                    }
                }
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return isValid;
    }

    private static List<CTRRequestFormItem__c> retrieveRequestItem(String recordId) {
        return [SELECT Id, OwnerId, SubBU__c, CTRRequestFormHeader__c, CTRRequestFormHeader__r.Country__c, CTRRequestFormHeader__r.Country__r.Code__c, RecordTypeId, RecordType.DeveloperName, InterestedProductTypeAsCustomerTOP__c, InterestedProductTypeAsCustomerTX__c, InterestedProductTypeAsSupplierTOP__c, InterestedProductTypeAsSupplierTX__c, 
                RiskLevelbySystem__c, RiskLevelbyTRCR__c, RiskLevelbyCPXX__c, FinalRiskLevel__c, CTRRequestFormHeader__r.Customer__c, CTRRequestFormHeader__r.Customer__r.Name, CTRRequestFormHeader__r.CEOFirstName__c, CTRRequestFormHeader__r.CEOLastName__c, /*Compliancerisknews__c,*/ ResultFromNewsScreening__c, OwnersSectionHead__c, 
                EnhanceDueDiligenceCommentByTrader__c, TraderPreScreenComment__c, ServiceArea__c FROM CTRRequestFormItem__c WHERE Id =: recordId];
    }

    private static List<CTRActorInProcess__mdt> retrieveActor(CTRRequestFormItem__c reqItem, String employeeId, String actorStep, CTRBuProfile__mdt buProfile, String process) {
        System.debug(CLASSNAME + '.retrieveActor employeeId -----' + employeeId);
        System.debug(CLASSNAME + '.retrieveActor reqItem -----' + reqItem);
        List<CTRActorInProcess__mdt> actorList = new List<CTRActorInProcess__mdt>();
        String subBU = (!String.isBlank(reqItem.SubBU__c) ? reqItem.SubBU__c : null);
        // String isDom = (!String.isBlank(reqItem.CTRRequestFormHeader__c) && !String.isBlank(reqItem.CTRRequestFormHeader__r.Country__c) && !String.isBlank(reqItem.CTRRequestFormHeader__r.Country__r.Code__c) && reqItem.CTRRequestFormHeader__r.Country__r.Code__c == 'TH' ? 'Domestic' : 'International');
        String isDom = (String.isNotBlank(reqItem.ServiceArea__c)) ? reqItem.ServiceArea__c: 'Domestic';
        String recordType = (!String.isBlank(reqItem.RecordTypeId) ? (reqItem.RecordType.DeveloperName.contains(CUSTOMER) ? CUSTOMER : SUPPLIER) : null);
        String product = '';
        if(buProfile != null && !String.isBlank(buProfile.BusinessUnit__c) && !String.isBlank(recordType)) {
            if(recordType == CUSTOMER) {
                if(buProfile.BusinessUnit__c == 'TOP' && !String.isBlank(reqItem.InterestedProductTypeAsCustomerTOP__c)) {
                    product = reqItem.InterestedProductTypeAsCustomerTOP__c;
                } else if(buProfile.BusinessUnit__c == 'TX' && !String.isBlank(reqItem.InterestedProductTypeAsCustomerTX__c)) {
                    product = reqItem.InterestedProductTypeAsCustomerTX__c;
                }
            } else if(recordType == SUPPLIER) {
                if(buProfile.BusinessUnit__c == 'TOP' && !String.isBlank(reqItem.InterestedProductTypeAsSupplierTOP__c)) {
                    product = reqItem.InterestedProductTypeAsSupplierTOP__c;
                } else if(buProfile.BusinessUnit__c == 'TX' && !String.isBlank(reqItem.InterestedProductTypeAsSupplierTX__c)) {
                    product = reqItem.InterestedProductTypeAsSupplierTX__c;
                }
            }
        }
        String query = 'SELECT Id, DeveloperName, Process__c, Step__c, SalesOrg__c, RecordType__c, Product__c, Type__c, EmployeeId__c, InterByTX__c, ActorPosition__c, ActorTeam__c FROM CTRActorInProcess__mdt WHERE Process__c =: process AND Step__c =: actorStep AND InterByTX__c =: NO';
        if(!String.isBlank(employeeId)) { query += ' AND EmployeeId__c =: employeeId'; }
        if(!String.isBlank(subBU)) { query += ' AND SalesOrg__c =: subBU'; }
        if(!String.isBlank(isDom)) { query += ' AND Type__c =: isDom'; }
        if(!String.isBlank(product) && product == CRUDE) { query += ' AND Product__c =: CRUDE'; } else { query += ' AND Product__c !=: CRUDE'; }
        if(!String.isBlank(recordType)) {
            query += ' AND RecordType__c =: recordType';
            System.debug(CLASSNAME + '.retrieveActor query -----' + query);
            actorList = Database.query(query);
            System.debug(CLASSNAME + '.retrieveActor actorList -----' + actorList);
        }
        return actorList;
    }

    // approve / reject via email
    @AuraEnabled
    public static Boolean isEnhancedDueDiligenceValid(String recordId, String actionBy) {
        Boolean isValid = false;
        try {
            if(!String.isBlank(recordId) && !String.isBlank(actionBy)) {
                reqItem = [SELECT Id, EVPCReviewEDDResult__c, ApproveDueDiligenceResult__c, ServiceArea__c FROM CTRRequestFormItem__c WHERE Id =: recordId];
                if((actionBy == 'CEO' && String.isBlank(reqItem.ApproveDueDiligenceResult__c)) || (actionBy == 'EVPC' && String.isBlank(reqItem.EVPCReviewEDDResult__c))) {
                    isValid = true;
                }
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return isValid;
    }

    @AuraEnabled
    public static String saveActionViaEmail(String recordId, String actionResult, String dueDiligenceComment, String actionBy, String userId) {
        String result = '';
        try {
            if(!String.isBlank(recordId) && !String.isBlank(actionBy)) {
                List<CTRRequestFormItem__c> reqItemList = retrieveRequestItem(recordId);
                if(!reqItemList.isEmpty()) {
                    CTRRequestFormItem__c reqItem = new CTRRequestFormItem__c(Id = reqItemList[0].Id);
                    if(actionBy == 'CEO') {
                        reqItem.ApproveDueDiligenceResult__c = actionResult;
                        reqItem.ApproveDueDiligenceComment__c = dueDiligenceComment;
                        if(!String.isBlank(userId)) reqItem.ApproveDueDiligenceBy__c = userId;
                        reqItem.ApproveDueDiligenceDateTime__c = System.now();
                    } else {
                        reqItem.EVPCReviewEDDResult__c = actionResult;
                        reqItem.EVPCReviewEDDComment__c = dueDiligenceComment;
                        if(!String.isBlank(userId)) reqItem.EVPCReviewEDDBy__c = userId;
                        reqItem.EVPCReviewEDDDateTime__c = System.now();
                    }
                    update reqItem;
                    result = 'success';
                } else { result = 'Record not found'; }
            }
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return result;
    }
}