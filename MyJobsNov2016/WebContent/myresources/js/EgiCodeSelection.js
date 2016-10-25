var formEgiCodeSelection = new sap.m.Dialog("dlgEgiCodeSelection",{
	  
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",

    buttons: [

					new sap.m.Button( {
					    text: "Cancel",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {	formEgiCodeSelection.close()} ]   
					}),
					new sap.m.Button("EgiCodeSelectionNextButton" ,{
						
					    text: "OK",
					    icon:"",
					    type: sap.m.ButtonType.Accept,
					    tap: [ function(oEvt) {
					        if (sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").getSelectedItem() &&
                                sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").getSelectedItem().getKey() != "NOTSELECTED")
					        {
					            currentAssetRecord.assetTypeCodeZATCODE = sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").getSelectedItem().getKey();
					            currentAssetRecord.equipmentTypeDescriptionZOTDESC = sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").getSelectedItem().getText();
					            sap.ui.getCore().getElementById("createAssetInput_EquipmentType").setValue(sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").getSelectedItem().getText())
					            currentAssetRecord.equipmentTypeCodeZZEQPT_EGI = sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").getSelectedItem().getKey();
					            onCreateAssetEquipmentTypeChanged(false);
					           
					        }
					    	 
					    	formEgiCodeSelection.close();
					    }
					    ]   
					})
					
					],					
    content:[
new sap.ui.layout.form.SimpleForm({
	minWidth : 1024,
	maxContainerCols : 2,
	content : [
				
                new sap.m.Label({text:"Asset Type"}),
                new sap.m.Select('EgiCodeSelection_SelectAssetTypeCode', {
					width : "270px",
					items : [new sap.ui.core.Item({
						key : "NOTSELECTED",
						text : ''
					})],
					change : function(oControlEvent) {populateEgiCodeSelectionEquipmentType()
					}
				}),
				new sap.m.Label({text:"Equipment Type"}),
				new sap.m.Select('EgiCodeSelection_SelectEquipmentType', {
					width : "270px",
					items : [new sap.ui.core.Item({
						key : "NOTSELECTED",
						text : ''
					})],
					change : function(oControlEvent) {
					}
				})
       
			]
			})
            ],
            contentWidth:"500px",
            contentHeight: "250px",
      beforeOpen:function(){populateEgiCodeSelectionAssetType()},
	  
      afterOpen:function(){  
 
	  } ,
	  beforeClose:function(){
		  try {
			 
		  }catch(err)
		  {}
	  }
	
	 })


function populateEgiCodeSelectionAssetType()  {
	var SQLStatement = "";
	sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").destroyItems();
	sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").addItem(
			new sap.ui.core.Item({
				key : "NOTSELECTED",
				text : 'Please Select'
			}))

	sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").setSelectedKey("NOTSELECTED");
		
				SQLStatement = "select distinct ZATCODE,ZATDESC from AssetTypeCodes order by ZATDESC"

					html5sql.process(SQLStatement, function(transaction, results, rowsArray) {

						for (var n = 0; n < rowsArray.length; n++) {
							item = rowsArray[n];
							sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").addItem(
									new sap.ui.core.Item({
										key : item.ZATCODE,
										text : item.ZATDESC
									}))
						}
						if (currentAssetRecord.assetTypeCodeZATCODE != null) {
						    sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").setSelectedKey(currentAssetRecord.assetTypeCodeZATCODE);
						    populateEgiCodeSelectionEquipmentType();
						}
						else
						{
						    populateEgiCodeSelectionEquipmentType()
						}

					}, function(error, statement) {
					})
				

}

function populateEgiCodeSelectionEquipmentType()  {
	var SQLStatement = "";

	sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").destroyItems();
	sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").addItem(
			new sap.ui.core.Item({
				key : "NOTSELECTED",
				text : 'Please Select'
			}))
	sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").setSelectedKey("NOTSELECTED");

			if(sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").getSelectedItem() && sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").getSelectedItem().getKey()!= "NOTSELECTED")
				{
				SQLStatement = "select distinct ZOTDESC,ZZEQPT_EGI from EquipmentTypeCode where ZATCODE='" +
				sap.ui.getCore().getElementById("EgiCodeSelection_SelectAssetTypeCode").getSelectedItem().getKey()+ "' ORDER BY ZOTDESC"; 

					html5sql.process(SQLStatement, function(transaction, results, rowsArray) {

						for (var n = 0; n < rowsArray.length; n++) {
							item = rowsArray[n];
							sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").addItem(
									new sap.ui.core.Item({
										key : item.ZZEQPT_EGI,
										text : item.ZOTDESC
									}))
						}
						if (currentAssetRecord.equipmentTypeDescriptionZOTDESC != null) {
						    sap.ui.getCore().getElementById("EgiCodeSelection_SelectEquipmentType").setSelectedKey(currentAssetRecord.equipmentTypeCodeZZEQPT_EGI);
						}

					}, function(error, statement) {
					})
				}

}
