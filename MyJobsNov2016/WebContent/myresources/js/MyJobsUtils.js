
var MB2Type=""
var MBform=""
	var MB2fname=""
jQuery.sap.require("sap.m.MessageBox");
function checkConnection() {
    var networkState = navigator.connection.type;
    /*var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';*/
    if(networkState == '4g' || networkState== '3g' || networkState== 'cellular'){
    	return true;
    }
    else{
    	return false;
    }
    //alert('Connection type: ' + states[networkState]);
}
function isFastConnection() {
    var networkState = navigator.connection.type;

   /* var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if((states[networkState]=='Ethernet connection')||
    		(states[networkState]=='WiFi connection')||
    		(states[networkState]=='Cell 3G connection')||
    		(states[networkState]=='Cell 4G connection')){
    	return true;
    }else{
    	return false;
    }*/
    if(networkState == '4g' || networkState== '3g' || networkState== 'cellular'){
    	return true;
    }
    else{
    	return false;
    }
}
function isCellConnection() {
    var networkState = navigator.connection.type;

    /*var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if((states[networkState]=='Cell 2G connection')||
    		(states[networkState]=='Cell 3G connection')||
    		(states[networkState]=='Cell 4G connection')){
    	return true;
    }else{
    	return false;
    }*/
    if(networkState == '4g' || networkState== '3g' || networkState== 'cellular'){
    	return true;
    }
    else{
    	return false;
    }
}
var formMessageBox = new sap.m.Dialog("dlgMessageBox",{
    title:"",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
				new sap.m.Button({
				    text: "OK",
				    type: 	sap.m.ButtonType.Accept,
				    tap: [ function(oEvt) {		  
						 
				    	formMessageBox.close()
						  } ]
				})
				],					
    content:[
             new sap.m.TextArea("MBmessage",{enabled:false, width: "100%" ,height:"100px",}),

            ],
            beforeOpen:function(){
            	
				}
 })
var formMessageBox2 = new sap.m.Dialog("dlgMessageBox2",{
    title:"",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
				new sap.m.Button({
				    text: "YES",
				    type: 	sap.m.ButtonType.Accept,
				    tap: [ function(oEvt) {		  
						if(MB2Type=="Validation") {
							saveFormData(MB2fname,"SAVED")
						
						}
						if(MB2Type=="Close") {
							MB2form.close();
							disableformFlag=false;
						}
				    	formMessageBox2.close()
						  } ]
				}),
				new sap.m.Button({
				    text: "NO",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formMessageBox2.close()
						  } ]
				}),
				],					
    content:[
             new sap.m.TextArea("MB2message",{enabled:false, width: "100%" ,height:"100px",}),
             
            ],
            beforeOpen:function(){
            	
				}
 })

function DisplayErrorMessage(msgtitle,msgbody){
	formMessageBox.setTitle(msgtitle);
	formMessageBox.setState(sap.ui.core.ValueState.Error)
	sap.ui.getCore().byId("MBmessage").setValue(msgbody)
	formMessageBox.open();
//sap.m.MessageBox.show(
//    msgbody, {
//        icon: sap.m.MessageBox.Icon.ERROR,
//        title: msgtitle,
//        onClose: enableFields(),
//        actions: [sap.m.MessageBox.Action.OK]
//    }
//  );   
}
function convertToLatLon(en){

	x=en.split("-")
	x[0]= x[0]+"000"
	x[1]= x[1]+"000"
	//var os1 = new OSRef(x[0], x[1]);
	//var os6x = getOSRefFromSixFigureReference(os6);
	
	var os1 = new OSRef(x[0].substring(0,6)+"."+x[0].substring(6,8), x[1].substring(0,6)+"."+x[1].substring(6,8));

	var ll = os1.toLatLng();
	ll.OSGB36ToWGS84();
	y=ll.toString()
	y=y.replace("(","")
	y=y.replace(")","")
	x=y.split(",")
	return(x)
}

