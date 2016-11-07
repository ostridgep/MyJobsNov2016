
var oCreateAssetStep2GenericSiteMatrix = new sap.ui.commons.layout.MatrixLayout({
    id: "CreateAssetStep2GenericSiteMatrix",
    layoutFixed: true,
    columns: 5,
    width: '950px',
    widths: ['160px', '360px', '60px', '350px', '1px']
});

var space = new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "0px" });

//oCreateAssetStep2GenericSiteMatrix.createRow(new sap.m.Label({ text: "1" }), new sap.m.Label({ text: "2" }), new sap.m.Label({ text: "3" }),
//		new sap.m.Label({ text: "4" }), new sap.m.Label({ text: "5" }));



var CreateAssetStep2GenericSiteLabelPlantGroup = new sap.m.Label({ text: "Plant Group" })

var CreateAssetStep2GenericSiteInputPlantGroup = new sap.m.Input('CreateAssetStep2GenericSiteInput_PlantGroup', {
    width: "350px",
    enabled: false,
});

oCreateAssetStep2GenericSiteMatrix.createRow(
		CreateAssetStep2GenericSiteLabelPlantGroup, CreateAssetStep2GenericSiteInputPlantGroup);

//FuncLocBlock
var charactersRemainingLabelCreateAssetStep2GenericSite = new sap.m.Label({ text: "" })

var oCellSpace = new sap.ui.commons.layout.MatrixLayoutCell({ });
oCellSpace.addContent(new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "30px" }));

oCreateAssetStep2GenericSiteMatrix.createRow(oCellSpace, new sap.m.Label({ text: " " }), new sap.m.Label({ text: " " }),
		 charactersRemainingLabelCreateAssetStep2GenericSite);

var inputCreateAssetStep2GenericSiteFuncLocPart1 = new sap.m.Input(
		{
		    width: "350px",
		    type: sap.m.InputType.Input,
		    enabled: false
		});

var inputCreateAssetStep2GenericSiteFuncLocPart2 = new sap.m.Input(
		{
		    textAlign: sap.ui.core.TextAlign.Center,
		    width: "50px",
		    type: sap.m.InputType.Number,
		    maxLength:2,
		    enabled: true,
		    liveChange: [function (event) {
		    	
		        calculateRemainingCharacterCountCreateAssetStep2GenericSite();
		    }]
		});

var inputCreateAssetStep2GenericSiteFuncLocPart3 = new sap.m.Input(
		{
		    width: "300px",
		    type: sap.m.InputType.Input,
		    enabled: true,
		    liveChange: [function (event) {
		        calculateRemainingCharacterCountCreateAssetStep2GenericSite();
		    }]
		});


var labelCreateAssetStep2GenericSitePrevFuncLocDesc = new sap.m.Label({ visible: false, text: "Previous FL Description" })
var inputCreateAssetStep2GenericSitePrevFuncLocPart1 = new sap.m.Input(
		{
		    width: "350px",
		    type: sap.m.InputType.Input,
		    enabled: false,
		    visible: false
		});

oCreateAssetStep2GenericSiteMatrix.createRow(labelCreateAssetStep2GenericSitePrevFuncLocDesc, inputCreateAssetStep2GenericSitePrevFuncLocPart1)

//ROW1
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2GenericSiteMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "Functional Location" }));

oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep2GenericSiteFuncLocPart1);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    hAlign: sap.ui.commons.layout.HAlign.Center,
    colSpan: 1,
    rowSpan: 2
});

oCell.addContent(inputCreateAssetStep2GenericSiteFuncLocPart2);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetStep2GenericSiteFuncLocPart3);
oRow.addCell(oCell);

//ROW2
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2GenericSiteMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});

oCell.addContent(new sap.m.Label({ text: "Description" }));
oRow.addCell(oCell);

//ROW3
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetStep2GenericSiteMatrix.addRow(oRow);

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
oCreateAssetStep2GenericSiteMatrix.addRow(oRow);

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



var formCreateAssetStep2GenericSite = new sap.m.Dialog("form_CreateAssetStep2GenericSite", {
    subHeader: new sap.m.Bar({
        contentMiddle: [new sap.m.Label("CreateAssetStep2GenericSitefuncLocHeader", {
            text: ""
        })],
    }),
    horizontalScrolling: true,
    verticalScrolling: true,
    modal: true,
    contentWidth: "1em",

    buttons: [
        new sap.m.Button( {

            text: "Back",
            type: sap.m.ButtonType.Accept,
            tap: [function (oEvt) {
                currentAssetRecord.zinsLocDesc1 = inputCreateAssetStep2GenericSiteFuncLocPart1.getValue();
                currentAssetRecord.zinsLocDesc2 = inputCreateAssetStep2GenericSiteFuncLocPart2.getValue();
                currentAssetRecord.zinsLocDesc3 = inputCreateAssetStep2GenericSiteFuncLocPart3.getValue();
                formCreateAssetStep2GenericSite.close();
            }]
        }),
					new sap.m.Button({
					    text: "Cancel",
					    icon: "sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [function (oEvt) {
					        if (sap.ui.getCore().getElementById('formCreateAssetStep2GenericSite_Next').getVisible()) {
					            var msgCancel = "You have chosen to cancel part way through the creation process. ";
					            msgCancel += "Clicking YES will confirm you wish to cancel and return to the asset list. ";
					            msgCancel += "Clicking NO will take you to the previous screen.";
					            CreateAssetStep2GenericSiteConfirmCancel("", msgCancel)
					        }
					    }]
					}),
					new sap.m.Button("formCreateAssetStep2GenericSite_Next", {

					    text: "Next",
					    icon: "",
					    type: sap.m.ButtonType.Accept,
					    tap: [function (oEvt) {
					        currentAssetRecord.zinsLocDesc1 = inputCreateAssetStep2GenericSiteFuncLocPart1.getValue();
					        currentAssetRecord.zinsLocDesc2 = inputCreateAssetStep2GenericSiteFuncLocPart2.getValue();
					        currentAssetRecord.zinsLocDesc3 = inputCreateAssetStep2GenericSiteFuncLocPart3.getValue();
					        formCreateAssetStep3.open()
					        ValidateFuncLocStep2Generic();
					    }
					    ]
					})

    ],
    content: [
oCreateAssetStep2GenericSiteMatrix
    ],
    contentWidth: "1024px",
    contentHeight: "99%",
    beforeOpen: function () {  },

    afterOpen: function () {
        CreateAssetStep2GenericSiteSetDefaultValues();
       
    },
    beforeClose: function () {
        try {

        } catch (err)
        { }
    }

})


