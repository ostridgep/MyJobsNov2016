var nextPressedCreateAssetStep2Support = false;
var oCreateAssetStep2SupportMatrix = new sap.ui.commons.layout.MatrixLayout({
    id: "CreateAssetStep2SupportMatrix",
    layoutFixed: true,
    columns: 5,
    width: '950px',
    widths: ['160px', '360px', '60px', '350px', '1px']
});

var space = new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "0px" });

//oCreateAssetStep2SupportMatrix.createRow(new sap.m.Label({ text: "1" }), new sap.m.Label({ text: "2" }), new sap.m.Label({ text: "3" }),
//		new sap.m.Label({ text: "4" }), new sap.m.Label({ text: "5" }));

var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2SupportMatrix.addRow(oRow);
var oCell = new sap.ui.commons.layout.MatrixLayoutCell();

oCell.addContent(new sap.m.Label({ text: "Parent Asset" }));
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ colSpan: 2 });
var horizontalLayout = new sap.ui.layout.HorizontalLayout({
    content: [new sap.m.Button({
        text: "Select Asset",
        tap: [function (oEvt) {
            formAssetListParent.open();
        }]
    }), new sap.ui.commons.layout.AbsoluteLayout({
        width: "10px",
        height: "0px"
    }), new sap.m.Button({
        text: "Not Applicable",
        tap: [function (oEvt) {
            sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").setEnabled(true);
            sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").setEnabled(false);
            currentAssetRecord.EQUNR = "NotApplicable";
        }]
    })]
});


oCell.addContent(horizontalLayout);

oRow.addCell(oCell);



var CreateAssetStep2SupportLabelPlantGroup = new sap.m.Label({ text: "Plant Group" })

var CreateAssetStep2SupportSelectPlantGroup = new sap.m.Select('CreateAssetStep2SupportFilter_PlantGroup', {
    enabled: false,
    width: "350px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function () { OnPlantGroupSelectedCreateAssetStep2Support() }
});

oCreateAssetStep2SupportMatrix.createRow(
		CreateAssetStep2SupportLabelPlantGroup, CreateAssetStep2SupportSelectPlantGroup);

var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2SupportMatrix.addRow(oRow);
var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 4,
    rowSpan: 2
});

oCell.addContent(new sap.m.TextArea("CreateAssetStep2Supportinput_PlantGroupDef",
		{ width: "690px", rows: 2, enabled: false }));
oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());
oRow.addCell(oCell);

oCreateAssetStep2SupportMatrix.createRow();
oCreateAssetStep2SupportMatrix.createRow();
oCreateAssetStep2SupportMatrix.createRow();
oCreateAssetStep2SupportMatrix.createRow();

var CreateAssetStep2SupportLabelSystemCode = new sap.m.Label({ text: "System Code" })

var CreateAssetStep2SupportSelectSystemCode = new sap.m.Select('CreateAssetStep2SupportFilter_SystemCode', {
    enabled: false,
    width: "350px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function () { OnSystemCodeSelectedCreateAssetStep2Support() }
});

oCreateAssetStep2SupportMatrix.createRow(
		CreateAssetStep2SupportLabelSystemCode, CreateAssetStep2SupportSelectSystemCode);


var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2SupportMatrix.addRow(oRow);
var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 4,
    rowSpan: 2
});

oCell.addContent(new sap.m.TextArea("CreateAssetStep2Supportinput_SystemCodeDef",
		{ width: "690px", rows: 2, enabled: false }));
oRow.addCell(new sap.ui.commons.layout.MatrixLayoutCell());
oRow.addCell(oCell);
oCreateAssetStep2SupportMatrix.createRow();
oCreateAssetStep2SupportMatrix.createRow();
oCreateAssetStep2SupportMatrix.createRow();
oCreateAssetStep2SupportMatrix.createRow();
oCreateAssetStep2SupportMatrix.createRow();

//FuncLocBlock
var charactersRemainingLabelCreateAssetStep2Support = new sap.m.Label({ text: "" })

