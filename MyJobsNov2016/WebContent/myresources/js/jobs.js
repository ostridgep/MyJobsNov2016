

html5sql.openDatabase("com.aws.myjobs","myjobs", 5*1024*1024);		

var statusUpdateDate="";
var statusUpdateTime="";
var map,

jobLat,
jobLon,
currentLat,
currentLon,
currentPosition,
directionsDisplay, 
directionsService;
 
var previousFloc;
//var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout("L1");
var selectedFloc;
var formtab=null;
var tabBar=null;
var selectedFormMPoint;
var selectedFormQuestionGroup;
var selectedFormQuestionGroupTitle;
var CurrentOrderNo="";
var CurrentOpNo="";
var CurrentJobWorkCentre=""
var CurrentJobWorkCentreOp=""
var CurrentJobFL=""
var CurrentJobEQ=""
var CurrentJobProfile=""
var currentNotifNo="";
var currentNotifId="";
var followOnWork=""
var currentOrderListItem="";
var tabContents=[]
var tabFieldCnt=0
var selectedOrderAssetID='';
var selectedReserverMaterial='';
var selectedHistoryDocument='';
var currentEquipment_GIS="";
var currentFuncLoc_GIS=""; 
var selectedJobArray=[];

var selectedPhoto="";
var selectedPhotoDir="";
var selevctedMPDecimals=0;
var selevctedMPLength=0;
var mandatedDG5=[]
var mandatedPIA=[]
//var scanner = cordova.require("cordova/plugin/BarcodeScanner");
var eqAttributes = new 		sap.ui.core.HTML({
	content: '<TABLE width="90%">'+
	'<TR><TD width="20%"><B>Asset:</B></TD><TD id="asset" colspan="3"><input value="123-gdgdgdgdgdgdgd" readonly></TD></TR>'+
	'<TR><TD width="20%"><B>Make:</B></TD><TD width="30%" id="make">Ford</TD><TD width="20%"><B>Model:</B></TD><TD width="30%" id="maode">escort</TD></TR>'+
	'<TR><TD width="20%"><B>Serial No:</B></TD><TD id="serialno" colspan="3">12345</TD></TR><TR><TD colspan="4"></TD</TR>'+
	'<TR><TD></TD><TD colspan="2" ><B>attribute1:</B></TD><TD id="val1" >value</TD></TR>'+
	'</TABLE>'


})
			var eqAttributes1 = new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
new 		sap.ui.core.HTML({
	content: '<B>Asset</B>'}),
				//	new sap.m.Label({
				//		text: 'Asset'
				//	}),
					new sap.m.Input("attrEQ",{type: sap.m.InputType.Input,value: "123 - Description", enabled: false}),
					new sap.m.Label({
						
						text: 'Make'
					}),
					new sap.m.Input("attrMake",{type: sap.m.InputType.Input,value: "Make", enabled: false}),
					new sap.m.Label({
						
						width:"2em",
						text: 'Model'
					}),
					new sap.m.Input("attrModel",{type: sap.m.InputType.Input,value: "model", enabled: false}),
					new sap.m.Label({
						text: 'attr1'
					}),
					new sap.m.Input("attrAttr0",{type: sap.m.InputType.Input,value: "model", enabled: false}),
					new sap.m.Label({
						text: 'attr2'
					}),
					new sap.m.Input("attrAttr1",{type: sap.m.InputType.Input,value: "attr", enabled: false}),					

				]
			});
var flocList = new sap.m.List("flocList",{
	mode: sap.m.ListMode.SingleSelectLeft,
	 itemPress:[function(oEvt) {	
		 selectedFloc=oEvt.getParameter("listItem").getId()
		  buildFlocList(oEvt.getParameter("listItem").getId())
}],
select:[function(oEvt) {	
	selectedFloc=oEvt.getParameter("listItem").getId()
	sap.ui.getCore().getElementById("NewFuncLoc").setValue(selectedFloc)
					    	formSelectFloc.close()
	 
}]
		  });
var CloseError=''
var startFloc=""
var selectedTab="";
var TabsFieldCnt=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var Longtext;
var JobType=""
var currentStatus;
var currentPostcode;
var currentJob;
var firstJob="";
var EmployeeID = localStorage.getItem("EmployeeID")
//var MapJob=getURLParameters("MapJob");
//MapJob1=MapJob+":"
//MapJobPar=MapJob1.split(":")
var selectedListItem=0;
var Locs = [
            {
                lat: 45.4654,
                lon: 9.1866,
                title: 'Start',
                html: '<h3>Start</h3>'
            },
            {
        		lat: 45.4654,
                lon: 9.1866,
        		title: 'Finish',
        		html: '<h3>Finish</h3>'
            }
        ];
function loadLastSyncValues(){
	sap.ui.getCore().getElementById('lastSyncServer').setValue(localStorage.getItem('ServerName'))
	sap.ui.getCore().getElementById('RefDate').setText("Reference: "+formatDateTime(localStorage.getItem('LastSyncReference')))
	sap.ui.getCore().getElementById('TrxDate').setText("Transactional: "+formatDateTime(localStorage.getItem('LastSyncTransactional')))
	sap.ui.getCore().getElementById('UplDate').setText("Upload: "+formatDateTime(localStorage.getItem('LastSyncUpload')))
	sap.ui.getCore().getElementById('lastSyncReferenceData').setValue(localStorage.getItem('LastSyncReferenceDetails'))
	sap.ui.getCore().getElementById('lastSyncTransactionalData').setValue(localStorage.getItem('LastSyncTransactionalDetails'))
	sap.ui.getCore().getElementById('lastSyncUploadData').setValue(localStorage.getItem('LastSyncUploadDetails'))
	if(localStorage.getItem('Trace')=="ON"){
		sap.ui.getCore().getElementById('lastSyncLogState').setState(true)
	}else{
		sap.ui.getCore().getElementById('lastSyncLogState').setState(false)
	}
	
}

var formEQAttr = new sap.m.Dialog("dlgEQAttr",{
    title:"Attributes",
    modal: true,
    //contentWidth:"1em",
    buttons: [
   
				new sap.m.Button({
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formEQAttr.close()
						  } ]
				})
				],					
    content:[

	         ],
	         contentWidth:"50%",
	            contentHeight: "50%",
	            beforeOpen:function(){
	            	if(this.getContent().length==0){
	            		this.addContent(frmEQAttr)
	           			 }
	            	
					}
})
 
var formLastSync = new sap.m.Dialog("dlgLastSync",{
    title:"Last Synchronise",
    modal: true,
    contentWidth:"1em",
    buttons: [
   
				new sap.m.Button("dlgLastSyncCancel", {
				    text: "Cancel",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formLastSync.close()
						  } ]
				})
				],					
    content:[
 			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
							
			                new sap.m.Label({text:"Server"}),
							new sap.m.Input("lastSyncServer",{type: sap.m.InputType.Input, enabled: false}),
							new sap.m.Label("RefDate",{text:"Reference Data"}),
							new sap.m.TextArea("lastSyncReferenceData",{enabled: false}),
					        new sap.m.Label("TrxDate",{text:"Sync Transactional Data"}),
							new sap.m.TextArea("lastSyncTransactionalData",{enabled: false}),
							new sap.m.Label("UplDate",{text:"Sync Upload Data"}),
							new sap.m.TextArea("lastSyncUploadData",{enabled: false}),
							new sap.m.Label({text:"Logging"}),
							new sap.m.Switch('lastSyncLogState',{
								state: true,
								enabled: false,
								type: sap.m.SwitchType.AcceptReject
							})

									 
					
			               
			                 
						]
 					})

            ]
 })
var formMeasPoints = new sap.m.Dialog("dlgMeasPoints",{
    title:"Measurement Points",
    modal: true,
    contentWidth:"1em",
    buttons: [
   
				new sap.m.Button( {
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formMeasPoints.close()
						  } ]
				})
				],					
    content:[
 			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
							
			                
							new sap.m.Table("MPTable",{
								mode: sap.m.ListMode.SingleSelectMaster,
								selectionChange: function(evt){

									selectedMPoint=evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()+":"+evt.getParameter("listItem").getCells()[3].getText()+":"+evt.getParameter("listItem").getCells()[4].getText()
									this.removeSelections()
									if(currentStatus=="SITE"){
										formMPoint.open()
									}
									
							    },
								
								columns:[
								         new sap.m.Column({header: new sap.m.Label({text:"Id"}),
								        	 hAlign: 'Left',width: '15%', minScreenWidth : "" , demandPopin: false}),
								         new sap.m.Column({header: new sap.m.Label({text:"Position"}),
								        	 hAlign: 'Left',width: '19%',minScreenWidth : "" , demandPopin: true}),
							        	 new sap.m.Column({header: new sap.m.Label({text:"Description"}),
									         hAlign: 'Left',width: '20%',minScreenWidth : "" , demandPopin: true}),
								         new sap.m.Column({header: new sap.m.Label({text:"UOM"}),
								        	 hAlign: 'Left',width: '10%', minScreenWidth : "" , demandPopin: false}),
								         new sap.m.Column({header: new sap.m.Label({text:"Code"}),
								        	 hAlign: 'Left',width: '08%',minScreenWidth : "" , demandPopin: true}),			
								         new sap.m.Column({header: new sap.m.Label({text:"Reading"}),
								        	 hAlign: 'Left',width: '08%',minScreenWidth : "" , demandPopin: true}),	
								         new sap.m.Column({header: new sap.m.Label({text:"Notes"}),
								        	 hAlign: 'Left',width: '20%',minScreenWidth : "" , demandPopin: true })       	                         
						           	     ]
						           	  

							})

									 
					
			               
			                 
						]
 					})

            ],
            contentWidth:"80%",
            contentHeight: "80%",
			 beforeOpen:function(){
	            	BuildMeasPointTable();
	            	
	            	
					}
 })
 function BuildMeasPointTable(){
	if(CurrentJobEQ.length>0){
		objectID=CurrentJobEQ;
	}else{
		objectID=CurrentJobFL;
	}
html5sql.process("select distinct mp.object_id, mp.meas_point, mp.psort, mp.pttxt , mp.unit_meas, mpd.code, mpd.value, mpd.shorttext from myjobdetsmpoints as mp left JOIN mympointdocs as mpd  ON mp.meas_point = mpd.meas_point where object_id = '"+objectID+"' order by mp.meas_point",
		 function(transaction, results, rowsArray){

			if(rowsArray.length>0){
				var n = 0;
				var opTable = sap.ui.getCore().getElementById('MPTable');
				sap.ui.getCore().getElementById('MPTable').destroyItems();
				while (n < rowsArray.length) {
					
			
					opTable.addItem (new sap.m.ColumnListItem({
						cells : 
							[
							new sap.m.Text({text: rowsArray[n].meas_point}),
							new sap.m.Text({text: rowsArray[n].psort}),
							new sap.m.Text({text: rowsArray[n].pttxt}),
							new sap.m.Text({text: rowsArray[n].unit_meas}),
							new sap.m.Text({text: rowsArray[n].code}),
							new sap.m.Text({text: rowsArray[n].value}),
							new sap.m.Text({text: rowsArray[n].shorttext})   
							]
						}));
					n++;
				 }
			
		 }
},
		 function(error, statement){
	opMessage("Error: " + error.message + " when reading mps processing " + statement);
		 }        
		);
}
var formDG5 = new sap.m.Dialog("dlgDG5",{
       title:"Job Close",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
new sap.m.Button( {
    text: "Close",
    icon:"sap-icon://sys-accept",
    type: sap.m.ButtonType.Accept,
    tap: [ function(oEvt) {  
    	 CloseError='0';
    	
    	 if((sap.ui.getCore().byId("Close_FunctionalLocation").getValue().length>0)||(sap.ui.getCore().byId("Close_Equipment").getValue().length>0))
    			 

    			 {
    		 
    		 		
    		 	   if((sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()=="00:00")||((sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()!="00:00")&&(sap.ui.getCore().byId("Close_OutshiftCode").getSelectedKey()!="NOTSELECTED")))
    		    			 
    	    			 {
    		 		
    		 		     if((sap.ui.getCore().byId("Close_InShiftTime").getValue()=="00:00")||((sap.ui.getCore().byId("Close_InShiftTime").getValue()!="00:00")&&(sap.ui.getCore().byId("Close_InshiftCode").getSelectedKey()!="NOTSELECTED")))
		    		 	 
		    	        			
		         			 {
		         		
		    		 		if(sap.ui.getCore().byId("Close_InShiftTime").getValue()!="00:00")
		             			
				       			 {
				       		
				       		 		 CloseError='0'
				       			 }else{
				       				
				       				 CloseError='InShiftZero'
				       			 }
		         			 }else{
		         				
		         				 CloseError='InShift'
		         			 }
    	    			 }else{
    	    				 CloseError='OutOfShift'
    	    			 }
    			 }else{
    				 CloseError='Asset'
    			 }
    		 
    			
     	 if (CloseError=='0'){
    		if(	(sap.ui.getCore().byId("Close_ProblemGroup").getVisible()==true)&&   				 
        			 ((sap.ui.getCore().byId("Close_ProblemGroup").getSelectedItem().getKey()=="NOTSELECTED")||
        					 (sap.ui.getCore().byId("Close_ProblemCode").getSelectedItem().getKey()=="NOTSELECTED")||
        					 (sap.ui.getCore().byId("Close_ActionGroup").getSelectedItem().getKey()=="NOTSELECTED")||
        					 (sap.ui.getCore().byId("Close_ActionCode").getSelectedItem().getKey()=="NOTSELECTED")||
        					 (sap.ui.getCore().byId("Close_ImpactGroup").getSelectedItem().getKey()=="NOTSELECTED")||
        					 (sap.ui.getCore().byId("Close_ImpactCode").getSelectedItem().getKey()=="NOTSELECTED"))) 
        			 {
    					CloseError='2'
        			 }else{
        				 CloseError='0'
        			 }   	
     	 }
    
     	 if (CloseError=='0'){
       		 console.log(sap.ui.getCore().byId("Close_Variance").getSelectedItem().getKey())
    		if(	 (sap.ui.getCore().getElementById("Close_Work").getState()==true)&&
    			 ((sap.ui.getCore().byId("Close_Variance").getSelectedItem().getKey()=="NOTSELECTED") ||
    			  (sap.ui.getCore().byId("Close_WD_Group").getSelectedItem().getKey()=="NOTSELECTED") ||
    			  (sap.ui.getCore().byId("Close_WD_Code").getSelectedItem().getKey()=="NOTSELECTED") ||
    			  (sap.ui.getCore().byId("Close_Reason").getValue().length < 1))){
       			CloseError='3'
    		 }else{
    			 CloseError='0'
    		 }  
       	 }

   	 if(CloseError!=0){
   		processClose()
   	 }else{
   		checkDG5Complete();
   	 }
   	 
   	
       } ]   
}),
                                  new sap.m.Button( {
                                      text: "Cancel",
                                      icon:"sap-icon://sys-cancel",
                                      type: sap.m.ButtonType.Reject,
                                      tap: [ function(oEvt) {         
                                    	 saveCloseScreenToLS()  
                                         formDG5.close()} ]   
                                  }),
                                  
                                  ],                                
    content:[

            ],
            contentWidth:"85%",
            contentHeight: "85%",
      beforeOpen:function(){
    	  if(this.getContent()+this.getContent().length==0){
      		this.addContent(buildDG5Tabs())
      		 
     			 }
    	 
    	 MandatedForms=[];
    	  //initCloseButtons();
		BuildCloseScreen();
		ShowHideFollowOn();
		//getCFeedFollowOnState(CurrentOrderNo,CurrentOpNo)
		//sap.m.IconTabBar
		var SQLStatement1="";
		SQLStatement1="SELECT * from MyJobDets where orderid = '"+CurrentOrderNo+"' and ordnoOp ='"+CurrentOpNo+"'"
		html5sql.process(SQLStatement1,
				 function(transaction, results, rowsArray){
			if(rowsArray.length>0){
				item = rowsArray[0];
				if(item.cust_feed == "X"){
					  
					sap.ui.getCore().getElementById("cust_feed_label").setVisible(true); 
					sap.ui.getCore().getElementById("cust_feed_switch").setVisible(true);
				}
				else{
					  
					sap.ui.getCore().getElementById("cust_feed_switch").setVisible(false);   
					sap.ui.getCore().getElementById("cust_feed_label").setVisible(false); 
	     	 	  
				}
			}			
				 },
				 function(error, statement){
					
				 }        
				);
		var SQLStatement="";
		SQLStatement="select * from MyJobsParams where name = 'DG5' and key2 = '"+localStorage.getItem('EmployeeScenario')+"'"
		html5sql.process(SQLStatement,
				 function(transaction, results, rowsArray){
			if(rowsArray.length>0){
				item = rowsArray[0];
				if(item.value == "YES"){
					sap.ui.getCore().getElementById("Flooding_switch").setVisible(true);   
	     	 	   sap.ui.getCore().getElementById("pollution_switch").setVisible(true);   
	     	 	   sap.ui.getCore().getElementById("pollution_label").setVisible(true);  
	     	 	   sap.ui.getCore().getElementById("flooding_label").setVisible(true);   
	     	 	   
				}
				else{
					sap.ui.getCore().getElementById("Flooding_switch").setVisible(false);   
	     	 	   sap.ui.getCore().getElementById("pollution_switch").setVisible(false) ;  
	     	 	   sap.ui.getCore().getElementById("pollution_label").setVisible(false);  
	     	 	   sap.ui.getCore().getElementById("flooding_label").setVisible(false);  	  
				}
			}			
				 },
				 function(error, statement){
					
				 }        
				);
      },
      afterOpen:function(){  
    	  sap.ui.getCore().getElementById('DG5tabBar').setSelectedKey("DG52")
    	   sap.ui.getCore().getElementById('DG5tabBar').setSelectedKey("DG51")
         } ,
         beforeClose:function(){
              
         }
         
        	 
         
       
       })
function saveCloseScreenToLS(){
	if(sap.ui.getCore().byId("Close_Work").getState()){
		FEV=sap.ui.getCore().byId("Close_Variance").getSelectedItem().getKey()
		FER=sap.ui.getCore().byId("Close_Reason").getValue();
	}else{
		FEV="";
		FER="";
	}
	scrvals=sap.ui.getCore().byId("Close_FunctionalLocation").getValue()+"|"+sap.ui.getCore().byId("Close_Equipment").getValue()+"|"+
	        sap.ui.getCore().byId("Close_InshiftCode").getSelectedItem().getKey()+"|"+sap.ui.getCore().byId("Close_InShiftTime").getValue()+"|"+
	        sap.ui.getCore().byId("Close_OutshiftCode").getSelectedItem().getKey()+"|"+sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()+"|"+
	        oSwitchFlooding.getState()+"|"+oSwitchPollution.getState()+"|"+oSwitchCustFeed.getState()+"|"+
	        sap.ui.getCore().byId("Close_ProblemGroup").getSelectedItem().getKey()+"|"+sap.ui.getCore().byId("Close_ProblemCode").getSelectedItem().getKey()+"|"+
	        sap.ui.getCore().byId("Close_ActionGroup").getSelectedItem().getKey()+"|"+sap.ui.getCore().byId("Close_ActionCode").getSelectedItem().getKey()+"|"+
	        sap.ui.getCore().byId("Close_ImpactGroup").getSelectedItem().getKey()+"|"+sap.ui.getCore().byId("Close_ImpactCode").getSelectedItem().getKey()+"|"+
	        sap.ui.getCore().byId("Close_LongText").getValue()+"|"+sap.ui.getCore().byId("Close_Work").getState()+"|"+
	        FEV+"|"+FER;
	localStorage.setItem("closeScreen",scrvals)
}
function checkDG5Complete(){
	
	 		if(	oSwitchFlooding.getState()){
	 			
	 			html5sql.process("select lastupdated from MyFormsResponses where orderno = '"+CurrentOrderNo+
	 					"' and opno = '"+CurrentOpNo+"' and formname = 'Flooding' and user = '"+localStorage.getItem('MobileUser')+"';",
	 					function(transaction, results, rowsArray){
	 						if(rowsArray.length<1){
	 							CloseError='4'
	 								processClose()
	 						}else{
		 						if(rowsArray[0].lastupdated=="COMPLETE"){
		 							
		 							checkPollutionComplete();
		 							
		 						}else{
		 							CloseError='4'
		 							processClose()
		 						}
	 						}
	 					 },
	 					 function(error, statement){
	 						CloseError='4'
	 						opMessage("Error: " + error.message + " when checking DG5 Complete "+ statement);
	 						processClose()
	 					 }        
	 					);
	 			
	 		 }else{
	 			
	 			checkPollutionComplete();
	 			
	 		 }  
	    	 
}
function checkPollutionComplete(){
	if(	oSwitchPollution.getState()){
			
			html5sql.process("select lastupdated from MyFormsResponses where orderno = '"+CurrentOrderNo+
					"' and opno = '"+CurrentOpNo+"' and formname = 'Pollution' and user = '"+localStorage.getItem('MobileUser')+"';",
					function(transaction, results, rowsArray){
						if(rowsArray.length<1){
							CloseError='5'
								processClose()
						}else{
 						if(rowsArray[0].lastupdated=="COMPLETE"){
 							CloseError='0'
 							checkFeedbackComplete()	
 						}else{
 							CloseError='5'
 								processClose()
 							
 						}
						}
					
					 },
					 function(error, statement){
						CloseError='5'
						opMessage("Error: " + error.message + " when checking Pollution Complete " + statement);
						processClose()
					 }        
					);
			
	 }else{
		 
			checkFeedbackComplete();
			
		 }  
	oSwitchFlooding.getState()
}
function checkFeedbackComplete(){
 		if(	 oSwitchCustFeed.getState()){
 			
 			html5sql.process("select lastupdated from MyFormsResponses where orderno = '"+CurrentOrderNo+
 					"' and opno = '"+CurrentOpNo+"' and formname = 'CustomerFeedback' and user = '"+localStorage.getItem('MobileUser')+"';",
 					function(transaction, results, rowsArray){
 						if(rowsArray.length<1){
 							CloseError='6'
 							
 						}else{
	 						if(rowsArray[0].lastupdated=="COMPLETE"){
	 							CloseError='0'
	 						}else{
	 							CloseError='6'
	 							
	 						}
 						}
 						processClose()
 					 },
 					 function(error, statement){
 						CloseError='6'
 						opMessage("Error: " + error.message + " when checking Customer Feedback Complete " + statement);
 					 }        
 					);
 		 }else{
 			
 			processClose()
 			
 		 } 
}
function processClose(){
	
    if(CloseError=="0"){
    	
		  setStatusChangeDT()
		 formDG5.close()
		 followOnWork="NO"
		 followOnVariance=""
		 followOnReason=""
       if(sap.ui.getCore().getElementById("Close_Work").getState()){
      	 followOnWork="YES"
       }
		  try {
			  followOnVariance=sap.ui.getCore().byId("Close_Variance").getSelectedItem().getKey()
			  followOnReason= sap.ui.getCore().byId("Close_Reason").getValue()
			}
			catch(err) {
			    followOnWork="NO"
			}
			ifinal=''
			ofinal=''
			if(followOnWork=="NO")
				{
				followOnVariance=""
		    	followOnReason=""
				
				}
			//alert("out="+sap.ui.getCore().byId("Close_OutOfShiftTime").getValue())
			//alert("in="+sap.ui.getCore().byId("Close_InShiftTime").getValue())
			if((sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()!="0:0")&&(sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()!="00:00")){
				ofinal='X'
				ofollowOnVariance=followOnVariance
				ofollowOnReason=followOnReason
				ifollowOnVariance=''
				ifollowOnReason=''
				
			}else{
				ifinal='X'
					ifollowOnVariance=followOnVariance
  				ifollowOnReason=followOnReason
  				ofollowOnVariance=''
  				ofollowOnReason=''
			}
			
			 if((sap.ui.getCore().byId("Close_InShiftTime").getValue()!="0:0")&&(sap.ui.getCore().byId("Close_InShiftTime").getValue()!="00:00")){
				 createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,sap.ui.getCore().byId("Close_InshiftCode").getSelectedItem().getKey(),
					ifollowOnVariance,
					 statusUpdateDate,statusUpdateTime,statusUpdateDate, statusUpdateTime, 
					 convertToMinutes(sap.ui.getCore().byId("Close_InShiftTime").getValue()),'',
		           		ifollowOnReason,
		           		'',ifinal)
			 }
			 if((sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()!="0:0")&&(sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()!="00:00")){
				 createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,sap.ui.getCore().byId("Close_OutshiftCode").getSelectedItem().getKey(),
						 ofollowOnVariance,
  					 statusUpdateDate,statusUpdateTime,statusUpdateDate, statusUpdateTime, 
  					 convertToMinutes(sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()),'',
  		           		ofollowOnReason,
  		           		'',ofinal)
			 }
			 if(sap.ui.getCore().getElementById("DG51F1C2").getVisible()){
       createAWSJobClose(CurrentOrderNo, CurrentOpNo, currentNotifNo,  sap.ui.getCore().byId("Close_LongText").getValue(),localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,
      		 statusUpdateDate,statusUpdateTime,
      		 sap.ui.getCore().byId("Close_FunctionalLocation").getValue(),
  			 sap.ui.getCore().byId("Close_Equipment").getValue(),
  			 convertToMinutes(sap.ui.getCore().byId("Close_InShiftTime").getValue()),
  			 convertToMinutes(sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()),
  			 sap.ui.getCore().byId("Close_ProblemGroup").getSelectedItem().getKey(),
  			 sap.ui.getCore().byId("Close_ProblemCode").getSelectedItem().getKey(),
				 sap.ui.getCore().byId("Close_ActionGroup").getSelectedItem().getKey(),
				 sap.ui.getCore().byId("Close_ActionCode").getSelectedItem().getKey(),
				 sap.ui.getCore().byId("Close_ImpactGroup").getSelectedItem().getKey(),
				 sap.ui.getCore().byId("Close_ImpactCode").getSelectedItem().getKey(),
				 followOnWork,followOnVariance,followOnReason ,oSwitchFlooding.getState(),oSwitchPollution.getState(), oSwitchCustFeed.getState(),"CONF" ,"Confirmed")
				 if (sap.ui.getCore().getElementById("Close_Work").getState()==true){
						console.log("close work")
						if(sap.ui.getCore().getElementById("Close_WD_Special").getState()){
							FO_Special="X"
							}else{
							FO_Special=""
							}
						createJobAddWork(CurrentOrderNo, CurrentOpNo,FO_Special,
								 sap.ui.getCore().byId("Close_WD_StartDate").getValue(),
								 sap.ui.getCore().byId("Close_WD_Assignment").getSelectedItem().getKey(),
								 sap.ui.getCore().byId("Close_WD_Code").getSelectedItem().getKey(),
								 sap.ui.getCore().byId("Close_WD_Group").getSelectedItem().getKey(),"","NEW");
						}

			 }else{
	             createAWSJobClose(CurrentOrderNo, CurrentOpNo, currentNotifNo,  '',localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,
	            		 statusUpdateDate,statusUpdateTime,
	            		 sap.ui.getCore().byId("Close_FunctionalLocation").getValue(),
	        			 sap.ui.getCore().byId("Close_Equipment").getValue(),
	        			 convertToMinutes(sap.ui.getCore().byId("Close_InShiftTime").getValue()),
	        			 convertToMinutes(sap.ui.getCore().byId("Close_OutOfShiftTime").getValue()),
	        			 '','','','','','',
						 followOnWork,followOnVariance,followOnReason ,oSwitchFlooding.getState(),oSwitchPollution.getState(), oSwitchCustFeed.getState(),"CONF" ,"Confirmed")			 
						 if (sap.ui.getCore().getElementById("Close_Work").getState()==true){
								console.log("close work")
								if(sap.ui.getCore().getElementById("Close_WD_Special").getState()){
									FO_Special="X"
									}else{
									FO_Special=""
									}
								createJobAddWork(CurrentOrderNo, CurrentOpNo,FO_Special,
										 sap.ui.getCore().byId("Close_WD_StartDate").getValue(),
										 sap.ui.getCore().byId("Close_WD_Assignment").getSelectedItem().getKey(),
										 sap.ui.getCore().byId("Close_WD_Code").getSelectedItem().getKey(),
										 sap.ui.getCore().byId("Close_WD_Group").getSelectedItem().getKey(),"","NEW");
								}

			 }
			 
				UpdateJobDetClose(CurrentOrderNo, CurrentOpNo)
				//updateJobDetsStatus(CurrentOrderNo, CurrentOpNo, "CLOSED")
				sendJobPhotos(CurrentOrderNo,CurrentOpNo)
				sendJobAttachments(CurrentOrderNo,CurrentOpNo)
				sendJobForms(CurrentOrderNo,CurrentOpNo)
				currentStatus="CLOSED"
				prepareChangeStatus()
				localStorage.setItem("closeScreen"," ")
				localStorage.setItem('totalAccepted','0');
				document.getElementById("JobHead_Status").innerHTML = "<Font color='RED'>Closed</font>";
				
				 document.getElementById('L'+CurrentOrderNo+'-'+CurrentOpNo).innerHTML = "Closed";
				 //BuildJobs();
				 
				}else{
					console.log("CloseError:"+CloseError)
					if (CloseError=="Asset"){
						DisplayErrorMessage("Close Job Error", "Close Details must be Completed\n-Functional Location\n-Equipment")
						}else if (CloseError=="InShift"){
						DisplayErrorMessage("Close Job Error", "Close Details must be Completed\n-InShift Time")
						}else if (CloseError=="OutOfShift"){
						DisplayErrorMessage("Close Job Error", "Close Details must be Completed\n-OutOfShift Time")
					}else if (CloseError=="InShiftZero"){
					DisplayErrorMessage("Close Job Error", "Close Details must be Completed\n-InShift Time mut be greater than 0")
					}else if (CloseError=="2"){
					DisplayErrorMessage("Close Job Error", "Close Details must be Completed\n-Problem - Action - Impact")
					}else if (CloseError=="3"){
					DisplayErrorMessage("Close Job Error", "Close Details must be Completed\n-Follow On Work Work Type Group - Work Type Code\nVariance - Reason")
					}else if (CloseError=="4"){
					DisplayErrorMessage("Close Job Error", "DG5 Form must be Completed")
					}else if (CloseError=="5"){
					DisplayErrorMessage("Close Job Error", "Pollution Form must be Completed")
					}else{
					DisplayErrorMessage("Close Job Error", "Customer Feedback form must be Completed")
					}		
		 		}
}
function setStatusChangeDT(){
	 d=getDate()
		t=getTime()
		statusUpdateDate=d.substring(0,4)+"-"+d.substring(4,6)+"-"+d.substring(6,8)
		statusUpdateTime=	t.substring(0,2)+":"+t.substring(2,4)+":"+t.substring(4,6)
}

