var nextPressedCreateAssetStep2Parent = false;
var oCreateAssetStep2ParentMatrix = new sap.ui.commons.layout.MatrixLayout({
    id: "CreateAssetStep2ParentMatrix",
    layoutFixed: true,
    columns: 5,
    width: '950px',
    widths: ['210px', '360px', '60px', '350px', '1px']
});

var space = new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "0px" });

//oCreateAssetStep2ParentMatrix.createRow(new sap.m.Label({ text: "1" }), new sap.m.Label({ text: "2" }), new sap.m.Label({ text: "3" }),
//		new sap.m.Label({ text: "4" }), new sap.m.Label({ text: "5" }));

var CreateAssetStep2ParentLabelPlantGroup = new sap.m.Label({ text: "Plant Group" })

var CreateAssetStep2ParentSelectPlantGroup = new sap.m.Select('CreateAssetStep2ParentFilter_PlantGroup', {
    width: "350px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function () { OnPlantGroupSelectedCreateAssetStep2Parent() }
});

oCreateAssetStep2ParentMatrix.createRow(
		CreateAssetStep2ParentLabelPlantGroup, CreateAssetStep2ParentSelectPlantGroup);

var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2ParentMatrix.addRow(oRow);
var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 4,
    rowSpan: 2
});

oCell.addContent(new sap.m.TextArea("CreateAssetStep2Parentinput_Comments",
		{ width: "690px", rows: 4, enabled: false }));

oRow.addCell(oCell);
oCreateAssetStep2ParentMatrix.createRow();
oCreateAssetStep2ParentMatrix.createRow();
oCreateAssetStep2ParentMatrix.createRow();
oCreateAssetStep2ParentMatrix.createRow();
oCreateAssetStep2ParentMatrix.createRow();

//FuncLocBlock
var charactersRemainingLabelCreateAssetStep2Parent = new sap.m.Label({ text: "" })

var oCellSpace = new sap.ui.commons.layout.MatrixLayoutCell({});
oCellSpace.addContent(new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "30px" }));

oCreateAssetStep2ParentMatrix.createRow(oCellSpace, new sap.m.Label({ text: " " }), new sap.m.Label({ text: " " }),
		 charactersRemainingLabelCreateAssetStep2Parent);

var inputCreateAssetStep2ParentFuncLocPart1 = new sap.m.Input(
		{
		    width: "350px",
		    type: sap.m.InputType.Input,
		    enabled: false
		});

var inputCreateAssetStep2ParentFuncLocPart2 = new sap.m.Input("inputCreateAssetStep2Parent_FuncLocPart2",
		{
		    textAlign: sap.ui.core.TextAlign.Center,
		    width: "50px",
		    type: sap.m.InputType.Number,
		    //maxLength:2,
		    enabled: true,
		    liveChange: [function (event) {
		    	
		        calculateRemainingCharacterCountCreateAssetStep2Parent();
		    }]
		});

var inputCreateAssetStep2ParentFuncLocPart3 = new sap.m.Input(
		{
		    width: "300px",
		    type: sap.m.InputType.Input,
		    enabled: true,
		    liveChange: [function (event) {
		        calculateRemainingCharacterCountCreateAssetStep2Parent();
		    }]
		});


var labelCreateAssetStep2ParentPrevFuncLocDesc = new sap.m.Label({ visible: false, text: "Previous FL Description" })
var inputCreateAssetStep2ParentPrevFuncLocPart1 = new sap.m.Input(
		{
		    width: "350px",
		    type: sap.m.InputType.Input,
		    enabled: false,
		    visible: false
		});

oCreateAssetStep2ParentMatrix.createRow(labelCreateAssetStep2ParentPrevFuncLocDesc, inputCreateAssetStep2ParentPrevFuncLocPart1)

//ROW1
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2ParentMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "Functional Location" }));

oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep2ParentFuncLocPart1);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    hAlign: sap.ui.commons.layout.HAlign.Center,
    colSpan: 1,
    rowSpan: 2
});