function convertToLatLon1(en){

	x=en.split("-")
	x[0]= x[0]+"000"
	x[1]= x[1]+"000"
	//var os1 = new OSRef(x[0], x[1]);
	//var os6x = getOSRefFromSixFigureReference(os6);
	
	var os1 = new OSRef(x[0].substring(0,6), x[1].substring(0,6));

	var ll = os1.toLatLng();
	ll.OSGB36ToWGS84();
	y=ll.toString()
	y=y.replace("(","")
	y=y.replace(")","")
	x=y.split(",")
	return(x)
}
function enablefields(){
	
}
function validateDecimal(value, decimals, length) { 
x=value.split(".")
nlen = length-decimals;

if(decimals<2){
	var rx = /^\d+(?:\.\d{1,1})?$/ 
}
if(decimals==2){
	var rx = /^\d+(?:\.\d{1,2})?$/ 
}
if(decimals==3){
	var rx = /^\d+(?:\.\d{1,3})?$/ 
}
if(decimals==4){
	var rx = /^\d+(?:\.\d{1,4})?$/ 
}
if(decimals==5){
	var rx = /^\d+(?:\.\d{1,5})?$/ 
}

    if(rx.test(value)) { 
       vlen=x[0].length;
       if (x.length>1){
    	   vlen+=x[1].length
       }
       if(vlen>length){
    	   //Number length is too Big
    	   return(false)
       }else{
    	   if((x.length>1)&&(decimals==0)){
    		   return false;
    	   }else{
    		   if(x[0].length>nlen){
        		   return false;
        	   }else{
        		   return true;   
        	   }   
    	   }
    	   
       }
       
       
    }
    else { 
       return false; 
    } 
}

function showMessage(msg){
	sap.m.MessageToast.show(msg, {
		type: Error,
		duration: Number(3000),
		width: "30em",
		my: "center center",
		at: "center center",		
		autoClose: true,

	});
}
function showFormValidationMessageWas(fname,title,msg){
	sap.m.MessageToast.show(msg, {
		type: Error,
		duration: Number(3000),
		width: "30em",
		my: "center center",
		at: "center center",		
		autoClose: true,

	});
	  sap.m.MessageBox.show(msg+"\nPress OK to return to form", {
		         icon: sap.m.MessageBox.Icon.ERROR ,
		         title: title,
		         actions: [sap.m.MessageBox.Action.IGNORE, sap.m.MessageBox.Action.OK],
	  			 onClose: function(oAction){
	  				
	  				 if(oAction=="IGNORE"){
	  					 saveFormData(fname,"SAVED")
	  				 }
	  			 }
		       }
		     );
}
function showFormValidationMessage(fname,msgtitle,msg){
	formMessageBox2.setTitle(msgtitle);
	formMessageBox2.setState(sap.ui.core.ValueState.Error)
	sap.ui.getCore().byId("MB2message").setValue(msg+"\nPress YES to Save incomplete form")
	MB2Type = "Validation"
	MB2fname = fname
	formMessageBox2.open();

	
	

}
function showAreYouSureWas(title,msg,form){

	  sap.m.MessageBox.show(msg, {
		         icon: sap.m.MessageBox.Icon.WARNING ,
		         title: title,
		         actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
	  			 onClose: function(oAction){
	  				
	  				 if(oAction=="YES"){
	  					 form.close()
	  				 }
	  			 }
		       }
		     );
}
function showAreYouSure(msgtitle,msg,form){
	formMessageBox2.setTitle(msgtitle);
	formMessageBox2.setState(sap.ui.core.ValueState.Warning)
	sap.ui.getCore().byId("MB2message").setValue(msg)
	MB2Type = "Close"
	MB2form = form
	formMessageBox2.open();

}
function showErrorMessage(msgtitle,msgbody){
	formMessageBox.setTitle(msgtitle);
	formMessageBox.setState(sap.ui.core.ValueState.Error)
	sap.ui.getCore().byId("MBmessage").setValue(msgbody)
	formMessageBox.open();
//sap.m.MessageBox.show(
//    msgbody, {
//        icon: sap.m.MessageBox.Icon.ERROR,
//        title: msgtitle,
//        onClose: enableFields(),
//        actions: [sap.m.MessageBox.Action.OK]
//    }
//  );   
}
function showErrorMessageWas(title,msg){
	sap.m.MessageToast.show(msg, {
		type: Error,
		duration: Number(3000),
		width: "30em",
		my: "center center",
		at: "center center",		
		autoClose: true,

	});
	  sap.m.MessageBox.show(msg, {
		         icon: sap.m.MessageBox.Icon.ERROR ,
		         title: title,
		         actions: [sap.m.MessageBox.Action.OK]
		       }
		     );
}
function diffInMinutes(StartDate, StartTime, EndDate, EndTime){
	
	var diff = Math.abs(new Date(StartDate+" "+StartTime) - new Date(EndDate+" "+EndTime));
	var minutes = Math.floor((diff/1000)/60);
	return minutes
}
function diffInTime(StartDate, StartTime, EndDate, EndTime){

	if(("x"+StartDate).length<8){
		StartDate=EndDate
		StartTime = EndTime
	}


	StartTime=StartTime.substring(0, 6)+"00";
	var sd=new Date(EndDate.substring(0,4),EndDate.substring(5,7)-1,EndDate.substring(8,10),EndTime.substring(0,2),EndTime.substring(3,5),EndTime.substring(6,8))
	var ed=new Date(StartDate.substring(0,4),StartDate.substring(5,7)-1,StartDate.substring(8,10),StartTime.substring(0,2),StartTime.substring(3,5),StartTime.substring(6,8))
	var diff=0;

	diff =    Math.abs( sd-ed)

	var minutes =diff/1000;
	minutes = (diff/1000) 
	minutes -= (minutes%60) 
	minutes = minutes /60
	
	var m = minutes % 60;
	var h = (minutes-m)/60
	if(h>23)
		{
		h=23;
		m=59;
		}
	return h.toString()+":"+m.toString()
}
function convertToMinutes(time){
x=time.split(":")
minutes=((parseInt(x[0])*60)+parseInt(x[1]))
//alert(time+"-"+minutes.toString())
return minutes.toString()
}
function getDate()	{			
				var currentdate = new Date(); 
	return zeroFill1(currentdate.getFullYear().toString()) + zeroFill1((currentdate.getMonth()+1).toString() ) + zeroFill1(currentdate.getDate().toString());

}
function getFormattedDate()	{			
	var currentdate = new Date(); 
return zeroFill1(currentdate.getFullYear().toString()) +"/"+ zeroFill1((currentdate.getMonth()+1).toString() ) + "/"+zeroFill1(currentdate.getDate().toString());

}
function getFormattedDMY()	{			
	var currentdate = new Date(); 
return zeroFill1(currentdate.getDate().toString()) +"/"+ zeroFill1((currentdate.getMonth()+1).toString() ) + "/"+zeroFill1(currentdate.getFullYear().toString());

}
function formatDate(currentdate)	{			

return zeroFill1(currentdate.getFullYear().toString()) +"/"+ zeroFill1((currentdate.getMonth()+1).toString() ) + "/"+zeroFill1(currentdate.getDate().toString());

}
function getTime()	{			
				var currentdate = new Date(); 
    x1=zeroFill1( currentdate.getHours()).toString();
          x2=zeroFill1(currentdate.getMinutes()).toString();
    x3=zeroFill1( currentdate.getSeconds()).toString();
	return x1+x2+x3;

}


