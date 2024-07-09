({
	fireEventChangeValuewithAPI : function(component) 
  {
    if(component.get('v.fieldApi'))
    {
      var compEvents = component.getEvent("OnChangePicklist");
      compEvents.setParams({ "Index" : component.get('v.Index'),
                                "Label" : component.get('v.fieldLabel'),
                                "Api" : component.get('v.fieldApi'),
                                "Value" : component.get('v.selectedValue')
                               });
          compEvents.fire();
		  console.log('fieldLabel :'+component.get('v.fieldLabel'));
		  console.log('fieldApi :'+component.get('v.fieldApi'));
		  console.log('selectedValue :'+component.get('v.selectedValue'));
    }

  },

  generatePicklistOption : function (component, event, helper) {
		//if(component.get('v.isLoaded'))
			//{
		if(component.get('v.selectedValue') && component.get('v.picklistOptions'))
			{
				var list = component.get('v.picklistOptions');
				// console.log(list+' = '+JSON.stringify(list));
				for(var i=0;i<list.length;i++)
				{
					if(component.get('v.selectedValue') == list[i].value)
					{
						component.set("v.currentText", list[i].label);
					}
				}
						var resultBox = component.find('resultBox');
						$A.util.removeClass(resultBox, 'slds-is-open');
	
			}
	//}
	},
})