jQuery.sap.require("sap.m.MessageBox");
var selectedAssetSearch;
var currentAssetRecord = new AssetRecord();
html5sql.openDatabase("com.aws.myjobs","myjobs", 5*1024*1024);	


function populateSiteFilter() {

    var SQLStatement = "";

    sap.ui.getCore().getElementById("Filter_Site").destroyItems();
    sap.ui.getCore().getElementById("Filter_Site").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: 'Please Select'
			}))

    var ToOutput = "";
    SQLStatement = "select distinct site from AssetSitesDetails order by site"

    html5sql.process(SQLStatement, function (transaction, results, rowsArray) {

        for (var n = 0; n < rowsArray.length; n++) {
            item = rowsArray[n];
            sap.ui.getCore().getElementById("Filter_Site").addItem(
					new sap.ui.core.Item({
					    key: item.site,
					    text: item.site
					}))
        }

        SQLStatement = "select site from AssetSitesDetails order by site"
    }, function (error, statement) {
    })

}
function populateOtherFilters() {
    currentAssetRecord.site = sap.ui.getCore().getElementById("Filter_Site").getValue();
    var SQLStatement = "";

    sap.ui.getCore().getElementById("Filter_PlantGroup").destroyItems();
    sap.ui.getCore().getElementById("Filter_PlantGroup").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))
    defaultOutVal = "NOTSELECTED"
    sap.ui.getCore().getElementById("Filter_AssetType").destroyItems();
    sap.ui.getCore().getElementById("Filter_AssetType").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    sap.ui.getCore().getElementById("Filter_Make").destroyItems();
    sap.ui.getCore().getElementById("Filter_Make").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    

    sap.ui.getCore().getElementById("Filter_Model").destroyItems();
    sap.ui.getCore().getElementById("Filter_Model").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    sap.ui.getCore().getElementById("Filter_SystemCode").destroyItems();
    sap.ui.getCore().getElementById("Filter_SystemCode").addItem(
			new sap.ui.core.Item({
			    key: "NOTSELECTED",
			    text: ''
			}))

    var ToOutput = "";
    SQLStatement = "select distinct plgrp from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_Site").getValue() + "' Order by plgrp";

    html5sql
			.process(
					SQLStatement,
					function (transaction, results, rowsArray) {

					    for (var n = 0; n < rowsArray.length; n++) {
					        item = rowsArray[n];
					        sap.ui.getCore()
									.getElementById("Filter_PlantGroup")
									.addItem(new sap.ui.core.Item({
									    key: item.plgrp,
									    text: item.plgrp
									}))
					    }

					    SQLStatement = "select distinct assdesc from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_Site").getValue() + "' Order by assdesc";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_AssetType").addItem(
										new sap.ui.core.Item({
										    key: item.assdesc,
										    text: item.assdesc
										}))
					        }

					    }, function (error, statement) {
					    })

					    SQLStatement = "select distinct herst from AssetSitesDetails where SITE='" +
						sap.ui.getCore().getElementById("Filter_Site").getValue() + "' Order by HeRST";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_Make").addItem(
										new sap.ui.core.Item({
										    key: item.herst,
										    text: item.herst
										}))
					        }

					    }, function (error, statement) {
					    })

					    SQLStatement = "select distinct sysdesc from AssetSitesDetails  where  SITE='" +
						sap.ui.getCore().getElementById("Filter_Site").getValue() + "' Order by sysdesc";
					    html5sql.process(SQLStatement, function (transaction,
								results, rowsArray) {

					        for (var n = 0; n < rowsArray.length; n++) {
					            item = rowsArray[n];
					            sap.ui.getCore().getElementById(
										"Filter_SystemCode").addItem(
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

var oFilterMatrix = new sap.ui.commons.layout.MatrixLayout({
    width:"1024px",
    id: "FilterMatrix",
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

oFilterMatrix.createRow(labelSite, labelPlantGroup, labelAssetType,
		labFunctionalLocation);

/*var oFilterSite = new sap.m.Select('Filter_Site', {
    width: "200px",
    items: [],
    change: function (oControlEvent) {
        populateOtherFilters()
    }
});*/
var SyncSiteDataSiteInput1 = new sap.m.Input('Filter_Site', {
    liveChange: function (event) {
        handleSyncSiteDataSiteLiveChange1(event);
    },
    //change: function (event) {
    //    handleSyncSiteDataSite1Change(event);
    //},
    placeholder: "Type three characters to start searching...",
    showSuggestion: true,
    startSuggestion: 3,
    showValueHelp: true,
    valueHelpRequest: function () {
        oSelectDialog1.open(sap.ui.getCore().getElementById("Filter_Site").getValue());

        var oDialogDOM = oSelectDialog1.$();
        var oSearchFieldDOM = oDialogDOM.find('.sapMSF');
        var oSFID = oSearchFieldDOM[0].id;
        var oSearchField = sap.ui.getCore().byId(oSFID);
        oSearchField.fireSearch();
    }
});
var oFilterPlantGroup = new sap.m.Select('Filter_PlantGroup', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) { }
});
var oFilterAssetType = new sap.m.Select('Filter_AssetType', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) { }
});
var oFilterFuncLoc = new sap.m.Input('Input_FuncLoc', {
    maxLength: 30,
    width: "200px",
    items: [],
    change: function (oControlEvent) { }
});

//var oFilterFuncLoc = new sap.ui.core.HTML('Input_FuncLoc',{
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

var btnAdvancedSearch=new sap.m.Button('ButtonAdvancedSearch', {
    text: "Show Advanced Search Options",
    type: sap.m.ButtonType.Emphasized,
    press: function () {
       
        setAdvancedFilterVisibility();
    }
})
oFilterMatrix.createRow(SyncSiteDataSiteInput1, oFilterPlantGroup, oFilterAssetType,
		oFilterFuncLoc);
oFilterMatrix.createRow("","","",btnAdvancedSearch)


var oAdvancedFilterMatrix = new sap.ui.commons.layout.MatrixLayout({
    id: "AdvancedFilterMatrix",
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
oAdvancedFilterMatrix.createRow(lab1, lab2, lab3);

var oImage1AssetList = new sap.m.Select('Filter_Make', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) {
        populateModelFilter()
    }
});
var oImage2AssetList = new sap.m.Select('Filter_Model', {
    width: "200px",
    items: [new sap.ui.core.Item({
        key: "NOTSELECTED",
        text: ''
    })],
    change: function (oControlEvent) {
    }
});
var oImage3AssetList = new sap.m.Select('Filter_SystemCode', {
    width: "200px",
    items: [],
    change: function (oControlEvent) {
    }
});

oAdvancedFilterMatrix.createRow(oImage1AssetList, oImage2AssetList, oImage3AssetList);

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
oAdvancedFilterMatrix.createRow(oCell1, oCell2);

var oCell3 = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2
});
var oCell4 = new sap.ui.commons.layout.MatrixLayoutCell({
    colSpan: 2
});
var inputFunctionalDescription = new sap.m.Input("Input_FunctionalDescription",
		{
		    maxLength: 40,
		    width: "500px",
		    type: sap.m.InputType.Input,
		    enabled: true
		});
