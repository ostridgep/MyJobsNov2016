var currentPage=1;
var rowsPerPage=20;
var totalRecords=0;
var selectedTableName="MyOrders";
var totalPages=1;
var TotalColumns;

function nextPage(){
	if (currentPage<totalPages){
		currentPage+=1;
		buildRows();
		}
		
}
function prevPage(){
	if (currentPage>1){
		currentPage-=1;
		buildRows();
		}

}
function lastPage(){
	if (currentPage<totalPages){
		currentPage=totalPages;
		buildRows();
		}

}
function firstPage(){
	
		currentPage=1;
		buildRows();


}

function buildRows(){

var n = 0;
var opTable = sap.ui.getCore().getElementById('DBTable');

var startRec=(currentPage-1)*rowsPerPage;

sap.ui.getCore().getElementById('pageDetails').setText(currentPage+" of "+totalPages)
//alert('SELECT * FROM '+selectedTableName+' LIMIT '+startRec+', '+rowsPerPage+";")
	html5sql.process('SELECT * FROM '+selectedTableName+' LIMIT '+startRec+', '+rowsPerPage+";",
			 function(transaction, results, rowsArray){
				opTable.destroyItems();
			
				while (n < rowsArray.length) {
					
					item=rowsArray[n]
					opTable.addItem (new sap.m.ColumnListItem("tr"+n,{
						
						}));
					
					for (var prop in item) {
						if(item.hasOwnProperty(prop)){						
							sap.ui.getCore().getElementById("tr"+n).addCell(new sap.m.Text({text: item[prop]}))
							}
				        }
					
					
					n++;
				 }

			 },
			 function(error, statement){
				alert(error)
			 }        
			);	

	
}
var tabNames=new sap.m.Select('TableNames',{
	



	change: function(oControlEvent) {
		selectedTableName=oControlEvent.getParameter("selectedItem").getKey()
		BuildHeaders(selectedTableName)
	}
});
function getTotalRecords()
{
	
	totalRecords=0;
	html5sql.process(
		['SELECT * FROM '+selectedTableName],
		function(transaction, results, rowsArray){

			totalRecords = rowsArray.length;
			totalPages=Math.floor(totalRecords/rowsPerPage);
			if (totalRecords%rowsPerPage>0){
				totalPages+=1;
			}
			
			firstPage();
		},
		function(error, statement){
		 opMessage("Error: " + error.message + " when rowsArray.length processing " + statement);          
		}
	);






}
function BuildHeaders(){
var tablewidth=0;
	alert("hello")
	
	var opTable = sap.ui.getCore().getElementById('DBTable');
	TotalColumns=0;
	
		html5sql.process('PRAGMA table_info('+selectedTableName+');',
		 function(transaction, results, rowsArray){
			alert('pragma table_info('+selectedTableName+');'+":"+rowsArray.length)
			for (var n = 0; n < rowsArray.length; n++) {
				opTable.addColumn( new sap.m.Column({
					header: new sap.m.Text({text:rowsArray[n]}),
					width: "200px"
				}));
				tablewidth+=200;
			}
			getTotalRecords();
				
		 },
		 function(error, statement){
			alert(error.message+":"+statement)
		 }        
		);

	}

function BuildHeaders1(){
	var tablewidth=0;

		
		var opTable = sap.ui.getCore().getElementById('DBTable');
		TotalColumns=0;
			html5sql.process('SELECT name, sql FROM sqlite_master WHERE type="table" AND name = "'+selectedTableName+'";',
			 function(transaction, results, rowsArray){

					item = rowsArray[0];

					var columnParts = item.sql.replace(/^[^\(]+\(([^\)]+)\)/g, '$1').split(','); ///// RegEx
				
					var columnName = "";
					var cols="";
					opTable.removeAllColumns();
					for(i in columnParts) {
						
						if (typeof columnParts[i] === 'string') columnName=columnParts[i].split(' ')[1]
						if (columnName==""){columnName=columnParts[i]}					  
						opTable.addColumn( new sap.m.Column({
							header: new sap.m.Text({text:columnName}),
							width: "200px"
						}));
						tablewidth+=200;
						
						}	
					//sap.ui.getCore().getElementById('sc1').setWidth(tablewidth);
					getTotalRecords();
					
			 },
			 function(error, statement){
				
			 }        
			);

		}

function BuildDBTableNames(){
	var HTMLToOutput="";
	var selected=""
	var first=false;
		html5sql.process("SELECT * FROM sqlite_master WHERE type='table' order by name;",
		 function(transaction, results, rowsArray){

			for (var n = 0; n < rowsArray.length; n++) {

				item = rowsArray[n];
				if (item.name.indexOf("__") ===-1){
					if (first==false){
						selectedTableName= item.name;
						first=true;
					}
					tabNames.addItem(new sap.ui.core.Item({
						key: item.name,
						text: item.name
					}))
				
					
						
					}
				}

		 },
		 function(error, statement){
			//ert("error");
		 }        
		);
	}


var formDBView = new sap.m.Dialog("dlgDBView",{
    title:"Display DB",
    modal: true,
    contentWidth:"1em",
    buttons: [
	       			new sap.m.Button("pageDetails",{text:"xx of xx"}),
			       		
				new sap.m.Button({
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formDBView.close()
						  } ]
				})
				],					
				
content:[
new sap.m.Bar({
	contentLeft : [

		       		new sap.m.Button({
		       			 
		       			 icon:"sap-icon://sys-first-page",
		       				 press: [ function(){
		       					
		       					firstPage()
		       						}]
		       			 }),
				       		new sap.m.Button({
				       			 
				       			 icon:"sap-icon://sys-prev-page",
				       				 press: [ function(){
				       					
				       					 prevPage()
				       						}]
				       			 })
			],
	contentMiddle: [new sap.m.Label({text:"Table Name"}),tabNames], 	
contentRight : [

	       		new sap.m.Button({
	       			 
	       			 icon:"sap-icon://sys-next-page",
	       				 press: [ function(){
	       					
	       					 nextPage()
	       						}]
	       			 }),
			       		new sap.m.Button({
			       			 
			       			 icon:"sap-icon://sys-last-page",
			       				 press: [ function(){
			       					
			       					 lastPage()
			       						}]
			       			 })
		]


}),
new sap.m.ScrollContainer("sc1", {
	horizontal: true,
	vertical: true,
	content:[new sap.m.Table("DBTable",{
		
		
	})]
	
	
}) 
 		  
 
         
         ],
         contentWidth:"100%",
         contentHeight: "100%",
         beforeOpen:function(){
        	 BuildDBTableNames()
        	 BuildHeaders("MyOrders")
         }
 })
