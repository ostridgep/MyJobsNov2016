
var recordAction = {
    CREATE: 1,
    EDIT: 2,
    AFTERDECOM: 3,
    COPY: 4,
    NOA: 5
}
var action = recordAction.CREATE;
var currentAssetRecord = new AssetRecord();
var nextPressed = false;
var originalModelValue = "";
var makeExists = false;
var modelExists = false;
var oModelInputMakeAssetList = new sap.ui.model.json.JSONModel();
var aDataInputMakeAssetList = [];

var oModelInputModelAssetList = new sap.ui.model.json.JSONModel();
var aDataInputModelAssetList = [];

var oModelHelpMakeAssetList = new sap.ui.model.json.JSONModel();
var aDataHelpMakeAssetList;

var oModelHelpModelAssetList = new sap.ui.model.json.JSONModel();
var aDataHelpModelAssetList;
var oModelCreateAssetSite = new sap.ui.model.json.JSONModel();
var aDataCreateAssetSite;

var oModelCreateAssetSiteHelp = new sap.ui.model.json.JSONModel();
var aDataCreateAssetSiteHelp;

var itemTemplateCreateAssetSite = new sap.m.StandardListItem({
    title: "{desc}",
    active: true
})


var oSelectDialogCreateAssetSite = new sap.m.SelectDialog("SiteDialogCreateAssetSite", {
    contentWidth: "600px",
    title: "Find Site",
    noDataText: "No Sites Found",
    search: [function (event) {
        handleSearchCreateAssetSite(event)
    }],
    confirm: [function (event) {
        handleValueHelpCloseCreateAssetSite(event)
    }],
    cancel: [function (event) {
        handleValueHelpCloseCreateAssetSite(event)
    }]
});

oSelectDialogCreateAssetSite.setModel(oModelCreateAssetSiteHelp);
oSelectDialogCreateAssetSite.bindAggregation("items", "/modelData", itemTemplateCreateAssetSite);

var oItemTemplateCreateAssetSite = new sap.ui.core.ListItem();
oItemTemplateCreateAssetSite.bindProperty("text", "desc");
oItemTemplateCreateAssetSite.bindProperty("key", "site");

var InputCreateAssetSite = new sap.m.Input('Input_CreateAssetSite', {
    liveChange: function (event) {
        handleCreateAssetSiteLiveChange(event);
    },
    placeholder: "Type three characters to start searching...",
    suggestionItemSelected: function (oControlEvent) {
        onCreateAssetSiteChanged(false, oControlEvent.getParameter("selectedItem").mProperties.key.toUpperCase())
    },
    showSuggestion: true,
    startSuggestion: 3,
    showValueHelp: true,
    valueHelpRequest: function () {
        oSelectDialogCreateAssetSite.open(sap.ui.getCore().getElementById("Input_CreateAssetSite").getValue());

        var oDialogDOM = oSelectDialogCreateAssetSite.$();
        var oSearchFieldDOM = oDialogDOM.find('.sapMSF');
        var oSFID = oSearchFieldDOM[0].id;
        var oSearchField = sap.ui.getCore().byId(oSFID);
        oSearchField.fireSearch();
    }
});

InputCreateAssetSite.bindAggregation("suggestionItems", "/modelData", oItemTemplateCreateAssetSite);

function populateCreateAssetSiteHelpModel() {
    var SQLStatement = "select  site,site  || ' - ' || desc as desc from AssetSites  order by site"
    html5sql.process(SQLStatement,
    function (transaction, results, rowsArray) {
        oModelCreateAssetSiteHelp.setSizeLimit(10000);
        aDataCreateAssetSiteHelp = rowsArray;
        oModelCreateAssetSiteHelp.setData({
            modelData: aDataCreateAssetSiteHelp
        });

    }, function (error, statement) { })
}

function handleSearchCreateAssetSite(evt) {
    var sValue = evt.getParameter("value");
    var oFilter = new sap.ui.model.Filter(
        "desc",
        sap.ui.model.FilterOperator.Contains, sValue
    );
    evt.getSource().getBinding("items").filter([oFilter]);
}

function handleValueHelpCloseCreateAssetSite(evt) {
    var oSelectedItem = evt.getParameter("selectedItem");
    if (oSelectedItem) {
        sap.ui.getCore().getElementById("Input_CreateAssetSite").setValue(oSelectedItem.getTitle());
        evt.getSource().getBinding("items").filter([]);
        onCreateAssetSiteChanged(false, oSelectedItem.getTitle().substring(0, 6))
    }

}

function handleCreateAssetSiteLiveChange(evt) {

    if (evt.getParameter("newValue").length > 2) {
        var SQLStatement = "select site,site  || ' - ' || desc as desc from AssetSites WHERE site  || ' - ' || desc like '%" + evt.getParameter("newValue") + "%'    order by site"
        html5sql.process(SQLStatement,
        function (transaction, results, rowsArray) {
            oModelCreateAssetSite.setSizeLimit(10000);
            aDataCreateAssetSite = rowsArray;
            oModelCreateAssetSite.setData({
                modelData: aDataCreateAssetSite
            });

            sap.ui.getCore().getElementById("Input_CreateAssetSite").setModel(oModelCreateAssetSite);
            InputCreateAssetSite.bindAggregation("suggestionItems", "/modelData", oItemTemplateCreateAssetSite);

            sap.ui.getCore().getElementById("Input_CreateAssetSite").setFilterFunction(function (sValue, oItem) {
                return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
            });
        }, function (error, statement) { })
    }
}

function populateSiteFilterCreateAsset() {

    var SQLStatement = "";

    sap.ui.getCore().getElementById("Filter_SiteCreateAsset").destroyItems();
    sap.ui.getCore().getElementById("Filter_SiteCreateAsset").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: 'Please Select'
			}))

    var ToOutput = "";
    SQLStatement = "select distinct site from AssetSites order by site"

    html5sql.process(SQLStatement, function (transaction, results, rowsArray) {

        for (var n = 0; n < rowsArray.length; n++) {
            item = rowsArray[n];
            sap.ui.getCore().getElementById("Filter_SiteCreateAsset").addItem(
					new sap.ui.core.Item({
					    key: item.ZSITE,
					    text: item.ZSITE
					}))
        }
    }, function (error, statement) {
    })
}
var labelSite = new sap.m.Label("labelSite",{
    text: "Site"
})

