var globaldocs = new Array()
var privatedownload = new Array()
var privateupload = new Array()
var privatephotos = new Array()
var downloadCount;
var getPhotoCaller="DOC"
var selectedDocTable=""
var selectedPhoto=""
var selectedPhotoID=0;
var selectedPhotoState="Local";
var selectedPhotoSize=0;
var DeviceStorageDirectory;
var AppDocDirectory;
var attachFilename=""
var selectedDocId="";
var selectedFormId="";
var NewFormflag=false;
	var selectedPhotoType=""
	var GlobalDirectory=""
	var appDirectory=""
		var oProgInd= new sap.m.ProgressIndicator("pi1", {
			width:"100%",
			percentValue:0,
			displayValue:"0%",
			showValue:true
		});
	var oProgIndDL= new sap.m.ProgressIndicator("pi2", {
		width:"100%",
		percentValue:0,
		displayValue:"0%",
		showValue:true
	});
var formDownloadFiles = new sap.m.Dialog("dlgDownloadFiles",{
		    title:"Download Files",
		    modal: true,
		    contentWidth:"1em",
		    buttons: [
		  
						new sap.m.Button( {
						    text: "Close",
						    type: 	sap.m.ButtonType.Reject,
						    tap: [ function(oEvt) {		  
								 
						    	formDownloadFiles.close()
								  } ]
						}),
						new sap.m.Button( {
						    text: "Download",
						    type: 	sap.m.ButtonType.Accept,
						    tap: [ function(oEvt) {		  
						    	downloadAll(); 
						    	//formDownloadFiles.close()
								  } ]
						}),
						new sap.m.Button( {
						    text: "Delete",
						    type: 	sap.m.ButtonType.Accept,
						    tap: [ function(oEvt) {		  
						    	deleteAllDocs(); 
						    	//formDownloadFiles.close()
								  } ]
						})
						],					
		    content:[
		             new sap.m.Label({text:"Checking Server for Documents:"}),
		             oProgInd,
		            new sap.ui.core.HTML({  
					      content: 
					    	    ["<Table><TR><TD>Total on Server:</TD><TD><label id ='DocTot'>0</LABEL></TD></TR>"+
					    	     "<TR><TD>No to Delete:</TD><TD><LABEL id ='DocDel'>0</LABEL></TD></TR>" +
					    	     "<TR><TD>New Documents:</TD><TD><LABEL id ='DocNew'>0</LABEL></TD></TR>"+
					    	     "<TR><TD>Modified Ddocuments:</TD><TD><LABEL id ='DocMod'>0</LABEL></TD></TR>"+
					    	     "<TR><TD>Local Documents:</TD><TD><LABEL id ='DocLoc'>0</LABEL></TD></TR></table>"
					    	     ]}),
					 new sap.m.Label({text:"Downloading Documents:"}),
		             oProgIndDL,


		            ],
		            
		            afterOpen:function(){

		    			document.getElementById('DocTot').innerHTML="0"
		    			document.getElementById('DocDel').innerHTML="0"
		    			document.getElementById('DocNew').innerHTML="0"
		    			document.getElementById('DocMod').innerHTML="0"
		    			document.getElementById('DocLoc').innerHTML="0"
				    	oProgInd.setPercentValue(0);
				    	oProgInd.setDisplayValue("0" + "%");
				    	oProgIndDL.setPercentValue(0);
				    	oProgIndDL.setDisplayValue("0" + "%");
		    	
		            },
		            afterClose:function(){

		            	buildDocumentTables();	
		    	
		            }
		 })

	var formDisplayPhoto = new sap.m.Dialog("dlgDisplayPhoto",{
	    title:"Display Photo",
	    modal: true,
	    contentWidth:"1em",
	    buttons: [
	   
					new sap.m.Button( {
					    text: "Test",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formDisplayPhoto.close()
							  } ]
					}),
					new sap.m.Button( {
						icon:"sap-icon://sys-cancel",
					    text: "Cancel",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formDisplayPhoto.close()
							  } ]
					})
					],					
	    content:[
				new sap.m.Image("img1",{
					src: selectedPhoto,
					width: "50px",
					height: "50px"
				}),
				new sap.m.Image("Ig22",{
					src: "images/Worker.jpg",
					width: "50px",
					height: "50px"
				}),
				new sap.m.Image("Ig3",{
					src: "xWorker.jpg",
					width: "50px",
					height: "50px"
				})

	            ],
	            
	            beforeOpen:function(){
	            	buildPhotoDetails()
	            }
	 })

function uploadPhoto(imageURI) {
	
	window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
        fileEntry.file(function(fileObj) {

            var fileName = fileEntry.fullPath;

            //now use the fileName in your upload method
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileName.substr(fileName.lastIndexOf('/')+1);
            options.mimeType="image/jpeg"
            options.chunkedMode = false;
            var params = {};
            params.value2 = options.fileName;
            options.params = params;
          
          
                var ft = new FileTransfer();
               
                ft.upload(imageURI, localStorage.getItem("DOCSERVER")+"FileUpload.php", win, fail, options);
        });
        
    }); 
	   
 
   
			  
    

  

    //ft.upload(imageURI, "http://192.168.1.20/FileUpload.php?user=POSTRIDGE&filename=x.jpg", win, fail, options);
    //movePic(imageURI);
}
function uploadPhoto1(imageURI) {
	 
	   var options = new FileUploadOptions();
	   options.fileKey="file";
	   options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	   options.mimeType="image/jpeg";

	   var params = new Object();
	   params.user = "POSTRIDGE";
	   params.filename = "Local"+options.fileName;

	   options.params = params;
	   options.chunkedMode = false;

	   var ft = new FileTransfer();
	  
	   ft.upload(imageURI, "http://192.168.1.20/FileUpload.php", win, fail, options);
	}
function win(r) {

	opMessage("Code = " + r.responseCode+"\nResponse = " + r.response+"\nSent = " + r.bytesSent);
   
}