function confirmAcceptStatus()
{
                   sap.m.MessageBox.show(
                		      "Are you sure?.", {
                		          icon: sap.m.MessageBox.Icon.INFORMATION,
                		          title: "Accept the job",
                		          actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                		          onClose: function(oAction) { 
                		        	  if (oAction ==sap.m.MessageBox.Action.YES){
                		        		  setStatusChangeDT()
                		        		   
							   				changeStatus("ACPT")
                                     		
                                          prepareChangeStatus()
                		        	  }
                		        		  
                		        		 
								}
                		      }
                		    );   
                   }
       var formChangeStatusOnSite = new sap.m.Dialog("dlgStatusOnSite",{
             title:"Set On Site",
             modal: true,
             contentWidth:"1em",
             buttons: [
                                         new sap.m.Button( {
                                        	 type: 	sap.m.ButtonType.Accept,
                                             text: "Save",
                                             tap: [ function(oEvt) { 
                                                
 												if(sap.ui.getCore().byId("StatusOnSiteTravelTime").getValue()!="0:0"){
 													setStatusChangeDT()
 													formChangeStatusOnSite.close()       
                                                	changeStatus("SITE")
                                                       prepareChangeStatus()
 														}else{
 															DisplayErrorMessage("On Site Job Error", "Travel Time must be > 0")
 														}
                                                	
                                                       
                                                       
                                                         } ]
                                            
                                         }),   
                                         new sap.m.Button( {
                                        	 icon:"sap-icon://sys-cancel",
                                             text: "Cancel",
                                             type: 	sap.m.ButtonType.Reject,
                                             tap: [ function(oEvt) {         
                                                        
                                                formChangeStatusOnSite.close()} ]   
                                         })
                                         ],                                
             content:[
                            new sap.ui.layout.form.SimpleForm({
                                  minWidth : 1024,
                                  maxContainerCols : 2,
                                  content : [
                                                              new sap.m.Label({text:"Job Accepted Time"}),
                                                              new sap.m.Input("StatusOnSiteAcceptedTime",{ type: sap.m.InputType.Input, enabled:false}),
                                         
                                                              new sap.m.Label({text:"On Site Arrival Time"}),
                                                              new sap.m.Input("StatusOnSiteTime",{ type: sap.m.InputType.Input, enabled:false}),
                                                         	 new sap.m.Label({text:"Travel Time"}),
                                                             new sap.m.DateTimeInput("StatusOnSiteTravelTime",{
                                     							placeholder : "Time Picker",
                                     							type : "Time",
                                     							valueFormat : "HH:mm",
                                     							value : "0:0",
                                     							displayFormat : "H'h' m'm'",
                                     							
                                     						}),
                                                            
                                                              
                                                              
                                                    
                                                       ]
                                         })

                     ],
                     beforeOpen:function(){
                    	 	d=getDate()
                    		t=getTime()
                    		statusUpdateDate=d.substring(0,4)+"-"+d.substring(4,6)+"-"+d.substring(6,8)
                    		statusUpdateTime=	t.substring(0,2)+":"+t.substring(2,4)+":"+t.substring(4,6)
                           BuildChangeStatusOnSite()
                     },
                    contentWidth:"50%",
                 	contentHeight: "50%",
              })
       

       var formChangeStatusPark = new sap.m.Dialog("dlgStatusPark",{
             title:"Park Job",
             modal: true,
             contentWidth:"1em",
             buttons: [
                                         new sap.m.Button( {
                                             text: "Save",
                                             type: 	sap.m.ButtonType.Accept,
                                             tap: [ function(oEvt) { 
                                                
                                                
                                               
												if((sap.ui.getCore().byId("StatusParkActualWork").getValue()!="0:0")&&
												(sap.ui.getCore().byId("StatusParkReasonText").getValue().length>0)&&
												(sap.ui.getCore().byId("StatusParkReasonCode").getSelectedItem().getKey()!="NOTSELECTED")){
	                                                formChangeStatusPark.close()   
	                                                setStatusChangeDT()
	                                                 changeStatus("PARK")   
	                                                 prepareChangeStatus()  
												}else{
													if(sap.ui.getCore().byId("StatusRejectReasonText").getValue().length>40){
															DisplayErrorMessage("Park Job Error", "Reason must be less than 40 Characters")
                             						}else{
                             							DisplayErrorMessage("Park Job Error", "Duration must be > 0\n and Reason must be completed")
                             						}
													
												}
													
   
                                                       
                                                         } ]
                                            
                                         }),   
                                         new sap.m.Button( {
                                        	 icon:"sap-icon://sys-cancel",
                                        	 type: 	sap.m.ButtonType.Reject,
                                             text: "Cancel",
                                             tap: [ function(oEvt) {         
                                            	
                                                formChangeStatusPark.close()} ]   
                                         })
                                         ],                                
             content:[
                            new sap.ui.layout.form.SimpleForm({
                                  minWidth : 1024,
                                  maxContainerCols : 2,
                                  content : [
                                                              new sap.m.Label({text:"Actual Work"}),
                                                              new sap.m.DateTimeInput("StatusParkActualWork",{
                                       							placeholder : "Time Picker",
                                       							type : "Time",
                                       							valueFormat : "HH:mm",
                                       							value : "0:0",
                                       							displayFormat : "H'h' m'm'",
                                       							
                                       						}),
                                                              
                                                           new sap.m.Label({text:"Activity"}),
                                                           new sap.m.Select('StatusParkActivityCode',{
                                                                     
                                                                     items: [
                                                                           
                                                                     ],


                                                              }),
                                                              new sap.m.Label({text:"Reason for Parking"}),
                                                           new sap.m.Select('StatusParkReasonCode',{
                                                                     
                                                                     items: [
                                                                           
                                                                     ],

                                                              }),
                                                              new sap.m.Label({text:"Reason (free text)"}),
                                                              new sap.m.Input("StatusParkReasonText",{ type: sap.m.InputType.Input}),
                                         
                                                              new sap.m.Label({text:"Additional Notes"}),
                                                              new sap.m.TextArea("StatusParkReasonDetails",{  rows: 5,height:"100px",}),
                                                       
                                                              
                                                              
                                                              
                                                    
                                                       ]
                                         })

                     ],
                     beforeOpen:function(){
                    	 d=getDate()
                 		t=getTime()
                 		statusUpdateDate=d.substring(0,4)+"-"+d.substring(4,6)+"-"+d.substring(6,8)
                 		statusUpdateTime=	t.substring(0,2)+":"+t.substring(2,4)+":"+t.substring(4,6)
                       
                    	 BuildChangeStatusPark()

                     },
                     contentWidth:"50%",
                 	contentHeight: "50%",
              })      
       var formChangeStatusUpdate = new sap.m.Dialog("dlgStatusUpdate",{
             title:"Update Job",
             modal: true,
             contentWidth:"1em",
             buttons: [
                                         new sap.m.Button( {
                                             text: "Save",
                                             type: 	sap.m.ButtonType.Accept,
                                             tap: [ function(oEvt) { 
                                                
                                            	 if((sap.ui.getCore().byId("StatusUpdateActualWork").getValue()!="")&&
                                            			 (sap.ui.getCore().byId("StatusUpdateVarianceCode").getSelectedItem().getKey()!="NOTSELECTED")&&
                                            			 (sap.ui.getCore().byId("StatusUpdateRemainingWork").getValue()!="0:0")&&
         												(sap.ui.getCore().byId("StatusUpdateReasonText").getValue().length>0)){
                                            		
                                            		     setStatusChangeDT()
                                            		     updateJobDetsDateTime(CurrentOrderNo, CurrentOpNo)
                                                     		createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,
                                                    				sap.ui.getCore().byId("StatusUpdateActivityCode").getSelectedItem().getKey(),
                                                    				sap.ui.getCore().byId("StatusUpdateVarianceCode").getSelectedItem().getKey(),
                                                    				statusUpdateDate,statusUpdateTime,statusUpdateDate, statusUpdateTime,
                                                    				convertToMinutes(sap.ui.getCore().getElementById("StatusUpdateActualWork").getValue()),
                                                    				convertToMinutes(sap.ui.getCore().getElementById("StatusUpdateRemainingWork").getValue()),
                                                    				
                                                              		sap.ui.getCore().byId("StatusUpdateReasonText").getValue(),
                                                               		sap.ui.getCore().byId("StatusUpdateReasonDetails").getValue(),'')
                                                     
                                            		 formChangeStatusUpdate.close()  
         												}else{
         													if(sap.ui.getCore().byId("StatusRejectReasonText").getValue().length>40){
     															DisplayErrorMessage("Update Job Error", "Reason must be less than 40 Characters")
                                     						}else{
                                     							DisplayErrorMessage("Update Job Error", "Actual Work must be > 0\n Remaining Work must be > 0\n Variance must be seleted\n and Reason must be completed")
                                     						}
         													
         												}    
                                                      
                                                       
                                                         } ]
                                            
                                         }),   
                                         new sap.m.Button( {
                                        	 icon:"sap-icon://sys-cancel",
                                             text: "Cancel",
                                             type: 	sap.m.ButtonType.Reject,
                                             tap: [ function(oEvt) {         
                                                        
                                                formChangeStatusUpdate.close()} ]   
                                         })
                                         ],                                
             content:[
                            new sap.ui.layout.form.SimpleForm({
                                  minWidth : 1024,
                                  maxContainerCols : 2,
                                  content : [

                                             new sap.m.Label({text:"Actual Work"}),
                                             new sap.m.DateTimeInput("StatusUpdateActualWork",{
                     							placeholder : "Time Picker",
                     							type : "Time",
                     							valueFormat : "HH:mm",
                     							value : "0:0",
                     							displayFormat : "H'h' m'm'",
                     							
                     						}),
                                                              
                                                              
                                                              
                                                                     
                                                                    	 new sap.m.Label({text:"Remaining Work"}),
                                                                         new sap.m.DateTimeInput("StatusUpdateRemainingWork",{
                                                 							placeholder : "Time Picker",
                                                 							type : "Time",
                                                 							valueFormat : "HH:mm",
                                                 							value : "0:0",
                                                 							displayFormat : "H'h' m'm'",
                                                 							
                                                 						}),
                                                 					   new sap.m.Label({text:"Activity"}),
                                                                       new sap.m.Select('StatusUpdateActivityCode',{
                                                                                 
                                                                                 items: [
                                                                                       
                                                                                 ],

                                                                          }),
                                                              new sap.m.Label({text:"Variance"}),
                                                           new sap.m.Select('StatusUpdateVarianceCode',{
                                                                     
                                                                     items: [
                                                                           
                                                                     ],

                                                              }),
                                                              new sap.m.Label({text:"Reason (free text)"}),
                                                              new sap.m.Input("StatusUpdateReasonText",{ type: sap.m.InputType.Input}),
                                         
                                                              new sap.m.Label({text:"Additional Notes"}),
                                                              new sap.m.TextArea("StatusUpdateReasonDetails",{  rows: 5,height:"100px",}),
                                                       
                                                              
                                                              
                                                              
                                                    
                                                       ]
                                         })

                     ],
                     beforeOpen:function(){
                           BuildChangeStatusUpdate()
                     },contentWidth:"50%",
                 	contentHeight: "60%",
              })   

var formChangeStatusReject = new sap.m.Dialog("dlgStatusReject",{
             title:"Reject Job",
             modal: true,
             contentWidth:"1em",
             buttons: [
                                         new sap.m.Button( {
                                             text: "Save",
                                             type: 	sap.m.ButtonType.Accept,
                                             tap: [ function(oEvt) { 
                                                
                                                
                                            	 if((sap.ui.getCore().byId("StatusRejectReasonText").getValue().length>0)&&
                                            			 (sap.ui.getCore().byId("StatusRejectVarianceCode").getSelectedItem().getKey()!="NOTSELECTED")){
                                            		 setStatusChangeDT()
                                            		 formChangeStatusReject.close()
                                                     
                                                     changeStatus("REJ1")  
                                                    
                                                      prepareChangeStatus()  
                                                      buildJobs()
                                                      sap.ui.getCore().byId("StatusRejectVarianceCode").getSelectedItem().setKey("NOTSELECTED");
                                            		 sap.ui.getCore().byId("StatusRejectReasonText").setValue("");
                                            		 
         												}else{
         													if(sap.ui.getCore().byId("StatusRejectReasonText").getValue().length>40){
         															DisplayErrorMessage("Reject Job Error", "Reason must be less than 40 Characters")
                                         						}else{
                                         							DisplayErrorMessage("Reject Job Error", "Variance and Reason must be completed")	
                                         						}
         													
         													
         													
         												}        
                                                                                                              
                                                         } ]
                                            
                                         }),   
                                         new sap.m.Button( {
                                        	 icon:"sap-icon://sys-cancel",
                                             text: "Cancel",
                                             type: 	sap.m.ButtonType.Reject,
                                             tap: [ function(oEvt) {         
                                                        
                                                formChangeStatusReject.close()} ]   
                                         })
                                         ],                                
             content:[
                            new sap.ui.layout.form.SimpleForm({
                                  minWidth : 1024,
                                  maxContainerCols : 2,
                                  content : [
                                                             
                                                              new sap.m.Label({text:"Variance"}),
                                                           new sap.m.Select('StatusRejectVarianceCode',{
                                                                     
                                                                     items: [
                                                                           
                                                                     ],

                                                              }),
                                                              new sap.m.Label({text:"Reason (free text)"}),
                                                              new sap.m.Input("StatusRejectReasonText",{ type: sap.m.InputType.Input, /* enabled:true */}),
                                         
                                                               new sap.m.Label({text:"Additional Notes"}),
                                                              new sap.m.TextArea("StatusRejectReasonDetails",{  rows: 5,height:"100px",}),
                                                      
                                                       ]
                                         })

                     ],
                     beforeOpen:function(){
                    	BuildChangeStatusReject()
                     },
                   /*  afterOpen:function(){
                    	sap.ui.getCore().getElementById("StatusRejectReasonText").focus();
                    }, */
                     contentWidth:"50%",
                  	contentHeight: "45%",
              })   
              
              

var formMaterialSearch = new sap.m.Dialog("dlgMaterial",{
    title:"Material Search Results",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
				new sap.m.Button( {
				    text: "Search",
				    type: 	sap.m.ButtonType.Accept,
				    tap: [ function(oEvt) {	
				    	var opTable = sap.ui.getCore().getElementById('MaterialsSearch');
						sap.ui.getCore().getElementById('MaterialsSearch').destroyItems();
				        var url= "http://elderberry.uk.logica.com:8083/sap/bc/bsp/sap/zorderlist/MyJobsMaterialSearch.htm?jsonCallback=?&sap-client=700&sap-user=MOBILED&sap-password=logica&maktx="+sap.ui.getCore().getElementById('SearchMaterial').getValue()
				        $.getJSON(url)
				    	
						  } ]
				}),
				new sap.m.Button( {
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formMaterialSearch.close()
						  } ]
				})
				],	
	            contentWidth:"80%",
	            contentHeight: "70%",
    content:[
 				 			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
							
			                new sap.m.Label({text:"Material"}),
							new sap.m.Input("SearchMaterial",{type: sap.m.InputType.Input}),
							

									 
					
			               
			                 
						]
 					}),
				new sap.m.Table("MaterialsSearch",{
					mode: sap.m.ListMode.SingleSelectMaster,
					selectionChange: function(evt){
						
						//selectedReserverMaterial=oEvt.getParameter("selectedItem").getKey()
						
						//sap.ui.getCore().byId("NewGroup").getSelectedItem().getKey()
						selectedReserverMaterial="RS:"+evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()+":"+evt.getParameter("listItem").getCells()[3].getText()
						this.removeSelections()
						formReserveMaterial.open()
				    },
					columns:[
					         new sap.m.Column({header: new sap.m.Label({text:"Id"}),
					        	 hAlign: 'Left',width: '25%', minScreenWidth : "" , demandPopin: false}),
					         new sap.m.Column({header: new sap.m.Label({text:"Depot"}),
					        	 hAlign: 'Left',width: '25%',minScreenWidth : "" , demandPopin: false}),
					         new sap.m.Column({header: new sap.m.Label({text:"Description"}),
					        	 hAlign: 'Left',width: '40%',minScreenWidth : "" , demandPopin: true}),
					         new sap.m.Column({header: new sap.m.Label({text:"Qty"}),
					        	 hAlign: 'Right',width: '10%',minScreenWidth : "" , demandPopin: true })       	                         
			           	     ]
				})
            ]
 })
var formReserveMaterial = new sap.m.Dialog("dlgMaterialReserve",{
    title:"Reserve Material for Job",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
				new sap.m.Button( {
				    text: "Save",
				    type: 	sap.m.ButtonType.Accept,
				    tap: [ function(oEvt) {		  
						 
				    	formReserveMaterial.close()
						  } ]
				}),
				new sap.m.Button( {
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formReserveMaterial.close()
						  } ]
				})
				],	
	            contentWidth:"50%",
	            contentHeight: "50%",
    content:[
 				 			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
							
			                new sap.m.Label({text:"Material ID"}),
							new sap.m.Input("ReserveMaterialID",{type: sap.m.InputType.Input, enabled: false}),
			                new sap.m.Label({text:"Depot"}),
							new sap.m.Input("ReserveMaterialDepot",{type: sap.m.InputType.Input, enabled: false}),							
			                new sap.m.Label({text:"Description"}),
							new sap.m.Input("ReserveMaterialDesc",{type: sap.m.InputType.Input, enabled: false}),
			                new sap.m.Label({text:"Qty Available"}),
							new sap.m.Input("ReserveMaterialAvailable",{type: sap.m.InputType.Input, enabled: false}),									 
			                new sap.m.Label({text:"Qty Required"}),
							new sap.m.Input("ReserveMaterialRequired",{type: sap.m.InputType.Input}),					
			               
			                 
						]
 					}),

            ],
            beforeOpen:function(){
            	var x =selectedReserverMaterial.split(":")
            	sap.ui.getCore().byId("ReserveMaterialID").setValue(x[1])
				sap.ui.getCore().byId("ReserveMaterialDepot").setValue(x[2])
				sap.ui.getCore().byId("ReserveMaterialDesc").setValue(x[3])
				sap.ui.getCore().byId("ReserveMaterialAvailable").setValue(x[4])
            },
 })
var formHistoryDocument = new sap.m.Dialog("dlgHistoryDocument",{
    title:"Asset History Document",
    modal: true,
    contentWidth:"1em",
    buttons: [
  

				new sap.m.Button( {
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formHistoryDocument.close()
						  } ]
				})
				],	
	            contentWidth:"60%",
	            contentHeight: "60%",
    content:[
 				 			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
					
							new sap.ui.layout.form.SimpleForm({
								minWidth : 1024,
								maxContainerCols : 2,
								content : [
									new sap.ui.core.Title("historyTitle",{ // this starts a new group
										text: ""
									}),

									new sap.m.Label({
										text: 'ID'
									}),
									new sap.m.Input("historyID",{
										text: 'a'
									}),
									new sap.m.Label({
										text: 'Type'
									}),
									new sap.m.Input("historyType",{
										text: 'b'
									}),
									new sap.m.Label({
										text: 'Priority'
									}),
									new sap.m.Input("historyPriority",{
										text: 'c'
									}),
									new sap.m.Label({
										text: 'Start Date'
									}),
									new sap.m.Input("historyStartDate",{
										text: 'd'
									}),
									new sap.m.Label({
										text: 'Description'
									}),
									new sap.m.Input("historyDescription",{
										text: 'e'
									}),
									new sap.m.Label({
										text: 'Details'
									}),
									new sap.m.TextArea("historyDetails",{
										text: '69190 Walldorf, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque risus nulla, interdum eget posuere non, tincidunt' + 
												' eu felis. In hac habitasse platea dictumst. 69190 Walldorf, Lorem ipsum dolor sit amet, consectetur adipiscing elit.' + 
												' Pellentesque risus nulla, interdum eget posuere non, tincidunt eu felis. In hac habitasse platea dictumst.'
									})
									
								]
							})			
			               
			                 
						]
 					}),

            ],
            beforeOpen:function(){
            	buildHistoryForm(selectedHistoryDocument)


            },
 })
var formAssetCharacteristic = new sap.m.Dialog("dlgAssetCharacteristic",{
    title:"Asset Characteristic",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
				new sap.m.Button({
				    text: "Save",
				    type: 	sap.m.ButtonType.Accept,
				    tap: [ function(oEvt) {		  
						 
				    	formAssetCharacteristic.close()
						  } ]
				}),
				new sap.m.Button( {
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formAssetCharacteristic.close()
						  } ]
				})
				],	
	            contentWidth:"50%",
	            contentHeight: "50%",
    content:[
 				 			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
							
			                new sap.m.Label({text:"ID"}),
							new sap.m.Input("CharacteristicID",{type: sap.m.InputType.Input, enabled: false}),
			                new sap.m.Label({text:"Description"}),
							new sap.m.Input("CharacteristicDescription",{type: sap.m.InputType.Input, enabled: false}),															 
			                new sap.m.Label({text:"Value"}),
							new sap.m.Input("CharacteristicValue",{type: sap.m.InputType.Input}),					
			               
			                 
						]
 					}),

            ],
            beforeOpen:function(){
            	var x =selectedCharacteristic.split(":")
            	sap.ui.getCore().byId("CharacteristicID").setValue(x[0])
				sap.ui.getCore().byId("CharacteristicDescription").setValue(x[1])
				sap.ui.getCore().byId("CharacteristicValue").setValue(x[2])

            },
 })
       var formLocHistory = new sap.m.Dialog("dlgLocHistory",{
   	    title:"Location History",
   	    modal: true,
   	    contentWidth:"1em",
   	    buttons: [
   	  
   					
   					new sap.m.Button( {
   					    text: "Close",
   					    type: 	sap.m.ButtonType.Reject,
   					    tap: [ function(oEvt) {		  
   							 
   					    	formLocHistory.close()
   							  } ]
   					})
   					],	
   		            contentWidth:"70%",
   		            contentHeight: "50%",
   	    content:[
   	 				 			new sap.ui.layout.form.SimpleForm({
   					minWidth : 1024,
   					maxContainerCols : 2,
   					content : [
   								
									new sap.m.Table("LocHistoryTable",{
										 mode: sap.m.ListMode.SingleSelectMaster,
											selectionChange: function(evt){
												//selectedPhotoID=evt.getParameter("listItem").getCells()[5].getText()
												//formPhotoDetails.open()  
												//showFile(evt.getParameter("listItem").getCells()[5].getText())
										    },
										width:'100%',
										columns:[
										         new sap.m.Column({header: new sap.m.Label({text:"Order"}),
										        	 hAlign: 'Left',width: '15%', minScreenWidth : "" , demandPopin: false}),
										         new sap.m.Column({header: new sap.m.Label({text:"Notification"}),
										        	 hAlign: 'Left',width: '15%', minScreenWidth : "" , demandPopin: false}),
										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
										         	hAlign: 'Left',width: '10%', minScreenWidth : "" , demandPopin: false}),
										         new sap.m.Column({header: new sap.m.Label({text:"Description"}),
										        	 hAlign: 'Left',width: '35%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
										         new sap.m.Column({header: new sap.m.Label({text:"Date"}),
										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true }),
									        	 new sap.m.Column({header: new sap.m.Label({text:"Status"}),
										        	 hAlign: 'Left',width: '10%',minScreenWidth : "" , demandPopin: true })
										        
									       	
								           	     ]
									})    				                
   				                 
   							]
   	 					}),

   	            ],
   	            beforeOpen:function(){
   	            	buildLocHistory();

   	            },
   	 })
       var oInp = new sap.m.Input("MPointValue",{
           liveChange : function(oEvent){
              
               var val = sap.ui.getCore().byId("MPointValue").getValue();
               console.log("Checking"+val+":"+selectedMPDecimals+":"+selectedMPLength)
               if(validateDecimal(val,selectedMPDecimals,selectedMPLength))            
                   valueState = "Success";               
               else
                   valueState = "Error";
               oEvent.getSource().setValueState(valueState);               
             }
       });
       oInp.setType(sap.m.InputType.Number);
 var formMPoint = new sap.m.Dialog("dlgMPoint",{
    	    title:"Measurement Point Document",
    	    modal: true,
    	    contentWidth:"1em",
    	    buttons: [
    	  
    					new sap.m.Button( "MPointSave",{
    					    text: "Save",
    					    type: 	sap.m.ButtonType.Accept,
    					    tap: [ function(oEvt) {	
    					    	var mptype=sap.ui.getCore().byId("MPointType").getValue()
    					    	var eMess="Invalid "
    					    	var mpvalue=sap.ui.getCore().byId("MPointValue").getValue()
    					    	if(sap.ui.getCore().byId("MPointCode").getEnabled()){
    					    		var mpcode=sap.ui.getCore().byId("MPointCode").getSelectedItem().getKey()
    					    	}else{
    					    		var mpcode=""
    					    	}
    					    	if(sap.ui.getCore().byId("MPointValue").getValueState()=="Error"){
    					    		eMess=" Invalid Value "
    					    	}
    					    	if(mptype=="2"){
	    					    	if(mpcode=="-1"){
	    					    		eMess=" Code is mandatory "
	    					    	}
    					    	}
    					    	
    					    	if(mptype=="1"){
	    					    	if(mpvalue.length<1){
	    					    		eMess=" Value is mandatory"
	    					    	}
    					    	}
    					    	if(eMess.length>8){
    					    		showErrorMessage("Invalid Measurement Point Details",eMess)
    					    		return
    					    	}
    					    	if(mptype=="3"){
	    					    	if((mpcode=="-1")&&(mpvalue.length<1)){
	    					    		eMess=" Code or Value must be entered "
	    					    	}
    					    	}
    					    	if(eMess.length>8){
    					    		showErrorMessage("Invalid Measurement Point Details",eMess)
    					    		return
    					    	}
    					    	if(sap.ui.getCore().getElementById("MPointSave").getText()=="Create"){
    							createMPDocument(CurrentOrderNo,CurrentOpNo,CurrentJobFL,CurrentJobEQ,
    									sap.ui.getCore().byId("MPointID").getValue(),
    									mpcode,
    									sap.ui.getCore().byId("MPointValue").getValue(),
    									sap.ui.getCore().byId("MPointText").getValue()
    									
    									) 
    					    	}else{
    					    		updateMPDocument(CurrentOrderNo,CurrentOpNo,CurrentJobFL,CurrentJobEQ,
        									sap.ui.getCore().byId("MPointID").getValue(),
        									mpcode,
        									sap.ui.getCore().byId("MPointValue").getValue(),
        									sap.ui.getCore().byId("MPointText").getValue()
        									
        									) 
    					    	}
    					    	
    					    	formMPoint.close()
    					    	BuildMeasPointTable();
    							  } ]
    					}),
    					new sap.m.Button( {
    					    text: "Close",
    					    type: 	sap.m.ButtonType.Reject,
    					    tap: [ function(oEvt) {		  
    							 
    					    	formMPoint.close()
    							  } ]
    					})
    					],	
    		            contentWidth:"50%",
    		            contentHeight: "50%",
    	    content:[
    	 				 			new sap.ui.layout.form.SimpleForm({
    					minWidth : 1024,
    					maxContainerCols : 2,
    					content : [
    								
    				                new sap.m.Label({text:"ID"}),
    								new sap.m.Input("MPointID",{type: sap.m.InputType.Input, enabled: false}),
    								new sap.m.Input("MPointType",{type: sap.m.InputType.Input, visible: false, enabled: false}),
    				                new sap.m.Label({text:"Position"}),
    								new sap.m.Input("MPointPosition",{type: sap.m.InputType.Input, enabled: false}),	
    								new sap.m.Label({text:"Description"}),
     								new sap.m.Input("MPointDescription",{type: sap.m.InputType.Input, enabled: false}),	
     								new sap.m.Label("MPointCodeLabel",{text:"Code"}),
    								new sap.m.Select('MPointCode',{}),
    				                new sap.m.Label('MPointValueLabel',{text:"Reading"}),
    								oInp,
    								new sap.m.Label({text:"Text"}),
     								new sap.m.Input("MPointText",{type: sap.m.InputType.Input})
     								 
    				               
    				                 
    							]
    	 					}),

    	            ],
    	            beforeOpen:function(){
      	            	var x =selectedMPoint.split(":")
    	            	buildMpointDetails(x[0])
  
    	            	
    	            },
    	 })
function buildMpointDetails(mp){
    	  

    	html5sql.process("select DISTINCT meas_point, psort, pttxt,format, no_char, no_deci, code_gp, unit_meas, read_from from myjobdetsmpoints where meas_point = '"+mp+"' order by meas_point",
    			 function(transaction, results, rowsArray){

    				if(rowsArray.length>0){
    					
    					selectedMPLength=rowsArray[0].no_char;
    					selectedMPDecimals=rowsArray[0].no_deci;
    					sap.ui.getCore().byId("MPointID").setValue(rowsArray[0].meas_point)
    					sap.ui.getCore().byId("MPointType").setValue(rowsArray[0].read_from)
    					sap.ui.getCore().byId("MPointPosition").setValue(rowsArray[0].psort)
    					sap.ui.getCore().byId("MPointDescription").setValue(rowsArray[0].pttxt)
    					sap.ui.getCore().byId("MPointValueLabel").setText("Reading ("+rowsArray[0].unit_meas+") [" +rowsArray[0].format+"]")
    					
    					if(rowsArray[0].read_from=="1"){
    						sap.ui.getCore().byId("MPointCode").setVisible(false)
    						sap.ui.getCore().byId("MPointCodeLabel").setVisible(false)
    						sap.ui.getCore().byId("MPointValue").setVisible(true)
    						sap.ui.getCore().byId("MPointValueLabel").setVisible(true)

    					}
    					if(rowsArray[0].read_from=="2"){
    						sap.ui.getCore().byId("MPointCode").setVisible(true)
    						sap.ui.getCore().byId("MPointCodeLabel").setVisible(true)
    						sap.ui.getCore().byId("MPointValue").setVisible(false)
    						sap.ui.getCore().byId("MPointValueLabel").setVisible(false)

    					}
    					if(rowsArray[0].read_from=="3"){
    						sap.ui.getCore().byId("MPointCode").setVisible(true)
    						sap.ui.getCore().byId("MPointCodeLabel").setVisible(true)
    						sap.ui.getCore().byId("MPointValue").setVisible(true)
    						sap.ui.getCore().byId("MPointValueLabel").setVisible(true)

    					}
						if(rowsArray[0].code_gp.length <1){
							sap.ui.getCore().byId("MPointCode").setEnabled(false)
							buildMPValues(mp,"NOCODE")
						}else{
							buildMPCodesSelect(rowsArray[0].code_gp,mp);	
							sap.ui.getCore().byId("MPointCode").setEnabled(true)
						}
    					
    					if(rowsArray[0].no_char==0){
    						
							sap.ui.getCore().byId("MPointValue").setEnabled(false);
						}else{
							sap.ui.getCore().byId("MPointValue").setEnabled(true);
						}
    					
					}
    			},
    			 function(error, statement){
    				opMessage(error) 
    			 }        
    			);
    	}
function buildMPValues(mp,type){

			if(CurrentJobEQ.length>0){
				objectID=CurrentJobEQ;
			}else{
				objectID=CurrentJobFL;
			}
		html5sql.process("select distinct mp.object_id, mp.meas_point, mp.unit_meas, mpd.code, mpd.value, mpd.shorttext from myjobdetsmpoints as mp left JOIN mympointdocs as mpd  ON mp.meas_point = mpd.meas_point where object_id = '"+objectID+"' and mp.meas_point = '"+mp+"' order by mp.meas_point",
				 function(transaction, results, rowsArray){
		
					if(rowsArray.length>0){
						
						
						if(rowsArray[0].value!=null){
							sap.ui.getCore().getElementById("MPointSave").setText("Update")
						
							if(type=="CODE"){
								sap.ui.getCore().getElementById("MPointCode").setSelectedItem("Code:"+rowsArray[0].code)
							}
							sap.ui.getCore().getElementById("MPointValue").setValue(rowsArray[0].value)
							sap.ui.getCore().getElementById("MPointText").setValue(rowsArray[0].shorttext)					
				 		}else{
					
					 	sap.ui.getCore().getElementById("MPointSave").setText("Create")
					
					
						sap.ui.getCore().getElementById("MPointValue").setValue("")
						sap.ui.getCore().getElementById("MPointText").setValue("")	
				 		}
				 }
		},
				 function(error, statement){
			opMessage("Error: " + error.message + " when reading mpdets processing " + statement);
				 }        
				);
		}