var itemTemplate = new sap.m.StandardListItem({
    title: "{manufacturer}",
    active: true
})
var oItemTemplate1 = new sap.ui.core.ListItem();
oItemTemplate1.bindProperty("text", "manufacturer");
oItemTemplate1.bindProperty("key", "manufacturer");

var oItemTemplate2 = new sap.ui.core.ListItem();
oItemTemplate2.bindProperty("text", "MODEL");
oItemTemplate2.bindProperty("key", "MODEL");

var itemTemplate4 = new sap.m.StandardListItem({
    title: "{MODEL}",
    active: true
})

var oSelectDialogMakeAssetList = new sap.m.SelectDialog("oSelectDialog_MakeAssetList", {
    contentWidth: "600px",
    title: "Find Make",
    noDataText: "No Makes Found",
    search: [function (event) {
        handleSearchMakeAssetList(event)
    }],
    confirm: [function (event) {
        handleValueHelpCloseInputMakeAssetList(event)
    }],
    cancel: [function (event) {
        handleValueHelpCloseInputMakeAssetList(event)
    }]
});

var oSelectDialogModelAssetList = new sap.m.SelectDialog("oSelectDialog_ModelAssetList", {
    contentWidth: "600px",
    title: "Find Model",
    noDataText: "No Models Found",
    search: [function (event) {
        handleSearchModelAssetList(event)
    }],
    confirm: [function (event) {
        handleValueHelpCloseInputModelAssetList(event)
    }],
    cancel: [function (event) {
        handleValueHelpCloseInputModelAssetList(event)
    }]
});


oSelectDialogMakeAssetList.setModel(oModelHelpMakeAssetList);
oSelectDialogMakeAssetList.bindAggregation("items", "/modelData", itemTemplate);

oSelectDialogModelAssetList.setModel(oModelHelpModelAssetList);
oSelectDialogModelAssetList.bindAggregation("items", "/modelData", itemTemplate4);


var InputMakeAssetList = new sap.m.Input('Input_MakeAssetList', {
    liveChange: function (event) {
        handleInputMakeAssetListLiveChange(event);
    },
    placeholder: "",
    showSuggestion: true,
    startSuggestion: 1,
    enabled: false,
    suggestionItemSelected: function (oControlEvent) {
        onCreateAssetMakeChanged(false, oControlEvent.getParameter("selectedItem").mProperties.text.toUpperCase())
    },
    showValueHelp: true,
    valueHelpRequest: function () {
        oSelectDialogMakeAssetList.open(sap.ui.getCore().getElementById("Input_MakeAssetList").getValue());

        var oDialogDOM = oSelectDialogMakeAssetList.$();
        var oSearchFieldDOM = oDialogDOM.find('.sapMSF');
        var oSFID = oSearchFieldDOM[0].id;
        var oSearchField = sap.ui.getCore().byId(oSFID);
        oSearchField.fireSearch();
    }
});

InputMakeAssetList.bindAggregation("suggestionItems", "/makeModelData", oItemTemplate1);


var InputModelAssetList = new sap.m.Input('Input_ModelAssetList', {
    placeholder: "",
    showSuggestion: true,
    startSuggestion: 0,
    width: "270px",
    enabled: false,
    suggestionItemSelected: function (oControlEvent) {
        onCreateAssetModelChanged(false, oControlEvent.getParameter("selectedItem").mProperties.text.toUpperCase())
    },
    showValueHelp: true,
    valueHelpRequest: function () {
        if (sap.ui.getCore().getElementById("Input_ModelAssetList").getValue() == "") {
            oSelectDialogModelAssetList.open(sap.ui.getCore().getElementById("Input_ModelAssetList").setValue(" "));
            oSelectDialogModelAssetList.open();
        }
        else {
            oSelectDialogModelAssetList.open(sap.ui.getCore().getElementById("Input_ModelAssetList").getValue());
        }

        var oDialogDOM = oSelectDialogModelAssetList.$();
        var oSearchFieldDOM = oDialogDOM.find('.sapMSF');
        var oSFID = oSearchFieldDOM[0].id;
        var oSearchField = sap.ui.getCore().byId(oSFID);
        oSearchField.fireSearch();
    }
});
InputModelAssetList.bindAggregation("suggestionItems", "/modelModelData", oItemTemplate2);


var oCreateAssetMatrix = new sap.ui.commons.layout.MatrixLayout({
    id: "MainMatrix",
    layoutFixed: true,
    columns: 5,
    width: '975px',
    widths: ['85px', '280px', '20px', '75px', '270px']
});

var space = new sap.ui.commons.layout.AbsoluteLayout({
    width: "10px",
    height: "0px"
});

var labelMake = new sap.m.Label({
    text: "Make"
})
var labelModel = new sap.m.Label({
    text: "Model"
})

var inputNewMake = new sap.m.Input("Input_NewMake", {
    maxLength: 30,
    width: "270px",
    type: sap.m.InputType.Input,
    enabled: false
});
var inputNewModel = new sap.m.Input("Input_NewModel", {
    maxLength: 30,
    width: "270px",
    type: sap.m.InputType.Input,
    enabled: false
});

var labelFunctionType = new sap.m.Label({
    text: "Function Type"
})
var inputEquipmentType = new sap.m.Input("createAssetInput_EquipmentType", {
    visible: true,
    width: "270px",
    type: sap.m.InputType.Input,
    enabled: false
});

var buttonSelectEquipmentType = new sap.m.Button(
		"createAssetButton_EquipmentType", {
		    text: "Select",
		    visible: true,
		    enabled: false,
		    type: sap.m.ButtonType.Accept,
		    tap: [function (oEvt) {

		        formEgiCodeSelection.open()
		    }]
		})

var createAssetEquipmentTypeCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1
    // ,backgroundDesign : sap.ui.commons.layout.BackgroundDesign.Border
});

var horizontalLayout = new sap.ui.layout.HorizontalLayout({
    content: [inputEquipmentType, new sap.ui.commons.layout.AbsoluteLayout({
        width: "10px",
        height: "0px"
    }), buttonSelectEquipmentType]
});

createAssetEquipmentTypeCell.addContent(horizontalLayout);

var textSelectEquipmentType = new sap.m.TextArea("text_SelectEquipmentType", {
    enabled: false,
    rows: 12,
    width: "270px"
})

var textSelectFunctionType = new sap.m.TextArea("text_SelectFunctionType", {
    enabled: false,
    rows: 12,
    width: "270px"
})
var SelectFunctionType = new sap.m.Select('createAssetFilter_FunctionType', {
    width: "270px",
    items: [],
    enabled: false,
    change: function (oControlEvent) {
        onCreateAssetFunctionTypeChanged();
    }
});

