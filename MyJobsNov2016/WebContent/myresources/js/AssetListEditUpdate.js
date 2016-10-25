jQuery.sap.require("sap.m.MessageBox");
var selectedAssetSearch;
var currentAssetRecord = new AssetRecord();
html5sql.openDatabase("com.aws.myjobs", "myjobs", 10 * 1024 * 1024);



//function populateSiteFilterAssetListEditUpdate() {

//    var SQLStatement = "";

//    sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").destroyItems();
//    sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").addItem(
//			new sap.ui.core.Item({
//			    key: "NOTSELECTED",
//			    text: 'Please Select'
//			}))

//    var ToOutput = "";
//    SQLStatement = "select distinct site from AssetSitesDetails order by site"

//    html5sql.process(SQLStatement, function (transaction, results, rowsArray) {

//        for (var n = 0; n < rowsArray.length; n++) {
//            item = rowsArray[n];
//            sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").addItem(
//					new sap.ui.core.Item({
//					    key: item.site,
//					    text: item.site
//					}))
//        }

//        SQLStatement = "select site from AssetSitesDetails order by site"
//    }, function (error, statement) {
//    })

//}
function populateOtherFiltersAssetListEditUpdate() {
    currentAssetRecord.site = sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").getValue();
    var SQLStatement = "";

    sap.ui.getCore().getElementById("Filter_PlantGroupEditUpdate").destroyItems();
    sap.ui.getCore().getElementById("Filter_PlantGroupEditUpdate").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))
    defaultOutVal = "NOTSELECTED"
    sap.ui.getCore().getElementById("Filter_AssetTypeAssetListEditUpdate").destroyItems();
    sap.ui.getCore().getElementById("Filter_AssetTypeAssetListEditUpdate").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    sap.ui.getCore().getElementById("Filter_MakeAssetListEditUpdate").destroyItems();
    sap.ui.getCore().getElementById("Filter_MakeAssetListEditUpdate").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    

    sap.ui.getCore().getElementById("Filter_ModelAssetListEditUpdate").destroyItems();
    sap.ui.getCore().getElementById("Filter_ModelAssetListEditUpdate").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    sap.ui.getCore().getElementById("Filter_SystemCodeAssetListEditUpdate").destroyItems();
    sap.ui.getCore().getElementById("Filter_SystemCodeAssetListEditUpdate").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    var ToOutput = "";
    SQLStatement = "select distinct plgrp from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").getValue() + "' Order by plgrp";

    html5sql
			.process(
					SQLStatement,
					function (transaction, results, rowsArray) {

					    for (var n = 0; n < rowsArray.length; n++) {
					        item = rowsArray[n];
					        sap.ui.getCore()
									.getElementById("Filter_PlantGroupEditUpdate")
									.addItem(new sap.ui.core.Item({
									    key: item.plgrp,
									    text: item.plgrp
									}))
					    }

					    SQLStatement = "select distinct assdesc from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").getValue() + "' Order by assdesc";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_AssetTypeAssetListEditUpdate").addItem(
										new sap.ui.core.Item({
										    key: item.assdesc,
										    text: item.assdesc
										}))
					        }

					    }, function (error, statement) {
					    })

					    SQLStatement = "select distinct herst from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").getValue() + "' Order by HeRST";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_MakeAssetListEditUpdate").addItem(
										new sap.ui.core.Item({
										    key: item.herst,
										    text: item.herst
										}))
					        }

					    }, function (error, statement) {
					    })

					    SQLStatement = "select distinct sysdesc from AssetSitesDetails  where  SITE='" +
						sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").getValue() + "' Order by sysdesc";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_SystemCodeAssetListEditUpdate").addItem(
										new sap.ui.core.Item({
										    key: item.sysdesc,
										    text: item.sysdesc
										}))
					        }

					    }, function (error, statement) {
					    })

					}, function (error, statement) {
					})

}

