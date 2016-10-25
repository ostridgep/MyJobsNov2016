var formSearchAssetEditUpdate = new sap.m.Dialog("dlgSearchAssetEditUpdate", {
    title: "Search Assets",
    modal: true,
    contentWidth: "1em",
    buttons: [

              new sap.m.Button("ButtonSelect_AssetListEditUpdate", {
                  enabled: false,
                  text: "Select",
                  type: sap.m.ButtonType.Accept,
                  tap: [function (oEvt) {
                      inputChooseAssetEditOrDecom.setValue(currentAssetRecord.plantGroupDescriptionZPLGDESC);
                      labelFuncLocStringEditOrDecom.setText(currentAssetRecord.funcLocStringZINSTLOCN);
                      formEditOrDecom.open();
                      ValidateControlsEditOrDecom();
                      formSearchAssetEditUpdate.close();
                  }]
              }),
                                  new sap.m.Button( {
                                      
                                      text: "Search",
                                      type: sap.m.ButtonType.Accept,
                                      tap: [function (oEvt) {

                                          buildAssetTableRowsAssetListEditUpdate()
                                      }]
                                  }),
                                  new sap.m.Button({
                                      text: "Cancel",
                                      type: sap.m.ButtonType.Reject,
                                      tap: [function (oEvt) {

                                          formSearchAssetEditUpdate.close()
                                      }]
                                  })
    ],
    content: [assetSearchPanelAssetListEditUpdate
    ],
    beforeOpen: function () {
       // sap.ui.getCore().getElementById('AssetSearchResultsAssetListEditUpdate').destroyItems();
        //populateSiteFilter();

       

        populateHelpModelAssetListEditUpdate();
    },
    contentWidth: "85%",
    contentHeight: "85%",
}).addStyleClass("sapUiSizeCompact");

var oMatrixEditOrDecom = new sap.ui.commons.layout.MatrixLayout({
    id: "MatrixEditOrDecom",
    layoutFixed: true,
    columns: 3,
    width: '790px',
    widths: ['120px', '120px', '550px']
});

var space = new sap.ui.commons.layout.AbsoluteLayout({
    width: "10px",
    height: "0px"
});

var labelFuncLocStringEditOrDecom = new sap.m.Label({
    text: ""
})

var labelChooseAssetEditOrDecom = new sap.m.Label({
    text: "Choose Asset"
})

var labelChooseAssetEditOrDecom1 = new sap.m.Label({
    text: "Choose Asset"
})


var buttonChooseAssetEditOrDecom = new sap.m.Button(
		"buttonChooseAsset_EditOrDecom", {
		    text: "Select Asset",
		    enabled: true,
		    type: sap.m.ButtonType.Accept,
		    tap: [function (oEvt) {
		        formSearchAssetEditUpdate.open()
		    }]
		})

var inputChooseAssetEditOrDecom = new sap.m.Input("inputChooseAsset_EditOrDecom", {
 //   width: "450px",
    type: sap.m.InputType.Input,
    enabled: false
});



//oMatrixEditOrDecom.createRow(new sap.m.Label({ text: "1" }), new sap.m.Label({ text: "2" }), new sap.m.Label({ text: "3" }),
//		new sap.m.Label({ text: "4" }), new sap.m.Label({ text: "5" }));

// oCreateAssetMatrix.createRow(createAssetSiteCell1,createAssetSiteCell2,new
// sap.m.Label({text : ""}),createAssetSiteCell3,createAssetSiteCell4);
oMatrixEditOrDecom.createRow(new sap.m.Label({ text: " " }));
oMatrixEditOrDecom.createRow(new sap.m.Label({ text: "" }), new sap.m.Label({ text: "" }), labelFuncLocStringEditOrDecom);
oMatrixEditOrDecom.createRow(new sap.m.Label({ text: " " }));

oMatrixEditOrDecom.createRow(labelChooseAssetEditOrDecom, buttonChooseAssetEditOrDecom, inputChooseAssetEditOrDecom);

var formEditOrDecom = new sap.m.Dialog("form_EditOrDecom", {
    title: "Edit or Decommission Asset",
    subHeader: new sap.m.Bar({
        contentMiddle: [new sap.m.Label({text:"Step 1 of 4"})],
    }),
    horizontalScrolling: true,
    verticalScrolling: true,
    modal: true,
    contentWidth: "1em",

    buttons: [
			new sap.m.Button({
			    text: "Cancel",
			    icon: "sap-icon://sys-cancel",
			    type: sap.m.ButtonType.Reject,
			    tap: [function (oEvt) {
			        formEditOrDecom.close()
			        getAssets();
			    }
			    ]
			}), new sap.m.Button("buttonDecom_EditOrDecom", {
                enabled:false,
			    text: "Decom",
			    type: sap.m.ButtonType.Accept,
			    tap: [function (oEvt) {
			        formDecomAsset.open();
			        
			    }]
			}),
            , new sap.m.Button("buttonEdit_EditOrDecom", {
                enabled: false,
                text: "Edit",
                type: sap.m.ButtonType.Accept,
                tap: [function (oEvt) {
                    action = recordAction.EDIT;
                        labelSite.setVisible(false);
                        InputCreateAssetSite.setVisible(false);
                    formCreateAsset.open();
                }]
            })

    ],
    content: [oMatrixEditOrDecom],
    contentWidth: "860px",
    contentHeight: "200px",
    beforeOpen: function () {
    },
    afterOpen: function () {
        
    },
    beforeClose: function () {
    }
})

function ValidateControlsEditOrDecom() {
    if (inputChooseAssetEditOrDecom.getValue() == "") {

        sap.ui.getCore().getElementById("buttonDecom_EditOrDecom").setEnabled(false);
        sap.ui.getCore().getElementById("buttonEdit_EditOrDecom").setEnabled(false);
    }
    else {
        sap.ui.getCore().getElementById("buttonDecom_EditOrDecom").setEnabled(true);
        sap.ui.getCore().getElementById("buttonEdit_EditOrDecom").setEnabled(true);
    }
}