oCreateAssetMatrix.createRow(labelSite, InputCreateAssetSite)
oCreateAssetMatrix.createRow(labelMake, InputMakeAssetList, new sap.m.Label({
    text: ""
}), labelModel, InputModelAssetList);
oCreateAssetMatrix.createRow(new sap.m.Label({
    text: ""
}), inputNewMake, new sap.m.Label({
    text: ""
}), new sap.m.Label({
    text: ""
}), inputNewModel);

oCreateAssetMatrix.createRow(new sap.m.Label({
    text: "Equipment Type"
}), createAssetEquipmentTypeCell, new sap.m.Label({
    text: ""
}), labelFunctionType, SelectFunctionType);

oCreateAssetMatrix.createRow(new sap.m.Label({
    text: ""
}), textSelectEquipmentType, new sap.m.Label({
    text: ""
}), new sap.m.Label({
    text: ""
}), textSelectFunctionType);

//FuncLocBlock
var oCreateAssetFlBlockMatrix = new sap.ui.commons.layout.MatrixLayout({
    id: "oCreateAssetFlBlock_Matrix",
    visible: false,
    layoutFixed: true,
    columns: 4,
    width: '900px',
    widths: ['160px', '350px', '75px', '295px']
});
var charactersRemainingLabelCreateAsset = new sap.m.Label({ text: "" })

var oCellSpace = new sap.ui.commons.layout.MatrixLayoutCell({});
oCellSpace.addContent(new sap.ui.commons.layout.AbsoluteLayout({ width: "10px", height: "30px" }));

oCreateAssetFlBlockMatrix.createRow(oCellSpace, new sap.m.Label({ text: " " }), new sap.m.Label({ text: " " }),
         charactersRemainingLabelCreateAsset);

var inputCreateAssetFuncLocPart1 = new sap.m.Input(
        {

            type: sap.m.InputType.Input,
            enabled: false
        });

var inputCreateAssetFuncLocPart2 = new sap.m.Input(
        {
            id: "inputCreateAsset_FuncLocPart2",
            textAlign: sap.ui.core.TextAlign.Center,
            width: "50px",
            type: sap.m.InputType.Number,
            enabled: true,
            liveChange: [function (event) {

                calculateRemainingCharacterCountCreateAsset();
            }]
        });

var inputCreateAssetFuncLocPart3 = new sap.m.Input(
        {
            id: "inputCreateAsset_FuncLocPart3",

            type: sap.m.InputType.Input,
            enabled: true,
            liveChange: [function (event) {
                calculateRemainingCharacterCountCreateAsset();
            }]
        });


var labelCreateAssetPrevFuncLocDesc = new sap.m.Label({ text: "Current FL Description" })
var inputCreateAssetPrevFuncLocPart1 = new sap.m.Input(
        {

            type: sap.m.InputType.Input,
            enabled: false
        });

oCreateAssetFlBlockMatrix.createRow(labelCreateAssetPrevFuncLocDesc, inputCreateAssetPrevFuncLocPart1, new sap.m.Label({ text: "" }), charactersRemainingLabelCreateAsset)

//ROW1
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetFlBlockMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});
oCell.addContent(new sap.m.Label({ text: "Functional Location" }));

oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetFuncLocPart1);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    hAlign: sap.ui.commons.layout.HAlign.Center,
    colSpan: 1,
    rowSpan: 2
});

oCell.addContent(inputCreateAssetFuncLocPart2);
oRow.addCell(oCell);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 1,
    rowSpan: 2
});
oCell.addContent(inputCreateAssetFuncLocPart3);
oRow.addCell(oCell);

//ROW2
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetFlBlockMatrix.addRow(oRow);

var oCell = new sap.ui.commons.layout.MatrixLayoutCell({});

oCell.addContent(new sap.m.Label({ text: "Description" }));
oRow.addCell(oCell);

//ROW3
var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
oCreateAssetFlBlockMatrix.addRow(oRow);


//oCreateAssetFlBlockMatrix.createRow(new sap.m.Label({ text: "1" }), new sap.m.Label({ text: "2" }), new sap.m.Label({ text: "3" }),
//		new sap.m.Label({ text: "4" }), new sap.m.Label({ text: "5" }));
//end funclocBlock

var formCreateAsset = new sap.m.Dialog("form_CreateAsset", {
    subHeader: new sap.m.Bar({
        contentMiddle: [new sap.m.Label("CreateAssetfuncLocHeader", {})],
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

			        var msgCancel = "You have chosen to cancel part way through the creation process. ";
			        msgCancel += "Clicking YES will confirm you wish to cancel and return to the Home screen";
			        msgCancel += "Clicking NO will take you to the previous screen.";
			        CreateAssetConfirmCancel("",msgCancel,
                            formCreateAsset)



			    }]
			}), new sap.m.Button("createAssetButton_Next", {

			    text: "Next",
			    icon: "",
			    type: sap.m.ButtonType.Accept,
			    tap: [function (oEvt) {
			        nextPressed = true;
			        validatePageCreateAsset()
			    }]
			})

    ],
    content: [oCreateAssetMatrix, oCreateAssetFlBlockMatrix],
    contentWidth: "1024px",
    contentHeight: "99%",
    beforeOpen: function () {
        nextPressed = false;
        populateInputMakeCreateAsset();
        populateoModelHelpMakeAssetList();
        createAssetPopulateSite();
        sap.ui.getCore().getElementById("Input_CreateAssetSite").setValue("");
    },

    afterOpen: function () {
        setDefaultValues();

    },
    beforeClose: function () {
        try {

        } catch (err) {
        }
    }

})

function setDefaultValues() {

    var otitle = "";

    switch (action) {
        case recordAction.CREATE:
            otitle = "Create Asset - Step 1 of 4";
            textSelectEquipmentType.setRows(15);
            textSelectFunctionType.setRows(15);
            oCreateAssetFlBlockMatrix.setVisible(false);
            break;
        case recordAction.EDIT:
            otitle = "Edit Existing Asset Information - Step 2 of 4";
            textSelectEquipmentType.setRows(12);
            textSelectFunctionType.setRows(12);
            oCreateAssetFlBlockMatrix.setVisible(true);
            inputCreateAssetPrevFuncLocPart1.setValue(currentAssetRecord.plantGroupDescriptionZPLGDESC);
            inputCreateAssetFuncLocPart1.setValue(currentAssetRecord.functionTypeZNCDESC);
            break;
        case recordAction.AFTERDECOM:
            otitle = "Create Asset - Step 1 of 4";
            textSelectEquipmentType.setRows(14);
            textSelectFunctionType.setRows(14);
            oCreateAssetFlBlockMatrix.setVisible(false);
            break;
        default:

    }

    formCreateAsset.setTitle(otitle);

    createAssetValidateControls();
}