oCell.addContent(inputCreateAssetStep2ParentFuncLocPart2);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep2ParentFuncLocPart3);
oRow.addCell(oCell);

//ROW2
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2ParentMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});

oCell.addContent(new sap.m.Label({ text: "Description" }));
oRow.addCell(oCell);

//ROW3
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2ParentMatrix.addRow(oRow);

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
oCreateAssetStep2ParentMatrix.addRow(oRow);

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


var formCreateAssetStep2Parent = new sap.m.Dialog("form_CreateAssetStep2Parent", {
    subHeader: new sap.m.Bar({
        contentMiddle: [new sap.m.Label("CreateAssetStep2ParentfuncLocHeader", {
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
                currentAssetRecord.zinsLocDesc1 = inputCreateAssetStep2ParentFuncLocPart1.getValue();
                currentAssetRecord.zinsLocDesc2 = inputCreateAssetStep2ParentFuncLocPart2.getValue();
                currentAssetRecord.zinsLocDesc3 = inputCreateAssetStep2ParentFuncLocPart3.getValue();
                formCreateAssetStep2Parent.close();
            }]
        }),
					new sap.m.Button({
					    text: "Cancel",
					    icon: "sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [function (oEvt) {
					        if (sap.ui.getCore().getElementById('formCreateAssetStep2Parent_Next').getVisible()) {
					            var msgCancel = "You have chosen to cancel part way through the creation process. ";
					            msgCancel += "Clicking YES will confirm you wish to cancel and return to the Home screen. ";
					            msgCancel += "Clicking NO will take you to the previous screen.";
					            CreateAssetStep2ParentConfirmCancel("", msgCancel)
					        }
					    }]
					}),
					new sap.m.Button("formCreateAssetStep2Parent_Next", {

					    text: "Next",
					    icon: "",
					    type: sap.m.ButtonType.Accept,
					    tap: [function (oEvt) {
					        currentAssetRecord.zinsLocDesc1 = inputCreateAssetStep2ParentFuncLocPart1.getValue();
					        currentAssetRecord.zinsLocDesc2 = inputCreateAssetStep2ParentFuncLocPart2.getValue();
					        currentAssetRecord.zinsLocDesc3 = inputCreateAssetStep2ParentFuncLocPart3.getValue();
					        CreateAssetStep2ParentValidateControls();
					        nextPressedCreateAssetStep2Parent = true;
					        validatePageCreateAssetStep2Parent();
					        ValidateFuncLocStep2Parent();
					    }
					    ]
					})

    ],
    content: [
oCreateAssetStep2ParentMatrix
    ],
    contentWidth: "1024px",
    contentHeight: "99%",
    beforeOpen: function () {
        nextPressedCreateAssetStep2Parent = false;
        populateCreateAssetStep2ParentControls()
    },

    afterOpen: function () {
        CreateAssetStep2ParentSetDefaultValues();
    },
    beforeClose: function () {
        try {

        } catch (err)
        { }
    }

})

function populateCreateAssetStep2ParentControls() {
    var SQLStatement = "";

    sap.ui.getCore().getElementById("CreateAssetStep2ParentFilter_PlantGroup").destroyItems();
    sap.ui.getCore().getElementById("CreateAssetStep2ParentFilter_PlantGroup").addItem(
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
                                    .getElementById("CreateAssetStep2ParentFilter_PlantGroup")
                                    .addItem(new sap.ui.core.Item({
                                        key: item.ZPLGRP,
                                        text: item.ZPLGDESC
                                    }))
                        }
                        if ((action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY)
				&& currentAssetRecord.plantGroupCodeZplgrp != null) {
                            sap.ui.getCore().getElementById("CreateAssetStep2ParentFilter_PlantGroup")
                                    .setSelectedKey(currentAssetRecord.plantGroupCodeZplgrp);
                            setPlantGroupLongTextCreateAssetStep2Parent();
                        }

                    }, function (error, statement) {
                        opMessage("Error: " + error.message + " when processing " + statement);
                    })


}