function trim(str){
	return str.replace(/^\s+|\s+$/g,"")
}

function convertEODDate(dt)
{
	
	x=dt.split(" ")
	d=x[0].split("-")
	t=x[1].split(":")
	
	
	xdate=d[2]+"."+d[1]+"."+d[0];
	
	
	t[0]=t[0].replace(' ','')
	
	hours=(parseInt(t[0])).toString()

		
	xtime=zeroFill1(t[0])+":"+zeroFill1(t[1])+":00"
	
	return xdate+" "+xtime
	}
function getFormattedTime()	{			
	var currentdate = new Date(); 
x1=zeroFill1( currentdate.getHours()).toString();
x2=zeroFill1(currentdate.getMinutes()).toString();
x3=zeroFill1( currentdate.getSeconds()).toString();
return x1+":"+x2+":"+x3;

}
function formatTime(currentdate)	{			
	
x1=zeroFill1( currentdate.getHours()).toString();
x2=zeroFill1(currentdate.getMinutes()).toString();
x3=zeroFill1( currentdate.getSeconds()).toString();
return x1+":"+x2+":"+x3;

}
function getSAPDate()	{			
				var currentdate = new Date(); 
	return zeroFill1(currentdate.getDate().toString()) + "."+zeroFill1((currentdate.getMonth()+1).toString() )  + "."+ zeroFill1(currentdate.getFullYear().toString());

}
function getShortSAPDate()	{			
	var currentdate = new Date(); 
return zeroFill1(currentdate.getDate().toString()) +zeroFill1((currentdate.getMonth()+1).toString() )  + zeroFill1(currentdate.getFullYear().toString());

}
function getSAPTime()	{			
				var currentdate = new Date(); 
    x1=zeroFill1( currentdate.getHours()).toString();
          x2=zeroFill1(currentdate.getMinutes()).toString();
    x3=zeroFill1( currentdate.getSeconds()).toString();
	return x1 + ":"+x2 + ":"+x3;

}
function getFileUploadDT()	{			
	var currentdate = new Date(); 
return zeroFill1(currentdate.getFullYear().toString())+"-"+zeroFill1((currentdate.getMonth()+1).toString() ) +"-"+zeroFill1(currentdate.getDate().toString()) + "T"+zeroFill1( currentdate.getHours()).toString()+":"+zeroFill1(currentdate.getMinutes()).toString()+":"+zeroFill1( currentdate.getSeconds()).toString()+":"+currentdate.getMilliseconds().toString();

}
function getFileUploadName()	{			
	var currentdate = new Date(); 
	h=zeroFill1( currentdate.getHours()).toString();
    m=zeroFill1(currentdate.getMinutes()).toString();
    s=zeroFill1( currentdate.getSeconds()).toString();
    ms=currentdate.getMilliseconds().toString()
    cy=zeroFill1(currentdate.getFullYear().toString()).substring(2) 
    cm=zeroFill1((currentdate.getMonth()+1).toString() ) 
    cd=zeroFill1(currentdate.getDate().toString())
	return CurrentOrderNo+CurrentOpNo+"-"+cy+cm+cd+h+m+s+ms

}
function formatDate(dt){

	var formatteddt="";
	//formatteddt=dt.substring(6,8)+"/"+dt.substring(4,6)+"/"+dt.substring(0,4)
	formatteddt=dt.substring(8,10)+"/"+dt.substring(5,7)+"/"+dt.substring(4,0)//azure
	return formatteddt;
	}