function fail(error) {
	opMessage("An error has occurred: Code = " + error.code+" source = " + error.source+ " target = " + error.target+" http"+error.http_status );

}
function buildPhotoDetails(){
	
html5sql.process("SELECT * FROM MyJobsPhotos where id = '"+selectedPhotoID+"'",
		 function(transaction, results, rowsArray){
			
		
			if( rowsArray.length>0) {
				sap.ui.getCore().getElementById('NewPhotoName').setValue(rowsArray[0].name)
				//sap.ui.getCore().getElementById('NewPhotoDetails').setValue(rowsArray[0].desc)
				selectedPhoto=rowsArray[0].url;
			 }else{
				sap.ui.getCore().getElementById('NewPhotoName').setValue("")
				//sap.ui.getCore().getElementById('NewPhotoDetails').setValue("")
			 }
			
			  window.resolveLocalFileSystemURL(selectedPhoto, function(oFile) {
				 
			    oFile.file(function(readyFile) {

			    	selectedPhotoSize=readyFile.size
			      var reader= new FileReader();
			      reader.onloadend= function(evt) {
			    	  
			        sap.ui.getCore().getElementById('confirmImage').setSrc(evt.target.result);
			      };
			      reader.readAsDataURL(readyFile); 
			     
			    });
			  })
			  }, function(err){
			   
		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);
}
function convertImgToDataURLviaCanvas(url, callback, outputFormat) {
	  var img = new Image();
	  img.crossOrigin = 'Anonymous';
	  img.onload = function() {
	    var canvas = document.createElement('CANVAS');
	    var ctx = canvas.getContext('2d');
	    var dataURL;
	    canvas.height = this.height;
	    canvas.width = this.width;
	    ctx.drawImage(this, 0, 0);
	    dataURL = canvas.toDataURL(outputFormat);
	    callback(dataURL);
	    canvas = null;
	  };
	  img.src = url;
	}
function getFileContentAsBase64(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);
            
    function fail(e) {
          //alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                   var content = this.result;
                   callback(content);
              };
              // The most important point, use the readAsDatURL Method from the file plugin
              reader.readAsDataURL(file);
           });
    }
}
function getBase64FromImageUrl(imageUri,id,name) {
	
	x=imageUri.split("/")
	
	getFileContentAsBase64(imageUri,function(base64Image){
		b64=base64Image.split(",")
		  createBase64XML(b64[1],x[x.length-1],id,name,"image/jpeg","photo")
		});

}
function getBase64FromAttachmentUrl(url,id,name,type,flag) {
	
	

	
	getFileContentAsBase64(url,function(base64){
		  b64=base64.split(",")
		  createBase64XML(b64[1],name,id,name,type,"attachment",flag)
		});

}
function createBase64XML(base64,fn,id,name,mimetype,ftype,flag){
	var filename = name;
	xx=fn.split(".")
	yy=name.split(".")
	if(yy.length<2){
		//name+="."+xx[1] //append the Extenstion from fn if no extention on name
		filename = name+"."+xx[1]
	}
	fileType = "JPEG image"

	
	dt=getFileUploadDT()
	var xmlstring =  '<uploadRequest userName="'+localStorage.getItem('MobileUser')+'" userRole="Y008 Desc" userMyalmScenario="Y008" machineName="'+localStorage.getItem('MobileUser')+'">'+
					  '<jobMetadata>'+
					  '  <order>'+CurrentOrderNo+'</order>'+
					  '  <operation>'+CurrentOpNo+'</operation>'+
					  '  <customerNumber> </customerNumber>'+
					  '  <customerName> </customerName>'+
					  '  <equipmentNumber>'+selectedJobArray["equipment_code"]+'</equipmentNumber>'+
					  '  <notification>'+selectedJobArray["notifno"]+'</notification>'+
					  '  <location>'+selectedJobArray["funcloc_code"]+'</location>'+
					  '  <equipmentDescription>'+selectedJobArray["equipment_desc"]+'</equipmentDescription>'+
					  '  <docSubmitDateTime>'+dt+'</docSubmitDateTime>'+
					  '</jobMetadata>'+
					  '<attachmentMetadata>'+
					  '  <filename>'+CurrentOrderNo+CurrentOpNo+'-'+filename+'</filename>'+
					  '  <extension>'+xx[0]+'</extension>'+
					  '  <modified>'+dt+'</modified>'+
					  '  <created>'+dt+'</created>'+
					  '  <fileDescription>'+
					  '    <fileType>'+xx[1]+'</fileType>'+
					  '    <mimeType>'+mimetype+'</mimeType>'+
					  '  </fileDescription>'+
					  '</attachmentMetadata>'+
					  '<fileContent contentEncoding="base64">'+base64+
					  '</fileContent>'+
					  '</uploadRequest>'

	sendPhotoToServer(id,fn,xmlstring,ftype,flag)
	
}
function createBase64FormXML(base64,fn,id,name,flag){
	dt=getFileUploadDT()
	uploadfn=CurrentOrderNo+'0010-'+dt+'-'+fn
	var xmlstring =  '<uploadRequest userName="'+localStorage.getItem('MobileUser')+'" userRole="Y008 Desc" userMyalmScenario="Y008" machineName="'+localStorage.getItem('MobileUser')+'">'+
					  '<jobMetadata>'+
					  '  <order>'+CurrentOrderNo+'</order>'+
					  '  <operation>'+CurrentOpNo+'</operation>'+
					  '  <customerNumber> </customerNumber>'+
					  '  <customerName> </customerName>'+
					  '  <equipmentNumber>'+selectedJobArray["equipment_code"]+'</equipmentNumber>'+
					  '  <notification>'+selectedJobArray["notifno"]+'</notification>'+
					  '  <location>'+selectedJobArray["funcloc_code"]+'</location>'+
					  '  <equipmentDescription>'+selectedJobArray["equipment_desc"]+'</equipmentDescription>'+
					  '  <docSubmitDateTime>'+dt+'</docSubmitDateTime>'+
					  '</jobMetadata>'+
					  '<attachmentMetadata>'+
					  '  <filename>'+CurrentOrderNo+CurrentOpNo+'-'+name+'.html</filename>'+
					  '  <extension>html</extension>'+
					  '  <modified>'+dt+'</modified>'+
					  '  <created>'+dt+'</created>'+
					  '  <fileDescription>'+
					  '    <fileType>HTML</fileType>'+
					  '    <mimeType>text/html</mimeType>'+
					  '  </fileDescription>'+
					  '</attachmentMetadata>'+
					  '<fileContent contentEncoding="base64">'+base64+
					  '</fileContent>'+
					  '</uploadRequest>'
	console.log(base64)
	sendDocToServer(id,uploadfn,xmlstring,flag)
	
}
function writer(X){
	var dataUrl='data:application/download,' + encodeURIComponent(
		'<?xml version="1.0" encoding="UTF-8"?>'
		+X
	)
	location.href=dataUrl
}


var formFileName = new sap.m.Dialog("dlgFileName",{
    title:"Enter Filename",
    modal: true,
    contentWidth:"1em",
    buttons: [


				new sap.m.Button( {
					icon:"sap-icon://sys-save",
				    text: "Save",
				    type: 	sap.m.ButtonType.Accept,
				    press: [ function(oEvt) {	
				    	if (sap.ui.getCore().getElementById('attachmentFname').getValue().length<1){
							DisplayErrorMessage("Attachment", "Name is Mandatory")
							}else{
								updateFormDescription(selectedDocId,sap.ui.getCore().getElementById('attachmentFname').getValue())
								formFileName.close()
							}
				    	
						  } ]
				}),
				new sap.m.Button( {
					icon:"sap-icon://sys-cancel",
				    text: "Cancel",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		
				    	
				    	showAreYouSure("Close Forms","Exit without Saving?",formFileName) 
				    	
						  } ]
				})
				],					
    content:[
  			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 1,
				content : 	[							
				 			
				 			new sap.m.Label({text:"Name"}),
				 			new sap.m.Input("attachmentFname",{ type: sap.m.InputType.Input, maxLength:30,width:"300px"}),
				 			
							]
 				})


            ],
            contentWidth:"360px",
            
            beforeOpen:function(){
            	
            	
            }
 })





