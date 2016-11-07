jQuery.sap.require("sap.m.MessageBox");
var selectedAssetSearch;
var currentAssetRecord = new AssetRecord();
html5sql.openDatabase("com.aws.myjobs", "myjobs", 10 * 1024 * 1024);




function populateOtherFiltersAssetListParent() {
    currentAssetRecord.site = sap.ui.getCore().getElementById("Filter_SiteAssetListParent").getValue();
    var SQLStatement = "";

    sap.ui.getCore().getElementById("Filter_PlantGroupAssetListParent").destroyItems();
    sap.ui.getCore().getElementById("Filter_PlantGroupAssetListParent").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))
    defaultOutVal = "NOTSELECTED"
    sap.ui.getCore().getElementById("Filter_AssetTypeAssetListParent").destroyItems();
    sap.ui.getCore().getElementById("Filter_AssetTypeAssetListParent").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    sap.ui.getCore().getElementById("Filter_MakeAssetListParent").destroyItems();
    sap.ui.getCore().getElementById("Filter_MakeAssetListParent").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    

    sap.ui.getCore().getElementById("Filter_ModelAssetListParent").destroyItems();
    sap.ui.getCore().getElementById("Filter_ModelAssetListParent").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    sap.ui.getCore().getElementById("Filter_SystemCodeAssetListParent").destroyItems();
    sap.ui.getCore().getElementById("Filter_SystemCodeAssetListParent").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    var ToOutput = "";
    SQLStatement = "select distinct plgrp from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_SiteAssetListParent").getValue() + "' Order by plgrp";

    html5sql
			.process(
					SQLStatement,
					function (transaction, results, rowsArray) {

					    for (var n = 0; n < rowsArray.length; n++) {
					        item = rowsArray[n];
					        sap.ui.getCore()
									.getElementById("Filter_PlantGroupAssetListParent")
									.addItem(new sap.ui.core.Item({
									    key: item.plgrp,
									    text: item.plgrp
									}))
					    }

					    SQLStatement = "select distinct assdesc from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_SiteAssetListParent").getValue() + "' Order by assdesc";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_AssetTypeAssetListParent").addItem(
										new sap.ui.core.Item({
										    key: item.assdesc,
										    text: item.assdesc
										}))
					        }

					    }, function (error, statement) {
					    })

					    SQLStatement = "select distinct herst from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_SiteAssetListParent").getValue() + "' Order by HeRST";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_MakeAssetListParent").addItem(
										new sap.ui.core.Item({
										    key: item.herst,
										    text: item.herst
										}))
					        }

					    }, function (error, statement) {
					    })

					    SQLStatement = "select distinct sysdesc from AssetSitesDetails  where  SITE='" +
						sap.ui.getCore().getElementById("Filter_SiteAssetListParent").getValue() + "' Order by sysdesc";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_SystemCodeAssetListParent").addItem(
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

var oFilterMatrixAssetListParent = new sap.ui.commons.layout.MatrixLayout({
    width:"1024px",
    id: "FilterMatrixAssetListParent",
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

oFilterMatrixAssetListParent.createRow(labelSite, labelPlantGroup, labelAssetType,
		labFunctionalLocation);


var FilterSiteAssetListParent = new sap.m.Input('Filter_SiteAssetListParent', {
    text: currentAssetRecord.site
});
var oFilterPlantGroupAssetListParent = new sap.m.Select('Filter_PlantGroupAssetListParent', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) { }
});
var oFilterAssetTypeAssetListParent = new sap.m.Select('Filter_AssetTypeAssetListParent', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) { }
});
var oFilterFuncLoc = new sap.m.Input('Input_FuncLocAssetListParent', {
    maxLength: 30,
    width: "200px",
    items: [],
    change: function (oControlEvent) { }
});

//var oFilterFuncLoc = new sap.ui.core.HTML('Input_FuncLocAssetListParent',{
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