function formatTimeString(dt){

	var formattedt="";
	formattedt=dt.substring(0,2)+":"+dt.substring(2,4)+":"+dt.substring(4,6)
	return formattedt;
	}
function getDateStamp(){
nowd=getDate();
nowt=getTime();
dtstamp=nowd+nowt;
return dtstamp;
}
function formatDateTime(dt){
if(dt=="undefined"){
	return
}
	
var formatteddt="";
formatteddt=dt.substring(6,8)+"-"+dt.substring(4,6)+"-"+dt.substring(0,4)+" "+dt.substring(8,10)+":"+dt.substring(10,12)+":"+dt.substring(12,14);
return formatteddt;
}
function formatDateTime1(dt){

	var formatteddt="";
	formatteddt=dt.substring(6,8)+"-"+dt.substring(4,6)+"-"+dt.substring(0,4)+" "+dt.substring(9,11)+":"+dt.substring(11,13)+":"+dt.substring(13,15);
	return formatteddt;
	}
function convertDateTimePicker(dt)
{
	var sd =dt.split(",")
	var x=sd[0].split("/")
	var st=sd[1].split(":")
	var ndate= new Date(Number(x[2])+2000,x[0],x[1])
	

	var formattedDate=zeroFill1(ndate.getFullYear().toString()) + zeroFill1((ndate.getMonth()).toString() ) +  zeroFill1(ndate.getDate().toString())+"|"+zeroFill1(st[0].substring(1,st[0].length))+st[1].substring(0,2)+"00"
return formattedDate
	}