var formPhotoDetails = new sap.m.Dialog("dlgPhotoDetails",{
    title:"Display Photo",
    modal: true,
    contentWidth:"1em",
    buttons: [
new sap.m.Button( "btnPhotoDelete",{
    text: "Delete",
    type: 	sap.m.ButtonType.Reject,
    tap: [ function(oEvt) {		  
    	DeletePhotoEntry(CurrentOrderNo,CurrentOpNo, selectedPhotoID)
    	formPhotoDetails.close()
    	
		  } ]
}),
new sap.m.Button( "btnPhotoUpload",{
    text: "UpLoad",
    type: sap.m.ButtonType.Reject,
    tap: [ function(oEvt) {
    if (sap.ui.getCore().getElementById('NewPhotoName').getValue().length<1){
DisplayErrorMessage("Attach Photo", "Name is Mandatory")
}else{
status="Local"
if(!isCellConnection()) {
DisplayErrorMessage("Photo Upload","No Suitable Network Connection")
}else{
status="Sending"
getBase64FromImageUrl(selectedPhoto,selectedPhotoID,sap.ui.getCore().getElementById('NewPhotoName').getValue())

}
if (selectedPhotoID==0){
    CreatePhotoEntry(CurrentOrderNo,CurrentOpNo, selectedPhoto, sap.ui.getCore().getElementById('NewPhotoName').getValue(), "" , selectedPhotoSize, getSAPDate()+" "+getSAPTime(), status)
    }else{
    UpdatePhotoEntry(CurrentOrderNo,CurrentOpNo, selectedPhotoID, sap.ui.getCore().getElementById('NewPhotoName').getValue(), "",status)
    }
    formPhotoDetails.close()
}
     
    //formPhotoDetails.close()
  } ]
}),
new sap.m.Button( "btnPhotoSave",{
	icon:"sap-icon://sys-save",
    text: "Save",
    type: sap.m.ButtonType.Accept,
    tap: [ function(oEvt) {
    if (sap.ui.getCore().getElementById('NewPhotoName').getValue().length<1){
DisplayErrorMessage("Attach Photo", "Name is Mandatory")
}else{
if (selectedPhotoID==0){
    CreatePhotoEntry(CurrentOrderNo,CurrentOpNo, selectedPhoto, sap.ui.getCore().getElementById('NewPhotoName').getValue(), "" , selectedPhotoSize, getSAPDate()+" "+getSAPTime(), "Local")
    }else{
    UpdatePhotoEntry(CurrentOrderNo,CurrentOpNo, selectedPhotoID, sap.ui.getCore().getElementById('NewPhotoName').getValue(), "","Local" )
    }
    formPhotoDetails.close()
}
    
  } ]
}),
				
				new sap.m.Button( {
					icon:"sap-icon://sys-cancel",
				    text: "Cancel",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formPhotoDetails.close()
						  } ]
				})
				],					
    content:[
  			new sap.ui.layout.form.SimpleForm({
				minWidth : 1024,
				maxContainerCols : 1,
				content : 	[							
				 			new sap.m.Image("confirmImage",{
				 				
				 				width: "300px",
				 				height: "300px"
				 			}),
				 			new sap.m.Label({text:"Name"}),
				 			new sap.m.Input("NewPhotoName",{ type: sap.m.InputType.Input, maxLength:30,width:"300px"})
				 			
							]
 				})


            ],
            contentWidth:"360px",
            contentHeight: "60%",
            beforeOpen:function(){
                if(selectedPhotoState!="Local"){
                sap.ui.getCore().getElementById('NewPhotoName').setEditable(false)
                sap.ui.getCore().getElementById('btnPhotoDelete').setVisible(false)
                sap.ui.getCore().getElementById('btnPhotoSave').setVisible(false)
                sap.ui.getCore().getElementById('btnPhotoUpload').setVisible(false)
                }else{
                sap.ui.getCore().getElementById('NewPhotoName').setEditable(true)
                sap.ui.getCore().getElementById('btnPhotoSave').setVisible(true)
                sap.ui.getCore().getElementById('btnPhotoUpload').setVisible(true)
                 
                if (selectedPhotoID==0){
                sap.ui.getCore().getElementById('btnPhotoDelete').setVisible(false)
                }else{
                sap.ui.getCore().getElementById('btnPhotoDelete').setVisible(true)
                }
                }
                buildPhotoDetails()
                 
                }
 })
var formFormFunctions = new sap.m.Dialog("dlgFormFunctions",{
    
    modal: true,
    contentWidth:"1em",
    buttons: [
   
				new sap.m.Button( {
					icon:"sap-icon://sys-cancel",
				    text: "Cancel",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formFormFunctions.close()
						  } ]
				})	
				],					
    content:[
		new sap.ui.layout.form.SimpleForm({
			minWidth : 1024,
			maxContainerCols : 2,
			content : [
			           new sap.m.Label({text:""}),
					 new sap.m.Button("Rename" ,{
						 icon:"sap-icon://form",
					    text: "Rename",
					    type: 	sap.m.ButtonType.Default,
					    tap: [ function(oEvt) {	
					    	formFormFunctions.close() 
					    	
					    	renameDocument(selectedFormId)
					    	
						    	
					    
					    	
							  } ]
					 }),
					 new sap.m.Label({text:""}),
					 new sap.m.Button("Delete",{
						 icon:"sap-icon://delete",
						    text: "Delete",
						    type: 	sap.m.ButtonType.Reject,
						    tap: [ function(oEvt) {		  
						    	
						    	formFormFunctions.close() 
							    deleteDocument(selectedFormId)	
						    
						    	
								  } ]
						 }),
						 new sap.m.Label({text:""}),
						 new sap.m.Button( "Upload",{
							 icon:"sap-icon://upload",
							    text: "Upload",
							    type: 	sap.m.ButtonType.Accept,
							    tap: [ function(oEvt) {	
							    	
							    		
							    	formFormFunctions.close() 
							    	if(!isCellConnection())	{
										DisplayErrorMessage("Form Upload","No Suitable Network Connection")
										}else{
											uploadDocument(selectedFormId)	
										}
							    	
							    	
							    	
							    	
									  } ]
							 	}),	
							 	 new sap.m.Label({text:""}),
					 new sap.m.Button("Edit",{
						 icon:"sap-icon://edit",
					    text: "Edit",
					    type: 	sap.m.ButtonType.Emphasized,
					    tap: [ function(oEvt) {	
					    	
					    	//disableformFlag=false;
					    	formFormFunctions.close() 
					    	console.log(selectedFormId)
					    	openJobForm(selectedFormId)	
					    	
					    	
					    	
							  } ]
					 	})
			           
				]
			})
            ],
            
            beforeOpen:function(){
            	attachFilename="";
            	try{
            		
            		DeviceStorageDirectory=cordova.file.externalApplicationStorageDirectory
            		AppDocDirectory="MyJobs"
            		if(device.platform=="iOS"){
            			DeviceStorageDirectory=cordova.file.dataDirectory
            			AppDocDirectory="documents/MyJobs"
            		}
            		localStorage.setItem("DeviceType",device.platform)
            	 }catch(err){
            		 localStorage.setItem("DeviceType","WINDOWS")
            	
            	 }
            }
 })

