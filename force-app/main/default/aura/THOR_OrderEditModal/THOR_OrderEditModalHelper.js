({
	makeToast: function (type, title, message) {
		var toastEvent = $A.get('e.force:showToast');
		toastEvent.setParams({
			title: title,
			message: message,
			type: type
		});
		toastEvent.fire();
	},

	parseObject: function (obj) {
		return obj ? JSON.parse(JSON.stringify(obj)) : obj;
	},
	debounce: function (component, func, wait) {
		var timeout = component.get('v.timeout');
		return $A.getCallback(function () {
			var context = this,
				args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				timeout = null;
				func.apply(context, args);
			}, wait);
			component.set('v.timeout', timeout);
		});
	},

	retrievePMActivityTypeOptions: function (component, event, orderType) {
		let action = component.get('c.getPMActivityType');
		action.setParams({
			orderType: orderType
		});
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === 'SUCCESS') {
				let pmActivityTypes = response.getReturnValue();
				component.set('v.pmActivityTypeOptions', pmActivityTypes);
				component.set('v.pmActivityTypesFilteredAndSearched', pmActivityTypes);
			} else if (state === 'INCOMPLETE') {
				// do something
			} else if (state === 'ERROR') {
				let errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.error('Error message: ' + errors[0].message);
					}
				} else {
					console.log('Unknown error');
				}
			}
			component.set('v.isLoading', false);
		});
		component.set('v.isLoading', true);
		$A.enqueueAction(action);
	},

	retrieveMainWorkCenterOptions: function (component, event) {
		let action = component.get('c.getMainWorkCenters');
		// action.setParams({
		//     mainWorkCenterPlantId: component.get("v.mainWorkCenterPlantValue")
		// });
		if (!component.get('v.mainWorkCenterPlantValue')) {
			action.setParams({
				mainWorkCenterPlantId: null
			});
		} else {
			action.setParams({
				mainWorkCenterPlantId: component.get('v.mainWorkCenterPlantValue')
			});
		}
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === 'SUCCESS') {
				let mainWorkCenters = response.getReturnValue();
				component.set('v.mainWorkCenterOptions', mainWorkCenters);
				component.set('v.mainWorkCentersFilteredAndSearched', mainWorkCenters);
			} else if (state === 'INCOMPLETE') {
				// do something
			} else if (state === 'ERROR') {
				let errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.error('Error message: ' + errors[0].message);
					}
				} else {
					console.log('Unknown error');
				}
			}
			component.set('v.isLoading', false);
		});
		component.set('v.isLoading', true);
		$A.enqueueAction(action);
	},

	retrieveMainWorkCenterPlantOptions: function (component, event) {
		let action = component.get('c.getMainWorkCenterPlants');
		action.setParams({
			mainWorkCenterId: component.get('v.mainWorkCenterValue')
		});
		action.setCallback(this, function (response) {
			let state = response.getState();
			if (state === 'SUCCESS') {
				let mainWorkCenters = response.getReturnValue();
				component.set('v.mainWorkCenterPlantOptions', mainWorkCenters);
				component.set('v.mainWorkCenterPlantsFilteredAndSearched', mainWorkCenters);
			} else if (state === 'INCOMPLETE') {
				// do something
			} else if (state === 'ERROR') {
				let errors = response.getError();
				if (errors) {
					if (errors[0] && errors[0].message) {
						console.error('Error message: ' + errors[0].message);
					}
				} else {
					console.log('Unknown error');
				}
			}
			component.set('v.isLoading', false);
		});

		component.set('v.isLoading', true);
		$A.enqueueAction(action);
	},

	getPISRequester: function (component, fieldName, searchText) {
		var helper = this;
		var action = component.get('c.getPISRequester');
		action.setParams({
			searchText: searchText
		});
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === 'SUCCESS') {
				var result = response.getReturnValue();
				component.set(
					`v.formOption.${fieldName}`,
					result.map((m) => {
						const { ENFIRSTNAME__c, ENLASTNAME__c, Name } = m;
						m.ENFIRSTNAME__c = !ENFIRSTNAME__c || !ENLASTNAME__c ? Name : ENFIRSTNAME__c;
						m.avatar = (ENFIRSTNAME__c ? ENFIRSTNAME__c[0] : '') + (ENLASTNAME__c ? ENLASTNAME__c[0] : '');
						return m;
					})
				);
			} else {
				var errors = response.getError();
				console.error(JSON.parse(JSON.stringify(errors)));
			}
		});
		$A.enqueueAction(action);
	}
});