function onCreateAssetSiteChanged(createassetLoading, selectedSite) {
    var SQLStatement = "";

    if (selectedSite != "") {
        InputMakeAssetList.setPlaceholder("Start Typing ...");
        InputMakeAssetList.setValue("");
        InputMakeAssetList.setEnabled(true);

        currentAssetRecord.site = selectedSite;

        if (action == recordAction.AFTERDECOM && createassetLoading == true) {
            //After decom we blank the Make and Model but preserve Equipment Number and Funtion Type
            makeValue = null;
            currentAssetRecord.make = "";

        }

        checkMakeExists()

        if (currentAssetRecord.make != null && createassetLoading && makeExists == true) {
            sap.ui.getCore().getElementById("Input_MakeAssetList").setValue(currentAssetRecord.make);
        }
        else if (currentAssetRecord.make != null && createassetLoading && makeExists == false) {
            sap.ui.getCore().getElementById("Input_MakeAssetList").setValue("NOT LISTED");
            currentAssetRecord.newMake = currentAssetRecord.make
        }
        else {
            currentAssetRecord.make = null;
            sap.ui.getCore().getElementById("Input_MakeAssetList").setValue("");
            sap.ui.getCore().getElementById("Input_MakeAssetList").setEnabled(true);
        }
        if (currentAssetRecord.make != null || (action == recordAction.AFTERDECOM && createassetLoading == true)) {
            onCreateAssetMakeChanged(createassetLoading, currentAssetRecord.make.toUpperCase());
        }
    }
    else {
        InputMakeAssetList.setPlaceholder("");
        InputMakeAssetList.setValue("");
        InputMakeAssetList.setEnabled(false);
        InputModelAssetList.setPlaceholder("");
        InputModelAssetList.setValue("");
        InputModelAssetList.setEnabled(false);

        currentAssetRecord.site = null;
        currentAssetRecord.make = null;
        currentAssetRecord.model = null;
        currentAssetRecord.newMake = null;
        currentAssetRecord.newModel = null;
        sap.ui.getCore().getElementById("Input_NewModel").setEnabled(false)
        sap.ui.getCore().getElementById("Input_NewModel").setValue("");
        sap.ui.getCore().getElementById("Input_NewMake").setEnabled(false)
        sap.ui.getCore().getElementById("Input_NewMake").setValue("");
        currentAssetRecord.equipmentTypeDescriptionZOTDESC = null;
        currentAssetRecord.functionTypeZNCDESC = null;
        sap.ui.getCore().getElementById("createAssetButton_EquipmentType").setEnabled(false);
        sap.ui.getCore().getElementById("createAssetInput_EquipmentType").setValue("");
        sap.ui.getCore().getElementById("text_SelectEquipmentType").setValue("");
        sap.ui.getCore().getElementById("text_SelectFunctionType").setValue("");

        currentAssetRecord.functionTypeZNCDESC = null;

        currentAssetRecord.equipmentTypeCodeZZEQPT_EGI = null;
        currentAssetRecord.assetTypeCodeZATCODE = null;

        sap.ui.getCore().getElementById("createAssetFilter_FunctionType").destroyItems();
        //sap.ui.getCore().getElementById("createAssetFilter_FunctionType").addItem(
        //       new sap.ui.core.Item({
        //           key: null,
        //           text: '--Select--'
        //       }))
        sap.ui.getCore().getElementById("createAssetFilter_FunctionType").setEnabled(false);

    }
}

function onCreateAssetMakeChanged(createassetLoading, makeValue) {
    if (createassetLoading == true) {
        //set the Control to the saved value
        makeValue = currentAssetRecord.make;
    }
    else {
        //save the entered value
        currentAssetRecord.make = makeValue;

        //Unless we are loading, we always clear the model if the make changes
        currentAssetRecord.model = null;
    }

    checkMakeExists();

    if (makeValue != null && makeValue == "NOT LISTED") {//createassetLoading must be false in this case - "NOT LISTED" is not a valid option when loading a record - the newMake would be saved as make.
        sap.ui.getCore().getElementById("Input_MakeAssetList").setValue("NOT LISTED");
        currentAssetRecord.newmake = "";
        sap.ui.getCore().getElementById("Input_NewMake").setEnabled(true)
        sap.ui.getCore().getElementById("Input_NewMake").setValue("");
    }
    else if (makeValue != null && makeValue != "" && makeExists == false) {
        //createassetLoading must be true in this case because you can only select existing makes
        sap.ui.getCore().getElementById("Input_MakeAssetList").setValue("NOT LISTED");
        currentAssetRecord.newmake = currentAssetRecord.make;
        sap.ui.getCore().getElementById("Input_NewMake").setEnabled(true)
        sap.ui.getCore().getElementById("Input_NewMake").setValue(currentAssetRecord.newMake);
    }
    else {
        //The usual case. It doesn't matter if createassetLoading is true or not the passed makeValue is an existing make so we don't need newMake;
        sap.ui.getCore().getElementById("Input_MakeAssetList").setValue(currentAssetRecord.make);
        currentAssetRecord.newmake = "";
        sap.ui.getCore().getElementById("Input_NewMake").setEnabled(false)
        sap.ui.getCore().getElementById("Input_NewMake").setValue("");
    }

    //populate the model control based on the chosen make
    InputModelAssetList.setPlaceholder("--select--");
    InputModelAssetList.setValue("");
    InputModelAssetList.setEnabled(true);
    populateoModelInputModelAssetList(makeValue)
    populateoModelHelpModelAssetList(makeValue);


    //we are either loading a record (so edit/after decom/copy AND loading - remember we don't load a new record as it is all blank)
    //or making a change to an edit/after decom/copy when not loading
    //or changing a new record
    //if loading, call  onCreateAssetEquipmentTypeChanged
    //if changing an edit/after decom/copy do nothing - changing make/model doesn't change anything below.
    //if changing  a new record, blank everything below

    if (createassetLoading == true) {
        //modifying an existing record 
        onCreateAssetModelChanged(createassetLoading, currentAssetRecord.model);
    }
    else if (action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY) {
        //Do nothing. Changing make/model has no efct on the controlds below for an edit/after decom/copy 
    }
    else {
        //The make has changed and we are not loading, so all controls below are disabled . They may still be populated - but we can't see them as they are disabled
        //if createassetLoading==true we may repopulate them later

        currentAssetRecord.model = null;
        currentAssetRecord.newModel = null;
        currentAssetRecord.equipmentTypeDescriptionZOTDESC = null;
        currentAssetRecord.functionTypeZNCDESC = null;

        sap.ui.getCore().getElementById("createAssetButton_EquipmentType").setEnabled(false);
        sap.ui.getCore().getElementById("createAssetInput_EquipmentType").setValue("");
        sap.ui.getCore().getElementById("text_SelectEquipmentType").setValue("");
        currentAssetRecord.functionTypeZNCDESC = null;

        currentAssetRecord.equipmentTypeCodeZZEQPT_EGI = null;
        currentAssetRecord.assetTypeCodeZATCODE = null;

        sap.ui.getCore().getElementById("createAssetFilter_FunctionType").destroyItems();

        sap.ui.getCore().getElementById("createAssetFilter_FunctionType").setEnabled(false);
        sap.ui.getCore().getElementById("text_SelectFunctionType").setValue("");
    }

}