function zeroFill1(x){
    return (x < 10) ? ("0" + x) : x;   
}
function isEven(value) {
return (value%2 == 0);
} 
function parseDate(input){
input=input+"          ";
//alert (input.substr(0,4)+"/"+input.substr(4,2)+"/"+input.substr(6,2)+" "+input.substr(8,2)+":"+input.substr(10,2));
 return new Date(input.substr(0,4), input.substr(4,2)-1, input.substr(6,2), // months are 0-based
                 input.substr(8,2), input.substr(10,2));

}
function getURLParameters(paramName) 
{
        var sURL = window.document.URL.toString();  
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
            //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
       }
       return "No Parameters Found";
    }

}
function CreateMatrix(selectedJob,StatusColour,StatusText,priorityiconsToDisplay,iconsToDisplay,showAttributes,showhistory){
	   var oMatrix = new sap.ui.commons.layout.MatrixLayout({
	//id : "matrix1",
	layoutFixed : false,
		width : '800px',
		columns : 7,
		widths : ['30px', '10px', '350px', '10px', '30px','10px', '50px'] });
	   oCell_header = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan:3
		});
	   var oLabel_header = new sap.ui.commons.Label({
			text : decodeURIComponent(selectedJob.orderdesc) }).addStyleClass("Labelstyle");
	   oLabel_header.setDesign(sap.ui.commons.LabelDesign.Bold);
	   oCell_header.addContent(oLabel_header);
	   oCell_header1 = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan:3
		});
	   var displayJobNo=selectedJob.orderno;
	   var oLabel_header1 = new sap.ui.commons.Label({
			text : displayJobNo.replace(/^[0]+/g,"")+"-"+selectedJob.opno}).addStyleClass("Labelstyle");
	   oLabel_header1.setDesign(sap.ui.commons.LabelDesign.Bold);
	   oCell_header1.addContent(oLabel_header1);
	   
	   oMatrix.createRow(oCell_header,"",oCell_header1);
		var oLabel = new sap.ui.commons.Label({
			text : 'Start Date' }).addStyleClass("Labelstyle");
		var oLabel_site = new sap.ui.commons.Label({
			text : 'Site' }).addStyleClass("Labelstyle");

		var tf_site = new sap.ui.commons.TextField({
			editable : false,
			value: selectedJob.site,
			wrapping:true,
			width:"350px"}).addStyleClass("LabelText");
		var tf_startdate = new sap.ui.commons.TextField({
			editable : false,
			value: formatDate(selectedJob.startdate),
			wrapping:true,
			width:"350px"}).addStyleClass("LabelText");

		oLabel.setLabelFor(tf_startdate);  
		var oLabel_enddate = new sap.ui.commons.Label({
			text : 'End Date' }).addStyleClass("Labelstyle");

		/*var tf_enddate = new sap.ui.commons.TextField({
			editable : false,
			value:formatDate(selectedJob.enddate),
			wrapping:true,
			width:"350px"}).addStyleClass("LabelText");*/

		//oLabel.setLabelFor(tf_enddate); 
		oMatrix.createRow(oLabel_site,"",tf_site,"", oLabel,"", tf_startdate);
		oCell = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan:1
		});
		var oLabel_address = new sap.ui.commons.Label({
			text : 'Address' }).addStyleClass("Labelstyle");
		var tf_address = new sap.ui.commons.TextView({
			editable : false,
			text:FormatAddress(selectedJob.address),
			wrapping:true,
			width:"350px"}).addStyleClass("LabelText");
		
		oCell.addContent(tf_address);
		var oLabel_reduration = new sap.ui.commons.Label({
			text : 'RE Duration' }).addStyleClass("Labelstyle");

		var tf_reduration = new sap.ui.commons.TextField({
			editable : false, 
			value:selectedJob.reduration,
			wrapping:true,
			width:"350px"}).addStyleClass("LabelText");
		oMatrix.createRow(oLabel_address,"", oCell,"", oLabel_reduration,"", tf_reduration);
		var label_funcloc = new sap.ui.commons.Label({
			text : 'FuncLoc' }).addStyleClass("Labelstyle");
		oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan:1
		});
		var tf_funcloc = new sap.ui.commons.TextView({
			editable : false,
			text:selectedJob.funcloc_code+"-"+selectedJob.funcloc_desc,
			wrapping:true,
			width:"350px"}).addStyleClass("LabelText");
		oCell1.addContent(tf_funcloc);
		
		var label_notif = new sap.ui.commons.Label({
			text : 'Notification'}).addStyleClass("Labelstyle");
		var dispnotifno=selectedJob.notifno;
		var tf_notif = new sap.ui.commons.TextField({
			editable : false,
			value:dispnotifno.replace(/^[0]+/g,"")}).addStyleClass("LabelText");
		oMatrix.createRow(label_funcloc,"",oCell1,"",label_notif,"",tf_notif);
		
		var label_equipment = new sap.ui.commons.Label({
			text : 'Equipment' }).addStyleClass("Labelstyle");
var dispEquipmentNo=selectedJob.equipment_code;
		var tf_equipment = new sap.ui.commons.TextField({
			editable : false,
			value:dispEquipmentNo.replace(/^[0]+/g,"")+"-"+selectedJob.equipment_desc,
			wrapping :true,
			width:"350px"}).addStyleClass("LabelText");
		var displaystatus=new sap.ui.core.HTML({content: "<H2 id='JobHead_Status'><Font color='"+StatusColour+"'>"+StatusText+"</font></H2>"});
		
		oMatrix.createRow(label_equipment,"",tf_equipment,"",displaystatus);
		oCellhistory = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan:1
		});
