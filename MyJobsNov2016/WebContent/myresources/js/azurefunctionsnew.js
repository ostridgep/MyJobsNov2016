//Azure Callback Handlers
//Added 10-09-2016
var localJobDets="" 
var localJobDetsOrders="" 
	
function postAzureData(page, postData, timedOutSQL,recno) {
var myurl = SAPServerPrefix + page + "?" +  localStorage.getItem('MobileUser');
   // var myurl = "https://AMPService.azurewebsites.net/api/" + page + "?" +  localStorage.getItem('MobileUser');
  // var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + "?" + localStorage.getItem('MobileUser'); //"SMUNJEWAR2";
console.log(page+":"+postData)
 
   $.ajax({
       type: "POST",
       contentType: "application/json; charset=UTF-8",
       url: myurl,
       data: JSON.stringify(postData),
       headers: {
           "ZUMO-API-VERSION": "2.0.0"
       },
       timeout: 3000000
   }).done(function (data) {
       opMessage("call success" + page);
       postAzureCB(data.d, page,recno);
   }).fail(function (data, xhr, status) {
       opMessage(page + status + data);
       if (status != "parsererror") {
           if (status == "timeout") {
          
TimedOut=true;
resetSENDINGData(timedOutSQL);
 
           }
       }
   }).always(function () {
       opMessage("Complete" + page);
   });
}
function postAzureDoc(page, postData, parameters,timedOutSQL,recno) {
	 
	var myurl =  SAPServerPrefix + page + "?" +parameters;
	   // var myurl = "https://AMPService.azurewebsites.net/api/" + page + "?" +  localStorage.getItem('MobileUser');
	  // var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + "?" + localStorage.getItem('MobileUser'); //"SMUNJEWAR2";
	console.log(page+":"+postData)
	 
	   $.ajax({
	       type: "POST",
	       contentType: "application/json; charset=UTF-8",
	       url: myurl,
	       data: JSON.stringify(postData),
	       headers: {
	           "ZUMO-API-VERSION": "2.0.0"
	       },
	       timeout: 3000000
	   }).done(function (data) {
	       opMessage("call success" + page);
	       postAzureCB(data.d, page,recno);
	   }).fail(function (data, xhr, status) {
	       opMessage(page + status + data);
	       if (status != "parsererror") {
	           if (status == "timeout") {
	          
	TimedOut=true;
	resetSENDINGData(timedOutSQL);
	 
	           }
	       }
	   }).always(function () {
	       opMessage("Complete" + page);
	   });
	}
function postAzureDataOriginal(page, postData) {
 
 
    var myurl = SAPServerPrefix + page + "?" +  localStorage.getItem('MobileUser');
  // var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + "?" + localStorage.getItem('MobileUser'); //"SMUNJEWAR2";
 
 
   $.ajax({
       type: "POST",
       contentType: "application/json; charset=UTF-8",
       url: myurl,
       data: JSON.stringify(postData),
       headers: {
           "ZUMO-API-VERSION": "2.0.0"
       },
       timeout: 3000000
   }).done(function (data) {
       opMessage("call success" + page);
       chooseCB(data, page);
   }).fail(function (data, xhr, status) {
       opMessage(page + status + data);
       if (status != "parsererror") {
           if (status == "timeout") {
               opMessage(page + status);
           }
       }
   }).always(function () {
       opMessage("Complete" + page);
   });
}
function requestAzureData(page, params) {
console.log("Azure"+page+":"+params)
if (params.length > 0) {
 
var myurl = SAPServerPrefix + page + "?" + params;//"real" azure
//var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + "?" + params;//"real" azure
 
}
else {
var myurl = SAPServerPrefix + page;//"real" azure
// var myurl = "http://10.193.123.32/AMPServiceService/api/" + page;//"real" azure
 
}
 
$.ajax({
dataType: "json",
url: myurl,
headers: {
"ZUMO-API-VERSION": "2.0.0"
// ,"My-Second-Header":"second value"
},
timeout: 3000000
}).done(function (data) {
opMessage("call success" + page);
chooseCB(data, page);
}).fail(function (data, xhr, status) {
opMessage(page + status + data);
if (status != "parsererror") {
if (status == "timeout") {
opMessage(page + status);
}
}
}).always(function () {
opMessage("Complete" + page);
});
}
 
function chooseCB(mydata, page) {
switch (page) {
case "ZACAT001AssetCaptureCategory":
ZACAT001AssetCaptureCategoryCB(mydata);
break;
case "ZPRG002ProcessGroupCodes":
ZPRG002ProcessGroupCodesCB(mydata);
break;
case "PlantGroupCodesZPLG003":
PlantGroupCodesZPLG003CB(mydata);
break;
case "SystemCodesDescriptionZSYS004":
SystemCodesDescriptionZSYS004CB(mydata);
break;
case "FunctionTypeCodesZNAM005":
FunctionTypeCodesZNAM005CB(mydata);
break;
case "EquipmentTypeCodesZEGI006":
EquipmentTypeCodesZEGI006CB(mydata);
break;
case "PlantGroupProcessGroupCodesZPLG_PRG007":
PlantGroupProcessGroupCodesZPLG_PRG007CB(mydata);
break;
case "AssetTypeCodesZAST008":
AssetTypeCodesZAST008CB(mydata);
break;
case "EGINameCodeMappingZAEGI_NC":
EGINameCodeMappingZAEGI_NCCB(mydata);
break;
case "DecommissionStatusZDECOMSTAT":
DecommissionStatusZDECOMSTATCB(mydata);
break;
case "ZGW_MAM_SITE_REFDATA":
ZGW_MAM_SITE_REFDATACB(mydata);
break;
 
 
case "ZGW_MAM30_090_GETLIST_T3":             //done
ZGW_MAM30_090_GETLIST_T3CB(mydata);
break;
case "ZGW_MAM30_VEHICLE":                    //done
ZGW_MAM30_VEHICLECB(mydata);
break;
case "ZGW_MAM30_ADOBE_PREPOP_SRV":
ZGW_MAM30_ADOBE_PREPOP_SRVCB(mydata);
break;
case "ZGW_MAM30_ADOBE_PREPOP_GIS_T3_SRV":
ZGW_MAM30_ADOBE_PREPOP_GIS_T3_SRVCB(mydata);
break;
case "ZGW_MAM30_SEWER_TECH_T3":
ZGW_MAM30_SEWER_TECH_T3CB(mydata);
break;
case "ZGW_MAM30_RFV_T3_SRV":
ZGW_MAM30_RFV_T3_SRVCB(mydata);
break;
case "ZGW_MAM30_VERSION_DEPLOY":
ZGW_MAM30_VERSION_DEPLOYCB(mydata);
break;
case "ZG_MAM30_APPBAR_CTRL_SRV":             //done
ZG_MAM30_APPBAR_CTRL_SRVCB(mydata);
break;
case "ZGW_MAM30_REFDATA_T3_SRVActivity":
ZGW_MAM30_REFDATA_T3_SRVActivityCB(mydata);
break;
case "ZGW_MAM30_REFDATA_T3_SRVNotifTypes":
ZGW_MAM30_REFDATA_T3_SRVNotifTypesCB(mydata);
break;
case "ZGW_MAM30_REFDATA_T3_SRVPAICode":
ZGW_MAM30_REFDATA_T3_SRVPAICodeCB(mydata);
break;
case "ZGW_MAM30_016_GETDETAIL_CFEED_SRVCodeGPCF":
ZGW_MAM30_016_GETDETAIL_CFEED_SRVCodeGPCFCB(mydata);
break;
case "ZGW_MAM30_016_GETDETAIL_CFEED_SRVScenCodeGPS":
ZGW_MAM30_016_GETDETAIL_CFEED_SRVScenCodeGPSCB(mydata);
break;
case "ZGW_MAM30_031_REFDATA_T3_SRVManufacturer":
ZGW_MAM30_031_REFDATA_T3_SRVManufacturerCB(mydata);
break;
case "ZGW_MAM30_031_REFDATA_T3_SRVModel":
ZGW_MAM30_031_REFDATA_T3_SRVModelCB(mydata);
break;
case "ZGW_MAM30_031_REFDATA_T3_SRVObjType":
ZGW_MAM30_031_REFDATA_T3_SRVObjTypeCB(mydata);
break;
case "ZGW_MAM30_031_REFDATA_T3_SRVPlant":
ZGW_MAM30_031_REFDATA_T3_SRVPlantCB(mydata);
break;
case "ZGW_MAM30_031_REFDATA_T3_SRVProfile":
ZGW_MAM30_031_REFDATA_T3_SRVProfileCB(mydata);
break;
case "ZGW_MAM_EXTRACT_ASSET_DATA":
ZGW_MAM_EXTRACT_ASSET_DATACB(mydata);
break;
case "ZGW_MAM_ASSETDATA_T3":
ZGW_MAM_ASSETDATA_T3CB(mydata);
break;
case "ZGW_GET_JOB_DETAILS":
getLocalJobs(mydata)

break;
case "ZGW_MAM_MAINT_PARAM":
ZGW_MAM_MAINT_PARAMCB(mydata);
break;
case "ZGW_MAM30_CHECK_SURVEY":
ZGW_MAM30_CHECK_SURVEYCB(mydata);
break;
case "ZGW_MAM30_USER_VALIDATE_SRV":
ZGW_MAM30_USER_VALIDATE_SRVCB(mydata);
break;
    case "ZGW_MAM30_DG5_PIA_CODES_T3Dg5Code":
        ZGW_MAM30_DG5_PIA_CODES_T3Dg5CodeCB(mydata);
        break;
    case "ZGW_MAM30_DG5_PIA_CODES_T3Dg5Rel":
        ZGW_MAM30_DG5_PIA_CODES_T3Dg5RelCB(mydata);
        break;
default:
}
}
/************************************************/
/* User Data Call back  */
/************************************************/
function ZGW_MAM30_090_GETLIST_T3CB(data) {
 
 
var sqlstatement="";
var MyEmployeeID=""
if(data.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Users:'+String(data.length));
}else{
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Users:'+String(data.length));
}
 
opMessage("Deleting Existing Users");
opMessage("Loading"+data.length+" Users");
 
var myarray = [{ 'sql': 'DELETE FROM MyRefUsers', 'data': [] }];
for(var cntx=0; cntx < data.length ; cntx++)
{
myarray.push({
'sql': 'INSERT INTO MyRefUsers (userid , scenario , plant , workcenter , plannergroup , plannergroupplant, storagegroup, storageplant, partner, partnerrole, funclocint, funcloc, compcode, employeeno, equipment, firstname, lastname, telno ,maint1,maint2,maint3,maint4,maint5,maint6,maint7,maint8) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
[data[cntx].userid, data[cntx].myalmScenario,data[cntx].plant, data[cntx].workCntr,data[cntx].plangroup, data[cntx].plangroupPlant,
data[cntx].stgeLoc, data[cntx].stgeLocPlant,data[cntx].partner, data[cntx].partnerRole,data[cntx].funclocInt, data[cntx].funcloc,
data[cntx].compCode, data[cntx].employeeno,"", data[cntx].firstname,data[cntx].lastname, "",
data[cntx].maint1, data[cntx].maint2,data[cntx].maint3, data[cntx].maint4,data[cntx].maint5, data[cntx].maint6,data[cntx].maint7, data[cntx].maint8
 
]
})
 
if(data[cntx].userid==localStorage.getItem('MobileUser')){
localStorage.setItem('EmployeeID',data[cntx].employeeno)
localStorage.setItem('EmployeeWorkCenter',data[cntx].workCntr)
localStorage.setItem('EmployeeScenario',data[cntx].myalmScenario)
localStorage.setItem('MobileFullname', data[cntx].firstname +" "+ data[cntx].lastname)
}
 
}
 
html5sql.process(myarray ,
function(){
sqlstatement="UPDATE MyUserDets SET employeeid = '"+localStorage.getItem('EmployeeID')+"', fullname='"+localStorage.getItem('MobileFullname')+"', workcenter='"+localStorage.getItem('EmployeeWorkCenter')+"', scenario='"+localStorage.getItem('EmployeeScenario')+"' WHERE mobileuser = '"+localStorage.getItem('MobileUser')+"';";
 
html5sql.process(
sqlstatement
,
function(){
},
function(error, statement){
opMessage("Error: " + error.message + " when updateing EmployeeID " + statement);
}        
);
},
function(error, statement){
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
 
 
 
}
}
/************************************************/
/* Vehicle Data Call back  */
/************************************************/
function zFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}
function ZGW_MAM30_VEHICLECB(data) {
 
 
 
var sqlstatement="";
var MyEmployeeID=""
 
html5sql.process(
       
["select value from MyJobsParams where name = 'VEHICLE'"],
        function (transaction, results, rowsArray) {
            if (rowsArray.length> 0) {
           
processVehicles(data,zFill(rowsArray[0].value,18))
            }
 
        },
         function (error, statement) {
             window.console && console.log("Error: " + error.message + " when processing " + statement);
         }
        );
}
function processVehicles(data,defaultVehicle) {
//vehicle
console.log(defaultVehicle+"="+data.length)
var first=0;
var v_mpoint=""
if(data.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Vehicles:'+String(data.length));
}else{
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Vehicles:'+String(data.length));
}
 
opMessage("Deleting Existing Vehicles");
opMessage("Loading"+data.length+" Vehicles");
 
var myarray = [{ 'sql': 'DELETE FROM MyVehicles', 'data': [] }];
myarray.push({ 'sql': 'DELETE FROM MyVehiclesDefault', 'data': [] });
for(var cntx=0; cntx < data.length ; cntx++)
{
if(data[cntx].equipmentNo==defaultVehicle){
console.log("Default Found")
if(data[cntx].level=="2"){
myarray.push({
'sql': 'INSERT INTO MyVehiclesDefault (equipment , reg , partner, level, sequence, description , mpoint, mpointdesc, mpointlongtext ) VALUES  (?,?,?,?,?,?,?,?,?)', 'data':
[data[cntx].equipmentNo, data[cntx].inventoryNo,data[cntx].partner, data[cntx].level,data[cntx].sequence,
data[cntx].description,data[cntx].measmntPoint,data[cntx].measPntDesc,data[cntx].measPntLongtxt]
})
}
}else{
//Now real Vehicles
 
if(data[cntx].level==1){
if(first==0)
{
first=1;
}else{
 
myarray.push({
'sql': 'INSERT INTO MyVehicles (id , reg , partner, description , mpoints) VALUES  (?,?,?,?,?)', 'data':
[v_eq, v_reg,v_partner,v_description,v_mpoint]
})
 
}
 
v_eq=data[cntx].equipmentNo
v_reg=data[cntx].inventoryNo 
v_partner=data[cntx].partner
v_description=data[cntx].description
v_mpoint=""
}else{
 
v_mpoint+=data[cntx].measmntPoint+':';
 
}
}
 
 
 
}
 
 
html5sql.process(
myarray
,
function(){
},
function(error, statement){
opMessage("Error: " + error.message + " when inserting Vehicles" + statement);
}        
);
 
 
 
 
}
}
 
/************************************************/
/* AppBar Data Call back  */
/************************************************/
function ZG_MAM30_APPBAR_CTRL_SRVCB(data) {
 
 
 
var sqlstatement="";
var MyEmployeeID=""
if(data.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', AppBar:'+String(data.length));
}else{
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'AppBar:'+String(data.length));
}
 
opMessage("Deleting Existing MenuBar");
opMessage("Loading"+data.length+" MenuBar");
 
var myarray = [{ 'sql': 'DELETE FROM MyMenuBar', 'data': [] }];
for(var cntx=0; cntx < data.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO MyMenuBar (scenario, level ,item, position, type ,subitem ,command, item2) VALUES  (?,?,?,?,?,?,?,?)', 'data':
[data[cntx].scenario, data[cntx].level,data[cntx].item, data[cntx].position,data[cntx].type,data[cntx].subitem,data[cntx].command,data[cntx].item2]
})
 
 
}
 
 
html5sql.process(
myarray
,
function(){
	BuildMenuBar();
},
function(error, statement){
opMessage("Error: " + error.message + " when inserting AppBar" + statement);
}        
);
 
 
 
 
}
}
/************************************************/
/* Activities Data Call back
    */