var inputEquipment = new sap.m.Input("Input_Equipment", {
    maxLength: 18,
    width: "500px",
    type: sap.m.InputType.Input,
    enabled: true
});
oCell3.addContent(inputFunctionalDescription);
oCell4.addContent(inputEquipment);
oAdvancedFilterMatrix.createRow(oCell3, oCell4);




searchResults=		                     new sap.m.Table("AssetSearchResults",{
		                           mode: sap.m.ListMode.SingleSelectMaster,
		                           selectionChange: function(evt){
		                        	   //console.log(sap.ui.getCore().getElementById("BookToAsset").getPressed())     
		                                  selectedAssetSearch=evt.getParameter("listItem").getId()
		                                 
		                                 /* x=selectedAssetSearch.split(":")
		                                  if(sap.ui.getCore().getElementById("BookToAsset").getPressed()){
		                                	  y=x[1].split("-");
		                                	  x[1]=y[0]+"-"+y[1]+"-"+y[2]
		                                	  x[2]=""
		                                  }
		                                  if(SearchMode=="NOTIF"){
		                                  	sap.ui.getCore().byId('NewFuncLoc').setValue(x[1])
		                                  	sap.ui.getCore().byId('NewEquipment').setValue(x[2])
		                                  }
		                                  if(SearchMode=="CLOSE"){
		                                	
		                                  	sap.ui.getCore().byId('Close_FunctionalLocation').setValue(x[1])
		                                  	sap.ui.getCore().byId('Close_Equipment').setValue(x[2])
		                                  	}
		                                  formSearchAsset.close()*/
		                         },
		                           columns:[
		                                    new sap.m.Column({header: new sap.m.Label({text:"Plant Group"}),
		                                          hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: false}),
		                                    new sap.m.Column({header: new sap.m.Label({text:"Asset Type"}),
		                                          hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
		                                    new sap.m.Column({header: new sap.m.Label({text:"Functional Location"}),
		                                          hAlign: 'Left',width: '19%',minScreenWidth : "" , demandPopin: false}),
		                                    new sap.m.Column({header: new sap.m.Label({text:"Description"}),
		                                          hAlign: 'Left',width: '20%',minScreenWidth : "" , demandPopin: true}),
		                                    new sap.m.Column({header: new sap.m.Label({text:"Equipment"}),
		                                          hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: false}),
		                                    new sap.m.Column({header: new sap.m.Label({text:"Make"}),
		                                          hAlign: 'Left',width: '8%',minScreenWidth : "" , demandPopin: true}),
		                                    new sap.m.Column({header: new sap.m.Label({text:"Model"}),
		                                          hAlign: 'Right',width: '8%',minScreenWidth : "" , demandPopin: true })                                
		                                 ]
		                     })





var advancedFiltercontainer = new sap.m.Panel("advancedFiltercontainer", {
    visible: false,
    content: [oAdvancedFilterMatrix]

})

function setAdvancedFilterVisibility() {
    if (sap.ui.getCore().getElementById("advancedFiltercontainer").getVisible() == true) {
        sap.ui.getCore().getElementById("advancedFiltercontainer").setVisible(
				false);
        sap.ui.getCore().getElementById("ButtonAdvancedSearch").setText(
				"Show Advanced Search Options");
    } else {
        sap.ui.getCore().getElementById("advancedFiltercontainer").setVisible(
				true);
        sap.ui.getCore().getElementById("ButtonAdvancedSearch").setText(
				"Hide Advanced Search Options");
    }
}

function buildAssetTableRows() {
    

    SQLStatement = "select * from AssetSitesDetails where SITE='" +
	sap.ui.getCore().getElementById("Filter_Site").getValue()+ "'";

    if (sap.ui.getCore().getElementById("Filter_PlantGroup").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND PLGRP='" + sap.ui.getCore().getElementById("Filter_PlantGroup").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_AssetType").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND ASSDESC='" + sap.ui.getCore().getElementById("Filter_AssetType").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Input_FuncLoc").getValue() != "") {
        SQLStatement += " AND tplnr like'%" + sap.ui.getCore().getElementById("Input_FuncLoc").getValue() + "%'";
    }
    if (sap.ui.getCore().getElementById("Filter_Make").getSelectedItem() && sap.ui.getCore().getElementById("Filter_Make").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND HERST='" + sap.ui.getCore().getElementById("Filter_Make").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_Model").getSelectedItem() && sap.ui.getCore().getElementById("Filter_Model").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND MAPAR='" + sap.ui.getCore().getElementById("Filter_Model").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Filter_SystemCode").getSelectedItem() != null && sap.ui.getCore().getElementById("Filter_SystemCode").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND SYSDESC='" + sap.ui.getCore().getElementById("Filter_SystemCode").getSelectedItem().getKey() + "' ";
    }
    if (sap.ui.getCore().getElementById("Input_FunctionalDescription").getValue() != "") {
        SQLStatement += " AND pltxt like'%" + sap.ui.getCore().getElementById("Input_FunctionalDescription").getValue() + "%' ";
    }
    if (sap.ui.getCore().getElementById("Input_Equipment").getValue() != "") {
        SQLStatement += " AND EQUNR like'%" + sap.ui.getCore().getElementById("Input_Equipment").getValue() + "%' ";
    }
    opTable=sap.ui.getCore().getElementById('AssetSearchResults')
    opTable.destroyItems();
    html5sql.process(SQLStatement, function (transaction, results, rowsArray) {
		
		for (var n = 0; n < rowsArray.length; n++) {
            opTable.addItem (new sap.m.ColumnListItem("Asset"+n+":"+rowsArray[n].tplnr+":"+rowsArray[n].equnr,{
                
                cells : 
                       [
                       new sap.m.Text({text: rowsArray[n].plgrp}),
                       new sap.m.Text({text: rowsArray[n].asstype}),  
                       new sap.m.Text({text: rowsArray[n].tplnr}),
                       new sap.m.Text({text: rowsArray[n].assdesc}), 
                       new sap.m.Text({text: rowsArray[n].herst}),
                       new sap.m.Text({text: rowsArray[n].mapar}) 
                       ]
                }));
		}
    }, function (error, statement) {
        alert(error)
    });

}

