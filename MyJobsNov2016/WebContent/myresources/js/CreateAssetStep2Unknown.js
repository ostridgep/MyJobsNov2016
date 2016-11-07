
var oCreateAssetStep2UnknownMatrix = new sap.ui.commons.layout.MatrixLayout({
    id: "CreateAssetStep2UnknownMatrix",
    layoutFixed: true,
    columns: 5,
    width: '950px',
    widths: ['210px', '360px', '60px', '350px', '1px']
});

var space = new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "0px" });

//oCreateAssetStep2UnknownMatrix.createRow(new sap.m.Label({ text: "1" }), new sap.m.Label({ text: "2" }), new sap.m.Label({ text: "3" }),
//		new sap.m.Label({ text: "4" }), new sap.m.Label({ text: "5" }));


var CreateAssetStep2UnknownLabelPlantGroup = new sap.m.Label({ text: "Plant Group" })

var CreateAssetStep2UnknownSelectPlantGroup = new sap.m.Select('CreateAssetStep2UnknownFilter_PlantGroup', {
    width: "350px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function () { OnPlantGroupSelectedCreateAssetStep2Unknown() }
});

oCreateAssetStep2UnknownMatrix.createRow(
		CreateAssetStep2UnknownLabelPlantGroup, CreateAssetStep2UnknownSelectPlantGroup);

var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2UnknownMatrix.addRow(oRow);
var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 4,
    rowSpan: 2
});

oCell.addContent(new sap.m.TextArea("CreateAssetStep2Unknowninput_PlantGroupDef",
		{ width: "690px", rows: 2, enabled: false }));
oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());
oRow.addCell(oCell);

oCreateAssetStep2UnknownMatrix.createRow();
oCreateAssetStep2UnknownMatrix.createRow();
oCreateAssetStep2UnknownMatrix.createRow();
oCreateAssetStep2UnknownMatrix.createRow();

var CreateAssetStep2UnknownLabelSystemCode = new sap.m.Label({ text: "System Code" })

var CreateAssetStep2UnknownSelectSystemCode = new sap.m.Select('CreateAssetStep2UnknownFilter_SystemCode', {
    enabled: false,
    width: "350px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function () { OnSystemCodeSelectedCreateAssetStep2Unknown() }
});

oCreateAssetStep2UnknownMatrix.createRow(
		CreateAssetStep2UnknownLabelSystemCode, CreateAssetStep2UnknownSelectSystemCode);


var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2UnknownMatrix.addRow(oRow);
var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 4,
    rowSpan: 2
});

oCell.addContent(new sap.m.TextArea("CreateAssetStep2Unknowninput_SystemCodeDef",
		{ width: "690px", rows: 2, enabled: false }));
oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());
oRow.addCell(oCell);
oCreateAssetStep2UnknownMatrix.createRow();
oCreateAssetStep2UnknownMatrix.createRow();
oCreateAssetStep2UnknownMatrix.createRow();
oCreateAssetStep2UnknownMatrix.createRow();
oCreateAssetStep2UnknownMatrix.createRow();

//FuncLocBlock
var charactersRemainingLabelCreateAssetStep2Unknown = new sap.m.Label({ text: "" })

var oCellSpace = new sap.ui.commons.layout.MatrixLayoutCell({ });
oCellSpace.addContent(new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "30px" }));

oCreateAssetStep2UnknownMatrix.createRow(oCellSpace, new sap.m.Label({ text: " " }), new sap.m.Label({ text: " " }),
		 charactersRemainingLabelCreateAssetStep2Unknown);

var inputCreateAssetStep2UnknownFuncLocPart1 = new sap.m.Input(
		{
		    width: "350px",
		    type: sap.m.InputType.Input,
		    enabled: false
		});

var inputCreateAssetStep2UnknownFuncLocPart2 = new sap.m.Input(
		{
		    textAlign: sap.ui.core.TextAlign.Center,
		    width: "50px",
		    type: sap.m.InputType.Number,
		    maxLength:2,
		    enabled: true,
		    liveChange: [function (event) {
		    	
		        calculateRemainingCharacterCountCreateAssetStep2Unknown();
		    }]
		});