var btnAdvancedSearch=new sap.m.Button('ButtonAdvancedSearchAssetListParent', {
    text: "Show Advanced Search Options",
    type: sap.m.ButtonType.Emphasized,
    press: function () {
       
        setAdvancedFilterVisibilityAssetListParent();
    }
})
oFilterMatrixAssetListParent.createRow(FilterSiteAssetListParent, oFilterPlantGroupAssetListParent, oFilterAssetTypeAssetListParent,
		oFilterFuncLoc);
oFilterMatrixAssetListParent.createRow("","","",btnAdvancedSearch)


var oAdvancedFilterMatrixAssetListParentAssetListParent = new sap.ui.commons.layout.MatrixLayout({
    id: "AdvancedFilterMatrixAssetListParent",
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
oAdvancedFilterMatrixAssetListParentAssetListParent.createRow(lab1, lab2, lab3);

var FilterMakeAssetListParent = new sap.m.Select('Filter_MakeAssetListParent', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) {
        populateModelFilterAssetListParent()
    }
});
var FilterModelAssetListParent = new sap.m.Select('Filter_ModelAssetListParent', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) {
    }
});
var FilterSystemCodeAssetListParent = new sap.m.Select('Filter_SystemCodeAssetListParent', {
    width: "200px",
    items: [],
    change: function (oControlEvent) {
    }
});

oAdvancedFilterMatrixAssetListParentAssetListParent.createRow(FilterMakeAssetListParent, FilterModelAssetListParent, FilterSystemCodeAssetListParent);

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
oAdvancedFilterMatrixAssetListParentAssetListParent.createRow(oCell1, oCell2);

var oCell3 = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2
});
var oCell4 = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2
});
var inputFunctionalDescription = new sap.m.Input("Input_FunctionalDescriptionAssetListParent",
		{
		    maxLength: 40,
		    width: "500px",
		    type: sap.m.InputType.Input,
		    enabled: true
		});
var inputEquipment = new sap.m.Input("Input_EquipmentAssetListParent", {
    maxLength: 18,
    width: "500px",
    type: sap.m.InputType.Input,
    enabled: true
});
oCell3.addContent(inputFunctionalDescription);
oCell4.addContent(inputEquipment);
oAdvancedFilterMatrixAssetListParentAssetListParent.createRow(oCell3, oCell4);




