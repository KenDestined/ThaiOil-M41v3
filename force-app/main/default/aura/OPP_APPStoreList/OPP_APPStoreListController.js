({
	init : function(component, event, helper) {
        console.log("init");
		helper.loadCategories(component, event, helper);
		//helper.loadNotiApp(component, event, helper);
        // helper.getApps(component);
	},
    refresh: function(component, event, helper) {
        var a = component.get("c.init");
        $A.enqueueAction(a);
    },
    
    // getSelected : function(component,event,helper){
    //     // display modle and set seletedDocumentId attribute with selected record Id   
    //     component.set("v.hasModalOpen" , true);
    //     component.set("v.selectedDocumentId" , event.currentTarget.getAttribute("data-Id")); 
        
    // },
    getSelected : function(component,event,helper){
        //var appId = event.getSource().get("v.value");
        var appId = event.currentTarget.getAttribute("data-id");
        var action = component.get("c.getListofNotifications");

        var appName = event.currentTarget.getAttribute("data-name");
        component.set("v.appName" , appName);
        
        var appUrl = event.currentTarget.getAttribute("data-url");
        component.set("v.appUrl" , appUrl);
        // alert(appId);
        action.setParams({"AppId":appId});
        
        
        action.setCallback(this,function(result)
                           {
                               var state = result.getState();
                               if (state =="SUCCESS")
                               {
                                   var v=result.getReturnValue();
                                   if(v == null || v == '')
                                   {
                                       //alert("No contact Record Exists for this Account");
                                       component.set("v.Notis",'');
                                   }
                                   else
                                   {                                     
                                       component.set("v.Notis",result.getReturnValue());
                                       
                                   }
                               }
                           });
        $A.enqueueAction(action);
        // display modle and set seletedDocumentId attribute with selected record Id   
        component.set("v.hasModalOpen" , true);
        component.set("v.selectedDocumentId" , event.currentTarget.getAttribute("data-Id")); 
        
    },
    closeModel: function(component, event, helper) {
        // for Close Model, set the "hasModalOpen" attribute to "FALSE"  
        component.set("v.hasModalOpen", false);
        component.set("v.selectedDocumentId" , null); 
    },
})