var oFilterMatrixAssetListEditUpdate = new sap.ui.commons.layout.MatrixLayout({
    width:"1024px",
    id: "FilterMatrixAssetListEditUpdate",
    layoutFixed: true,
    columns: 5,
    widths: ['200px', '200px', '200px', '200px', '224px']
});
var labelSite = new sap.m.Label({
    text: "Site"
})
var labelPlantGroup = new sap.m.Label({
    text: "Plant Group"
})
var labelAssetType = new sap.m.Label({
    text: "Asset type"
})
var labFunctionalLocation = new sap.m.Label({
    text: "Functional Location"
})

oFilterMatrixAssetListEditUpdate.createRow(labelSite, labelPlantGroup, labelAssetType,
		labFunctionalLocation);


var FilterSiteAssetListEditUpdate = new sap.m.Input('Filter_SiteAssetListEditUpdate', {
    liveChange: function (event) {
        handleFilterSiteLiveChangeAssetListEditUpdate(event);
    },
    change: function (event) {
        populateOtherFiltersAssetListEditUpdate();
    },
    placeholder: "Type three characters to start searching...",
    showSuggestion: true,
    startSuggestion: 3,
    showValueHelp: true,
    valueHelpRequest: function () {
        oSelectDialogAssetListEditUpdate.open(sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").getValue());

        var oDialogDOM = oSelectDialogAssetListEditUpdate.$();
        var oSearchFieldDOM = oDialogDOM.find('.sapMSF');
        var oSFID = oSearchFieldDOM[0].id;
        var oSearchField = sap.ui.getCore().byId(oSFID);
        oSearchField.fireSearch();
    }
});
var oFilterPlantGroupAssetListEditUpdate = new sap.m.Select('Filter_PlantGroupEditUpdate', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) { }
});
var oFilterAssetTypeAssetListEditUpdate = new sap.m.Select('Filter_AssetTypeAssetListEditUpdate', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) { }
});
var oFilterFuncLoc = new sap.m.Input('Input_FuncLocAssetListEditUpdate', {
    maxLength: 30,
    width: "200px",
    items: [],
    change: function (oControlEvent) { }
});

//var oFilterFuncLoc = new sap.ui.core.HTML('Input_FuncLocAssetListEditUpdate',{
//   // content: ' <input name="attendancedate" type="date" class="feedback-input" placeholder="Attendance Date" id="attendancedate"  merge="~currentdate" readonly  /> '
//    content: '<input type="date" class="feedback-input" placeholder="Attendance Date" id="attendancedate"  merge="~currentdate">'
//    //    content: '<!doctype html>'+
////'<html lang="en">'+
////'<head>'+
//// ' <meta charset="utf-8">'+
//// ' <meta name="viewport" content="width=device-width, initial-scale=1">'+
//// ' <title>jQuery UI Datepicker - Default functionality</title>'+
//// ' <link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">'+
//// ' <link rel="stylesheet" href="/resources/demos/style.css">'+
//// ' <script src="https://code.jquery.com/jquery-1.12.4.js"></script>'+
//// ' <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>'+
//// ' <script>'+
//// ' $( function() {'+
//// '     $( "#datepicker" ).datepicker();'+
//// ' } );'+
////'</script>'+
////'</head>'+
////'<body>'+
////'<p>Date: <input type="text" id="datepicker"></p>'+
////'</body>'+
////'</html>'
//})





//$(oFilterFuncLoc).datepicker({ dateFormat: "dd/mm/yy" });

var btnAdvancedSearch=new sap.m.Button('ButtonAdvancedSearchAssetListEditUpdate', {
    text: "Show Advanced Search Options",
    type: sap.m.ButtonType.Emphasized,
    press: function () {
       
        setAdvancedFilterVisibilityAssetListEditUpdate();
    }
})
oFilterMatrixAssetListEditUpdate.createRow(FilterSiteAssetListEditUpdate, oFilterPlantGroupAssetListEditUpdate, oFilterAssetTypeAssetListEditUpdate,
		oFilterFuncLoc);
oFilterMatrixAssetListEditUpdate.createRow("","","",btnAdvancedSearch)