var formAttachmentFunctions = new sap.m.Dialog("dlgAttachmentFunctions",{
    title:"Attachment",
    modal: true,
    contentWidth:"1em",
    buttons: [
   
				new sap.m.Button( {
					icon:"sap-icon://sys-cancel",
				    text: "Cancel",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formAttachmentFunctions.close()
						  } ]
				})	
				],					
    content:[

		new sap.ui.layout.form.SimpleForm({
			minWidth : 1024,
			maxContainerCols : 2,
			content : [

			           new sap.m.Label({text:""}),
					 new sap.m.Button( {
						icon:"sap-icon://delete",
					    text: "Delete",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {	
					    	formAttachmentFunctions.close() 
					    	
					    	deleteAttachment(selectedFormId)
					    	
						    	
					    
					    	
							  } ]
					 }),

						 new sap.m.Label({text:""}),
						 new sap.m.Button( {
							 icon:"sap-icon://upload",
							    text: "Upload",
							    type: 	sap.m.ButtonType.Accept,
							    tap: [ function(oEvt) {	
							    	
							    		
							    	formAttachmentFunctions.close() 
							    	if(!isCellConnection())	{
										DisplayErrorMessage("Form Upload","No Suitable Network Connection")
										}else{
											uploadAttachment(selectedFormId)	
										}
							    		
							    	
							    	
							    	
									  } ]
							 	})
				]
			})
            ],
            
            beforeOpen:function(){


            }
 })

var formGetDoc = new sap.m.Dialog("dlgGetDoc",{
    title:"Attach Document / Form",
    modal: true,
    contentWidth:"1em",
    buttons: [
   
				new sap.m.Button( {
					icon:"sap-icon://sys-cancel",
				    text: "Cancel",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formGetDoc.close()
						  } ]
				})	
				],					
    content:[
		new sap.ui.layout.form.SimpleForm({
			minWidth : 1024,
			maxContainerCols : 2,
			content : [
			        
					 new sap.m.Button( {
					    text: "Attach Document",
					    type: 	sap.m.ButtonType.Accept,
					    tap: [ function(oEvt) {		  
					    	
					    		formGetDoc.close() 
						    	formDocuments.open()
					    	
							  } ]
					 }),
					
					 new sap.m.Button( {
					    text: "Form",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {	
					    	NewFormflag=true;
					    		formGetDoc.close() 
						    	MandatedForms= [];
				   				formToOpen="Forms/formsindex.html"
				   			    formMode="Forms"
		   						formForms.open()
					    	
					    		
					    	
					    	
					    	
							  } ]
					 	})
				]
			})
            ],
            
            beforeOpen:function(){
            	attachFilename="";
            	try{
            		
            		DeviceStorageDirectory=cordova.file.externalApplicationStorageDirectory
            		AppDocDirectory="MyJobs"
            		if(device.platform=="iOS"){
            			DeviceStorageDirectory=cordova.file.dataDirectory
            			AppDocDirectory="documents/MyJobs"
            		}
            		localStorage.setItem("DeviceType",device.platform)
            	 }catch(err){
            		 localStorage.setItem("DeviceType","WINDOWS")
            	
            	 }
            }
 })
var formGetPhoto = new sap.m.Dialog("dlgGetPhoto",{
    title:"Attach Photo",
    modal: true,
    contentWidth:"1em",
    buttons: [
   
				new sap.m.Button( {
					icon:"sap-icon://sys-cancel",
				    text: "Cancel",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formGetPhoto.close()
						  } ]
				})	
				],					
    content:[
		new sap.ui.layout.form.SimpleForm({
			minWidth : 1024,
			maxContainerCols : 2,
			content : [
		             new sap.m.Label({text:" "}),
					 new sap.m.Button( {
					    text: "Take Photo",
					    type: 	sap.m.ButtonType.Accept,
					    tap: [ function(oEvt) {		  
					    	
					    	getPhoto(selectedPhotoType);
					    	formGetPhoto.close()
							  } ]
					 }),
					 new sap.m.Label({text:" "}),
					 new sap.m.Button( {
					    text: "Select Photo",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	selectPhoto()
					    	formGetPhoto.close()
							  } ]
					 	})
				]
			})
            ],
            
            beforeOpen:function(){
            	try{
            		
            		DeviceStorageDirectory=cordova.file.externalApplicationStorageDirectory
            		AppDocDirectory="MyJobs"
            		if(device.platform=="iOS"){
            			DeviceStorageDirectory=cordova.file.dataDirectory
            			AppDocDirectory="documents/MyJobs"
            		}
            		localStorage.setItem("DeviceType",device.platform)
            	 }catch(err){
            		 localStorage.setItem("DeviceType","WINDOWS")
            	
            	 }
            }
 })
function selectPhoto(){

	 
	window.imagePicker.getPictures(
	    function(results) {
	        for (var i = 0; i < results.length; i++) {
	        	//alert('Image URI: ' + results[i]);
	            try {
	            	
	  			  moveFile2(results[i], DeviceStorageDirectory+AppDocDirectory+"/Private/Photos",i)
	  			}
	  			catch(err) {
	  			   
	  			}  
	        }
	    }, function (error) {
	        opMessage('Error: ' + error);
	    }, {
	        maximumImagesCount: 10,
	        width: 800
	    }
	);
}
function showFile(file){
	
	window.plugins.fileOpener.open(file)
	//window.open(file, "_blank", 'location=yes,closebuttoncaption=Return') 
	
}
var formDocuments = new sap.m.Dialog("dlgDocuments",{
    title:"Documents",
    modal: true,
    contentWidth:"1em",
    buttons: [
  
                                new sap.m.Button( {
                                	icon:"sap-icon://sys-cancel",
                                    text: "Cancel",
                                    type: 	sap.m.ButtonType.Reject,
                                    tap: [ function(oEvt) {         
                                               
                                    	formDocuments.close()} ]   
                                })
                                ],                                
    content:[
buildDocumentList()
    
            ],
            beforeOpen:function(){
            	buildDocumentTables()
            	//buildPhotoList();
            	
            },
           contentWidth:"90%",
        	contentHeight: "90%",
     })

