public class CTRDisclaimerController {
    @AuraEnabled
    public static  Map<String, Object> generatePDF(String mRecordId, String mLanguage){
        Map<String, Object> response = new Map<String, Object>();
        try {
            PageReference pageRef = Page.CTRDisclaimerPDF;
            pageRef.getParameters().put('recordId',mRecordId);
            pageRef.getParameters().put('selectedLanguage',mLanguage);
            response.put('Success', true);
            response.put('Message', 'Success');
            response.put('PDFContent', EncodingUtil.base64Encode(pageRef.getContentAsPDF()));
        } catch (Exception e) {
            response.put('Success', false);
            response.put('Message', e.getMessage());    
        }
        return response;
    }

    // @AuraEnabled
    // public static String SetRecordId(String OrderRecId) {               
    //     PageReference pageRef= Page.myorderexcel;
    //     pageRef.getParameters().put('Id',OrderRecId);
    //     return EncodingUtil.base64Encode(pageRef.getContentAsPDF());
    // }
}