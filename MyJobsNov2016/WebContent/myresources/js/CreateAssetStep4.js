var oCreateAssetStep4Matrix = new sap.ui.commons.layout.MatrixLayout({
	id : "CreateAssetStep4Matrix",
	layoutFixed : true,
	columns : 5,
	width : '900px',
	widths : [ '160px','300px','60px','60px', '350px']
});

/*
oCreateAssetStep4Matrix.createRow(new sap.m.Label({text : ""}),new sap.m.Label({text : "2"}),new sap.m.Label({text : "3"}),
		new sap.m.Label({text : "4"}),new sap.m.Label({text : "5"}));

*/

var inputCreateAssetStep4FuncLocPart1 = new sap.m.Input("input_CreateAssetStep4FuncLocPart1",
		{
			width : "350px",
			type : sap.m.InputType.Input,
			enabled : false
		});

var inputCreateAssetStep4FuncLocPart2 = new sap.m.Input("input_CreateAssetStep4FuncLocPart2",
		{
			width : "50px",
			type : sap.m.InputType.Input,
			enabled: false
		});

var inputCreateAssetStep4FuncLocPart3 = new sap.m.Input("input_CreateAssetStep4FuncLocPart3",
		{
			width : "300px",
			type : sap.m.InputType.Input,
			enabled: false
		});


var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep4Matrix.addRow(oRow);
//oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());//Blank Cell

//ROW1
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep4Matrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "Functional Location" }));

oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep4FuncLocPart1);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    hAlign: sap.ui.commons.layout.HAlign.Center,
    colSpan: 1,
    rowSpan: 2
});

oCell.addContent(inputCreateAssetStep4FuncLocPart2);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep4FuncLocPart3);
oRow.addCell(oCell);

//ROW2
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep4Matrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});

oCell.addContent(new sap.m.Label({ text: "Description" }));
oRow.addCell(oCell);

//oCreateAssetStep4Matrix.createRow(space,labelFuncLocDesc,inputCreateAssetStep4FuncLocPart1 ,inputCreateAssetStep4FuncLocPart2,inputCreateAssetStep4FuncLocPart3)

oCreateAssetStep4Matrix.createRow(new sap.m.Label({text : "Site"}),new sap.m.Input("input_CreateAssetStep4Site",
		{ width: "270px", type: sap.m.InputType.Input, enabled: false }),
        new sap.m.Label({}), new sap.m.Label({}), new sap.m.Label("DocCount_CreateAssetStep4", { text: "0 Photo's/Documents attached to asset record." }))


		var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep4Matrix.addRow(oRow);
//oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());//Blank Cell

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({text : "Make"}));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Input("input_CreateAssetStep4Make",
		{width : "270px",type : sap.m.InputType.Input,enabled : false}));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan : 2});
oCell.addContent(new sap.m.Label({text : "Model"}));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Input("input_CreateAssetStep4Model",
		{width : "270px",type : sap.m.InputType.Input,enabled : false}));
oRow.addCell(oCell);

		
		
		/*oCreateAssetStep4Matrix.createRow(space,new sap.m.Label({text : "Make"}),new sap.m.Input("input_CreateAssetStep4Make",
		{width : "270px",type : sap.m.InputType.Input,enabled : false}), new sap.m.Label({text : "Model"}),new sap.m.Input("input_CreateAssetStep4Model",
				{width : "270px",type : sap.m.InputType.Input,enabled : false}))
*/				

oCreateAssetStep4Matrix.createRow(new sap.m.Label({ text: "Serial Number" }), new sap.m.Input("input_CreateAssetStep4SerialNumber",
		{width : "270px",type : sap.m.InputType.Input,enabled : false}))
		
		var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep4Matrix.addRow(oRow);
//oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());//Blank Cell

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({text : "Equipment Type"}));
oRow.addCell(oCell);



var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Input("input_CreateAssetStep4EquipmentType",
		{width : "270px",type : sap.m.InputType.Input,enabled : false}));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan : 2});
oCell.addContent(new sap.m.Label({text : "Function Type"}));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Input("input_CreateAssetStep4FunctionType",
		{width : "270px",type : sap.m.InputType.Input,enabled : false}));
oRow.addCell(oCell);