var assetSearchPanel = new sap.m.Panel("mainPanel", {

    content: [oFilterMatrix,advancedFiltercontainer, searchResults] //oTable]

})



function populateModelFilter() {

    var SQLStatement = "";

    SQLStatement = "select distinct mapar from AssetSitesDetails where SITE='" +
    sap.ui.getCore().getElementById("Filter_Site").getValue();
    if (sap.ui.getCore().getElementById("Filter_Make").getSelectedItem() && sap.ui.getCore().getElementById("Filter_Make").getSelectedItem().getKey() != "NOTSELECTED") {
        SQLStatement += " AND HURST='" + sap.ui.getCore().getElementById("Filter_Make").getSelectedItem().getKey() + "' ";
    }
    SQLStatement += "' Order by MAPAR";

    html5sql.process(SQLStatement, function (transaction,
            results, rowsArray) {

        for (var n = 0; n < rowsArray.length; n++) {
            item = rowsArray[n];
            sap.ui.getCore().getElementById(
                    "Filter_Model").addItem(
                    new sap.ui.core.Item({
                        key: item.mapar,
                        text: item.mapar
                    }))
        }

    }, function (error, statement) {
    })

}









function addColumn(columnName, columnDisplayName,columnWidth) {
 
}



function changeColumnOrder(newpos, columnName,columnWidth) {
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
function setColumnOrder() {
    var sqlstatement = "select ColumnName,DisplayName,ColumnWidth from AssetTableColumns ORDER BY ColumnNumber";

    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) {
                        for (var i = 0; i < rowsArray.length; i++) {
                            addColumn(rowsArray[i].ColumnName, rowsArray[i].DisplayName, rowsArray[i].ColumnWidth)
                        }
                    },
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }
            );
}


