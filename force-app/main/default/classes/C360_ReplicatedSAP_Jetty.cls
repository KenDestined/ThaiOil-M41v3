public class C360_ReplicatedSAP_Jetty{
    public class ParseException extends Exception{}
    public class dto_response extends WebserviceExtend.dto_response{}
    public static dto_response parse(String json){
        return (dto_response) System.JSON.deserialize(json, dto_response.class);
    }
    public static dto_response execute(Map<String,Object> requestBody, RestRequest request){
        String gatewayId = requestBody.containsKey('gateway_id') ? String.valueOf(requestBody.get('gateway_id')) : '';
        String body = requestBody.containsKey('body') ? String.valueOf(requestBody.get('body')).replace('\\', '\\\\') : '';
        Application_Log__c applog = new Application_Log__c(
            External_ID__c = gatewayId.length() == 36 ? gatewayId : Uuid.randomUUID(),
            Integration_Name__c = 'C360 Replicated SAP Jetty',
            Method__c = 'Upsert',
            Message_Type__c = 'Success',
            Request_Body__c = JSON.serialize(requestBody).abbreviate(131000)
        );
        try{
            parseJSONInputs(body);
            applog.Response_Body__c = JSON.serialize(
                new Map<String, Object>{
                    'description' => new Map<String, Object>{
                    'success' => true,
                    'message' => 'Integration Success, please review application log for the detail',
                    'linkurl' => applog.External_ID__c},
                    'recordIds' => ''
                }
            );
        }catch(Exception ex){
            applog.Error_Message__c = ex.getMessage()+ex.getLineNumber();
            applog.Message_Type__c = 'Fail';
            applog.Response_Body__c = JSON.serialize(
                new Map<String,Object>{
                    'description' => new Map<String,Object>{
                    'success' => false,
                    'message' => ex.getMessage()+ex.getLineNumber(),
                    'linkurl' => applog.External_ID__c}
                }
            );
            ApplicationLogUtils.saveLogInbound(request.requestURI, applog);
        }
        return dto_response.parse(applog.Response_Body__c);
    }
    public static void parseJSONInputs(String body){
        Map<String,Object> parsedBody = (Map<String,Object>) JSON.deserializeUntyped(body);
        List<Object> buyingDailyList = (List<Object>)parsedBody.get('JLIST');
        List<C360_BuyingPerformanceDailyTOP__c> OverdueList = new List<C360_BuyingPerformanceDailyTOP__c>();
        List<Account> accountList = new List<Account>();
        list<string> customerList = new List<string>();
        list<string> productList = new List<string>();
        List<C360_Product__c> sf_productList = new List<C360_Product__c>();
        List<Application_Log__c> insertApplogList = new List<Application_Log__c>();
        List<C360_BuyingPerformanceDailyTOP__c> upsertedBuyingDaily = new List<C360_BuyingPerformanceDailyTOP__c>();
        for(Object rawInput : buyingDailyList){ 
            Map<String, Object> input = (Map<String, Object>) rawInput;
            if(input.get('PRODUCT') != null){
                if(String.valueOf(input.get('PRODUCT')) != ''){
                    productList.add(String.valueOf(input.get('PRODUCT')));
                }
            }
        }
        Map<String,String> productMap = new Map<String,String>();
        if(productList.size() > 0){
            sf_productList = [SELECT Id, MaterialCode__c FROM C360_Product__c where MaterialCode__c in :productList];
            for(C360_Product__c prd : sf_productList){
                productMap.put(prd.MaterialCode__c, prd.Id);
            }
        }
        Id RecordTypeId = [select id from RecordType where DeveloperName = 'TransferJetty'].Id;
        for(Object rawInput : buyingDailyList){ 
            Map<String,Object> input = (Map<String,Object>) rawInput;
            C360_BuyingPerformanceDailyTOP__c buyingDailySF = new C360_BuyingPerformanceDailyTOP__c();
            buyingDailySF.RecordTypeId = RecordTypeId;
            buyingDailySF.CustomerText__c = String.valueOf(input.get('CUSTOMER'));
            if(input.get('PRODUCT') != null && String.valueOf(input.get('PRODUCT')) != ''){
                buyingDailySF.Product__c = (productMap.containsKey(String.valueOf(input.get('PRODUCT')))) ? productMap.get(String.valueOf(input.get('PRODUCT'))) : null; 
            }else{
                buyingDailySF.Product__c = null;
            }
            buyingDailySF.BillingDate__c = StringToDate(String.valueOf(input.get('DATE')));
            buyingDailySF.VesselName__c= String.valueOf(input.get('VESSEL_NAME'));
            buyingDailySF.ShoreTankMT__c = (input.get('QUANTITY_SHORE_METRIC_TONS')!= null && String.valueOf(input.get('QUANTITY_SHORE_METRIC_TONS')) != '') ? Decimal.valueof(String.valueOf(input.get('QUANTITY_SHORE_METRIC_TONS'))) : null;
            buyingDailySF.ShoreTankLitre30__c = (input.get('QUANTITY_SHORE_LITRES_30')!= null && String.valueOf(input.get('QUANTITY_SHORE_LITRES_30')) != '') ? Decimal.valueof(String.valueOf(input.get('QUANTITY_SHORE_LITRES_30'))) : null;
            buyingDailySF.ShipTankMT__c = (input.get('QUANTITY_SHIP_METRIC_TONS')!= null && String.valueOf(input.get('QUANTITY_SHIP_METRIC_TONS')) != '') ? Decimal.valueof(String.valueOf(input.get('QUANTITY_SHIP_METRIC_TONS'))) : null;
            buyingDailySF.ShipTankLitre30__c = (input.get('QUANTITY_SHIP_LITRES_30')!= null && String.valueOf(input.get('QUANTITY_SHIP_LITRES_30')) != '') ? buyingDailySF.ShipTankLitre30__c = Decimal.valueof(String.valueOf(input.get('QUANTITY_SHIP_LITRES_30'))) : null;
            buyingDailySF.DiffShoreVSShipTankMT__c = (input.get('DIFF_METER_SHORE_MT')!= null && String.valueOf(input.get('DIFF_METER_SHORE_MT')) != '') ? Decimal.valueof(String.valueOf(input.get('DIFF_METER_SHORE_MT'))) : null;
            buyingDailySF.DiffShoreVSShipTankLitre30__c = (input.get('DIFF_METER_SHORE_LITRES_30')!= null && String.valueOf(input.get('DIFF_METER_SHORE_LITRES_30')) != '') ? Decimal.valueof(String.valueOf(input.get('DIFF_METER_SHORE_LITRES_30'))) : null;
            buyingDailySF.Destination__c =String.valueOf(input.get('DESTINATION'));
            buyingDailySF.LoadingPort__c= String.valueOf(input.get('JETTY_NO'));
            buyingDailySF.TripNo__c= String.valueOf(input.get('TRIP_NO'));
            buyingDailySF.Tank__c= String.valueOf(input.get('TANK'));
            buyingDailySF.DistributionChannel__c= String.valueOf(input.get('DISTRIBUTION_CHANNEL'));
            buyingDailySF.SalesOrganization__c = '1300';
            buyingDailySF.Key__c = String.valueOf(input.get('DATE')) + String.valueOf(input.get('JETTY_NO')) + String.valueOf(input.get('TRIP_NO')) + String.valueOf(input.get('VESSEL_NAME')) + String.valueOf(input.get('PRODUCT')) + String.valueOf(input.get('TANK')) + String.valueOf(input.get('CUSTOMER')) + String.valueOf(input.get('DESTINATION')) + String.valueOf(input.get('DISTRIBUTION_CHANNEL'));
            upsertedBuyingDaily.add(buyingDailySF);
        }
        if(upsertedBuyingDaily.size() > 0){
            Schema.SObjectField buyingDailyKey = C360_BuyingPerformanceDailyTOP__c.Fields.Key__c;
            List<Database.upsertResult> BuyingDailytList = Database.upsert(upsertedBuyingDaily,buyingDailyKey,false);
            if(BuyingDailytList.size() > 0){
                List<String> BuyingAct_errorMsg_List = new List<String>();
                Map<String,List<String>> BuyingAct_errorMap = new Map<String,List<String>>();
                for(Integer idx = 0; idx < BuyingDailytList.size(); idx++){
                    if(!BuyingDailytList[idx].isSuccess()){
                        BuyingAct_errorMsg_List = new List<String>();
                        for(Database.Error err : BuyingDailytList[idx].getErrors()){
                            BuyingAct_errorMsg_List.add('Field:'+err.getFields()+': '+err.getMessage());
                        }
                        BuyingAct_errorMap.put(BuyingDailytList[idx].getId(),BuyingAct_errorMsg_List);
                    }
                }
                if(BuyingAct_errorMsg_List.size() > 0){
                    Application_Log__c log = new Application_Log__c();
                    log.Method__c = 'Upsert';
                    log.Integration_Name__c = 'C360 Replicated SAP Jetty';
                    log.Log_Type__c = 'Error';
                    log.Message_Type__c = 'Fail';
                    log.Response_Body__c = JSON.serialize(buyingDailyList).abbreviate(131000);
                    log.Error_Message__c = ' C360 BuyingDaily - '+BuyingAct_errorMap.keyset()+' : '+BuyingAct_errorMap.values();
                    log.OwnerId = UserInfo.getUserId();
                    insertApplogList.add(log);
                    if(insertApplogList.size() > 0){
                        insert insertApplogList;}
                }else{
                    Application_Log__c log = new Application_Log__c();
                    log.Method__c = 'Upsert';
                    log.Integration_Name__c = 'C360 Replicated SAP Jetty';
                    log.Log_Type__c = 'Success';
                    log.Message_Type__c = 'Success';
                    log.Response_Body__c = JSON.serialize(buyingDailyList).abbreviate(131000);
                    log.OwnerId = UserInfo.getUserId();
                    insertApplogList.add(log);
                    if(insertApplogList.size() > 0){
                        insert insertApplogList;}
                }
            }
        }
    }
    private static Date StringToDate(String dateString){
        Date output;
        output = Date.valueOf(dateString);
        return output;
    }
}