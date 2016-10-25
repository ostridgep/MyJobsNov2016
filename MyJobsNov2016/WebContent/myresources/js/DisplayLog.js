var currentPagedl=1;
var rowsPerPagedl=20;
var totalRecordsdl=0;

var totalPagesdl=1;

function nextPagedl(){
	if (currentPagedl<totalPagesdl){
		currentPagedl+=1;
		buildTrace();
		}
		
}
function prevPagedl(){
	if (currentPagedl>1){
		currentPagedl-=1;
				buildTrace();
		}

}
function lastPagedl(){
	if (currentPagedl<totalPagesdl){
		currentPagedl=totalPagesdl;
		buildTrace();
		}

}
function firstPagedl(){
	
		currentPagedl=1;
		buildTrace();


}
function getTotalTraceRecords()
{
	totalRecordsdl=0;
	html5sql.process(
		['SELECT * FROM LogFile '],
		function(transaction, results, rowsArray){

			totalRecordsdl = rowsArray.length;
			totalPagesdl=Math.floor(totalRecordsdl/rowsPerPagedl);
			if (totalRecordsdl%rowsPerPagedl>0){
				totalPagesdl+=1;
			}
			buildTrace()
		},
		function(error, statement){
		}
		
	);





}
function buildTrace(){
var n = 0;
var opTable = sap.ui.getCore().getElementById('LogTable');
var startRec=(currentPagedl-1)*rowsPerPagedl;
	sap.ui.getCore().getElementById('pageDetailsDL').setText(currentPagedl+" of "+totalPagesdl)

	html5sql.process('SELECT * FROM LogFile LIMIT '+startRec+', '+rowsPerPagedl+";",
			 function(transaction, results, rowsArray){
				opTable.removeAllItems();
				while (n < rowsArray.length) {
					
			
					opTable.addItem (new sap.m.ColumnListItem({
						cells : 
							[
							new sap.m.Text({text: rowsArray[n].id}),
				            new sap.m.Text({text: rowsArray[n].datestamp}),
							new sap.m.Text({text: rowsArray[n].type}),
				            new sap.m.Text({text: rowsArray[n].message})   
					 		]
						}));
					n++;
				 }

			 },
			 function(error, statement){
				alert(error)
			 }        
			);	

	
}
var formDBLog = new sap.m.Dialog("dlgDBLog",{
    title:"Display Log",
    modal: true,
    contentWidth:"1em",
    buttons: [
	       			new sap.m.Button("pageDetailsDL",{text:"xx of xx"}),
			       		
				new sap.m.Button({
				    text: "Close",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formDBLog.close()
						  } ]
				})
				],					
				
content:[
new sap.m.Bar({
	contentLeft : [

		       		new sap.m.Button({
		       			 
		       			 icon:"sap-icon://sys-first-page",
		       				 press: [ function(){
		       					
		       					firstPagedl()
		       						}]
		       			 }),
				       		new sap.m.Button({
				       			 
				       			 icon:"sap-icon://sys-prev-page",
				       				 press: [ function(){
				       					
				       					 prevPagedl()
				       						}]
				       			 })
			],
	//contentMiddle: [new sap.m.Label({text:"Table Name"}),tabNames], 	
contentRight : [

	       		new sap.m.Button({
	       			 
	       			 icon:"sap-icon://sys-next-page",
	       				 press: [ function(){
	       					
	       					 nextPagedl()
	       						}]
	       			 }),
			       		new sap.m.Button({
			       			 
			       			 icon:"sap-icon://sys-last-page",
			       				 press: [ function(){
			       					
			       					 lastPagedl()
			       						}]
			       			 })
		]


}),
new sap.m.ScrollContainer({
	horizontal: true,
	vertical: true,
	content:[new sap.m.Table("LogTable",{
		columns:[
		         new sap.m.Column({header: new sap.m.Label({text:"Id"}),
		        	 hAlign: 'Left',width: '50px', minScreenWidth : "" , demandPopin: false}),
		         new sap.m.Column({header: new sap.m.Label({text:"DateStamp"}),
		        	 hAlign: 'Left',width: '120px',minScreenWidth : "" , demandPopin: false}),
		         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
		        	 hAlign: 'Left',width: '35px',minScreenWidth : "" , demandPopin: true}),			
	        	 new sap.m.Column({header: new sap.m.Label({text:"Name"}),
		        	 hAlign: 'Left',width: '',minScreenWidth : "" , demandPopin: true })       	                         
           	     ]
	})

]

}) 
 		  
 
         
         ],
         contentWidth:"100%",
         contentHeight: "100%",
         beforeOpen:function(){
        	 getTotalTraceRecords()
        		buildTrace()
         }
 })