function onCreateAssetModelChanged(createassetLoading, modelValue) {
    if (createassetLoading == true) {
        //set the Control to the saved value
        modelValue = currentAssetRecord.model;
    }
    else {
        //save the entered value
        currentAssetRecord.model = modelValue;
    }
    checkModelExists();

    if (modelValue != null && modelValue == "NOT LISTED") {//this applies even when loading a record - "NOT LISTED" is not a valid option when loading a record - the newModel would be saved as model.
        sap.ui.getCore().getElementById("Input_ModelAssetList").setValue("NOT LISTED");
        currentAssetRecord.newModel = "";
        sap.ui.getCore().getElementById("Input_NewModel").setEnabled(true)
        sap.ui.getCore().getElementById("Input_NewModel").setValue("");
    }
    else if (modelValue != null && modelValue != "" && modelExists == false) {
        sap.ui.getCore().getElementById("Input_ModelAssetList").setValue("NOT LISTED");
        currentAssetRecord.newModel = currentAssetRecord.model;
        sap.ui.getCore().getElementById("Input_NewModel").setEnabled(true)
        sap.ui.getCore().getElementById("Input_NewModel").setValue(currentAssetRecord.newModel);
    }
    else {
        sap.ui.getCore().getElementById("Input_ModelAssetList").setValue(currentAssetRecord.model);
        currentAssetRecord.newModel = "";
        sap.ui.getCore().getElementById("Input_NewModel").setEnabled(false)
        sap.ui.getCore().getElementById("Input_NewModel").setValue("");
    }

    //if we are loading a record following decomission blank the model input
    if (createassetLoading == true && action == recordAction.AFTERDECOM) {
        //don't blank thecurrentAssetRecord.model as we need it to derive the equipment number
        // currentAssetRecord.model = null;
        InputModelAssetList.setPlaceholder("");
        InputModelAssetList.setValue("");
        InputModelAssetList.setEnabled(false);
        sap.ui.getCore().getElementById("Input_NewModel").setEnabled(false)
        sap.ui.getCore().getElementById("Input_NewModel").setValue("");
    }

    //we are either making a change to an edit/after decom/copy 
    //or changing the model to a new value or to blank
    //if changing an edit/after decom/copy do nothing - changing make/model doesn't change anything below.
    //if changing  a record, blank everything below if the model is null, or populate the equipment based on the model
    if ((action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY) && createassetLoading == false) {
        //Do nothing. Changing make/model has no efct on the controlds below for an edit/after decom/copy if we aren't loading
    }
    else if (modelValue != null) {
        //populate the Equipment control based on the chosen model
        sap.ui.getCore().getElementById("createAssetButton_EquipmentType").setEnabled(true);

        if (currentAssetRecord.equipmentTypeCodeZZEQPT_EGI && currentAssetRecord.equipmentTypeCodeZZEQPT_EGI != "") {
            getEquipmentInfo(function () {
                sap.ui.getCore().getElementById("text_SelectEquipmentType").setValue(currentAssetRecord.ZotDef);
                sap.ui.getCore().getElementById("createAssetInput_EquipmentType").setValue(currentAssetRecord.equipmentTypeDescriptionZOTDESC);
                //we may be able to derive the equipment type to we need to call onCreateAssetEquipmentTypeChanged
                onCreateAssetEquipmentTypeChanged(createassetLoading)
            });
        }
        else {
            //we don't know the ZZEQPT_EGI, but we may be able to get it from the make /model
            getEquipmentTypeCodeZZEQPT_EGI(currentAssetRecord.make, currentAssetRecord.model, function () {
                getEquipmentInfo(function () {

                    sap.ui.getCore().getElementById("text_SelectEquipmentType").setValue(currentAssetRecord.ZotDef);
                    sap.ui.getCore().getElementById("createAssetInput_EquipmentType").setValue(currentAssetRecord.equipmentTypeDescriptionZOTDESC);
                    onCreateAssetEquipmentTypeChanged(createassetLoading)
                });
            })

        }
    }
    else {
        //model is null and we are not doing edit/after decom/copy so blank everything below
        currentAssetRecord.equipmentTypeDescriptionZOTDESC = null;
        currentAssetRecord.functionTypeZNCDESC = null;

        sap.ui.getCore().getElementById("createAssetButton_EquipmentType").setEnabled(false);
        sap.ui.getCore().getElementById("createAssetInput_EquipmentType").setValue("");
        sap.ui.getCore().getElementById("text_SelectEquipmentType").setValue("");
        currentAssetRecord.functionTypeZNCDESC = null;

        currentAssetRecord.equipmentTypeCodeZZEQPT_EGI = null;
        currentAssetRecord.assetTypeCodeZATCODE = null;

        sap.ui.getCore().getElementById("createAssetFilter_FunctionType").destroyItems();
        sap.ui.getCore().getElementById("createAssetFilter_FunctionType").setEnabled(false);
        sap.ui.getCore().getElementById("text_SelectFunctionType").setValue("");
    }
}
function onCreateAssetEquipmentTypeChanged(createassetLoading) {
    if (currentAssetRecord.equipmentTypeCodeZZEQPT_EGI && currentAssetRecord.equipmentTypeCodeZZEQPT_EGI != "") {
        getEquipmentInfo(function () {
            sap.ui.getCore().getElementById("text_SelectEquipmentType").setValue(currentAssetRecord.ZotDef);
        });
    }
    var SQLStatement = "";

    if (currentAssetRecord.assetTypeCodeZATCODE != null) {

        SQLStatement = "select distinct ZZFL_NC,ZNCDESC from FunctionTypeCodes  where ZATCODE='"
                + currentAssetRecord.assetTypeCodeZATCODE
                + "' ORDER BY ZNCDESC ";

        html5sql
                .process(
                        SQLStatement,
                        function (transaction, results, rowsArray) {

                            sap.ui.getCore().getElementById("createAssetFilter_FunctionType").destroyItems();
                            sap.ui.getCore().getElementById("createAssetFilter_FunctionType").addItem(
                                   new sap.ui.core.Item({
                                       key: null,
                                       text: '--Select--'
                                   }))

                            sap.ui.getCore().getElementById("createAssetFilter_FunctionType").setEnabled(true);

                            for (var n = 0; n < rowsArray.length; n++) {
                                item = rowsArray[n];
                                sap.ui.getCore().getElementById(
                                        "createAssetFilter_FunctionType")
                                        .addItem(new sap.ui.core.Item({
                                            key: item.ZZFL_NC,
                                            text: item.ZNCDESC
                                        }))
                            }
                            if ((action == recordAction.EDIT || action == recordAction.AFTERDECOM || action == recordAction.COPY)
                                    && currentAssetRecord.zzfl_nc != null && createassetLoading) {
                                sap.ui.getCore().getElementById("createAssetFilter_FunctionType").setSelectedKey(currentAssetRecord.zzfl_nc);
                            }
                            else {
                                sap.ui.getCore().getElementById("createAssetFilter_FunctionType").setSelectedKey(null);
                            }
                            currentAssetRecord.equipmentTypeDescriptionZOTDESC = sap.ui.getCore().getElementById("createAssetInput_EquipmentType").getValue();
                            onCreateAssetFunctionTypeChanged();
                        }, function (error, statement) {
                        })
    } else {
        sap.ui.getCore().getElementById("createAssetFilter_FunctionType").destroyItems();
        sap.ui.getCore().getElementById("createAssetFilter_FunctionType").setEnabled(false);
        sap.ui.getCore().getElementById("text_SelectFunctionType").setValue("");
        createAssetValidateControls();

    }

}