function buildMPCodesSelect(cg,mp)
       {


       	SQLStatement="select DISTINCT code_gp, code, code_text from myjobdetsmpcodes where code_gp = '"+cg+"' order by id;"

       	sap.ui.getCore().getElementById("MPointCode").destroyItems();
       	sap.ui.getCore().getElementById("MPointCode").addItem(
					 new sap.ui.core.Item("Code:-1",{
						    enabled:true,
							key:  "-1",
							text: "[Please select]"
						}))	
       	html5sql.process(SQLStatement,
       		 function(transaction, results, rowsArray){

       		 				var n=0;
       		 				
       		 			 	while (n < rowsArray.length) {
       		 			 	sap.ui.getCore().getElementById("MPointCode").addItem(
       		 							 new sap.ui.core.Item("Code:"+rowsArray[n].code,{
       		 									key:  rowsArray[n].code,
       		 									text: rowsArray[n].code_text
       		 								}))	
       		 								
       		 								
       		 					n++;				 

       		 			 	}
       		 			buildMPValues(mp,"CODE")

       			
       		 },
       		 function(error, statement){
       			 //outputLogToDB(); 
       		 }        
       		);	 
       }
var formAssetMeasurementPoint = new sap.m.Dialog("dlgAssetMeasurementPoint",{
    title:"Asset Mdeasurement Point",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
				new sap.m.Button( {
				    text: "Save",
				    type: 	sap.m.ButtonType.Accept,
				    tap: [ function(oEvt) {		  
						 
				    	formAssetMeasurementPoint.close()
						  } ]
				}),
				new sap.m.Button( {
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formAssetMeasurementPoint.close()
						  } ]
				})
				],	
	            contentWidth:"50%",
	            contentHeight: "50%",
    content:[
 				 			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
							
			                new sap.m.Label({text:"ID"}),
							new sap.m.Input("AssetMeasurementPointID",{type: sap.m.InputType.Input, enabled: false}),
			                new sap.m.Label({text:"Description"}),
							new sap.m.Input("AssetMeasurementPointDescription",{type: sap.m.InputType.Input, enabled: false}),															 
			                new sap.m.Label({text:"Value"}),
							new sap.m.Input("AssetMeasurementPointValue",{type: sap.m.InputType.Input}),					
			               
			                 
						]
 					}),

            ],
            beforeOpen:function(){
            	var x =selectedCharacteristic.split(":")
            	sap.ui.getCore().byId("AssetMeasurementPointID").setValue(x[0])
				sap.ui.getCore().byId("AssetMeasurementPointDescription").setValue(x[1])
				sap.ui.getCore().byId("AssetMeasurementPointValue").setValue(x[2])

            },
 })
var formMaterialConsume = new sap.m.Dialog("dlgMaterialConsume",{
    title:"Consume Material",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
				new sap.m.Button( {
				    text: "Save",
				    type: 	sap.m.ButtonType.Accept,
				    tap: [ function(oEvt) {		  
						 
				    	formMaterialConsume.close()
						  } ]
				}),
				new sap.m.Button( {
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formMaterialConsume.close()
						  } ]
				})
				],	
	            contentWidth:"50%",
	            contentHeight: "50%",
    content:[
 				 			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 2,
				content : [
							
			                new sap.m.Label({text:"ID"}),
							new sap.m.Input("MaterialConsumeID",{type: sap.m.InputType.Input, enabled: false}),
			                new sap.m.Label({text:"Description"}),
							new sap.m.Input("MaterialConsumeDescription",{type: sap.m.InputType.Input, enabled: false}),
			                new sap.m.Label({text:"Assigned"}),
							new sap.m.Input("MaterialConsumeAssigned",{type: sap.m.InputType.Input, enabled: false}),
			                new sap.m.Label({text:"Used"}),
							new sap.m.Input("MaterialConsumeUsed",{type: sap.m.InputType.Input}),					
			               
			                 
						]
 					}),

            ],
            beforeOpen:function(){
            	var x =selectedCharacteristic.split(":")
            	sap.ui.getCore().byId("MaterialConsumeID").setValue(x[0])
				sap.ui.getCore().byId("MaterialConsumeDescription").setValue(x[1])
				sap.ui.getCore().byId("MaterialConsumeAssigned").setValue(x[2])

            },
 })

var formSignature = new sap.m.Dialog("dlgSignature",{
    title:"Signature",
   
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [
  
new sap.m.Button( {
    text: "Save",
    icon:"sap-icon://save",
    type: sap.m.ButtonType.Accept,
    tap: [ function(oEvt) {		  
    	SaveSignature()
    	} ]   
}),

					new sap.m.Button( {
					    text: "Clear",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	ClearSignature()} ]   
					}),
					
					],					
    content:[

            ],
            contentWidth:"95%",
            contentHeight: "85%",
      beforeOpen:function(){
    	  formSignature.destroyContent()
    	  formSignature.addContent(new 		sap.ui.core.HTML({
			content: '<div id="signatureparent"><div id="signature"></div></div><div id="scrollgrabber"></div>'


		}))

      },
      afterOpen:function(){  
    	  if($('#signature').find('.jSignature').length == 0){
              $("#signature").jSignature({'UndoButton':true,  'scaleX': .5,
       'trim': true})
           };
	  } ,
	  beforeClose:function(){
		  
	  }
	
	 })
var formOrdNotification = new sap.m.Dialog("dlgOrdNotification",{
    title:"Notification", 
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [
  

					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formOrdNotification.close()} ]   
					}),
					
					],					
    content:[

            ],
            contentWidth:"95%",
            contentHeight: "85%",
      beforeOpen:function(){
    	  if(this.getContent().length==0){
			this.addContent(buildNotificationDetails(),buildNotificationDetailsTabs())
    	  }
    	  
		  buildNotificationDetailsContent("Notif:"+currentNotifId)
		  buildNotificationDetailsTabContent(currentNotifNo)
    	  selectedNotification=currentNotifNo


      },
      afterOpen:function(){  
	  } ,
	  beforeClose:function(){
		 // formOrdNotification.destroyContent();
	  }
	
	 })
var formMap = new sap.m.Dialog("dlgMap",{
    title:"Location",
   
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [
  
/* new sap.m.Button( {
    text: "Route",
    icon:"sap-icon://map-3",
    type: sap.m.ButtonType.Accept,
    tap: [ function(oEvt) {		  
    	formMap.close()
		formRoute.open();
    	} ]   
}), */

					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formMap.close()} ]   
					}),
					
					],					
    content:[

            ],
            contentWidth:"95%",
            contentHeight: "85%",
      beforeOpen:function(){
    	  formMap.addContent(new 		sap.ui.core.HTML({
			content: ' <div id="map_canvas" style="height:350px;"></div>'


		}))

      },
	  
      afterOpen:function(){  
    	  //getLatLonFromPcode(currentPostcode)
		  if(currentEquipment_GIS.length<6){
		  x=convertToLatLon(currentEquipment_GIS)
		  }else
		  {
		  x=convertToLatLon(currentFuncLoc_GIS)
		  }
		  
    	  initialize(x[0], x[1]);
    	  document.getElementById('map_canvas').style.height=document.getElementById("dlgMap").offsetHeight-130+"px";
	  } ,
	  beforeClose:function(){
		  formMap.destroyContent();
	  }
	
	 })
var formRoute = new sap.m.Dialog("dlgRoute",{
    title:"Route",
   
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [
  

					new sap.m.Button( {
					    text: "Map",
					    icon:"sap-icon://map",
					    type: sap.m.ButtonType.Accept,
					    tap: [ function(oEvt) {		  
					    	formRoute.close()
							formMap.open();
					    	} ]   
					}),
					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formRoute.close()} ]   
					}),
					
					],					
    content:
    	[
 		
 		],
            contentWidth:"95%",
            contentHeight: "95%",
     beforeOpen:function(){
    	 formRoute.addContent(new sap.ui.core.HTML({
       			//content: "<div  align='center'> <div id='gmap-route'></div><div id='route'></div><div id='controls'></div></div>"
    		 content: ' <div id="route_canvas" style="height:350px;"></div>'
       		}))
            },

      beforeClose:function(){
      		  formRoute.destroyContent();
      	  },
      afterOpen:function(){
    	 calculateRoute();
    	document.getElementById('route_canvas').style.height=document.getElementById("dlgRoute").offsetHeight-200+"px"


    		

      }      
	 })
var formPhoto = new sap.m.Dialog("dlgPhoto",{
    title:"Image",
   
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [
  


					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formPhoto.close()} ]   
					})
					
					],					
    content:[
			new sap.m.Image("showPhoto",{
				width:"80%"
			})
            ],
            contentWidth:"95%",
            contentHeight: "85%",
      beforeOpen:function(){


      },
      afterOpen:function(){  
    	  x=selectedTab.split(":")

    
    	sap.ui.getCore().getElementById('showPhoto').setSrc(sap.ui.getCore().getElementById("imagePreview"+x[1]).getSrc())

	  } ,

	
	 })
var formAssetDetails = new sap.m.Dialog("dlgAssetDetails",{
    title:"Asset Details",
   
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [
  
/* new sap.m.Button( {
    text: "Save",
    icon:"sap-icon://save",
    type: sap.m.ButtonType.Accept,
    tap: [ function(oEvt) {	
    	
    	
    	formAssetDetails.close()
		
    	} ]   
}), */

					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formAssetDetails.close()} ]   
					}),
					
					],					
    content:[

            ],
            contentWidth:"95%",
            contentHeight: "85%",
      beforeOpen:function(){
    	  formAssetDetails.destroyContent();
    	  
    	  BuildFormAssets(selectedOrderAssetID)

      },
      afterOpen:function(){  

	  } ,
	  beforeClose:function(){
		  

	  }
	
	 }).addStyleClass("sapUiSizeCompact")
var formQuestions = new sap.m.Dialog("dlgQuestions",{
    title:"",
   
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [
  
new sap.m.Button( {
    text: "Save",
    icon:"sap-icon://save",
    type: sap.m.ButtonType.Accept,
    tap: [ function(oEvt) {	
    	sap.ui.getCore().getElementById(selectedFormQuestionGroup).setType(sap.m.ButtonType.Accept)
    	
    	formQuestions.close()
		
    	} ]   
}),

					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formQuestions.close()} ]   
					}),
					
					],					
    content:[

            ],
            contentWidth:"95%",
            contentHeight: "85%",
      beforeOpen:function(){
    	  formQuestions.destroyContent();
    	  formQuestions.setTitle(selectedFormQuestionGroupTitle);
    	  BuildFormQuestions(selectedFormQuestionGroup)

      },
      afterOpen:function(){  

	  } ,
	  beforeClose:function(){
		  saveFormQuestions(selectedFormQuestionGroup)

	  }
	
	 }).addStyleClass("sapUiSizeCompact")
var formSelectFloc = new sap.m.Dialog("dlgSelectFloc",{
    title:"",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
					new sap.m.Button("flocPrevButton" ,{
						 icon:"sap-icon://navigation-up-arrow",
					    text: "previous Level",
					    tap: [ function(oEvt) {	
					    	selectedFloc=""
							var x =  formSelectFloc.getTitle().split("-")
							if (x.length==1){
								selectedFloc=x;						
							}
							var y=x.length;
							y--;
							for (var n = 0; n < y; n++) {
								selectedFloc+=x[n]
								z=n;
								z++;
								if(z!=y){
									selectedFloc=selectedFloc+"-"
									}
								}
									
		  buildFlocList(selectedFloc)
} ]   
					}),
					new sap.m.Button( {
						icon:"sap-icon://sys-cancel",
					    text: "Cancel",
					    tap: [ function(oEvt) {		  							 
					    	formSelectFloc.close()} ]   
					})
					],					
    content:[
		
           
 			flocList
            ]
	 }).addStyleClass("sapUiSizeCompact");
var detailFooterAWS = new sap.m.Bar({
	id: 'detailFooterAWS',
	contentLeft : [
					new sap.m.Button({
						 text: "Map",
						 icon:"sap-icon://map",
						 press: [ function(){
							
							  if(currentEquipment_GIS.length>6){
								 
								  x=convertToLatLon(currentEquipment_GIS)
								  if( localStorage.getItem('MAPTYPE')=='Intergraph'){
									  window.open('mmwessentials://?x='+x[1]+'&y='+x[0], "_system", 'location=yes,closebuttoncaption=Return')
								  }else{
									  localStorage.setItem('latlon',x[0]+','+x[1])
									  localStorage.setItem('mapJob',CurrentOrderNo+"-"+CurrentOpNo)
									  window.open('GoogleMapsGetLocation3.html', "_system", 'location=yes,closebuttoncaption=Return') 
									 // window.open('http://maps.google.com/maps?q='+x[0]+','+x[1], "_blank", 'location=yes,closebuttoncaption=Return') 
								  }
								  
								 
								  //ref1=
								  ref1.addEventListener('exit', function(event) {
		
		
		}); 
								  ref1.show();
								  
								
								  }else if (currentFuncLoc_GIS.length>6)
								  {
									 
								  x=convertToLatLon(currentFuncLoc_GIS)
								  if( localStorage.getItem('MAPTYPE')=='Intergraph'){
									  window.open('mmwessentials://?x=-0.208453&y=52.341036', '_system', 'location=yes,closebuttoncaption=Return')
								  }else{
									  localStorage.setItem('latlon',x[0]+','+x[1])
									  localStorage.setItem('mapJob',CurrentOrderNo+"-"+CurrentOpNo)
									  //window.open('GoogleMapsGetLocation3.html', "_blank", 'location=yes,closebuttoncaption=Return') 
									  ref1=window.open('http://maps.google.com/maps?q='+x[0]+','+x[1], "_system", 'location=yes,closebuttoncaption=Return')
								  }
								  
								 								  //ref1=window.open('mmwessentials://?x='+x[1]+'&y='+x[0], "_blank", 'location=yes,closebuttoncaption=Return')
								  
 								  //
								  ref1.addEventListener('exit', function(event) {
	
		});
								  ref1.show(); 
									
								  }
								  
						    	  
						    	 
								}]
					 })

					],
					contentMiddle : [
					 				new sap.m.Button('btnStatusAccept', {
							    		text: 	"Accept",
							    		icon: 	sap.ui.core.IconPool.getIconURI("accept"),
							    		type: 	sap.m.ButtonType.Accept,
							   			tap: 	[ function(oEvt) {	
							   				confirmAcceptStatus()
							   					
							    					} 
							   			 		]   
										}
									),

									new sap.m.Button('btnStatusReject', {
							    		text: 	"Reject",
							    		icon: 	sap.ui.core.IconPool.getIconURI("decline"),
							    		type: 	sap.m.ButtonType.Reject,
							   			tap: 	[ function(oEvt) {		
							   				formChangeStatus.close()
					   						formChangeStatusReject.open()
							   				//BuildChangeStatusReject()
							   							
							   					
							    					} 
							   			 		]   
										}
									),

									new sap.m.Button('btnStatusSuspend', {
							    		text: 	"Park",
							    		icon: 	sap.ui.core.IconPool.getIconURI("pause"),
							    		type: 	sap.m.ButtonType.Transparent,
							   			tap: 	[ function(oEvt) {		  								 
							   				if(sap.ui.getCore().getElementById('btnStatusSuspend').getText()=="Park"){
							   					formChangeStatus.close()
						   						formChangeStatusPark.open()
							   				}else{
							   						localStorage.setItem("totalParked","0")
							   						changeStatus("ACPT")
							   						
							   				}
							   						
							    					} 
							   			 		]   
										}
									),
									
					
									
									new sap.m.Button('btnStatusOnSite', {
							    		text: 	"On Site",
							    		icon: 	sap.ui.core.IconPool.getIconURI("building"),
							    		type: 	sap.m.ButtonType.Emphasized,
							   			tap: 	[ function(oEvt) {		  								 
							    					
							   						formChangeStatus.close()
							   						formChangeStatusOnSite.open()
							    					} 
							   			 		]   
										}
									),
									new sap.m.Button('btnStatusUpdate', {
							    		text: 	"Update",
							    		icon: 	sap.ui.core.IconPool.getIconURI("save"),
							    		type: 	sap.m.ButtonType.Emphasized,
							   			tap: 	[ function(oEvt) {		  								 
							    					
							   						formChangeStatus.close()
							   						formChangeStatusUpdate.open()
							    					} 
							   			 		]   
										}
									),	
									new sap.m.Button('btnStatusClose', {
							    		text: 	"Close",
							    		icon: 	sap.ui.core.IconPool.getIconURI("complete"),
							    		type: 	sap.m.ButtonType.Accept,
							   			tap: 	[ function(oEvt) {	
							   						formChangeStatus.close()
							   						formDG5.open()
							    					//changeStatus("JFIN")
							   						//formChangeStatus.close()
							    					} 
							   			 		]   
										}
									)
					 				],
					 				contentRight: []
	
})
var detailFooter = new sap.m.Bar({
		id: 'detailFooter',
		contentLeft : [
						new sap.m.Button({
							 text: "Map",
							 icon:"sap-icon://map",
							 press: [ function(){
								 formMap.open();

									}]
						 }),
							new sap.m.Button({
								 text: "Route",
								 icon:"sap-icon://map-3",
								 press: [ function(){
									 navigator.geolocation.getCurrentPosition(getDestinationDetails); 
									 formRoute.open();

										}]
							 })
						],
						contentMiddle : [
										new sap.m.Button("saveData", {
											 text: "Save",
											 visible:false,
											 type: 	sap.m.ButtonType.Accept,
											 icon:"sap-icon://save",
											 press: [ function(){
												 saveTheData()
													}]
										 })
										],
						contentRight : [
										new sap.m.Button("changeStatus", {
											 text: "Status",
											 icon:"sap-icon://edit",
											 press: [ function(){
												 prepareChangeStatus();
												 formChangeStatus.open();
													}]
										 })
										]
		
	})
var tconfFooter = new sap.m.Bar({
	id: 'tconfFooter',
	contentLeft : [
					new sap.m.Button({
						 text: "Map",
						 icon:"sap-icon://map",
						 press: [ function(){
							 formMap.open();

								}]
					 })
					],
	contentMiddle : [
					new sap.m.Button("tconfFooterCreateTconf", {
						 text: "Create",
						 icon: "sap-icon://create-entry-time",
						 press: [ function(){
							 
							 formTimeConf.open();
								}]
					 })
					],
	contentRight : [
					new sap.m.Button("tconfFooterChangeStatus", {
						 text: "Status",
						 icon:"sap-icon://edit",
						 press: [ function(){
							 prepareChangeStatus();
							 formChangeStatus.open();
								}]
					 })
					]
	
})
var materialFooter = new sap.m.Bar({
	id: 'materialFooter',
	contentLeft : [
					new sap.m.Button({
						 text: "Map",
						 icon:"sap-icon://map",
						 press: [ function(){
							 
							
							 formMap.open();

								}]
					 })
					],
	contentMiddle : [
					new sap.m.Button({
						 text: "Search",
						 icon: "sap-icon://search",
						 press: [ function(){
							 
							 formMaterialSearch.open();
								}]
					 })
					],
	contentRight : [
					new sap.m.Button("materialFooterChangeStatus", {
						 text: "Status",
						 icon:"sap-icon://edit",
						 press: [ function(){
							 prepareChangeStatus();
							 formChangeStatus.open();
								}]
					 })
					]
	
})
var firstItem=""
var standardList  = new sap.m.List("JobList",
		  {
			  //items:standardListItem,
			  itemPress:[function(oEvt) {	
				 CheckAssetHistory(oEvt.getParameter("listItem").getId());
				  //buildDetailsContent(oEvt.getParameter("listItem").getId());
				  localStorage.setItem("SelectedItem",oEvt.getParameter("listItem"))
				  oSplitApp.to("detail")}],
			  mode:sap.m.ListMode.SingleSelectMaster,
			  updateFinished : function(oEvent){   
		          
		      
		          }  
		  });
var historyList  = new sap.m.List("HistoryList",
		  {
			  //items:standardListItem,
			  itemPress:[function(oEvt) {	
				  selectedHistoryDocument=oEvt.getParameter("listItem").getId();
				  formHistoryDocument.open()
				}],
			  mode:sap.m.ListMode.SingleSelectMaster,
			  updateFinished : function(oEvent){   
		          
		      
		          }  
		  });
	function handleChange(oEvent) {
		var oDRS = oEvent.oSource;
		var sFrom = oEvent.getParameter("from");
		var sTo = oEvent.getParameter("to");
		var bValid = oEvent.getParameter("valid");

		

		var oText = sap.ui.getCore().byId("TextEvent");
		//oText.setText("Event " + iEvent + "\nId: " + oEvent.oSource.getId() + "\nFrom: " + sFrom + "\nTo: " + sTo + "\nvalid: " + bValid);
		if (bValid) {
			oDRS.setValueState(sap.ui.core.ValueState.None);
		} else {
			oDRS.setValueState(sap.ui.core.ValueState.Error);
		}
		
		startDate=sFrom.getFullYear().toString()+zeroFill(sFrom.getMonth()+1)+zeroFill(sFrom.getDate())
		endDate=sTo.getFullYear().toString()+zeroFill(sTo.getMonth()+1)+zeroFill(sTo.getDate())
		
	};
	var formTimeConf = new sap.m.Dialog("dlgTimeConf",{
      title:"Create Time Confirmation",
      modal: true,
      contentWidth:"1em",
      buttons: [
					new sap.m.Button( {
					    text: "Save",
					    type: 	sap.m.ButtonType.Accept,
					    tap: [ function(oEvt) {	
					    	
					    	
					    	createTConf(CurrentOrderNo,CurrentOpNo,sap.ui.getCore().byId("Employee").getSelectedItem().getKey(),sap.ui.getCore().byId("tconfType").getSelectedButton(),
					    			sap.ui.getCore().byId("tconfStart").getValue(),sap.ui.getCore().byId("tconfEnd").getValue(),sap.ui.getCore().byId("Duration").getValue(),
					    			sap.ui.getCore().byId("tconfType").getSelectedButton(),sap.ui.getCore().byId("Description").getValue())
							
							formTimeConf.close()
							rebuildTimeConfs()
							  } ]
					   
					}),   
					new sap.m.Button( {
						icon:"sap-icon://sys-cancel",
					    text: "Cancel",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formTimeConf.close()} ]   
					})
					],					
      content:[
   			new sap.ui.layout.form.SimpleForm({
  				minWidth : 1024,
  				maxContainerCols : 2,
  				content : [
								new sap.m.Label({text:"Type"}),
								new sap.m.SegmentedButton('tconfType', {
									buttons: [new sap.m.Button('tconfTypeWork',{text: "Work"}),
									          new sap.m.Button('tconfTypeTravel',{text: "Travel"})
									          ], 
								}),
								
								new sap.m.Label({text:"Employee"}),
								new sap.m.Select('Employee',{
									
									items: [
										
									],

									change: function(oControlEvent) {
										jQuery.sap.log.info("Event fired: 'change' value property to " + oControlEvent.getParameter("selectedItem") + " on " + this);
									}
								}),
								new sap.m.Label({text: "Start Date/Time:"}),
								
								new sap.m.DateTimeInput('tconfStart',{
									width : "99%",
									type : "DateTime",
									displayFormat : "yyyy/MM/dd hh:mm",
									dateValue : new Date()
								}),
								new sap.m.Label({text: "End Date/Time:"}),
								new sap.m.DateTimeInput('tconfEnd',{
									width : "99%",
									type : "DateTime",
									displayFormat : "yyyy/MM/dd hh:mm",
									dateValue : new Date()
								}),   
								new sap.m.Label({text:"Duration"}),
				                 new sap.m.Slider('DurationControl',
				                		 {
				                	value: 0,
				                	max:720,
				                	min:0,
				                	step:5,
				                	change : function(){
				                		sap.ui.getCore().byId("Duration").setValue(sap.ui.getCore().byId("DurationControl").getValue());}
				                	
				                			 
				                			 
				                }), 
				  
				                new sap.m.Input("Duration",{
			                           value : sap.ui.getCore().byId("DurationControl").getValue(),
			                       type: sap.m.InputType.Input,
			                       width:"50px",
			                       change : function(){sap.ui.getCore().byId("DurationControl").setValue(parseInt(sap.ui.getCore().byId("Duration").getValue(),10));}
			                         }),
								
								new sap.m.Label({text:"Description"}),
								new sap.m.Input("Description",{ type: sap.m.InputType.Input}),
								new sap.m.Label({text:"Final"}),
								new sap.m.SegmentedButton('tconfFinal', {
									buttons: [new sap.m.Button('tconfFinalNo',{text: "No"}),
									          new sap.m.Button('tconfFinalYes',{text: "Yes"})
									          ], 
								})
				                  
							]
   					})

              ]
	 }).addStyleClass("sapUiSizeCompact");
	var formChangeStatus = new sap.m.Dialog("dlgChangeStatus",{
	      title:"Change Status",
	      modal: true,
	      contentWidth:"1em",
	      buttons: [
 
						new sap.m.Button( {
							icon:"sap-icon://sys-cancel",
						    text: "Cancel",
						    type: 	sap.m.ButtonType.Reject,
						    tap: [ function(oEvt) {		  
								 
						    	formChangeStatus.close()} ]   
						})
						],					
	      content:[
	   			new sap.ui.layout.form.SimpleForm({
	  				
	  				maxContainerCols : 2,
	  				content : 	[
								new sap.m.Label({text:""}),
								new sap.m.Button('btnStatusAccept1', {
						    		text: 	"Accept",
						    		icon: 	sap.ui.core.IconPool.getIconURI("accept"),
						    		type: 	sap.m.ButtonType.Accept,
						   			tap: 	[ function(oEvt) {		  								 
						    					//changeStatus("Job Accepted")
						   						formChangeStatus.close()
						    					} 
						   			 		]   
									}
								),
								new sap.m.Label({text:""}),
								new sap.m.Button('btnStatusReject1', {
						    		text: 	"Reject",
						    		icon: 	sap.ui.core.IconPool.getIconURI("decline"),
						    		type: 	sap.m.ButtonType.Reject,
						   			tap: 	[ function(oEvt) {		  								 
						    					//changeStatus("Job Rejected")
						   						formChangeStatus.close()
												formChangeStatusReject.open();
						    					} 
						   			 		]   
									}
								),
								
								
							//	new sap.m.Label({text:""}),
							//	new sap.m.Button('btnStatusOnRoute', {
						    //		text: 	"On Route",
						    //		icon: 	sap.ui.core.IconPool.getIconURI("car-rental"),
						    //		type: 	sap.m.ButtonType.Emphasized,
						   	//		tap: 	[ function(oEvt) {		  								 
						    //					changeStatus("On Route")
						   	//					formChangeStatus.close()
						    //					} 
						   	//		 		]   
							//		}
							//	),
								new sap.m.Label({text:""}),
								new sap.m.Button('btnStatusOnSite1', {
						    		text: 	"On Site",
						    		icon: 	sap.ui.core.IconPool.getIconURI("building"),
						    		type: 	sap.m.ButtonType.Emphasized,
						   			tap: 	[ function(oEvt) {		  								 
						    					//changeStatus("On Site")
						   						formChangeStatus.close()
												formChangeStatusOnSite.open();
						    					} 
						   			 		]   
									}
								),
								new sap.m.Label({text:""}),
								new sap.m.Button('btnStatusSuspend1', {
						    		text: 	"Park",
						    		icon: 	sap.ui.core.IconPool.getIconURI("pause"),
						    		type: 	sap.m.ButtonType.Default,
						   			tap: 	[ function(oEvt) {		  								 
						    					//changeStatus("Job Suspended")
						   						formChangeStatus.close()
												formChangeStatusPark.open();
						    					} 
						   			 		]   
									}
								),		
								new sap.m.Label({text:""}),
								new sap.m.Button('btnStatusUpdate1', {
						    		text: 	"Update",
						    		icon: 	sap.ui.core.IconPool.getIconURI("pause"),
						    		type: 	sap.m.ButtonType.Default,
						   			tap: 	[ function(oEvt) {		  								 
						    					//changeStatus("Job Suspended")
						   						formChangeStatus.close()
												formChangeStatusUpdate.open();
						    					} 
						   			 		]   
									}
								),
								new sap.m.Label({text:""}),
								new sap.m.Button('btnStatusClose1', {
						    		text: 	"Close",
						    		icon: 	sap.ui.core.IconPool.getIconURI("pause"),
						    		type: 	sap.m.ButtonType.Default,
						   			tap: 	[ function(oEvt) {		  								 
						    					//changeStatus("Job Suspended")
						   						formChangeStatus.close()
												formDG5.open()
						    					} 
						   			 		]   
									}
								),								
	              ]
		 })
	   		  ]
	 }).addStyleClass("sapUiSizeCompact");