var inputCreateAssetStep2UnknownFuncLocPart3 = new sap.m.Input(
		{
		    width: "300px",
		    type: sap.m.InputType.Input,
		    enabled: true,
		    liveChange: [function (event) {
		        calculateRemainingCharacterCountCreateAssetStep2Unknown();
		    }]
		});


var labelCreateAssetStep2UnknownPrevFuncLocDesc = new sap.m.Label({ visible: false, text: "Previous FL Description" })
var inputCreateAssetStep2UnknownPrevFuncLocPart1 = new sap.m.Input(
		{
		    width: "350px",
		    type: sap.m.InputType.Input,
		    enabled: false,
		    visible: false
		});

oCreateAssetStep2UnknownMatrix.createRow(labelCreateAssetStep2UnknownPrevFuncLocDesc, inputCreateAssetStep2UnknownPrevFuncLocPart1)

//ROW1
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2UnknownMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "Functional Location" }));

oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep2UnknownFuncLocPart1);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    hAlign: sap.ui.commons.layout.HAlign.Center,
    colSpan: 1,
    rowSpan: 2
});

oCell.addContent(inputCreateAssetStep2UnknownFuncLocPart2);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep2UnknownFuncLocPart3);
oRow.addCell(oCell);

//ROW2
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2UnknownMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});

oCell.addContent(new sap.m.Label({ text: "Description" }));
oRow.addCell(oCell);

//ROW3
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2UnknownMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(new sap.m.Label({ text: "Examples" }));

oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "SLUDGE PUMP" }));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ hAlign: sap.ui.commons.layout.HAlign.Center });
oCell.addContent(new sap.m.Label({ text: "1" }));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "SLUDGE WELL FEED" }));
oRow.addCell(oCell);


//ROW4
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2UnknownMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});

oCell.addContent(new sap.m.Label({ text: "MOTOR" }));
//oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ hAlign: sap.ui.commons.layout.HAlign.Center });
oCell.addContent(new sap.m.Label({ text: "-" }));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "INLET SCREEN 2" }));
oRow.addCell(oCell);

//END FuncLocBlock


var formCreateAssetStep2Unknown = new sap.m.Dialog("form_CreateAssetStep2Unknown", {
    subHeader: new sap.m.Bar({
        contentMiddle: [new sap.m.Label("CreateAssetStep2UnknownfuncLocHeader", {
            text: ""
        })],
    }),
    horizontalScrolling: true,
    verticalScrolling: true,
    modal: true,
    contentWidth: "1em",

    buttons: [
        
        new sap.m.Button({
            text: "Back",
            type: sap.m.ButtonType.Accept,
            tap: [function (oEvt) {
                currentAssetRecord.zinsLocDesc1 = inputCreateAssetStep2UnknownFuncLocPart1.getValue();
                currentAssetRecord.zinsLocDesc2 = inputCreateAssetStep2UnknownFuncLocPart2.getValue();
                currentAssetRecord.zinsLocDesc3 = inputCreateAssetStep2UnknownFuncLocPart3.getValue();
                formCreateAssetStep2Unknown.close();
            }]
        }),
					new sap.m.Button({
					    text: "Cancel",
					    icon: "sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [function (oEvt) {
					        if (sap.ui.getCore().getElementById('formCreateAssetStep2Unknown_Next').getVisible()) {
					            var msgCancel = "You have chosen to cancel part way through the creation process. ";
					            msgCancel += "Clicking YES will confirm you wish to cancel and return to the Home screen. ";
					            msgCancel += "Clicking NO will take you to the previous screen.";
					            CreateAssetStep2UnknownConfirmCancel("", msgCancel)
					        }
					    }]
					}),
					new sap.m.Button("formCreateAssetStep2Unknown_Next", {

					    text: "Next",
					    icon: "",
					    type: sap.m.ButtonType.Accept,
					    tap: [function (oEvt) {
					        currentAssetRecord.zinsLocDesc1 = inputCreateAssetStep2UnknownFuncLocPart1.getValue();
					        currentAssetRecord.zinsLocDesc2 = inputCreateAssetStep2UnknownFuncLocPart2.getValue();
					        currentAssetRecord.zinsLocDesc3 = inputCreateAssetStep2UnknownFuncLocPart3.getValue();
					        formCreateAssetStep3.open()
					        ValidateFuncLocStep2Unknown();
					    }
					    ]
					})

    ],
    content: [
oCreateAssetStep2UnknownMatrix
    ],
    contentWidth: "1024px",
    contentHeight: "99%",
    beforeOpen: function () { populateCreateAssetStep2UnknownControls() },

    afterOpen: function () {
        CreateAssetStep2UnknownSetDefaultValues();
    },
    beforeClose: function () {
        try {

        } catch (err)
        { }
    }

})

