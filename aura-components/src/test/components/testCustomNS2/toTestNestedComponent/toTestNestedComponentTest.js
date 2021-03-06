({
	labels : ["UnAdaptableTest"],
	
	componentCreated: {},//we use this to store component created in the test, so next test stage can try to access attributes etc
	
	setUp: function(cmp){
		this.componentCreated = undefined;
    },
    
     /***************************************************************************************************************************************************
    	test for nested component
    	this test create a component in a DIFFERENT custom ns(testCustomNS1): componentWithGlobalAccessHasComponentWithDefaultAccessInMarkup
    	the component itself has global access. 
    	it has another component with default access in its markup : componentWithDefaultAccess2
    	componentWithDefaultAccess2 is in the same namespace as componentWithGlobalAccessHasComponentWithDefaultAccessInMarkup
    ****************************************************************************************************************************************************/
    testCreateComponentInDifferentCustomNSWithGlobalAccessHasComponentInSameCustomNSWithDefaultAccessInItsMarkup:{
        test:[
        function canCreateComponent(cmp) {
        	var that = this;
        	var completed = false;
        	$A.createComponent(
                	"markup://testCustomNS1:componentWithGlobalAccessHasComponentWithDefaultAccessInMarkup", 
                	{}, 
                	function(newCmp){
                 		$A.test.assertEquals(newCmp.getName(),"testCustomNS1$componentWithGlobalAccessHasComponentWithDefaultAccessInMarkup");
                		that.componentCreated = newCmp;
                		completed = true;
                	}
                );
                $A.test.addWaitFor(true, function(){ return completed; });
         },
         function canAccessComponentWithPublicAccess(cmp) {
        	 var componentWithDefaultAccess = this.componentCreated.find("componentWithDefaultAccess");
        	 $A.test.assertEquals(componentWithDefaultAccess.getName(),"testCustomNS1$componentWithDefaultAccess2");
         },
         /********************************* tests for attribute ***************************************/
         /*********** access attribute of componentWithDefaultAccess directly ********/
         function canAccessGlobalAttributeInComponentWithDefaultAccess(cmp) {
        	 var componentWithDefaultAccess = this.componentCreated.find("componentWithDefaultAccess");
        	 $A.test.assertEquals(componentWithDefaultAccess.get("v.globalAttribute"), "GLOBAL");
         },
         function cannotAccessPublicAttributeInComponentWithDefaultAccess(cmp) {
         	$A.test.expectAuraError("Access Check Failed!");
        	 var componentWithDefaultAccess = this.componentCreated.find("componentWithDefaultAccess");
        	 componentWithDefaultAccess.get("v.publicAttribute");
         },
         function cannotAccessPrivateAttributeInComponentWithDefaultAccess(cmp) {
         	 $A.test.expectAuraError("Access Check Failed!");
        	 var componentWithDefaultAccess = this.componentCreated.find("componentWithDefaultAccess");
        	 componentWithDefaultAccess.get("v.privateAttribute");
         },
         /*********** access attribute of componentWithDefaultAccess via method in container component ********/
         function canAccessGlobalAttributeInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.setGlobalAttributeInComponentWithDefaultAccess();
        	 $A.test.assertEquals(
        	 this.componentCreated.find("componentWithDefaultAccess").get("v.globalAttribute"), 
        	 "new global");
         },
         function canAccessPublicAttributeInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.setPublicAttributeInComponentWithDefaultAccess();
         },
         //we need to expect aura error twice because set throw error twice
         function cannotAccessPrivateAttributeInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
         	 $A.test.expectAuraError("Access Check Failed!");
         	 $A.test.expectAuraError("Access Check Failed!");
        	 this.componentCreated.setPrivateAttributeInComponentWithDefaultAccess();
         },
         /************************************* tests for method ***************************************/
         /********************* call method of componentWithDefaultAccess directly *********************/
         function canAccessGlobalMethodInComponentWithDefaultAccess(cmp) {
        	 var componentWithDefaultAccess = this.componentCreated.find("componentWithDefaultAccess");
        	 componentWithDefaultAccess.globalMethod();
         },
         function cannotAccessPublicMethodInComponentWithDefaultAccess(cmp) {
        	 $A.test.expectAuraError("Access Check Failed!");
        	 var componentWithDefaultAccess = this.componentCreated.find("componentWithDefaultAccess");
        	 componentWithDefaultAccess.publicMethod();
         },
         function cannotAccessPrivateMethodInComponenWithDefaultAccess(cmp) {
        	 $A.test.expectAuraError("Access Check Failed!");
        	 var componentWithDefaultAccess = this.componentCreated.find("componentWithDefaultAccess");
        	 componentWithDefaultAccess.privateMethod();
         },
         /********* call method of componentWithDefaultAccess via container component's method **********/
         function canAccessGlobalMethodInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.callGlobalMethodInComponentWithDefaultAccess();
         },
         function canAccessPublicMethodInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.callPublicMethodInComponentWithDefaultAccess();
         },
         function cannotAccessPrivateMethodInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
         	 $A.test.expectAuraError("Access Check Failed!");
        	 this.componentCreated.callPrivateMethodInComponentWithDefaultAccess();
         }
         /************************************* tests for component event ********************************/
         //TODO : W-3015661
    ]
    },
    
    /***************************************************************************************************************************************************
    	test for nested component
    	this test create a component in a DIFFERENT custom ns(testCustomNS1): componentWithGlobalAccessHasComponentWithPublicAccessInMarkup
    	the component itself has global access. 
    	it has another component with public access in its markup : componentWithPublicAccess
    	componentWithPublicAccess is in the same namespace as componentWithGlobalAccessHasComponentWithPublicAccessInMarkup
    ****************************************************************************************************************************************************/
    testCreateComponentInDifferentCustomNSWithGlobalAccessHasComponentInSameCustomNSWithPublicAccessInItsMarkup:{
        test:[
        function canCreateComponent(cmp) {
        	var that = this;
        	var completed = false;
        	$A.createComponent(
                	"markup://testCustomNS1:componentWithGlobalAccessHasComponentWithPublicAccessInMarkup", 
                	{}, 
                	function(newCmp){
                 		$A.test.assertEquals(newCmp.getName(),"testCustomNS1$componentWithGlobalAccessHasComponentWithPublicAccessInMarkup");
                		that.componentCreated = newCmp;
                		completed = true;
                	}
                );
                $A.test.addWaitFor(true, function(){ return completed; });
         },
         function canAccessComponentWithPublicAccess(cmp) {
        	 var componentWithPublicAccess = this.componentCreated.find("componentWithPublicAccess");
        	 $A.test.assertEquals(componentWithPublicAccess.getName(),"testCustomNS1$componentWithPublicAccess");
         },
         /********************************* tests for attribute ***************************************/
         /*********** access attribute of componentWithPublicAccess directly ********/
         function canAccessGlobalAttributeInComponentWithPublicAccess(cmp) {
        	 var componentWithPublicAccess = this.componentCreated.find("componentWithPublicAccess");
        	 $A.test.assertEquals(componentWithPublicAccess.get("v.globalAttribute"), "GLOBAL");
         },
         function cannotAccessPublicAttributeInComponentWithPublicAccess(cmp) {
         	$A.test.expectAuraError("Access Check Failed!");
        	 var componentWithPublicAccess = this.componentCreated.find("componentWithPublicAccess");
        	 componentWithPublicAccess.get("v.publicAttribute");
         },
         function cannotAccessPrivateAttributeInComponentWithPublicAccess(cmp) {
         	$A.test.expectAuraError("Access Check Failed!");
        	 var componentWithPublicAccess = this.componentCreated.find("componentWithPublicAccess");
        	 componentWithPublicAccess.get("v.privateAttribute");
         },
         /*********** access attribute of componentWithPublicAccess via method in container component ********/
         function canAccessGlobalAttributeInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.setGlobalAttributeInComponentWithPublicAccess();
        	 $A.test.assertEquals(
        	 this.componentCreated.find("componentWithPublicAccess").get("v.globalAttribute"), 
        	 "new global");
         },
         function canAccessPublicAttributeInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.setPublicAttributeInComponentWithPublicAccess();
         },
         //we need to expect aura error twice because set throw error twice
         function cannotAccessPrivateAttributeInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
         	 $A.test.expectAuraError("Access Check Failed!");
         	 $A.test.expectAuraError("Access Check Failed!");
        	 this.componentCreated.setPrivateAttributeInComponentWithPublicAccess();
         },
         /************************************* tests for method ***************************************/
         /***** call method in componentWithPublicAccess directly ***********/
         function canAccessGlobalMethodInComponentWithPublicAccess(cmp) {
        	 var componentWithPublicAccess = this.componentCreated.find("componentWithPublicAccess");
        	 componentWithPublicAccess.globalMethod();
         },
         function cannotAccessPublicMethodInComponentWithPublicAccess(cmp) {
        	 $A.test.expectAuraError("Access Check Failed!");
        	 var componentWithPublicAccess = this.componentCreated.find("componentWithPublicAccess");
        	 componentWithPublicAccess.publicMethod();
         },
         function cannotAccessPrivateMethodInComponentWithPublicAccess(cmp) {
        	 $A.test.expectAuraError("Access Check Failed!");
        	 var componentWithPublicAccess = this.componentCreated.find("componentWithPublicAccess");
        	 componentWithPublicAccess.privateMethod();
         },
         /***** call method in componentWithPublicAccess via container's method *****/
         function canAccessGlobalMethodInComponentWithPublicAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.callGlobalMethodInComponentWithPublicAccess();
         },
         function canAccessPublicMethodInComponentWithPublicAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.callPublicMethodInComponentWithPublicAccess();
         },
         function cannotAccessPrivateMethodInComponentWithPublicAccessViaMethodInOutsideCmp(cmp) {
         	 $A.test.expectAuraError("Access Check Failed!");
        	 this.componentCreated.callPrivateMethodInComponentWithPublicAccess();
         }
         /************************************* tests for component event ********************************/
         //TODO : W-3015661
    ]
    },
    
     /***************************************************************************************************************************************************
    	test for nested component
    	this test create a component in a DIFFERENT custom ns(testCustomNS1): componentWithGlobalAccessHasComponentWithGlobalAccessInMarkup
    	the component itself has global access. 
    	it has another component with global access in its markup : componentWithGlobalAccess
    	componentWithGlobalAccess is in the same namespace as componentWithGlobalAccessHasComponentWithGlobalAccessInMarkup
    ****************************************************************************************************************************************************/
    testCreateComponentInDifferentCustomNSWithGlobalAccessHasComponentInSameCustomNSWithGlobalAccessInItsMarkup:{
        test:[
        function canCreateComponent(cmp) {
        	var that = this;
        	var completed = false;
        	$A.createComponent(
                	"markup://testCustomNS1:componentWithGlobalAccessHasComponentWithGlobalAccessInMarkup", 
                	{}, 
                	function(newCmp){
                 		$A.test.assertEquals(newCmp.getName(),"testCustomNS1$componentWithGlobalAccessHasComponentWithGlobalAccessInMarkup");
                		that.componentCreated = newCmp;
                		completed = true;
                	}
                );
                $A.test.addWaitFor(true, function(){ return completed; });
         },
         function canAccessComponentWithGlobalAccess(cmp) {
        	 var componentWithGlobalAccess = this.componentCreated.find("componentWithGlobalAccess");
        	 $A.test.assertEquals(componentWithGlobalAccess.getName(),"testCustomNS1$componentWithGlobalAccess");
         },
         /********************************* tests for attribute ***************************************/
         /*********** access attribute of componentWithGlobalAccess directly ********/
         function canAccessGlobalAttributeInComponentWithGlobalAccess(cmp) {
        	 var componentWithGlobalAccess = this.componentCreated.find("componentWithGlobalAccess");
        	 $A.test.assertEquals(componentWithGlobalAccess.get("v.globalAttribute"), "GLOBAL");
         },
         function cannotAccessPublicAttributeInComponentWithGlobalAccess(cmp) {
         	$A.test.expectAuraError("Access Check Failed!");
        	 var componentWithGlobalAccess = this.componentCreated.find("componentWithGlobalAccess");
        	 componentWithGlobalAccess.get("v.publicAttribute");
         },
         function cannotAccessPrivateAttributeInComponentWithGlobalAccess(cmp) {
         	$A.test.expectAuraError("Access Check Failed!");
        	 var componentWithGlobalAccess = this.componentCreated.find("componentWithGlobalAccess");
        	 componentWithGlobalAccess.get("v.privateAttribute");
         },
         /*********** access attribute of componentWithGlobalAccess via method in container component ********/
         function canAccessGlobalAttributeInComponentWithGlobalAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.setGlobalAttributeInComponentWithGlobalAccess();
        	 $A.test.assertEquals(
        	 this.componentCreated.find("componentWithGlobalAccess").get("v.globalAttribute"), 
        	 "new global");
         },
         function canAccessPublicAttributeInComponentWithDefaultAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.setPublicAttributeInComponentWithGlobalAccess();
         },
         //we need to expect aura error twice because set throw error twice
         function cannotAccessPrivateAttributeInComponentWithGlobalAccessViaMethodInOutsideCmp(cmp) {
         	 $A.test.expectAuraError("Access Check Failed!");
         	 $A.test.expectAuraError("Access Check Failed!");
        	 this.componentCreated.setPrivateAttributeInComponentWithGlobalAccess();
         },
         /************************************* tests for method ***************************************/
         /****************** call method of componentWithGlobalAccess directly ***************/
         function canAccessGlobalMethodInComponentWithGlobalAccess(cmp) {
        	 var componentWithGlobalAccess = this.componentCreated.find("componentWithGlobalAccess");
        	 componentWithGlobalAccess.globalMethod();
         },
         function cannotAccessPublicMethodInComponentWithGlobalAccess(cmp) {
        	 $A.test.expectAuraError("Access Check Failed!");
        	 var componentWithGlobalAccess = this.componentCreated.find("componentWithGlobalAccess");
        	 componentWithGlobalAccess.publicMethod();
         },
         function cannotAccessPrivateMethodInComponentWithGlobalAccess(cmp) {
        	 $A.test.expectAuraError("Access Check Failed!");
        	 var componentWithGlobalAccess = this.componentCreated.find("componentWithGlobalAccess");
        	 componentWithGlobalAccess.privateMethod();
         },
         /********** call method of componentWithGlobalAccess via container's method **********/
         function canAccessGlobalMethodInComponentWithGlobalAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.callGlobalMethodInComponentWithGlobalAccess();
         },
         function canAccessPublicMethodInComponentWithGlobalAccessViaMethodInOutsideCmp(cmp) {
        	 this.componentCreated.callPublicMethodInComponentWithGlobalAccess();
         },
         function cannotAccessPrivateMethodInComponentWithGlobalAccessViaMethodInOutsideCmp(cmp) {
         	 $A.test.expectAuraError("Access Check Failed!");
        	 this.componentCreated.callPrivateMethodInComponentWithGlobalAccess();
         }
         /************************************* tests for component event ********************************/
         //TODO : W-3015661
    ]
    },

})