//var displayAttr=new sap.ui.core.HTML("attributes",{content: ""+showAttributes+""<img src='file:///storage/emulated/0/Documents/MyJobs/Global/download/Icons/historyicon.png' alt='History' height='42' width='42' onclick='getAssetHistory(\""+funcloc+"\")'>"});
		var displayAttr=new sap.ui.core.HTML({content: ""+showAttributes+""});
		var displayhistory=new sap.ui.core.HTML({content:""+showhistory+""});
		oCellhistory.addContent(displayAttr)
		oCellhistory.addContent(displayhistory);
		oMatrix.createRow(label_equipment,"", tf_equipment,"", oCellhistory);
		oCellicon = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan:7
		});
		var displayIcons=new sap.ui.core.HTML({content: ""+priorityiconsToDisplay+iconsToDisplay+""});
		oCellicon.addContent(displayIcons);
		oMatrix.createRow(oCellicon);
		return oMatrix;
}
function prefixZeroes(value){
 if(value.length >= 12){
                 return value;
 }
 else{
                 for( ;value.length < 12; ){
                                 value = "0"+value;
                 }
                 return value;
 }
}
function buildTimeline(lt){


	TLArray=[]
	TLUserDets=["SYSTEM,"]
	TLName=""
	TLEntry="";
	xxx=lt.split(String.fromCharCode(13,10))
	for (var n=0;n <xxx.length;n++){
	TLLine=xxx[n];


	if((TLLine.substring(2,3)==".")&&
	(TLLine.substring(5,6)==".")&&
	(TLLine.substring(13,14)==":")&&
	(TLLine.substring(16,17)==":")){
	//Its a New Entry
	console.log("Its a Name Entry")
	TLArray.push(TLEntry)

	TLDateTime=TLLine.substring(0,19)
	TLName=TLLine.substring(20)
	TLUserDets.push(TLDateTime+"'"+TLName)
	TLEntry=""
	}else{
	TLEntry+=TLLine
	TLEntry+="<BR>"
	}



	}
	TLArray.push(TLEntry)
	tl='<section id="cd-timeline" class="cd-container">'


	cnt=0

	while(cnt < TLArray.length){
	xx=TLUserDets[cnt].split(",")
	if(xx[0]=="SYSTEM"){
	TLImg="myresources/TL/img/message.svg"
	}else{
	TLImg="myresources/TL/img/user.svg"
	}
	tl+='<div class="cd-timeline-block">'
	tl+='<div class="cd-timeline-img cd-picture">'
	tl+='<img src="'+TLImg+'" >'
	tl+='</div>'

	tl+='<div class="cd-timeline-content">'
	tl+='<P>'+TLArray[cnt]+'</P>'

	tl+='<span class="cd-date">'+TLUserDets[cnt]+'</span>'
	tl+='</div>'
	tl+='</div>'
	         cnt++;
	   }
	tl+='</section> '
	return(tl)
	}

var formSelectList = new sap.m.Dialog({
    title:"Please Select",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
                                new sap.m.Button( {
                                    text: "Cancel",
                                    type: sap.m.ButtonType.Reject,
                                    tap: [ function(oEvt) {         
                                               
                                    formSelectList.close()} ]   
                                })
                                ],                                
    content:[
new sap.m.TileContainer("selectTC",{
tiles:
[

]

})
            ],
            beforeOpen:function(){
             
                
            },
           contentWidth:"95%",
        contentHeight: "95%",
     })
function showSelectTileCointainer(selectListID){

sap.ui.getCore().getElementById('selectTC').destroyTiles();
sl=sap.ui.getCore().getElementById(selectListID).getItems()

for(var cntx=0; cntx < sl.length ; cntx++)
{
sap.ui.getCore().getElementById('selectTC').addTile(new sap.m.StandardTile({title:sl[cntx].getText(),press:[ function(){sap.ui.getCore().getElementById(selectListID).setSelectedKey(this.data("slKey"));formSelectList.close()}]}).data("slKey", sl[cntx].getKey()))


}

formSelectList.open()
}


function FormatAddress(s){
	var addr="";
	var address=s.split(",");
	for(i=0;i<=address.length;i++){
		if(!address[i]==""){
			addr=addr+address[i]+",";
		}
		else{
			
		}
	}
	 	var n=addr.lastIndexOf(",");
	    var a=addr.substring(0,n) 
	    return a;


}
//Asset Capture
function chooseStep2Type(fromScreen) {
    getBusinessUnit(currentAssetRecord.site, function () {

        getAssetCategory(currentAssetRecord.equipmentTypeCodeZZEQPT_EGI, currentAssetRecord.zzfl_nc, currentAssetRecord.businessUnit, function () {

            switch (currentAssetRecord.zascatAssetCategory) {
                case "A":
                    if (action != recordAction.EDIT) { formCreateAssetStep2Parent.open() } else { formCreateAssetStep3.open() }
                    break;
                case "B":
                    if (action != recordAction.EDIT) { formCreateAssetStep2Support.open() } else { formCreateAssetStep3.open() }
                    break;
                case "C":
                    if (action != recordAction.EDIT) { formCreateAssetStep2Parent.open() } else { formCreateAssetStep3.open() }
                    break;
                case "D":
                    if (action != recordAction.EDIT) { formCreateAssetStep2GenericSite.open() } else { formCreateAssetStep3.open() }
                    break;
                case "E":
                    if (fromScreen == 1) {
                        formEquipTypeFuncSelection.open();
                    }
                    else if (action == recordAction.EDIT) {
                        formCreateAssetStep3.open();
                    }
                    else {
                        formCreateAssetStep2Unknown.open();
                    }
                    break;
                default:
            }
        }
        )
    });
}