function populateCreateAssetStep2UnknownControls() {
    var SQLStatement = "";

    sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup").destroyItems();
    sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup").addItem(
            new sap.ui.core.Item({
                key: "NOTSELECTED",
                text: ''
            }))
    SQLStatement = "select distinct ZPLGDESC,ZPLGRP from PlantGroupCodes where ZZW_WW='" + currentAssetRecord.businessUnit
                 + "' Order by ZPLGDESC";
    html5sql
            .process(
                    SQLStatement,
                    function (transaction, results, rowsArray) {

                        for (var n = 0; n < rowsArray.length; n++) {
                            item = rowsArray[n];
                            sap.ui.getCore()
                                    .getElementById("CreateAssetStep2UnknownFilter_PlantGroup")
                                    .addItem(new sap.ui.core.Item({
                                        key: item.ZPLGRP,
                                        text: item.ZPLGDESC
                                    }))
                        }
                        if ((action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY)
				&& currentAssetRecord.plantGroupCodeZplgrp != null) {
                            sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup")
                                    .setSelectedKey(currentAssetRecord.plantGroupCodeZplgrp);
                        }

                    }, function (error, statement) {
                        alert("error");
                    })

    sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_SystemCode").destroyItems();
    sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_SystemCode").addItem(
            new sap.ui.core.Item({
                key: "NOTSELECTED",
                text: ''
            }))
    SQLStatement = "select distinct ZZSYSDESC,ZSYSCODE from SystemCodes Order by ZZSYSDESC"
    html5sql
            .process(
                    SQLStatement,
                    function (transaction, results, rowsArray) {

                        for (var n = 0; n < rowsArray.length; n++) {
                            item = rowsArray[n];
                            sap.ui.getCore()
                                    .getElementById("CreateAssetStep2UnknownFilter_SystemCode")
                                    .addItem(new sap.ui.core.Item({
                                        key: item.ZSYSCODE,
                                        text: item.ZZSYSDESC
                                    }))
                        }
                        //        if ((action == recordAction.EDIT || action == recordAction.AFTERDECOM)
                        //&& currentAssetRecord.plantGroupCodeZplgrp != null) {
                        //            sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup")
                        //                    .setSelectedKey(currentAssetRecord.plantGroupCodeZplgrp);
                        //        }

                    }, function (error, statement) {
                        opMessage("Error: " + error.message + " when processing " + statement);
                    })

}



function CreateAssetStep2UnknownValidateControls() {


    var subTitleString = getFunctionalLocationString()
    if ((action == recordAction.EDIT || action == recordAction.COPY)) {
        subTitleString = subTitleString + "    Original FL: " + currentAssetRecord.originalFuncLocStringZINSTLOCN
    }

    sap.ui.getCore().getElementById("CreateAssetStep2UnknownfuncLocHeader").setText(subTitleString);
    if ((!sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup").getSelectedItem()) || sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup").getSelectedItem().getKey() == "NOTSELECTED") {
        sap.ui.getCore().getElementById("formCreateAssetStep2Unknown_Next").setEnabled(false);
    }
    else {
        sap.ui.getCore().getElementById("formCreateAssetStep2Unknown_Next").setEnabled(true);
    }
}