var oCellSpace = new sap.ui.commons.layout.MatrixLayoutCell({});
oCellSpace.addContent(new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "30px" }));

oCreateAssetStep2SupportMatrix.createRow(oCellSpace, new sap.m.Label({ text: " " }), new sap.m.Label({ text: " " }),
		 charactersRemainingLabelCreateAssetStep2Support);

var inputCreateAssetStep2SupportFuncLocPart1 = new sap.m.Input(
		{
		    width: "350px",
		    type: sap.m.InputType.Input,
		    enabled: false
		});

var inputCreateAssetStep2SupportFuncLocPart2 = new sap.m.Input("inputCreateAssetStep2Support_FuncLocPart2",
		{
		    textAlign: sap.ui.core.TextAlign.Center,
		    width: "50px",
		    type: sap.m.InputType.Number,
		    maxLength:2,
		    enabled: true,
		    liveChange: [function (event) {
		    	
		        calculateRemainingCharacterCountCreateAssetStep2Support();
		    }]
		});

var inputCreateAssetStep2SupportFuncLocPart3 = new sap.m.Input(
		{
		    width: "300px",
		    type: sap.m.InputType.Input,
		    enabled: true,
		    liveChange: [function (event) {
		        calculateRemainingCharacterCountCreateAssetStep2Support();
		    }]
		});


var labelCreateAssetStep2SupportPrevFuncLocDesc = new sap.m.Label({ visible: false, text: "Previous FL Description" })
var inputCreateAssetStep2SupportPrevFuncLocPart1 = new sap.m.Input(
		{
		    width: "350px",
		    type: sap.m.InputType.Input,
		    enabled: false,
		    visible: false
		});

oCreateAssetStep2SupportMatrix.createRow(labelCreateAssetStep2SupportPrevFuncLocDesc, inputCreateAssetStep2SupportPrevFuncLocPart1)

//ROW1
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2SupportMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "Functional Location" }));

oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep2SupportFuncLocPart1);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    hAlign: sap.ui.commons.layout.HAlign.Center,
    colSpan: 1,
    rowSpan: 2
});

oCell.addContent(inputCreateAssetStep2SupportFuncLocPart2);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep2SupportFuncLocPart3);
oRow.addCell(oCell);

//ROW2
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2SupportMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});

oCell.addContent(new sap.m.Label({ text: "Description" }));
oRow.addCell(oCell);

//ROW3
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2SupportMatrix.addRow(oRow);

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
oCreateAssetStep2SupportMatrix.addRow(oRow);

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

var formCreateAssetStep2Support = new sap.m.Dialog("form_CreateAssetStep2Support", {
    subHeader: new sap.m.Bar({
        contentMiddle: [new sap.m.Label("CreateAssetStep2SupportfuncLocHeader", {
            text: ""
        })],
    }),
    horizontalScrolling: true,
    verticalScrolling: true,
    modal: true,
    contentWidth: "1em",

    buttons: [
         new sap.m.Button({
             text: "Asset List",
             type: sap.m.ButtonType.Accept,
             tap: [function (oEvt) {
                 formAssetListStep2.open();
             }]
         }),
        new sap.m.Button({
            text: "Back",
            type: sap.m.ButtonType.Accept,
            tap: [function (oEvt) {
                currentAssetRecord.zinsLocDesc1 = inputCreateAssetStep2SupportFuncLocPart1.getValue();
                currentAssetRecord.zinsLocDesc2 = inputCreateAssetStep2SupportFuncLocPart2.getValue();
                currentAssetRecord.zinsLocDesc3 = inputCreateAssetStep2SupportFuncLocPart3.getValue();
                formCreateAssetStep2Support.close();
            }]
        }),
					new sap.m.Button({
					    text: "Cancel",
					    icon: "sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [function (oEvt) {
					        if (sap.ui.getCore().getElementById('formCreateAssetStep2Support_Next').getVisible()) {
					            var msgCancel = "You have chosen to cancel part way through the creation process. ";
					            msgCancel += "Clicking YES will confirm you wish to cancel and return to the Home screen. ";
					            msgCancel += "Clicking NO will take you to the previous screen.";
					            CreateAssetStep2SupportConfirmCancel("", msgCancel)
					        }
					    }]
					}),
					new sap.m.Button("formCreateAssetStep2Support_Next", {

					    text: "Next",
					    icon: "",
					    type: sap.m.ButtonType.Accept,
					    tap: [function (oEvt) {
					        currentAssetRecord.zinsLocDesc1 = inputCreateAssetStep2SupportFuncLocPart1.getValue();
					        currentAssetRecord.zinsLocDesc2 = inputCreateAssetStep2SupportFuncLocPart2.getValue();
					        currentAssetRecord.zinsLocDesc3 = inputCreateAssetStep2SupportFuncLocPart3.getValue();
					        createAssetStep2SupportValidateControls();
					        nextPressedCreateAssetStep2Support = true;
					        validatePageCreateAssetStep2Support();
					        ValidateFuncLocStep2Support();
					    }
					    ]
					})

    ],
    content: [
oCreateAssetStep2SupportMatrix
    ],
    contentWidth: "1024px",
    contentHeight: "99%",
    beforeOpen: function () { populateCreateAssetStep2SupportControls() },

    afterOpen: function () {
        CreateAssetStep2SupportSetDefaultValues();
    },
    beforeClose: function () {
        try {

        } catch (err)
        { }
    }

})