function clearControls() {
    
    sap.ui.getCore().getElementById("createAssetFilter_FunctionType").destroyItems();
    sap.ui.getCore().getElementById("text_SelectFunctionType").setValue("");


    inputCreateAssetStep2SupportFuncLocPart1.setValue("");
    inputCreateAssetStep2SupportFuncLocPart2.setValue("");
    inputCreateAssetStep2SupportFuncLocPart3.setValue("");
    sap.ui.getCore().getElementById("CreateAssetStep2Supportinput_PlantGroupDef").setValue("");
    sap.ui.getCore().getElementById("CreateAssetStep2Supportinput_SystemCodeDef").setValue("");

    InputMakeAssetList.setPlaceholder("");
    InputMakeAssetList.setValue("");
    InputMakeAssetList.setEnabled(false);
    InputModelAssetList.setPlaceholder("");
    InputModelAssetList.setValue("");
    InputModelAssetList.setEnabled(false);

    sap.ui.getCore().getElementById("Input_MakeAssetList").setValue("");
    sap.ui.getCore().getElementById("Input_MakeAssetList").setEnabled(false);

    sap.ui.getCore().getElementById("Input_ModelAssetList").setValue("");
    sap.ui.getCore().getElementById("Input_ModelAssetList").setEnabled(false);

    sap.ui.getCore().getElementById("Input_NewModel").setEnabled(false)
    sap.ui.getCore().getElementById("Input_NewModel").setValue("");
    sap.ui.getCore().getElementById("Input_NewMake").setEnabled(false)
    sap.ui.getCore().getElementById("Input_NewMake").setValue("");
    sap.ui.getCore().getElementById("createAssetButton_EquipmentType").setEnabled(false);
    sap.ui.getCore().getElementById("createAssetInput_EquipmentType").setValue("");
    sap.ui.getCore().getElementById("text_SelectEquipmentType").setValue("");
    sap.ui.getCore().getElementById("text_SelectFunctionType").setValue("");
    sap.ui.getCore().getElementById("createAssetFilter_FunctionType").destroyItems();
    sap.ui.getCore().getElementById("createAssetFilter_FunctionType").setEnabled(false);
    labelFuncLocStringEditOrDecom.setText("");
    inputChooseAssetEditOrDecom.setValue("");
    sap.ui.getCore().getElementById("buttonDecom_EditOrDecom").setEnabled(false);
    sap.ui.getCore().getElementById("buttonEdit_EditOrDecom").setEnabled(false);


}