function CreateAssetStep2GenericSiteValidateControls() {

    var subTitleString = getFunctionalLocationString()
    if (action == recordAction.EDIT || action == recordAction.COPY) {
        subTitleString = subTitleString + "    Original FL: " + currentAssetRecord.originalFuncLocStringZINSTLOCN
    }

    sap.ui.getCore().getElementById("CreateAssetStep2GenericSitefuncLocHeader").setText(subTitleString);

}


function CreateAssetStep2GenericSiteConfirmCancel(title, msg) {

    sap.m.MessageBox.show(msg, {
        icon: sap.m.MessageBox.Icon.WARNING,
        title: title,
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        onClose: function (oAction) {

            if (oAction == "YES") {

                currentAssetRecord.zinsLocDesc1 = null;
                currentAssetRecord.zinsLocDesc2 = null;
                currentAssetRecord.zinsLocDesc3 = null;
                formCreateAsset.close();
                formCreateAssetStep2GenericSite.close();
                formCreateAssetStep2Parent.close();
                formCreateAssetStep2Support.close();
                formCreateAssetStep2Unknown.close();
                formEquipTypeFuncSelection.close();
                formCreateAssetStep3.close();
                formCreateAssetStep3NA.close();
                formCreateAssetStep4.close();
                formCreateAssetStep4NA.close();
                //formCreateAssetReview.close();

            }
        }
    }
           );
}

function CreateAssetStep2GenericSiteSetDefaultValues()
{
        var otitle = "";

        switch (action) {
            case recordAction.CREATE:
                otitle = "Create Asset Generic Site - Step 2 of 4";
                break;
            case recordAction.EDIT:
                otitle = "Edit Asset Generic Site - Step 2 of 4";
                break;
            case recordAction.AFTERDECOM:
                otitle = "Create Asset Generic Site - Step 2 of 4";
                break;
            case recordAction.COPY:
                otitle = "Copy Asset Generic Site - Step 2 of 4";
                break;
            default:

        }

        formCreateAssetStep2GenericSite.setTitle(otitle);

        inputCreateAssetStep2GenericSiteFuncLocPart1.setValue(currentAssetRecord.functionTypeZNCDESC);
        inputCreateAssetStep2GenericSiteFuncLocPart2.setValue("-");
        getPlantGroup(currentAssetRecord.equipmentTypeCodeZZEQPT_EGI, currentAssetRecord.zzfl_nc, currentAssetRecord.businessUnit, currentAssetRecord.zascatAssetCategory, function () {
            getPlantGroupAndProcessGroupCode(currentAssetRecord.plantGroupCodeZplgrp, currentAssetRecord.businessUnit, function () {
            CreateAssetStep2GenericSiteInputPlantGroup.setValue(currentAssetRecord.plantGroupDescriptionZPLGDESC);
            GetSystemCodefromAssetCaptureCategory(currentAssetRecord.assetTypeCodeZATCODE, currentAssetRecord.zascatAssetCategory, function () {
                currentAssetRecord.SystemCodeNumber = "001";
                //generateNextItemID(function () {
                    CreateAssetStep2GenericSiteValidateControls();
                //});
               
            })
          
            })
        })
}

function calculateRemainingCharacterCountCreateAssetStep2GenericSite() {
    var a = inputCreateAssetStep2GenericSiteFuncLocPart1.getValue().length + 1;
    var b = inputCreateAssetStep2GenericSiteFuncLocPart2.getValue().length + 1;
    var c = inputCreateAssetStep2GenericSiteFuncLocPart3.getValue().length;
    var d = 40 - (a + b);

    if (d <= 0) {
        d = 0;
        inputCreateAssetStep2GenericSiteFuncLocPart2.setEnabled(false)
        inputCreateAssetStep2GenericSiteFuncLocPart3.setEnabled(false)
    }
    else {
        inputCreateAssetStep2GenericSiteFuncLocPart2.setEnabled(true)
        inputCreateAssetStep2GenericSiteFuncLocPart3.setEnabled(true)
    }
    e = 40 - (a + b + c);
    if (e < 0) {
        e = 0;
        var origVal = inputCreateAssetStep2GenericSiteFuncLocPart3.getValue();
        inputCreateAssetStep2GenericSiteFuncLocPart3.setValue(origVal.substr(0, d));
    }
    charactersRemainingLabelCreateAssetStep2GenericSite.setText("Characters remaining:" + e);
}

function ValidateFuncLocStep2Generic(){
	var a=inputCreateAssetStep2GenericSiteFuncLocPart2.getValue().length;
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