var firstEntry="none:-1";
function prepareChangeStatus(){
	
	if(currentStatus=="DEPL"){
		if(localStorage.getItem('totalAccepted')=='0'){
			sap.ui.getCore().getElementById('btnStatusAccept').setVisible(true);
		}else{
			sap.ui.getCore().getElementById('btnStatusAccept').setVisible(false);
		}
		
		sap.ui.getCore().getElementById('btnStatusReject').setVisible(true);
		sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusUpdate').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusOnSite').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusClose').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusAccept').setEnabled(true);
		sap.ui.getCore().getElementById('btnStatusReject').setEnabled(true);

	}else if(currentStatus=="ACPT"){
		
		if(localStorage.getItem('totalParked')=='0'){
			sap.ui.getCore().getElementById('btnStatusSuspend').setText("Park") 
			sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(true);
			sap.ui.getCore().getElementById('btnStatusSuspend').setEnabled(true);
		}else{
			sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(false);
		}
		sap.ui.getCore().getElementById('btnStatusAccept').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusReject').setVisible(true);
		
		//sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(true); //Change to allow park pn Accept
		sap.ui.getCore().getElementById('btnStatusUpdate').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusOnSite').setVisible(true);
		sap.ui.getCore().getElementById('btnStatusClose').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusReject').setEnabled(true);
		sap.ui.getCore().getElementById('btnStatusOnSite').setEnabled(true);


	}else if((currentStatus=="REJ1")||(currentStatus=="REJ2")||(currentStatus=="CLOSED")||(currentStatus=="NOJOBS")){
		
		sap.ui.getCore().getElementById('btnStatusAccept').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusReject').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusUpdate').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusOnSite').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusClose').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusReject').setEnabled(false);

		

	}else if(currentStatus=="SITE"){
		if(localStorage.getItem('totalParked')=='0'){
			sap.ui.getCore().getElementById('btnStatusSuspend').setText("Park") 
			sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(true);
		}else{
			sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(false);
		}
		sap.ui.getCore().getElementById('btnStatusAccept').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusReject').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusUpdate').setVisible(true);
		sap.ui.getCore().getElementById('btnStatusOnSite').setVisible(true);
		sap.ui.getCore().getElementById('btnStatusClose').setVisible(true);
		sap.ui.getCore().getElementById('btnStatusSuspend').setEnabled(true);
		sap.ui.getCore().getElementById('btnStatusUpdate').setEnabled(true);
		sap.ui.getCore().getElementById('btnStatusClose').setEnabled(true);
		sap.ui.getCore().getElementById('btnStatusOnSite').setEnabled(false);
	}else if(currentStatus=="PARK"){
		sap.ui.getCore().getElementById('btnStatusSuspend').setText("Un-Park");
		sap.ui.getCore().getElementById('btnStatusAccept').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusReject').setVisible(false);
		if(localStorage.getItem('totalAccepted')=='0'){
			sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(true);
		}else{
			sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(false);
		}
		sap.ui.getCore().getElementById('btnStatusUpdate').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusOnSite').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusClose').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusSuspend').setEnabled(true);

	}else if(currentStatus=="CLOSED")if(currentStatus=="CONF"){
	
		sap.ui.getCore().getElementById('btnStatusAccept').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusReject').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusSuspend').setVisible(true);
		sap.ui.getCore().getElementById('btnStatusUpdate').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusOnSite').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusClose').setVisible(false);
		sap.ui.getCore().getElementById('btnStatusSuspend').setEnabled(false);
}	

		
	
}
function changeStatus(Status){

	var StatusState;
	var StatusIcon;
	var StatusColour=""
		 d=getDate()
 		t=getTime()
 		statusUpdateDate=d.substring(0,4)+"-"+d.substring(4,6)+"-"+d.substring(6,8)
 		statusUpdateTime=	t.substring(0,2)+":"+t.substring(2,4)+":"+t.substring(4,6) 
	 if(Status=="ACPT"){
		 localStorage.setItem('totalAccepted','1');
		 sap.ui.getCore().getElementById('btnStatusSuspend').setText("Park");
	 }
	
	 if(Status=="DEPL"){
		 StatusState=sap.ui.core.ValueState.None
		 StatusText="Deployed"
			 StatusColour="Yellow"
		 StatusIcon="create"
	 }else if(Status=="ACPT"){
		 updateOperationStatus(CurrentOrderNo, CurrentOpNo, "ACPT", "Job Accepted")
		 createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,'ACPT','',
				 statusUpdateDate,statusUpdateTime,statusUpdateDate, statusUpdateTime, '','','Accepted','','')
		 
			 StatusText="Accepted"
		 StatusColour="Green"
		 StatusState=sap.ui.core.ValueState.Success
		 StatusIcon="accept"
	 }else if(Status=="REJ1"){
		 if(currentStatus=="DEPL"){
			
			 createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,'REJ1',
				 sap.ui.getCore().byId("StatusRejectVarianceCode").getSelectedItem().getKey(),
				 statusUpdateDate,statusUpdateTime,statusUpdateDate, statusUpdateTime, 
				 '','',
	           		sap.ui.getCore().byId("StatusRejectReasonText").getValue(),
	           		sap.ui.getCore().byId("StatusRejectReasonDetails").getValue(),'')
	         updateOperationStatus(CurrentOrderNo, CurrentOpNo, "REJ1" ,"Job Rejected")
		 }else{
			 updateOperationStatus(CurrentOrderNo, CurrentOpNo, "REJ2" ,"Job Rejected")
			 createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,'SMEPIS',
				 sap.ui.getCore().byId("StatusRejectVarianceCode").getSelectedItem().getKey(),
				 statusUpdateDate,statusUpdateTime,statusUpdateDate, statusUpdateTime, 
				 '','',
	           		sap.ui.getCore().byId("StatusRejectReasonText").getValue(),
	           		sap.ui.getCore().byId("StatusRejectReasonDetails").getValue(),'')
	         updateOperationStatus(CurrentOrderNo, CurrentOpNo, "REJ2" ,"Job Rejected")
		 }
		 
		 StatusText="Rejected"
	     StatusColour="Red"
		 StatusState=sap.ui.core.ValueState.Error
		 StatusIcon="decline"
	 }else if(Status=="REJ2"){
			 updateOperationStatus(CurrentOrderNo, CurrentOpNo, "REJ2" ,"Job Rejected")
			 createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,'SMEPIS',
					 sap.ui.getCore().byId("StatusRejectVarianceCode").getSelectedItem().getKey(),
					 statusUpdateDate,statusUpdateTime,statusUpdateDate, statusUpdateTime, 
					 '','',
		           		sap.ui.getCore().byId("StatusRejectReasonText").getValue(),
		           		sap.ui.getCore().byId("StatusRejectReasonDetails").getValue(),'')

			 StatusText="Rejected"
			StatusColour="Red"
			 StatusState=sap.ui.core.ValueState.Error
			 StatusIcon="decline"
		} else if(Status=="PARK"){
			
			localStorage.setItem('totalParked','1');
			localStorage.setItem('totalAccepted','0');
		 updateOperationStatus(CurrentOrderNo, CurrentOpNo, "PARK", "Job Suspended")
		createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,
				sap.ui.getCore().byId("StatusParkActivityCode").getSelectedItem().getKey(),
				sap.ui.getCore().byId("StatusParkReasonCode").getSelectedItem().getKey(),
                statusUpdateDate,statusUpdateTime,statusUpdateDate,statusUpdateTime,
           		convertToMinutes(sap.ui.getCore().byId("StatusParkActualWork").getValue()),'',
           		sap.ui.getCore().byId("StatusParkReasonText").getValue(),
           		sap.ui.getCore().byId("StatusParkReasonDetails").getValue(),'')
                                                            
		 StatusColour="orange"
		 StatusText="Parked"
		 StatusState=sap.ui.core.ValueState.Warning
		 StatusIcon="pause"
	 }else if(Status=="On Route"){
		
	 }else if(Status=="SITE"){
		 updateOperationStatus(CurrentOrderNo, CurrentOpNo, "SITE", "Job Started")
		  createAWSTConf(CurrentOrderNo, CurrentOpNo,localStorage.getItem("EmployeeID"),CurrentJobWorkCentre,'TRVL','',
				  statusUpdateDate,statusUpdateTime,statusUpdateDate, statusUpdateTime, convertToMinutes(sap.ui.getCore().getElementById("StatusOnSiteTravelTime").getValue()),'','On-Site','','')
		



		     StatusText="On Site"
		    StatusColour="Blue"
		 StatusState=sap.ui.core.ValueState.Success
		 StatusIcon="building"
	 }
	currentStatus=Status;
	prepareChangeStatus()
	
	document.getElementById("JobHead_Status").innerHTML = "<Font color='"+StatusColour+"'>"+StatusText+"</font>";
	
	 document.getElementById('L'+CurrentOrderNo+'-'+CurrentOpNo).innerHTML = StatusText;
	

}

function getJobType(x){
	if (x=='124699'){
		return "Quotation for Clean Water (Development Site)"
	}
	if (x=='661178'){
		return "New Water Connection"
	}
}
function buildJobs(){
var item;     
var lStatus="";
var StatusState="";
var StatusIcon="";
var res;
var jobType;
var xOrderNo=-1
var jobicons=[]
var jobtooltip=[]
var priorityicons=[]
var prioritytooltip=[]
var jpark=0
var jacpt=0;
//countStatus()
       SQLStatement="SELECT  MyJobDets.notificationNo as notifid, MyJobDets.workTypeCdx as jobtype, MyJobDets.notifCatProf as notifprofile,'MyRefOrderTypes.description' as JobDescription, MyJobDets.orderid as orderno, MyJobDets.empNo as empid, MyJobDets.ordnoOp as opno, "
    	   SQLStatement+=" MyJobDets.ordType as type, MyJobDets.startDate as start_date,MyJobDets.startTime as start_time, 'xx' as enddate, MyJobDets.address, " +

    	   "'pcode' as postcode, MyJobDets.notificationNo  as notifno, MyJobDets.flcLonLat as gis, "
    	   SQLStatement+=" MyJobDets.status, MyJobDets.priority, MyJobDets.ohdrShortText as orderdesc , 'order longtext' as orderlongtext,'notif longtext' as notiflongtext, '' as notifshorttext, "
    	   SQLStatement+=" MyJobDets.shortText as operationdesc  , MyJobDets.plant, MyJobDets.reduration , MyJobDets.ordPlant as orderplant,MyJobDets.ordWorkCntr as orderworkcentre,MyJobDets.workCntrUser as eworkcentre, MyJobDets.workCntrOper as oworkcentre, MyJobDets.statusDescS as status_s,"+
    	   "MyJobDets.siteShcode as site, MyJobDets.equipment as equipment_code, MyJobDets.equipmentDesc as equipment_desc,MyJobDets.eqpLonLat as equipment_gis, MyJobDets.funcLoc as funcloc_code, MyJobDets.funcLocDesc as funcloc_desc, MyJobDets.flcLonLat as funcloc_gis, " 
    	   SQLStatement+=" (select count(*) from MyJobsDetsEQ where MyJobsDetsEQ.equnr = MyJobDets.equipment) as eqcnt , "

    	   SQLStatement+="(SELECT GROUP_CONCAT(icon_filename ) "
    	   SQLStatement+="FROM MyJobDetsIconJob  where MyJobDets.orderid =MyJobDetsIconJob.orderno and MyJobDets.ordnoOp = MyJobDetsIconJob.opno ) AS jobicon_filename, "
    	   SQLStatement+="(SELECT GROUP_CONCAT(tooltip_desc ) "
    	   SQLStatement+="FROM MyJobDetsIconJob  where MyJobDets.orderid =MyJobDetsIconJob.orderno and MyJobDets.ordnoOp = MyJobDetsIconJob.opno ) AS jobicon_description, "
    	   SQLStatement+="(SELECT GROUP_CONCAT(icon_filename ) "
    	   SQLStatement+="FROM MyJobDetsIconPriority  where MyJobDets.orderid =MyJobDetsIconPriority.orderno and MyJobDets.ordnoOp = MyJobDetsIconPriority.opno) AS priorityicon_filename, "
    	   SQLStatement+="(SELECT GROUP_CONCAT(tooltip_desc ) "
    	   SQLStatement+="FROM MyJobDetsIconPriority  where MyJobDets.orderid =MyJobDetsIconPriority.orderno and MyJobDets.ordnoOp = MyJobDetsIconPriority.opno) AS priorityicon_description "
    	   SQLStatement+=" From MyJobDets "
    	   SQLStatement+=" where myjobdets.status not in ('CLOSED', 'CONF', 'REJ1', 'REJ2') order by  myjobdets.orderid,  myjobdets.ordnoOp"
html5sql.process(SQLStatement,
              function(transaction, results, rowsArray){
	 if(rowsArray.length>0){
	standardList.destroyItems();
                     cnt = 0;
                    
                     oMasterPage.setTitle("Jobs = "+rowsArray.length)
                     while (cnt<rowsArray.length){
                    	 if (rowsArray[cnt].status=="PARK"){jpark=1}
                    	 if (rowsArray[cnt].status=="ACPT"){jacpt=1}
                    	 if (rowsArray[cnt].status=="SITE"){jacpt=1}
                           item=rowsArray[cnt];
                           //item.orderno=(item.orderno).replace(/^[0]+/g,"");
                          // item.opno=(item.opno).replace(/^[0]+/g,"");
                           if(cnt==0){
                                  firstJob="job:"+item.orderno+':'+item.opno
                           }
                           


                               jobType=  item.notifprofile.substring(7,9);

                            
                            if(item.status_s=="CONF"){
                                  StatusText="Complete"
                                  StatusState=sap.ui.core.ValueState.Success
                                  StatusIcon="complete"
                           }else if(item.status_s=="CLOSED"){
                                  StatusText="Complete"
                                  StatusState=sap.ui.core.ValueState.Success
                                  StatusIcon="complete"
                            }else if(item.status_s=="SITE"){
                                  StatusText="On Site"
                                  StatusState=sap.ui.core.ValueState.Success
                                  StatusIcon="building"
                           }else if(item.status_s=="JONR"){
                                  StatusText="On Route"
                                  StatusState=sap.ui.core.ValueState.Success
                                  StatusIcon="car-rental"
                           }else if(item.status_s=="ACPT"){
                                  StatusText="Accepted"
                                  StatusState=sap.ui.core.ValueState.Success
                                  StatusIcon="accept"
                           }else if((item.status_s=="REJ1")||(item.status_s=="REJ2")){
                                  StatusText="Rejected"
                                  StatusState=sap.ui.core.ValueState.Error
                                  StatusIcon="decline"
                           }else if(item.status_s=="PARK"){
                                  StatusText="Parked"
                                  StatusState=sap.ui.core.ValueState.Warning
                                  StatusIcon="pause"
                           }else if(item.status_s=="DEPL"){
                                  StatusText="Deployed"
                                         StatusState=sap.ui.core.ValueState.None
                                         StatusIcon="create"
                                  }else {
                                  StatusText=""
                                  StatusState=sap.ui.core.ValueState.None
                                  StatusIcon="create"
                           }
						   if(item.jobicon_filename==null){
								jobicons=[]
						   }else{
								jobicons = item.jobicon_filename.split(",")
								}
							if(item.jobicon_description==null){
								jobtooltip=[]
						   }else{
								jobtooltip = item.jobicon_description.split(",")
								}
						  
							priorityIcon="XX"+item.priorityicon_filename;		   
						   var iconsToDisplay=''
						   for (var n=0;n <jobicons.length;n++)
						   {
								iconsToDisplay+='<img src="'+DeviceStorageDirectory+'MyJobs/Global/download/Icons/'+jobicons[n]+'" onclick="showPopup(\''+jobtooltip[n]+'\')">'
						   }
						   if(priorityIcon.length>6){
						   		//priorityiconsToDisplay='<img src="images/'+item.priorityicon_filename+'" onclick="showMessage(\''+item.priorityicon_description+'\')">'
						   	priorityiconsToDisplay='<img src="'+DeviceStorageDirectory+'MyJobs/Global/download/Icons/'+item.priorityicon_filename+'" onclick="showPopup(\''+item.priorityicon_description+'\')">'
							   
						   }else{
							   priorityiconsToDisplay=""
						   }
						 
                           standardList.addItem(
                           new sap.m.CustomListItem("Job:"+item.orderno+":"+item.opno,{
							type:sap.m.ListType.Active,
							  content: [new sap.ui.core.HTML({  
							      content: 
							    	    [
"<TABLE width='100%'><TR><TD width='25%'><TD width='50%'><TD width='25%'></TD></TR><TR><TD  colspan='2' align='left'>"+item.operationdesc+"</TD><TD  align='right'><H4>"+item.type+"</H4></TD></TR>"+
"<TR><TD><B>"+item.site+"</B></TD><TD colspan='2'  align='right'><B>"+item.orderno.replace(/^[0]+/g,"")+'-'+item.opno+"</B></TD></TR>"+
"<TR><TD align='left'><font size='2'>Start:</TD><TD align='left'><font size='2'>"+item.start_date+" "+item.start_time+"</font></TD><td  align='right'><p id='L"+item.orderno+'-'+item.opno+"'>"+StatusText+"</P></TD></TR>"+

"<TR><TD align='left'><font size='2'>Job Type:</font></TD><TD colspan='2' align='left'><font size='2'>"+jobType+"</font></TD></TR>"+
"<TR><TD align='left'>"+priorityiconsToDisplay+"</TD><TD colspan='2' align='right'>"+iconsToDisplay+"</TD></TR></TABLE>"
							  			]
					
							})
						]
						}));
					  cnt++;
			 }
			localStorage.setItem("totalParked",jpark)
			localStorage.setItem("totalAccepted",jacpt)
			/* oMasterPage.destroyContent()*/
			oMasterPage.addContent(standardList);
			
			selectListDefault();
	 }
			else{
				homepage.placeAt("body","only");
				//window.location.href="Home.html";
			}	
		 },
		 function(error, statement){
			 opMessage(error+statement)
		 }        
		);	
cnt = 0;
}


function addNewJobToList(orderno,opno){
	console.log(orderno+":"+opno)
	var item;     
	var lStatus="";
	var StatusState="";
	var StatusIcon="";
	var res;
	var jobType;
	var xOrderNo=-1
	var jobicons=[]
	var jobtooltip=[]
	var priorityicons=[]
	var prioritytooltip=[]
	var jpark=0
	var jacpt=0;
	//countStatus()
    SQLStatement="SELECT  MyJobDets.notificationNo as notifid, MyJobDets.workTypeCdx as jobtype, MyJobDets.notifCatProf as notifprofile,'MyRefOrderTypes.description' as JobDescription, MyJobDets.orderid as orderno, MyJobDets.empNo as empid, MyJobDets.ordnoOp as opno, "
 	   SQLStatement+=" MyJobDets.ordType as type, MyJobDets.startDate as start_date,MyJobDets.startTime as start_time, 'xx' as enddate, MyJobDets.address, " +

 	   "'pcode' as postcode, MyJobDets.notificationNo  as notifno, MyJobDets.flcLonLat as gis, "
 	   SQLStatement+=" MyJobDets.status, MyJobDets.priority, MyJobDets.ohdrShortText as orderdesc , 'order longtext' as orderlongtext,'notif longtext' as notiflongtext, '' as notifshorttext, "
 	   SQLStatement+=" MyJobDets.shortText as operationdesc  , MyJobDets.plant, MyJobDets.reduration , MyJobDets.ordPlant as orderplant,MyJobDets.ordWorkCntr as orderworkcentre,MyJobDets.workCntrUser as eworkcentre, MyJobDets.workCntrOper as oworkcentre, MyJobDets.statusDescS as status_s,"+
 	   "MyJobDets.siteShcode as site, MyJobDets.equipment as equipment_code, MyJobDets.equipmentDesc as equipment_desc,MyJobDets.eqpLonLat as equipment_gis, MyJobDets.funcLoc as funcloc_code, MyJobDets.funcLocDesc as funcloc_desc, MyJobDets.flcLonLat as funcloc_gis, " 
 	   SQLStatement+=" (select count(*) from MyJobsDetsEQ where MyJobsDetsEQ.equnr = MyJobDets.equipment) as eqcnt , "

 	   SQLStatement+="(SELECT GROUP_CONCAT(icon_filename ) "
 	   SQLStatement+="FROM MyJobDetsIconJob  where MyJobDets.orderid =MyJobDetsIconJob.orderno and MyJobDets.ordnoOp = MyJobDetsIconJob.opno ) AS jobicon_filename, "
 	   SQLStatement+="(SELECT GROUP_CONCAT(tooltip_desc ) "
 	   SQLStatement+="FROM MyJobDetsIconJob  where MyJobDets.orderid =MyJobDetsIconJob.orderno and MyJobDets.ordnoOp = MyJobDetsIconJob.opno ) AS jobicon_description, "
 	   SQLStatement+="(SELECT GROUP_CONCAT(icon_filename ) "
 	   SQLStatement+="FROM MyJobDetsIconPriority  where MyJobDets.orderid =MyJobDetsIconPriority.orderno and MyJobDets.ordnoOp = MyJobDetsIconPriority.opno) AS priorityicon_filename, "
 	   SQLStatement+="(SELECT GROUP_CONCAT(tooltip_desc ) "
 	   SQLStatement+="FROM MyJobDetsIconPriority  where MyJobDets.orderid =MyJobDetsIconPriority.orderno and MyJobDets.ordnoOp = MyJobDetsIconPriority.opno) AS priorityicon_description "
 	   SQLStatement+=" From MyJobDets "
	    	   SQLStatement+=" where myjobdets.status not in ('CLOSED', 'CONF', 'REJ1', 'REJ2') and MyJobDets.orderid ='"+orderno+"' and MyJobDets.ordnoOp = '"+opno+"' order by  myjobdets.orderid,  myjobdets.ordnoOp"

	    	   html5sql.process(SQLStatement,
	              function(transaction, results, rowsArray){

		 if(rowsArray.length>0){
	
	                     cnt = 0;
	                    
	                     //oMasterPage.setTitle("Jobs = "+rowsArray.length)
	                     while (cnt<rowsArray.length){
	                    	 if (rowsArray[cnt].status=="PARK"){jpark=1}
	                    	 if (rowsArray[cnt].status=="ACPT"){jacpt=1}
	                    	 if (rowsArray[cnt].status=="SITE"){jacpt=1}
	                           item=rowsArray[cnt];
	                           //item.orderno=(item.orderno).replace(/^[0]+/g,"");
	                          // item.opno=(item.opno).replace(/^[0]+/g,"");
	                           if(cnt==0){
	                                  firstJob="job:"+item.orderno+':'+item.opno
	                           }
	                           


	                               jobType=  item.notifprofile.substring(7,9);

	                            
	                            if(item.status_s=="CONF"){
	                                  StatusText="Complete"
	                                  StatusState=sap.ui.core.ValueState.Success
	                                  StatusIcon="complete"
	                           }else if(item.status_s=="CLOSED"){
	                                  StatusText="Complete"
	                                  StatusState=sap.ui.core.ValueState.Success
	                                  StatusIcon="complete"
	                            }else if(item.status_s=="SITE"){
	                                  StatusText="On Site"
	                                  StatusState=sap.ui.core.ValueState.Success
	                                  StatusIcon="building"
	                           }else if(item.status_s=="JONR"){
	                                  StatusText="On Route"
	                                  StatusState=sap.ui.core.ValueState.Success
	                                  StatusIcon="car-rental"
	                           }else if(item.status_s=="ACPT"){
	                                  StatusText="Accepted"
	                                  StatusState=sap.ui.core.ValueState.Success
	                                  StatusIcon="accept"
	                           }else if((item.status_s=="REJ1")||(item.status_s=="REJ2")){
	                                  StatusText="Rejected"
	                                  StatusState=sap.ui.core.ValueState.Error
	                                  StatusIcon="decline"
	                           }else if(item.status_s=="PARK"){
	                                  StatusText="Parked"
	                                  StatusState=sap.ui.core.ValueState.Warning
	                                  StatusIcon="pause"
	                           }else if(item.status_s=="DEPL"){
	                                  StatusText="Deployed"
	                                         StatusState=sap.ui.core.ValueState.None
	                                         StatusIcon="create"
	                                  }else {
	                                  StatusText=""
	                                  StatusState=sap.ui.core.ValueState.None
	                                  StatusIcon="create"
	                           }
							   if(item.jobicon_filename==null){
									jobicons=[]
							   }else{
									jobicons = item.jobicon_filename.split(",")
									}
								if(item.jobicon_description==null){
									jobtooltip=[]
							   }else{
									jobtooltip = item.jobicon_description.split(",")
									}
							  
								priorityIcon="XX"+item.priorityicon_filename;		   
							   var iconsToDisplay=''
							   for (var n=0;n <jobicons.length;n++)
							   {
									iconsToDisplay+='<img src="'+DeviceStorageDirectory+'MyJobs/Global/download/Icons/'+jobicons[n]+'" onclick="showPopup(\''+jobtooltip[n]+'\')">'
							   }
							   if(priorityIcon.length>6){
							   		//priorityiconsToDisplay='<img src="images/'+item.priorityicon_filename+'" onclick="showMessage(\''+item.priorityicon_description+'\')">'
							   	priorityiconsToDisplay='<img src="'+DeviceStorageDirectory+'MyJobs/Global/download/Icons/'+item.priorityicon_filename+'" onclick="showPopup(\''+item.priorityicon_description+'\')">'
								   
							   }else{
								   priorityiconsToDisplay=""
							   }
							 
	                           standardList.addItem(
	                           new sap.m.CustomListItem("Job:"+item.orderno+":"+item.opno,{
								type:sap.m.ListType.Active,
								  content: [new sap.ui.core.HTML({  
								      content: 
								    	    [
	"<TABLE width='100%'><TR><TD width='25%'><TD width='50%'><TD width='25%'></TD></TR><TR><TD  colspan='2' align='left'>"+item.operationdesc+"</TD><TD  align='right'><H4>"+item.type+"</H4></TD></TR>"+
	"<TR><TD><B>"+item.site+"</B></TD><TD colspan='2'  align='right'><B>"+item.orderno.replace(/^[0]+/g,"")+'-'+item.opno+"</B></TD></TR>"+
	"<TR><TD align='left'><font size='2'>Start:</TD><TD align='left'><font size='2'>"+item.start_date+" "+item.start_time+"</font></TD><td  align='right'><p id='L"+item.orderno+'-'+item.opno+"'>"+StatusText+"</P></TD></TR>"+

	"<TR><TD align='left'><font size='2'>Job Type:</font></TD><TD colspan='2' align='left'><font size='2'>"+jobType+"</font></TD></TR>"+
	"<TR><TD align='left'>"+priorityiconsToDisplay+"</TD><TD colspan='2' align='right'>"+iconsToDisplay+"</TD></TR></TABLE>"
								  			]
						
								})
							]
							}));
						  cnt++;
				 }
				
			
		 }
					
			 },
			 function(error, statement){
				 console.log(error.message+":"+statement)
				 opMessage(error+statement)
			 }        
			);	
	cnt = 0;
	}
function buildDetails(){
	var detsHead=new sap.ui.core.HTML('JobHeader',{  
	      content: 
	    	    [
"<TABLE width='100%' height='200' ><tr height='100'><TD valign='top' colspan='3' align='left' ><h3 id='JobHead_Description'>This is the Job Description</h3></TD><TD valign='top'  colspan='2' align='Right' ><h2 id='JobHead_JobNo'>000111111-0010</h2></TD></TR>"
+"<TR ><TD valign='top' width='20%' align='left'>Start Date:</TD><TD valign='top'  width='20%' align='left'>11-11-2015 09:30:00</TD ><TD valign='top'  width='20%' align='left'>End Date:</TD ><TD valign='top'  width='20%' align='left'>11-11-2015 09:30:00</TD ><TD valign='top'  width='20%'></TD></TR>"
+"<tr ><TD valign='top'  width='20%' align='left'>Site:</TD><TD valign='top'  width='20%' align='left'>Sitex</TD><TD valign='top'  width='20%'></TD><TD valign='top'  width='20%'></TD><TD valign='top'  width='20%'></TD></TR>"
+"<tr><TD valign='top'  width='20%' align='left'>Address:</TD><TD valign='top'  colspan='4' align='left'>addr,addr,addr,addr</TD></TR>"
+"<tr ><TD valign='top'  width='20%' align='left'>FuncLoc:</TD><TD valign='top'  colspan='4' align='left'>JobHead_FuncLoc<img src='file:///storage/emulated/0/Documents/MyJobs/Global/download/Icons/HISTORYICON.png' alt='History' height='42' width='42'></TD></TR>"
+"<tr height='20'><TD valign='top'  width='20%' align='left'>Equipment:</TD><TD valign='top'  colspan='4' align='left'>JobHead_Equipment</TD></TR>"
+"<tr height='20'><TD valign='top'  width='20%' align='left'>Notification:</TD><TD valign='top'  colspan='2' align='left'>1234567</TD><TD valign='top'  colspan='2' align='right'><H2 id='JobHead_Status'>Status</H2></TD></TR>"
+"</table>"  	 
]

	});
	return detsHead
}

function buildDetails1(){

		var objectHeader  = new sap.m.ObjectHeader('HEADER',
{
			
	title:"",
	number:'',
	numberUnit:'',
	attributes: [
	             new sap.m.ObjectAttribute('JobTypeDesc',{
	                   
	                }),
	               	                new sap.m.ObjectAttribute('StartDate',{
	            	                   
	            	                }),
	            	                new sap.m.ObjectAttribute('EndDate',{
	            	                    
	            	                }),
	            	                new sap.m.ObjectAttribute('Site',{
	            	                    
	            	                }),
	            	                new sap.m.ObjectAttribute('Address',{
	            	                    
	            	                }),
	            	                new sap.m.ObjectAttribute('FuncLoc',{
	            	                    
	            	                }),
	            	                new sap.m.ObjectAttribute('Equipment',{
	            	                    
	            	                }),
									new sap.m.ObjectAttribute('jobicon',{
	            	                    
	            	                }),
									new sap.m.ObjectAttribute('NotifNo',{active: true,press: [ function(oEvt) {		  
										 
								    	formOrdNotification.open()} ] 
	            	                    
	            	                })
	               	                ],
	            	    firstStatus: [
	            	                new sap.m.ObjectStatus( 'State',{
	            	                  
	            	                   
	            	                })
	            	                ]

});


return objectHeader;

}