var oAdvancedFilterMatrixAssetListEditUpdateAssetListEditUpdate = new sap.ui.commons.layout.MatrixLayout({
    id: "AdvancedFilterMatrixAssetListEditUpdate",
    layoutFixed: true,
    columns: 4
});
var lab1 = new sap.m.Label({
    text: "Make"
})
var lab2 = new sap.m.Label({
    text: "Model"
})
var lab3 = new sap.m.Label({
    text: "SystemCode"
})
oAdvancedFilterMatrixAssetListEditUpdateAssetListEditUpdate.createRow(lab1, lab2, lab3);

var FilterMakeAssetListEditUpdate = new sap.m.Select('Filter_MakeAssetListEditUpdate', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) {
        populateModelFilterAssetListEditUpdate()
    }
});
var FilterModelAssetListEditUpdate = new sap.m.Select('Filter_ModelAssetListEditUpdate', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) {
    }
});
var FilterSystemCodeAssetListEditUpdate = new sap.m.Select('Filter_SystemCodeAssetListEditUpdate', {
    width: "200px",
    items: [],
    change: function (oControlEvent) {
    }
});

oAdvancedFilterMatrixAssetListEditUpdateAssetListEditUpdate.createRow(FilterMakeAssetListEditUpdate, FilterModelAssetListEditUpdate, FilterSystemCodeAssetListEditUpdate);

var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2
});
var oCell2 = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2
});
var labelFunctionalDescription = new sap.m.Label({
    width: "400px",
    text: "Functional Description"
})
var labelEquipment = new sap.m.Label({
    width: "400px",
    text: "Equipment"
})
oCell1.addContent(labelFunctionalDescription);
oCell2.addContent(labelEquipment);
oAdvancedFilterMatrixAssetListEditUpdateAssetListEditUpdate.createRow(oCell1, oCell2);

var oCell3 = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2
});
var oCell4 = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2
});
var inputFunctionalDescription = new sap.m.Input("Input_FunctionalDescriptionAssetListEditUpdate",
		{
		    maxLength: 40,
		    width: "500px",
		    type: sap.m.InputType.Input,
		    enabled: true
		});
var inputEquipment = new sap.m.Input("Input_EquipmentAssetListEditUpdate", {
    maxLength: 18,
    width: "500px",
    type: sap.m.InputType.Input,
    enabled: true
});
oCell3.addContent(inputFunctionalDescription);
oCell4.addContent(inputEquipment);
oAdvancedFilterMatrixAssetListEditUpdateAssetListEditUpdate.createRow(oCell3, oCell4);