function changeColumnWidth( columnName, columnWidth) {
    var sqlstatement =  "UPDATE AssetTableColumns SET ColumnWidth='" + columnWidth + "' WHERE ColumnName='" + columnName + "'";

    html5sql.process(sqlstatement,
                    function (transaction, results, rowsArray) { }
                        ,
                     function (error, statement) {
                         opMessage("Error: " + error.message + " when processing " + statement);
                     }
            );
}


var oModel = new sap.ui.model.json.JSONModel();
var aData;

var oModelSyncSiteDataHelp = new sap.ui.model.json.JSONModel();
var aDataSyncSiteDataHelp;

var itemTemplate = new sap.m.StandardListItem({
    title: "{site}",
    active: true
})
var oSelectDialog1 = new sap.m.SelectDialog("SiteDialog1", {
    contentWidth: "600px",
    title: "Find Site",
    noDataText: "No Sites Found",
    search: [function (event) {
        handleSearch(event)
    }],
    confirm: [function (event) {
        handleValueHelpCloseSyncSiteDataSite1(event)
    }],
    cancel: [function (event) {
        handleValueHelpCloseSyncSiteDataSite1(event)
    }]
});
oSelectDialog1.setModel(oModelSyncSiteDataHelp);
oSelectDialog1.bindAggregation("items", "/modelData", itemTemplate);

var oItemTemplate1 = new sap.ui.core.ListItem();
oItemTemplate1.bindProperty("text", "site");
oItemTemplate1.bindProperty("key", "site");
SyncSiteDataSiteInput1.bindAggregation("suggestionItems", "/modelData", oItemTemplate1);

function handleSyncSiteDataSiteLiveChange1(evt) {

    if (evt.getParameter("newValue").length > 2) {
        var SQLStatement = "select distinct site,site from AssetSitesDetails WHERE site like '%" + evt.getParameter("newValue") + "%' order by site"
        html5sql.process(SQLStatement,
        function (transaction, results, rowsArray) {
            oModel.setSizeLimit(10000);
            aData = rowsArray;
            oModel.setData({
                modelData: aData
            });

            sap.ui.getCore().getElementById("Filter_Site").setModel(oModel);
            SyncSiteDataSiteInput1.bindAggregation("suggestionItems", "/modelData", oItemTemplate1);
            ////sap.ui.getCore().getElementById("SyncSiteDataSite2").setModel(oModel);
            ////sap.ui.getCore().getElementById("SyncSiteDataSite3").setModel(oModel);
            ////sap.ui.getCore().getElementById("SyncSiteDataSite4").setModel(oModel);

            sap.ui.getCore().getElementById("Filter_Site").setFilterFunction(function (sValue, oItem) {
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

        }, function (error, statement) { })
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

function handleValueHelpCloseSyncSiteDataSite1(evt) {
    var oSelectedItem = evt.getParameter("selectedItem");
    if (oSelectedItem) {
        sap.ui.getCore().getElementById("Filter_Site").setValue(oSelectedItem.getTitle());
        populateOtherFilters()
    }
    //else {
    //    sap.ui.getCore().getElementById("SyncSiteDataSite1").setValue(currentSyncSiteDataSiteInputValue)
    //    //sap.ui.getCore().getElementById("SyncSiteDataSite1").setValue("")
    //}
    evt.getSource().getBinding("items").filter([]);
}
function populateSyncSiteDataHelpModel() {
    var SQLStatement = "select  distinct site,site from AssetSitesDetails  order by site"
    html5sql.process(SQLStatement,
    function (transaction, results, rowsArray) {
        oModelSyncSiteDataHelp.setSizeLimit(10000);
        aDataSyncSiteDataHelp = rowsArray;
        oModelSyncSiteDataHelp.setData({
            modelData: aDataSyncSiteDataHelp
        });

    }, function (error, statement) { })
}