function buildDocumentList(){
	var asset_id=""
	var asset_name=""
	var asset_type=""
	
	
	
	var	docsTabBar  = new sap.m.IconTabBar('DocumentsTabBar',
				{
					expanded:'{device>/isNoPhone}',

					select:[function(oEvt) {	
						
						  if(oEvt.getParameters().key=="Global"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="Download"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="Upload"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="Photos"){
							  //oDetailPage.setFooter(materialFooter)
							  }
						  
						}
					],
					
					items: [

	
	    	                new sap.m.IconTabFilter( {
	    	            	    key:'DocumentsGlobal',
	    	            	    tooltip: 'Global Documents',
	    	            	    icon: "sap-icon://documents",
	    	            	       	                   content:[
	    	            	       	        	               
	    	            									new sap.m.Table("DocumentsGlobalTable",{
	    	            										
	    	            										mode: sap.m.ListMode.SingleSelectMaster,
	    	        											selectionChange: function(evt){
	    	        												
		    	        												if(evt.getParameter("listItem").getCells()[2].getText()==""){
		    	        													
		    	        													buildGlobalDownloads(evt.getParameter("listItem").getCells()[5].getText())
		    	        												}else{
		    	        													addAttachment(CurrentOrderNo,CurrentOpNo, evt.getParameter("listItem").getCells()[5].getText(),
		    	        															evt.getParameter("listItem").getCells()[1].getText(),
		    	        															evt.getParameter("listItem").getCells()[2].getText(),
		    	        															evt.getParameter("listItem").getCells()[3].getText(),
		    	        															"Local")
		    	        															buildJobDocsTable();
		    	        															formDocuments.close()
		    	        												}
	    	        													
	    	        												
	    	        										    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:""}),
	    	            										        	 hAlign: 'Left',width: '5%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Filename"}),
	    	            										        	 hAlign: 'Left',width: '35%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '30%',minScreenWidth : "" , demandPopin: true }) ,
	    	            										        	 new sap.m.Column({header: new sap.m.Label({text:"Path"}),
		    	            										        	 hAlign: 'Left',width: '0%', minScreenWidth : "" , visible:false, demandPopin: false})    
	    	            								           	     ]
	    	            								           	  

	    	            									})
	    	            									]
	    	            						           	  
	    	            					    }),
		    
	       	                ]

				});
	return docsTabBar
}
function buildDocumentTables(){
	buildGlobalDownloads(cordova.file.externalRootDirectory+"Documents")
	//buildImageDownloads(cordova.file.externalRootDirectory+'Documents/MyJobs/Global/download/Icons/2MANJOB.png')
	//buildPrivateDownloads()
	//buildPrivateUploads()
	
}
//get photo and store locally
function getPhoto(caller) {
	getPhotoCaller=caller
    // Take picture using device camera and retrieve image as base64-encoded string
	//alert("about to take photo"+DeviceStorageDirectory)
	
    navigator.camera.getPicture(onGetPhotoDataSuccess, onGetPhotoDataFail, { quality: 50 });
}


//Callback function when the picture has been successfully taken
function onGetPhotoDataSuccess(imageData) {
    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()).toString() + (currentdate.getMonth() + 1).toString() + (currentdate.getFullYear()).toString()
       + (currentdate.getHours()).toString()
                       + (currentdate.getMinutes()).toString()
                       + (currentdate.getSeconds()).toString();
    
	  try {
		  moveFile(imageData, DeviceStorageDirectory+AppDocDirectory+"/Private/Photos")
		}
		catch(err) {
		   
		}                    

}

//Callback function when the picture has not been successfully taken
function onGetPhotoDataFail(message) {
	opMessage('Failed to load picture because: ' + message);
}
function successMoveCallback(entry) {
	opMessage("New Path: " + entry.fullPath);
   
}

function errorMoveCallback(error) {
	opMessage("moveCallbackError:" + error.code+":" + error.source+":" + error.target)
    
}
function onDirectorySuccess(parent) {
	opMessage(" Directory created successfuly")
}

function onDirectoryFail(error) {
    //Error while creating directory
	opMessage("Unable to create new directory: " + error.code);

}

// fileUri = file:///emu/0/android/cache/something.jpg
function moveFile(fileUri,dir) {
	
	var opdir = dir;




    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()).toString() + (currentdate.getMonth() + 1).toString() + (currentdate.getFullYear()).toString()
       + (currentdate.getHours()).toString()
                       + (currentdate.getMinutes()).toString()
                       + (currentdate.getSeconds()).toString();
    
                       oldFileUri = fileUri;
                       fileExt = "." + oldFileUri.split('.').pop();

                       newFileName = CurrentOrderNo+CurrentOpNo+"-"+datetime + fileExt;
                  
                       window.resolveLocalFileSystemURL(fileUri, function (file) {
                    	                             
                           window.resolveLocalFileSystemURL(opdir, function (opdir) {
                        	                     	  
            file.moveTo(opdir, newFileName, function (entry) {
            	selectedPhoto="file:///storage/emulated/0"+entry.fullPath
            	formPhotoDetails.open()
	
            	
               
            }, function (error) {
            	
            	opMessage("error moving:"+error.code+":"+error.source+":"+error.target);
            });
        }, errorMoveCallback);
    }, errorMoveCallback);
}
function moveFile2(fileUri,dir,cnt) {
	
	var opdir = dir;



    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()).toString() + (currentdate.getMonth() + 1).toString() + (currentdate.getFullYear()).toString()
       + (currentdate.getHours()).toString()
                       + (currentdate.getMinutes()).toString()
                       + (currentdate.getSeconds()).toString();
    
                       oldFileUri = fileUri;
                       fileExt = "." + oldFileUri.split('.').pop();

                       newFileName = CurrentOrderNo+CurrentOpNo+"-"+datetime +"_"+cnt+ fileExt;
                  
                       window.resolveLocalFileSystemURL(fileUri, function (file) {
                    	                             
                           window.resolveLocalFileSystemURL(opdir, function (opdir) {
                        	                     	  
            file.moveTo(opdir, newFileName, function (entry) {

            	selectedPhoto="file:///storage/emulated/0"+entry.fullPath
            	formPhotoDetails.open()
            			
            	
            	
               
            }, function (error) {
            	
            	opMessage("error moving:"+error.code+":"+error.source+":"+error.target);
            });
        }, errorMoveCallback);
    }, errorMoveCallback);
}
function buildPhotoList(){
	
	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById('PhotosTable');
	opTable.destroyItems();
	try {
		 window.resolveLocalFileSystemURL(DeviceStorageDirectory+AppDocDirectory+"/Private/Photos/", function (dirEntry) {
		    	
		        var directoryReader = dirEntry.createReader();
		          directoryReader.readEntries(photosReadSuccess, photosReadFail);
		    });
	}
	catch(err) {
	   //Not in Cordova
	}

	   

}