var oTableAssetListEditUpdate = new sap.ui.table.Table({

    title: "",
    visibleRowCount: 10,

    selectionMode: sap.ui.table.SelectionMode.Single,
    selectionBehavior: sap.ui.table.SelectionBehavior.RowOnly,
    rowSelectionChange: function (e) {
        var idx = e.getParameter('rowIndex');
        if (idx > -1) {
            var cxt = oTableAssetListEditUpdate.getContextByIndex(idx);
            var path = cxt.sPath;
            var obj = oTableAssetListEditUpdate.getModel().getProperty(path);

            currentAssetRecord.pkid = obj.id;
            //currentAssetRecord.zascatAssetCategory = obj.ZASCAT;
           // currentAssetRecord.zproctyp = obj.ZPROCTYP;
            currentAssetRecord.make = obj.herst;
            currentAssetRecord.model = obj.mapar;
            currentAssetRecord.functionTypeZNCDESC = obj.ncdesc;
            currentAssetRecord.originalZinsLocDesc = obj.pltxt;
            currentAssetRecord.zinsLocDesc = obj.pltxt;
           // currentAssetRecord.zinsLocDesc1 = obj.ZINSLOCDESC1;
           // currentAssetRecord.zinsLocDesc2 = obj.ZINSLOCDESC2;
           // currentAssetRecord.zinsLocDesc3 = obj.ZINSLOCDESC3;
            currentAssetRecord.AssetDescriptionZASSDESC = obj.assdesc;
           // currentAssetRecord.ZotDef = obj.ZOTDEF;
            currentAssetRecord.inbdtInstallDate = obj.zinbdt == "00000000" ? "" : obj.zinbdt;// "00000000";;
            currentAssetRecord.zzAssetTag = obj.asstag;
            currentAssetRecord.sergeSerialNumber = obj.serge;
            //currentAssetRecord.zcomments1 = obj.ZCOMMENTS1;
            //currentAssetRecord.zcomments2 = obj.ZCOMMENTS2;
            //currentAssetRecord.z_gpsNmea = obj.Z_GPSNMEA;
            currentAssetRecord.zsysDescSystemCodeDescription = obj.sysdesc;
            currentAssetRecord.equipmentTypeDescriptionZOTDESC = obj.otdesc;


            //build FunctionalLocationString
            //Site-ProcessGroup-Zplgrp-Zsyscode-SystemCodeId-Zzfl_nc.substring(2)-FunctionTypeItemId
            //ELMASP-2A-PUM-PS01-NRV001

            currentAssetRecord.site = obj.site;
            currentAssetRecord.processGroupZPRG = obj.tplnr.substring(7, 9);
            currentAssetRecord.plantGroupCodeZplgrp = obj.tplnr.substring(10, 13)
            currentAssetRecord.SystemCodeZSYSCODE = obj.tplnr.substring(14, 16);
            currentAssetRecord.SystemCodeNumber = obj.tplnr.substring(16, 18);
            // currentAssetRecord.funcLocSub19_22zzfl_nc = obj.ZINSTLOCN.substring(19, 22)//Zzfl_nc is 6 chars wide, but we only use the last 3 in the func loc string
            currentAssetRecord.zzfl_nc = obj.zfl_nc;
            currentAssetRecord.funcLocSub22_3FunctionTypeItemNumber = obj.tplnr.substring(22, 25);
            currentAssetRecord.plantGroupDescriptionZPLGDESC = obj.plgrp;
            currentAssetRecord.funcLocStringZINSTLOCN = obj.tplnr;
            currentAssetRecord.originalFuncLocStringZINSTLOCN = obj.tplnr;
            currentAssetRecord.AssetDescriptionZASSDESC = obj.assdesc;
            currentAssetRecord.ZASSTYPE = obj.asstype;
            currentAssetRecord.equipmentTypeCodeZZEQPT_EGI = obj.eqart;
            currentAssetRecord.EquipmentDescriptionEQKTU = obj.eqktx;
            currentAssetRecord.EQUNR = obj.equnr;
            currentAssetRecord.ZIWERK = obj.iwerk;
            currentAssetRecord.STATUS = obj.status;
            currentAssetRecord.maintenancePlantZSWERK = obj.swerk;
            sap.ui.getCore().getElementById("ButtonSelect_AssetListEditUpdate").setEnabled(true);
        }
        else
        {
            sap.ui.getCore().getElementById("ButtonSelect_AssetListEditUpdate").setEnabled(false);
        }
    }
    , columnMove: function (e) {

        var myNewPos = e.getParameter('newPos');

        var mycolumnName = e.getParameter('column').mProperties.name;
        var mycolumnWidth = e.getParameter('column').mProperties.width;

        changeColumnOrderAssetListEditUpdate(myNewPos, mycolumnName, mycolumnWidth)
    },
    columnResize: function (e) {

        var mycolumnName = e.getParameter('column').mProperties.name;
        var mycolumnWidth = e.mParameters.width;

        changeColumnWidthAssetListEditUpdate(mycolumnName, mycolumnWidth)
    }
});

// Create a model and bind the table rows to this model
var oModelTableAssetListEditUpdate = new sap.ui.model.json.JSONModel();
var aDataTableAssetListEditUpdate;

// Initially sort the table
oTableAssetListEditUpdate.sort(oTableAssetListEditUpdate.getColumns()[0]);




var advancedFiltercontainerAssetListEditUpdate = new sap.m.Panel("advancedFiltercontainerAssetListEditUpdate", {
    visible: false,
    content: [oAdvancedFilterMatrixAssetListEditUpdateAssetListEditUpdate]

})