function populateCreateAssetStep2SupportControls() {
    var SQLStatement = "";

    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").destroyItems();
    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").addItem(
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
                                    .getElementById("CreateAssetStep2SupportFilter_PlantGroup")
                                    .addItem(new sap.ui.core.Item({
                                        key: item.ZPLGRP,
                                        text: item.ZPLGDESC
                                    }))
                        }

                        if ((action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY)
				&& currentAssetRecord.plantGroupCodeZplgrp != null) {
                            sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup")
                                    .setSelectedKey(currentAssetRecord.plantGroupCodeZplgrp);
                            setPlantGroupLongTextCreateAssetStep2Support();
                        }

                    }, function (error, statement) {
                        alert("error");
                    })

    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").destroyItems();
    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").addItem(
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
                                    .getElementById("CreateAssetStep2SupportFilter_SystemCode")
                                    .addItem(new sap.ui.core.Item({
                                        key: item.ZSYSCODE,
                                        text: item.ZZSYSDESC
                                    }))
                        }
                        if ((action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY)
                        && currentAssetRecord.SystemCodeZSYSCODE != null) {
                                    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode")
                                            .setSelectedKey(currentAssetRecord.SystemCodeZSYSCODE);
                                    setSystemCodeLongTextCreateAssetStep2Support();
                                }

                    }, function (error, statement) {
                        opMessage("Error: " + error.message + " when processing " + statement);
                    })

}



function createAssetStep2SupportValidateControls() {

    var subTitleString = getFunctionalLocationString()
    if ((action == recordAction.EDIT ||  action == recordAction.COPY)) {
        subTitleString = subTitleString + "    Original FL: " + currentAssetRecord.originalFuncLocStringZINSTLOCN
    }

    sap.ui.getCore().getElementById("CreateAssetStep2SupportfuncLocHeader").setText(subTitleString);
    if ((!sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").getSelectedItem()) || sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").getSelectedItem().getKey() == "NOTSELECTED") {
        sap.ui.getCore().getElementById("formCreateAssetStep2Support_Next").setEnabled(false);
    }
    else {
        sap.ui.getCore().getElementById("formCreateAssetStep2Support_Next").setEnabled(true);
    }
}


function validatePageCreateAssetStep2Support() {
    if (inputCreateAssetStep2SupportFuncLocPart2.getValue() == "") {
        pageisValid = false;
        inputCreateAssetStep2Support_FuncLocPart2.style.backgroundColor = "red";
    }
    else {
        pageisValid = true;
        inputCreateAssetStep2Support_FuncLocPart2.style.backgroundColor = "red";
    }
    if (pageisValid) {
        if (pageisValid) {
            formCreateAssetStep3.open()
        }
    }
}