function onCreateAssetFunctionTypeChanged() {
    if (sap.ui.getCore().getElementById("createAssetFilter_FunctionType").getSelectedItem()
       && sap.ui.getCore().getElementById("createAssetFilter_FunctionType").getSelectedItem().getText() != "--Select--") {
        currentAssetRecord.functionTypeZNCDESC = sap.ui.getCore().getElementById("createAssetFilter_FunctionType").getSelectedItem().getText();
        currentAssetRecord.zzfl_nc = sap.ui.getCore().getElementById("createAssetFilter_FunctionType").getSelectedKey();
    }
    else {
        currentAssetRecord.functionTypeZNCDESC = null;
        currentAssetRecord.zzfl_nc = null;
    }
    getFunctionDefinitionZNCDEF(currentAssetRecord.zzfl_nc);
    createAssetValidateControls()
}
function createAssetValidateControls() {
    if (sap.ui.getCore().getElementById("createAssetFilter_FunctionType").getSelectedItem()
      && sap.ui.getCore().getElementById("createAssetFilter_FunctionType").getSelectedItem().getText() != "--Select--") {

        sap.ui.getCore().getElementById("createAssetButton_Next").setEnabled(true);
    }
    else {
        sap.ui.getCore().getElementById("createAssetButton_Next").setEnabled(false);
    }

    if (action == recordAction.CREATE) {
        sap.ui.getCore().getElementById("CreateAssetfuncLocHeader").setText(getFunctionalLocationString());
    }
    else {
        sap.ui.getCore().getElementById("CreateAssetfuncLocHeader").setText(currentAssetRecord.funcLocStringZINSTLOCN);
    }

}

function validatePageCreateAsset() {
    var pageisValid = true;
    if (sap.ui.getCore().getElementById("Input_MakeAssetList").getValue() == "NOT LISTED"
       && sap.ui.getCore().getElementById("Input_NewMake").getValue() == "") {
        pageisValid = false;
        document.getElementById("Input_NewMake").style.backgroundColor = "red";
    }
    else {
        document.getElementById("Input_NewMake").style.backgroundColor = "";
    }

    if (sap.ui.getCore().getElementById("Input_ModelAssetList").getValue() == "NOT LISTED"
      && sap.ui.getCore().getElementById("Input_NewModel").getValue() == "") {
        document.getElementById("Input_NewModel").style.backgroundColor = "red";
        pageisValid = false;
    }
    else {
        document.getElementById("Input_NewModel").style.backgroundColor = "";
    }
    if (sap.ui.getCore().getElementById("Input_MakeAssetList").getValue() == "NOT LISTED") {
        currentAssetRecord.make = sap.ui.getCore().getElementById("Input_NewMake").getValue()
    }
    if (sap.ui.getCore().getElementById("Input_ModelAssetList").getValue() == "NOT LISTED") {
        currentAssetRecord.model = sap.ui.getCore().getElementById("Input_NewModel").getValue()
    }
    if (action == recordAction.EDIT) {
        if (inputCreateAssetFuncLocPart2.getValue() == "") {
            pageisValid = false;
            document.getElementById("inputCreateAsset_FuncLocPart2").style.backgroundColor = "red";
        }
        else {
            pageisValid = true;
            document.getElementById("inputCreateAsset_FuncLocPart2").style.backgroundColor = "";
        }
    }
    if (pageisValid && ValidateFuncLocCreateAsset()) {
    	
        currentAssetRecord.zinsLocDesc1 = inputCreateAssetFuncLocPart1.getValue();
        currentAssetRecord.zinsLocDesc2 = inputCreateAssetFuncLocPart2.getValue();
        currentAssetRecord.zinsLocDesc3 = inputCreateAssetFuncLocPart3.getValue();
        if (action == recordAction.CREATE) {
            chooseStep2Type(1);
        }
        else {
            chooseStep2Type(3);
        }

    }
}