function photos_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);

    var opTable = sap.ui.getCore().getElementById('PhotosTable');
	opTable.addItem (new sap.m.ColumnListItem({
		cells : 
			[
			new sap.m.Text({text: f.name}),
            new sap.m.Text({text: f.type}),
            new sap.m.Text({text: f.size}),
			new sap.m.Text({text: d1.toString('yyyyMMdd')})  ,
			new sap.m.Text({text: DeviceStorageDirectory+AppDocDirectory+"/Private/Photos/"+f.name})
	 		]
		}));
}
function photosReadSuccess(entries) {
	
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
            entries[i].file(photos_details_callback);

        } else {
            console.log('photosDirectory - ' + entries[i].name);
            
        }
    }
}
function photosReadFail(error) {
	opMessage("Failed to list Photos contents: "+ error);
}
function buildGlobalDownloads(dir)

{
//need to sort out up directory
   
	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
	opTable.destroyItems();
	prevDir=dir;
if(dir!=cordova.file.externalRootDirectory+"Documents"){
	if(dir!=""){
		X=dir.split("/");
		uDir=""
		for(n=0;n<=X.length-3;n++){
	    	uDir+=X[n]+"/"
	    }
	    uDir+=X[X.length-2]
	prevDir=""
	    for(n=0;n<=X.length-2;n++){
	    	prevDir+=X[n]+"/"
	    }
	    prevDir+=X[X.length-1]
		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.ui.core.Icon({src : "sap-icon://response"}),
				new sap.m.Text({text: ""}),
	            new sap.m.Text({text: ""}),
	            new sap.m.Text({text: ""}),
				new sap.m.Text({text: ""}),
				new sap.m.Text({text: uDir})
		 		]
			}));
}
}
GlobalDirectory=prevDir;
	try {
		window.resolveLocalFileSystemURL(dir, function (dirEntry) {
	    	
	        var directoryReader = dirEntry.createReader();
	          directoryReader.readEntries(docsGDReadSuccess, docsGDReadFail);
	    });
	}
	catch(err) {
	   //Not in Cordova
	}
	    

}
function docsGDReadFail(error) {
	opMessage("Failed to list Photos contents: "+ error);
}
function gddocs_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);

    var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
    if(f.type!=""){
    	x=f.type.split("/")
    	y=d1.toString('yyyyMMdd')
    	z=y.substring(0,24)	
		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.ui.core.Icon({src : "sap-icon://document-text"}),
				new sap.m.Text({text: f.name}),
	            new sap.m.Text({text: x[1]}),
	            new sap.m.Text({text: f.size}),
				new sap.m.Text({text: z}),
				new sap.m.Text({text: GlobalDirectory+"/"+f.name})
		 		]
			}));
    }
}
function docsGDReadSuccess(entries) {
	 var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
        	
            entries[i].file(gddocs_details_callback);

        } else {
        	opTable.addItem (new sap.m.ColumnListItem({
        		cells : 
        			[
        			new sap.ui.core.Icon({src : "sap-icon://folder"}),
        			new sap.m.Text({text: entries[i].name}),
                    new sap.m.Text({text: ""}),
                    new sap.m.Text({text:""}),
        			new sap.m.Text({text: ""}),
        			new sap.m.Text({text: GlobalDirectory+"/"+entries[i].name})
        	 		]
        		}));
            
       }
    }
}
function buildPrivateUploads()

{

	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById('DocumentsUploadTable');
	opTable.destroyItems();
	try {
		window.resolveLocalFileSystemURL(DeviceStorageDirectory+AppDocDirectory+"/Private/Upload/", function (dirEntry) {
	    	
	        var directoryReader = dirEntry.createReader();
	          directoryReader.readEntries(docsPUReadSuccess, docsPUReadFail);
	    });
	}
	catch(err) {
	   //Not in Cordova
	}

	    

}
function docsPUReadFail(error) {
	opMessage("Failed to list Photos contents: "+ error);
}
function pudocs_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);
    var opTable = sap.ui.getCore().getElementById('DocumentsUploadTable');
	opTable.addItem (new sap.m.ColumnListItem({
		cells : 
			[
			new sap.m.Text({text: f.name}),
            new sap.m.Text({text: f.type}),
            new sap.m.Text({text: f.size}),
			new sap.m.Text({text: d1.toString('yyyyMMdd')}),
			  new sap.m.Text({text: DeviceStorageDirectory+AppDocDirectory+"/Private/Upload/"+f.name})
	 		]
		}));
}
function docsPUReadSuccess(entries) {
	
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
            entries[i].file(pudocs_details_callback);

        } else {
            console.log('docsDirectory - ' + entries[i].name);
            
        }
    }
}

function buildPrivateDownloads()

{

	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById('DocumentsDownloadTable');
	opTable.destroyItems();

	try {
		  window.resolveLocalFileSystemURL(DeviceStorageDirectory+AppDocDirectory+"/Private/Download/", function (dirEntry) {
		    	
		        var directoryReader = dirEntry.createReader();
		          directoryReader.readEntries(docsPDReadSuccess, docsPDReadFail);
		    });
	}
	catch(err) {
	   //Not in Cordova
	}

	  

}
function docsPDReadFail(error) {
	opMessage("Failed to list Photos contents: "+ error);
}
function pddocs_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);
    var opTable = sap.ui.getCore().getElementById('DocumentsDownloadTable');
	opTable.addItem (new sap.m.ColumnListItem({
		cells : 
			[
			new sap.m.Text({text: f.name}),
            new sap.m.Text({text: f.type}),
            new sap.m.Text({text: f.size}),
			new sap.m.Text({text: d1.toString('yyyyMMdd')}),
			  new sap.m.Text({text: DeviceStorageDirectory+AppDocDirectory+"/Private/Download/"+f.name}) 
	 		]
		}));
}
function docsPDReadSuccess(entries) {
	
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
            entries[i].file(pddocs_details_callback);

        } else {
            console.log('docsDirectory - ' + entries[i].name);
            
        }
    }
}


function createDir(rootDirEntry, folders) {
  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
  if (folders[0] == '.' || folders[0] == '') {
    folders = folders.slice(1);
  }
  rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
    // Recursively add the new subfolder (if we still have another to create).
    if (folders.length) {
      createDir(dirEntry, folders.slice(1));
    }
  }, errorHandler);
};



function errorHandler(error){

	opMessage("Failed to create The Directories: "+ error);
	}
