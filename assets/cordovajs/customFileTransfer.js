/*********************************** 
 * Handling File Transfer request
 * 
 ***********************************/

/**
 * Constants
 */
//-- Server location path:
var HOST         = "192.168.1.132";
var PORT         = "8181";
var WEBAPP_NAME  = "/jersey-webapp";
var REMOTE_SERVICE_NAME = "/webresources/uploadFile";

/***
 * Functions
 */
function uploadFileToServer() {
	console.log("INIT - uploadFileToServer method");	
	document.addEventListener("deviceready", onDeviceReady, false);		
}

function onDeviceReady() {    
	//-Check mobile connection first....
	var networkState = checkConnection();	
	
	if(networkState == MOBILE_NETWORK_CONNECTED_STATUS){		
		// Retrieve image file location from specified source
	    navigator.camera.getPicture(uploadPhoto,
	                                function(message) { alert('get picture failed'); },
	                                { quality: 50,destinationType: navigator.camera.DestinationType.FILE_URI,
	                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
	                                );
	}else{
		document.getElementById("message").innerHTML= "<font color='red'><b>" + networkState + "</font>";
	}
}

//-- Upload file invoking a Remote Service
function uploadPhoto(imageURI) {
	console.log("INIT - uploadPhoto method");
	
    var options = new FileUploadOptions();
    options.fileKey="file";	            	            
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);            	            	            
    options.fileName = options.fileName + ".jpeg";	            	            
    options.mimeType="image/jpeg";
     options.chunkedMode = false;
   
    var params = new Object();
    params.device="Mobile"; //Optional
    params.user="";         //if blank, Will be filled with "default" value in the Server side.	            	
    options.params = params;
	  
    var ft = new FileTransfer();                      
    
    var remoteURL   = "http://" + HOST + ":" + PORT + WEBAPP_NAME + REMOTE_SERVICE_NAME;
    console.log("uploadPhoto method - URL called =" + remoteURL);
    	            
    ft.upload(imageURI, encodeURI(remoteURL), win, fail, options);       
    
    console.log("END - uploadPhoto method");
}

//-- succesfully uploading!
function win(r) {
	//-- Retrieving JSON response from Server...
	var JSONObject = JSON.parse(r.response);
	var created         = JSONObject.created;
	var id              = JSONObject.id;
	var serviceMessage  = JSONObject.serviceMessage;
	var isSucess        = JSONObject.success;   
	
	console.log("win - SUCESS message=" + serviceMessage);
	
	document.getElementById("message").innerHTML= serviceMessage;	

}			
//-- failed!
function fail(error) {
	
	console.log("INIT - fail method");
	console.log("Error code=" + error.code);
	
	var errorGenericMsg =  "Error invoking remote service: ";	  
	var errorReason     = "";
	var contactDetails  = "Contact to admin@admin.com for more help.";
	var messageDisplayed  = ""; 
	
	if(error!=null && error.code == FileTransferError.FILE_NOT_FOUND_ERR){
		errorReason =errorReason+"Remote File/Folder not found.";
	}
	else if(error!=null && error.code == FileTransferError.INVALID_URL_ERR){
		errorReason =errorReason+"Invalid URL.";
	}
	else if(error!=null && error.code == FileTransferError.CONNECTION_ERR){
		errorReason =errorReason+"Connection error.";
	}
	else{
		errorReason =errorReason+"Unknown reason.";
	}
	messageDisplayed  = "<font color='red'><b>" 
							+ "Uploaded failed !!<br>" 
							+ errorGenericMsg + "<br>"
							+ " Reason: " + errorReason + "<br>"
							+ " Target:" + error.target															
					    + "</font><br>"
					    + contactDetails; 
						
	console.log("fail - FAIL message=" + messageDisplayed);		
	
	document.getElementById("message").innerHTML= messageDisplayed;
	
	console.log("END - fail method");
}