function  buildHistoryForm(did){
	
	var res = did.split(":")

	if(res[0]=='Notif'){
		SQLStatement="Select * from MyNotifications where notifno = '"+res[1]+"'"
	}else{
		SQLStatement="Select * from MyOrders where orderno = '"+res[1]+"'"
	}


	html5sql.process(SQLStatement,
		 function(transaction, results, rowsArray){

			 if (rowsArray.length>0){
				 if(res[0]=="Notif"){
					 sap.ui.getCore().getElementById('historyTitle').setText("Notification")
					 sap.ui.getCore().getElementById('historyID').setValue(rowsArray[0].notifno.replace(/^[0]+/g,""))
					 sap.ui.getCore().getElementById('historyType').setValue(rowsArray[0].type)
					 sap.ui.getCore().getElementById('historyPriority').setValue(rowsArray[0].priority)
					 sap.ui.getCore().getElementById('historyDescription').setValue(rowsArray[0].shorttext)
					 sap.ui.getCore().getElementById('historyDetails').setValue(rowsArray[0].longtext)
					 sap.ui.getCore().getElementById('historyStartDate').setValue(formatDateTime1(rowsArray[0].startdate))
				 }else{
					 sap.ui.getCore().getElementById('historyTitle').setText("Order")
					 sap.ui.getCore().getElementById('historyID').setValue(rowsArray[0].orderno.replace(/^[0]+/g,""))
					 sap.ui.getCore().getElementById('historyType').setValue(rowsArray[0].type)
					 sap.ui.getCore().getElementById('historyPriority').setValue(rowsArray[0].priority)
					 sap.ui.getCore().getElementById('historyDescription').setValue(rowsArray[0].shorttext)
					 sap.ui.getCore().getElementById('historyDetails').setValue(rowsArray[0].longtext)
					 sap.ui.getCore().getElementById('historyStartDate').setValue(formatDateTime1(rowsArray[0].startdate)	)				 
				 }
				 
		    	 
				 
			 }
	
		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);	

	 




 


	}

function  getCurrentJob(aid){
	if(aid.length<2){
		currentStatus="NOJOBS"
			prepareChangeStatus()
		return;
	}
		
	
	var res = aid.split(":")
	var orderno=res[1];
	var opno=res[2];
	var StatusState="";
	var StatusIcon="";
	var tabsdesc=""
	var tabsid=""
	var notifno=""
	var res;
	var jobType;
	var surveyID;
	var jobicons=[]
	var StatusColour=""
	var Longtext='';
	var NLongtext=''

	       SQLStatement="SELECT MyNotifications.pcode, MyNotifications.id as notifid, MyNotifications.type as jobtype, refnotificationtypes.notifprofile,MyRefOrderTypes.description as JobDescription, MyOperations.orderno, MyOperationsSplit.assignedto as empid, MyOperations.opno, "
		   SQLStatement+=" MyOrders.type, MyOperations.startdate, MyOperations.enddate, MyOrders.address,  MyOrders.postcode,MyOrders.notifno, MyOrders.gis, "
		   SQLStatement+=" MyOperations.status, MyOrders.priority, MyOperations.apptstart, MyOperations.apptend, MyOrders.shorttext as orderdesc , MyOrders.longtext as orderlongtext,MyNotifications.longtext as notiflongtext, "
		   SQLStatement+=" MyOperations.shorttext as operationdesc , MyOrders.contact , MyJobDets.eworkcentre, MyJobDets.oworkcentre, MyJobDets.status_s,MyJobDets.site, MyJobDets.equipment_code, MyJobDets.equipment_desc,MyJobDets.equipment_gis, MyJobDets.funcloc_code, MyJobDets.funcloc_desc, MyJobDets.funcloc_gis, " 
	       SQLStatement+="(SELECT GROUP_CONCAT(status ) "
	       SQLStatement+="FROM myuserstatus  where MyOperations.orderno =myuserstatus.orderno and MyOperations.opno = myuserstatus.opno) as opstat,"
	       SQLStatement+="(SELECT GROUP_CONCAT(statuscode ) "
	       SQLStatement+="FROM myuserstatus  where MyOperations.orderno =myuserstatus.orderno and MyOperations.opno = myuserstatus.opno) AS statuscode,"
	       SQLStatement+="(SELECT GROUP_CONCAT(statusdesc ) "
	       SQLStatement+="FROM myuserstatus  where MyOperations.orderno =myuserstatus.orderno and MyOperations.opno = myuserstatus.opno) AS statusdesc, "
	       SQLStatement+="(SELECT GROUP_CONCAT(value1 ) "
	       SQLStatement+="FROM myoperationinfo  where MyOperations.orderno =myoperationinfo.orderno and MyOperations.opno = myoperationinfo.opno and myoperationinfo.type = 'JOBICON') AS jobicon_filename, "
	       SQLStatement+="(SELECT GROUP_CONCAT(value2 ) "
	       SQLStatement+="FROM myoperationinfo  where MyOperations.orderno =myoperationinfo.orderno and MyOperations.opno = myoperationinfo.opno and myoperationinfo.type = 'JOBICON') AS jobicon_description, "
	       SQLStatement+="(SELECT GROUP_CONCAT(value1 ) "
	       SQLStatement+="FROM myoperationinfo  where MyOperations.orderno =myoperationinfo.orderno and MyOperations.opno = myoperationinfo.opno and myoperationinfo.type = 'PRIORITYICON') AS priorityicon_filename, "
	       SQLStatement+="(SELECT GROUP_CONCAT(value2 ) "
	       SQLStatement+="FROM myoperationinfo  where MyOperations.orderno =myoperationinfo.orderno and MyOperations.opno = myoperationinfo.opno and myoperationinfo.type = 'PRIORITYICON') AS priorityicon_description "
	      
	      
	       
	       SQLStatement+=" From MyOperations "

	       SQLStatement+="left join myoperationssplit on myoperations.orderno = myoperationssplit.orderno "
	       SQLStatement+="      and myoperations.opno = myoperationssplit.opno "
		   SQLStatement+="left join myjobdets on myoperations.orderno = myjobdets.orderno "
	       SQLStatement+="      and myoperations.opno = myjobdets.opno "
	                     
	              SQLStatement+="left join myorders on myoperations.orderno = myorders.orderno "
	                     SQLStatement+="left join mynotifications on myorders.notifno = mynotifications.notifno "
	                     SQLStatement+="left join refnotificationtypes on mynotifications.type = refnotificationtypes.notiftype and refnotificationtypes.level_number='2'"
	                    	 SQLStatement+=" left join myrefordertypes on myorders.type = myrefordertypes.type "
	                     SQLStatement+=" where myoperations.orderno = '"+orderno+"'"
	                     SQLStatement+=" and myoperations.opno = '"+opno+"'"


	html5sql.process(SQLStatement,
			function(transaction, results, rowsArray){
		opMessage(rowsArray.length)
		//selectedJobArray
		 if (rowsArray.length>0){
			
			 
	    	 
			 
		 }

	 },
	 function(error, statement){
		 //outputLogToDB(); 
	 }        
	);	









}
function  buildDetailsContent(aid){
if(aid.length<2){
	currentStatus="NOJOBS"
		prepareChangeStatus()
	return;
}

//getCurrentJob(aid)	
currentOrderListItem=aid;
var res = aid.split(":")
var orderno=prefixZeroes(res[1]);
var opno=res[2];
var StatusState="";
var StatusIcon="";
var tabsdesc=""
var tabsid=""
var notifno=""
var res;
var jobType;
var surveyID;
var jobicons=[]
var StatusColour=""
var Longtext='';
var NLongtext=''
	SQLStatement="SELECT  MyJobDets.notificationNo as notifid, MyJobDets.workTypeCdx as jobtype, MyJobDets.notifCatProf as notifprofile,'MyRefOrderTypes.description' as JobDescription, MyJobDets.orderid as orderno, MyJobDets.empNo as empid, MyJobDets.ordnoOp as opno, "
		SQLStatement+=" MyJobDets.ordType as type, MyJobDets.startDate as startdate,MyJobDets.startTime as starttime, MyJobDets.startDate as enddate, MyJobDets.address, " +

		"'pcode' as postcode, MyJobDets.notificationNo  as notifno, MyJobDets.flcLonLat as gis, "
		SQLStatement+=" MyJobDets.status, MyJobDets.priority, MyJobDets.ohdrShortText as orderdesc , 'order longtext' as orderlongtext,'notif longtext' as notiflongtext, '' as notifshorttext, "
		SQLStatement+=" MyJobDets.shortText as operationdesc  , MyJobDets.plant, MyJobDets.reduration , MyJobDets.ordPlant as orderplant,MyJobDets.ordWorkCntr as orderworkcentre,MyJobDets.workCntrUser as eworkcentre, MyJobDets.workCntrOper as oworkcentre, MyJobDets.statusDescS as status_s,"+
		"MyJobDets.siteShcode as site, MyJobDets.equipment as equipment_code, MyJobDets.equipmentDesc as equipment_desc,MyJobDets.eqpLonLat as equipment_gis, MyJobDets.funcLoc as funcloc_code, MyJobDets.funcLocDesc as funcloc_desc, MyJobDets.flcLonLat as funcloc_gis, " 
		SQLStatement+=" (select count(*) from MyJobsDetsEQ where MyJobsDetsEQ.equnr = MyJobDets.equipment) as eqcnt , "
		SQLStatement+=" (SELECT GROUP_CONCAT(text_line,'|'  ) "
		SQLStatement+=" FROM MyJobDetsNotifLongText where MyJobDetsNotifLongText.orderno = MyJobDets.orderid) as notiflongtext, ",
		SQLStatement+=" (SELECT GROUP_CONCAT(text_line,'|' ) "
		SQLStatement+=" FROM MyJobDetsOrderLongText where MyJobDetsOrderLongText.orderno = MyJobDets.orderid) as orderlongtext, "
		SQLStatement+="(SELECT GROUP_CONCAT(icon_filename ) "
		SQLStatement+="FROM MyJobDetsIconJob  where MyJobDets.orderid =MyJobDetsIconJob.orderno and MyJobDets.ordnoOp = MyJobDetsIconJob.opno ) AS jobicon_filename, "
		SQLStatement+="(SELECT GROUP_CONCAT(tooltip_desc ) "
		SQLStatement+="FROM MyJobDetsIconJob  where MyJobDets.orderid =MyJobDetsIconJob.orderno and MyJobDets.ordnoOp = MyJobDetsIconJob.opno ) AS jobicon_description, "
		SQLStatement+="(SELECT GROUP_CONCAT(icon_filename ) "
		SQLStatement+="FROM MyJobDetsIconPriority  where MyJobDets.orderid =MyJobDetsIconPriority.orderno and MyJobDets.ordnoOp = MyJobDetsIconPriority.opno) AS priorityicon_filename, "
		SQLStatement+="(SELECT GROUP_CONCAT(tooltip_desc ) "
		SQLStatement+="FROM MyJobDetsIconPriority  where MyJobDets.orderid =MyJobDetsIconPriority.orderno and MyJobDets.ordnoOp = MyJobDetsIconPriority.opno) AS priorityicon_description "
		SQLStatement+=" From MyJobDets "

		SQLStatement+=" where MyJobDets.orderid = '"+orderno+"'"
		SQLStatement+=" and MyJobDets.ordnoOp = '"+opno+"'"
		console.log("1");
                     /* if(CheckAssetHistory()){
                  		showhistory="<img src='file:///storage/emulated/0/Documents/MyJobs/Global/download/Icons/historyicon.png' alt='History' height='42' width='42' onclick='getAssetHistory(\""+selectedJob.funcloc_code+"\")'>"
                    }
                    else{
                  	  showhistory="";
                    } */

html5sql.process(SQLStatement,
       function(transaction, results, rowsArray){
	selectedJobArray=rowsArray[0];
              if (rowsArray.length>0){
            	  
                     item=rowsArray[0];
                     currentNotifNo=rowsArray[0].notifno;
                     currentNotifId=rowsArray[0].notifid
                     
					 if(rowsArray[0].notiftype==null){
						JobType=' ';
					 }else{
						JobType=rowsArray[0].notiftype;
					 }
                     if(item.status_s=="JFIN"){
                         currentStatus="CLOSED"
                         StatusText="Complete"
                         StatusColour="Green"
                         StatusState=sap.ui.core.ValueState.Success
                         StatusIcon="complete"
                   }else if(item.status_s=="SITE"){
                         currentStatus="SITE"
                         StatusColour="Blue"
                         StatusText="On Site"
                         StatusState=sap.ui.core.ValueState.Success
                         StatusIcon=="building"
                   }else if(item.status_s=="JONR"){
                         currentStatus="JONR"
                         StatusColour="Amber"
                         StatusText="On Route"
                         StatusState=sap.ui.core.ValueState.Success
                         StatusIcon="car-rental"
                   }else if(item.status_s=="ACPT"){
                         currentStatus="ACPT"
                         StatusColour="Green"
                         StatusText="Accepted"
                         StatusState=sap.ui.core.ValueState.Success
                         StatusIcon="accept"
                   }else if(item.status_s=="REJ1"){
                         currentStatus="REJ1"
                         StatusColour="Red"
                         StatusText="Rejected"
                         StatusState=sap.ui.core.ValueState.Error
                         StatusIcon="decline"
                   }else if(item.status_s=="REJ2"){
                       currentStatus="REJ2"
                    	   StatusColour="Red"
                           StatusText="Rejected"
                           StatusState=sap.ui.core.ValueState.Error
                           StatusIcon="decline"
                     }else if(item.status_s=="PARK"){
                         currentStatus="PARK"
                        	 StatusColour="orange"
                         StatusText="Parked"
                         StatusState=sap.ui.core.ValueState.Warning
                         StatusIcon="pause"
                   }else if(item.status_s=="NEW"){
                         currentStatus="INIT"
                         StatusText="New"
                        	 StatusColour="Yellow"
                         StatusState=sap.ui.core.ValueState.None
                         StatusIcon="create"
                   }else if(item.status_s=="DEPL"){
                         currentStatus="DEPL"
                         StatusColour="Yellow"
                         StatusText="Deployed"
                         StatusState=sap.ui.core.ValueState.None
                         StatusIcon="create"
                   }else if((item.status_s=="CLOSED")||(item.status_s=="CONF")){
                       currentStatus="CLOSED"
                           StatusColour="Red"
                           StatusText="Complete"
                                  StatusState=sap.ui.core.ValueState.None
                                  StatusIcon="decline"
                           }else {
                         currentStatus="INIT"
                        StatusColour="Yellow"
                         StatusText=""
                         StatusState=sap.ui.core.ValueState.None
                         StatusIcon="create"
                   }
                     if(item.jobicon_filename==null){
							jobicons=[]
					   }else{
							jobicons = item.jobicon_filename.split(",")
							}
						if(item.jobicon_description==null){
							jobtooltip=[]
					   }else{
							jobtooltip = item.jobicon_description.split(",")
							}
					  
						priorityIcon="XX"+item.priorityicon_filename;		   
					   var iconsToDisplay=''
					   docsVisible=false;
					   for (var n=0;n <jobicons.length;n++)
					   {
						   ifn=jobicons[n];  
						   if(ifn.indexOf(".")<0) //AZURE
						   { //AZURE
						   ifn=ifn+".png" //AZURE
						   }
						if(jobtooltip[n]=="Measurements"){
							iconsToDisplay+='<img src="'+DeviceStorageDirectory+'MyJobs/Global/download/Icons/'+ifn+'" onclick="formMeasPoints.open()">'  //AZURE
						}else if(jobtooltip[n]=="Documents"){
							  docsVisible=true;
						}else{
						
							iconsToDisplay+='<img src="'+DeviceStorageDirectory+'MyJobs/Global/download/Icons/'+ifn+'" onclick="showPopup(\''+jobtooltip[n]+'\')">' //AZURE
						}
							
					   }
					   if(priorityIcon.length>6){
					   		priorityiconsToDisplay='<img src="'+DeviceStorageDirectory+'MyJobs/Global/download/Icons/'+item.priorityicon_filename+'" onclick="showPopup(\''+item.priorityicon_description+'\')">'
					   }else{
						   priorityiconsToDisplay=""
					   }
                     oDetailPage.destroyContent()
                     //oDetailPage.addContent(buildDetails())
                   
                     if(rowsArray[0].eqcnt==0)
                    	 {
                    	 
                    	 showAttributes=""
                    	 }else{
                    	 //showAttributes="<img src='"+DeviceStorageDirectory+"MyJobs/Global/download/Icons/EQATRIB.png' alt='History' height='35' width='35' onclick='showEQAttbites(\""+rowsArray[0].equipment_code+"\")'>"	 
                    		 showAttributes=""
                    	 }
                     if(history){
                    	 showhistory="<img src='"+DeviceStorageDirectory+"MyJobs/Global/download/Icons/HISTORYICON.png' alt='History' height='42' width='42' onclick='getAssetHistory(\""+rowsArray[0].funcloc_code+"\")'>"
                     }
                     else{
                    	 showhistory="";
                     }
                     
		/* oDetailPage.addContent(	new sap.ui.core.HTML('JobHeader',{  
	      content: 
	    	    [
"<TABLE width='100%' height='200' ><tr height='100'><TD valign='top' colspan='3' align='left' ><h3>"+unescape(rowsArray[0].orderdesc)+"</h3></TD><TD valign='top'  colspan='2' align='Right' ><h2 id='JobHead_JobNo'>"+rowsArray[0].orderno+"-"+rowsArray[0].opno+"</h2></TD></TR>"
+"<TR ><TD valign='top' width='20%' align='left'>Start Date:</TD><TD valign='top'  width='20%' align='left'>"+formatDate(rowsArray[0].startdate)+"</TD><TD valign='top'  width='20%' align='left'>End Date:  </TD ><TD valign='top'  width='20%' align='left'>"+formatDate(rowsArray[0].enddate)+"</TD ><TD valign='top'  width='20%'></TD></TR>"
+"<tr ><TD valign='top'  width='20%' align='left'>Site:</TD><TD valign='top'  width='20%' align='left'>"+rowsArray[0].site+                      "</TD><TD valign='top'  width='20%' align='left'>RE Duration:</TD><TD valign='top'  width='20%' align='left'>"+rowsArray[0].reduration+"</TD><TD valign='top'  width='20%'></TD></TR>"
+"<tr><TD valign='top'  width='20%' align='left'>Address:</TD><TD valign='top'  colspan='4' align='left'>"+rowsArray[0].address+"</TD></TR>"
+"<tr ><TD valign='top'  width='20%' align='left'>FuncLoc:</TD><TD valign='top'  colspan='2' align='left'>"+rowsArray[0].funcloc_code+" - "+rowsArray[0].funcloc_desc+
"</TD><TD colspan = '2' rowspan='2'><img src='images/historyicon.png' alt='History' height='42' width='42' onclick='getAssetHistory(\""+rowsArray[0].funcloc_code+"\")'>&nbsp;&nbsp;"+showAttributes+"</TD></TR>"
+"<tr height='20'><TD valign='top'  width='20%' align='left'>Equipment:</TD><TD valign='top'  colspan='2' align='left'>"+rowsArray[0].equipment_code+" - "+rowsArray[0].equipment_desc+"</TD></TR>"
+"<tr height='20'><TD valign='top'  width='20%' align='left'>Notification:</TD><TD valign='top'  colspan='2' align='left'>"+rowsArray[0].notifno+"</TD><TD valign='top'  colspan='2' align='right'><H2 id='JobHead_Status'><Font color='"+StatusColour+"'>"+StatusText+"</font></H2></TD></TR>"
+"<TR><TD align='right' colspan='5'>"+priorityiconsToDisplay+iconsToDisplay+"</TD></TR>"
+"</table>"  	 
]

	})) */
	/* sqlStatement="select * from MyMenuBar where subitem = 'Asset history'"
		
		html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){
				if(rowsArray<1){
					
					showhistory="";
					
					//oDetailPage.addContent(CreateMatrix(selectedJobArray,StatusColour,StatusText,priorityiconsToDisplay,iconsToDisplay,showAttributes,showhistory));
				}else{
					
					showhistory="<img src='file:///storage/emulated/0/Documents/MyJobs/Global/download/Icons/historyicon.png' alt='History' height='42' width='42' onclick='getAssetHistory(\""+selectedJob.funcloc_code+"\")'>"
					sap.ui.getCore().byId("attributes").addContent(showhistory);
				}
				
			 },
			 function(error, statement){
				opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
			 }        
			); */
			/* if(sap.ui.getCore().byId("history")){
				sap.ui.getCore().byId("history").destroy();
			}
 */	oDetailPage.addContent(CreateMatrix(selectedJobArray,StatusColour,StatusText,priorityiconsToDisplay,iconsToDisplay,showAttributes,showhistory));
			
			
                     //res=rowsArray[0].notiftype.split(":");
                     ////if(res[0]=="FORM"){
                      //     jobType=getJobType(res[1])
                        //   surveyID=res[1]
                           
                     // }else{
                       //    surveyID="0"
                           jobType=JobType;
                    // }
					if(rowsArray[0].jobicon_filename==null){
					jobicons=[]
					}else{
					jobicons = rowsArray[0].jobicon_filename.split(",")
					}
					currentEquipment_GIS=rowsArray[0].equipment_gis;
					currentFuncLoc_GIS=rowsArray[0].funcloc_gis; 
					
/*                      sap.ui.getCore().getElementById('HEADER').setTitle(rowsArray[0].orderdesc)
                     sap.ui.getCore().getElementById('HEADER').setNumber(rowsArray[0].orderno+"-"+rowsArray[0].opno)
                     sap.ui.getCore().getElementById('HEADER').setNumberUnit(jobType)
                     sap.ui.getCore().getElementById('HEADER').destroyStatuses()
                     sap.ui.getCore().getElementById('HEADER').addStatus( new sap.m.ObjectStatus({
                                  text : StatusText,
                                  icon : sap.ui.core.IconPool.getIconURI(StatusIcon),

                                  state : StatusState
                     })) */
                                                currentPostcode=rowsArray[0].postcode;
                     
                     currentJob="job:"+rowsArray[0].orderno+':'+rowsArray[0].opno;
                     CurrentOrderNo=rowsArray[0].orderno
                     CurrentOpNo=rowsArray[0].opno
                     
                     CurrentJobWorkCentre=rowsArray[0].eworkcentre
                     CurrentJobWorkCentreOp=rowsArray[0].oworkcentre
                     CurrentJobProfile=rowsArray[0].notifprofile
                     CurrentJobFL =rowsArray[0].funcloc_code 
                     CurrentJobEQ =rowsArray[0].equipment_code 
/*                      if(currentStatus=="JFIN"){
                           
                           sap.ui.getCore().getElementById('tconfFooterChangeStatus').setEnabled(false)
                           sap.ui.getCore().getElementById('changeStatus').setEnabled(false)
                     }else{
                           
                            sap.ui.getCore().getElementById('tconfFooterChangeStatus').setEnabled(true)
                           sap.ui.getCore().getElementById('changeStatus').setEnabled(true)
                     } */

/*                        sap.ui.getCore().getElementById('NotifNo').setTitle("Notification No")
                       sap.ui.getCore().getElementById('NotifNo').setText(rowsArray[0].notifno)
                       sap.ui.getCore().getElementById('JobTypeDesc').setTitle("Job Type")
                       sap.ui.getCore().getElementById('JobTypeDesc').setText(rowsArray[0].JobDescription)
                       sap.ui.getCore().getElementById('StartDate').setTitle("Start Date")
                       sap.ui.getCore().getElementById('StartDate').setText(formatDate(rowsArray[0].startdate))
                       sap.ui.getCore().getElementById('EndDate').setTitle("End Date ")
                       sap.ui.getCore().getElementById('EndDate').setText(formatDate(rowsArray[0].enddate))
                       sap.ui.getCore().getElementById('Site').setTitle("Site ")      
                       sap.ui.getCore().getElementById('Site').setText(rowsArray[0].site)  
                       sap.ui.getCore().getElementById('Address').setTitle("Address ")    
                       sap.ui.getCore().getElementById('Address').setText(rowsArray[0].address) 
                       sap.ui.getCore().getElementById('FuncLoc').setTitle("Funcloc ")    
                       sap.ui.getCore().getElementById('FuncLoc').setText(rowsArray[0].funcloc_code+" "+rowsArray[0].funcloc_desc) 
                       sap.ui.getCore().getElementById('Equipment').setTitle("Equipment ")      
                       sap.ui.getCore().getElementById('Equipment').setText(rowsArray[0].equipment_code+" "+rowsArray[0].equipment_desc)   */
					  
					   //sap.ui.getCore().getElementById('Equipment').setCustomContent(sap.m.icon("images/"+jobicons[0]))	
                     rowsArray[0].notiflongtext=rowsArray[0].notiflongtext.replace(/\|/g, '\r\n'); //AZURE
                     rowsArray[0].orderlongtext=rowsArray[0].orderlongtext.replace(/\|/g, '\r\n'); //AZURE
                     NLongtext=buildTimeline(rowsArray[0].notifshorttext+unescape(rowsArray[0].notiflongtext))
                     
                     Longtext=unescape(rowsArray[0].orderlongtext) 
             
                      
               }
                   
              if(JobType.length>3){
                     if(surveyID!="0"){
                           oDetailPage.addContent(buildDetailsTabs("FORM",surveyID,docsVisible))

                                  
                             sap.ui.getCore().getElementById('LongText').setText(Longtext) 
                             if(currentNotifNo=="" || currentNotifNo==null){
                            	 sap.ui.getCore().getElementById('LONGTEXT').setVisible(false);
                             }
                             else
                            	 {
                              sap.ui.getCore().getElementById('LONGTEXT').addContent(new sap.ui.core.HTML({content: NLongtext})) ;
                              sap.ui.getCore().getElementById('LONGTEXT').setVisible(true);
                            	 }
                           buildDetailsTabContent(orderno,opno,"FORM",surveyID)
                     }else{
                     html5sql.process("Select * from myitems where notifno = '"+currentNotifNo+"'",
                                  function(transaction, results, rowsArray){
                           
                                               cnt=0
                                               while(cnt < rowsArray.length){
                                                     tabsdesc=tabsdesc+rowsArray[cnt].descript+":"
                                                     tabsid=tabsid+rowsArray[cnt].item_id+":"
                                                     cnt++;
                                               }
                                               tabsdesc=tabsdesc+"END"
                                               tabsid=tabsid+"END"
                                               oDetailPage.addContent(buildDetailsP100Tabs(tabsdesc,tabsid))
                                               
                                                 buildDetailsP100TabContent(orderno,opno,currentNotifNo,tabsid)
                                               cnt=0;
                                               while(cnt < rowsArray.length){
                                                      P100TabContData(currentNotifNo,rowsArray[cnt].item_id)
                                               
                                                      cnt++;
                                               }
                                                      
                                                       
                                                
                            },
                           function(error, statement){
                                  //outputLogToDB(); 
                            }        
                           );
                     }
              }else{


               
                     oDetailPage.addContent(buildDetailsTabs("NORMAL","0",docsVisible))

                     
                       sap.ui.getCore().getElementById('LongText').setText(Longtext)  
                       if(currentNotifNo=="" || currentNotifNo==null){
                      	 sap.ui.getCore().getElementById('LONGTEXT').setVisible(false);
                       }
                       else{
                    	   sap.ui.getCore().getElementById('LONGTEXT').setVisible(true);
                       sap.ui.getCore().getElementById('LONGTEXT').addContent(new sap.ui.core.HTML({content: NLongtext})) ;
                       
                       }
                     buildDetailsTabContent(orderno,opno,"NORMAL","0")

              }
              
              prepareChangeStatus()      
               //outputLogToDB();  
       },
       function(error, statement){
	   //alert(error+":"+statement)
              //outputLogToDB(); 
        }        
       );     









}


function BuildFormAssets(assetid){
	var asset_id=""
	var asset_name=""
	var asset_type=""
	
	
	
	var	tabBar  = new sap.m.IconTabBar('AssetDetailsTabBar',
				{
					expanded:'{device>/isNoPhone}',
					expandable:false,
					select:[function(oEvt) {	
						
						  if(oEvt.getParameters().key=="AssetCharacteristics"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="AssetLongText"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="AssetMeasurementPoints"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="AssetHistory"){
							  //oDetailPage.setFooter(materialFooter)
							  }
						  
						}
					],
					
					items: [

	
	       	                new sap.m.IconTabFilter( {
	    	                   key:'AssetLongText',
	    	                   tooltip: 'Long Text',
	    	                   icon: "sap-icon://document-text",
	    	                   content:[
										new sap.m.Text( 'AssetLongTextContent',{})
	    	                            ]
	    	                }),
	       	                
	    	                new sap.m.IconTabFilter( {
	    	            	    key:'AssetCharacteristics',
	    	            	    tooltip: 'Characteristics',
	    	            	    icon: "sap-icon://form",
	    	            	       	                   content:[
	    	            	       	        	               
	    	            									new sap.m.Table("AssetCharacteristicsTable",{
	    	            										
	    	            										mode: sap.m.ListMode.SingleSelectMaster,
	    	            										selectionChange: function(evt){
	    	            											
	    	            											//selectedReserverMaterial=oEvt.getParameter("selectedItem").getKey()
	    	            											
	    	            											//sap.ui.getCore().byId("NewGroup").getSelectedItem().getKey()
	    	            											selectedCharacteristic=evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()
	    	            											this.removeSelections()
	    	            											formAssetCharacteristic.open()
	    	            									    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Id"}),
	    	            										        	 hAlign: 'Left',width: '25%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Name"}),
	    	            										        	 hAlign: 'Left',width: '25%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Value"}),
	    	            										        	 hAlign: 'Left',width: '50%',minScreenWidth : "" , demandPopin: true })       	                         
	    	            								           	     ]
	    	            								           	  

	    	            									})
	    	            									]
	    	            						           	  
	    	            					    }),
	       	                new sap.m.IconTabFilter( {
	        	                   key:'AssetMeasurementPoints',
	        	                   tooltip: 'Measurement Points',
	        	                   icon: "sap-icon://measuring-point",
	           	                   content:[
	    									new sap.m.Table("AssetMeasurementPointsTable",{
	    										width:'100%',
	    										mode: sap.m.ListMode.SingleSelectMaster,
        										selectionChange: function(evt){
        											
        											//selectedReserverMaterial=oEvt.getParameter("selectedItem").getKey()
        											
        											//sap.ui.getCore().byId("NewGroup").getSelectedItem().getKey()
        											selectedCharacteristic=evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()
        											this.removeSelections()
        											formAssetMeasurementPoint.open()
        									    },
	    										columns:[
	    										         
	    										         
	    										         new sap.m.Column({header: new sap.m.Label({text:"Id"}),
	    										        	 hAlign: 'Left',width: '15%', minScreenWidth : "" , demandPopin: false}),
	    										         new sap.m.Column({header: new sap.m.Label({text:"Name"}),
	    										        	 hAlign: 'Left',width: '35%',minScreenWidth : "" , demandPopin: true}),
	    										         new sap.m.Column({header: new sap.m.Label({text:"Value"}),
	    										        	 hAlign: 'Left',width: '50%',minScreenWidth : "" , demandPopin: true })
	    										        	 ]
	    									})
	    									]          	                
	        	                }),
	           	                new sap.m.IconTabFilter( 'AssetHistory',{
	         	                   key:'AssetHistory',
	         	                   tooltip: 'Order & Notification History',
	         	                   icon: "sap-icon://work-history",
	            	                   content:[

	     									]          	                
	         	                })				            	                
	       	                ]


				});

		html5sql.process("select * from myassets where orderno = '"+CurrentOrderNo+"' and id = '"+assetid+"'",
				 function(transaction, results, rowsArray){
						if(rowsArray.length>0){
							asset_id= rowsArray[0].id
							asset_name= rowsArray[0].name
							asset_type= rowsArray[0].type
							var objectHeader  = new sap.m.ObjectHeader('AssetHeader',
									{
												
										title:asset_name,
										number:asset_id,
										numberUnit:asset_type,
									});
							formAssetDetails.addContent(objectHeader)	
							formAssetDetails.addContent(tabBar)
							 sap.ui.getCore().getElementById('AssetLongTextContent').setText(asset_name)	
							
							
							
							
	
							html5sql.process("select * from assetclassvals where id = '"+assetid+"'",
									 function(transaction, results, rowsArray){
											if(rowsArray.length>0){
												var n = 0;
												var opTable = sap.ui.getCore().getElementById('AssetCharacteristicsTable');
												sap.ui.getCore().getElementById('AssetCharacteristicsTable').destroyItems();
												while (n < rowsArray.length) {
													
											
													opTable.addItem (new sap.m.ColumnListItem({
														cells : 
															[
															new sap.m.Text({text: rowsArray[n].charact}),
												            new sap.m.Text({text: rowsArray[n].description}),
															new sap.m.Text({text:  rowsArray[n].valuechar})   
													 		]
														}));
													n++;
												 }
										


														

											}
											html5sql.process("select * from assetmeasurementpoints where id = '"+assetid+"'",
													 function(transaction, results, rowsArray){
															if(rowsArray.length>0){
																var n = 0;
																var opTable = sap.ui.getCore().getElementById('AssetMeasurementPointsTable');
																sap.ui.getCore().getElementById('AssetMeasurementPointsTable').destroyItems();
																while (n < rowsArray.length) {
																	
															
																	opTable.addItem (new sap.m.ColumnListItem({
																		cells : 
																			[
																			new sap.m.Text({text: rowsArray[n].mpoint}),
																            new sap.m.Text({text: rowsArray[n].description}),
																			new sap.m.Text({text:  rowsArray[n].value})   
																	 		]
																		}));
																	n++;
																 }
														


																		

															}
															html5sql.process("Select * from MyNotifications",
																	 function(transaction, results, rowsArray){

																		cnt = 0;
																		while (cnt<rowsArray.length){
																			item=rowsArray[cnt];
																			
																			
																			
																				
																			 
																			historyList.addItem(
																					  new sap.m.ObjectListItem("Notif:"+item.notifno,
																						  {
																					  title:item.shorttext,
																					  number:item.notifno, 
																					  numberUnit:"Notification",
																					
																					  type:sap.m.ListType.Active,
																				
																					  attributes: [
																									new sap.m.ObjectAttribute( {
																									    text: 'Type:'+item.type
																									}),
																					                new sap.m.ObjectAttribute( {
																					                    text: 'Start:'+formatDateTime1(item.startdate)
																					                }),
																					                new sap.m.ObjectAttribute( {
																					                	 text: 'Reported By:'+item.reportedBy
																					                }),
																					                new sap.m.ObjectAttribute( {
																					                	 text: 'Reported On:'+formatDateTime1(item.reportedon)
																					                })
																					                ],
																					    firstStatus: [
																					                new sap.m.ObjectStatus( {
																					                    text: item.priority
																					                })
																					                ]
																					  
																						  })
																					  );
																				  cnt++;
																		 }
																		html5sql.process("Select * from MyOrders",
																				 function(transaction, results, rowsArray){

																					cnt = 0;
																					while (cnt<rowsArray.length){
																						item=rowsArray[cnt];
																						
																						
																						
																							
																						 
																						historyList.addItem(
																								  new sap.m.ObjectListItem("Order:"+item.orderno,
																									  {
																								  title:item.shorttext,
																								  number:item.orderno, 
																								  numberUnit:"Order",
																								
																								  type:sap.m.ListType.Active,
																							
																								  attributes: [
																								               new sap.m.ObjectAttribute( {
																								                    text: 'Type:'+item.type
																								                }),
																								                new sap.m.ObjectAttribute( {
																								                    text: 'Start:'+formatDateTime1(item.startdate)
																								                }),
																								                new sap.m.ObjectAttribute( {
																								                	 text: 'Address:'+item.address
																								                })
																								                ],
																								    firstStatus: [
																								                new sap.m.ObjectStatus( {
																								                    text: item.priority
																								                })
																								                ]
																								  
																									  })
																								  );
																							  cnt++;
																					 }
																					sap.ui.getCore().getElementById('AssetHistory').destroyContent();
																					sap.ui.getCore().getElementById('AssetHistory').addContent(historyList);
																					
																				 },
																				 function(error, statement){
																					 opMessage(error+statement)
																				 }        
																				);
																		
																		
																	 },
																	 function(error, statement){
																		 opMessage(error+statement)
																	 }        
																	);	
															
													 },
													 function(error, statement){
														
													 }        
													);
											
									 },
									 function(error, statement){
										
									 }        
									); 

									
									//formAssetDetails.addContent(objectHeader)	
									//formAssetDetails.addContent(tabBar)
									
						}
				 },
				 function(error, statement){
					
				 }        
				); 
	



			
}
function BuildFormQuestions(x){
	
	var ToOutput='';
	var ToOutput1='';
	var SQLStatement="";
	var SQLStatement1="";
	var CurrentGroup="";
	var currentSQ=""
	var pars=x.split(":")
	var surveyID=pars[1]
	var groupID=pars[2]
	var questionID=pars[3]
	var questions=[];
var hdrOP=false;

SQLStatement1="select surveyquestion.surveyid, surveyquestion.groupid, surveyquestion.questionid, surveyquestion.questiontype, surveyquestion.defaultvalue, surveyquestion.name, surveyquestion.title, surveyquestion.dependsonid, surveyquestion.dependsonval, "
SQLStatement1+="surveysubquestion.subquestionid, surveysubquestion.subquestiontype, surveysubquestion.name as subquestionname, surveysubquestion.title as subquestiontitle from surveyquestion "
SQLStatement1+="left join surveysubquestion on  "
SQLStatement1+="surveysubquestion.surveyid = surveyquestion.surveyid and "
SQLStatement1+="surveysubquestion.groupid = surveyquestion.groupid and "
SQLStatement1+="surveysubquestion.questionid = surveyquestion.questionid "
SQLStatement1+="where surveyquestion.surveyid = '"+surveyID+"' and surveyquestion.groupid = '"+groupID+"' order by surveyquestion.groupid, surveyquestion.questionid"	


					html5sql.process(SQLStatement1,
							 function(transaction, results, rowsArray){
									
									for (var nq = 0; nq < rowsArray.length; nq++) {
										itemq = rowsArray[nq];
										
											if(itemq.subquestiontype==null){
												hdrOP=false;
												BuildQuestionField(hdrOP,'set'+itemq.groupid,"Q:"+itemq.questionid,itemq.questiontype,itemq.defaultvalue,itemq.title,itemq.dependsonid, itemq.dependsonval)												
											}else{
												if(hdrOP==false){
													hdrOP=true;
													BuildQuestionField(hdrOP,'set'+itemq.groupid,"Q:"+itemq.questionid,itemq.questiontype,itemq.defaultvalue,itemq.title,itemq.dependsonid, itemq.dependsonval)												
													
												}
												BuildSubQuestionField('set'+itemq.groupid,itemq.questiontype,"Q:"+itemq.subquestionid,itemq.subquestiontype,itemq.subquestiontitle)										
											}
									}


							 },
							 function(error, statement){
								 opMessage(error+statement)
							 }        
							); 
			
}
function saveFormQuestions(x){
	
	var ToOutput='';
	var ToOutput1='';
	var SQLStatement="";
	var SQLStatement1="";
	var CurrentGroup="";
	var currentSQ=""
	var pars=x.split(":")
	var surveyID=pars[1]
	var groupID=pars[2]
	var questionID=pars[3]
	var questions=[];
var hdrOP=false;
var saveDate=getDate()+getTime()
SQLStatement1="select surveyquestion.surveyid, surveyquestion.groupid, surveyquestion.questionid, surveyquestion.questiontype, surveyquestion.defaultvalue, surveyquestion.name, surveyquestion.title, surveyquestion.dependsonid, surveyquestion.dependsonval, "
SQLStatement1+="surveysubquestion.subquestionid, surveysubquestion.subquestiontype, surveysubquestion.name as subquestionname, surveysubquestion.title as subquestiontitle from surveyquestion "
SQLStatement1+="left join surveysubquestion on  "
SQLStatement1+="surveysubquestion.surveyid = surveyquestion.surveyid and "
SQLStatement1+="surveysubquestion.groupid = surveyquestion.groupid and "
SQLStatement1+="surveysubquestion.questionid = surveyquestion.questionid "
SQLStatement1+="where surveyquestion.surveyid = '"+surveyID+"' and surveyquestion.groupid = '"+groupID+"' order by surveyquestion.groupid, surveyquestion.questionid"	


					html5sql.process(SQLStatement1,
							 function(transaction, results, rowsArray){
									
									for (var nq = 0; nq < rowsArray.length; nq++) {
										itemq = rowsArray[nq];
										if(itemq.subquestiontype==null){
											hdrOP=false;
											saveQuestionField("Q:"+itemq.questionid,itemq.questiontype,surveyID,saveDate)									
										}else{
											if(hdrOP==false){
												hdrOP=true;
												saveQuestionField("Q:"+itemq.questionid,itemq.questiontype,surveyID,saveDate)									
											}
											saveQuestionField("Q:"+itemq.subquestionid,itemq.subquestiontype,surveyID,saveDate)												
										}
															}


							 },
							 function(error, statement){
								 opMessage(error+statement)
							 }        
							); 
			
}
function BuildQuestionHeaders(surveyID){
	
	var ToOutput='';
	var ToOutput1='';
	var SQLStatement="";
	var SQLStatement1="";
	var CurrentGroup="";
	var currentSQ=""
	var buttons=[]
	SQLStatement="SELECT *  "
	SQLStatement+="from SurveyGroup "
	SQLStatement+="where surveyid = '"+surveyID+"'"
	formtab.destroyContent()
	var container =  new sap.m.Panel("formContainer",{
					
					content:[
					        
					         ],
					
				})
		html5sql.process(SQLStatement,
		 function(transaction, results, rowsArray){
			
				for (var n = 0; n < rowsArray.length-1; n++) {
					
					item = rowsArray[n];

					container.addContent(
							new sap.ui.layout.form.SimpleForm({
	                   			maxContainerCols: 1,
	                   		//	visible: true,
	                  			editable: true,
	                  			content: [
		      							new sap.m.Button( {
		      								id: "QH:"+surveyID+":"+item.groupid+":"+item.id,
		    							    text: item.name,
		    							    
		    							    type: 	sap.m.ButtonType.Reject,
		    							    press: [ function(oEvt) {		  
		    							    	selectedFormQuestionGroup=oEvt.getParameters().id;
		    							    	selectedFormQuestionGroupTitle=sap.ui.getCore().getElementById(oEvt.getParameters().id).getText();
		    							    	//alert(sap.ui.getCore().getElementById(oEvt.getParameters().id).getText())
		    									formQuestions.open()
		    									  } ]
		    							})
		              				]
		              		

							}))


				

				}
				
				formtab.addContent(container)
				
	 
		 },
		 function(error, statement){
			
		 }        
		);

}
function BuildQuestionField(op,panelid,id,type, defaultvalue, title,  dependsonid, dependsonval){
var mode=false;
var visible=true
if(dependsonid>0){
	visible=false;
}
    if(op){
    	if(type=='Q'){
    		formQuestions.addContent(
    				new sap.ui.layout.form.SimpleForm("F"+id,{
                   			maxContainerCols: 2,
                   			visible: visible,
                  			editable: true,
                  			content: [new sap.m.Label({text:""}),new sap.m.Text({text:title}).addStyleClass("formHdr")
                  				
                  			]}).addStyleClass("sapUiSizeCompact"))
    		return
    	}
    }

	if(type=='S'){
		
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
               			visible: visible,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))


	}else if (type=="Y"){
		if(defaultvalue=="N"){
			mode=false;
		}else{
			mode=true;
		}
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
               			visible: visible,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Switch(id,{
              						state: mode,
              						change:[function(evt){
              							formChanged(evt)
              							
              						}],
              						type: sap.m.SwitchType.AcceptReject
              					})            				
              			]}).addStyleClass("sapUiSizeCompact"))
	}else if (type=="M"){
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
               			visible: visible,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))
		
	

	}else if (type=="!"){

		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
               			visible: visible,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))
	}else if (type==";"){
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 1,
               			visible: visible,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}))
	}else if (type=="Q"){
		
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
               			visible: visible,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact")	)	
	}else{
	
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
               			visible: visible,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))
		}

}
function BuildSubQuestionField(panelid,type,id,subtype,title){


	if(type=='S'){
		
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))


	}else if (type=="Y"){
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Switch(id,{
              						state: true,
              						change:[function(evt){
              							formChanged(evt)
              							
              						}],
              						type: sap.m.SwitchType.AcceptReject
              					})
              				
              			]}).addStyleClass("sapUiSizeCompact"))
	}else if (type=="M"){
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))
		
	

	}else if (type=="!"){

		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))
	}else if (type==";"){
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))
	}else if (type=="Q"){
		
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact")	)	
	}else{
	
		formQuestions.addContent(
				new sap.ui.layout.form.SimpleForm("F"+id,{
               			maxContainerCols: 2,
              			editable: true,
              			content: [new sap.m.Label({text:title+":"+type}),
              			        new sap.m.Input(id,{ type: sap.m.InputType.Input})
              				
              			]}).addStyleClass("sapUiSizeCompact"))
		}

}
function formChanged(oEvt){
	x=oEvt.getParameters().id.split(":")
	//alert(oEvt.getParameters().id)
	//alert(sap.ui.getCore().getElementById(oEvt.getParameters().id).getText())
	var SQLStatement="Select * from surveyquestionchildren where questionid = "+x[1]
	//alert(SQLStatement)
	html5sql.process(SQLStatement,
			 function(transaction, results, rowsArray){
					currentSQ=""
					if( rowsArray.length>0) {
						
						
						items = rowsArray[0];
						var qChildren = items.childquestions.split(":");
						for (var n = 0; n < qChildren.length; n++) {
							//alert(qChildren[n])
							if(sap.ui.getCore().getElementById("FQ:"+qChildren[n]).getVisible()){
								sap.ui.getCore().getElementById("FQ:"+qChildren[n]).setVisible(false)
							}else{
								sap.ui.getCore().getElementById("FQ:"+qChildren[n]).setVisible(true)
							}
							/* if(items.questionvalue==$("#"+id).val()){
								alert("toggle"+items.questionvalue)
								$('#Div'+qChildren[n]).show();
								}else{
								$('#Div'+qChildren[n]).hide();
								} */
							}
						
					}
						
						
			 },
			 function(error, statement){
				 opMessage("Error: " + error.message + " when SetConfigParam processing " + statement)
			 }        
			);	
}
function buildDetailsTabs(Jtype,surveyID,docsVisible){
tabBar=null;
formtab=null;
//sap.ui.getCore().getElementById('saveData').setVisible(false)
	if(Jtype=="FORM"){
		sap.ui.getCore().getElementById('saveData').setVisible(true)
		 formtab=new sap.m.IconTabFilter( 'FORM',{
	              key:'Form',
	              tooltip: 'Form',
	              icon: "sap-icon://form",
	              content:[

	                       ]
	           })
		 
		 BuildQuestionHeaders(surveyID)
	}
	
	tabBar  = new sap.m.IconTabBar('tabBar',
			{
				expanded:'{device>/isNoPhone}',
				expandable:false,
				select:[function(oEvt) {	
					
					  if(oEvt.getParameters().key=="Assets"){oDetailPage.setFooter(detailFooterAWS)}
					  if(oEvt.getParameters().key=="LongText"){oDetailPage.setFooter(detailFooterAWS)}
					  if(oEvt.getParameters().key=="OLongText"){oDetailPage.setFooter(detailFooterAWS)}
					  if(oEvt.getParameters().key=="Partners"){oDetailPage.setFooter(detailFooterAWS)}
					  if(oEvt.getParameters().key=="Materials"){oDetailPage.setFooter(detailFooterAWS)}
					  if(oEvt.getParameters().key=="TConf"){oDetailPage.setFooter(detailFooterAWS)}
					}
				],
				
				items: [


       	                new sap.m.IconTabFilter( 'LONGTEXT',{
       	                	text:'Notification',
    	                   key:'LongText',
    	                   tooltip: 'Long Text',
    	                   icon: "sap-icon://document-text",
    	                   content:[
									new sap.m.Text( 'NLongText',{})
    	                            ]
    	                }),
    	                new sap.m.IconTabFilter( 'OLONGTEXT',{
        	                   text:'Order',
     	                   key:'OLongText',
     	                   tooltip: 'Long Text',
     	                   icon: "sap-icon://document-text",
     	                   content:[
     	                	   
     	                		new sap.m.IconTabBar(
     	                				{
     	                					expanded:'{device>/isNoPhone}',
     	                					expandable:false,
     	                					select:[function(oEvt) {	
     	                						
     	                						 
     	                						 
     	                						  
     	                						}
     	                					],
     	                					
     	                					items: [

     	                	
     	                	       	                new sap.m.IconTabFilter( {
     	                	       	                   text:'Long Text',
     	                	    	                   tooltip: 'Long Text',
     	                	    	                   icon: "sap-icon://document-text",
     	                	    	                   content:[
     	                	    	                	   new sap.m.Text( 'LongText',{})
     	                	    	                            ]
     	                	    	                }),
     	                	       	                
     	                	    	                new sap.m.IconTabFilter( {
     	                	    	                	text:'Operations',
     	                	    	            	    tooltip: 'Completed Operations',
     	                	    	            	    icon: "sap-icon://list",
     	                	    	            	       	                   content:[
     	                	    	            	       	        	               
     	                	    	            									new sap.m.Table("CompletedOps",{
     	                	    	            										
     	                	    	            										mode: sap.m.ListMode.SingleSelectMaster,
     	                	    	            										selectionChange: function(evt){
     	                	    	            									    },
     	                	    	            										columns:[
     	                	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Oper"}),
     	                	    	            										        	 hAlign: 'Left',width: '15%', minScreenWidth : "" , demandPopin: false}),
     	                	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Completed"}),
     	                	    	            										        	 hAlign: 'Left',width: '35%',minScreenWidth : "" , demandPopin: true}),
         	                	    	            										     new sap.m.Column({header: new sap.m.Label({text:"Description"}),
         	                	    	            										        	 hAlign: 'Left',width: '35%',minScreenWidth : "" , demandPopin: true}),
     	                	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Status"}),
     	                	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true })       	                         
     	                	    	            								           	     ]
     	                	    	            								           	  

     	                	    	            									})
     	                	    	            									]
     	                	    	            						           	  
     	                	    	            					    })
 				            	                
     	                	       	                ]


     	                				})  	                	   
     	                	   
     	                	   
     	                	   
     	                	   
 									
     	                            ]
     	                }),
    	                formtab,      	                
    	                new sap.m.IconTabFilter( 'OBJECTS',{
    	                	text:'Assets',
    	                    key:'Assets',
    	                    tooltip: 'Assets',
    	                    icon: "sap-icon://machine",
    	                       	                   content:[
    	                       	        	               
    	                								new sap.m.Table("AssetsTable",{
    	                									mode: sap.m.ListMode.SingleSelectMaster,
    	                									selectionChange: function(oEvt){
    	                										var x=oEvt.getParameter("listItem").getId().split(":")
    	                										this.removeSelections()
    	                										selectedOrderAssetID=x[1];
    	                										this.removeSelections()
    	                										formAssetDetails.open()
    	                								    },
    	                								   
    	                									columns:[
    	                									         new sap.m.Column({header: new sap.m.Label({text:"Id"}),
    	                									        	 hAlign: 'Left',width: '25%', minScreenWidth : "" , demandPopin: false}),
    	                									         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
    	                									        	 hAlign: 'Left',width: '10%',minScreenWidth : "" , demandPopin: true}),
    	                									         new sap.m.Column({header: new sap.m.Label({text:"Name"}),
    	                									        	 hAlign: 'Left',width: '65%',minScreenWidth : "" , demandPopin: true }),
    	                									        new sap.m.Column({header: new sap.m.Label({text:""}),
        	                									        hAlign: 'Left',width: '5%',minScreenWidth : "" , demandPopin: true })
    	                							           	     ]
    	                							           	  

    	                								})
    	                								]
    	                					           	  
    	                				    }),					    
       	                new sap.m.IconTabFilter( 'PARTNERS',{
       	                	text:'Location',
        	                   key:'Partners',
        	                   tooltip: 'Location',
        	                   icon: "sap-icon://addresses",
           	                   content:[]          	                
        	                }),
           	                new sap.m.IconTabFilter( 'MATERIALS',{
           	                	visible:false,
           	                	text:'Materials',
         	                   key:'Materials',
         	                   tooltip: 'Materials',
         	                   icon: "sap-icon://energy-saving-lightbulb",
            	                   content:[
     									new sap.m.Table("MaterialsTable",{
     										width:'100%',
    										mode: sap.m.ListMode.SingleSelectMaster,
    										selectionChange: function(evt){
    											
    											//selectedReserverMaterial=oEvt.getParameter("selectedItem").getKey()
    											
    											//sap.ui.getCore().byId("NewGroup").getSelectedItem().getKey()
    											selectedCharacteristic=evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()
    											this.removeSelections()
    											formMaterialConsume.open()
    									    },
     										columns:[
     										         
     										         
     										         new sap.m.Column({header: new sap.m.Label({text:"Id"}),
     										        	 hAlign: 'Left',width: '30%', minScreenWidth : "" , demandPopin: false}),
     										         new sap.m.Column({header: new sap.m.Label({text:"Description"}),
     										        	 hAlign: 'Left',width: '50%',minScreenWidth : "" , demandPopin: true }),     	                         
     										         new sap.m.Column({header: new sap.m.Label({text:"Qty"}),
     										        	 hAlign: 'Left',width: '20%',minScreenWidth : "" , demandPopin: true }),   
     										        	 ]
     									})
     									]          	                
         	                }),
           	                new sap.m.IconTabFilter( 'TCONF',{
           	                	text:'Time',
         	                   key:'TConf',
         	                  tooltip: 'Time Confirmations',
         	                  icon: "sap-icon://time-entry-request",
            	                   content:[
     									new sap.m.Table("TConfsTable",{
     										width:'100%',
     										columns:[
     										         
     										         
     										         new sap.m.Column({header: new sap.m.Label({text:"No"}),
     										        	 hAlign: 'Left',width:'10%', minScreenWidth : "" , demandPopin: false}),
         										     new sap.m.Column({header: new sap.m.Label({text:"Type"}),
         										         hAlign: 'Left',width:'10%', minScreenWidth : "" , demandPopin: false}),
             										 new sap.m.Column({header: new sap.m.Label({text:"Start"}),
     										        	 hAlign: 'Left',width:'15%', minScreenWidth : "" , demandPopin: false}),
             										 new sap.m.Column({header: new sap.m.Label({text:"End"}),
     										        	 hAlign: 'Left',width:'15%', minScreenWidth : "small" , demandPopin: true}),
             										 new sap.m.Column({header: new sap.m.Label({text:"Duration"}),
     										        	 hAlign: 'Right',width:'10%', minScreenWidth : "small" , demandPopin: true}),
	         										 new sap.m.Column({header: new sap.m.Label({text:"Fin"}),
	 										        	 hAlign: 'Left',width:'8%', minScreenWidth : "small" , demandPopin: true}),
	 										         new sap.m.Column({header: new sap.m.Label({text:"Description"}),
	 										        	 hAlign: 'Left',width:'32%', minScreenWidth : "small" , demandPopin: true}),                    
								           	     ]
     									})
     									]          	                
         	                }),		
           	                new sap.m.IconTabFilter( 'JOBDOCS',{
           	                	text:'Documents',
         	                   key:'JobDocs',
         	                  tooltip: 'Documents',
								//visible:docsVisible,
         	                  icon: "sap-icon://documents",
            	                   content:[
										new sap.m.Button( {
											icon:"sap-icon://document",
										type: 	sap.m.ButtonType.Accept,
										tap: [ function(oEvt) {
										   attachFilename="";
										   selectedFormId=-1
										   formGetDoc.open()
										           } ]
										}), 
     									new sap.m.Table("JobDocumentTable",{
     										width:'100%',
     										 mode: sap.m.ListMode.SingleSelectMaster,
     										selectionChange: function(evt){
     											if(evt.getParameter("listItem").getCells()[1].getText()=="FORM"){
     												selectedFormId=evt.getParameter("listItem").getCells()[2].getText()
     												//if(sap.ui.getCore().getElementById(evt.getParameter("listItem").getCells()[6].getId()).getVisible()){
     													if(evt.getParameter("listItem").getCells()[3].getText()=="Sent"){
     														sap.ui.getCore().getElementById("Rename").setVisible(false);
     														sap.ui.getCore().getElementById("Delete").setVisible(false);
     														sap.ui.getCore().getElementById("Upload").setVisible(false);
     														sap.ui.getCore().getElementById("Edit").setText("View");
     														sap.ui.getCore().getElementById("Edit").setIcon("sap-icon://detail-view");
     														disableformFlag=true;
     														NewFormflag=false;
     													}
     													else{
     														sap.ui.getCore().getElementById("Rename").setVisible(true);
     														sap.ui.getCore().getElementById("Delete").setVisible(true);
     														sap.ui.getCore().getElementById("Upload").setVisible(true);
     														sap.ui.getCore().getElementById("Edit").setText("Edit");
     														sap.ui.getCore().getElementById("Edit").setIcon("sap-icon://edit");
     														disableformFlag=false;
     														NewFormflag=false;
     													}
     													this.removeSelections()
     													formFormFunctions.open()
     													
     												//}
     												
     												
     											}else if(evt.getParameter("listItem").getCells()[1].getText()=="ATTACHMENT"){
     												selectedFormId=evt.getParameter("listItem").getCells()[2].getText()
     												if(sap.ui.getCore().getElementById(evt.getParameter("listItem").getCells()[6].getId()).getVisible()){
     													this.removeSelections()
     													formAttachmentFunctions.open()
     													
     												}
     												
     												
     											}else{
     												selectedFormId=evt.getParameter("listItem").getCells()[2].getText();
     												//if(sap.ui.getCore().getElementById(evt.getParameter("listItem").getCells()[6].getId()).getVisible()){
     													//if(evt.getParameter("listItem").getCells()[3].getText()==""){
     													downloadDrawFile(evt.getParameter("listItem").getCells()[0].getText(),
     	     													evt.getParameter("listItem").getCells()[5].getText(),
     	     													evt.getParameter("listItem").getCells()[2].getText(),
     	     													evt.getParameter("listItem").getCells()[4].getText())
     												//}
     												
     												this.removeSelections()		
     											}
     											
     											
     									    },
     										columns:[
    										         new sap.m.Column({header: new sap.m.Label({text:"Filename",design:sap.m.LabelDesign.Bold}),
    										        	 hAlign: 'Left',width: '60%', minScreenWidth : "" , demandPopin: false}),
    										         new sap.m.Column({header: new sap.m.Label({text:"Type",design:sap.m.LabelDesign.Bold}),
    										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),										                   										        	 
    										         new sap.m.Column({header: new sap.m.Label({text:"Node",design:sap.m.LabelDesign.Bold}),
    										        	 hAlign: 'Left',width: '0%',minScreenWidth : "" ,  visible:false, demandPopin: true }),
  										        	 new sap.m.Column({header: new sap.m.Label({text:"Status",design:sap.m.LabelDesign.Bold}),
      										        	 hAlign: 'Left',width: '20%',minScreenWidth : "" , demandPopin: true }),
   	 										       	 new sap.m.Column({header:  new sap.m.Label({text:""}),
   	    										       	 hAlign: 'Right',width: '0%',minScreenWidth : "" , visible:false, demandPopin: true }) ,
    										       	 new sap.m.Column({header:  new sap.m.Label({text:""}),
   	    										       	 hAlign: 'Right',width: '0%',minScreenWidth : "" , visible:false, demandPopin: true }),
   	    										      new sap.m.Column({header:  new sap.m.Label({text:""}),
    	    										       	 hAlign: 'Right',width: '5%',minScreenWidth : "" , demandPopin: true }) 
    								           	     ]
     									}).addStyleClass("TableText")
     									]          	                
         	                }),	
         	               new sap.m.IconTabFilter( 'JOBPHOTOS',{
          	                	text:'Photos',
        	                   key:'JobPhotos',
        	                  tooltip: 'Photos',
        	                  icon: "sap-icon://attachment-photo",
        	                 
           	                   content:[
new sap.m.Button( {
		icon:"sap-icon://camera",
   type: 	sap.m.ButtonType.Accept,
   tap: [ function(oEvt) {
	   selectedPhotoType="JOB"
	   	   selectedPhotoID=0;
		   //formPhotoDetails.open()   
	   formGetPhoto.open()
               } ]
}), 
    									new sap.m.Table("JobPhotoTable",{
    										 mode: sap.m.ListMode.SingleSelectMaster,
    											selectionChange: function(evt){
    												selectedPhotoID=evt.getParameter("listItem").getCells()[5].getText()
    												selectedPhotoState=evt.getParameter("listItem").getCells()[3].getText()
    												this.removeSelections()
    												formPhotoDetails.open()  
    												//showFile(evt.getParameter("listItem").getCells()[5].getText())
    										    },
    										width:'100%',
    										columns:[
   										         new sap.m.Column({header: new sap.m.Label({text:"Description",design:sap.m.LabelDesign.Bold}),
   										        	 hAlign: 'Left',width: '30%', minScreenWidth : "" , demandPopin: false}),
   										         new sap.m.Column({header: new sap.m.Label({text:"Details",design:sap.m.LabelDesign.Bold}),
      										         hAlign: 'Left',width: '40%', minScreenWidth : "" , demandPopin: false}),
   										         new sap.m.Column({header: new sap.m.Label({text:"Size",design:sap.m.LabelDesign.Bold}),
   										        	 hAlign: 'Left',width: '10%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
   										         new sap.m.Column({header: new sap.m.Label({text:"Status",design:sap.m.LabelDesign.Bold}),
   										        	 hAlign: 'Left',width: '20%',minScreenWidth : "" , demandPopin: true }),
   										        
 										       	 new sap.m.Column({header:  new sap.m.Label({text:""}),
    										       	 hAlign: 'Right',width: '0%',minScreenWidth : "" , visible:false, demandPopin: true }),
    										       	new sap.m.Column({header:  new sap.m.Label({text:""}),
       										       	 hAlign: 'Right',width: '0%',minScreenWidth : "" , visible:false, demandPopin: true }),
       										  	new sap.m.Column({header:  new sap.m.Label({text:""}),
      										       	 hAlign: 'Right',width: '5%',minScreenWidth : "" , visible:true, demandPopin: true })
   								           	     ]
    									}).addStyleClass("TableText")
    									]          	                
        	                }),	
       	                ]


			});
	
	return tabBar;

	}