function CreateAssetStep2SupportConfirmCancel(title, msg) {

    sap.m.MessageBox.show(msg, {
        icon: sap.m.MessageBox.Icon.WARNING,
        title: title,
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        onClose: function (oAction) {

            if (oAction == "YES") {

                formCreateAssetStep2Support.close();
                formCreateAsset.close();

            }
        }
    }
           );
}



function CreateAssetStep2SupportSetDefaultValues() {

    if (currentAssetRecord.functionTypeZNCDESC != null) {
        inputCreateAssetStep2SupportFuncLocPart1.setValue(currentAssetRecord.functionTypeZNCDESC);
    }

    if (currentAssetRecord.zinsLocDesc2 != null) {
        inputCreateAssetStep2SupportFuncLocPart2.setValue(currentAssetRecord.zinsLocDesc2);
    }
    else {
        inputCreateAssetStep2SupportFuncLocPart2.setValue("-");
    }

    if (currentAssetRecord.zinsLocDesc3 != null) {
        inputCreateAssetStep2SupportFuncLocPart3.setValue(currentAssetRecord.zinsLocDesc3);
    }

    if (action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY) {
        inputCreateAssetStep2SupportPrevFuncLocPart1.setValue(currentAssetRecord.originalZinsLocDesc)
        labelCreateAssetStep2SupportPrevFuncLocDesc.setVisible(true);
        inputCreateAssetStep2SupportPrevFuncLocPart1.setVisible(true);
    }
    else {
        labelCreateAssetStep2SupportPrevFuncLocDesc.setVisible = false;
        inputCreateAssetStep2SupportPrevFuncLocPart1.setVisible = false;
    }

    var otitle = "";

    switch (action) {
        case recordAction.CREATE:
            otitle = "Create Asset - Support Asset - Step 2 of 4";
            break;
        case recordAction.EDIT:
            otitle = "Edit Asset - Support Asset - Step 2 of 4";
            break;
        case recordAction.AFTERDECOM:
            otitle = "Create Asset - Support Asset - Step 2 of 4";
            break;
        case recordAction.COPY:
            otitle = "Copy - Support Asset - Step 2 of 4";
            break;
        default:
    }

    formCreateAssetStep2Support.setTitle(otitle);
    createAssetStep2SupportValidateControls();
}



function setPlantGroupLongTextCreateAssetStep2Support() {
    var sqlstatement = "select distinct ZPLGDEF1 || ' ' || ZPLGDEF2 AS ZPLGDEF from PlantGroupCodes where  ZPLGRP =";
    sqlstatement += "'" + currentAssetRecord.plantGroupCodeZplgrp + "'";
    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        if (rowsArray.length > 0) {
                            sap.ui.getCore().getElementById("CreateAssetStep2Supportinput_PlantGroupDef").setValue(rowsArray[0].ZPLGDEF);
                        }
                        else {
                            sap.ui.getCore().getElementById("CreateAssetStep2Supportinput_PlantGroupDef").setValue("");
                        }
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }

            );
}



function setSystemCodeLongTextCreateAssetStep2Support() {
    var sqlstatement = "select distinct ZSYSDEF1 || ' ' || ZSYSDEF2 AS SYSDEF from SystemCodes where  ZSYSCODE =";
    sqlstatement += "'" + currentAssetRecord.SystemCodeZSYSCODE + "'";
    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        if (rowsArray.length > 0) {
                            sap.ui.getCore().getElementById("CreateAssetStep2Supportinput_SystemCodeDef").setValue(rowsArray[0].SYSDEF);
                        }
                        else {
                            sap.ui.getCore().getElementById("CreateAssetStep2Supportinput_SystemCodeDef").setValue("");
                        }
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }

            );
}