var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep4Matrix.addRow(oRow);
//oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());//Blank Cell

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({text : "Plant Group"}));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Input("input_CreateAssetStep4PlantGroup",
		{width : "270px",type : sap.m.InputType.Input,enabled : false}));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({colSpan : 2});
oCell.addContent(new sap.m.Label({text : "System Code"}));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Input("input_CreateAssetStep4SystemCode",
		{width : "270px",type : sap.m.InputType.Input,enabled : false}));
oRow.addCell(oCell);

var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep4Matrix.addRow(oRow);
//oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());//Blank Cell

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({text : "Comments"}));
oRow.addCell(oCell);


var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
	colSpan : 4,
	rowSpan : 8
});

oCell.addContent(new sap.m.TextArea("input_CreateAssetStep4Comments",
		{width : "690px",rows: 8,enabled : false}));

oRow.addCell(oCell);





var formCreateAssetStep4 = new sap.m.Dialog("form_CreateAssetStep4",{
    subHeader: new sap.m.Bar({
        contentMiddle: [new sap.m.Label("CreateAssetStep4funcLocHeader", {
            text: ""
        })],
    }),
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",

    buttons: [

new sap.m.Button("formCreateAssetStep4_Back" ,{
	
    text: "Back",
    type: sap.m.ButtonType.Accept,
    tap: [function (oEvt) {
        formCreateAssetStep4.close();
       
    }]
}),

					new sap.m.Button( {
					    text: "Cancel",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {	
					        if (sap.ui.getCore().getElementById('formCreateAssetStep4_Submit').getVisible()) {
					            var msgCancel = "You have chosen to cancel part way through the creation process. ";
					            msgCancel += "Clicking YES will confirm you wish to cancel and return to the Home screen. ";
					            msgCancel += "Clicking NO will take you to the previous screen.";
					    	    CreateAssetStep4ConfirmCancel("", msgCancel)
					    	} 
					    	
					    	} ]   
					}),
					new sap.m.Button("formCreateAssetStep4_Submit" ,{
						
					    text: "Submit",
					    icon:"",
					    type: sap.m.ButtonType.Accept,
					    tap: [function (oEvt) {
					        submitRecord(function (success) {
					            if (success == true)
					            {
					                formCreateAssetSuccess.open();
                                    //TODO Maybe just do an Upload sync
					                uploadAllRecords(function (data) {
					                   
					                })
					            }
					            else
					            {
					                showErrorMessage("", "There was an error submitting the record")
					            }
					        resetAssetRecord(currentAssetRecord);
					        clearControls();
					        formCreateAsset.close();
					        formCreateAssetStep2GenericSite.close();
					        formCreateAssetStep2Parent.close();
					        formCreateAssetStep2Support.close();
					        formCreateAssetStep4.close();
					        formCreateAssetStep2Unknown.close();
					        formEquipTypeFuncSelection.close();
					        formCreateAssetStep3.close();
					        formEditOrDecom.close();
					        formEgiCodeSelection.close();
					        formCreateAssetStep4.close();
					      
					       
					        });
					    }
					    ]   
					})
					
					],					
    content:[
oCreateAssetStep4Matrix
            ],
            contentWidth:"1024px",
            contentHeight: "99%",
      beforeOpen:function(){populateCreateAssetStep4Controls()},
	  
      afterOpen:function(){  
          CreateAssetStep4SetDefaultValues();
	  } ,
	  beforeClose:function(){
		  try {
			 
		  }catch(err)
		  {}
	  }
	
	 })

var formCreateAssetSuccess = new sap.m.Dialog("form_CreateAssetSuccess", {
    horizontalScrolling: true,
    verticalScrolling: true,
    modal: true,
    contentWidth: "1em",
    buttons: [
new sap.m.Button("formCreateAssetStep4_CreateNewAsset", {
    text: "Create New Asset",
    type: sap.m.ButtonType.Accept,
    tap: [function (oEvt) {
        action = recordAction.EDIT;
        action = recordAction.CREATE;
        labelSite.setVisible(true);
        InputCreateAssetSite.setVisible(true);
        formCreateAsset.open()
    }]
}),
					new sap.m.Button("formCreateAssetStep4_BackToMain", {
					    text: "Back to Main Screen",
					    icon: "",
					    type: sap.m.ButtonType.Accept,
					    tap: [function (oEvt) {
					        formCreateAssetSuccess.close();
					    }
					    ]
					})
    ],
    content: [
     new sap.m.Label({ text: "Your record was saved successfully" }),
     new sap.ui.commons.HorizontalDivider({ width: "0px" }),
       new sap.m.Label({ text: "You may create a new record or go back to the main screen" }),
    ],
    contentWidth: "600px",
    contentHeight: "150px",
})