function setAdvancedFilterVisibilityAssetListEditUpdate() {
    if (sap.ui.getCore().getElementById("advancedFiltercontainerAssetListEditUpdate").getVisible() == true) {
        sap.ui.getCore().getElementById("advancedFiltercontainerAssetListEditUpdate").setVisible(
				false);
        sap.ui.getCore().getElementById("ButtonAdvancedSearchAssetListEditUpdate").setText(
				"Show Advanced Search Options");
    } else {
        sap.ui.getCore().getElementById("advancedFiltercontainerAssetListEditUpdate").setVisible(
				true);
        sap.ui.getCore().getElementById("ButtonAdvancedSearchAssetListEditUpdate").setText(
				"Hide Advanced Search Options");
    }
}

function buildAssetTableRowsAssetListEditUpdate() {
    

    SQLStatement = "select * from AssetSitesDetails where SITE='" +
	sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").getValue()+ "'";

    if (sap.ui.getCore().getElementById("Filter_PlantGroupEditUpdate").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND PLGRP='" + sap.ui.getCore().getElementById("Filter_PlantGroupEditUpdate").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_AssetTypeAssetListEditUpdate").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND ASSDESC='" + sap.ui.getCore().getElementById("Filter_AssetTypeAssetListEditUpdate").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Input_FuncLocAssetListEditUpdate").getValue() != "") {
        SQLStatement += " AND tplnr like'%" + sap.ui.getCore().getElementById("Input_FuncLocAssetListEditUpdate").getValue() + "%'";
    }
    if (sap.ui.getCore().getElementById("Filter_MakeAssetListEditUpdate").getSelectedItem() && sap.ui.getCore().getElementById("Filter_MakeAssetListEditUpdate").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND HERST='" + sap.ui.getCore().getElementById("Filter_MakeAssetListEditUpdate").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_ModelAssetListEditUpdate").getSelectedItem() && sap.ui.getCore().getElementById("Filter_ModelAssetListEditUpdate").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND MAPAR='" + sap.ui.getCore().getElementById("Filter_ModelAssetListEditUpdate").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_SystemCodeAssetListEditUpdate").getSelectedItem() != null && sap.ui.getCore().getElementById("Filter_SystemCodeAssetListEditUpdate").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND SYSDESC='" + sap.ui.getCore().getElementById("Filter_SystemCodeAssetListEditUpdate").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Input_FunctionalDescriptionAssetListEditUpdate").getValue() != "") {
        SQLStatement += " AND pltxt like'%" + sap.ui.getCore().getElementById("Input_FunctionalDescriptionAssetListEditUpdate").getValue() + "%' ";
    }
    if (sap.ui.getCore().getElementById("Input_EquipmentAssetListEditUpdate").getValue() != "") {
        SQLStatement += " AND EQUNR like'%" + sap.ui.getCore().getElementById("Input_EquipmentAssetListEditUpdate").getValue() + "%' ";
    }
    //opTable=sap.ui.getCore().getElementById('AssetSearchResultsAssetListEditUpdate')
    //opTable.destroyItems();
    html5sql.process(SQLStatement, function (transaction, results, rowsArray) {

        aDataTableAssetListEditUpdate = rowsArray;
        oModelTableAssetListEditUpdate.setData({
            modelData: aDataTableAssetListEditUpdate
        });
        oTableAssetListEditUpdate.setModel(oModelTableAssetListEditUpdate);

        oTableAssetListEditUpdate.bindRows("/modelData");
    }, function (error, statement) {
        alert(error)
    });

}

var assetSearchPanelAssetListEditUpdate = new sap.m.Panel("mainPanelAssetListEditUpdate", {

    content: [oFilterMatrixAssetListEditUpdate, advancedFiltercontainerAssetListEditUpdate, oTableAssetListEditUpdate] 

})

setColumnOrderAssetListEditUpdate();