var fileDownloadCnt=0;
var percentagedownloaded=0;
var filesToDownload = [];
function downloadAll()
{

			document.getElementById('DocTot').innerHTML="0"
			document.getElementById('DocDel').innerHTML="0"
			document.getElementById('DocNew').innerHTML="0"
			document.getElementById('DocMod').innerHTML="0"
			document.getElementById('DocLoc').innerHTML="0"

	oProgInd.setPercentValue(5);
	oProgInd.setDisplayValue("5" + "%");
	percentagedownloaded=0;
	filesToDownload = [];
	
    $.getJSON(localStorage.getItem("DOCSERVER")+'ListDirjson1.php?directory=MyJobs/Global/download', function (data) {
    	//$.getJSON(localStorage.getItem("DOCSERVER")+"Documents.json", function (data) {    
    	filesToDownload=data;
        var cnt = 0;
        st=getFormattedTime()
       
    	if(filesToDownload.FILES.length>0){
    		fileDownloadCnt=0;
    		
    	
    		updateAttachmentStatus("*","","","","","DELETE")
    		
    		
    		
    		}else{
    		oProgInd.setPercentValue(100);
        	oProgInd.setDisplayValue("100" + "%");
    		}
       
        
    }).success(function() { 
    	
    	})
    .error(function() { 
    
		oProgInd.setPercentValue(100);
    	oProgInd.setDisplayValue("100" + "%");
    })
    .complete(function() { 
    	
    	

    	
    	
    	});
    
  
	
}
function RequestLLFile(params)
{


	filesToDownload = [];
    $.getJSON(localStorage.getItem("DOCSERVER")+'FileRequest.php'+params, function (data) {
    	
        
    }).success(function() { 
    	
    	})
    .error(function() { 
    	
    })
    .complete(function() { 
    	
    	
    	
    	
    	});
    

}
function sendPhotoToServer(id,fname,content,ftype,flag){
	xmlname=getFileUploadName()+".xml"
	if(ftype=="photo"){
	updatePhotoState(id,"Sending")
	}
	else{
if(flag=="close"){
	updateAttachmentState(id,"Sending")	
		}
		
else{
	updateAttachmentState(id,"Sending")	
		buildJobDocsTable()
}
	}

	var jqxhr = $.post( localStorage.getItem("DOCSERVER")+'PhotoUpload.php',
			{
			fname: xmlname,
			content:content
			},
		
		
			function(data) {
			
				
		})
		  .done(function() {
			 
			  if(ftype=="photo"){
					updatePhotoState(id,"Sent")
					}
					else{
						if(flag=="close"){
							updateAttachmentState(id,"Sent")	
								}
								
						else{
							updateAttachmentState(id,"Sent")	
								buildJobDocsTable()
						}
					}
		
		  })
		  .fail(function() {
			  
			  if(ftype=="photo"){
					updatePhotoState(id,"Failed to Send")
					}
					else{
						if(flag=="close"){
							updateAttachmentState(id,"Failed to Send")	
								}
								
						else{
							updateAttachmentState(id,"Failed to Send")	
								buildJobDocsTable()
						}
					}
			  
		  })
		  .always(function() {
			 
		});
	}
function sendDocToServer(id,fname,content,flag){
	
	xmlname=getFileUploadName()+".xml"
	if(flag=="close"){
		updateDocumentState(id,"Sending")
	}
	else{
	updateDocumentState(id,"Sending")
	buildJobDocsTable()
	}
	var jqxhr = $.post( localStorage.getItem("DOCSERVER")+'PhotoUpload.php',
			{
			fname: xmlname,
			content:content
			},
		
			
			function(data) {
				
				
		})
		  .done(function() {
			  if(flag=="close"){
					updateDocumentState(id,"Sent")
				}
			  else{
			  updateDocumentState(id,"Sent")
			   buildJobDocsTable()
			  }
		  })
		  .fail(function() {
			  if(flag=="close"){
					updateDocumentState(id,"Failed To Send")
				}
			  else{
			  updateDocumentState(id,"Failed To Send")
			   buildJobDocsTable()
			  }
		  })
		  .always(function() {
			 
		});
/*	xx=fname.split(".")
	updateDocumentState(id,"Sending")
	var jqxhr = $.post( localStorage.getItem("DOCSERVER")+'PhotoUpload.php',
			{
			fname: xx[0]+".xml",
			content:content
			},
			
			
			function(data) {
			
				
		})
		  .done(function() {
			 
			  updateDocumentState(id,"Sent")
		  })
		  .fail(function() {
			 
			  updateDocumentState(id,"Failed To Send")
		  })
		  .always(function() {
			 
		});*/
	}
function BuildDocumentsTable() { 
	
	
	//  create a loop function
	   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
		   if(fileDownloadCnt<filesToDownload.FILES.length){
		      updateDocumemntsTable(escape(filesToDownload.FILES[fileDownloadCnt].url),escape(filesToDownload.FILES[fileDownloadCnt].name),filesToDownload.FILES[fileDownloadCnt].type,
		    		  filesToDownload.FILES[fileDownloadCnt].size,filesToDownload.FILES[fileDownloadCnt].lastmod)
	           fileDownloadCnt++;
	           sPercent=getPercentage(filesToDownload.FILES.length,fileDownloadCnt)
	        	if(sPercent < 5){sPercent=5}
	        	if(sPercent!=oProgInd.getPercentValue())
					{
	        		
	        		oProgInd.setPercentValue(sPercent);
	            	oProgInd.setDisplayValue(sPercent + "%");
					}
	        	BuildDocumentsTable();
			   
			}else 
				{
				oProgInd.setPercentValue(100);
			    oProgInd.setDisplayValue("100" + "%");
			   
			    updateDocsTable()

				}

	   }, 10)
	}
function downlodRequestedFile(dir,fn,id){
	
	window.resolveLocalFileSystemURL(dir+"/"+  fn, appStartLL, transferRequestedFile(fn, dir+"/",id));	
	
}
function downloadForms () { 
	
	var n=0;
	//  create a loop function

		   while(n<+filesToDownload.FILES.length){
		       fileName = filesToDownload.FILES[n].name;
		      
		       
		        window.resolveLocalFileSystemURL(DeviceStorageDirectory+filesToDownload.FILES[n].url+"/"  + filesToDownload.FILES[n].name, appStart, downloadAllAsset(filesToDownload.FILES[n].name, filesToDownload.FILES[n].url+"/"));
		        if(filesToDownload.FILES[n].type!="DIRECTORY"){
			    	   if(filesToDownload.FILES[n].name.toUpperCase().indexOf(".HTML")>0){
				   		x=filesToDownload.FILES[n].name.split(".")
				   		
				   			if(x[1].toUpperCase()=="HTML"){ //Its the Form file
				   				
				   				y=x[0].split("~")
				   				
				   				if(y.length==3)
				   					{
				   					InsertFormDetails(DeviceStorageDirectory+filesToDownload.FILES[n].url+"/"  + filesToDownload.FILES[n].name,y[0],y[1],y[2])
				   					}
				   			}
				   		
			    	   }
			       }
		        n++;
	          		
				}
  
	}