function populateCreateAssetStep4Controls()
{
   
    inputCreateAssetStep4FuncLocPart1.setValue(currentAssetRecord.functionTypeZNCDESC);
    inputCreateAssetStep4FuncLocPart2.setValue(currentAssetRecord.zinsLocDesc2);
    inputCreateAssetStep4FuncLocPart3.setValue(currentAssetRecord.zinsLocDesc3);

    sap.ui.getCore().getElementById("input_CreateAssetStep4Site").setValue(currentAssetRecord.site);
    sap.ui.getCore().getElementById("input_CreateAssetStep4Make").setValue(currentAssetRecord.make);
    sap.ui.getCore().getElementById("input_CreateAssetStep4Model").setValue(currentAssetRecord.model);
    sap.ui.getCore().getElementById("input_CreateAssetStep4SerialNumber").setValue(currentAssetRecord.sergeSerialNumber);
    sap.ui.getCore().getElementById("input_CreateAssetStep4EquipmentType").setValue(currentAssetRecord.equipmentTypeDescriptionZOTDESC);
    sap.ui.getCore().getElementById("input_CreateAssetStep4FunctionType").setValue(currentAssetRecord.functionTypeZNCDESC);
    sap.ui.getCore().getElementById("input_CreateAssetStep4PlantGroup").setValue(currentAssetRecord.plantGroupDescriptionZPLGDESC);
    sap.ui.getCore().getElementById("input_CreateAssetStep4SystemCode").setValue(currentAssetRecord.zsysDescSystemCodeDescription);
    sap.ui.getCore().getElementById("input_CreateAssetStep4Comments").setValue($.grep([currentAssetRecord.zcomments1, currentAssetRecord.zcomments2], Boolean).join(""));
			}





function CreateAssetStep4ConfirmCancel(title, msg) {

    sap.m.MessageBox.show(msg, {
        icon: sap.m.MessageBox.Icon.WARNING,
        title: title,
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        onClose: function (oAction) {

            if (oAction == "YES") {
                formCreateAsset.close();
                formCreateAssetStep2GenericSite.close();
                formCreateAssetStep2Parent.close();
                formCreateAssetStep4.close();
                formCreateAssetStep2Unknown.close();
                formEquipTypeFuncSelection.close();
                formCreateAssetStep3.close();
                formCreateAssetStep4.close();
              //  formCreateAssetReview.close();

            }
        }
    }
           );
}

function CreateAssetStep4SetDefaultValues() {
    var otitle = "";

    var recordType = "";
    if (action == recordAction.EDIT) {
        recordType = "Asset - Step 4 of 4";
    }
    else {
        switch (currentAssetRecord.zascatAssetCategory) {
            case "A":
                recordType = "Parent Asset/Generic Plant Group - Step 4 of 4";
                break;
            case "B":
                recordType = "Support Asset - Step 4 of 4";
                break;
            case "C":
                recordType = "Parent Asset/Generic Plant Group - Step 4 of 4";
                break;
            case "D":
                recordType = "Generic Site - Step 4 of 4";
                break;
            case "E":
                recordType = "Unknown - Step 4 of 4";
                break;
            default:
        }
    }

    switch (action) {
        case recordAction.CREATE:
            otitle = "Create " + recordType;
            break;
        case recordAction.EDIT:
            otitle = "Edit " + recordType;
            break;
        case recordAction.AFTERDECOM:
            otitle = "Create " + recordType;
            break;
        case recordAction.COPY:
            otitle = "COPY " + recordType;
            break;
        case recordAction.NOA:
            otitle = "Not Accessible Asset Details - Submit";
            break;
        default:
    }

    formCreateAssetStep4.setTitle(otitle);
    var subTitleString = getFunctionalLocationString()
    if ((action == recordAction.EDIT)) {
        subTitleString = currentAssetRecord.originalFuncLocStringZINSTLOCN
    }
    sap.ui.getCore().getElementById("CreateAssetStep4funcLocHeader").setText(subTitleString);
     getNumFilesForUpload(currentAssetRecord.recordNumberZRECNUM);
}
