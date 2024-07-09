({
	doInit: function (component, event, helper) 
	{
		var picklistOptionJsonStr = component.get('v.picklistOptionsStr');
		console.log('Debug picklistOptionsStr ',picklistOptionJsonStr)
		if(picklistOptionJsonStr) {
			component.set('v.picklistOptions',JSON.parse(picklistOptionJsonStr));
			// console.log('Debug new picklistOptions',component.get('v.picklistOptions'))
		}
		
		helper.generatePicklistOption(component, event, helper);
	},

	handleChangeOption : function (component, event, helper) {
		helper.generatePicklistOption(component, event, helper)
	},

	//when clicking on field
	getPickListValues : function(component, event, helper) 
	{
		var newList=[];
		var list = component.get('v.picklistOptions');
		//const list = ['Apples','Apricots','Avocados','Bananas','Blueberries','Cherries','Grapefruit','Jackfruit','Kiwi','Lime','Mango','Oranges','Peach','Raspberries','Tomato','Watermelon'];
		//component.set("v.picklistFiltered", list);

		var resultBox = component.find('resultBox');
		if(component.get("v.currentText")) 
		{
			for(var i=0;i<list.length;i++)
			{
				var iterator= list[i].label;
				if(iterator.toLowerCase().includes(component.get("v.currentText").toLowerCase()))
				{
					newList.push(list[i]);
				}
			}
			component.set("v.picklistFiltered", newList);
			
			if(component.get("v.picklistFiltered").length == 0) 
			{
				$A.util.removeClass(resultBox, 'slds-is-open');
			}
			else
			{
				$A.util.addClass(resultBox, 'slds-is-open');
			}
		}
		else
		{
			for(var i=0;i<list.length;i++)
			{
				var iterator= list[i].label;
				newList.push(list[i]);
			}
			component.set("v.picklistFiltered", newList);
			$A.util.addClass(resultBox, 'slds-is-open');
		}
	},

	// When user types the value in field
	searchField : function(component, event, helper) {
		var list = component.get('v.picklistOptions');
		//const list = ['Apples','Apricots','Avocados','Bananas','Blueberries','Cherries','Grapefruit','Jackfruit','Kiwi','Lime','Mango','Oranges','Peach','Raspberries','Tomato','Watermelon'];
		//component.set("v.picklistFiltered", list);
		var resultBox = component.find('resultBox');
		var currentText =event.getSource().get("v.value");
		component.set("v.currentText", currentText);
		component.set("v.selectedValue", '');
		
		var newList=[];
		if(currentText.length > 0) 
		{
			for(var i=0;i<list.length;i++)
			{
				var iterator= list[i].label;
				if(iterator.toLowerCase().includes(currentText.toLowerCase()))
				{
					newList.push(list[i]);
				}
				if(iterator.toLowerCase() == currentText.toLowerCase())
				{
					component.set("v.selectedValue", list[i].value);
				}
			}
			component.set("v.picklistFiltered", newList);
			helper.fireEventChangeValuewithAPI(component);
			
			if(component.get("v.picklistFiltered").length == 0) 
			{
				$A.util.removeClass(resultBox, 'slds-is-open');
			}
			else
			{
				$A.util.addClass(resultBox, 'slds-is-open');
			}
		}
		else 
		{
			component.set("v.selectedValue", '');
			helper.fireEventChangeValuewithAPI(component);
			$A.util.addClass(resultBox, 'slds-is-open');
		}
	},

	//When user selects a record, set it as selected
	setSelectedRecord : function(component, event, helper) 
	{
		component.set("v.currentText", event.currentTarget.dataset.name);
		component.set("v.selectedValue", event.currentTarget.dataset.value);
		helper.fireEventChangeValuewithAPI(component);
		var resultBox = component.find('resultBox');
		$A.util.removeClass(resultBox, 'slds-is-open');
	}, 

	//Function when user clicks outside Component to close the dropdown list
	closeDropDown : function(component, event, helper) 
	{
		var resultBox = component.find('resultBox');
		$A.util.removeClass(resultBox, 'slds-is-open');
	},
	validateField: function (component, event, helper) 
	{
		console.log('required: ',component.get("v.required"),' || disabled: ',component.get("v.disabled"), '|| value: ', component.get('v.selectedValue'));
		var fieldName = 'userinput';
        var cmp = component.find(fieldName);
		console.log('1');
        var value = component.get('v.selectedValue');
		

        var errorFields = [];
        if (component.get("v.required") == true && component.get("v.disabled") == false && !value) 
		{
			console.log('2');
            // if(!$A.util.hasClass(cmp,'slds-has-error')) {
			//$A.util.addClass(cmp, "dropdownRequiredPosition");
            $A.util.addClass(cmp, "slds-has-error");
            $A.util.addClass(component.find('error-' + fieldName), "custom-error-enabled");
            // }
        } else {
			console.log('3');
			//$A.util.removeClass(cmp, "dropdownRequiredPosition");
            $A.util.removeClass(cmp, "slds-has-error");
            $A.util.removeClass(component.find('error-' + fieldName), "custom-error-enabled");
        }
    },
})