function handleSearchMakeAssetList(evt) {
    var sValue = evt.getParameter("value");
    var oFilter = new sap.ui.model.Filter(
        "manufacturer",
        sap.ui.model.FilterOperator.Contains, sValue
    );
    evt.getSource().getBinding("items").filter([oFilter]);
}

function handleSearchModelAssetList(evt) {
    var sValue = evt.getParameter("value");
    var oFilter = new sap.ui.model.Filter(
        "MODEL",
        sap.ui.model.FilterOperator.Contains, sValue
    );
    evt.getSource().getBinding("items").filter([oFilter]);
}

function handleValueHelpCloseInputMakeAssetList(evt) {
    var oSelectedItem = evt.getParameter("selectedItem");
    if (oSelectedItem) {
        sap.ui.getCore().getElementById("Input_MakeAssetList").setValue(oSelectedItem.getTitle());
        evt.getSource().getBinding("items").filter([]);
        onCreateAssetMakeChanged(false, oSelectedItem.getTitle());
    }

}

function handleValueHelpCloseInputModelAssetList(evt) {
    var oSelectedItem = evt.getParameter("selectedItem");
    if (oSelectedItem) {
        sap.ui.getCore().getElementById("Input_ModelAssetList").setValue(oSelectedItem.getTitle());
        evt.getSource().getBinding("items").filter([]);
        onCreateAssetModelChanged(false, oSelectedItem.getTitle());
    }

}

//function handleInputModelAssetListLiveChange(evt) {
//   // InputModelAssetList.setEnabled(false);
//    //var SQLStatement = "select distinct model from Model WHERE model like '%" + evt.getParameter("newValue") + "%' AND HERST='" + sap.ui.getCore().getElementById("Input_MakeAssetList").getValue() + "' order by model"
//    //html5sql.process(SQLStatement,
//    //function (transaction, results, rowsArray) {
//    //    var rowsArray2 = [];
//    //    for (var n = 0; n < rowsArray.length; n++) {

//    //        item = rowsArray[n];
//    //        if (item.MODEL.startsWith('#')) { item.MODEL = item.MODEL.substr(1) }
//    //        //if (currentAssetRecord.make!=null && item.manufacturer.toUpperCase() == currentAssetRecord.make.toUpperCase()) { makeExists = true }
//    //        rowsArray2.push(item);
//    //    }

//    //    oModelInputModelAssetList.setSizeLimit(10000);
//    //    aDataInputModelAssetList = rowsArray2;
//    //    oModelInputModelAssetList.setData({
//    //        modelData: aDataInputModelAssetList
//    //    });

//    //    sap.ui.getCore().getElementById("Input_ModelAssetList").setModel(oModelInputModelAssetList);
//    //    InputModelAssetList.bindAggregation("suggestionItems", "/modelData", oItemTemplate2);
//    //    sap.ui.getCore().getElementById("Input_ModelAssetList").setFilterFunction(function (sValue, oItem) {
//    //        return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
//    //    });
//    //},  function (error, statement) {
//    //    opMessage("Error: " + error.message + " when processing " + statement);
//    //})
//}

function handleInputMakeAssetListLiveChange(evt) {
    InputModelAssetList.setPlaceholder("");
    InputModelAssetList.setValue("");
    InputModelAssetList.setEnabled(false);

    //var SQLStatement = "select distinct manufacturer from Manufacturer WHERE manufacturer like '%" + evt.getParameter("newValue") + "%'    order by manufacturer"
    //html5sql.process(SQLStatement,
    //function (transaction, results, rowsArray) {
    //    var rowsArray2 = [];
    //   // var makeFound = false;
    //    for (var n = 0; n < rowsArray.length; n++) {
    //        item = rowsArray[n];
    //        if (item.manufacturer.startsWith('#')) { item.manufacturer = item.manufacturer.substr(1) }
    //        if (currentAssetRecord.make != null && item.manufacturer.toUpperCase() == currentAssetRecord.make.toUpperCase()) { makeExists = true }
    //      //  if (InputMakeAssetList.getValue().toUpperCase() == item.manufacturer.toUpperCase()) {makeFound = true}
    //        rowsArray2.push(item);
    //    }
    //    //if (makeFound == true)
    //    //{InputModelAssetList.setPlaceholder("--select--");
    //    //    InputModelAssetList.setValue("");
    //    //    InputModelAssetList.setEnabled(true);
    //    //    populateoModelInputModelAssetList()
    //    //}
    //    //else
    //    //{
    //        //InputModelAssetList.setPlaceholder("");
    //        //    InputModelAssetList.setValue("");
    //        //    InputModelAssetList.setEnabled(false);
    //    //}

    //    oModelInputMakeAssetList.setSizeLimit(10000);
    //    aDataInputMakeAssetList = rowsArray2;
    //    oModelInputMakeAssetList.setData({
    //        modelData: aDataInputMakeAssetList
    //    });

    //    sap.ui.getCore().getElementById("Input_MakeAssetList").setModel(oModelInputMakeAssetList);
    //    InputMakeAssetList.bindAggregation("suggestionItems", "/modelData", oItemTemplate1);
    //    //sap.ui.getCore().getElementById("Input_MakeAssetList").setFilterFunction(function (sValue, oItem) {
    //    //    return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
    //   // });
    //}, function (error, statement) { })
}


function populateoModelHelpMakeAssetList() {
    var SQLStatement = "select distinct manufacturer from Manufacturer order by manufacturer"
    html5sql.process(SQLStatement,
    function (transaction, results, rowsArray) {
        var rowsArray2 = [];
        for (var n = 0; n < rowsArray.length; n++) {

            item = rowsArray[n];
            if (item.manufacturer.startsWith('#')) { item.manufacturer = item.manufacturer.substr(1) }
            if (currentAssetRecord.make != null && item.manufacturer.toUpperCase() == currentAssetRecord.make.toUpperCase()) { makeExists = true }
            rowsArray2.push(item);
        }
        oModelHelpMakeAssetList.setSizeLimit(10000);
        aDataHelpMakeAssetList = rowsArray;
        oModelHelpMakeAssetList.setData({
            modelData: aDataHelpMakeAssetList
        });

    }, function (error, statement) { })
}