function populateModelFilterAssetListEditUpdate() {

    var SQLStatement = "";

    SQLStatement = "select distinct mapar from AssetSitesDetails where SITE='" +
    sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").getValue();
    if (sap.ui.getCore().getElementById("Filter_MakeAssetListEditUpdate").getSelectedItem() && sap.ui.getCore().getElementById("Filter_MakeAssetListEditUpdate").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND HURST='" + sap.ui.getCore().getElementById("Filter_MakeAssetListEditUpdate").getSelectedItem().getKey() + "' ";
    }
    SQLStatement += "' Order by MAPAR";

    html5sql.process(SQLStatement, function (transaction,
            results, rowsArray) {

        for (var n = 0; n < rowsArray.length; n++) {
            item = rowsArray[n];
            sap.ui.getCore().getElementById(
                    "Filter_ModelAssetListEditUpdate").addItem(
                    new sap.ui.core.Item({
                        key: item.mapar,
                        text: item.mapar
                    }))
        }

    }, function (error, statement) {
    })

}

function addColumnAssetListEditUpdate(columnName, columnDisplayName, columnWidth) {
    oTableAssetListEditUpdate.addColumn(new sap.ui.table.Column({
        width: columnWidth,
        name: columnName,
        label: new sap.ui.commons.Label({
            text: columnDisplayName
        }),
        template: new sap.ui.commons.TextView().bindProperty("text", columnName),
        sortProperty: columnName,
        filterProperty: columnName
    }));
}
function changeColumnOrderAssetListEditUpdate(newpos, columnName, columnWidth) {
    var sqlstatement = "select ColumnNumber from AssetTableColumns where ColumnName='" + columnName + "'";

    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        if (rowsArray.length > 0) {
                            var oldpos = rowsArray[0].ColumnNumber;
                            if (newpos > oldpos) {
                                sqlstatement = "UPDATE AssetTableColumns SET  ColumnNumber = ColumnNumber  -1  WHERE ColumnNumber between " + (oldpos +1) + " AND " + newpos + ";";
                                sqlstatement += "UPDATE AssetTableColumns SET  ColumnNumber =" + newpos + ",ColumnWidth='" + ColumnWidth + "' WHERE ColumnName='" + columnName + "'";
                            }
                            else if (newpos < oldpos) {
                                sqlstatement = "UPDATE AssetTableColumns SET  ColumnNumber = ColumnNumber  +1  WHERE ColumnNumber between " + (oldpos -1) + " AND " + newpos + ";";
                                sqlstatement += "UPDATE AssetTableColumns SET  ColumnNumber =" + newpos + ",ColumnWidth='" + ColumnWidth + "' WHERE ColumnName='" + columnName + "'";
                            }

                            html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        console.log("Success");
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }
            );

                        }

                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }
            );
}
function setColumnOrderAssetListEditUpdate() {
    var sqlstatement = "select ColumnName,DisplayName,ColumnWidth from AssetTableColumns ORDER BY ColumnNumber";

    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        for (var i = 0; i < rowsArray.length; i++) {
                            addColumnAssetListEditUpdate(rowsArray[i].ColumnName, rowsArray[i].DisplayName, rowsArray[i].ColumnWidth)
                        }
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }
            );
}
function changeColumnWidthAssetListEditUpdate(columnName, columnWidth) {
    var sqlstatement =  "UPDATE AssetTableColumns SET ColumnWidth='" + columnWidth + "' WHERE ColumnName='" + columnName + "'";

    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) { }
                        ,
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }
            );
}


var oModelAssetListEditUpdate = new sap.ui.model.json.JSONModel();
var aDataAssetListEditUpdate;

var oModelHelpAssetListEditUpdate = new sap.ui.model.json.JSONModel();
var aDataHelpAssetListEditUpdate;