var oTableAssetListParent = new sap.ui.table.Table({

    title: "",
    visibleRowCount: 10,

    selectionMode: sap.ui.table.SelectionMode.Single,
    selectionBehavior: sap.ui.table.SelectionBehavior.RowOnly,
    rowSelectionChange: function (e) {
        var idx = e.getParameter('rowIndex');
        if (idx > -1) {
            var cxt = oTableAssetListParent.getContextByIndex(idx);
            var path = cxt.sPath;
            var obj = oTableAssetListParent.getModel().getProperty(path);

            currentAssetRecord.pkid = obj.id;
            //currentAssetRecord.zascatAssetCategory = obj.ZASCAT;
           // currentAssetRecord.zproctyp = obj.ZPROCTYP;
            //currentAssetRecord.make = obj.herst;
          //  currentAssetRecord.model = obj.mapar;
            /*currentAssetRecord.functionTypeZNCDESC = obj.ncdesc;*/
            currentAssetRecord.originalZinsLocDesc = obj.tplnr;
            currentAssetRecord.zinsLocDesc = obj.tplnr;
           // currentAssetRecord.zinsLocDesc1 = obj.ZINSLOCDESC1;
           // currentAssetRecord.zinsLocDesc2 = obj.ZINSLOCDESC2;
           // currentAssetRecord.zinsLocDesc3 = obj.ZINSLOCDESC3;
           /* currentAssetRecord.AssetDescriptionZASSDESC = obj.assdesc;*/
           // currentAssetRecord.ZotDef = obj.ZOTDEF;
            currentAssetRecord.inbdtInstallDate = obj.zinbdt == "00000000" ? "" : obj.zinbdt;// "00000000";;
          /*  currentAssetRecord.zzAssetTag = obj.asstag;*/
           /* currentAssetRecord.sergeSerialNumber = obj.serge;*/
            //currentAssetRecord.zcomments1 = obj.ZCOMMENTS1;
            //currentAssetRecord.zcomments2 = obj.ZCOMMENTS2;
            //currentAssetRecord.z_gpsNmea = obj.Z_GPSNMEA;
            currentAssetRecord.zsysDescSystemCodeDescription = obj.sysdesc;
          /*  currentAssetRecord.equipmentTypeDescriptionZOTDESC = obj.otdesc;*/


            //build FunctionalLocationString
            //Site-ProcessGroup-Zplgrp-Zsyscode-SystemCodeId-Zzfl_nc.substring(2)-FunctionTypeItemId
            //ELMASP-2A-PUM-PS01-NRV001

            currentAssetRecord.site = obj.site;
            currentAssetRecord.processGroupZPRG = obj.tplnr.substring(7, 9);
            currentAssetRecord.plantGroupCodeZplgrp = obj.tplnr.substring(10, 13)
            currentAssetRecord.SystemCodeZSYSCODE = obj.tplnr.substring(14, 16);
            //currentAssetRecord.SystemCodeNumber = obj.tplnr.substring(16, 18);
            // currentAssetRecord.funcLocSub19_22zzfl_nc = obj.ZINSTLOCN.substring(19, 22)//Zzfl_nc is 6 chars wide, but we only use the last 3 in the func loc string
            currentAssetRecord.zzfl_nc = obj.zfl_nc;
            //currentAssetRecord.zzfl_nc = obj.tplnr.substring(19, 22);
            //currentAssetRecord.funcLocSub22_3FunctionTypeItemNumber = obj.tplnr.substring(22, 25);
            currentAssetRecord.plantGroupDescriptionZPLGDESC = obj.plgrp;
            currentAssetRecord.funcLocStringZINSTLOCN = obj.tplnr;
            currentAssetRecord.originalFuncLocStringZINSTLOCN = obj.tplnr;
          /*  currentAssetRecord.AssetDescriptionZASSDESC = obj.assdesc;
            currentAssetRecord.ZASSTYPE = obj.asstype;*/
            //currentAssetRecord.equipmentTypeCodeZZEQPT_EGI = obj.eqart;
            //currentAssetRecord.EquipmentDescriptionEQKTU = obj.eqktx;
            /*currentAssetRecord.EQUNR = obj.equnr;
            currentAssetRecord.ZIWERK = obj.iwerk;
            currentAssetRecord.STATUS = obj.status;
            currentAssetRecord.maintenancePlantZSWERK = obj.swerk;*/

        }
    }
    , columnMove: function (e) {

        var myNewPos = e.getParameter('newPos');

        var mycolumnName = e.getParameter('column').mProperties.name;
        var mycolumnWidth = e.getParameter('column').mProperties.width;

        changeColumnOrder(myNewPos, mycolumnName, mycolumnWidth)
    },
    columnResize: function (e) {

        var mycolumnName = e.getParameter('column').mProperties.name;
        var mycolumnWidth = e.mParameters.width;

        changeColumnWidth(mycolumnName, mycolumnWidth)
    }
});

setColumnOrderAssetListParent();

// Create a model and bind the table rows to this model
var oModelTableAssetListParent = new sap.ui.model.json.JSONModel();
var aDataTableAssetListParent;

// Initially sort the table
oTableAssetListParent.sort(oTableAssetListParent.getColumns()[0]);




var advancedFiltercontainerAssetListParent = new sap.m.Panel("advancedFiltercontainerAssetListParent", {
    visible: false,
    content: [oAdvancedFilterMatrixAssetListParentAssetListParent]

})