function EvaluateValueForZPROCTYP(callback) {

   
        getMakeModelValidity(currentAssetRecord.make, currentAssetRecord.model, function (isValidMakeModel) {
            getAssetCategoryValidity(currentAssetRecord.equipmentTypeCodeZZEQPT_EGI, currentAssetRecord.zzfl_nc, currentAssetRecord.businessUnit, function (isValidEquipTypeFunctType) {
                getPlantGroupValidity(currentAssetRecord.plantGroupCodeZplgrp, currentAssetRecord.businessUnit, function (isValidPlantGroupProcessGroup) {

                    var strProcessType = "";
                    if (isValidMakeModel && isValidEquipTypeFunctType && isValidPlantGroupProcessGroup) {
                        if (currentAssetRecord.EQUNR != null) {
                            strProcessType = "CH1";
                        }
                        else {
                            strProcessType = "CR1";
                        }
                    }

                    if (strProcessType == "") {
                        if (isValidMakeModel != true && (isValidEquipTypeFunctType == true && isValidPlantGroupProcessGroup == true)) {
                            if (currentAssetRecord.EQUNR != null) {
                                strProcessType = "CH2";
                            }
                            else {
                                strProcessType = "CR2";
                            }
                        }
                    }

                    if (strProcessType == "") {
                        if (!isValidMakeModel || !isValidEquipTypeFunctType || !isValidPlantGroupProcessGroup) {
                            if (currentAssetRecord.EQUNR != null) {
                                strProcessType = "CH3";
                            }
                            else {
                                strProcessType = "CR3";
                            }
                        }
                    }
                    callback(strProcessType);
                })

            })
        })
   
}
function generateNextItemID(callback) {
    //We are editing a record so the number will stay the same if the plant Group/ System Code/ ZZFL_NC hasn't changed
    if (action == recordAction.EDIT &&
            currentAssetRecord.plantGroupCodeZplgrp == currentAssetRecord.originalFuncLocStringZINSTLOCN.substr(10, 3) &&
            currentAssetRecord.SystemCodeZSYSCODE == currentAssetRecord.originalFuncLocStringZINSTLOCN.substr(14, 2) &&
            currentAssetRecord.zzfl_nc == currentAssetRecord.originalFuncLocStringZINSTLOCN.substr(19, 2)
    ) {
        currentAssetRecord.funcLocSub22_3FunctionTypeItemNumber = currentAssetRecord.originalFuncLocStringZINSTLOCN.substr(22, 3)

        callback();
    }

    else {
        var funclocStringStart = currentAssetRecord.funcLocStringZINSTLOCN.substr(0, 22);
        var matchingfLStarts = [];
        var nextItemString = "";
        var nextItemNumber = 1;
        getFunctionalLocationsForSite(currentAssetRecord.site, function (arrFunctionalLocationsForSite) {

            for (var n = 0; n < arrFunctionalLocationsForSite.length; n++) {
                var item = arrFunctionalLocationsForSite[n];
                if (item.tplnr.startsWith(funclocStringStart)) {
                    matchingfLStarts.push(item.tplnr.substr(22));
                }
            }
            if (matchingfLStarts.length > 0) {
                matchingfLStarts.sort;
                nextItemNumber = parseInt(matchingfLStarts[matchingfLStarts.length - 1]) + 1;
            }
            nextItemString = pad(nextItemNumber, 3);
            currentAssetRecord.funcLocSub22_3FunctionTypeItemNumber = nextItemString;
            callback();
        });

    }
}
function generateNextPlantSystemItemNumber(callback) {
    //We are editing a record so the number will stay the same if the plant Group hasn't changed
    if (action == recordAction.EDIT &&
            currentAssetRecord.plantGroupCodeZplgrp == currentAssetRecord.originalFuncLocStringZINSTLOCN.substr(10, 3)
    ) {
        //Plant group hasn't changed , so do nothing.
        callback(currentAssetRecord.SystemCodeNumber);
    }

    else {
        var funclocStringStart = currentAssetRecord.funcLocStringZINSTLOCN.substr(0, 16);
        var matchingfLStarts = [];
        var nextItemString = "";
        var nextItemNumber = 1;
        getFunctionalLocationsForSite(currentAssetRecord.site, function (arrFunctionalLocationsForSite) {

            for (var n = 0; n < arrFunctionalLocationsForSite.length; n++) {
                item = arrFunctionalLocationsForSite[n];
                if (item.tplnr.startsWith(funclocStringStart)) {
                    matchingfLStarts.push(item.tplnr.substr(16, 2));
                }
            }
            if (matchingfLStarts.length > 0) {
                matchingfLStarts.sort;
                nextItemNumber = parseInt(matchingfLStarts[matchingfLStarts.length - 1]) + 1;
            }
            nextItemString = pad(nextItemNumber, 2);
            // currentAssetRecord.SystemCodeNumber = nextItemString;
            callback(nextItemString);
        });

    }
}
function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}
function showMessageConfirm(title, msg, func) {

    sap.m.MessageBox.show(msg, {
        //icon: sap.m.MessageBox.Icon.WARNING,
        title: title,
        actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.ABORT],
        onClose: function (oAction) {

            if (oAction == "OK") {
                func();
            }
        }
    }
           );
}
function showDecomReplaceMessage(title, msg) {

    sap.m.MessageBox.show(msg, {
        title: title,
        actions: [sap.m.MessageBox.Action.OK],
        onClose: function (oAction) {
            formDecomAsset.close();
            formCreateAsset.open();
        }
    }
           );
}

function showSucessMessage(title, msg) {
    sap.m.MessageToast.show(msg, {
        duration: Number(3000),
        width: "30em",
        my: "center center",
        at: "center center",
        autoClose: true,

    });

    sap.m.MessageBox.show(msg, {
        icon: sap.m.MessageBox.Icon.SUCCESS,
        title: title,
        actions: [sap.m.MessageBox.Action.OK]
    }
           );
}



//formatTime2(getTime());// "PT00H00M00S";

function formatTime2(theTime) {
    formattedtime = "PT" + theTime.substring(0, 2) + "H" + theTime.substring(2, 4) + "M" + theTime.substring(6, 4) + "S";

    return formattedtime
}