function CreateAssetStep2UnknownConfirmCancel(title, msg) {

    sap.m.MessageBox.show(msg, {
        icon: sap.m.MessageBox.Icon.WARNING,
        title: title,
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        onClose: function (oAction) {

            if (oAction == "YES") {

                formCreateAssetStep2Unknown.close();
                formCreateAsset.close();

            }
        }
    }
           );
}

function CreateAssetStep2UnknownSetDefaultValues() {

    if (currentAssetRecord.functionTypeZNCDESC != null) {
        inputCreateAssetStep2UnknownFuncLocPart1.setValue(currentAssetRecord.functionTypeZNCDESC);
    }

    if (currentAssetRecord.zinsLocDesc2 != null) {
        inputCreateAssetStep2UnknownFuncLocPart2.setValue(currentAssetRecord.zinsLocDesc2);
    }
    else {
        inputCreateAssetStep2UnknownFuncLocPart2.setValue("-");
    }

    if (currentAssetRecord.zinsLocDesc3 != null) {
        inputCreateAssetStep2UnknownFuncLocPart3.setValue(currentAssetRecord.zinsLocDesc3);
    }

    if (action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY) {
        inputCreateAssetStep2UnknownPrevFuncLocPart1.setValue(currentAssetRecord.originalZinsLocDesc)
        labelCreateAssetStep2UnknownPrevFuncLocDesc.setVisible(true);
        inputCreateAssetStep2UnknownPrevFuncLocPart1.setVisible(true);
    }
    else {
        labelCreateAssetStep2UnknownPrevFuncLocDesc.setVisible(false);
        inputCreateAssetStep2UnknownPrevFuncLocPart1.setVisible(false);
    }

    var otitle = "";

    switch (action) {
        case recordAction.CREATE:
            otitle = "Create Asset - Unknown Combination - Step 2 of 4";
            break;
        case recordAction.EDIT:
            otitle = "Edit Asset - Unknown Combination - Step 2 of 4";
            break;
        case recordAction.AFTERDECOM:
            otitle = "Create Asset - Unknown Combination - Step 2 of 4";
            break;
        case recordAction.COPY:
            otitle = "Copy Asset - Unknown Combination - Step 2 of 4";
            break;
        default:
    }

    formCreateAssetStep2Unknown.setTitle(otitle);
    CreateAssetStep2UnknownValidateControls();
}



function setPlantGroupLongTextCreateAssetStep2Unknown() {
    var sqlstatement = "select distinct ZPLGDEF1 || ' ' || ZPLGDEF2 AS ZPLGDEF from PlantGroupCodes where  ZPLGRP =";
    sqlstatement += "'" + currentAssetRecord.plantGroupCodeZplgrp + "'";
    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        if (rowsArray.length > 0) {
                            sap.ui.getCore().getElementById("CreateAssetStep2Unknowninput_PlantGroupDef").setValue(rowsArray[0].ZPLGDEF);
                        }
                        else {
                            sap.ui.getCore().getElementById("CreateAssetStep2Unknowninput_PlantGroupDef").setValue("");
                        }
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }

            );
}



function setSystemCodeLongTextCreateAssetStep2Unknown() {
    var sqlstatement = "select distinct ZSYSDEF1 || ' ' || ZSYSDEF2 AS SYSDEF from SystemCodes where  ZSYSCODE =";
    sqlstatement += "'" + currentAssetRecord.SystemCodeZSYSCODE + "'";
    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        if (rowsArray.length > 0) {
                            sap.ui.getCore().getElementById("CreateAssetStep2Unknowninput_SystemCodeDef").setValue(rowsArray[0].SYSDEF);
                        }
                        else {
                            sap.ui.getCore().getElementById("CreateAssetStep2Unknowninput_SystemCodeDef").setValue("");
                        }
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }

            );
}