function downloadDrawFile(fname,url,nodeid,drawid){
	
	if(url.length < 10){
		
		requestLiveLink(fname,nodeid.trim(),drawid)
		buildJobDocsTable()
	}else{
		if(url=="Download Failed"){
			requestLiveLink(fname,nodeid.trim(),drawid)
			buildJobDocsTable()
		}else if(url!="RequestLiveLink"){
			window.open(url, "_system", 'location=yes,closebuttoncaption=Return') 
			
		}
	}
}
function requestLiveLink(fname,nodeid,drawid){
	updateMyJobDetsDraw(drawid,"RequestLiveLink")
	SetConfigParam('LASTSYNC_UPLOAD', "20120101010101");
	syncUpload()
}
function buildDetailsP100Tabs(tabsdesc,tabsid){
	
tabitemsdesc=tabsdesc.split(":")
tabitemsid=tabsid.split(":")
selectedTab="Task:"+tabitemsid[0]

	var tabBar  = new sap.m.IconTabBar('tabBar',
			{
				expanded:'{device>/isNoPhone}',
				visible: false,
				expandable:false,
				select:[function(oEvt) {	
						if(selectedTab!=oEvt.getParameters().key){
							selectedTab=oEvt.getParameters().key;
						}
					}
				],
				
				items: [       	       
				      new sap.m.IconTabFilter( 'LONGTEXT',{
	                   key: 'LongText',
	                   text: 'Long Text',
	                   tooltip: 'Long Text',
	                   content:[
								new sap.m.Text( 'LongText',{})
	                            ]
	                })
			            	                
       	                ]


			});
cnt=0
while(tabitemsdesc[cnt]!="END"){
	
	tabBar.addItem(
               new sap.m.IconTabFilter( "Task:"+tabitemsid[cnt],{
	                  
	                  text:tabitemsdesc[cnt],
	                  tooltip: tabitemsdesc[cnt],
	                 
	                   content:[
								

	       	                	 new sap.ui.layout.form.SimpleForm('TaskContent:'+tabitemsid[cnt],{
	       	                			maxContainerCols: 2,
	        	              			editable: true,
	        	              			visible:false,
	        	              			content: [

	        	              				
	        	              			]
	        	              		
	       	                	 })
								]          	                
	                })			
	)
cnt=cnt+1	
}
	return tabBar;

	}
	
	
function buildDetailsP100TabContent(orderNo,OpNo,notifno,tabsid){
tabitemsid=tabsid.split(":")


	//Create Status Details
sap.ui.getCore().getElementById('saveData').setVisible(true)

sap.ui.getCore().getElementById('tabBar').setVisible(false)
var cnt=0;
	while(tabitemsid[cnt]!="END"){
		P100TabCont(notifno,tabitemsid[cnt])
		
	
	cnt=cnt+1;
	} 
	sap.ui.getCore().getElementById('tabBar').setVisible(true)
	
}