var itemTemplate = new sap.m.StandardListItem({
    title: "{site}",
    active: true
})
var oSelectDialogAssetListEditUpdate = new sap.m.SelectDialog("SiteDialogAssetListEditUpdate", {
    contentWidth: "600px",
    title: "Find Site",
    noDataText: "No Sites Found",
    search: [function (event) {
        handleSearch(event)
    }],
    confirm: [function (event) {
        handleValueHelpCloseAssetListEditUpdate(event)
    }],
    cancel: [function (event) {
        handleValueHelpCloseAssetListEditUpdate(event)
    }]
});
oSelectDialogAssetListEditUpdate.setModel(oModelHelpAssetListEditUpdate);
oSelectDialogAssetListEditUpdate.bindAggregation("items", "/modelData", itemTemplate);

var oItemTemplate1AssetListEditUpdate = new sap.ui.core.ListItem();
oItemTemplate1AssetListEditUpdate.bindProperty("text", "site");
oItemTemplate1AssetListEditUpdate.bindProperty("key", "site");
FilterSiteAssetListEditUpdate.bindAggregation("suggestionItems", "/modelData", oItemTemplate1AssetListEditUpdate);

function handleFilterSiteLiveChangeAssetListEditUpdate(evt) {

    if (evt.getParameter("newValue").length > 2) {
        var SQLStatement = "select distinct site,site from AssetSitesDetails WHERE site like '%" + evt.getParameter("newValue") + "%' order by site"
        html5sql.process(SQLStatement,
        function (transaction, results, rowsArray) {
            oModelAssetListEditUpdate.setSizeLimit(10000);
            aDataAssetListEditUpdate = rowsArray;
            oModelAssetListEditUpdate.setData({
                modelData: aDataAssetListEditUpdate
            });

            sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").setModel(oModelAssetListEditUpdate);
            FilterSiteAssetListEditUpdate.bindAggregation("suggestionItems", "/modelData", oItemTemplate1AssetListEditUpdate);
            ////sap.ui.getCore().getElementById("SyncSiteDataSite2").setModel(oModel);
            ////sap.ui.getCore().getElementById("SyncSiteDataSite3").setModel(oModel);
            ////sap.ui.getCore().getElementById("SyncSiteDataSite4").setModel(oModel);

            sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").setFilterFunction(function (sValue, oItem) {
                return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
            });
            //sap.ui.getCore().getElementById("SyncSiteDataSite2").setFilterFunction(function (sValue, oItem) {
            //    return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
            //});
            //sap.ui.getCore().getElementById("SyncSiteDataSite3").setFilterFunction(function (sValue, oItem) {
            //    return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
            //});
            //sap.ui.getCore().getElementById("SyncSiteDataSite4").setFilterFunction(function (sValue, oItem) {
            //    return oItem.getText().toUpperCase().indexOf(sValue.toUpperCase()) != -1;
            //});

        }, function (error, statement) {console.log (error) })
    }
}
function handleSearch(evt) {
    var sValue = evt.getParameter("value");
    var oFilter = new sap.ui.model.Filter(
        "site",
        sap.ui.model.FilterOperator.Contains, sValue
    );
    evt.getSource().getBinding("items").filter([oFilter]);
}

function handleValueHelpCloseAssetListEditUpdate(evt) {
    var oSelectedItem = evt.getParameter("selectedItem");
    if (oSelectedItem) {
        sap.ui.getCore().getElementById("Filter_SiteAssetListEditUpdate").setValue(oSelectedItem.getTitle());
        populateOtherFiltersAssetListEditUpdate()
    }
    //else {
    //    sap.ui.getCore().getElementById("SyncSiteDataSite1").setValue(currentSyncSiteDataSiteInputValue)
    //    //sap.ui.getCore().getElementById("SyncSiteDataSite1").setValue("")
    //}
    evt.getSource().getBinding("items").filter([]);
}
function populateHelpModelAssetListEditUpdate() {
    var SQLStatement = "select  distinct site,site from AssetSitesDetails  order by site"
    html5sql.process(SQLStatement,
    function (transaction, results, rowsArray) {
        oModelHelpAssetListEditUpdate.setSizeLimit(10000);
        aDataHelpAssetListEditUpdate = rowsArray;
        oModelHelpAssetListEditUpdate.setData({
            modelData: aDataHelpAssetListEditUpdate
        });

    }, function (error, statement) { })
}