function OnPlantGroupSelectedCreateAssetStep2Unknown() {
    
    if (sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup").getSelectedItem().getKey() != "NOTSELECTED") {
        currentAssetRecord.plantGroupCodeZplgrp = sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup").getSelectedKey();
        currentAssetRecord.plantGroupDescriptionZPLGDESC = sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_PlantGroup").getSelectedItem().getText();
        sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_SystemCode").setEnabled(true);
        setPlantGroupLongTextCreateAssetStep2Unknown()
        getPlantGroupAndProcessGroupCode(currentAssetRecord.plantGroupCodeZplgrp, currentAssetRecord.businessUnit, function () {
            if (action == recordAction.COPY) {
                //generateNextItemID(function () {
                    CreateAssetStep2UnknownValidateControls();
                //});
            }
            else
            {
                CreateAssetStep2UnknownValidateControls();
            }
        });
    }
    else {
        currentAssetRecord.plantGroupCodeZplgrp = null;
        sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_SystemCode").setEnabled(false);
    }
}

function OnSystemCodeSelectedCreateAssetStep2Unknown() {
   
    currentAssetRecord.funcLocStringZINSTLOCN = getFunctionalLocationString();
    if (sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_SystemCode").getSelectedItem().getKey() != "NOTSELECTED") {
        currentAssetRecord.SystemCodeZSYSCODE = sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_SystemCode").getSelectedKey();
        currentAssetRecord.zsysDescSystemCodeDescription = sap.ui.getCore().getElementById("CreateAssetStep2UnknownFilter_SystemCode").getSelectedItem().getText();
        setSystemCodeLongTextCreateAssetStep2Unknown()
        if (currentAssetRecord.EQUNR == "NotApplicable") {
            currentAssetRecord.SystemCodeNumber = "01";
        }
        else if (currentAssetRecord.EquipmentDescriptionEQKTU == "NotFound") {
            //generateNextPlantSystemItemNumber(function (newSystemCodeNumber) {
                //currentAssetRecord.SystemCodeNumber = newSystemCodeNumber
                CreateAssetStep2UnknownValidateControls();
            //});
        }
        //generateNextItemID(function () {
            CreateAssetStep2UnknownValidateControls();
        //});
    }
    else {
        currentAssetRecord.SystemCodeZSYSCODE = null;
    }
    CreateAssetStep2UnknownValidateControls()
}
function calculateRemainingCharacterCountCreateAssetStep2Unknown() {
    var a = inputCreateAssetStep2UnknownFuncLocPart1.getValue().length + 1;
    var b = inputCreateAssetStep2UnknownFuncLocPart2.getValue().length + 1;
    var c = inputCreateAssetStep2UnknownFuncLocPart3.getValue().length;
    var d = 40 - (a + b);

    if (d <= 0) {
        d = 0;
        inputCreateAssetStep2UnknownFuncLocPart2.setEnabled(false)
        inputCreateAssetStep2UnknownFuncLocPart3.setEnabled(false)
    }
    else {
        inputCreateAssetStep2UnknownFuncLocPart2.setEnabled(true)
        inputCreateAssetStep2UnknownFuncLocPart3.setEnabled(true)
    }
    e = 40 - (a + b + c);
    if (e < 0) {
        e = 0;
        var origVal = inputCreateAssetStep2UnknownFuncLocPart3.getValue();
        inputCreateAssetStep2UnknownFuncLocPart3.setValue(origVal.substr(0, d));
    }
    charactersRemainingLabelCreateAssetStep2Unknown.setText("Characters remaining:" + e);
}
function ValidateFuncLocStep2Unknown(){
	var a=inputCreateAssetStep2UnknownFuncLocPart2.getValue().length;
	if(a>2){
		sap.m.MessageBox.show("Please Enter only two numeric charcaters", {
	        icon: sap.m.MessageBox.Icon.WARNING,
	        //title: title,
	        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
	        onClose: function (oAction) {

	          
	        }
	    })	
	}
	else{
		return;
	}

}