function P100TabCont(notifno,tabid){
var tasktext;	
var phototab;
var n = 0;
var tabcontent;
var tabcontentQ;
	html5sql.process("SELECT * FROM mytasks where notifno = '"+notifno+"' and item_id = '"+tabid+"';",
			 function(transaction, results, rowsArray){
				tabcontent = sap.ui.getCore().getElementById('Task:'+tabid);
				tabcontentQ = sap.ui.getCore().getElementById('TaskContent:'+tabid);
				tabcontentQ.destroyContent();
				n = 0;
				while (n < rowsArray.length) {
					
					
					tasktext=rowsArray[n].task_text.split(":")
					
					if(tasktext[0]=="HDR"){
						tabcontent.setTooltip(tasktext[1]);
						
					}else{
						
						tabcontentQ.addContent (new sap.m.Label({text:tasktext[1]}));
						
						if(tasktext[0]=="SIG"){
							
							//alert("T"+tabid+":"+n)
							tabcontentQ.addContent (new sap.m.Button("T"+tabid+":"+n, {
							    text: "Capture Signature",
							    icon:"sap-icon://signature",
							    type: 	sap.m.ButtonType.Accept,
							    tap: [ function(oEvt) {		
							    	formSignature.open()
							    	
									  } ]
							}));
							
							tabcontentQ.addContent (new sap.m.Label({text:"Signature Image"}));
							//tabcontentQ.addContent (new sap.ui.core.HTML({content: '<img width= "10%" id="imagePreview'+tabid+'">'}))
							tabcontentQ.addContent (new sap.m.Image('signaturePreview'+tabid,{
								width:"20%",
								tap: [ function(oEvt) {		  
									formSignature.open()
									  } ]
							}));
						}else if(tasktext[0]=="PHOTO"){
							phototab="Y"
								//alert("T"+tabid+":"+n)
								tabcontentQ.addContent (new sap.m.Button("T"+tabid+":"+n, {
								    text: "Take Photo",
								    icon:"sap-icon://add-photo",
								    type: 	sap.m.ButtonType.Accept,
								    tap: [ function(oEvt) {		
								    	//formPhoto.open()
								    	takePhoto()
										  } ]
								}));
							
								tabcontentQ.addContent (new sap.m.Label({text:"Image"}));
								//tabcontentQ.addContent (new sap.ui.core.HTML({content: '<img width= "10%" id="imagePreview'+tabid+'">'}))
								tabcontentQ.addContent (new sap.m.Image('imagePreview'+tabid,{
									width:"10%",
									tap: [ function(oEvt) {		  
										formPhoto.open()
										  } ]
								}));
							}else if(tasktext[0]=="YN"){
							tabcontentQ.addContent (new sap.m.Switch("T"+tabid+":"+n,{
								state: false,
								type: sap.m.SwitchType.AcceptReject
							}));
							
						}else if(tasktext[0]=="TXT"){
							tabcontentQ.addContent (new sap.m.Input("T"+tabid+":"+n,{type: sap.m.InputType.Text}));
							
						}else if(tasktext[0]=="NUM"){
							tabcontentQ.addContent (new sap.m.Input("T"+tabid+":"+n,{type: sap.m.InputType.Number}));
					 	}else if(tasktext[0]=="CHK"){
							tabcontentQ.addContent (new sap.m.CheckBox("T"+tabid+":"+n,{selected:false, visible: true, enabled: true}));
						}else if(tasktext[0]=="LTXT"){
							tabcontentQ.addContent (new sap.m.TextArea("T"+tabid+":"+n,{rows: 5}));
						}
					//setP100FieldVal(tasktext[0],"T"+tabid+":"+n,localStorage.getItem('MobileUser'),CurrentOrderNo,CurrentOpNo,tabid,n)	
					}
					n++;
				 }
				tabcontentQ.setVisible(true);
				
				

			 },
			 function(error, statement){
				 opMessage(statement)
			 }        
			);	
}
function saveTheData()
{
	x=selectedTab.split(":")
	//alert("SELECT * FROM mytasks where notifno = '"+currentNotifNo+"' and item_id = '"+x[1]+"';")
	html5sql.process("SELECT * FROM mytasks where notifno = '"+currentNotifNo+"' and item_id = '"+x[1]+"';",
			 function(transaction, results, rowsArray){
			
				n = 0;
				while (n < rowsArray.length) {
					
					
					tasktext=rowsArray[n].task_text.split(":")
					
					if(tasktext[0]=="HDR"){
						//alert("Saving->"+tasktext[1])
						
					}else{
						
						
						
						if(tasktext[0]=="PHOTO"){
							saveTheAnswer(CurrentOrderNo,CurrentOpNo,localStorage.getItem('MobileUser'),
									getDate()+getTime(),x[1],n,"imagePreview"+x[1],"PHOTO")
							//alert("Saving Field->"+tasktext[1]+"Check "+"T"+x[1]+":"+n+" for photo"+$("#imagePreview"+x[1]).attr("src"))

						}else if(tasktext[0]=="YN"){
							saveTheAnswer(CurrentOrderNo,CurrentOpNo,localStorage.getItem('MobileUser'),
									getDate()+getTime(),x[1],n,sap.ui.getCore().getElementById('T'+x[1]+":"+n).getState(),"NORMAL")
							//alert("Saving Field->"+tasktext[1]+"Check "+"T"+x[1]+":"+n+" for YN"+sap.ui.getCore().getElementById('T'+x[1]+":"+n).getState())
						}else if(tasktext[0]=="TXT"){
							saveTheAnswer(CurrentOrderNo,CurrentOpNo,localStorage.getItem('MobileUser'),
									getDate()+getTime(),x[1],n,sap.ui.getCore().getElementById('T'+x[1]+":"+n).getValue(),"NORMAL")
							//alert("Saving Field->"+tasktext[1]+"Check "+"T"+x[1]+":"+n+" for TXT val"+sap.ui.getCore().getElementById('T'+x[1]+":"+n).getValue())
						}else if(tasktext[0]=="NUM"){
							saveTheAnswer(CurrentOrderNo,CurrentOpNo,localStorage.getItem('MobileUser'),
									getDate()+getTime(),x[1],n,sap.ui.getCore().getElementById('T'+x[1]+":"+n).getValue(),"NORMAL")
							//alert("Saving Field->"+tasktext[1]+"Check "+"T"+x[1]+":"+n+" for NUM val"+sap.ui.getCore().getElementById('T'+x[1]+":"+n).getValue())
					 	}else if(tasktext[0]=="CHK"){
					 		saveTheAnswer(CurrentOrderNo,CurrentOpNo,localStorage.getItem('MobileUser'),
									getDate()+getTime(),x[1],n,sap.ui.getCore().getElementById('T'+x[1]+":"+n).getSelected(),"NORMAL")
					 		//alert("Saving Field->"+tasktext[1]+"Check "+"T"+x[1]+":"+n+" for CHK"+sap.ui.getCore().getElementById('T'+x[1]+":"+n).getSelected())
						}else if(tasktext[0]=="LTXT"){
							saveTheAnswer(CurrentOrderNo,CurrentOpNo,localStorage.getItem('MobileUser'),
									getDate()+getTime(),x[1],n,sap.ui.getCore().getElementById('T'+x[1]+":"+n).getValue(),"NORMAL")
							//alert("Saving Field->"+tasktext[1]+"Check "+"T"+x[1]+":"+n+" for LTXT val"+sap.ui.getCore().getElementById('T'+x[1]+":"+n).getValue())
						}else if(tasktext[0]=="SIG"){
							saveTheAnswer(CurrentOrderNo,CurrentOpNo,localStorage.getItem('MobileUser'),
									getDate()+getTime(),x[1],n,"signaturePreview"+x[1],"SIG")
							
						}
					}
					n++;
				 }

				
				

			 },
			 function(error, statement){
				 opMessage(statement)
			 }        
			);	
}

function P100TabContData(notifno,tabid){

	var tasktext;	
	var phototab;
	var n = 0;
	var tabcontent;
	var tabcontentQ;
	tabFieldCnt=0;
	tabContents=[];
		html5sql.process("SELECT * FROM mytasks where notifno = '"+notifno+"' and item_id = '"+tabid+"';",
				 function(transaction, results, rowsArray){
					tabFieldCnt=rowsArray.length
					n = 0;
					while (n < rowsArray.length) {	

						tasktext=rowsArray[n].task_text.split(":")					
						setP100FieldVal(tasktext[0],"T"+tabid+":"+n,localStorage.getItem('MobileUser'),CurrentOrderNo,CurrentOpNo,tabid,n)	
			
						n++;
					 }

					
					

				 },
				 function(error, statement){
					 opMessage(statement)
				 }        
				);	
	}
function setP100FieldVal(type,fldid,user,order,opno,item,task)	{

	//alert(type+"-"+fldid+"-"+user+"-"+order+"-"+opno+"-"+item+"-"+task)
	html5sql.process("select * from JobAnswers where orderno = '"+order+
			"' and opno = '"+opno+"' and user = '"+user+"' and item = '"+item+"' and task = '"+task+"';",
				function(transaction, results, rowsArray){
					if(rowsArray.length>0){
						tabContents.push(rowsArray[0].value)
						if(type=="PHOTO"){
							$("#imagePreview"+item).attr("src",unescape(rowsArray[0].value))
						
				
						}else if(type=="YN"){
							if (rowsArray[0].value){
							sap.ui.getCore().getElementById(fldid).setState(true)
							}else{
							sap.ui.getCore().getElementById(fldid).setState(false)
							}
						}else if(type=="TXT"){
							sap.ui.getCore().getElementById(fldid).setValue(rowsArray[0].value)
							
						}else if(type=="NUM"){
							sap.ui.getCore().getElementById(fldid).setValue(rowsArray[0].value)
					 	}else if(type=="CHK"){

					 		sap.ui.getCore().getElementById(fldid).setSelected(rowsArray[0].value)
						}else if(type=="LTXT"){
							sap.ui.getCore().getElementById(fldid).setValue(rowsArray[0].value)
						}else if(type=="SIG"){
							sap.ui.getCore().getElementById("signaturePreview"+item).setSrc(unescape(rowsArray[0].value))
							
							
						}
					}else{
						tabContents.push("--NOTSET--")
					}
			 },
			 function(error, statement){
				opMessage("Error: " + error.message + " when updateOrderLatLong processing " + statement);
			 }        
			);
}	
	
function buildDetailsTabContent(orderNo,OpNo,Jtype,surveyID){


//Create Status Details
if(Jtype=="Form"){
	tabcontent = sap.ui.getCore().getElementById('Form');
	tabContent.addContent(new sap.m.Text({text:surveyID}))
}


//Assets

//New Asset Stuff

sap.ui.getCore().getElementById('OBJECTS').destroyContent()
buildEQMatrix(selectedJobArray.equipment_code)



//Mpoints

html5sql.process("SELECT * FROM MyJobDetsAddress where orderno = '"+orderNo+"' and opno = '"+OpNo+"' ;",
		 function(transaction, results, rowsArray){
		 var captions=[];
		 var values=[];
		  console.log("Recs"+rowsArray.length)
		 if(rowsArray.length>0){
			 
			 captions.push(rowsArray[0].caption01)
			 captions.push(rowsArray[0].caption02)
			 captions.push(rowsArray[0].caption03)
			 captions.push(rowsArray[0].caption04)
			 captions.push(rowsArray[0].caption05)
			 captions.push(rowsArray[0].caption06)
			 captions.push(rowsArray[0].caption07)
			 captions.push(rowsArray[0].caption08)
			 captions.push(rowsArray[0].caption09)
			 captions.push(rowsArray[0].caption10)
			 captions.push(rowsArray[0].caption11)
			 captions.push(rowsArray[0].caption12)
			 values.push(rowsArray[0].address01)
			 values.push(rowsArray[0].address02)
			 values.push(rowsArray[0].address03)
			 values.push(rowsArray[0].address04)
			 values.push(rowsArray[0].address05)
			 values.push(rowsArray[0].address06)
			 values.push(rowsArray[0].address07)
			 values.push(rowsArray[0].address08)
			 values.push(rowsArray[0].address09)
			 values.push(rowsArray[0].address10)
			 values.push(rowsArray[0].address11)
			 values.push(rowsArray[0].address12)	
			addDets=CreateAddressMatrix(captions,values)
			sap.ui.getCore().getElementById('PARTNERS').destroyContent()
			 sap.ui.getCore().getElementById('PARTNERS').addContent(addDets)
		 }


		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);	
//Materialss
html5sql.process("SELECT * FROM MyMaterials where orderno = '"+orderNo+"';",
		 function(transaction, results, rowsArray){
			var n = 0;
			var opTable = sap.ui.getCore().getElementById('MaterialsTable');
			sap.ui.getCore().getElementById('MaterialsTable').destroyItems();
			while (n < rowsArray.length) {
				
		
				opTable.addItem (new sap.m.ColumnListItem({
					cells : 
						[
						new sap.m.Text({text: rowsArray[n].material}),
			            new sap.m.Text({text: rowsArray[n].description}),
						new sap.m.Text({text: rowsArray[n].qty})  
				 		]
					}));
				n++;
			 }

		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);	
 //Time Confirmations
html5sql.process("SELECT * FROM MyTimeConfs where orderno = '"+orderNo+"' and opno = '"+OpNo+"' ;",
		 function(transaction, results, rowsArray){
			var n = 0;
			var opTable = sap.ui.getCore().getElementById('TConfsTable');
			sap.ui.getCore().getElementById('TConfsTable').destroyItems();
			while (n < rowsArray.length) {
				if(rowsArray[n].confno=="NEW"){
					tcno="Local"
				}else{
					tcno=parseInt(rowsArray[n].confno,10)
				}
				
				opTable.addItem (new sap.m.ColumnListItem({
					cells : 
						[
						new sap.m.Text({text: tcno }),
			            new sap.m.Text({text: rowsArray[n].type}),
						new sap.m.Text({text: rowsArray[n].date+" "+rowsArray[n].time}),
			            new sap.m.Text({text: rowsArray[n].enddate+" "+rowsArray[n].endtime}),
						new sap.m.Text({text: rowsArray[n].duration}),
			            new sap.m.Text({text: rowsArray[n].final}),
			           
						new sap.m.Text({text:  rowsArray[n].description})   
				 		]
					}));
				n++;
			 }

		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);
 // Build Docs Table
buildJobDocsTable();
 
buildJobPhotoList();
buildJobOrderOpsTable();

}

function buildJobOrderOpsTable(){
	html5sql.process("SELECT * FROM MyJobDetsOrderOps where orderno = '"+CurrentOrderNo+"' ;",
			 function(transaction, results, rowsArray){
				var n = 0;
				var opTable = sap.ui.getCore().getElementById('CompletedOps');

				opTable.destroyItems();
			
				while (n < rowsArray.length) {
					opTable.addItem (new sap.m.ColumnListItem("Doc:"+rowsArray[n].id,{
						
						cells : 
							[
							new sap.m.Text({text: rowsArray[n].operation}),
							new sap.m.Text({text: rowsArray[n].comp_date_time}),
							new sap.m.Text({text: rowsArray[n].description}), 
							new sap.m.Text({text: rowsArray[n].status})
					 		],

						}));
					n++;
				 }
	},
	 function(error, statement){
		 //outputLogToDB(); 
	 }        
	);
}
function buildJobDocsTable(){
html5sql.process("SELECT * FROM MyJobDetsDraw where orderno = '"+CurrentOrderNo+"' ;",
		 function(transaction, results, rowsArray){
			var n = 0;
			var opTable = sap.ui.getCore().getElementById('JobDocumentTable');

			opTable.destroyItems();
		
			while (n < rowsArray.length) {
				
		        if (rowsArray[n].zurl.length <10){
		        	local=""
		        }else{
		        	local="Local"
		        		
	        		if (rowsArray[n].zurl=="Download Failed"){
		        		local="Download Failed..."	
		        	}
		        	if (rowsArray[n].zurl=="RequestLiveLink"){
		        		local="Requesting..."	
		        	}
		        	if (rowsArray[n].zurl=="WaitingLiveLink"){
		        		local="Reqesting..."	
		        	}
		        	if (rowsArray[n].zurl=="DownloadingLiveLink"){
		        		local="Waiting..."	
		        	}
		        }
		        visiblestate=false
		        if(local=="Local"){
		        	visiblestate=true
		        }
				opTable.addItem (new sap.m.ColumnListItem("Doc:"+rowsArray[n].id,{
					
					cells : 
						[
						new sap.m.Text({text: rowsArray[n].fname}),
						new sap.m.Text({text: rowsArray[n].mime}),
						new sap.m.Text({text: rowsArray[n].nodeid}), 
						new sap.m.Text({text: local}), 
						new sap.m.Text({text: rowsArray[n].id}),
						new sap.m.Text({text: rowsArray[n].zurl}),
						new sap.ui.core.Icon("Icon:"+rowsArray[n].id,{src:"sap-icon://menu2",visible:visiblestate })
				 		],

					}));
				n++;
			 }
			html5sql.process("SELECT * FROM MyFormsResponses where orderno = '"+CurrentOrderNo+"' and opno = '"+CurrentOpNo+"' and state = 'FORM';",
					 function(transaction, results, rowsArray){
						var n = 0;
						var opTable = sap.ui.getCore().getElementById('JobDocumentTable');

						
					
						while (n < rowsArray.length) {

					       if(rowsArray[n].formdesc.indexOf("~")>0){
					    	   fn=rowsArray[n].formname+rowsArray[n].id;
					       }else{
					    	   fn=rowsArray[n].formdesc;
					       }
					      
					       if(rowsArray[n].lastupdated.indexOf("COMPLETE")>-1){
					    	   status="Local";
					       }else{
					    	   status=rowsArray[n].lastupdated;
					       }
					      
							opTable.addItem (new sap.m.ColumnListItem("Form:"+rowsArray[n].id,{
								
								cells : 
									[
									new sap.m.Text({text: rowsArray[n].formdesc}),
									new sap.m.Text({text: "FORM"}),
									new sap.m.Text({text: rowsArray[n].id}), 
									new sap.m.Text({text: status}), 
									
									new sap.m.Text({text: rowsArray[n].id}),
									new sap.m.Text({text: rowsArray[n].formname}),
									new sap.ui.core.Icon("FormIcon:"+rowsArray[n].id,{src:"sap-icon://menu2",visible:true })
							 		],

								}));
							n++;
						 }
						//add the attached Files
						html5sql.process("SELECT * FROM MyJobsDocs where orderno = '"+CurrentOrderNo+"' and opno = '"+CurrentOpNo+"';",
								 function(transaction, results, rowsArray){
									var n = 0;
									var opTable = sap.ui.getCore().getElementById('JobDocumentTable');

									
								
									while (n < rowsArray.length) {

										visiblestate=true
								      if(rowsArray[n].status=="Sent"){
								    	  visiblestate=false
								      }
								       
								      
										opTable.addItem (new sap.m.ColumnListItem("Att:"+rowsArray[n].id,{
											
											cells : 
												[
												new sap.m.Text({text: rowsArray[n].name}),
												new sap.m.Text({text: "ATTACHMENT"}),
												new sap.m.Text({text: rowsArray[n].id}), 
												new sap.m.Text({text: rowsArray[n].status}), 
												
												new sap.m.Text({text: rowsArray[n].id}),
												new sap.m.Text({text: rowsArray[n].type}),
												new sap.ui.core.Icon("AttIcon:"+rowsArray[n].id,{src:"sap-icon://menu2",visible:visiblestate })
										 		],

											}));
										n++;
									 }

								 },
								 function(error, statement){
									 //outputLogToDB(); 
								 }        
								);

					 },
					 function(error, statement){
						 //outputLogToDB(); 
					 }        
					);
		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);
		


}
function buildJobPhotoList(){

html5sql.process("SELECT * FROM MyJobsPhotos where orderno = '"+CurrentOrderNo+"'  and opno= '"+CurrentOpNo+"'",
		 function(transaction, results, rowsArray){
			var n = 0;
			var opTable = sap.ui.getCore().getElementById('JobPhotoTable');
			
			opTable.destroyItems();
		
			while (n < rowsArray.length) {
				
		
				opTable.addItem (new sap.m.ColumnListItem({
					
					cells : 
						[
						new sap.m.Text({text: rowsArray[n].name}),
						new sap.m.Text({text: rowsArray[n].desc}),
						new sap.m.Text({text: rowsArray[n].size}),
						new sap.m.Text({text: rowsArray[n].status}),   
						new sap.m.Text({text: rowsArray[n].url}),
						new sap.m.Text({text: rowsArray[n].id}),
						new sap.ui.core.Icon("PhotoIcon:"+rowsArray[n].id,{src:"sap-icon://menu2",visible:true })
				 		],

					}));
				n++;
			 }

		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);
}
function buildLocHistory(){

	html5sql.process("SELECT * FROM MyJobDetsLoch where orderno = '"+CurrentOrderNo+"'",
			 function(transaction, results, rowsArray){
				var n = 0;
				var opTable = sap.ui.getCore().getElementById('LocHistoryTable');
				
				opTable.destroyItems();
			
				while (n < rowsArray.length) {
					
			
					opTable.addItem (new sap.m.ColumnListItem({
						
						cells : 
							[
							new sap.m.Text({text: rowsArray[n].not_order.replace(/^[0]+/g,"")}),
							new sap.m.Text({text: rowsArray[n].notification_no.replace(/^[0]+/g,"")}),
							new sap.m.Text({text: rowsArray[n].order_type}),
							new sap.m.Text({text: rowsArray[n].op_txt}), 
							new sap.m.Text({text: rowsArray[n].order_date}),
							new sap.m.Text({text: rowsArray[n].order_status})
					 		],

						}));
					n++;
				 }

			 },
			 function(error, statement){
				 //outputLogToDB(); 
			 }        
			);
	}



function buildJobPhotoListOLD(){
	
	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById('JobPhotoTable');
	opTable.destroyItems();

	try {
		 window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Photos/", function (dirEntry) {
		    	
		        var directoryReader = dirEntry.createReader();
		          directoryReader.readEntries(jobPhotosReadSuccess, jobPhotosReadFail);
		    });
	}
	catch(err) {
	   //Not in Cordova
	}

	   

}
function jobPhotosReadSuccess(entries) {
	
	
 
   var i;
   for (i = 0; i < entries.length; i++) {
      
       if (entries[i].isFile) {
           entries[i].file(job_photos_details_callback);

       } else {
           console.log('photosDirectory - ' + entries[i].name);
           
       }
   }
}
function jobPhotosReadFail(error) {
   //alert("Failed to list Photos contents: "+ error);
}
function job_photos_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);
    var opTable = sap.ui.getCore().getElementById('JobPhotoTable');
	opTable.addItem (new sap.m.ColumnListItem({
		cells : 
			[
			new sap.m.Text({text: f.name}),
            new sap.m.Text({text: f.type}),
            new sap.m.Text({text: f.size}),
			new sap.m.Text({text: d1.toString('yyyyMMdd')}) ,
			new sap.m.Text({text: cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Photos/"+f.name})

	 		]
		}));
}
function rebuildTimeConfs()
{

	html5sql.process("SELECT * FROM MyTimeConfs where orderno = '"+CurrentOrderNo+"' and opno = '"+CurrentOpNo+"' ;",
			 function(transaction, results, rowsArray){
				var n = 0;
				var opTable = sap.ui.getCore().getElementById('TConfsTable');
				sap.ui.getCore().getElementById('TConfsTable').destroyItems();
				while (n < rowsArray.length) {
					
					if(rowsArray[n].confno=="NEW"){
						tcno="Local"
					}else{
						tcno=parseInt(rowsArray[n].confno,10)
					}
					opTable.addItem (new sap.m.ColumnListItem({
						cells : 
							[
							new sap.m.Text({text: tcno}),
				            new sap.m.Text({text: rowsArray[n].type}),
							new sap.m.Text({text: rowsArray[n].date+" "+rowsArray[n].time}),
				            new sap.m.Text({text: rowsArray[n].enddate+" "+rowsArray[n].endtime}),
							new sap.m.Text({text: rowsArray[n].duration}),
				            new sap.m.Text({text: rowsArray[n].final}),
				           
							new sap.m.Text({text:  rowsArray[n].description})   
					 		]
						}));
					n++;
				 }

			 },
			 function(error, statement){
				 //outputLogToDB(); 
			 }        
			);	

}
//var ImgDir=cordova.file.externalRootDirectory+'Documents/MyJobs/Global/download/Icons/';
	var oDetailPage = new sap.m.Page(
			"detail",
			{
				title : "Job Details",
				headerContent : [  new sap.m.Button({
					title:"but",
                    //icon: ImgDir+"2MANJOB.png"
                 /*   press : function() {
                    	if(oSplitApp.getMode() ==sap.m.SplitAppMode.ShowHideMode){
                    		oSplitApp.setMode(sap.m.SplitAppMode.HideMode)
                    	}else{
                    		oSplitApp.setMode(sap.m.SplitAppMode.ShowHideMode)	
                    	} 
                    	
                    } */
                    })  ],
				footer: detailFooterAWS,
				showNavButton: false,
					 
					 navButtonPress: function() {	
						 oSplitApp.placeAt("body","only");
							buildJobs();
							oSplitApp.onAfterRendering = function() {  
								
								selectListDefault() 
								

						        }
							BuildNotificationTypes()
						 //window.location.href="Jobs.html"
					 }
			}).addStyleClass("sapUiStdPage");


	//create first master page

	var oMasterPage = new sap.m.Page(
			"master",
			{
				 headerContent : new sap.m.Button({
                     icon: "sap-icon://home",
                     press : function() {
                    	 homepage.placeAt("body","only");
                    	 //window.location.href="Home.html"
                     }
}).addStyleClass("HomeButton"),
				title : "Jobs",
				
				content : [buildJobs()],
				//showNavButton: "{device>/isPhone}" ,
				showNavButton: false,
				footer  : new sap.m.Bar (
						{
							id : 'master-footer',

							contentLeft : [
									new sap.m.Button("Add1", {
										type: 	sap.m.ButtonType.Accept,
					   					 text: "create",
					  					 press: [ function(){
					  						
					  						formNewNotif.open(); 
					  						
					  							}]
										 })
								],
						contentRight : [new sap.m.Button("LastSyncMess", {
		 	      			 text:"",
		 	      			 
	 	      				 press: [ function(){
	 	      					loadLastSyncValues();
	 	      					 sap.ui.getCore().byId("dlgLastSync").open(); ;
	 	      						}]
	 	      			 }),
										new sap.m.Button("Syncit", {
											//type: 	sap.m.ButtonType.Accept,
						   					 //text: "Sync",
						   					icon:"sap-icon://synchronize",
						  					 press: [ function(){						  						
						  						SetConfigParam('LASTSYNC_TRANSACTIONAL', "20120101010101");
						  						 syncUpload()
						  						syncTransactional()
						  					   
												 syncDT=localStorage.getItem('LastSyncedDT')	
												 x=formatDateTime(localStorage.getItem("LastSyncedDT")).split(" ");
												 sap.ui.getCore().byId("LastSyncMess").setText(x[1]);
						  						
						  						
						  							}]
											 }),
						new sap.m.BusyIndicator("jobsyncIndicator",{
						
							visible:false
							
						})
									]
						})			 

			});
	
	
	
	
	//create SplitApp()
	var oSplitApp = new sap.m.SplitApp({
		detailPages: [oDetailPage],
		masterPages: [oMasterPage],
		//mode:sap.m.SplitAppMode.HideMode,
		initialDetail: "detail",
		initialMaster: "master",
		afterMasterOpen: function(){
			buildJobs()
			console.log("master is opened");
		},
		afterMasterClose: function(){
			console.log("master is closed");
		}
	});

	if(jQuery.device.is.tablet || jQuery.device.is.desktop){
		oSplitApp.setDefaultTransitionNameDetail("fade");	
	}

	/*oSplitApp.placeAt("body");
	oSplitApp.onAfterRendering = function() {  
		
		selectListDefault() 
		

        }  
	*/

//$(function() {
	/*startBGSync()
	
	
	BuildNotificationTypes()*/
	//BuildTCEmployees()

	//});
function selectListDefault(){

	firstItem = sap.ui.getCore().getElementById("JobList").getItems()[0];   

	sap.ui.getCore().getElementById("JobList").setSelectedItem(firstItem,true);
	CheckAssetHistory(firstJob)	;
	  //buildDetailsContent(firstJob);
	  oSplitApp.to("detail");
}
function onCamSuccess(imageData) {
x=selectedTab.split(":")

	//$("#imagePreview"+x[1]).attr("src", imageData);
sap.ui.getCore().getElementById("imagePreview"+x[1]).setSrc(imageData)
	}

	function onCamFail(message) {
		opMessage('Failed because: ' + message);
	}
	function takePhoto(){
	
		navigator.camera.getPicture(onCamSuccess, onCamFail, {quality:100, destinationType:Camera.DestinationType.FILE_URI});

	}

function buildFlocList(parentid)
{
var fid=parentid.split("-")

var sqlstatement = "select * from funclocs where parentid='"+parentid+"'"
flocList.destroyItems();
previousFloc=formSelectFloc.getTitle();
formSelectFloc.setTitle(selectedFloc)

var fidpos=fid.length

html5sql.process(sqlstatement,
		 function(transaction, results, rowsArray){
			var n = 0;
			

			
			while (n < rowsArray.length) {
				if(rowsArray[n].children=="1"){
					liType=sap.m.ListType.Navigation
				}else{
					liType=sap.m.ListType.None
				}
				fid=rowsArray[n].flid.split("-")
				flocList.addItem (new sap.m.StandardListItem(rowsArray[n].flid,{	
					type: liType,
					
					
					title : fid[fidpos]+" : "+unescape(rowsArray[n].description)}))
					
				
				n++;
			 }
			if(fidpos==1){
				sap.ui.getCore().getElementById("flocPrevButton").setVisible(false)
			}else{
				sap.ui.getCore().getElementById("flocPrevButton").setVisible(true)
			}
				
		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);
}
function Scan(){

	{
		var scanner = cordova.require("cordova/plugin/BarcodeScanner");
	        
	      

	        scanner.scan( function (result) { 

	            //alert("We got a barcode\n" + 
	            //"Result: " + result.text + "\n" + 
	            //"Format: " + result.format + "\n" + 
	            //"Cancelled: " + result.cancelled);  

	          
	            sap.ui.getCore().getElementById("NewEquipment").setValue(result.text);
	           // alert(result);


	        }, function (error) { 
	           //alert("Scanning failed: ", error); 
	        } );
	    }
	}
function BuildTCEmployees(){
	var SQLStatement="";
	var FirstVal="";
	SQLStatement="SELECT * from Myrefusers "

	
		html5sql.process(SQLStatement,
		 function(transaction, results, rowsArray){
				//alert(rowsArray.length)
				for (var n = 0; n < rowsArray.length; n++) {
					item = rowsArray[n];
					sap.ui.getCore().getElementById("Employee").addItem(
							new sap.ui.core.Item({
								key: "Emp|"+item.id+"|"+item.employeeno, 
								text: item.firstname+" "+item.lastname
							}))
					
				}
					
				
		 },
		 function(error, statement){
			
		 }        
		);
}

	
	
	function getDestinationDetails(currentLatLon)
	{
		Locs[0]['lat']=currentLatLon.coords.latitude;
		Locs[0]['lon']=currentLatLon.coords.longitude;
		
	
		formRoute.open()
		//window.location.href='Route.?PostCode='+PostCode+'&Job='+Job+'&SLat='+Start_lat+'&SLon='+Start_lon+'&ELat='+End_lat+'&ELon='+End_lon
	    
	    
	}
    function initialize(lat, lon)
    {

        currentPosition = new google.maps.LatLng(lat, lon);

        map = new google.maps.Map(document.getElementById('map_canvas'), {
           zoom: 15,
           center: currentPosition,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         });

       // directionsDisplay.setMap(map);

         var currentPositionMarker = new google.maps.Marker({
            position: currentPosition,
            map: map,
            title: "Current position"
        });

         
        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(currentPositionMarker, 'click', function() {
            infowindow.setContent("Current position: latitude: " + lat +" longitude: " + lon);
            infowindow.open(map, currentPositionMarker);
        });
    }

    function locError(error) {
        // initialize map with a static predefined latitude, longitude
       initialize(59.3426606750, 18.0736160278);
    }

    function locSuccess(position) {
        initialize(position.coords.latitude, position.coords.longitude);
    }

    function calculateRoute() {
    	 

        var targetDestination = new google.maps.LatLng(jobLat, jobLon);
        var currentPosition = new google.maps.LatLng(currentLat, currentLon);

            var request = {
                origin:currentPosition, 
                destination:targetDestination,
                travelMode: google.maps.DirectionsTravelMode["DRIVING"]
            };

            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setPanel(document.getElementById("route_canvas"));
                    directionsDisplay.setDirections(response); 


                }
                else {
                	
                }
            });

    }

    function locationHandler(position)
	 {
	   currentLat = position.coords.latitude;
	   currentLon = position.coords.longitude;
	 }
    function getLatLonFromPcode(address) {
    	navigator.geolocation.getCurrentPosition(locationHandler);

    	
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address+" , UK"}, function postcodesearch(results, status) 
    {   
      if (status == google.maps.GeocoderStatus.OK) 
      {
        jobLat=results[0].geometry.location.lat()
        jobLon=results[0].geometry.location.lng()
      }
      else {
       
      }

    })
    };
    function ClearSignature(){
		$("#signature").jSignature('reset')
}
function SaveSignature(){
	var	data = $("#signature").jSignature('getData', 'svgbase64')
		
		x=selectedTab.split(":")

	//$("#imagePreview"+x[1]).attr("src", imageData);
sap.ui.getCore().getElementById("signaturePreview"+x[1]).setSrc( "data:" + data[0] + "," + data[1] )
formSignature.close()

		//UpdateSignatureSurveyHDR(escape(data[1]))
		
}