function populateoModelHelpModelAssetList(makeValue) {
    var SQLStatement = "select distinct MODEL from Model WHERE HERST='" + makeValue + "' or HERST='#' ||'" + makeValue + "' order by model"
    html5sql.process(SQLStatement,
    function (transaction, results, rowsArray) {
        var rowsArray2 = [];
        for (var n = 0; n < rowsArray.length; n++) {

            item = rowsArray[n];
            if (item.MODEL.startsWith('#')) { item.MODEL = item.MODEL.substr(1) }
            rowsArray2.push(item);
        }
        oModelHelpModelAssetList.setSizeLimit(10000);
        aDataHelpModelAssetList = rowsArray;
        oModelHelpModelAssetList.setData({
            modelData: aDataHelpModelAssetList
        });

    }, function (error, statement) { })
}

function populateoModelInputModelAssetList(makeValue) {

    var SQLStatement = "select distinct model from Model WHERE HERST='" + makeValue + "' or HERST='#' ||'" + makeValue + "' order by model"
    html5sql.process(SQLStatement,
    function (transaction, results, rowsArray) {
        var rowsArray2 = [];
        for (var n = 0; n < rowsArray.length; n++) {

            item = rowsArray[n];
            if (item.MODEL.startsWith('#')) { item.MODEL = item.MODEL.substr(1) }
            if (currentAssetRecord.model != null && item.MODEL.toUpperCase() == currentAssetRecord.model.toUpperCase()) { modelExists = true }
            rowsArray2.push(item);
        }

        oModelInputModelAssetList.setSizeLimit(10000);
        aDataInputModelAssetList = rowsArray2;
        oModelInputModelAssetList.setData({
            modelData: aDataInputModelAssetList
        });

        sap.ui.getCore().getElementById("Input_ModelAssetList").setModel(oModelInputModelAssetList);
        InputModelAssetList.bindAggregation("suggestionItems", "/modelData", oItemTemplate2);
        sap.ui.getCore().getElementById("Input_ModelAssetList").setFilterFunction(function (sValue, oItem) {
            return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
        });
    }, function (error, statement) {
        opMessage("Error: " + error.message + " when processing " + statement);
    })
}

function checkMakeExists() {
    for (var n = 0; n < aDataInputMakeAssetList.length; n++) {
        item = aDataInputMakeAssetList[n];
        //console.log(item.manufacturer.toUpperCase());
        if (currentAssetRecord.make != null && item.manufacturer.toUpperCase() == currentAssetRecord.make.toUpperCase()) { makeExists = true }
    }
}

function checkModelExists() {
    for (var n = 0; n < aDataInputModelAssetList.length; n++) {
        item = aDataInputModelAssetList[n];
        if (currentAssetRecord.model != null && item.MODEL.toUpperCase() == currentAssetRecord.model.toUpperCase()) { modelExists = true }
    }
}

function populateInputMakeCreateAsset() {
    var SQLStatement = "select distinct manufacturer from Manufacturer  order by manufacturer"
    html5sql.process(SQLStatement,
    function (transaction, results, rowsArray) {
        var rowsArray2 = [];
        for (var n = 0; n < rowsArray.length; n++) {
            item = rowsArray[n];
            if (item.manufacturer.startsWith('#')) { item.manufacturer = item.manufacturer.substr(1) }
            rowsArray2.push(item);
        }

        oModelInputMakeAssetList.setSizeLimit(10000);
        aDataInputMakeAssetList = rowsArray2;
        oModelInputMakeAssetList.setData({
            modelData: aDataInputMakeAssetList
        });

        sap.ui.getCore().getElementById("Input_MakeAssetList").setModel(oModelInputMakeAssetList);
        InputMakeAssetList.bindAggregation("suggestionItems", "/modelData", oItemTemplate1);
        sap.ui.getCore().getElementById("Input_MakeAssetList").setFilterFunction(function (sValue, oItem) {
            return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
        });
    }, function (error, statement) { })
}
function CreateAssetConfirmCancel(title, msg) {
    sap.m.MessageBox.show(msg, {
        icon: sap.m.MessageBox.Icon.WARNING,
        title: title,
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        onClose: function (oAction) {

            if (oAction == "YES") {
                resetAssetRecord(currentAssetRecord);
                clearControls();
                formCreateAsset.close();
            }
        }
    }
           );
}
function createAssetPopulateSite() {
    if (currentAssetRecord.site != null) {
        SQLStatement = "select  site,site  || ' - ' || desc as desc from AssetSites  WHERE site='" + currentAssetRecord.site + "'";
        html5sql.process(SQLStatement, function (transaction, results, rowsArray) {

            if (rowsArray.length > 0) {
                InputCreateAssetSite.setValue(rowsArray[0].desc);
                if (action != recordAction.CREATE) {
                    onCreateAssetSiteChanged(true, currentAssetRecord.site);
                }
            }

        }, function (error, statement) {
        })
    }

}


function calculateRemainingCharacterCountCreateAsset() {
    var a = inputCreateAssetFuncLocPart1.getValue().length + 1;
    var b = inputCreateAssetFuncLocPart2.getValue().length + 1;
    var c = inputCreateAssetFuncLocPart3.getValue().length;
    var d = 40 - (a + b);

    if (d <= 0) {
        d = 0;
        inputCreateAssetFuncLocPart2.setEnabled(false)
        inputCreateAssetFuncLocPart3.setEnabled(false)
    }
    else {
        inputCreateAssetFuncLocPart2.setEnabled(true)
        inputCreateAssetFuncLocPart3.setEnabled(true)
    }
    e = 40 - (a + b + c);
    if (e < 0) {
        e = 0;
        var origVal = inputCreateAssetFuncLocPart3.getValue();
        inputCreateAssetFuncLocPart3.setValue(origVal.substr(0, d));
    }
    charactersRemainingLabelCreateAsset.setText("Characters remaining:" + e);
    if (inputCreateAssetFuncLocPart2.getValue() == "" && nextPressed == true) {
        document.getElementById("inputCreateAsset_FuncLocPart2").style.backgroundColor = "red";
    }
    else {
        document.getElementById("inputCreateAsset_FuncLocPart2").style.backgroundColor = "";
    }
}
function ValidateFuncLocCreateAsset(){
	var a=inputCreateAssetFuncLocPart2.getValue().length;
	if(a>2){
		sap.m.MessageBox.show("Please Enter only two numeric charcaters", {
	        icon: sap.m.MessageBox.Icon.WARNING,
	        //title: title,
	        actions: [sap.m.MessageBox.Action.CLOSE],
	        onClose: function (oAction) {
	        	//formCreateAssetStep3.close();
	          
	        }
	    })	
	    return false;
	}
	else{
		return true;
	}

}