@isTest
public with sharing class CTRDisclaimerControllerTest {
    
    @isTest
    public static void testGeneratePDF(){

        String mRecordId = 'recId';
        String mLanguage = 'lang';
        Map<String, Object> result = CTRDisclaimerController.generatePDF(mRecordId, mLanguage);
        System.assertNotEquals(0, result.size());
    }
}