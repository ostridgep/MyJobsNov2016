var oEquipTypeFuncSelectionMatrix = new sap.ui.commons.layout.MatrixLayout({
    layoutFixed: true,
    columns: 1,
    width: '700px'
});


var EquipTypeFuncSelectionFilterCombi = new sap.m.Select('EquipTypeFuncSelection_FilterCombi', {
    width: "600px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: '--Select--'
    })],
    change: function () { onFilterCombiChangeEquipTypeFuncSelection() }

});

oEquipTypeFuncSelectionMatrix.createRow(new sap.m.Label({ text: "The Equipment Type and Equipment Function are not a known combination" }));
oEquipTypeFuncSelectionMatrix.createRow(new sap.m.Label({ text: " " }));
oEquipTypeFuncSelectionMatrix.createRow(new sap.m.Label("EquipTypeFuncSelection_ChosenCombi", { text: "" }));
oEquipTypeFuncSelectionMatrix.createRow(new sap.m.Label({ text: " " }));
		
var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ });
oCell.addContent(new sap.ui.commons.HorizontalDivider());
oEquipTypeFuncSelectionMatrix.createRow(oCell);

oEquipTypeFuncSelectionMatrix.createRow(new sap.m.Label({ text: "The known Equip Type/Equip Function combinations are:" }));

oEquipTypeFuncSelectionMatrix.createRow(EquipTypeFuncSelectionFilterCombi);
oEquipTypeFuncSelectionMatrix.createRow(new sap.m.Label({ text: " " }));
oEquipTypeFuncSelectionMatrix.createRow(new sap.m.Label({ text: " " }));
oEquipTypeFuncSelectionMatrix.createRow(new sap.m.Label({ design: sap.m.LabelDesign.Bold, text: "You may choose a valid combination or continue with your original selection" }));



function EquipTypeFuncSelectionpopulateCombiFilter() {
    sap.ui.getCore().getElementById("EquipTypeFuncSelection_ChosenCombi").setText(
        "Chosen Combination " + currentAssetRecord.equipmentTypeDescriptionZOTDESC + "/" + currentAssetRecord.functionTypeZNCDESC);

    var SQLStatement = "";

    SQLStatement = "select  distinct ZOTDESC, ZNCDESC, c.ZZEQPT_EGI,c.ZZFL_NC from EGIandNameCodeMapping c  " +
 "inner join EquipmentTypeCode e on c.ZZEQPT_EGI = e.ZZEQPT_EGI " +
    "inner join FunctiontypeCodes f on e.ZATCODE = f.ZATCODE  AND c.ZZFL_NC = f.ZZFL_NC " +
    " where c.ZZW_WW='" + currentAssetRecord.businessUnit + "' AND ( c.ZZEQPT_EGI = '" +
    currentAssetRecord.equipmentTypeCodeZZEQPT_EGI + "' or c.ZZFL_NC='" + currentAssetRecord.zzfl_nc + "')";

    html5sql.process(SQLStatement, function (transaction,
            results, rowsArray) {

        for (var n = 0; n < rowsArray.length; n++) {
            item = rowsArray[n];
            sap.ui.getCore().getElementById(
                    "EquipTypeFuncSelection_FilterCombi").addItem(
                    new sap.ui.core.Item({
                        key: item.ZZEQPT_EGI + "/" + item.ZZFL_NC,
                        text: item.ZOTDESC + "/" + item.ZNCDESC
                    }))
        }

    }, function (error, statement) {
    })

}


var formEquipTypeFuncSelection = new sap.m.Dialog("form_EquipTypeFuncSelection", {

    
    horizontalScrolling: true,
    verticalScrolling: true,
    modal: true,
    contentWidth: "1em",

    buttons: [
        new sap.m.Button({

            text: "Back",
            type: sap.m.ButtonType.Accept,
            tap: [function (oEvt) {
                formEquipTypeFuncSelection.close();
            }]
        }),
					new sap.m.Button({
					    text: "Cancel",
					    icon: "sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [function (oEvt) {
					        if (sap.ui.getCore().getElementById('formEquipTypeFuncSelection_Next').getVisible()) {
					            var msgCancel = "You have chosen to cancel part way through the creation process. ";
					            msgCancel += "Clicking OK will confirm you wish to cancel and return to the asset list. ";
					            msgCancel += "Clicking Abort will take you to the previous screen.";
					            EquipTypeFuncSelectionConfirmCancel("Close Forms", msgCancel)
					        }
					    }]
					}),
					new sap.m.Button("formEquipTypeFuncSelection_Next", {

					    text: "Next",
					    icon: "",
					    type: sap.m.ButtonType.Accept,
					    tap: [function (oEvt) {
					        chooseStep2Type(2)
					    }
					    ]
					})

    ],
    content: [
oEquipTypeFuncSelectionMatrix
    ],
    contentWidth: "1024px",
    contentHeight: "99%",
    beforeOpen: function () { },

    afterOpen: function () {
        EquipTypeFuncSelectionpopulateCombiFilter();
    },
    beforeClose: function () {
        try {

        } catch (err)
        { }
    }

})


function EquipTypeFuncSelectionConfirmCancel(title, msg) {

    sap.m.MessageBox.show(msg, {
        icon: sap.m.MessageBox.Icon.WARNING,
        title: title,
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        onClose: function (oAction) {

            if (oAction == "YES") {
                formEquipTypeFuncSelection.close();
            }
        }
    }
           );
}

function onFilterCombiChangeEquipTypeFuncSelection()
{
 var thekey=   sap.ui.getCore().getElementById("EquipTypeFuncSelection_FilterCombi").getSelectedItem().getKey();
 currentAssetRecord.equipmentTypeCodeZZEQPT_EGI = thekey.split('/')[0];
 currentAssetRecord.zzfl_nc = _newZZFL_NC = thekey.split('/')[1];
}