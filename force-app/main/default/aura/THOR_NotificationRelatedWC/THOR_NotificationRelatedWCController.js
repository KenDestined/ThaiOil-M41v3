({
	doInit: function (component, event, helper) {
		// alert('eoeo');
		window.setTimeout(
			$A.getCallback(function () {
				if (component.get('v.workClearances.length') === 0) {
					helper.getWorkClearances(component, event, helper)
				}
			}),
			500
		);
		helper.setRelatedWorkClearances(component, event );
		helper.hasWriteAccess(component, event);

	},

	navigateToDisplay: function (component, event, helper) {
		var recordId = event.currentTarget.getAttribute("data-record-id");
		var navService = component.find("navService");

		navService.navigate({
			type: "standard__webPage",
			attributes: {
				url: `/one/one.app#${btoa(JSON.stringify({
					componentDef: `c:THOR_WorkClearanceRecordDisplay`,
					attributes: {
						recordId: recordId,
						uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
							let r = Math.random() * 16 | 0,
								v = c == 'x' ? r : (r & 0x3 | 0x8);
							return v.toString(16);
						})
					}
				}))}`
			}
		}, false);
	},
		goToWorkClearance: function (component, event, helper) {
		var recordId = event.currentTarget.getAttribute("data-record-id")
		var navService = component.find("navService")

		navService.navigate({
			type: "standard__webPage",
			attributes: {
				url: `/one/one.app#${btoa(JSON.stringify({
					componentDef: `c:THOR_WorkClearanceRecordDisplay`,
					attributes: {
						recordId: recordId,
						uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
							let r = Math.random() * 16 | 0,
								v = c == 'x' ? r : (r & 0x3 | 0x8);
							return v.toString(16);
						})
					}
				}))}`
			}
		}, false)
	},

	toggleAccordion: function (component, event, helper) {
		let index;
		if (typeof event.getSource === "function") {
			index = event.getSource().get("v.value")
		}
		if (typeof event.currentTarget.dataset === "object") {
			index = event.currentTarget.dataset.index
		}
		let workClearances = component.get("v.RelatedWorkClearances")
		workClearances[index].WorkClearance.showHistory = !workClearances[index].WorkClearance.showHistory
		component.set("v.RelatedWorkClearances", workClearances)

		event.stopPropagation()
	}
})



// ({
//     doInit : function(component, event, helper) {
//         helper.retrieveRelated(component, event);
//         helper.checkWriteAccess(component);
//     },

//     goToNewPage: function(component, event, helper) {
//         event.preventDefault();
//         let eqccId = event.target.classList.value;

//         let navLink = component.find("navService");
//         let pageRef = {
//             type: "standard__component",
//           attributes: {
//                componentName: 'c__THOR_EQCCHeaderRecordDisplay',
//           },
//            state: {
//                c__recordId: eqccId
//             }
//         };
//         navLink.navigate(pageRef, true);
//     },

//     // showCheckedSheetCreation: function(component, event, helper) {
//     //     let scrollAction;
//     //     switch(event.getParam("value")){
//     //         case "Cancel":
//     //             helper.retrieveRelated(component, event);
//     //             break;

//     //         case "Delete":
//     //             var recordToDelete = event.detail.menuItem.get('v.class');
//     //             component.set("v.recordToDelete", recordToDelete);
//     //             component.set("v.showConfirmModal", true);
//     //             component.set("v.showConfirmModal", true);
//     //             scrollAction = component.get('c.scrollToTop');
//     //             break;

//     //         default:
//     //             component.set('v.csEQCCId', event.getParam("value"));
//     //             component.set("v.isCreateCheckedSheetOpen", true);
//     //             component.set("v.showConfirmModal", true);
//     //             scrollAction = component.get('c.scrollToTop');
//     //             break;
//     //     }
//     // },

//     // handleEQCCCreation: function(cmp, event, helper){
//     //     //cmp.set("v.isCreateHeaderOpen", false);
//     //     cmp.set("v.isCreateCheckedSheetOpen", false);
//     //     helper.retrieveRelated(cmp, event);
//     // },

//     goToWcForm: function(component, event, helper) {
//         // alert(component.get('v.recordId'));
//         // alert('HI');

//         component.set("v.showCreateModal", "true");
//     },

//     cancleConfirm: function(component, event, helper){
//         component.set("v.showConfirmModal", false);
//         component.set("v.recordToDelete", '');
//     },

//     deleteConfirm: function(component, event, helper){
//         var recordToDelete = component.get("v.recordToDelete");
//         component.set("v.recordToDelete", '');
//         helper.deleteEQCC(component, event, helper, recordToDelete);
//         component.set("v.showConfirmModal", false);
//     },

//     closeCreateModal: function(component, event, helper){
//         component.set("v.showCreateModal", "false");
//     },

//     scrollToTop: function() {
//         console.log('asdasdasdasdasd');
//         var scrollOptions = {
//             left: 0,
//             top: 0,
//             behavior: 'smooth'
//         }
//         window.scrollTo(scrollOptions);
//     }
// })