function CreateAssetStep2ParentValidateControls() {

    var subTitleString = getFunctionalLocationString()
    if ((action == recordAction.EDIT || action == recordAction.COPY)) {
        subTitleString = subTitleString + "    Original FL: " + currentAssetRecord.originalFuncLocStringZINSTLOCN
    }

    sap.ui.getCore().getElementById("CreateAssetStep2ParentfuncLocHeader").setText(subTitleString);
    if ((!sap.ui.getCore().getElementById("CreateAssetStep2ParentFilter_PlantGroup").getSelectedItem()) || sap.ui.getCore().getElementById("CreateAssetStep2ParentFilter_PlantGroup").getSelectedItem().getKey() == "NOTSELECTED") {
        sap.ui.getCore().getElementById("formCreateAssetStep2Parent_Next").setEnabled(false);
       
    }
    else {
       sap.ui.getCore().getElementById("formCreateAssetStep2Parent_Next").setEnabled(true);
    }
   
}

function validatePageCreateAssetStep2Parent() {
    if (inputCreateAssetStep2ParentFuncLocPart2.getValue() == "") {
        pageisValid = false;
        //document.getElementById("inputCreateAsset_FuncLocPart2").style.backgroundColor = "red";
        inputCreateAssetStep2Parent_FuncLocPart2.style.backgroundColor = "red";
    }
    else {
        pageisValid = true;
        //document.getElementById("inputCreateAsset_FuncLocPart2").style.backgroundColor = "";
        inputCreateAssetStep2Parent_FuncLocPart2.style.backgroundColor = "red";
    }
    if (pageisValid) {
        if (pageisValid) {
            formCreateAssetStep3.open()
        }
    }
}

function CreateAssetStep2ParentConfirmCancel(title, msg) {

    sap.m.MessageBox.show(msg, {
        icon: sap.m.MessageBox.Icon.WARNING,
        title: title,
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        onClose: function (oAction) {

            if (oAction == "YES") {

                formCreateAssetStep2Parent.close();
                formCreateAsset.close();

            }
        }
    }
           );
}

function CreateAssetStep2ParentSetDefaultValues() {

    if (currentAssetRecord.functionTypeZNCDESC != null) {
        inputCreateAssetStep2ParentFuncLocPart1.setValue(currentAssetRecord.functionTypeZNCDESC);
    }

    if (currentAssetRecord.zinsLocDesc2 != null) {
        inputCreateAssetStep2ParentFuncLocPart2.setValue(currentAssetRecord.zinsLocDesc2);
    }
    else {
        inputCreateAssetStep2ParentFuncLocPart2.setValue("-");
    }

    if (currentAssetRecord.zinsLocDesc3 != null) {
        inputCreateAssetStep2ParentFuncLocPart3.setValue(currentAssetRecord.zinsLocDesc3);
    }

    if (action == recordAction.EDIT || action == recordAction.AFTERDECOM) {
        inputCreateAssetStep2ParentPrevFuncLocPart1.setValue(currentAssetRecord.originalZinsLocDesc)
        labelCreateAssetStep2ParentPrevFuncLocDesc.setVisible(true);
        inputCreateAssetStep2ParentPrevFuncLocPart1.setVisible(true);
    }
    else {
        labelCreateAssetStep2ParentPrevFuncLocDesc.setVisible = false;
        inputCreateAssetStep2ParentPrevFuncLocPart1.setVisible = false;
    }

    var otitle = "";

    switch (action) {
        case recordAction.CREATE:
            otitle = "Create Asset - Parent Asset/Generic Plant Group - Step 2 of 4";
            break;
        case recordAction.EDIT:
            otitle = "Edit Asset - Parent Asset/Generic Plant Group - Step 2 of 4";
            break;
        case recordAction.AFTERDECOM:
            otitle = "Create Asset - Parent Asset/Generic Plant Group - Step 2 of 4";
            break;
        case recordAction.COPY:
            otitle = "Copy Asset - Parent Asset/Generic Plant Group - Step 2 of 4";
            break;
        default:
    }

    formCreateAssetStep2Parent.setTitle(otitle);
    CreateAssetStep2ParentValidateControls();
}