function setAdvancedFilterVisibilityAssetListParent() {
    if (sap.ui.getCore().getElementById("advancedFiltercontainerAssetListParent").getVisible() == true) {
        sap.ui.getCore().getElementById("advancedFiltercontainerAssetListParent").setVisible(
				false);
        sap.ui.getCore().getElementById("ButtonAdvancedSearchAssetListParent").setText(
				"Show Advanced Search Options");
    } else {
        sap.ui.getCore().getElementById("advancedFiltercontainerAssetListParent").setVisible(
				true);
        sap.ui.getCore().getElementById("ButtonAdvancedSearchAssetListParent").setText(
				"Hide Advanced Search Options");
    }
}

function buildAssetTableRowsAssetListParent() {
    

    SQLStatement = "select * from AssetSitesDetails where SITE='" +
	sap.ui.getCore().getElementById("Filter_SiteAssetListParent").getValue()+ "'";

    if (sap.ui.getCore().getElementById("Filter_PlantGroupAssetListParent").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND PLGRP='" + sap.ui.getCore().getElementById("Filter_PlantGroupAssetListParent").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_AssetTypeAssetListParent").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND ASSDESC='" + sap.ui.getCore().getElementById("Filter_AssetTypeAssetListParent").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Input_FuncLocAssetListParent").getValue() != "") {
        SQLStatement += " AND tplnr like'%" + sap.ui.getCore().getElementById("Input_FuncLocAssetListParent").getValue() + "%'";
    }
    if (sap.ui.getCore().getElementById("Filter_MakeAssetListParent").getSelectedItem() && sap.ui.getCore().getElementById("Filter_MakeAssetListParent").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND HERST='" + sap.ui.getCore().getElementById("Filter_MakeAssetListParent").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_ModelAssetListParent").getSelectedItem() && sap.ui.getCore().getElementById("Filter_ModelAssetListParent").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND MAPAR='" + sap.ui.getCore().getElementById("Filter_ModelAssetListParent").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_SystemCodeAssetListParent").getSelectedItem() != null && sap.ui.getCore().getElementById("Filter_SystemCodeAssetListParent").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND SYSDESC='" + sap.ui.getCore().getElementById("Filter_SystemCodeAssetListParent").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Input_FunctionalDescriptionAssetListParent").getValue() != "") {
        SQLStatement += " AND pltxt like'%" + sap.ui.getCore().getElementById("Input_FunctionalDescriptionAssetListParent").getValue() + "%' ";
    }
    if (sap.ui.getCore().getElementById("Input_EquipmentAssetListParent").getValue() != "") {
        SQLStatement += " AND EQUNR like'%" + sap.ui.getCore().getElementById("Input_EquipmentAssetListParent").getValue() + "%' ";
    }
    //opTable=sap.ui.getCore().getElementById('AssetSearchResultsAssetListParent')
    //opTable.destroyItems();
    html5sql.process(SQLStatement, function (transaction, results, rowsArray) {

        aDataTableAssetListParent = rowsArray;
        oModelTableAssetListParent.setData({
            modelData: aDataTableAssetListParent
        });
        oTableAssetListParent.setModel(oModelTableAssetListParent);

        oTableAssetListParent.bindRows("/modelData");
    }, function (error, statement) {
        alert(error)
    });

}

var mainPanelAssetListParent = new sap.m.Panel("mainPanelAssetListParent", {

    content: [oFilterMatrixAssetListParent, advancedFiltercontainerAssetListParent, oTableAssetListParent] 

})