function OnPlantGroupSelectedCreateAssetStep2Support() {
    
    if (sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").getSelectedItem().getKey() != "NOTSELECTED") {
        currentAssetRecord.plantGroupCodeZplgrp = sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").getSelectedKey();
        currentAssetRecord.plantGroupDescriptionZPLGDESC = sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").getSelectedItem().getText();
        sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").setEnabled(true);
        setPlantGroupLongTextCreateAssetStep2Support()
        getPlantGroupAndProcessGroupCode(currentAssetRecord.plantGroupCodeZplgrp, currentAssetRecord.businessUnit, function () {
            if (action == recordAction.COPY) {
                //generateNextItemID(function () {
                    createAssetStep2SupportValidateControls();
                //});
            }
            else
            {
                createAssetStep2SupportValidateControls();
            }
        });
    }
    else {
        currentAssetRecord.plantGroupCodeZplgrp = null;
        sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").setEnabled(false);
    }
}

function OnSystemCodeSelectedCreateAssetStep2Support() {
   
    currentAssetRecord.funcLocStringZINSTLOCN = getFunctionalLocationString();
    if (sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").getSelectedItem().getKey() != "NOTSELECTED") {
        currentAssetRecord.SystemCodeZSYSCODE = sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").getSelectedKey();
        setSystemCodeLongTextCreateAssetStep2Support()
        if (currentAssetRecord.EQUNR == "NotApplicable") {
            currentAssetRecord.SystemCodeNumber = "01";
        }
        else if (currentAssetRecord.EquipmentDescriptionEQKTU == "NotFound") {
            //generateNextPlantSystemItemNumber(function (newSystemCodeNumber) {
                //currentAssetRecord.SystemCodeNumber = newSystemCodeNumber
                createAssetStep2SupportValidateControls();
            //});
        }
        //generateNextItemID(function () {
            createAssetStep2SupportValidateControls();
        //});
    }
    else {
        currentAssetRecord.SystemCodeZSYSCODE = null;
    }
    createAssetStep2SupportValidateControls()
}
function calculateRemainingCharacterCountCreateAssetStep2Support() {
    var a = inputCreateAssetStep2SupportFuncLocPart1.getValue().length + 1;
    var b = inputCreateAssetStep2SupportFuncLocPart2.getValue().length + 1;
    var c = inputCreateAssetStep2SupportFuncLocPart3.getValue().length;
    var d = 40 - (a + b);

    if (d <= 0) {
        d = 0;
        inputCreateAssetStep2SupportFuncLocPart2.setEnabled(false)
        inputCreateAssetStep2SupportFuncLocPart3.setEnabled(false)
    }
    else {
        inputCreateAssetStep2SupportFuncLocPart2.setEnabled(true)
        inputCreateAssetStep2SupportFuncLocPart3.setEnabled(true)
    }
    e = 40 - (a + b + c);
    if (e < 0) {
        e = 0;
        var origVal = inputCreateAssetStep2SupportFuncLocPart3.getValue();
        inputCreateAssetStep2SupportFuncLocPart3.setValue(origVal.substr(0, d));
    }
    charactersRemainingLabelCreateAssetStep2Support.setText("Characters remaining:" + e);
    if (inputCreateAssetStep2SupportFuncLocPart2.getValue() == "" && nextPressedCreateAssetStep2Support == true) {
        document.getElementById("inputCreateAssetStep2Support_FuncLocPart2").style.backgroundColor = "red";
    }
    else {
        document.getElementById("inputCreateAssetStep2Support_FuncLocPart2").style.backgroundColor = "";
    }
}
function ValidateFuncLocStep2Support(){
	var a=inputCreateAssetStep2SupportFuncLocPart2.getValue().length;
	if(a>2){
		sap.m.MessageBox.show("Please Enter only two numeric charcaters", {
	        icon: sap.m.MessageBox.Icon.WARNING,
	        //title: title,
	        actions: [sap.m.MessageBox.Action.CLOSE],
	        onClose: function (oAction) {
	        	formCreateAssetStep3.close();
	          
	        }
	    })	
	}
	else{
		return;
	}

}