/************************************************/
function ZGW_MAM30_REFDATA_T3_SRVActivityCB(data) {
 
 
 
if(data.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Ref:Activities:'+String(data.length));
}else{
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Ref:Activities:'+String(data.length));
}
 
opMessage("Deleting Existing REFACTIVITY");
opMessage("Loading"+data.length+" REFACTIVITY");
 
var myarray = [{ 'sql': 'DELETE FROM REFACTIVITY', 'data': [] }];
for(var cntx=0; cntx < data.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO REFACTIVITY (scenario , work_center , activity , activity_desc,action , deflt ) VALUES  (?,?,?,?,?,?)', 'data':
["", data[cntx].workCenter,data[cntx].activity, data[cntx].activityDesc,data[cntx].action,data[cntx].deflt]
})
 
 
}
 
 
html5sql.process(
myarray
,
function(){
},
function(error, statement){
opMessage("Error: " + error.message + " when inserting REFACTIVITY" + statement);
}        
);
 
 
 
 
}
}
/************************************************/
/* PAICODES Data Call back          */
/************************************************/
function ZGW_MAM30_REFDATA_T3_SRVPAICodeCB(data) {
 
 
 
if(data.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', REFPAICODES:'+String(data.length));
}else{
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'REFPAICODES:'+String(data.length));
}
 
opMessage("Deleting Existing REFPAICODES");
opMessage("Loading"+data.length+" REFPAICODES");
 
var myarray = [{ 'sql': 'DELETE FROM REFPAICODES', 'data': [] }];
for(var cntx=0; cntx < data.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO REFPAICODES (scenario , userid , level , stsma,plant, work_cntr , catalogue , codegrp , kurztext_group,code , kurztext_code) VALUES  (?,?,?,?,?,?,?,?,?,?,?)', 'data':
[ data[cntx].myalmScenario, "", data[cntx].level,data[cntx].stsma,data[cntx].plant, data[cntx].workCntr,data[cntx].catalogue,data[cntx].codegrp, data[cntx].kurztextGroup,data[cntx].code,data[cntx].kurztextCode]
})
 
 
}
 
 
html5sql.process(
myarray
,
function(){
},
function(error, statement){
opMessage("Error: " + error.message + " when inserting REFPAICODES" + statement);
}        
);
 
 
 
 
}
}
/************************************************/
/* VARIANCESRFV Data Call back
        */
/************************************************/
function ZGW_MAM30_RFV_T3_SRVCB(data) {
 
 
if(data.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', REFVARIANCESRFV:'+String(data.length));
}else{
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'REFVARIANCESRFV:'+String(data.length));
}
 
opMessage("Deleting Existing REFVARIANCESRFV");
opMessage("Loading"+data.length+" REFVARIANCESRFV");
 
var myarray = [{ 'sql': 'DELETE FROM REFVARIANCESRFV', 'data': [] }];
for(var cntx=0; cntx < data.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO REFVARIANCESRFV (scenario , userid ,  plant , work_cntr,job_activity , dev_reason , dev_reas_txt , mandate) VALUES  (?,?,?,?,?,?,?,?)', 'data':
["", "", data[cntx].plant,data[cntx].workCntr,data[cntx].jobActivity, data[cntx].devReason,data[cntx].jobActDesc,data[cntx].mandate]
})
 
 
}
 
 
html5sql.process(
myarray
,
function(){
},
function(error, statement){
opMessage("Error: " + error.message + " when inserting REFVARIANCESRFV" + statement);
}        
);
 
 
 
 
}
}
/************************************************/
/* Notif Types Data Call back
        */
/************************************************/
function ZGW_MAM30_REFDATA_T3_SRVNotifTypesCB(data) {
 
 
if(data.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', REFNOTIFICATIONTYPES:'+String(data.length));
}else{
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'REFNOTIFICATIONTYPES:'+String(data.length));
}
 
opMessage("Deleting Existing REFNOTIFICATIONTYPES and PRIORITIES");
opMessage("Loading"+data.length+" REFNOTIFICATIONTYPES and PRIORITIES");
 
var myarray = [{ 'sql': 'DELETE FROM REFNOTIFICATIONTYPES', 'data': [] }];
myarray.push({ 'sql': 'DELETE FROM MyRefPriorityTypes', 'data': [] });
for(var cntx=0; cntx < data.length ; cntx++)
{
if(data[cntx].levelNumber=="2"){
myarray.push({
'sql': 'INSERT INTO REFNOTIFICATIONTYPES (scenario , userid , level_number , notiftype,notifdesc , notifprofile , priotype , priority,prioritydesc ) VALUES  (?, ?,?,?,?,?,?,?,?)', 'data':
[data[cntx].myalmScenario, "", data[cntx].levelNumber,data[cntx].notiftype,data[cntx].notifdesc, data[cntx].notifprofile,data[cntx].priotype,data[cntx].priority,data[cntx].prioritydesc]
})
}
if(data[cntx].levelNumber=="3"){
myarray.push({
'sql': 'INSERT INTO MyRefPriorityTypes (scenario, type , priority, description  ) VALUES  (?,?,?,?)', 'data':[data[cntx].myalmScenario, data[cntx].priotype ,data[cntx].priority, data[cntx].prioritydesc]
})
}
 
 
}
 
 
html5sql.process(
myarray
,
function(){
},
function(error, statement){
opMessage("Error: " + error.message + " when inserting REFNOTIFICATIONTYPES and PRIORITIES" + statement);
}        
);
 
 
 
 
}
}
 
/************************************************/
/* PARAMS Data Call back              */
/************************************************/
function ZGW_MAM_MAINT_PARAMCB(data) {
 
 
if(data.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', ZMAMPARAMS:'+String(data.length));
}else{
localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'ZMAMPARAMS:'+String(data.length));
}
 
opMessage("Deleting Existing ZMAMPARAMS");
opMessage("Loading"+data.length+" ZMAMPARAMS");
 
var myarray = [{ 'sql': 'DELETE FROM MyJobsParams', 'data': [] }];
for(var cntx=0; cntx < data.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO MyJobsParams (name , key1 , key2 , value) VALUES  (?,?,?,?)', 'data':
[data[cntx].name,data[cntx].key1,data[cntx].key2, data[cntx].value]
})
 
 
}
 
 
html5sql.process(
myarray
,
function(){
},
function(error, statement){
opMessage("Error: " + error.message + " when inserting ZMAMPARAMS" + statement);
}        
);
 
 
 
 
}
}
   
      
      
        /************************************************/
        /* DG5 Codes Data Call back
            */
        /************************************************/
        function ZGW_MAM30_DG5_PIA_CODES_T3Dg5CodeCB(data) {
 
        if(data.length>0){
        if(syncReferenceDetsUpdated){
        localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', DG5CODES:'+String(data.length));
        }else{
        localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'DG5CODES:'+String(data.length));
        }
 
       
opMessage("Deleting Existing DG5CODES");
        opMessage("Loading"+data.length+" DG5CODES");
 
        var myarray = [{ 'sql': 'DELETE FROM DG5CODES', 'data': [] }];
        for(var cntx=0; cntx < data.length ; cntx++)
        {
 
        myarray.push({
       
'sql': 'INSERT INTO DG5CODES (type , level , coderef , description,code,codedesc,parenttype,parentcode) VALUES  (?,?,?,?,?,?,?,?)', 'data':
        [data[cntx].type,data[cntx].level,data[cntx].coderef, data[cntx].description,
         data[cntx].code,data[cntx].codedesc,data[cntx].parenttype, data[cntx].parentcode]
        })
        
 
        }
 
 
        html5sql.process(
        myarray
        ,
        function(){
        },
        function(error, statement){
        opMessage("Error: " + error.message + " when inserting DG5CODES" + statement);
        }        
        );
 
        
 
 
        }
        }
 
        /************************************************/
        /* DG5 Rel Data Call back
            */
        /************************************************/
        function ZGW_MAM30_DG5_PIA_CODES_T3Dg5RelCB(data) {
        
              
 
        if(data.length>0){
        if(syncReferenceDetsUpdated){
        localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', DG5REL:'+String(data.length));
        }else{
        localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'DG5REL:'+String(data.length));
        }
 
       
opMessage("Deleting Existing DG5REL");
        opMessage("Loading"+data.length+" DG5REL");
 
        var myarray = [{ 'sql': 'DELETE FROM DG5REL', 'data': [] }];
        for(var cntx=0; cntx < data.length ; cntx++)
        {
 
        myarray.push({
       
'sql': 'INSERT INTO DG5REL (catalogue,codegrp,code,codedesc,dg5rel,piarel ) VALUES  (?,?,?,?,?,?)', 'data':
        [data[cntx].catalogue,data[cntx].codegrp,data[cntx].code,data[cntx].codedesc,data[cntx].dg5rel, data[cntx].piarel]
        })
        
 
        }
 
 
        html5sql.process(
        myarray
        ,
        function(){
        },
        function(error, statement){
        opMessage("Error: " + error.message + " when inserting DG5REL" + statement);
        }        
        );
 
        
 
 
        }
        }
/************************************************/
/* Get Asset Data           
            */
/************************************************/
        function getAssets() {//The server keeps deleted records for MaxDaysSinceLastDownload  days (currently 90 days).
            //If the client hasn't synced Assets for more than 90 days
            //then we must empty the local asset table and download it all again.
            var lastSyncReference = localStorage.getItem('LastSyncReference');
 
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date();//today
            var secondDate = new Date(lastSyncReference.substring(0, 4), lastSyncReference.substring(4, 6) - 1, lastSyncReference.substring(6, 8));
 
            var daysSinceLastDownload = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
 
            var MaxDaysSinceLastDownload = 90;
 
            html5sql.process(
       
["select count(*) AS REC from AssetSitesDetails"],
        function (transaction, results, rowsArray) {
            if (daysSinceLastDownload > MaxDaysSinceLastDownload || rowsArray[0].REC == 0) {
                //get all records
                var recordsRetrieved = -1;
                var currentEquipNum = 0;
                var numRecordsToGet = 10000;
 
                getAssetsRecursive("ZGW_MAM_EXTRACT_ASSET_DATA", currentEquipNum + numRecordsToGet)
            }
            else {
                //get deltas
                var datestring = getDate();
 
                getAssetRecords("ZGW_MAM_EXTRACT_ASSET_DATA", "?" + datestring, function (data) {
                    recordsRetrieved = data.length;
 
                    if (recordsRetrieved > 0) {
                        addRecordstoDb(data, function () {
                            //Get last equipment number
                            getBiggestZequnr(function (BiggestZequnr) {
                                console.log("BiggestZequnr=" + BiggestZequnr);
                                
                                	getAssetsRecursive(BiggestZequnr, numRecordsToGet);
                            })
                        })
                    }
                    else {
                        console.log("No Records found");
                    }
 
                });
            }
        },
         function (error, statement) {
             window.console && console.log("Error: " + error.message + " when processing " + statement);
         }
        );
 
 
 
        }
        function getAssetsRecursive(currentEquipNum, numRecordsToGet) {
            getAssetRecords("ZGW_MAM_EXTRACT_ASSET_DATA", "?" + currentEquipNum + "?" + numRecordsToGet, function (data) {
                recordsRetrieved = data.length;
 
                if (recordsRetrieved > 0) {
                    addRecordstoDb(data, function () {
                        //Get last equipment number
                        getBiggestZequnr(function (BiggestZequnr) {
                            console.log("BiggestZequnr=" + BiggestZequnr);
                            if(BiggestZequnr == "999999999999999999")
                        	{
                            	console.log("done");
                            	}
                        else{
                            getAssetsRecursive(BiggestZequnr, numRecordsToGet);
                        }
                        })
                    })
 
 
 
                }
                else {
                    alert("done");
                }
 
            });
        }
 
        function getAssetRecords(page, params, callback) {
            var myurl = SAPServerPrefix + page + params+"?WHERE zswerk = 'ESVM'";//"real" azure
            // var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + params;//My local version
 
            $.ajax({
                dataType: "json",
                url: myurl,
                headers: {
                    "ZUMO-API-VERSION": "2.0.0"
                },
                timeout: 3000000
            }).done(function (data) {
                callback(data);
            }).fail(function (data, xhr, status) {
                opMessage(page + status + data);
                if (status != "parsererror") {
                    if (status == "timeout") {
                        opMessage(page + status);
                    }
                }
            }).always(function () {
                opMessage("Complete" + page);
            });
        }
 
        function addRecordstoDb(data, callback) {
 
            var sqlstatement = "";
 
            // var myarray = [{ 'sql': 'DELETE FROM MODEL', 'data': [] }];
            var myarray = [];
 
            for (var cntx = 0; cntx < data.length ; cntx++) {
            	
                myarray.push({
                    'sql': 'INSERT INTO AssetSitesDetails ( assdesc ,assettag ,asstype ,eqart ,eqktx ,equnr ,herst ,iwerk ,mapar ,ncdesc ,otdesc ,plgrp ,pltxt ,serge ,site ,status ,swerk ,syscode ,sysdesc ,tplnr ,zfl_nc ,zinbdt ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data': [
                    data[cntx].zassdesc,
               data[cntx].zassettag,
               data[cntx].zasstype,
               data[cntx].zeqart,
               data[cntx].zeqktx,
               data[cntx].zequnr,
               data[cntx].zherst,
               data[cntx].ziwerk,
               data[cntx].zmapar,
               data[cntx].zncdesc,
               data[cntx].zotdesc,
               data[cntx].zplgrp,
               data[cntx].zpltxt,
               data[cntx].zserge,
               data[cntx].zsite,
               data[cntx].zstatus,
               data[cntx].zswerk,
               data[cntx].zsyscode,
               data[cntx].zsysdesc,
               data[cntx].ztplnr,
               data[cntx].zzflnc,
                data[cntx].zinbdt]
                })
            }
            console.log(myarray[0]);
            opMessage("Success - Built asset array - " + myarray.length + " rows");
            html5sql.process(
                  myarray
                ,
                 function () {
                     opMessage("Success - Finished Loading Model");
                     console.log("Added record to db");
                     callback();
                 },
                 function (error, statement) {
                     opMessage("Error: " + error.message + " when processing " + statement);
                 }
            );
        }
 
 
        function getBiggestZequnr(callback) {
            var sqlstatement = 'SELECT  equnr as numRecords  FROM ASSETSITESDETAILS ORDER BY equnr desc limit 1';
 
 
            html5sql.process(sqlstatement,
                                 function (transaction, results, rowsArray) {
                                     callback(rowsArray[0].numRecords)
                                 },
                             function (error, statement) {
                                 opMessage("Error: " + error.message + " when processing " + statement);
                                 showErrorMessage("Delete", error.message)
                             }
                    );
        }        
        
