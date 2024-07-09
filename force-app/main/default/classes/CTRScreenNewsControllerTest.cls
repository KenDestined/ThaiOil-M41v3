@isTest
public with sharing class CTRScreenNewsControllerTest {
    // @TestSetup
    // static void makeData(){
    //     CTRRequestFormHeader__c reqFormHeader = new CTRRequestFormHeader__c();
    //     reqFormHeader.Name ='Test Header';
    //     insert reqFormHeader;

    //     // [Start]Have History Saved CTRNewsItem__c

    //     List<CTRRequestFormItem__c> reqItemList = new List<CTRRequestFormItem__c>();
    //     CTRRequestFormItem__c  reqFormItem = new CTRRequestFormItem__c ();
    //     reqFormItem.Name ='Test';
    //     reqFormItem.CTRRequestFormHeader__c = reqFormHeader.Id;
    //     reqItemList.add(reqFormItem);

    //     CTRNewsHeader__c newsHeader = new CTRNewsHeader__c();
    //     newsHeader.Keyword__c = 'Money Laundering';
    //     newsHeader.CTRRequestFormItem__c = reqFormItem.id;
    //     insert newsHeader;
    //     //[End]

    //     // [Start]Don't have save CTRNewsItem__c
    //     CTRRequestFormItem__c  reqFormItemFirstTime = new CTRRequestFormItem__c ();
    //     reqFormItemFirstTime.Name ='Test FirstTime';
    //     reqFormItemFirstTime.CTRRequestFormHeader__c = reqFormHeader.Id;
    //     reqItemList.add(reqFormItemFirstTime);
    //     insert reqItemList;

        

    //     CTRNews__c ctrNews = new CTRNews__c();
    //     ctrNews.Headline__c = 'Headline Test';
    //     ctrNews.Date__c = System.today().addDays(-10);
    //     ctrNews.SourceURL__c = 'https://www/isranews.org/';
    //     ctrNews.SourceURL__c = 'Keyword__c';
    //     ctrNews.RequestFormHeader__c = reqFormHeader.id;
    //     ctrNews.Keyword__c = 'ฟอกเงิน';
    //     insert ctrNews;
        
        
    //     CTRNewsHeader__c newsHeaderirstTime = new CTRNewsHeader__c();
    //     newsHeaderirstTime.Keyword__c = 'Money Laundering';
    //     newsHeaderirstTime.CTRRequestFormItem__c = reqFormItemFirstTime.id;
    //     insert newsHeaderirstTime;
    //     //[End]

    //     CTRNewsItem__c newsItem = new CTRNewsItem__c();
    //     newsItem.CTRNewsHeader__c = newsHeader.id;
    //     newsItem.CTRNews__c = ctrNews.Id;
    //     newsItem.Flag__c = true;
    //     insert newsItem;

    //     CTRNewsItem__c newsItem2 = new CTRNewsItem__c();
    //     newsItem2.CTRNewsHeader__c = newsHeaderirstTime.id;
    //     newsItem2.CTRNews__c = ctrNews.Id;
    //     newsItem2.Flag__c = true;
    //     insert newsItem2;


    //     CTRNewsItem__c newsItemFlagTrue = new CTRNewsItem__c();
    //     newsItemFlagTrue.CTRNewsHeader__c = newsHeader.id;
    //     newsItemFlagTrue.Flag__c = true;
    //     newsItem.CTRNews__c = ctrNews.Id;
    //     insert newsItemFlagTrue;

        
    // }
    @isTest
    public static void getCTRNewsConditionIfTest() {
        CTRRequestFormHeader__c reqFormHeader = new CTRRequestFormHeader__c();
        reqFormHeader.Name ='Test Header';
        insert reqFormHeader;

        CTRRequestFormItem__c  reqItem = new CTRRequestFormItem__c ();
        reqItem.Name ='Test FirstTime';
        reqItem.CTRRequestFormHeader__c = reqFormHeader.Id;
        insert reqItem;

        CTRNews__c ctrNews = new CTRNews__c();
        ctrNews.Headline__c = 'Headline Test';
        ctrNews.Date__c = System.today().addDays(-10);
        ctrNews.SourceURL__c = 'https://www/isranews.org/';
        ctrNews.SourceURL__c = 'Keyword__c';
        ctrNews.RequestFormHeader__c = reqFormHeader.id;
        ctrNews.Keyword__c = 'ฟอกเงิน';
        insert ctrNews;
        
        CTRNewsHeader__c newsHeaderirstTime = new CTRNewsHeader__c();
        newsHeaderirstTime.Keyword__c = 'Money Laundering';
        newsHeaderirstTime.CTRRequestFormItem__c = reqItem.id;
        insert newsHeaderirstTime;

        CTRNewsItem__c newsItem = new CTRNewsItem__c();
        newsItem.CTRNewsHeader__c = newsHeaderirstTime.id;
        newsItem.CTRNews__c = ctrNews.Id;
        newsItem.Flag__c = true;
        insert newsItem;
        
        List<CTRRequestFormItem__c> formItem = [SELECT Id,Name FROM CTRRequestFormItem__c limit 1];
        Test.startTest();
        CTRScreenNewsController.getCTRNews(reqItem.Id, 'CTRRequestFormItem__c');
        List<CTRScreenNewsController.NewsGroup> ctrNewsList = CTRScreenNewsController.getCTRNews(reqItem.Id, 'CTRRequestFormItem__c');
        String ComplianceRiskNews = 'Yes';
        CTRScreenNewsController.saveCTRNewsItem(reqItem.Id, ctrNewsList, ComplianceRiskNews, 'CTRRequestFormItem__c');

        CTRScreenNewsController.getComplianceNews(reqItem.Id, 'CTRRequestFormItem__c');
        Test.stopTest();
    }

    // @isTest
    // public static void getCTRNewsConditionElseTest() {
    //     CTRRequestFormItem__c newsItemFirstTime = [SELECT Id FROM CTRRequestFormItem__c limit 1];
    //     Test.startTest();
    //     CTRScreenNewsController.getCTRNews(newsItemFirstTime.Id, 'CTRRequestFormItem__c');
    //     Test.stopTest();
    // }

    // @isTest
    // public static void saveCTRNewsItemTest() {
    //     CTRRequestFormItem__c saveNewsItem = [SELECT Id FROM CTRRequestFormItem__c limit 1];
    //     List<CTRScreenNewsController.NewsGroup> ctrNewsList = CTRScreenNewsController.getCTRNews(saveNewsItem.Id, 'CTRRequestFormItem__c');
    //     String ComplianceRiskNews = 'Yes';
    //     Test.startTest();
    //     CTRScreenNewsController.saveCTRNewsItem(saveNewsItem.Id, ctrNewsList, ComplianceRiskNews, 'CTRRequestFormItem__c');
    //     Test.stopTest();
    // }

    // @isTest
    // public static void getComplianceNewsTest() {
    //     CTRRequestFormItem__c reqItem = [SELECT Id FROM CTRRequestFormItem__c limit 1];
    //     Test.startTest();
    //     CTRScreenNewsController.getComplianceNews(reqItem.Id, 'CTRRequestFormItem__c');
    //     Test.stopTest();
    // }
}