function BuildChangeStatusOnSite(){
	
	
	html5sql.process("select * from myjobdets where orderid =  '"+CurrentOrderNo+"' and ordnoOp =  '"+CurrentOpNo+"'",
			 function(transaction, results, rowsArray){
				
				
					if( rowsArray.length>0) {
						
						sap.ui.getCore().getElementById("StatusOnSiteAcceptedTime").setValue(rowsArray[0].acptDate+" "+rowsArray[0].acptTime)
						travelTime = diffInTime(rowsArray[0].tconf_date,rowsArray[0].tconf_time,getFormattedDate(),getFormattedTime())
						sap.ui.getCore().getElementById("StatusOnSiteTravelTime").setValue(travelTime)
						
						
					}
				
					
			 },
			 function(error, statement){
				
			 }        
			)
	
	sap.ui.getCore().getElementById("StatusOnSiteAcceptedTime").setValue(statusUpdateDate+" "+statusUpdateTime)
	sap.ui.getCore().getElementById("StatusOnSiteTime").setValue(statusUpdateDate+" "+statusUpdateTime)
}
function BuildChangeStatusPark(){

	sap.ui.getCore().getElementById("StatusParkReasonText").setValue("")
	sap.ui.getCore().getElementById("StatusParkReasonDetails").setValue("")



		var SQLStatement="";
		var FirstVal="";
		SQLStatement="select * from refactivity where action = 'P'  and  work_center = '"+CurrentJobWorkCentre+"'"
		var ToOutput="";
			html5sql.process(SQLStatement,
			 function(transaction, results, rowsArray){
				
				sap.ui.getCore().getElementById("StatusParkActivityCode").destroyItems();
				
					for (var n = 0; n < rowsArray.length; n++) {
						item = rowsArray[n];
						sap.ui.getCore().getElementById("StatusParkActivityCode").addItem(
								new sap.ui.core.Item({
									key: item.activity,
									text: item.activity_desc
								}))
					}
					html5sql.process("select * from refvariancesrfv where job_activity = 'PRK'  and  work_cntr = '"+CurrentJobWorkCentre+"'  order  by dev_reas_txt",
							 function(transaction, results, rowsArray){
								
								sap.ui.getCore().getElementById("StatusParkReasonCode").destroyItems();
								sap.ui.getCore().getElementById("StatusParkReasonCode").addItem(
										new sap.ui.core.Item({
											key: "NOTSELECTED",
											text: 'Please Select'
										}))
									for (var n = 0; n < rowsArray.length; n++) {
										item = rowsArray[n];
										sap.ui.getCore().getElementById("StatusParkReasonCode").addItem(
												new sap.ui.core.Item({
													key: item.dev_reason,
													text: item.dev_reas_txt
												}))
									}
									html5sql.process("select * from myjobdets where orderid =  '"+CurrentOrderNo+"' and ordnoOp =  '"+CurrentOpNo+"'",
											 function(transaction, results, rowsArray){
												
												
													if( rowsArray.length>0) {
														
														
														workTime = diffInTime(rowsArray[0].tconf_date,rowsArray[0].tconf_time,getFormattedDate(),getFormattedTime())
														sap.ui.getCore().getElementById("StatusParkActualWork").setValue(workTime)
														
														
													}
												
													
											 },
											 function(error, statement){
												
											 }        
											)
									
							 },
							 function(error, statement){
								
							 }        
							)
					
			 },
			 function(error, statement){
				
			 }        
			);

		}

function BuildChangeStatusUpdate(){

	sap.ui.getCore().getElementById("StatusUpdateRemainingWork").setValue("0:0")

	sap.ui.getCore().getElementById("StatusUpdateReasonText").setValue("")
	sap.ui.getCore().getElementById("StatusUpdateReasonDetails").setValue("")


		var SQLStatement="";
		var FirstVal="";
		SQLStatement="select * from refactivity where action = 'P'  and  work_center = '"+CurrentJobWorkCentre+"'"
		var ToOutput="";
			html5sql.process(SQLStatement,
			 function(transaction, results, rowsArray){
				
 				sap.ui.getCore().getElementById("StatusUpdateActivityCode").destroyItems();
				
					for (var n = 0; n < rowsArray.length; n++) {
						item = rowsArray[n];
						sap.ui.getCore().getElementById("StatusUpdateActivityCode").addItem(
								new sap.ui.core.Item({
									key: item.activity,
									text: item.activity_desc
								}))
					} 
					html5sql.process("select * from refvariancesrfv where job_activity = 'UPD'  and  work_cntr = '"+CurrentJobWorkCentre+"' order  by dev_reas_txt",
							 function(transaction, results, rowsArray){
						
						 	sap.ui.getCore().getElementById("StatusUpdateVarianceCode").destroyItems();
						 	sap.ui.getCore().getElementById("StatusUpdateVarianceCode").addItem(
									new sap.ui.core.Item({
										key: "NOTSELECTED",
										text: 'Please Select'
									}))	
									for (var n = 0; n < rowsArray.length; n++) {
										item = rowsArray[n];
										sap.ui.getCore().getElementById("StatusUpdateVarianceCode").addItem(
												new sap.ui.core.Item({
													key: item.dev_reason,
													text: item.dev_reas_txt
												}))
									}
								
									html5sql.process("select * from myjobdets where orderid =  '"+CurrentOrderNo+"' and ordnoOp =  '"+CurrentOpNo+"'",
											 function(transaction, results, rowsArray){
													if( rowsArray.length>0) {
														
														
														workTime = diffInTime(rowsArray[0].tconf_date,rowsArray[0].tconf_time,getFormattedDate(),getFormattedTime())
														
														sap.ui.getCore().getElementById("StatusUpdateActualWork").setValue(workTime)
													
														
													}
												
													
											 },
											 function(error, statement){
												
											 }        
											)	
							 },
							 function(error, statement){
								
							 }        
							)
					
			 },
			 function(error, statement){
				
			 }        
			);

		}
function BuildChangeStatusReject(){




		var SQLStatement="";
		var FirstVal="";
		SQLStatement="select * from refactivity where action = 'P'  and  work_center = '"+CurrentJobWorkCentre+"'"
		var ToOutput="";
					html5sql.process("select * from refvariancesrfv where job_activity = 'REJ'  and  work_cntr = '"+CurrentJobWorkCentre+"'  order  by dev_reas_txt",
							 function(transaction, results, rowsArray){
								
								sap.ui.getCore().getElementById("StatusRejectVarianceCode").destroyItems();
							 	sap.ui.getCore().getElementById("StatusRejectVarianceCode").addItem(
										new sap.ui.core.Item({
											key: "NOTSELECTED",
											text: 'Please Select'
										}))	
									for (var n = 0; n < rowsArray.length; n++) {
										item = rowsArray[n];
										sap.ui.getCore().getElementById("StatusRejectVarianceCode").addItem(
												new sap.ui.core.Item({
													key: item.dev_reason,
													text: item.dev_reas_txt
												}))
									}
										
							 },
							 function(error, statement){
								
							 }        
							)
					
			 

		}
function BuildFormsMandation(){
	mandatedDG5=[]
	mandatedPIA=[]
	var SQLStatement="select * from DG5REL"
	
	
	
		html5sql.process(SQLStatement,
		 function(transaction, results, rowsArray){			
		
				for (var n = 0; n < rowsArray.length; n++) {
					item = rowsArray[n];
					if(item.dg5rel=='X'){
						mandatedDG5.push(item.catalogue+"|"+item.codegrp+"|"+item.code);
					}
					if(item.piarel=='X'){
						mandatedPIA.push(item.catalogue+"|"+item.codegrp+"|"+item.code);
					}
			
				}
			
				
		 },
		 function(error, statement){
		
		 }        
		);

	} 
function checkMandatedForms(){
	pchk="P"+"|"+sap.ui.getCore().getElementById("Close_ProblemGroup").getSelectedItem().getKey()+"|"+sap.ui.getCore().getElementById("Close_ProblemCode").getSelectedItem().getKey()
    
	schk="S"+"|"+sap.ui.getCore().getElementById("Close_ActionGroup").getSelectedItem().getKey()+"|"+sap.ui.getCore().getElementById("Close_ActionCode").getSelectedItem().getKey()
     
	ichk="I"+"|"+sap.ui.getCore().getElementById("Close_ImpactGroup").getSelectedItem().getKey()+"|"+sap.ui.getCore().getElementById("Close_ImpactCode").getSelectedItem().getKey()

//check for DG5 Mandation	
	if ((mandatedDG5.indexOf(pchk)<0)&&(mandatedDG5.indexOf(schk)<0)&&(mandatedDG5.indexOf(ichk)<0)){	
		
		removeMandatedForm("Flooding.html")
		if(!oSwitchFlooding.getEnabled()){
			oSwitchFlooding.setState(false);
			oSwitchFlooding.setEnabled(true);
			}
		}else{
			
		oSwitchFlooding.setState(true);
		oSwitchFlooding.setEnabled(false);
		addMandatedForm("Flooding.html")
		}
	
	if ((mandatedPIA.indexOf(pchk)<0)&&(mandatedPIA.indexOf(schk)<0)&&(mandatedPIA.indexOf(ichk)<0)){	
			removeMandatedForm("Pollution.html")
			
			if(!oSwitchPollution.getEnabled()){
				oSwitchPollution.setState(false);
				oSwitchPollution.setEnabled(true);
			}
			}else{
				opMessage("pia")
				addMandatedForm("Pollution.html")
				oSwitchPollution.setState(true);
				oSwitchPollution.setEnabled(false);
			}
		

}
function BuildCloseScreen(){
	BuildFormsMandation()
	var PAIVisible = true;
	if((CurrentJobProfile==null)||
			(CurrentJobProfile=="")){
		PAIVisible=false;
	}
	initscr=false
	scrvals=localStorage.getItem("closeScreen")+" ";
	
	if (scrvals.length>5){
		scrFlds=scrvals.split("|");
		
		initscr=true;
	}
	
	sap.ui.getCore().getElementById("DG5tabBar").setSelectedKey("DG51")
	initCloseButtons();
	//sap.ui.getCore().getElementById("DG51F1C2").setVisible(PAIVisible)
	sap.ui.getCore().getElementById("Close_ProblemGroup_label").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ProblemGroup").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ProblemCode_label").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ProblemCode").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ActionGroup_label").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ActionGroup").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ActionCode_label").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ActionCode").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ImpactGroup_label").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ImpactGroup").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ImpactCode_label").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_ImpactCode").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("FEClose_LongText").setVisible(PAIVisible);
	sap.ui.getCore().getElementById("Close_LongText").setVisible(PAIVisible);
	if(initscr){ //Reloadingf screen from the Local Storage
		sap.ui.getCore().getElementById("Close_FunctionalLocation").setValue(scrFlds[0])
		sap.ui.getCore().getElementById("Close_Equipment").setValue(scrFlds[1])
		sap.ui.getCore().getElementById("Close_LongText").setValue(scrFlds[15])
		if(scrFlds[6]=="true"){
			oSwitchFlooding.setState(true)
		}else{
			oSwitchFlooding.setState(false)
		}
		if(scrFlds[7]=="true"){
			oSwitchPollution.setState(true)
		}else{
			oSwitchPollution.setState(false)
		}
		if(scrFlds[8]=="true"){
			oSwitchCustFeed.setState(true)
		}else{
			oSwitchCustFeed.setState(false)
		}
		  
		if(scrFlds[16]=="true"){
			
			sap.ui.getCore().getElementById("Close_Work").setState(true)
			sap.ui.getCore().getElementById("Close_Variance").setEnabled(true)   
            sap.ui.getCore().getElementById("Close_Reason").setEnabled(true)   
			
			sap.ui.getCore().getElementById("Close_Reason").setValue(scrFlds[18])   
		}else{
			
			sap.ui.getCore().getElementById("Close_Work").setState(false)
			sap.ui.getCore().getElementById("Close_Variance").setEnabled(false)   
            sap.ui.getCore().getElementById("Close_Reason").setEnabled(false)   
            sap.ui.getCore().getElementById("Close_Reason").setValue("") 
		}
		
	}else{
		sap.ui.getCore().getElementById("Close_Work").setState(false)
		sap.ui.getCore().getElementById("Close_FunctionalLocation").setValue(CurrentJobFL)
		sap.ui.getCore().getElementById("Close_Equipment").setValue(CurrentJobEQ)
		sap.ui.getCore().getElementById("Close_LongText").setValue("")
		sap.ui.getCore().getElementById("Close_Variance").setEnabled(false)   
        sap.ui.getCore().getElementById("Close_Reason").setEnabled(false)   
		oSwitchPollution.setState(false)
		oSwitchFlooding.setState(false)
		oSwitchCustFeed.setState(false)


	}

	setCloseswitch()

		var SQLStatement="";
		var FirstVal="";
		SQLStatement="select * from refpaicodes where catalogue = 'P' and level='1' and work_cntr='"+CurrentJobWorkCentre+"' and stsma = '"+CurrentJobProfile+"' group by codegrp"
		sap.ui.getCore().getElementById("Close_ProblemGroup").destroyItems();
		sap.ui.getCore().getElementById("Close_ProblemGroup").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: 'Please Select'
				}))
		sap.ui.getCore().getElementById("Close_ProblemCode").destroyItems();
		sap.ui.getCore().getElementById("Close_ProblemCode").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: ''
				}))
		sap.ui.getCore().getElementById("Close_InshiftCode").destroyItems();
		sap.ui.getCore().getElementById("Close_InshiftCode").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: 'Please Select'
				}))
		defaultInVal="NOTSELECTED"
		sap.ui.getCore().getElementById("Close_OutshiftCode").destroyItems();
		sap.ui.getCore().getElementById("Close_OutshiftCode").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: 'Please Select'
				}))
		defaultOutVal="NOTSELECTED"
		sap.ui.getCore().getElementById("Close_ActionGroup").destroyItems();
		sap.ui.getCore().getElementById("Close_ActionGroup").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: 'Please Select'
				}))
		sap.ui.getCore().getElementById("Close_ActionCode").destroyItems();
		sap.ui.getCore().getElementById("Close_ActionCode").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: ''
				}))	
		sap.ui.getCore().getElementById("Close_Variance").destroyItems();
		sap.ui.getCore().getElementById("Close_Variance").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: 'Please Select'
				}))
		sap.ui.getCore().getElementById("Close_WD_Group").destroyItems();
		sap.ui.getCore().getElementById("Close_WD_Group").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: 'Please Select'
				}))
		sap.ui.getCore().getElementById("Close_WD_Code").destroyItems();
		sap.ui.getCore().getElementById("Close_WD_Code").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: ''
				}))
		sap.ui.getCore().getElementById("Close_WD_Assignment").destroyItems();
		sap.ui.getCore().getElementById("Close_WD_Assignment").addItem(
				new sap.ui.core.Item({
					key: "",
					text: ''
				}))
		sap.ui.getCore().getElementById("Close_ImpactGroup").setSelectedKey("NOTSELECTED")
		sap.ui.getCore().getElementById("Close_ImpactGroup").destroyItems();
		sap.ui.getCore().getElementById("Close_ImpactGroup").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: 'Please Select'
				}))
		sap.ui.getCore().getElementById("Close_ImpactCode").destroyItems();
		sap.ui.getCore().getElementById("Close_ImpactCode").addItem(
				new sap.ui.core.Item({
					key: "NOTSELECTED",
					text: ''
				}))
		var ToOutput="";
			html5sql.process(SQLStatement,
			 function(transaction, results, rowsArray){
				
				

					for (var n = 0; n < rowsArray.length; n++) {
						item = rowsArray[n];
						sap.ui.getCore().getElementById("Close_ProblemGroup").addItem(
								new sap.ui.core.Item({
									key: item.codegrp,
									text: item.kurztext_group
								}))
					}
					if(initscr){ //Reloadingf screen from the Local Storage
						
						sap.ui.getCore().getElementById("Close_ProblemGroup").setSelectedKey(scrFlds[9])
						BuildCloseProblemCodes(scrFlds[9],scrFlds[10]);
					}
					SQLStatement="select * from refpaicodes where catalogue = 'R' and level='1' and work_cntr='"+CurrentJobWorkCentre+"' and stsma = '"+CurrentJobProfile+"' group by codegrp"
					html5sql.process(SQLStatement,
							 function(transaction, results, rowsArray){
								
								
									for (var n = 0; n < rowsArray.length; n++) {
										item = rowsArray[n];
										sap.ui.getCore().getElementById("Close_ActionGroup").addItem(
												new sap.ui.core.Item({
													key: item.codegrp,
													text: item.kurztext_group
												}))
									}
									if(initscr){ //Reloadingf screen from the Local Storage
										sap.ui.getCore().getElementById("Close_ActionGroup").setSelectedKey(scrFlds[11])
										BuildCloseActionCodes(scrFlds[11],scrFlds[12]);
									}
									SQLStatement="select * from refpaicodes where catalogue = 'S' and level='1' and work_cntr='"+CurrentJobWorkCentre+"' and stsma = '"+CurrentJobProfile+"' group by codegrp"
									html5sql.process(SQLStatement,
											 function(transaction, results, rowsArray){
										

													for (var n = 0; n < rowsArray.length; n++) {
														item = rowsArray[n];
														sap.ui.getCore().getElementById("Close_ImpactGroup").addItem(
																new sap.ui.core.Item({
																	key: item.codegrp,
																	text: item.kurztext_group
																}))

													}
													if(initscr){ //Reloadingf screen from the Local Storage
														sap.ui.getCore().getElementById("Close_ImpactGroup").setSelectedKey(scrFlds[13])
														BuildCloseImpactCodes(scrFlds[13],scrFlds[14]);
	
													}
													html5sql.process("select * from refvariancesrfv where job_activity = 'ADD'  and  work_cntr = '"+CurrentJobWorkCentre+"'  order  by dev_reas_txt",
															 function(transaction, results, rowsArray){
																
																
																	for (var n = 0; n < rowsArray.length; n++) {
																		item = rowsArray[n];
																		sap.ui.getCore().getElementById("Close_Variance").addItem(
																				new sap.ui.core.Item({
																					key: item.dev_reason,
																					text: item.dev_reas_txt
																				}))
																	}
																	if(initscr){ //Reloadingf screen from the Local Storage
																		sap.ui.getCore().getElementById("Close_Variance").setSelectedKey(scrFlds[17])
																		
																	}
																html5sql.process("select * from myJobDets where orderid =  '"+CurrentOrderNo+"' and ordnoOp =  '"+CurrentOpNo+"'",
																		 function(transaction, results, rowsArray){
																			
																			
																				if( rowsArray.length>0) {
																				
																					
																					travelTime = diffInTime(rowsArray[0].tconf_date,rowsArray[0].tconf_time,getFormattedDate(),getFormattedTime())
																					
																					sap.ui.getCore().getElementById("Close_InShiftTime").setValue(travelTime)
																					
																					
																				}
																			
																				html5sql.process("select * from REFACTIVITY where work_center = '"+CurrentJobWorkCentre+"'",
																						 function(transaction, results, rowsArray){
																							
																							
																							for (var n = 0; n < rowsArray.length; n++) {
																								item = rowsArray[n];
																								if(rowsArray[n].action=="I"){
																									sap.ui.getCore().getElementById("Close_InshiftCode").addItem(
																											new sap.ui.core.Item({
																												key: item.activity,
																												text: item.activity_desc
																											}))
																									if(item.deflt=='X'){
																										defaultInVal=item.activity
																										
																									}
																								}
																								if(rowsArray[n].action=="O"){
																									
																									sap.ui.getCore().getElementById("Close_OutshiftCode").addItem(
																											new sap.ui.core.Item({
																												key: item.activity,
																												text: item.activity_desc
																											}))
																									if(item.deflt=='X'){
																										defaultOutVal=item.activity
																										
																									}
																								}
																								
																							}
																							
																							sap.ui.getCore().getElementById("Close_InshiftCode").setSelectedKey(defaultInVal)
																							sap.ui.getCore().getElementById("Close_OutshiftCode").setSelectedKey(defaultOutVal)
																							SQLStatement="select * from refpaicodes where catalogue = 'W' and level='1' and work_cntr='"+CurrentJobWorkCentre+"' group by codegrp"

																							html5sql.process(SQLStatement,
																									 function(transaction, results, rowsArray){
																										
																										
																										for (var n = 0; n < rowsArray.length; n++) {
																											item = rowsArray[n];
																											
																											sap.ui.getCore().getElementById("Close_WD_Group").addItem(
																													new sap.ui.core.Item({
																														key: item.codegrp,
																														text: item.kurztext_group
																													}))
																											
																										}
																										

																										html5sql.process("select * from MyRefUsers where workcenter = '"+localStorage.getItem('EmployeeWorkCenter')+"'",
																												 function(transaction, results, rowsArray){
																													
																													
																													for (var n = 0; n < rowsArray.length; n++) {
																														item = rowsArray[n];
																														sap.ui.getCore().getElementById("Close_WD_Assignment").addItem(
																																new sap.ui.core.Item({
																																	key: item.userid,
																																	text: item.lastname+", "+item.firstname+" ("+item.userid+")"
																																}))
																														
																													}
																													

																													
																													
																													
																													
																													
																													
																													
																													
																												 },
																												 function(error, statement){
																													
																												 }        
																									);
																										
																										
																										
																										
																										
																										
																										
																									 },
																									 function(error, statement){
																										
																									 }        
																						);
																							
																							
																							
																							
																							
																							
																						 },
																						 function(error, statement){
																							
																						 }        
																						)
																			
																				
																		 },
																		 function(error, statement){
																			
																		 }        
																		)
																	
															 },
															 function(error, statement){
																
															 }        
															)
													
											 },
											 function(error, statement){
												
											 }        
											)
							 },
							 function(error, statement){
								
							 }        
							)
					
			 },
			 function(error, statement){
				
			 }        
			);

		}

 function BuildCloseProblemCodes(grp,selected){
	
		var SQLStatement="";
		var FirstVal="";
		SQLStatement="select * from refpaicodes where catalogue = 'P' and level='2' and work_cntr='"+CurrentJobWorkCentre+"' and stsma = '"+CurrentJobProfile+"' and codegrp = '"+grp+"' group  by code"
		
		var ToOutput="";
			html5sql.process(SQLStatement,
			 function(transaction, results, rowsArray){
				
				
				sap.ui.getCore().getElementById("Close_ProblemCode").destroyItems();
				sap.ui.getCore().getElementById("Close_ProblemCode").addItem(
						new sap.ui.core.Item({
							key: "NOTSELECTED",
							text: 'Please Select'
						}))
					for (var n = 0; n < rowsArray.length; n++) {
						item = rowsArray[n];
						sap.ui.getCore().getElementById("Close_ProblemCode").addItem(
								new sap.ui.core.Item({
									key: item.code,
									text: item.kurztext_code
								}))
				
					}
				sap.ui.getCore().getElementById("Close_ProblemCode").setSelectedKey(selected)
					
			 },
			 function(error, statement){
				
			 }        
			);

		} 
 function BuildCloseWDCodes(grp,selected){
		
		var SQLStatement="";
		var FirstVal="";
		SQLStatement="select * from refpaicodes where catalogue = 'W' and level='2' and work_cntr='"+CurrentJobWorkCentre+"' and codegrp = '"+grp+"' group  by code"
		
		var ToOutput="";
			html5sql.process(SQLStatement,
			 function(transaction, results, rowsArray){
				
				
				sap.ui.getCore().getElementById("Close_WD_Code").destroyItems();
				sap.ui.getCore().getElementById("Close_WD_Code").addItem(
						new sap.ui.core.Item({
							key: "NOTSELECTED",
							text: 'Please Select'
						}))
					for (var n = 0; n < rowsArray.length; n++) {
						item = rowsArray[n];
						sap.ui.getCore().getElementById("Close_WD_Code").addItem(
								new sap.ui.core.Item({
									key: item.code,
									text: item.kurztext_code
								}))
				
					}
				sap.ui.getCore().getElementById("Close_WD_Code").setSelectedKey(selected)
					
			 },
			 function(error, statement){
				
			 }        
			);

		} 
function BuildCloseActionCodes(grp,selected){
	
	var SQLStatement="";
	var FirstVal="";
	SQLStatement="select * from refpaicodes where catalogue = 'R' and level='2' and work_cntr='"+CurrentJobWorkCentre+"' and stsma = '"+CurrentJobProfile+"' and codegrp = '"+grp+"' group  by code"
	
	var ToOutput="";
		html5sql.process(SQLStatement,
		 function(transaction, results, rowsArray){
			

			sap.ui.getCore().getElementById("Close_ActionCode").destroyItems();
			sap.ui.getCore().getElementById("Close_ActionCode").addItem(
					new sap.ui.core.Item({
						key: "NOTSELECTED",
						text: 'Please Select'
					}))
				for (var n = 0; n < rowsArray.length; n++) {
					item = rowsArray[n];
					sap.ui.getCore().getElementById("Close_ActionCode").addItem(
							new sap.ui.core.Item({
								key: item.code,
								text: item.kurztext_code
							}))
				}

			sap.ui.getCore().getElementById("Close_ActionCode").setSelectedKey(selected)	
		 },
		 function(error, statement){
			
		 }        
		);

	}
function BuildCloseImpactCodes(grp,selected){
	
	var SQLStatement="";
	var FirstVal="";
	SQLStatement="select * from refpaicodes where catalogue = 'S' and level='2' and work_cntr='"+CurrentJobWorkCentre+"' and stsma = '"+CurrentJobProfile+"' and codegrp = '"+grp+"' group  by code"
	

		html5sql.process(SQLStatement,
		 function(transaction, results, rowsArray){
			
			sap.ui.getCore().getElementById("Close_ImpactCode").destroyItems();
			sap.ui.getCore().getElementById("Close_ImpactCode").addItem(
					new sap.ui.core.Item({
						key: "NOTSELECTED",
						text: 'Please Select'
					}))
				for (var n = 0; n < rowsArray.length; n++) {
					item = rowsArray[n];
					sap.ui.getCore().getElementById("Close_ImpactCode").addItem(
							new sap.ui.core.Item({
								key: item.code,
								text: item.kurztext_code
							}))
				}
			sap.ui.getCore().getElementById("Close_ImpactCode").setSelectedKey(selected)
				
		 },
		 function(error, statement){
			
		 }        
		);

	}
jQuery.sap.require("sap.m.MessageBox");
function DisplayErrorMessage1(msgtitle,msgbody){
sap.m.MessageBox.show(
    msgbody, {
        icon: sap.m.MessageBox.Icon.ERROR,
        title: msgtitle,
        actions: [sap.m.MessageBox.Action.OK]
    }
  );   
}
function showPopup(msg){
	if (msg == "Location History"){
		formLocHistory.open()
	}else{
		sap.m.MessageToast.show(msg, {
			duration: Number(1500),
			
			my: "center center",
			at: "center center",		
			autoClose: true,
	
		});
	}

}
function startBGSync()
{

   // First check whether Web Workers are supported
   if (typeof(Worker)!=="undefined"){
      // Check whether Web Worker has been created. If not, create a new Web Worker based on the Javascript file simple-timer.js
      if (w==null){
         w = new Worker("myresources/js/bgsync.js");
      }
      // Update timer div with output from Web Worker
      w.onmessage = function (event) {   
    	
    	  tim=+getTime()
//test if there is a Network
   	  
    	  
         if(sap.ui.getCore().getElementById("jobsyncIndicator").getVisible()==false) { 
        	 if (checkConnection()){
        		 syncUpload()
    	         setSyncingIndicator(true)    
    			 syncReference()
    			 syncTransactional()
    			 refreshJobList()
    			 localStorage.setItem('SAPCalling','false')
    			 
    			 syncDT=localStorage.getItem('LastSyncedDT')	
    			 x=formatDateTime(localStorage.getItem("LastSyncedDT")).split(" ");
    			 sap.ui.getCore().byId("LastSyncMess").setText(x[1]);
        	 }
        	 
         }		 
		
		 };
   } else {
      // Web workers are not supported by your browser
      
	   showPopup("Sorry, your browser does not support Web Workers ...");
   }
}

function refreshJobList(){
	html5sql.process("Select orderid, ordnoOp from MyJobdets",
			 function(transaction, results, rowsArray){
			
				    console.log("found "+rowsArray.length+" Jobs")
					for (var n = 0; n < rowsArray.length; n++) {
						item = rowsArray[n];
						x="x"+sap.ui.getCore().byId("Job:"+item.orderid+":"+item.ordnoOp)
						opMessage("listentry "+item.orderid+"-"+item.ordnoOp+" item:"+x+" length "+x.length)
						if (x.length<30){
							opMessage("about to add "+item.orderid+"-"+item.ordnoOp)
							addNewJobToList(item.orderid,item.ordnoOp)
						}
							
						
					}
				   
                    console.log("Jobs: "+rowsArray.length)
                    oMasterPage.setTitle("Jobs: "+rowsArray.length)
					
			 },
			 function(error, statement){
				
			 }        
			);	
}
if(navigator.userAgent.indexOf("13F51a")>0){
	setUserAgent(window,"Mozilla/5.0 (iPad; CPU OS 9_3_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E238 (4948555872)");
}
$(document).on("swipeleft",function(e){

	if(e.target.id=="detail-intHeader")
		{
	
    		oSplitApp.setMode(sap.m.SplitAppMode.HideMode)
    	}
});  
$(document).on("swiperight",function(e){
	if(e.target.id=="detail-intHeader")
	{
		oSplitApp.setMode(sap.m.SplitAppMode.ShowHideMode)	
	}
});  
function showEQAttbites(eq){
	formEQAttr.setTitle("Equiment Attributes")
	buildDEQAttr(eq)
	formEQAttr.open()
}
function loadScript(src) {
    return new Promise(function (resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}
function CheckAssetHistory(Job)
{
	sqlStatement="select * from MyMenuBar where subitem = 'Asset history'"
	
	html5sql.process(sqlStatement,
		function(transaction, results, rowsArray){
			if(rowsArray<1){
				
				history=false;
				buildDetailsContent(Job);
			}else{
				
				history=true;
			buildDetailsContent(Job);
			}
		 },
		 function(error, statement){
			opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
		 }        
		);
}

function CreateAddressMatrix(captions,values){
	console.log(captions.length)
	   var oMatrix = new sap.ui.commons.layout.MatrixLayout({
	//id : "matrix1",
	layoutFixed : false,
		width : '800px',
		columns : 2,
		widths : ['250px', '550px'] });
	    for(var i = 0; i < 12; i++) {
	    	console.log("captions:"+captions[i])
	    	lab = new sap.ui.commons.Label({text : captions[i] }).addStyleClass("Labelstyle");
			var val = new sap.ui.commons.TextField({
				editable : false,
				value: values[i],
				wrapping:true,
				width:"400px"}).addStyleClass("LabelText");
			oMatrix.createRow(lab,val);
								 
		}
		return oMatrix;
}