/************************************************/
/* Orders Data Call back              */
/************************************************/
function ZGW_GET_JOB_DETAILSCB(data) {
var orderlist="";
var orderoplist="";
opMessage("Loading"+data.tojobdet.results.length+" JobDets");

if(data.tojobdet.results.length>0){
if(syncReferenceDetsUpdated){
localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', JobDets:'+String(data.tojobdet.results.length));
}else{
localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'Jobdets:'+String(data.tojobdet.results.length));
}
 
 
var tcdates=[];
/*var myarray = [{ 'sql': 'DELETE FROM MyJobDetsAddress', 'data': [] }];
myarray.push({ 'sql': 'DELETE FROM MyJobDets', 'data': [] })
myarray.push({ 'sql': 'DELETE FROM MyJobDetsNotifLongText', 'data': [] })
myarray.push({ 'sql': 'DELETE FROM MyJobDetsOrderOps', 'data': [] })
myarray.push({ 'sql': 'DELETE FROM MyJobDetsIconPriority', 'data': [] })
myarray.push({ 'sql': 'DELETE FROM MyJobDetsIconJob', 'data': [] })
myarray.push({ 'sql': 'DELETE FROM MyJobDetsMPcodes', 'data': [] })-------
myarray.push({ 'sql': 'DELETE FROM MyJobDetsMPoints', 'data': [] })-------
myarray.push({ 'sql': 'DELETE FROM MyJobDetsLoch', 'data': [] })
myarray.push({ 'sql': 'DELETE FROM MyJobDetsDraw', 'data': [] })
myarray.push({ 'sql': 'DELETE FROM MyJobsDetsEQ', 'data': [] })-----
myarray.push({ 'sql': 'DELETE FROM MyJobsDetsATTR', 'data': [] })-----
myarray.push({ 'sql': 'DELETE FROM MyJobDetsMeasCodes', 'data': [] })-----
myarray.push({ 'sql': 'DELETE FROM MyJobDetsComps', 'data': [] })
myarray.push({ 'sql': 'DELETE FROM MyJobDetsOrderLongText', 'data': [] }) */
//Think we delete Time confs where copnfno not = 0


var myarray = [{ 'sql': 'DELETE FROM MyJobDetsMPcodes', 'data': [] }]
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsMPoints', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobsDetsEQ', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobsDetsATTR', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsMeasCodes', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsLoch', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsComps', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsOrderLongText', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsAddress', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsNotifLongText', 'data': [] }) 
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsOrderOps', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsIconPriority', 'data': [] })
  myarray.push({ 'sql': 'DELETE FROM MyJobDetsIconJob', 'data': [] })
  
  opMessage("jobdets:"+data.tojobdet.results.length)