function setPlantGroupLongTextCreateAssetStep2Parent() {
    var sqlstatement = "select distinct ZPLGDEF1 || ' ' || ZPLGDEF2 AS ZPLGDEF from PlantGroupCodes where  ZPLGRP =";
    sqlstatement += "'" + currentAssetRecord.plantGroupCodeZplgrp + "'";
    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        if (rowsArray.length > 0) {
                            sap.ui.getCore().getElementById("CreateAssetStep2Parentinput_Comments").setValue(rowsArray[0].ZPLGDEF);
                        }
                        else {
                            sap.ui.getCore().getElementById("CreateAssetStep2Parentinput_Comments").setValue("");
                        }
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }

            );
}


function OnPlantGroupSelectedCreateAssetStep2Parent() {
    if (sap.ui.getCore().getElementById("CreateAssetStep2ParentFilter_PlantGroup").getSelectedItem().getKey() != "NOTSELECTED") {
        currentAssetRecord.plantGroupCodeZplgrp = sap.ui.getCore().getElementById("CreateAssetStep2ParentFilter_PlantGroup").getSelectedKey();
        currentAssetRecord.plantGroupDescriptionZPLGDESC = sap.ui.getCore().getElementById("CreateAssetStep2ParentFilter_PlantGroup").getSelectedItem().getText();

        setPlantGroupLongTextCreateAssetStep2Parent()
        getPlantGroupAndProcessGroupCode(currentAssetRecord.plantGroupCodeZplgrp, currentAssetRecord.businessUnit, function () {
            GetSystemCodefromAssetCaptureCategory(currentAssetRecord.assetTypeCodeZATCODE, currentAssetRecord.zascatAssetCategory, function () {
                if (action != recordAction.AFTERDECOM) {
                    if (currentAssetRecord.zascatAssetCategory == "A")//parent Asset
                    {
                        //generateNextPlantSystemItemNumber(function (newSystemCodeNumber) {
                            //currentAssetRecord.SystemCodeNumber = newSystemCodeNumber
                       // });
                    }
                    //generateNextItemID(function () {
                        CreateAssetStep2ParentValidateControls();
                    //});

                }
                else {
                    CreateAssetStep2ParentValidateControls();
                }
            });
        });
    }
    else {
        currentAssetRecord.plantGroupCodeZplgrp = null;

    }
}
function calculateRemainingCharacterCountCreateAssetStep2Parent() {
    var a = inputCreateAssetStep2ParentFuncLocPart1.getValue().length + 1;
    var b = inputCreateAssetStep2ParentFuncLocPart2.getValue().length + 1;
    var c = inputCreateAssetStep2ParentFuncLocPart3.getValue().length;
    var d = 40 - (a + b);

    if (d <= 0) {
        d = 0;
        inputCreateAssetStep2ParentFuncLocPart2.setEnabled(false)
        inputCreateAssetStep2ParentFuncLocPart3.setEnabled(false)
    }
    else {
        inputCreateAssetStep2ParentFuncLocPart2.setEnabled(true)
        inputCreateAssetStep2ParentFuncLocPart3.setEnabled(true)
    }
    e = 40 - (a + b + c);
    if (e < 0) {
        e = 0;
        var origVal = inputCreateAssetStep2ParentFuncLocPart3.getValue();
        inputCreateAssetStep2ParentFuncLocPart3.setValue(origVal.substr(0, d));
    }
    charactersRemainingLabelCreateAssetStep2Parent.setText("Characters remaining:" + e);
    if (inputCreateAssetStep2ParentFuncLocPart2.getValue() == "" && nextPressedCreateAssetStep2Parent == true) {
        document.getElementById("inputCreateAssetStep2Parent_FuncLocPart2").style.backgroundColor = "red";
    }
    else {
        document.getElementById("inputCreateAssetStep2Parent_FuncLocPart2").style.backgroundColor = "";
    }
}
function ValidateFuncLocStep2Parent(){
	var a=inputCreateAssetStep2ParentFuncLocPart2.getValue().length;
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