function checkFileDownload () { 
	
		
	//  create a loop function
	   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
		   if(fileDownloadCnt<filesToDownload.length){
		       fileName = filesToDownload[fileDownloadCnt].name;
		       if(fileDownloadCnt==10){

		       }
		        window.resolveLocalFileSystemURL(DeviceStorageDirectory+filesToDownload[fileDownloadCnt].url+"/"  + filesToDownload[fileDownloadCnt].name, appStart, downloadAllAsset(filesToDownload[fileDownloadCnt].name, filesToDownload[fileDownloadCnt].url+"/"));
		       fileDownloadCnt++;
	           sPercent=getPercentage(filesToDownload.length,fileDownloadCnt)
	        	if(sPercent < 5){sPercent=5}
	        	if(sPercent!=oProgInd.getPercentValue())
					{
	        		
	        		oProgIndDL.setPercentValue(sPercent);
	            	oProgIndDL.setDisplayValue(sPercent + "%");
					}
	           checkFileDownload(); 	
			}else 
				{
				
				oProgIndDL.setPercentValue(100);
			    oProgIndDL.setDisplayValue("100" + "%");			
				}

	   }, 10)
	}
function getPercentage(tot,val){
	
	var y = Math.round(tot/100) ;
	
	var percent = val / y

	return Math.round(percent) ;
}
function downloadMissing()
{
		
    $.getJSON(localStorage.getItem("DOCSERVER")+'ListDirjson.php?directory=MyJobs/POSTRIDGE/download', function (data) {
        downloadCount = 0
        
        //alert("private"+data.FILES.length)
        var cnt = 0;
        $.each(data.FILES, function (index) {
            fileName = data.FILES[index].name;
            
            window.resolveLocalFileSystemURL(DeviceStorageDirectory+AppDocDirectory+"/Private/Download/" + data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name,AppDocDirectory+"/Private/Download/"));
            cnt = cnt + 1;
           
        });
    });

    $.getJSON(localStorage.getItem("DOCSERVER")+'ListDirjson.php?directory=MyJobs/Global/download', function (data) {
        downloadCount = 0
        //alert("Global"+data.FILES.length)
        var cnt = 0;
        $.each(data.FILES, function (index) {
            fileName = data.FILES[index].name;
            window.resolveLocalFileSystemURL( DeviceStorageDirectory+ data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name, AppDocDirectory+"/Global/Download/"));
            cnt = cnt + 1;
        });
    });
  
}
function downloadLiveLink(fn,node,drawid)
{
   	try
	{
     window.resolveLocalFileSystemURL(DeviceStorageDirectory+"/LiveLink/" + fn, appStart, downloadLiveLinkFile(fn,"LiveLink/",node,drawid));
	}
	  catch (err) {
  
	  //window.open("http://10.193.162.118/otcs/llisapi.dll?func=LL.login&UserName=Admin&Password=H3nd3rs0n2&NextURL=/otcs/llisapi.dll%3ffunc%3dll%26objId%3d"+node+"%26objAction%3ddownload" ) 
  }
   
}
function downloadLiveLinkFile(fileName,dir,node,drawid) {
	
    var fileTransfer = new FileTransfer();
   
    llurl="http://10.193.162.118/otcs/llisapi.dll?func=LL.login&UserName=Admin&Password=H3nd3rs0n2&NextURL=/otcs/llisapi.dll%3ffunc%3dll%26objId%3d"+node+"%26objAction%3ddownload"
  
    fileTransfer.download(llurl, cordova.file.externalApplicationStorageDirectory + dir + node + "_" + fileName,
    //fileTransfer.download(llurl, DeviceStorageDirectory+"/LiveLink/" + dir + node + "_" + fileName,
		function (entry) {
		    opMessage(fileName+" Downloade from LiveLink Successfully");
		    updateMyJobDetsDraw(drawid,cordova.file.externalApplicationStorageDirectory + dir + node + "_" + fileName)
		   
		},
		function (error) {
			opMessage(fileName+" Downloade from LiveLink Failed -" + error.source+ ":" + error.target+": " + error.code);
	
		    
		});

}
function downloadAsset(fileName,dir) {
    var fileTransfer = new FileTransfer();
    x=fileName.split("/")
    //alert("About to start transfer " + localStorage.getItem("DOCSERVER") + fileName + " to " + cordova.file.externalApplicationStorageDirectory + dir + x[3]);
    fileTransfer.download(localStorage.getItem("DOCSERVER")+ fileName, cordova.file.externalApplicationStorageDirectory + dir + x[3],
		function (entry) {
		    //alert(entry.fullPath)
		   
		},
		function (error) {
		    
			opMessage("download error " + error.source+ ":" + error.target+": " + error.code);
	
	    
		});
}
function downloadAllAsset(fileName,dir) {
    var fileTransfer = new FileTransfer();
    fileTransfer.download(localStorage.getItem("DOCSERVER")+dir+"/" + escape(fileName), cordova.file.externalApplicationStorageDirectory + dir + "/"+escape(fileName),
		function (entry) {
    	
		   
		},
		function (error) {
		    
		    opMessage("download error " + error.source+ ":" + error.target+": " + error.code);
	
		    
		});
}

function transferRequestedFile(fileName,dir,id) {
	
    var fileTransfer = new FileTransfer();  
    //alert("Transfering:"+localStorage.getItem("DOCSERVER")+dir + escape(fileName)+" To "+
    //			cordova.file.externalApplicationStorageDirectory + dir +escape(fileName))
    fileTransfer.download(localStorage.getItem("DOCSERVER")+dir + escape(fileName), cordova.file.externalApplicationStorageDirectory + dir +escape(fileName),
		function (entry) {
    	opMessage("Downloading LL "+entry.fullPath)
    	html5sql.process("UPDATE MyJobDetsDraw SET zurl = '"+cordova.file.externalApplicationStorageDirectory + dir +fileName+"' where id='"+id+"'",
				 function(){
    		buildJobDocsTable();
				 },
				 function(error, statement){
					 
					 opMessage("Error: " + error.message + " when processing " + statement);
				 }        
		);  
		},
		function (error) {
	    	html5sql.process("UPDATE MyJobDetsDraw SET zurl = 'Download Failed' where id='"+id+"'",
					 function(){
	    		buildJobDocsTable();
					 },
					 function(error, statement){
						 
						 opMessage("Error: " + error.message + " when processing " + statement);
					 }        
			);
			opMessage("download error " + error.source+ ":" + error.target+": " + error.code);
	
		    
		});
}
function appStart() {
    
}
function appStartLL() {
	opMessage(" LL Download starting")
}	

function photosReadFail(error) {
	opMessage("Failed to list Photos contents: "+ error);
}
function buildImageDownloads(dir)

{
//need to sort out up directory
   
	try {
		window.resolveLocalFileSystemURL(dir, function (dirEntry) {
	    	
	        var directoryReader = dirEntry.createReader();
	          directoryReader.readEntries(ImageGDReadSuccess, ImageGDReadFail);
	    });
	}
	catch(err) {
	   //Not in Cordova
	}
	    

}
function ImageGDReadFail(error) {
	opMessage("Failed to list Photos contents: "+ error);
}
function gdimg_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);

   
}
function ImageGDReadSuccess(entries) {
	// var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
        	
            entries[i].file(gdimg_details_callback);

        } 
    }
}