for(var cntx=0; cntx < data.tojobdet.results.length ; cntx++)
{
	if(cntx>0){
		orderlist+=","
		orderoplist+=","
	}
	orderlist+="'"+data.tojobdet.results[cntx].orderid+"'"
	orderoplist+="'"+data.tojobdet.results[cntx].orderid+data.tojobdet.results[cntx].ordnoOp+"'"
tcdates=[];
if (data.tojobdet.results[cntx].acptDate.length>6){
 
tcdates.push(data.tojobdet.results[cntx].acptDate+"|"+data.tojobdet.results[cntx].acptTime);
}
if (data.tojobdet.results[cntx].onsiteDate.length>6){
 
tcdates.push(data.tojobdet.results[cntx].onsiteDate+"|"+data.tojobdet.results[cntx].onsiteTime);
}
if (data.tojobdet.results[cntx].parkDate.length>6){
 
tcdates.push(data.tojobdet.results[cntx].parkDate+"|"+data.tojobdet.results[cntx].parkTime);
}
 
tcdates.sort()
 
if(tcdates.length>0){
x=tcdates[tcdates.length-1].split("|");
tconfd=x[0]
tconft=x[1]
}else{
tconfd=""
tconft=""
}
if(localJobDets.indexOf(data.tojobdet.results[cntx].orderid+data.tojobdet.results[cntx].ordnoOp)<0){
myarray.push({
'sql': 'INSERT INTO MyJobDets ('+
 
"orderid,ordnoOp,watercare,textMess,reduration, startTime,startDate,pmacttypeText, pmacttype, "+
" workTypeCdx,workTypeCd,workTypeCgpx,workTypeCgp,ordType,shortText,priorityx,priority, " +
" statusCrtim,statusCrdat,statusDescL,statusDescS ,status,plant,myalmScenario,workCntrOper, "+
" workCntrUser,empName,empNo,user,custAppt,jobPartRef,locHistRef,address, "+
" custFeed,equipment,equipmentDesc,funcLoc,funcLocDesc,flcLonLat,siteShcode,acptDate,acptTime, " +
" onsiteDate,onsiteTime,tconf_date,tconf_time,assocOpRef,opActtype,opActtypex,name1,telNumber,eqpLonLat,notificationNo, "+
" notifCatProf,enddateLconf,endtimeLconf,custNo,parkDate,parkTime,custCmmt,form1,form2,mandForm, "+
" documents,tma,contractAssist,specialEq,materials,measurements,callAppt,acNo,acStatus,retention, " +
" ntTelNo,skillType,assettag,ordWorkCntr,ordPlant,userMobile,notifCrdat,notifCrtim,ohdrShortText, " +
" zzretc,zzretn,zzrettn,zzemai,zzgisx,zzgisy,zzmogisx,zzmogisy) values ("+
" ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
" ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
" ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
" ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
" ?,?,?,?,?,?,?,?,?,?)", 'data': 
 
 
[data.tojobdet.results[cntx].orderid,data.tojobdet.results[cntx].ordnoOp,data.tojobdet.results[cntx].watercare,
data.tojobdet.results[cntx].textMess,data.tojobdet.results[cntx].reduration,data.tojobdet.results[cntx].startTime,
data.tojobdet.results[cntx].startDate,data.tojobdet.results[cntx].pmacttypeText,data.tojobdet.results[cntx].pmacttype,
data.tojobdet.results[cntx].workTypeCdx,data.tojobdet.results[cntx].workTypeCd,data.tojobdet.results[cntx].workTypeCgpx,
data.tojobdet.results[cntx].workTypeCgp,data.tojobdet.results[cntx].ordType,data.tojobdet.results[cntx].shortText,
data.tojobdet.results[cntx].priorityx,data.tojobdet.results[cntx].priority,data.tojobdet.results[cntx].statusCrtim,
data.tojobdet.results[cntx].statusCrdat,data.tojobdet.results[cntx].statusDescL,data.tojobdet.results[cntx].statusDescS ,
data.tojobdet.results[cntx].status,data.tojobdet.results[cntx].plant,data.tojobdet.results[cntx].myalmScenario,
data.tojobdet.results[cntx].workCntrOper,data.tojobdet.results[cntx].workCntrUser,data.tojobdet.results[cntx].empName,
data.tojobdet.results[cntx].empNo,data.tojobdet.results[cntx].user,data.tojobdet.results[cntx].custAppt,
data.tojobdet.results[cntx].jobPartRef,data.tojobdet.results[cntx].locHistRef,data.tojobdet.results[cntx].address,
data.tojobdet.results[cntx].custFeed,data.tojobdet.results[cntx].equipment,data.tojobdet.results[cntx].equipmentDesc,
data.tojobdet.results[cntx].funcLoc,data.tojobdet.results[cntx].funcLocDesc,data.tojobdet.results[cntx].flcLonLat,
data.tojobdet.results[cntx].siteShcode,data.tojobdet.results[cntx].acptDate,data.tojobdet.results[cntx].acptTime,
 
data.tojobdet.results[cntx].onsiteDate,data.tojobdet.results[cntx].onsiteTime,tconfd,tconft,data.tojobdet.results[cntx].assocOpRef,
data.tojobdet.results[cntx].opActtype,data.tojobdet.results[cntx].opActtypex,data.tojobdet.results[cntx].name1,
data.tojobdet.results[cntx].telNumber,data.tojobdet.results[cntx].eqpLonLat,data.tojobdet.results[cntx].notificationNo,
data.tojobdet.results[cntx].notifCatProf,data.tojobdet.results[cntx].enddateLconf,data.tojobdet.results[cntx].endtimeLconf,
data.tojobdet.results[cntx].custNo,data.tojobdet.results[cntx].parkDate,data.tojobdet.results[cntx].parkTime,data.tojobdet.results[cntx].custCmmt,
data.tojobdet.results[cntx].form1,data.tojobdet.results[cntx].form2,data.tojobdet.results[cntx].mandForm,
data.tojobdet.results[cntx].documents,data.tojobdet.results[cntx].tma,data.tojobdet.results[cntx].contractAssist,
data.tojobdet.results[cntx].specialEq,data.tojobdet.results[cntx].materials,data.tojobdet.results[cntx].measurements,
data.tojobdet.results[cntx].callAppt,data.tojobdet.results[cntx].acNo,data.tojobdet.results[cntx].acStatus,data.tojobdet.results[cntx].retention,
data.tojobdet.results[cntx].ntTelNo,data.tojobdet.results[cntx].skillType,data.tojobdet.results[cntx].assettag,data.tojobdet.results[cntx].ordWorkCntr,
data.tojobdet.results[cntx].ordPlant,data.tojobdet.results[cntx].userMobile,data.tojobdet.results[cntx].notifCrdat,data.tojobdet.results[cntx].notifCrtim,
data.tojobdet.results[cntx].ohdrShortText,data.tojobdet.results[cntx].zzretc,data.tojobdet.results[cntx].zzretn,data.tojobdet.results[cntx].zzrettn,
data.tojobdet.results[cntx].zzemai,data.tojobdet.results[cntx].zzgisx,data.tojobdet.results[cntx].zzgisy,data.tojobdet.results[cntx].zzmogisx,data.tojobdet.results[cntx].zzmogisy]
 
})
} 
 
}
  opMessage("tomeascodes:"+data.tomeascodes.results.length)
  for(var cntx=0; cntx < data.tomeascodes.results.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO MyJobDetsMPcodes (  code_gp , code , code_text ) VALUES  (?,?,?)', 'data':
[data.tomeascodes.results[cntx].codeGp , data.tomeascodes.results[cntx].code , data.tomeascodes.results[cntx].codeText]
})
}
  opMessage("tomeaspoints:"+data.tomeaspoints.results.length)
  for(var cntx=0; cntx < data.tomeaspoints.results.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO MyJobDetsMPoints (  meas_point , object_id ,object_desc , psort ,pttxt , format ,no_char , no_deci ,code_gp , code , unit_meas ,read_from ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
[data.tomeaspoints.results[cntx].measPoint , data.tomeaspoints.results[cntx].objectId ,data.tomeaspoints.results[cntx].objectDesc , data.tomeaspoints.results[cntx].psort ,
data.tomeaspoints.results[cntx].pttxt , data.tomeaspoints.results[cntx].format ,data.tomeaspoints.results[cntx].noChar , data.tomeaspoints.results[cntx].noDeci ,
data.tomeaspoints.results[cntx].codeGp , data.tomeaspoints.results[cntx].code , data.tomeaspoints.results[cntx].unitMeas ,data.tomeaspoints.results[cntx].readFrom ]
})
}
  opMessage("tojobloch:"+data.tojobloch.results.length)
  for(var cntx=0; cntx < data.tojobloch.results.length ; cntx++)
{
	
myarray.push({
'sql': 'INSERT INTO MyJobDetsLoch ( orderno,notification_no,not_type,not_date,not_time,not_shtxt,not_order,meter_no,meter_rdg,work_type,order_type,op_txt, order_date,order_status ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
[ data.tojobloch.results[cntx].order,data.tojobloch.results[cntx].notificationNo,data.tojobloch.results[cntx].notType,data.tojobloch.results[cntx].notDate,
  data.tojobloch.results[cntx].notTime,data.tojobloch.results[cntx].notShtxt,data.tojobloch.results[cntx].notOrder,data.tojobloch.results[cntx].meterNo,
  data.tojobloch.results[cntx].meterRdg,data.tojobloch.results[cntx].workType,data.tojobloch.results[cntx].orderType,data.tojobloch.results[cntx].opTxt, 
  data.tojobloch.results[cntx].orderDate,data.tojobloch.results[cntx].orderStatus  ]
})
}

  opMessage("todraw_operation:"+data.todraw_operation.results.length)
  for(var cntx=0; cntx < data.todraw_operation.results.length ; cntx++)
{
	  if(localJobDetsOrders.indexOf(data.todraw_operation.results[cntx].Orderid)<0){  
myarray.push({
'sql': 'INSERT INTO MyJobDetsDraw (orderno,zact,zite,zmandatoryfield,zurl,nodeid,fname,mime  ) VALUES  (?,?,?,?,?,?,?,?)', 'data':
[data.todraw_operation.results[cntx].Orderid,data.todraw_operation.results[cntx].Zactivity,data.todraw_operation.results[cntx].Zitem,
data.todraw_operation.results[cntx].Zmandatoryfield,data.todraw_operation.results[cntx].Zurl,data.todraw_operation.results[cntx].Nodeid,
data.todraw_operation.results[cntx].Fname,data.todraw_operation.results[cntx].Mime ]
})
	  }
}
  opMessage("toequipment:"+data.toequipment.results.length)
  for(var cntx=0; cntx < data.toequipment.results.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO MyJobsDetsEQ ( equnr,obj_type,obj_type_desc,start_date,manfacture,manparno,manserno,user_status_code,swerk,swerk_desc,profile,device,device_info,install_date, install_loc_desc ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
[ data.toequipment.results[cntx].equnr,data.toequipment.results[cntx].objType,data.toequipment.results[cntx].objTypeDesc,data.toequipment.results[cntx].startDate,
  data.toequipment.results[cntx].manfacture,data.toequipment.results[cntx].manparno,data.toequipment.results[cntx].manserno,data.toequipment.results[cntx].userStatusCode,
  data.toequipment.results[cntx].swerk,data.toequipment.results[cntx].swerkDesc,data.toequipment.results[cntx].profile,data.toequipment.results[cntx].device,
  data.toequipment.results[cntx].deviceInfo,data.toequipment.results[cntx].installDate,data.toequipment.results[cntx].installLocDesc]
})
}
  opMessage("toattributes:"+data.toattributes.results.length)
  for(var cntx=0; cntx < data.toattributes.results.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO MyJobsDetsATTR (  equnr,classnum,klassentext,charact,charact_desc,value ) VALUES  (?,?,?,?,?,?)', 'data':
[ data.toattributes.results[cntx].equnr,data.toattributes.results[cntx].classnum,data.toattributes.results[cntx].klassentext,
  data.toattributes.results[cntx].charact,data.toattributes.results[cntx].charactDescr,data.toattributes.results[cntx].value ]
})
}
  opMessage("tomeascodes:"+data.tomeascodes.results.length)
  for(var cntx=0; cntx < data.tomeascodes.results.length ; cntx++)
{
 
myarray.push({
'sql': 'INSERT INTO MyJobDetsMeasCodes ( code_gp,code,code_text ) VALUES  (?,?,?)', 'data':
[ data.tomeascodes.results[cntx].codeGp,data.tomeascodes.results[cntx].code,data.tomeascodes.results[cntx].codeText]
})
}
  opMessage("tocomps:"+data.tocomps.results.length)
  for(var cntx=0; cntx < data.tocomps.results.length ; cntx++)
{
	  
myarray.push({
'sql': 'INSERT INTO MyJobDetsComps ( orderno,opno,material,description,ent_qty,com_qty,with_qty,upm,plant, stloc, batch_no,req_date, res_item ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
[data.tocomps.results[cntx].orderno,data.tocomps.results[cntx].opno,data.tocomps.results[cntx].material,data.tocomps.results[cntx].description,
data.tocomps.results[cntx].entQty,data.tocomps.results[cntx].comQty,data.tocomps.results[cntx].withQty,data.tocomps.results[cntx].upm,
data.tocomps.results[cntx].plant,data.tocomps.results[cntx]. stloc,data.tocomps.results[cntx]. batchNo,data.tocomps.results[cntx].reqDate,data.tocomps.results[cntx].resItem ]
})
	  
}
  opMessage("toorder_long_text:"+data.toorder_long_text.results.length)

	   for(var cntx=0; cntx < data.toorder_long_text.results.length ; cntx++)
		   {
myarray.push({
'sql': 'INSERT INTO MyJobDetsOrderLongText (objtype,objkey,orderno,line_number,format_col,text_line   ) VALUES  (?,?,?,?,?,?)', 'data':
[ data.toorder_long_text.results[cntx].objtype,data.toorder_long_text.results[cntx].objkey,data.toorder_long_text.results[cntx].order,
  data.toorder_long_text.results[cntx].lineNumber,data.toorder_long_text.results[cntx].formatCol,data.toorder_long_text.results[cntx].textLine]
 
})
	  
}
  opMessage("toaddress:"+data.toaddress.results.length)
  for(var cntx=0; cntx < data.toaddress.results.length ; cntx++)
{

myarray.push({
'sql': 'INSERT INTO MyJobDetsAddress (   orderno,opno,address01,address02,address03,address04,address05,address06,address07,address08,address09,address10,address11,address12,caption01,caption02,caption03,caption04,caption05,caption06,caption07,caption08,caption09,caption10,caption11,caption12) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
[ data.toaddress.results[cntx].orderid,data.toaddress.results[cntx].opno,data.toaddress.results[cntx].address01,data.toaddress.results[cntx].address02,
  data.toaddress.results[cntx].address03,data.toaddress.results[cntx].address04,data.toaddress.results[cntx].address05,data.toaddress.results[cntx].address06,
  data.toaddress.results[cntx].address07,data.toaddress.results[cntx].address08,data.toaddress.results[cntx].address09,data.toaddress.results[cntx].address10,
  data.toaddress.results[cntx].address11,data.toaddress.results[cntx].address12,data.toaddress.results[cntx].caption01,data.toaddress.results[cntx].caption02,
  data.toaddress.results[cntx].caption03,data.toaddress.results[cntx].caption04,data.toaddress.results[cntx].caption05,data.toaddress.results[cntx].caption06,
  data.toaddress.results[cntx].caption07,data.toaddress.results[cntx].caption08,data.toaddress.results[cntx].caption09,data.toaddress.results[cntx].caption10,
  data.toaddress.results[cntx].caption11,data.toaddress.results[cntx].caption12 ]
})
	  
}
  opMessage("tonotification:"+data.tonotification.results.length)
  for(var cntx=0; cntx < data.tonotification.results.length ; cntx++)
{
	   
myarray.push({
'sql': 'INSERT INTO MyJobDetsNotifLongText ( objtype,objkey,orderno,line_number,format_col,text_line ) VALUES  (?,?,?,?,?,?)', 'data':
[data.tonotification.results[cntx].objtype,data.tonotification.results[cntx].objkey,data.tonotification.results[cntx].order,
data.tonotification.results[cntx].lineNumber,data.tonotification.results[cntx].formatCol,data.tonotification.results[cntx].textLine ]
})
	  
}
  opMessage("tojob_order_ops:"+data.tojob_order_ops.results.length)
  for(var cntx=0; cntx < data.tojob_order_ops.results.length ; cntx++)
{

myarray.push({
'sql': 'INSERT INTO MyJobDetsOrderOps (orderno,operation,comp_date_time,description,status,name   ) VALUES  (?,?,?,?,?,?)', 'data':
[ data.tojob_order_ops.results[cntx].Order,data.tojob_order_ops.results[cntx].Operation,data.tojob_order_ops.results[cntx].CompDateTime,
  data.tojob_order_ops.results[cntx].Description,data.tojob_order_ops.results[cntx].Status,data.tojob_order_ops.results[cntx].Name ]
})
	  
}
  opMessage("toicon_priority:"+data.toicon_priority.results.length)
  for(var cntx=0; cntx < data.toicon_priority.results.length ; cntx++)
{
	 
myarray.push({
'sql': 'INSERT INTO MyJobDetsIconPriority ( orderno,opno,icon_filename,tooltip,tooltip_desc,command ) VALUES  (?,?,?,?,?,?)', 'data':
[data.toicon_priority.results[cntx].orderid,data.toicon_priority.results[cntx].opno,data.toicon_priority.results[cntx].iconFilename,
data.toicon_priority.results[cntx].tooltip,data.toicon_priority.results[cntx].tooltipDesc,data.toicon_priority.results[cntx].command ]
})
	  
}
  opMessage("toicon_job:"+data.toicon_job.results.length)
  for(var cntx=0; cntx < data.toicon_job.results.length ; cntx++)
{
	  
myarray.push({
'sql': 'INSERT INTO MyJobDetsIconJob ( orderno,opno,icon_type,icon_position,icon_filename,icon_txt,tooltip,tooltip_desc,command,grid,grid_vals ) VALUES  (?,?,?,?,?,?,?,?,?,?,?)', 'data':
[data.toicon_job.results[cntx].orderid,data.toicon_job.results[cntx].opno,data.toicon_job.results[cntx].iconType,data.toicon_job.results[cntx].iconPosition,
data.toicon_job.results[cntx].iconFilename,data.toicon_job.results[cntx].iconTxt,data.toicon_job.results[cntx].tooltip,
data.toicon_job.results[cntx].tooltipDesc,data.toicon_job.results[cntx].command,data.toicon_job.results[cntx].grid,data.toicon_job.results[cntx].gridVals ]
})
	  
}
  

  

  //think about new and sending
  
  
  opMessage("toordtimeconf:"+data.toordtimeconf.results.length)
  for(var cntx=0; cntx < data.toordtimeconf.results.length ; cntx++)
{
	  if(localJobDets.indexOf(data.toordtimeconf.results[cntx].orderNo+data.toordtimeconf.results[cntx].activity)<0){   
myarray.push({
'sql': 'INSERT INTO MyTimeConfs (orderno , opno,type, confno , description , date , time , enddate, endtime, duration, empid, final,user) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
[data.toordtimeconf.results[cntx].orderNo,  data.toordtimeconf.results[cntx].activity,
data.toordtimeconf.results[cntx].actType,  data.toordtimeconf.results[cntx].confNo,
data.toordtimeconf.results[cntx].confText, data.toordtimeconf.results[cntx].startDate,
data.toordtimeconf.results[cntx].startTime,data.toordtimeconf.results[cntx].endDate,
data.toordtimeconf.results[cntx].endTime,  data.toordtimeconf.results[cntx].actualDur,
data.toordtimeconf.results[cntx].persNo,   data.toordtimeconf.results[cntx].complete,
data.toordtimeconf.results[cntx].user]
})
	  }
}
 
 
 
 
html5sql.process(
myarray
,
function(){
opMessage("Jobdetails done")
removeOldJobDets(orderlist,orderoplist)

},
function(error, statement){
opMessage("Error: " + error.message + " when inserting MyJobDetails" + statement);
}        
);
 
}
}
function removeOldJobDets(orderList,orderopList){

sqldeleteorders="delete from MyJobDets WHERE orderid||ordnoOp NOT IN ("+orderopList+"); "
sqldeleteorders+="delete from MyJobDetsComps WHERE orderno||opno NOT IN ("+orderopList+"); "
sqldeleteorders+="delete from MyJobDetsAddress WHERE orderno||opno NOT IN ("+orderopList+"); "
sqldeleteorders+="delete from MyJobDetsOrderOps WHERE orderno||operation NOT IN ("+orderopList+"); "
sqldeleteorders+="delete from MyJobDetsIconPriority WHERE orderno||opno NOT IN ("+orderopList+"); "
sqldeleteorders+="delete from MyJobDetsIconJob WHERE orderno||opno NOT IN ("+orderopList+"); "

sqldeleteorders+="delete from MyJobDetsLoch WHERE orderno NOT IN ("+orderList+"); "
sqldeleteorders+="delete from MyJobDetsDraw WHERE orderno NOT IN ("+orderList+"); "
sqldeleteorders+="delete from MyJobDetsNotifLongText WHERE orderno NOT IN ("+orderList+"); "
sqldeleteorders+="delete from MyJobDetsOrderLongText WHERE orderno NOT IN ("+orderList+"); "


sqldeleteorders+="delete from MyTimeConfs WHERE orderno NOT IN ("+orderList+") and confno NOT IN ('NEW','SENDING'); "
sqldeleteorders+="delete from MyNotifications WHERE orderno = '' and notifno not in ('NEW','SENDING'); "
sqldeleteorders+="delete from MyJobAddWork WHERE orderno||opno NOT IN ("+orderopList+") and state NOT IN ('NEW','SENDING'); "
sqldeleteorders+="delete from MyStatus WHERE orderno||opno NOT IN ("+orderopList+") and state NOT IN ('NEW','SENDING'); "
sqldeleteorders+="delete from MyJobClose WHERE orderno||opno NOT IN ("+orderopList+") and state NOT IN ('NEW','SENDING'); "	
sqldeleteorders+="delete from MyFormsResponses WHERE orderno||opno NOT IN ("+orderopList+") and lastupdated ='SENT'; "	
sqldeleteorders+="delete from MyMpointDocs WHERE orderno||opno NOT IN ("+orderopList+") and state ='SENT'; "	






	     html5sql.process(sqldeleteorders,
				 function(){
	    	 if(document.getElementById("JobsCnt")==null){
	    			
	    			console.log("on the Jobs Page")
	    			refreshJobList()
	    		}else{
	    			console.log("on the Home Page")
	    			setOrderCounts();
	    		} 	
				 },
				 function(error, statement){
					
					 opMessage("Error: " + error.message + " when processing " + statement);
					 if(document.getElementById("JobsCnt")==null){
			    			
			    			console.log("on the Jobs Page")
			    			refreshJobList()
			    		}else{
			    			console.log("on the Home Page")
			    			setOrderCounts();
			    		} 	
				 }        
		)
		



}

			


 
function syncUploadAzure(id,type){
// ToDo FileRequest,FileDownload,EOD,JobClose
//Notif Create needs ......obHeader["Assignment"] needs the selected User from the Create Screen
 
 
 
var c040="NA"
var d040=""
var c060="NA"
var d060=""
var c100="NA"
var d100=""
var formalsampletaken = ""
var upstreamsenttolab= ""
var ptofdiscsenttolab= ""
var downstream1senttolab= ""
var downstream2senttolab= ""
var downstream3senttolab= ""
 
//AZURE need to fix the following
// if(checkConnection()=='No network connection'){
// return
// }
 
user=localStorage.getItem("MobileUser")
empid=localStorage.getItem("EmployeeID")
var newDets="";
var currentUser="";
syncDetsSet=false;
var codeval
SAPServerPrefix=$.trim(localStorage.getItem('ServerName'));

sapCalls = 0;
if (!CheckSyncInterval('UPLOAD')){
console.log("upload interval not met")
return; }
if (localStorage.getItem("SAPCalling")=="true"){
console.log("SAP is being Called")
return
}
//opMessage("Synchronizing Upload Data");
console.log(id+"-----"+type)
var syncDetails = false
;
html5sql.process(
"SELECT * from MyUserDets",
function(transaction, results, rowsArray){
if( rowsArray.length > 0) {
curremtUser="&username="+rowsArray[0].user;
SAPServerSuffix="?jsonCallback=?&MYJOBSSYSTEM="+localStorage.getItem('SAPSystem')+"&sap-client="+localStorage.getItem('SAPClient')+"&sap-user="+rowsArray[0].user+"&sap-password="+rowsArray[0].password;
// Need data set up
if(type=="VehicleCheck")// Process Vehicle Defects
{
html5sql.process("SELECT * from MyVehicleCheck where id = '"+id+"'",
function(transaction, results, rowsArray){
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", VehicleCheck:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"VehicleCheck:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
item = rowsArray[0];
if(item['desc'].length<1){
codeval='Y'
}else{
codeval='N'
}
 
newVehicleCheck='&MEAS_POINT='+item['mpoint']+'&MEAS_EQUIP='+item['equipment']+'&MEAS_DATE='+item['mdate']+'&MEAS_TIME='+item['mtime']+
'&MEAS_TEXT='+item['desc']+'&MEAS_LONG_TEXT='+item['longtext']+'&RECNO='+item['id']+
'&MEAS_READ_BY='+item['mreadby']+'&USER='+item['user']+'&MEAS_READING='+item['mileage']+'&MEAS_VAL_CODE='+codeval;
var myjson = {};
 
myjson["NotifNo"]= "";
myjson["MeasDoc"]= "";
myjson["ErrType"]= "";
myjson["NotifType"]= "ZV";
myjson["CheckType"]= "";
myjson["User"]= item['user'];
myjson["MeasCodeGrp"]= "";
myjson["MeasReadBy"]= item['mreadby'];
myjson["MeasLongText"]= item['longtext'];
myjson["MeasText"]= item['desc'];
myjson["MeasValCode"]= codeval;
myjson["MeasTime"]= item['mtime'];
myjson["MeasDate"]= item['mdate'];
myjson["MeasEquip"]= item['equipment'];
myjson["MeasPoint"]= item['mpoint'];
myjson["MeasPointCat"]= "M";
 
 
 
 
sapCalls+=1;
 
html5sql.process("UPDATE MyVehicleCheck SET state = 'SENDING' WHERE id='"+item['id']+"'",
function(){
if(item['reg'].length<1){
myjson["MeasReading"]=""
postAzureData("ZGW_MAM30_VEHICLE_SRV_VehicleChkUpd", myjson,"UPDATE MyVehicleCheck SET state = 'NEW' WHERE id='"+item['id']+"'",item['id']);
 
}else{
myjson["MeasReading"]=item['mileage']
postAzureData("ZGW_MAM30_VEHICLE_SRV_VehicleChkUpd", myjson,"UPDATE MyVehicleCheck SET state = 'NEW' WHERE id='"+item['id']+"'",item['id']);
 
}
 
 
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
 
}
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
//done in azure
if(type=="NotificationsZ7")// Process New Notifications  EOD
{
 
html5sql.process("SELECT * from MyNotifications where id = '"+id+"'",
function(transaction, results, rowsArray){
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", EOD:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"EOD:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
item = rowsArray[0];
 
 
opMessage("New EOD Notifications Details");
var myjson = {};
    var header = {};
    header["BreakDown"] = "";
    header["EquipStatus"] = "";
    header["UserId"] = localStorage.getItem('MobileUser');
    header["AssigToMe"] = "";
    header["SpecReqt"] = "";
    header["Assignment"] = "";
    header["ReportedBy"] = localStorage.getItem('EmployeeID');
    header["Priority"] = "";
    header["PriorityType"] = "";
    header["ActiivityText"] = "";
    header["ActivityCode"] = "";
    header["ActivityCodeGrp"] = "";
    header["ActCatType"] = "";
    header["EndTime"] = "";
    header["EndDate"] = "";
    header["FuncLoc"] = "";
    header["Equipment"] = "";
    header["CodeGroup"] = "";
    header["StartTime"] = "";
    header["Coding"] = "";
    header["ShortText"] = item['shorttext'];
    header["LongText"] = "";
    header["StartDate"] = ""
 
    myjson["Header"] = header;
 
    //myjson["Abcindic"] = "";
    //myjson["FunclocCreate"] = "";
    //myjson["FunclocDesc"] = "";
    //myjson["FunclocDisp"] = "";
    //myjson["FunctLoc"] = "";
    //myjson["Notiftmez"] = "";
    //myjson["SalesGrp"] = "";
    //myjson["SalesOffice"] = "";
    //myjson["Devicedata"] = "";
    //myjson["DeleteFlag"] = "";
    //myjson["Serialno"] = "";
    //myjson["PmWkctr"] = "";
    //myjson["CatType"] = "";
    //myjson["AddrNumber"] = "";
    //myjson["DistrChan"] = "";
    //myjson["SalesOrg"] = "";
    //myjson["Division"] = "";
    //myjson["PurchDate"] = "";
    //myjson["PurchNoC"] = "";
    //myjson["SalesOrd"] = "";
    //myjson["Reftime"] = "";
    //myjson["Refdate"] = "";
    //myjson["Longtxtexist"] = "";
    //myjson["NotifNo"] = "";
    //myjson["Prilang"] = "";
    //myjson["Planplant"] = "";
    //myjson["LocAcc"] = "";
    //myjson["EquipmentDesc"] = "";
    //myjson["Catprofile"] = "";
    //myjson["EquipmentCreate"] = "";
    //myjson["Assembly"] = "";
    //myjson["AssemblyDesc"] = "";
    //myjson["Comptime"] = "";
    //myjson["Breakdown"] = "";
    //myjson["Strmlfndate"] = "";
    //myjson["Endmlfndate"] = "";
    //myjson["Compdate"] = "";
    //myjson["Strmlfntime"] = "";
    //myjson["Endmlfntime"] = "";
    //myjson["Downtime"] = "";
    //myjson["ObjectNo"] = "";
    //myjson["Unit"] = "";
    //myjson["IsocodeUnit"] = "";
    //myjson["Plangroup"] = "";
    //myjson["CustNo"] = "";
    //myjson["Mntplan"] = "";
    //myjson["MntcallNo"] = "";
    //myjson["Maintitem"] = "";
    //myjson["MatlDesc"] = "";
    myjson["ShortText"] = item['shorttext'];
    //myjson["Priotype"] = "";
    //myjson["Priority"] = "";
    //myjson["Material"] = "";
    //myjson["Notiftime"] = "";
    //myjson["NotifDate"] = "";
    myjson["Reportedby"] = localStorage.getItem('EmployeeID');
    //myjson["Orderid"] = "";
    //myjson["Desstdate"] = "";
    //myjson["Dessttime"] = "";
    //myjson["Desenddate"] = "";
    //myjson["Desendtm"] = "";
    //myjson["Sortfield"] = "";
    //myjson["Maintplant"] = "";
    //myjson["Maintloc"] = "";
    //myjson["Maintroom"] = "";
    //myjson["Plsectn"] = "";
    //myjson["PpWkctr"] = "";
    //myjson["BusArea"] = "";
    //myjson["CoArea"] = "";
    //myjson["Costcenter"] = "";
    //myjson["WbsElement"] = "";
    //myjson["AssetNo"] = "";
    //myjson["SubNumber"] = "";
    //myjson["Stdgord"] = "";
    //myjson["Stlmtorder"] = "";
    //myjson["CompCode"] = "";
    //myjson["SalesOrgLocAcc"] = "";
    //myjson["DivisionLocAcc"] = "";
    //myjson["DistChanLocAcc"] = "";
    //myjson["AddrNoLocAcc"] = "";
    //myjson["DocNumber"] = "";
    //myjson["ItmNumber"] = "";
    //myjson["Scenario"] = "";
    //myjson["Refobjecttype"] = "";
    //myjson["Refobjectkey"] = "";
    //myjson["Refreltype"] = "";
    //myjson["XaStatProf"] = "";
    //myjson["MnWkCtr"] = "";
    //myjson["Plant"] = "";
    //myjson["EnhancementFlag"] = "";
    //myjson["EquipmentDisplay"] = "";
    //myjson["FunclocDisplay"] = "";
    //myjson["NotifSortno"] = "";
    //myjson["NotifPushed"] = "";
    //myjson["NotifNoDisplay"] = "";
    //myjson["OrderidDisplay"] = "";
    myjson["ActCatTyp"] = "A";
    myjson["ActCodegrp"] = "DENDTRVL";
    myjson["ActCode"] = "DE01";
    //myjson["ActText"] = "";
    //myjson["MessageType"] = "";
    //myjson["Message"] = "";
    myjson["NotifType"] = item['type'];
    myjson["ActStartDate"] = item['startdate'];
    myjson["ActStartTime"] = item['starttime'];
    myjson["ActEndDate"] = item['enddate'];
    myjson["ActEndTime"] = item['endtime'];
    myjson["User"] =localStorage.getItem('MobileUser');
    //myjson["Equip"] = "";
    //myjson["Descript"] = "";
    //myjson["Dcattyp"] = "";
    //myjson["DcodeGrp"] = "";
    //myjson["Dcode"] = "";
    //myjson["DLCatTyp"] = "";
    //myjson["DLCodeGrp"] = "";
    //myjson["DLCode"] = "";
    //myjson["CauseText"] = "";
    //myjson["CauseCatTyp"] = "";
    //myjson["CauseCodeGrp"] = "";
    //myjson["CauseCode"] = ""
 
 
    //postAzureData("ZGW_MAM30_NOTIFICATION_NotifHeader", myjson)
 
sapCalls+=1;
n=rowsArray.length
html5sql.process("UPDATE MyNotifications SET notifno = 'SENDING' WHERE id='"+item['id']+"'",
function(){
postAzureData("ZGW_MAM30_NOTIFICATION_NotifHeaderCreate", myjson,"UPDATE MyNotifications SET notifno = 'NEW' WHERE id='"+item['id']+"'",item['id']);
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
//done in Azure
if(type=="Notifications")// Process New Notifications  
{
//obHeader["Assignment"] needs the selected User from the Create Screen
html5sql.process("SELECT * from MyNotifications where id = '"+id+"'",
function(transaction, results, rowsArray){
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Notifications:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"Notifications:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
item = rowsArray[0];
 
+'&ID='+item['id'];
 
 
var myjson = {};
var jobHeader = {};
jobHeader["BreakDown"] = "";
jobHeader["EquipStatus"] = "";
jobHeader["UserId"] = localStorage.getItem('MobileUser');
jobHeader["AssigToMe"] = item['assigntome'];
jobHeader["SpecReqt"] = "";
jobHeader["Assignment"] = "";
jobHeader["ReportedBy"] = localStorage.getItem('EmployeeID');
jobHeader["Priority"] = "";
jobHeader["PriorityType"] = "";
jobHeader["ActiivityText"] = "";
jobHeader["ActivityCode"] = "";
jobHeader["ActivityCodeGrp"] = "";
jobHeader["ActCatType"] = "";
jobHeader["EndTime"] = item['starttime'];
jobHeader["EndDate"] = item['startdate'];
jobHeader["FuncLoc"] = item['funcloc'];
jobHeader["Equipment"] = item['equipment'];
jobHeader["CodeGroup"] = item['pgroup'];
jobHeader["StartTime"] = item['starttime'];
jobHeader["Coding"] = item['pcode'];
jobHeader["ShortText"] = item['shorttext'];
jobHeader["LongText"] = item['longtext'];
jobHeader["StartDate"] = item['startdate']
myjson["JobHeader"] = jobHeader;
myjson["Message"] = "";
myjson["Qmart"] = item['type'];
myjson["Messagetype"] = ""
 
 
 
sapCalls+=1;
n=rowsArray.length
html5sql.process("UPDATE MyNotifications SET notifno = 'SENDING' WHERE id='"+item['id']+"'",
function(){
postAzureData("ZGW_MAM30_NOTIFICATION_CreateNewJob", myjson,"UPDATE MyNotifications SET notifno = 'NEW' WHERE id='"+item['id']+"'",item['id']);
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
//Done in Azure
if(type=="StatusUpdate")// Process Status Updates  
{
html5sql.process("SELECT * from MyStatus where id = '"+id+"'",
function(transaction, results, rowsArray){
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Status:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"Status:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
 
 
 
item = rowsArray[0];
var myjson = {};
myjson["Message"] = "";
 
myjson["UserId"] = localStorage.getItem('MobileUser');
myjson["ActTime"] = item['acttime'];
myjson["ActDate"] = item['actdate'].substring(8,10)+"."+item['actdate'].substring(5,7)+"."+item['actdate'].substring(0,4);
myjson["InactiveStat"] = "";
myjson["OpNo"] = item['opno'];
myjson["OrderNo"] = item['orderno'];
myjson["Status"] = item['status'];
myjson["Stsma"] = "";
 
sapCalls+=1;
n = rowsArray.length
html5sql.process("UPDATE MyStatus SET state = 'SENDING' where id='"+item['id']+"'",
function(){
postAzureData("ZGW_MAM30_SET_OP_STATUS_ORDER", myjson,"UPDATE MyStatus SET state = 'NEW' where id='"+item['id']+"'",item['id'])
 
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
if(type=="FileRequest")// Process Status Updates 
{
 
html5sql.process("SELECT * from MyJobDetsDraw where id = '"+id+"'",
function(transaction, results, rowsArray){
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", FileRequest:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"FileRequest:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
item = rowsArray[0];
if(item['zact'].length<4){
opno="0010"
}else{
opno=item['opno']
}
params='?reqname='+localStorage.getItem('MobileUser')+item['orderno']+opno+item['id']+".xml"+"&id="+item['id']+
'&orderno='+parseInt(item['orderno'], 10)+'&opno='+opno+'&user='+localStorage.getItem('MobileUser')+'&scenario=Y008'+'&scenariodesc=Y008Desc'+'&mname='+localStorage.getItem('MobileUser')+'&nodeid='+trim(item['nodeid'])
opMessage("File Request="+params);
 
sapCalls+=1;
n = rowsArray.length
html5sql.process("UPDATE MyJobDetsDraw SET zurl = 'WaitingLiveLink' where id='"+item['id']+"'",
function(){
 
buildJobDocsTable();
postAzureDoc("DocumentService",[],'MYJOBSFileRequest.php'+params,"UPDATE MyJobDetsDraw SET zurl = 'RequestLiveLink' where id='"+item['id']+"'",item['id'])
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
}       
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
if(type=="FileDownload")// Process LLDownloads  
{
 
html5sql.process("SELECT * from MyJobDetsDraw where id = '"+id+"'",
function(transaction, results, rowsArray){
 
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", FileDownload:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"FileDownload:"+String(rowsArray.length));
}
 
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
dir="MyJobs/User/"+localStorage.getItem('MobileUser')+"/"+parseInt(rowsArray[0]['orderno'],10).toString()+"-0010"
fname=rowsArray[0]['fname']
 
 
sapCalls+=1;
n = rowsArray.length
html5sql.process("UPDATE MyJobDetsDraw SET zurl = 'DownloadingLiveLink' where id='"+rowsArray[0]['id']+"'",
function(){
buildJobDocsTable();
downlodRequestedFile(dir,fname,rowsArray[0]['id'])
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
//
if(type=="JobClose")// Process Close Jobs
{
 
html5sql.process("SELECT * from MyJobClose where id = '"+id+"'",
function(transaction, results, rowsArray){
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Close:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"Close:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
item = rowsArray[0];
 
 
 
 
 
var myjson = {};
    var header = {};
   
    header["BreakDown"] = "";
    header["EquipStatus"] = "";
    //header["UserId"] = localStorage.getItem('MobileUser');
    header["AssigToMe"] = "";
    header["SpecReqt"] = "";
    header["Assignment"] = "";
    header["ReportedBy"] = "";
    header["Priority"] = "";
    header["PriorityType"] = "";
    header["ActiivityText"] = "";
    header["ActivityCode"] = "";
    header["ActivityCodeGrp"] = "";
    header["ActCatType"] = "";
    header["EndTime"] = "";
    header["EndDate"] = "";
    header["FuncLoc"] = item['funcloc'];
   //header["Equipment"] = item['equipment'];
    header["CodeGroup"] = "";
    header["StartTime"] = "";
    header["Coding"] = "";
    header["ShortText"] = "";
    //header["LongText"] = item['details'];
    header["StartDate"] = ""

    myjson["Header"] = header;
 
    //myjson["Abcindic"] = "";
    //myjson["FunclocCreate"] = "";
    //myjson["FunclocDesc"] = "";
    //myjson["FunclocDisp"] = "";
    //myjson["FunctLoc"] = "";
    //myjson["Notiftmez"] = "";
    //myjson["SalesGrp"] = "";
    //myjson["SalesOffice"] = "";
    //myjson["Devicedata"] = "";
    //myjson["DeleteFlag"] = "";
    //myjson["Serialno"] = "";
    //myjson["PmWkctr"] = "";
    //myjson["CatType"] = "";
    //myjson["AddrNumber"] = "";
    //myjson["DistrChan"] = "";
    //myjson["SalesOrg"] = "";
    //myjson["Division"] = "";
    //myjson["PurchDate"] = "";
    //myjson["PurchNoC"] = "";
    //myjson["SalesOrd"] = "";
    //myjson["Reftime"] = "";
    //myjson["Refdate"] = "";
    //myjson["Longtxtexist"] = "";
   
    myjson["NotifNo"] = item['notifno'];
    myjson["toNotifItem"] = [];
    myjson["toNotifLongText"] = [];
    myjson["toNotifCause"] = [];
    myjson["Equip"] = item["equipment"]
    myjson["User"] = localStorage.getItem('MobileUser');
    myjson["Longtxtexist"] = item['details'];
    //myjson["UserId"] = localStorage.getItem('MobileUser');
    //myjson["Prilang"] = "";
    //myjson["Planplant"] = "";
    //myjson["LocAcc"] = "";
    //myjson["EquipmentDesc"] = "";
    //myjson["Catprofile"] = "";
    //myjson["EquipmentCreate"] = "";
    //myjson["Assembly"] = "";
    //myjson["AssemblyDesc"] = "";
    //myjson["Comptime"] = "";
    //myjson["Breakdown"] = "";
    //myjson["Strmlfndate"] = "";
    //myjson["Endmlfndate"] = "";
    //myjson["Compdate"] = "";
    //myjson["Strmlfntime"] = "";
    //myjson["Endmlfntime"] = "";
    //myjson["Downtime"] = "";
    //myjson["ObjectNo"] = "";
    //myjson["Unit"] = "";
    //myjson["IsocodeUnit"] = "";
    //myjson["Plangroup"] = "";
    //myjson["CustNo"] = "";
    //myjson["Mntplan"] = "";
    //myjson["MntcallNo"] = "";
    //myjson["Maintitem"] = "";
    //myjson["MatlDesc"] = "";
    //myjson["ShortText"] = "";
    //myjson["Priotype"] = "";
    //myjson["Priority"] = "";
    //myjson["Material"] = "";
    //myjson["Notiftime"] = "";
    //myjson["NotifDate"] = "";
    //myjson["Reportedby"] = "";
    //myjson["Orderid"] = "";
    //myjson["Desstdate"] = "";
    //myjson["Dessttime"] = "";
    //myjson["Desenddate"] = "";
    //myjson["Desendtm"] = "";
    //myjson["Sortfield"] = "";
    //myjson["Maintplant"] = "";
    //myjson["Maintloc"] = "";
    //myjson["Maintroom"] = "";
    //myjson["Plsectn"] = "";
    //myjson["PpWkctr"] = "";
    //myjson["BusArea"] = "";
    //myjson["CoArea"] = "";
    //myjson["Costcenter"] = "";
    //myjson["WbsElement"] = "";
    //myjson["AssetNo"] = "";
    //myjson["SubNumber"] = "";
    //myjson["Stdgord"] = "";
    //myjson["Stlmtorder"] = "";
    //myjson["CompCode"] = "";
    //myjson["SalesOrgLocAcc"] = "";
    //myjson["DivisionLocAcc"] = "";
    //myjson["DistChanLocAcc"] = "";
    //myjson["AddrNoLocAcc"] = "";
    //myjson["DocNumber"] = "";
    //myjson["ItmNumber"] = "";
    //myjson["Scenario"] = "";
    //myjson["Refobjecttype"] = "";
    //myjson["Refobjectkey"] = "";
    //myjson["Refreltype"] = "";
    //myjson["XaStatProf"] = "";
    //myjson["MnWkCtr"] = "";
    //myjson["Plant"] = "";
    //myjson["EnhancementFlag"] = "";
    //myjson["EquipmentDisplay"] = "";
    //myjson["FunclocDisplay"] = "";
    //myjson["NotifSortno"] = "";
    //myjson["NotifPushed"] = "";
    //myjson["NotifNoDisplay"] = "";
    //myjson["OrderidDisplay"] = "";
    //myjson["ActCatTyp"] = "A";
    //myjson["ActCodegrp"] = "DENDTRVL";
    //myjson["ActCode"] = "DE01";
    //myjson["ActText"] = "";
    //myjson["MessageType"] = "";
    //myjson["Message"] = "";
    //myjson["NotifType"] = item['type'];
    //myjson["ActStartDate"] = item['startdate'];
    //myjson["ActStartTime"] = item['starttime'];
    //myjson["ActEndDate"] = item['enddate'];
    //myjson["ActEndTime"] = item['endtime'];
    //myjson["User"] = "";
    //myjson["Equip"] = "";
    //myjson["Descript"] = "";
    myjson["Dcattyp"] = "R";
    myjson["DcodeGrp"] = item['agrp'];
    myjson["Dcode"] = item['acode'];
    myjson["DLCatTyp"] = "P";
    myjson["DLCodeGrp"] = item['pgrp'];
    myjson["DLCode"] = item['pcode'];
    myjson["CauseText"] = "";
    myjson["CauseCatTyp"] ="S";
    myjson["CauseCodeGrp"] = item['igrp'];
    myjson["CauseCode"] = item['icode'];
 
 
 
 
 
opMessage("Close Notif Update Details");
 
 
sapCalls+=1;
 
html5sql.process("UPDATE MyJobClose SET state = 'SENDING' WHERE id='"+item['id']+"'",
function(){
 
if (item['notifno'].length>5){
 
postAzureData("ZGW_MAM30_NOTIFICATION_NotifHeaderUpdate", myjson,"UPDATE MyJobClose SET state = 'NEW' WHERE id='"+item['id']+"'",item['id']);
 
}
 
},
function(error, statement){
// alert("Error: " + error.message + " when processing " + statement);
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
if(type=="JobAddWork")// Process New Add Work
{					
			
		html5sql.process("SELECT * from MyJobAddWork where id = '"+id+"'",
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					if (syncDetails){
						localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", EOD:"+String(rowsArray.length));
					}else{
						syncDetails=true;
						localStorage.setItem('LastSyncUploadDetails',"EOD:"+String(rowsArray.length));
					}
					if(!syncDetsSet){
						syncDetsSet=true;
						SetLastSyncDetails("LASTSYNC_UPLOAD");
						
						}
					
					
						item = rowsArray[0];
						newDets='&order='+item['orderno']+'&opno='+item['opno']+'&specreqt='+item['specreqt']+'&startdate='+item['startdate']+'&assignment='+item['assignment']+
						'&wktycd='+item['wktycd']+'&wktygp='+item['wktygp']+'&longtext='+item['longtext']+'&state='+item['state']+'&ID='+item['id'];;
						opMessage("New Additional Work Notifications Details="+newDets);
					    var myjson = {};
					    myjson["Message"] = "";
					    myjson["MessageType"] = "";
					    myjson["LongText"] = "";
					    myjson["UserId"] = localStorage.getItem('MobileUser');
					    myjson["SpecReqt"] = item['specreqt'];
					    myjson["StartDate"] = item['startdate'];
					    myjson["Assignment"] = item['assignment'];
					    myjson["Wktycd"] = item['wktycd'];
					    myjson["Wktygp"] = item['wktygp'];
					    myjson["Orderno"] = item['orderno'];
					   
					    
						sapCalls+=1;
						n=rowsArray.length
						html5sql.process("UPDATE MyJobAddWork SET state = 'SENDING' WHERE id='"+item['id']+"'",
								 function(){
									postAzureData("ZGW_MAM30_CREATE_ADD_WRK", myjson,"UPDATE MyJobAddWork SET state = 'NEW' WHERE id='"+item['id']+"'");
									
								 },
								 function(error, statement){
									 
									 opMessage("Error: " + error.message + " when processing " + statement);
								 }        
						);
					
					}
				},
				 function(error, statement){
					 
					 opMessage("Error: " + error.message + " when processing " + statement);
				 });
		}
if(type=="Flooding")// Flooding Form
{
 
 
sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",
 
html5sql.process(sqlstatement,
function(transaction, results, rowsArray){
 
if(rowsArray.length>0){
 
jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Flooding:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"Flooding:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
 
 
 
item = rowsArray[0];
 
 
 
myjson["I_LONG_TEXT"] = "",
myjson["I_NOTIF_NO"] = rowsArray[0].notifno,
myjson["I_TYPE"] = "D",
myjson["I_OPTION"] = "C",
myjson["I_SETORDER_DG5"] = "X",
myjson["I_USERID"] = "POSTRIDGE2",
myjson["toText"] = []
var pdepth="";
var pitem="";
 
 
  var ToTlineItem = [];
var tlineItem = {};
 
 
 
 
 
locsArray = [""]
 
for(var cnt=0; cnt < jsonstr[0].location.length ; cnt++)
{
if(cnt>0){
pitem+=","
}
row=cnt+1;
litenno = row *10;
litem = ("0000" + litenno).slice(-4)
type=jsonstr[0].location[cnt]["loctype-"+row].split(":")
subtype=jsonstr[0].location[cnt]["locsubtype-"+row].split(":")
severity=jsonstr[0].location[cnt]["locseverity-"+row].split(":")
floc=jsonstr[0].location[cnt]["locfloc-"+row].split(":")
comments=jsonstr[0].location[cnt]["loccomments-"+row].split(":")
tlineItem["Depth"] = "1.00",
    tlineItem["Severity"] = severity[0],
    tlineItem["Zaselect"] = "",
    tlineItem["Zacomm"] = comments[0],
    tlineItem["Zagrdrf"] = "",
    tlineItem["City1"] = "",
    tlineItem["Zaposcd"] = "",
    tlineItem["Zapltxt"] = "",
    tlineItem["Zaparish"] = "",
    tlineItem["StrSuppl2"] = "",
    tlineItem["City2"] = "",
    tlineItem["Zahouse"] = "",
    tlineItem["Zastreet"] = "",
    tlineItem["Zadlindl"] = "",
    tlineItem["Zapymdn"] = "",
    tlineItem["Zapyrdat"] = "",
    tlineItem["Zapymrq"] = "",
    tlineItem["Zapymd"] = "",
    tlineItem["Zaincident"] = "",
    tlineItem["Zatplnr"] = floc[0],
    tlineItem["Zafsty"] = subtype[0],
    tlineItem["Zaftyp"] = type[0],
    tlineItem["Zaitem"] = litem,
    tlineItem["Aufnr"] = rowsArray[0].orderno
    ToTlineItem.push(tlineItem);
locsArray.push(floc[0])
//alert("Loc:"+orderno+','+litem+","+type[0]+","+subtype[0]+","+floc[0])
}
myjson["toTlineItem"] = ToTlineItem;
roomsArray=[]
for(var cnt=0; cnt < jsonstr[0].room.length ; cnt++)
{
row=cnt+1;
loc=jsonstr[0].room[cnt]["roomloc-"+row].split(":")
room=jsonstr[0].room[cnt]["roomroom-"+row].split(":")
depth=jsonstr[0].room[cnt]["roomdepth-"+row].split(":")
comments=jsonstr[0].room[cnt]["roomcomments"+row].split(":")
 
roomsArray.push(loc[0]+"|"+room[0]+"|"+depth[0]+"|"+comments[0])
 
 
}
roomsArray.sort();
var pdepth="";
var wasitem=0;
dno=1;
    var ToTimeDepth = [];
var timeDepth = {};
for(var cnt=0; cnt < roomsArray.length ; cnt++)
{
if(cnt>0){
pdepth+=","
}
theroom = roomsArray[cnt].split("|");
row=cnt+1;
loc=theroom[0]
litemno = row *10;
f1=locsArray.indexOf(loc);
if (f1!=wasitem){
wasitem = f1;
dno=1;
}else{
dno++;
}
litem=("0000" + f1*10).slice(-4)
ditem=("0000" + dno*10).slice(-4)
 
room=theroom[1]
depth=theroom[2]
comments=theroom[3]
 
 
timeDepth["Zaselect"] = "",
timeDepth["Comments"] = comments,
timeDepth["Zdpridcdx"] = "",
timeDepth["Zdepthcd"] = depth,
timeDepth["Zdprircdx"] = "",
timeDepth["Zroomcd"] = room,
timeDepth["Zaditem"] = ditem,
timeDepth["Zaitem"] = litem,
timeDepth["Aufnr"] = rowsArray[0].orderno
ToTimeDepth.push(timeDepth);
 
 
 
}
 
 
 
myjson["toTimeDepth"] = ToTimeDepth;
 
//need to populate the PHDR
//sort date & time formats
gridref=jsonstr[0].gridref.split(",");
if(gridref.length>1){
ENRef=gridref[0].substring(0,9)+":"+gridref[1].substring(0,9)
}else{
ENRef=gridref
}
jsonstr[0].floodtime=jsonstr[0].floodtime+":00"
jsonstr[0].attendancetime=jsonstr[0].attendancetime+":00"
flooddate=jsonstr[0].flooddate.substring(6,10)+jsonstr[0].flooddate.substring(3,5)+jsonstr[0].flooddate.substring(0,2)
floodtime=jsonstr[0].floodtime.substring(0,2)+jsonstr[0].floodtime.substring(3,5)+jsonstr[0].floodtime.substring(6,8)
attenddate=jsonstr[0].attendancedate.substring(6,10)+jsonstr[0].attendancedate.substring(3,5)+jsonstr[0].attendancedate.substring(0,2)
attendtime=jsonstr[0].attendancetime.substring(0,2)+jsonstr[0].attendancetime.substring(3,5)+jsonstr[0].attendancetime.substring(6,8)
 
var i_HDR = {};
i_HDR["Zarootca"] = jsonstr[0].rootcause,
i_HDR["Zaflsrc"] = jsonstr[0].floodingsource,
i_HDR["Zaipflcd"] = jsonstr[0].previousflooding,
i_HDR["Zaatwea"] = jsonstr[0].attendanceweather,
i_HDR["Zaattim"] = attendtime,
i_HDR["Zaatdat"] = attenddate,
i_HDR["Zaspill"] = jsonstr[0].spillsize,
i_HDR["Zacomm"] = "",
i_HDR["Aenam"] = "",
i_HDR["Aedat"] = "",
i_HDR["Ernam"] = user,
i_HDR["Erdat"] = getShortSAPDate(),
i_HDR["Zacomp"] = empid,
i_HDR["Zaintim"] = floodtime,
i_HDR["Zaindat"] = flooddate,
i_HDR["Zadlindh"] = "",
i_HDR["Zaefgr"] = ENRef,
i_HDR["Zacacd"] = jsonstr[0].causeofflood,
i_HDR["Zapsas"] = jsonstr[0].psshortcode,
i_HDR["Zaaref"] = jsonstr[0].assetref.trim(),
i_HDR["Aufnr"] = rowsArray[0].orderno
myjson["I_HDR"] = i_HDR;
 
 
 
 
 
 
 
 
 
sapCalls+=1;
 
html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
function(){
 
postAzureData("ZGW_MAM30_DG5_PIA_UPDATE", myjson,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'",item['id']);
},
function(error, statement){
// alert("Error: " + error.message + " when processing " + statement);
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
if(type=="Pollution")// Pollution Form
{
 
sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",
 
html5sql.process(sqlstatement,
function(transaction, results, rowsArray){
 
if(rowsArray.length>0){
 
jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Pollution:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"Pollution:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
 
 
 
item = rowsArray[0];
 
if(jsonstr[0].formalsampletakenV=="YES"){
formalsampletaken="X"
}
if(jsonstr[0].upstreamsenttolabV=="YES"){
upstreamsenttolab="X"
}
if(jsonstr[0].ptofdiscsenttolabV=="YES"){
ptofdiscsenttolab="X"
}
if(jsonstr[0].downstream1senttolabV=="YES"){
downstream1senttolab="X"
}
if(jsonstr[0].downstream2senttolabV=="YES"){
downstream2senttolab="X"
}
if(jsonstr[0].downstream3senttolabV=="YES"){
downstream3senttolab="X"
}
 
 
 
 
    var myjson = {};
    var i_PIA = {};
    i_PIA["Zsampsentlabd3"] = downstream3senttolab.trim(),
    i_PIA["Zsampsentlabd2"] = downstream2senttolab.trim(),
    i_PIA["Zsampsentlabd1"] = downstream1senttolab.trim(),
  i_PIA["Zsampsentlabpt"] = ptofdiscsenttolab.trim(),
  i_PIA["Zsampsentlabup"] = upstreamsenttolab.trim(),
  i_PIA["Zonsitenh3d3"] = jsonstr[0].downstream3onsitenh3.trim(),
  i_PIA["Zonsitenh3d2"] = jsonstr[0].downstream2onsitenh3.trim(),
  i_PIA["Zonsitenh3d1"] = jsonstr[0].downstream1onsitenh3.trim(),
  i_PIA[  "Zonsitenh3pt"] = jsonstr[0].ptofdisconsitenh3.trim(),
  i_PIA["Zonsitenh3up"] = jsonstr[0].upstreamonsitenh3.trim(),
  i_PIA[  "Zdistfrptdisd3"] = jsonstr[0].downstream3distance.trim(),
  i_PIA["Zdistfrptdisd2"] = jsonstr[0].downstream2distance.trim(),
  i_PIA["Zdistfrptdisd1"] = jsonstr[0].downstream1distance.trim(),
  i_PIA["Zdistfrptdispt"] = jsonstr[0].ptofdiscdistance.trim(),
  i_PIA[  "Zdistfrptdisup"] = jsonstr[0].upstreamdistance.trim(),
  i_PIA[  "Zaeicdx"] = "",
  i_PIA["Zaeicd"] = jsonstr[0].aestheticimpact.trim(),
  i_PIA["Zamicdx"] = "",
  i_PIA["Zamicd"] = jsonstr[0].amenitiesimpact.trim(),
  i_PIA["Zsqm"] = jsonstr[0].sizeofimpact.trim(),
  i_PIA["Zsmptkn"] = formalsampletaken.trim(),
  i_PIA["Zwcwcdx"] = "",
  i_PIA["Zwcwcd"] = jsonstr[0].watercoursewidth.trim(),
  i_PIA["Zwctcdx"] = "",
  i_PIA["Zwctcd"] = jsonstr[0].watercoursetype.trim(),
  i_PIA["Zdiscdx"] = "",
  i_PIA["Zdiscd"] = jsonstr[0].dischargetype.trim(),
  i_PIA["Zpsiteval"] = jsonstr[0].pollutionsite.trim(),
  i_PIA["Zpsitecdx"] = "",
  i_PIA["Zpsitecd"] =jsonstr[0].pollutionsitetype.trim(),
  i_PIA[  "Aufnr"] = rowsArray[0].orderno
    myjson["I_PIA"] = i_PIA;
   
 
    myjson["I_HDR"] = [];
 
    myjson["I_AUFNR"] = rowsArray[0].orderno,
    myjson["I_ZASTYP"] = "",
    myjson["I_ZAWEAT"] = "",
    myjson["I_ZAESSTA"] = "",
    myjson["I_LONG_TEXT"] = "PIA Create",
    myjson["I_NOTIF_NO"] = rowsArray[0].notifno,
    myjson["I_TYPE"] = "P",
    myjson["I_OPTION"] = "C",
    myjson["I_SETORDER_DG5"] = "",
    myjson["I_USERID"] = user,
    myjson["toText"] = []
   
  myjson["toTimeDepth"] =[];
      myjson["toTlineItem"] = [];
      myjson["toRetTab"] =  []
   
     
 
 
 
 
 
sapCalls+=1;
 
html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
function(){
postAzureData("ZGW_MAM30_DG5_PIA_UPDATE", myjson,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'",item['id']);
},
function(error, statement){
// alert("Error: " + error.message + " when processing " + statement);
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
 
 
if(type=="CustomerFeedback")// Pollution Form
{
 
sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",
 
html5sql.process(sqlstatement,
function(transaction, results, rowsArray){
 
if(rowsArray.length>0){
 
jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Pollution:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"Pollution:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
 
}
 
 
 
 
item = rowsArray[0];
if(jsonstr[0].reason.length>0){
c040="LT"
d040=jsonstr[0].reason
}
if(jsonstr[0].cause.length>0){
c060="LT"
d060=jsonstr[0].cause
}
if(jsonstr[0].ppmdetails.length>0){
c100="LT"
d100=jsonstr[0].ppmdetails
}
 
 
 
var myjson = {};
 
var notfld = {};
notfld["ActTextl11"] = "";
notfld["ActText11"] = "";
notfld["ActCode11"] = "";
notfld["ActCodegrp11"] = "";
notfld["ActTextl10"] = ActTextl10;
notfld["ActText10"] = d100;
notfld["ActCode10"] = c100;
notfld["ActCodegrp10"] = "CUST100";
notfld["ActTextl9"] = ActTextl9;
notfld["ActText9"] = jsonstr[0].ppmV;
notfld["ActCode9"] = jsonstr[0].ppmV.substring(0,1);
notfld["ActCodegrp9"] = "CUST090";
notfld["ActTextl8"] = ActTextl8;
notfld["ActText8"] = jsonstr[0].additionalworkV;
notfld["ActCode8"] = jsonstr[0].additionalworkV.substring(0,1);
notfld["ActCodegrp8"] = "CUST080";
notfld["ActTextl7"] = ActTextl7;
notfld["ActText7"] = jsonstr[0].furtherworkV;
notfld["ActCode7"] = jsonstr[0].furtherworkV.substring(0,1);
notfld["ActCodegrp7"] = "CUST070";
notfld["ActTextl6"] = ActTextl6;
notfld["ActText6"] = d060;
notfld["ActCode6"] = c060;
notfld["ActCodegrp6"] = "CUST060";
notfld["ActTextl5"] = ActTextl5;
notfld["ActText5"] = sonstr[0].resolvedV;
notfld["ActCode5"] = jsonstr[0].resolvedV.substring(0,1);
notfld["ActCodegrp5"] = "CUST050";
notfld["ActTextl4"] = ActTextl4;
notfld["ActText4"] = d040;
notfld["ActCode4"] = c040;
notfld["ActCodegrp4"] = "CUST040";
notfld["ActTextl3"] = ActTextl3;
notfld["ActText3"] = jsonstr[0].custsatifaction;
notfld["ActCode3"] = jsonstr[0].custsatifaction;
notfld["ActCodegrp3"] = "CUST030"
notfld["ActTextl2"] = ActTextl2;
notfld["ActText2"] = jsonstr[0].contactcardV;
notfld["ActCode2"] = jsonstr[0].contactcardV.substring(0,1);
notfld["ActCodegrp2"] = "CUST020";
notfld["ActTextl1"] = ActTextl1;
notfld["ActText1"] = jsonstr[0].spokentoV;
notfld["ActCode1"] = sonstr[0].spokentoV.substring(0,1);
notfld["ActCodegrp1"] = "CUST010";
 
notfld["UserStatusH"] = rowsArray[0].opno;
notfld["Plant"] = rowsArray[0].plant;
notfld["MainWorkCtr"] = rowsArray[0].wc;
notfld["OrderId"] = rowsArray[0].orderno;
notfld["ReportedBy"] = ReportedBy;
notfld["ShortText"] = ShortText;
 
 
myjson["Notflds"] = notfld;
myjson["Message"] = "";
myjson["UserId"] = user;
myjson["NotifType"] = "ZC";
myjson["MessageType"] = "";
myjson["NotifNo"] = rowsArray[0].notifno;
 
 
 
sapCalls+=1;
 
html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
function(){
postAzureData("ZGW_MAM30_011_CREATE_CFEED", myjson,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'",item['id']);
 
},
function(error, statement){
// alert("Error: " + error.message + " when processing " + statement);
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
// done in azure
if(type=="TimeConf")// Process Time Confirmations  
{
 
html5sql.process("SELECT * from MyTimeConfs where id = '"+id+"'",
 
function(transaction, results, rowsArray){
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", TimeConfs:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"TimeConfs:"+String(rowsArray.length));
}
 
item = rowsArray[0];
if(item['final']=="Yes"){
fconf="X";
}else{
fconf="";
}
if(item['duration']==null){
duration="";
}else{
duration=item['duration'];
}
var myjson = {};
myjson["Messagetype"] = "";
myjson["Message"] = "";
myjson["ConfirmCounter"] = "";
myjson["ConfirmNo"] = "";
myjson["RemWork"] = item['rem_work'];
myjson["LonText"] = item['longtext'];
myjson["FinalConfFlag"] = item['final'];
myjson["Reason"] = item['reason'];
myjson["PersNo"] = item['empid'];
myjson["workCntr"] = item['work_cntr'];
myjson["ActType"] = item['type'];
myjson["ExecFinTime"] = item['endtime'];
myjson["ExecFinDate"] = item['enddate'].substring(8,10)+"."+item['enddate'].substring(5,7)+"."+item['enddate'].substring(0,4);
myjson["ExecStartTime"] = item['time'];
myjson["ExecStartdate"] = item['date'].substring(8,10)+"."+item['date'].substring(5,7)+"."+item['date'].substring(0,4);
myjson["ActWork"] = duration;
myjson["ConfText"] = item['description'];
myjson["Activity"] = item['opno'];
myjson["OrderNo"] = item['orderno'];
myjson["User"] = item['user'];
myjson["toCeConfirmation"] = [];
myjson["toWsapExtension"] = [];
 
 
 
 
sapCalls+=1;
n = rowsArray.length
html5sql.process("UPDATE MyTimeConfs SET confno = 'SENDING' WHERE id='"+item['id']+"'",
function(){
postAzureData("ZGW_MAM30_005_CREATE_TIME_CNF", myjson,"UPDATE MyTimeConfs SET confno = 'NEW' WHERE id='"+item['id']+"'",item['id']);
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
 
 
 
 
 
if(type=="MPointDoc")// Seding Measurement Docs
{
 
html5sql.process("SELECT * from MyMpointDocs where id = '"+id+"'",
function(transaction, results, rowsArray){
 
console.log("found MP"+rowsArray.length)
if( rowsArray.length > 0) {
if (syncDetails){
localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", MPDocs:"+String(rowsArray.length));
}else{
syncDetails=true;
localStorage.setItem('LastSyncUploadDetails',"MPDocs:"+String(rowsArray.length));
}
if(!syncDetsSet){
syncDetsSet=true;
SetLastSyncDetails("LASTSYNC_UPLOAD");
sapCalls+=1;
}
 
item = rowsArray[0];
var mpcode=""
if(item['code']!="-1"){
mpcode=item['code'];
}
mptime = "PT"+item['time'].substring(0,2)+"H"+item['time'].substring(2,4)+"M"+item['time'].substring(4,7)+"S"
 
var myjson = {};
 
myjson["ShortText"] = item['shorttext'];
myjson["ReadingTime"] = mptime;
myjson["ReadingDate"] = item['date'];
myjson["MeasPoint"] = item['meas_point'],
myjson["Equipment"] = item['equipment'];
myjson["FuncLoc"] = item['funcloc'];
myjson["Userid"] = localStorage.getItem('MobileUser');
myjson["Reader"] = localStorage.getItem('MobileUser');
myjson["RecordedValue"] = item['value'];
myjson["ValuationCode"] = mpcode;
myjson["Meas_doc"] = "",
myjson["Message"] = "",
myjson["Message_type"] = ""
 
 
html5sql.process("UPDATE MyMpointDocs SET state = 'SENDING' WHERE id='"+item['id']+"'",
function(){
postAzureData("ZGW_MAM30_040_CREATE", myjson,"UPDATE MyMpointDocs SET state = 'NEW' WHERE id='"+item['id']+"'",item['id']);
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
}
 
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
}
}
},
function(error, statement){
 
opMessage("Error: " + error.message + " when processing " + statement);
});
 
 
 
 
 
 
 
}
 
 
/************************************************/
/* Post Set Order Status      -done         */
/************************************************/
function postZGW_MAM30_SET_OP_STATUS_ORDER(User,OrderNo,OpNo,sDate,sTime,Status,sql)
{
var myjson = {};
myjson["Message"] = "";
myjson["UserId"] = User;
myjson["ActTime"] = sTime;
myjson["ActDate"] = sDate;
myjson["InactiveStat"] = "";
myjson["OpNo"] = OpNo;
myjson["OrderNo"] = OrderNo;
myjson["Status"] = Status;
myjson["Stsma"] = "";
postAzureData("ZGW_MAM30_SET_OP_STATUS_ORDER", myjson,sql)
}
 
/************************************************/
/* Post Create Time Confirmation
        */
/************************************************/
function postZGW_MAM30_005_CREATE_TIME_CNF(User,OrderNo,OpNo,Description,Duration,sDate,sTime,eDate,eTime,reason,activityType,workCenter,employeeNo,longText,actWork,remWork,finalConf,sql)
{
 
 
var myjson = {};
myjson["Messagetype"] = "";
myjson["Message"] = "";
myjson["ConfirmCounter"] = "";
myjson["ConfirmNo"] = "";
myjson["RemWork"] = remWork;
myjson["LonText"] = longText;
myjson["FinalConfFlag"] = finalConf;
myjson["Reason"] = reason;
myjson["PersNo"] = employeeNo;
myjson["workCntr"] = workCenter;
myjson["ActType"] = activityType;
myjson["ExecFinTime"] = eTime;
myjson["ExecFinDate"] = eDate;
myjson["ExecStartTime"] = sTime;
myjson["ExecStartdate"] = sDate;
myjson["ActWork"] = actWork;
myjson["ConfText"] = Description;
myjson["Activity"] = OpNo;
myjson["OrderNo"] = OrderNo;
myjson["User"] = User;
myjson["toCeConfirmation"] = [];
myjson["toWsapExtension"] = [];
 
 
postAzureData("ZGW_MAM30_005_CREATE_TIME_CNF", myjson,sql) 
 
 
}
/************************************************/
/* Post Create New Notification 
        */
/************************************************/
function postZGW_MAM30_NOTIFICATION_CreateNewJob(User,NotifType,sDate,sTime,eDate,eTime,Floc,Equip,codeGroup,Code,actCatType,actGroup,actCode,actText,prioType,prioCode,
reportedBy,assignmentUser,assignToMe,specReqt,equipStatus,breaddown,shortText,longText,actWork,remWork,finalConf,sql)
{
 
 
var myjson = {};
var jobHeader = {};
jobHeader["BreakDown"] = breaddown;
jobHeader["EquipStatus"] = equipStatus;
jobHeader["UserId"] = User;
jobHeader["AssigToMe"] = assignToMe;
jobHeader["SpecReqt"] = specReqt;
jobHeader["Assignment"] = assignmentUser;
jobHeader["ReportedBy"] = reportedBy;
jobHeader["Priority"] = prioCode;
jobHeader["PriorityType"] = prioType;
jobHeader["ActiivityText"] = actText;
jobHeader["ActivityCode"] = actCode;
jobHeader["ActivityCodeGrp"] = actGroup;
jobHeader["ActCatType"] = actCatType;
jobHeader["EndTime"] = eTime;
jobHeader["EndDate"] = eDate;
jobHeader["FuncLoc"] = Floc;
jobHeader["Equipment"] = Equip;
jobHeader["CodeGroup"] = codeGroup;
jobHeader["StartTime"] = sTime;
jobHeader["Coding"] = Code;
jobHeader["ShortText"] = shortText;
jobHeader["LongText"] = longText;
jobHeader["StartDate"] = sDate
myjson["JobHeader"] = jobHeader;
myjson["Message"] = "";
myjson["Qmart"] = NotifType;
myjson["Messagetype"] = ""
 
 
postAzureData("ZGW_MAM30_NOTIFICATION_CreateNewJob", myjson,sql)
 
 
}
/************************************************/
/* Post VehicleUpdate          */
/************************************************/
function postZGW_MAM30_VEHICLE_SRV_VehicleChkUpd(User,notifType,notifNo,measDoc,checkType,errType,measCodeGrp,measReadBy,measLongText,measText,measValCode,measReading,measDate,measTime,equipment,mpointCat,mpointCode,sql)
{
Duration
 
var myjson = {};
 
myjson["NotifNo"]= notifNo;
myjson["MeasDoc"]= measDoc;
myjson["ErrType"]= errType;
myjson["NotifType"]= notifType;
myjson["CheckType"]= checkType;
myjson["User"]= User;
myjson["MeasCodeGrp"]= measCodeGrp;
myjson["MeasReadBy"]= measReadBy;
myjson["MeasLongText"]= measLongText;
myjson["MeasText"]= measText;
myjson["MeasValCode"]= measValCode;
myjson["MeasReading"]= measReading;
myjson["MeasTime"]= measTime;
myjson["MeasDate"]= measDate;
myjson["MeasEquip"]= equipment;
myjson["MeasPointCat"]= mpointCat;
myjson["MeasPoint"]= mpointCode;
 
postAzureData("ZGW_MAM30_VEHICLE_SRV_VehicleChkUpd", myjson,sql)
}
/************************************************/
/* Post Customer Feedback      
        */
/************************************************/
function postZGW_MAM30_011_CREATE_CFEED(User,NotifNo,NotifType,OrderNo,UserStatusH,Plant,MainWorkCtr,ReportedBy,ShortText,
ActTextl11,ActText11,ActCode11,ActCodegrp11,
ActTextl10,ActText10,ActCode10,ActCodegrp10,
ActTextl9,ActText9,ActCode9,ActCodegrp9,
ActTextl8,ActText8,ActCode8,ActCodegrp8,
ActTextl7,ActText7,ActCode7,ActCodegrp7,
ActTextl6,ActText6,ActCode6,ActCodegrp6,
ActTextl5,ActText5,ActCode5,ActCodegrp5,
ActTextl4,ActText4,ActCode4,ActCodegrp4,
ActTextl3,ActText3,ActCode3,ActCodegrp3,
ActTextl2,ActText2,ActCode2,ActCodegrp2,
ActTextl1,ActText1,ActCode1,ActCodegrp1,sql)
{
 
var myjson = {};
 
var notfld = {};
notfld["ActTextl11"] = ActTextl11;
notfld["ActText11"] = ActText11;
notfld["ActCode11"] = ActCode11;
notfld["ActCodegrp11"] = ActCodegrp11;
notfld["ActTextl10"] = ActTextl10;
notfld["ActText10"] = ActText10;
notfld["ActCode10"] = ActCode10;
notfld["ActCodegrp10"] = ActCodegrp10;
notfld["ActTextl9"] = ActTextl9;
notfld["ActText9"] = ActText9;
notfld["ActCode9"] = ActCode9;
notfld["ActCodegrp9"] = ActCodegrp9;
notfld["ActTextl8"] = ActTextl8;
notfld["ActText8"] = ActText8;
notfld["ActCode8"] = ActCode8;
notfld["ActCodegrp8"] = ActCodegrp8;
notfld["ActTextl7"] = ActTextl7;
notfld["ActText7"] = ActText7;
notfld["ActCode7"] = ActCode7;
notfld["ActCodegrp7"] = ActCodegrp7;
notfld["ActTextl6"] = ActTextl6;
notfld["ActText6"] = ActText6;
notfld["ActCode6"] = ActCode6;
notfld["ActCodegrp6"] = ActCodegrp6;
notfld["ActTextl5"] = ActTextl5;
notfld["ActText5"] = ActText5;
notfld["ActCode5"] = ActCode5;
notfld["ActCodegrp5"] = ActCodegrp5;
notfld["ActTextl4"] = ActTextl4;
notfld["ActText4"] = ActText4;
notfld["ActCode4"] = ActCode4;
notfld["ActCodegrp4"] = ActCodegrp4;
notfld["ActTextl3"] = ActTextl3;
notfld["ActText3"] = ActText3;
notfld["ActCode3"] = ActCode3;
notfld["ActCodegrp3"] = ActCodegrp3;
notfld["ActTextl2"] = ActTextl2;
notfld["ActText2"] = ActText2;
notfld["ActCode2"] = ActCode2;
notfld["ActCodegrp2"] = ActCodegrp2;
notfld["ActTextl1"] = ActTextl1;
notfld["ActText1"] = ActText1;
notfld["ActCode1"] = ActCode1;
notfld["ActCodegrp1"] = ActCodegrp1;
 
notfld["UserStatusH"] = UserStatusH;
notfld["Plant"] = Plant;
notfld["MainWorkCtr"] = MainWorkCtr;
notfld["OrderId"] = OrderNo;
notfld["ReportedBy"] = ReportedBy;
notfld["ShortText"] = ShortText;
 
 
myjson["Notflds"] = notfld;
myjson["Message"] = "";
myjson["UserId"] = User;
myjson["NotifType"] = NotifType;
myjson["MessageType"] = "";
myjson["NotifNo"] = NotifNo;
 
postAzureData("ZGW_MAM30_011_CREATE_CFEED", myjson,sql)
}
 
/************************************************/
/* Post Measurement Doc      
        */
/************************************************/
function postZGW_MAM30_040_CREATE(User,MeasPoint,FuncLoc,Equipment,Reader,ReadingDate,ReadingTime,RecordedValue,ValuationCode,ShortText,sql)
{
 
var myjson = {};
 
myjson["ShortText"] = ShortText;
myjson["ReadingTime"] = ReadingTime;
myjson["ReadingDate"] = ReadingDate;
myjson["MeasPoint"] = MeasPoint,
myjson["Equipment"] = Equipment;
myjson["FuncLoc"] = FuncLoc;
myjson["Userid"] = User;
myjson["Reader"] = Reader;
myjson["RecordedValue"] = RecordedValue;
myjson["ValuationCode"] = ValuationCode;
myjson["Meas_doc"] = "",
myjson["Message"] = "",
myjson["Message_type"] = ""
postAzureData("ZGW_MAM30_040_CREATE", myjson,sql)
}
function postAzureCB(data,page,recno){
 
var sqlstatement="";
opMessage("Callback sapCB triggured");
pos= (page.lastIndexOf("/")+1); 
pageName=(page.substring(pos))
if (pageName == "ZGW_MAM30_ASSET_SURVEY_UPL") {
    var sql = "DELETE FROM AssetUpload WHERE ZRECNUM='" + recno + "'";
    html5sql.process(sql,
function () {
    opMessage( recno + " was uploaded successfully");
},
function (error, statement) {
    console.log("Error: " + error.message + " when processing " + statement);
    opMessage("Error: " + error.message + " when processing " + statement);
}
);

} 

 
 
 
 
opMessage("Processing Update Response: ");
 
//Handle requestLL callback
if (pageName=="requestll"){
//alert(type+":"+recno+":"+sapmessage+":"+message+":"+notifno)
opMessage("-->Type= "+type);
opMessage("-->row= "+recno);
opMessage("-->Message= "+message);
opMessage("-->NotifNo= "+message_type);
if(message_type=="E")
{
sqlstatement+="UPDATE MyJobDetsDraw SET zurl = '"+ message+"' where id = '"+ recno+"';";
}else{
sqlstatement+="UPDATE MyJobDetsDraw SET zurl = 'Waiting File Transfer' where id = '"+ recno+"';";
}
 
 
 
}
//Handle NewJob Create Customer Feedback
if (pageName=="createcfeed"){
//alert(type+":"+recno+":"+sapmessage+":"+message+":"+notifno)
opMessage("-->Type= "+type);
opMessage("-->row= "+recno);
opMessage("-->Message= "+sapmessage);
opMessage("-->Message= "+message);
opMessage("-->NotifNo= "+notifno);
if(message_type=="E")
{
sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ message+"' WHERE id='"+ recno+"';";
}else{
sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ recno+"';";
}
 
 
 
}
//Handle NewJob Create PIA
if (pageName=="createpia"){
//alert(type+":"+recno+":"+sapmessage+":"+message+":"+notifno)
opMessage("-->Type= "+type);
opMessage("-->row= "+recno);
opMessage("-->Message= "+sapmessage);
opMessage("-->Message= "+message);
opMessage("-->NotifNo= "+notifno);
if(message_type=="E")
{
sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ message+"' WHERE id='"+ recno+"';";
}else{
sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ recno+"';";
}
 
 
 
}
//Handle NewJob Create DG5
if (pageName=="createdg5"){
//alert(type+":"+recno+":"+message+":"+message_type)
opMessage("-->Type= "+type);
opMessage("-->row= "+recno);
opMessage("-->Message= "+message);
opMessage("-->NotifNo= "+message_type);
if(message_type=="E")
{
sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ message+"' WHERE id='"+ recno+"';";
}else{
sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ recno+"';";
}
 
 
 
}
// Handle EOD Create Response
if (pageName=="ZGW_MAM30_NOTIFICATION_NotifHeaderCreate"){
msplit=data.Message.split(" ")
notifno=""
if(data.MessageType=="S"){
notifno=msplit[1]
}
opMessage("-->Type= EOD");
opMessage("-->row= "+recno);
opMessage("-->Message= "+data.Message);
opMessage("-->MessageType= "+data.MessageType);
opMessage("-->NotifNo= "+notifno);
if(data.MessageType=="S")
{
sqlstatement+="UPDATE MyNotifications SET notifno = '"+ notifno+"' WHERE id='"+ recno+"';";
}else{
sqlstatement+="UPDATE MyNotifications SET notifno = 'SENT"+recno+"' WHERE id='"+ recno+"';";
}
 
 
 
 
 
}
// Handle Close Create Response
if (pageName=="ZGW_MAM30_NOTIFICATION_NotifHeaderUpdate"){
	
		opMessage("-->Type= Close Uppdatem Row:"+recno+" NotifNo:"+data.NotifNo+" MessageType:"+data.MessageType);


			sqlstatement+="UPDATE MyJobClose SET state = 'SENT"+recno+"' WHERE id='"+ recno+"';";


 
 
 
 
 
 
}
// Handle Create Additional Work
if (pageName=="ZZGW_MAM30_CREATE_ADD_WRK"){
	
	opMessage("-->Type= Create Addional Work:"+recno+" MessageType:"+data.MessageType);


		sqlstatement+="UPDATE MyJobAddWork SET state = 'SENT"+recno+"' WHERE id='"+ recno+"';";








}

// Handle Vehicle Defect Response
if (pageName=="ZGW_MAM30_VEHICLE_SRV_VehicleChkUpd"){
 
 
opMessage("-->NotifNo= "+data.NotifNo);
opMessage("-->measdoc= "+data.MeasDoc);
 
sqlstatement+="delete from MyVehicleCheck WHERE id='"+recno+"';";
 
 
 
}
// Handle Time Confirmation Create Response
if (pageName=="ZGW_MAM30_005_CREATE_TIME_CNF"){
 
opMessage("-->Type= "+data.Messagetype);
opMessage("-->Message= "+data.Message);
opMessage("-->confno= "+data.ConfirmNo);
if(data.ConfirmNo!="0000000000"){
 
 
 
sqlstatement+="UPDATE MyTimeConfs SET confno = '"+data.ConfirmNo+"' WHERE id='"+recno+"';";
 
 
}else{
sqlstatement+="UPDATE MyTimeConfs SET confno = 'SENT"+recno+"' WHERE id='"+recno+"';";
}
 
}
// Handle MPDoc Create Response
if (pageName=="ZGW_MAM30_040_CREATE"){
 
opMessage("-->Type= Create MP Doc");
opMessage("-->MPDoc= "+data.Meas_doc);
if(data.Meas_doc!="0000000000"){
 
 
 
sqlstatement+="UPDATE MyMpointdocs SET state = '"+data.Meas_doc+"' WHERE id='"+recno+"';";
 
 
}else{
sqlstatement+="UPDATE MyMpointdocs SET state = 'SENT"+recno+"' WHERE id='"+recno+"';";
}
 
}
// Handle Status Update Response
if (pageName=="ZGW_MAM30_SET_OP_STATUS_ORDER"){
console.log("-->UpdateStatus"+data.OrderNo+":"+data.OpNo+":"+data.Message);
opMessage("-->UpdateStatus");
opMessage("-->Orderno= "+data.OrderNo);
opMessage("-->Opno= "+data.OpNo);
opMessage("-->Message= "+data.Message);
if(data.Message=="Operation successfully updated"){
 
 
sqlstatement+="delete from MyStatus WHERE id = '"+recno + "';";
 
}else{
sqlstatement+="UPDATE MyStatus SET state = 'SENT"+recno+"' WHERE id='"+ recno+"';";
}
 
}
// Handle Create Notification Response
if (pageName=="ZGW_MAM30_NOTIFICATION_CreateNewJob"){
msplit=data.Message.split(" ")
notifno=""
if(data.Messagetype=="S"){
notifno=msplit[1]
}
opMessage("-->Create Notification");
opMessage("-->NotifNo= "+notifno);
opMessage("-->Message= "+data.Message);
opMessage("-->MessageType= "+data.Messagetype);
if(data.Messagetype=="S"){
 
sqlstatement+="UPDATE MyNotifications SET notifno = '"+notifno+"' WHERE id='"+recno+"';";
 
 
 
}
 
}
 
 
html5sql.process(sqlstatement,
function(){
console.log("Success handling SAPCB"+sqlstatement);
SetConfigParam('LASTSYNC_UPLOAD', "20120101010101");
 
},
function(error, statement){
console.log("Error: " + error.message + " when processing " + statement);
opMessage("Error: " + error.message + " when processing " + statement);
}        
);
 
}
//AssetCature Start

function ZACAT001AssetCaptureCategoryCB(data) {
    var myarray = [{ 'sql': 'DELETE FROM AssetCaptureCategory ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO AssetCaptureCategory (ZASCAT,ZATCODE,ZSYSCODE) VALUES  (?,?,?)', 'data': [
           data[cntx].zascat,
            data[cntx].zatcode,
            data[cntx].zsyscode]
        })
    }
    opMessage("Success - Built AssetCaptureCategory array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading AssetCaptureCategory");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function PlantGroupCodesZPLG003CB(data) {
    var myarray = [{ 'sql': 'DELETE FROM PlantGroupCodes ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO PlantGroupCodes (ZPLGDEF1,ZPLGDEF2,ZPLGDESC,ZPLGRP,ZZW_WW) VALUES  (?,?,?,?,?)', 'data': [
           data[cntx].zplgdef1,
           data[cntx].zplgdef2,
            data[cntx].zplgdesc,
            data[cntx].zplgrp,
            data[cntx].zzwWw]
        })
    }
    opMessage("Success - Built PlantGroupCodes array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading PlantGroupCodes");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function SystemCodesDescriptionZSYS004CB(data) {
    var myarray = [{ 'sql': 'DELETE FROM SystemCodes ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO SystemCodes (ZSYSCODE,ZSYSDEF1,ZSYSDEF2,ZZSYSDESC) VALUES  (?,?,?,?)', 'data': [
           data[cntx].zsyscode,
           data[cntx].zsysdef1,
            data[cntx].zsysdef2,
            data[cntx].zsysdesc]
        })
    }
    opMessage("Success - Built SystemCodes array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading SystemCodes");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function FunctionTypeCodesZNAM005CB(data) {
    var myarray = [{ 'sql': 'DELETE FROM FunctionTypeCodes ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO FunctionTypeCodes (EARTX,ZATCODE,ZNCDEF,ZNCDEF_EXT,ZNCDESC,ZZFL_NC) VALUES  (?,?,?,?,?,?)', 'data': [
           data[cntx].eartx,
           data[cntx].zatcode,
            data[cntx].zncdef,
            data[cntx].zncdefExt,
            data[cntx].zncdesc,
            data[cntx].zzflNc]
        })
    }
    opMessage("Success - Built FunctionTypeCodes array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading FunctionTypeCodes");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function EquipmentTypeCodesZEGI006CB(data) {
    var myarray = [{ 'sql': 'DELETE FROM EquipmentTypeCode ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO EquipmentTypeCode (EARTX,ZATCODE,ZOTDEF,ZOTDEF_EXT,ZOTDESC,ZZEQPT_EGI) VALUES  (?,?,?,?,?,?)', 'data': [
           data[cntx].eartx,
           data[cntx].zatcode,
            data[cntx].zotdef,
            data[cntx].zotdefExt,
            data[cntx].zotdesc,
            data[cntx].zzeqptEgi]
        })
    }
    opMessage("Success - Built EquipmentTypeCode array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading EquipmentTypeCode");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function PlantGroupProcessGroupCodesZPLG_PRG007CB(data) {
    var myarray = [{ 'sql': 'DELETE FROM PlantGroupAndProcessGroupCodes ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO PlantGroupAndProcessGroupCodes (ZPLGRP,ZPRG,ZZW_WW) VALUES  (?,?,?)', 'data': [
           data[cntx].zplgrp,
            data[cntx].zprg,
            data[cntx].zzwWw]
        })
    }
    opMessage("Success - Built PlantGroupAndProcessGroupCodes array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading PlantGroupAndProcessGroupCodes");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function AssetTypeCodesZAST008CB(data) {
    var myarray = [{ 'sql': 'DELETE FROM AssetTypeCodes ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO AssetTypeCodes (ZATCODE,ZATDEF1,ZATDEF2,ZATDESC) VALUES  (?,?,?,?)', 'data': [
           data[cntx].zatcode,
            data[cntx].zatdef1,
            data[cntx].zatdef2,
            data[cntx].zatdesc]
        })
    }
    opMessage("Success - Built AssetTypeCodes array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading AssetTypeCodes");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function EGINameCodeMappingZAEGI_NCCB(data) {
    var myarray = [{ 'sql': 'DELETE FROM EGIandNameCodeMapping ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO EGIandNameCodeMapping (ZASCAT,ZDEFPG,ZZEQPT_EGI,ZZFL_NC,ZZW_WW) VALUES  (?,?,?,?,?)', 'data': [
           data[cntx].zascat,
            data[cntx].zdefpg,
            data[cntx].zzeqptEgi,
            data[cntx].zzflNc,
            data[cntx].zzwWw]
        })
    }
    opMessage("Success - Built AssetTypeCodes array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading AssetTypeCodes");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function DecommissionStatusZDECOMSTATCB(data) {
    var myarray = [{ 'sql': 'DELETE FROM DecommissionStatus ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO DecommissionStatus (ZSTAT,ZSTATDESC) VALUES  (?,?)', 'data': [
           data[cntx].zstat,
            data[cntx].zstatDesc,
            ]
        })
    }
    opMessage("Success - Built DecommissionStatus array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading DecommissionStatus");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function ZGW_MAM_SITE_REFDATACB(data) {
    var myarray = [{ 'sql': 'DELETE FROM AssetSites ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO AssetSites ( site , desc, bunit ) VALUES  (?,?,?)', 'data': [
           data[cntx].zsite,
           data[cntx].zsiteDesc,
           data[cntx].zzwWw]
        })
    }
    opMessage("Success - Built Sites array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading Sites");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function ZGW_MAM30_031_REFDATA_T3_SRVManufacturerCB(data) {
    var myarray = [{ 'sql': 'DELETE FROM Manufacturer ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO Manufacturer (manufacturer) VALUES  (?)', 'data': [
           data[cntx].manufacturer]
        })
    }
    opMessage("Success - Built Manufacturer array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading Manufacturer");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function ZGW_MAM30_031_REFDATA_T3_SRVModelCB(data) {
    var myarray = [{ 'sql': 'DELETE FROM Model ', 'data': [] }];
    for (var cntx = 0; cntx < data.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO Model (EQART,HERST,MODEL) VALUES  (?,?,?)', 'data': [
           data[cntx].eqart,
           data[cntx].herst,
           data[cntx].model]
        })
    }
    opMessage("Success - Built Model array - " + myarray.length + " rows");
    html5sql.process(myarray, function () {
        opMessage("Success - Finished Downloading Model");
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
}
function getLocalJobs(mydata){
	
	 localJobDets=[]; 
	 localJobDetsOrders=[];
    html5sql.process("select orderid, ordnoOp from MyJobDets",
			function(transaction, results, rowsArray){
    	for (var cnt = 0; cnt < rowsArray.length ; cnt++) {
    		
    		localJobDets.push(rowsArray[cnt].orderid+rowsArray[cnt].ordnoOp)
    		localJobDetsOrders.push(rowsArray[cnt].orderid)

    	}
     	ZGW_GET_JOB_DETAILSCB(mydata);
    },
         function (error, statement) { opMessage("Error: " + error.message + " when processing " + statement); }
         );
	
}