var formAssetListParent = new sap.m.Dialog("formAssetListParent_AssetListParent", {
    horizontalScrolling: false,
    verticalScrolling: false,
    modal: true,
    contentWidth: "1em",
    buttons: [
			new sap.m.Button({
			    text: "Cancel",
			    type: sap.m.ButtonType.Accept,
			    tap: [function (oEvt) {
			        formAssetListParent.close()
			    }]
			}),
            new sap.m.Button({
                text: "OK",
                type: sap.m.ButtonType.Accept,
                tap: [function (oEvt) {
                    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").setSelectedKey(currentAssetRecord.plantGroupCodeZplgrp);
                    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").setSelectedKey(currentAssetRecord.SystemCodeZSYSCODE);
                    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").setEnabled(false);
                    sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_SystemCode").setEnabled(false);
                    setPlantGroupLongTextCreateAssetStep2Support();
                    setSystemCodeLongTextCreateAssetStep2Support();
                    currentAssetRecord.funcLocStringZINSTLOCN = getFunctionalLocationString();
                    //generateNextItemID(function () {
                        createAssetStep2SupportValidateControls();
                    //});
                    formAssetListParent.close();
                }]
            }),
              new sap.m.Button({
                  text: "Search",
                  type: sap.m.ButtonType.Accept,
                  tap: [function (oEvt) {

                      buildAssetTableRowsAssetListParent()
                  }]
              }),
            new sap.m.Button({
                text: "Not Applicable",
                type: sap.m.ButtonType.Accept,
                tap: [function (oEvt) {
                	sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").setEnabled(true);
                    currentAssetRecord.EQUNR = "NotApplicable";
                    formAssetListParent.close()
                }]
            }),
            new sap.m.Button({
                text: "Not Found",
                type: sap.m.ButtonType.Accept,
                tap: [function (oEvt) {
                	sap.ui.getCore().getElementById("CreateAssetStep2SupportFilter_PlantGroup").setEnabled(true);
                    currentAssetRecord.EQUNR = "NotFound"
                    formAssetListParent.close()
                }]
            })

    ],
    content: [mainPanelAssetListParent],
    contentWidth: "100%",
    contentHeight: "100%",
    beforeOpen: function () {
    	
    },

    afterOpen: function () {
        
        sap.ui.getCore().getElementById("Filter_SiteAssetListParent")
					.setValue(currentAssetRecord.site);
        buildAssetTableRowsAssetListParent();
        populateOtherFiltersAssetListParent();
    },
    beforeClose: function () {
        try {

        } catch (err) {
        }
    }

})


function populateModelFilterAssetListParent() {

    var SQLStatement = "";

    SQLStatement = "select distinct mapar from AssetSitesDetails where SITE='" +
    sap.ui.getCore().getElementById("Filter_SiteAssetListParent").getValue()+"' ";
    if (sap.ui.getCore().getElementById("Filter_MakeAssetListParent").getSelectedItem() && sap.ui.getCore().getElementById("Filter_MakeAssetListParent").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += "AND HERST='" + sap.ui.getCore().getElementById("Filter_MakeAssetListParent").getSelectedItem().getKey() + "' ";
    }
    SQLStatement += "Order by mapar";

    html5sql.process(SQLStatement, function (transaction,
            results, rowsArray) {

        for (var n = 0; n < rowsArray.length; n++) {
            item = rowsArray[n];
            sap.ui.getCore().getElementById(
                    "Filter_ModelAssetListParent").addItem(
                    new sap.ui.core.Item({
                        key: item.mapar,
                        text: item.mapar
                    }))
        }

    }, function (error, statement) {
    })

}








function addColumnAssetListParent(columnName, columnDisplayName, columnWidth) {
    oTableAssetListParent.addColumn(new sap.ui.table.Column({
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



function changeColumnOrderAssetListParent(newpos, columnName, columnWidth) {
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
function setColumnOrderAssetListParent() {
    var sqlstatement = "select ColumnName,DisplayName,ColumnWidth from AssetTableColumns ORDER BY ColumnNumber";

    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        for (var i = 0; i < rowsArray.length; i++) {
                        	addColumnAssetListParent(rowsArray[i].ColumnName, rowsArray[i].DisplayName, rowsArray[i].ColumnWidth)
                        }
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }
            );
}


function changeColumnWidthAssetListParent(columnName, columnWidth) {
    var sqlstatement =  "UPDATE AssetTableColumns SET ColumnWidth='" + columnWidth + "' WHERE ColumnName='" + columnName + "'";

    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) { }
                        ,
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }
            );
}

