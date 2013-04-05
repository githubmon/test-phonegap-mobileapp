//--Constants
var MOBILE_NETWORK_CONNECTED_STATUS = "Connected";

//-- Check Mobile network state:
function checkConnection() {  
	
	var networkStateResponse = null;
	var networkState = navigator.network.connection.type;
    console.log('checkConnection - Connection type: ' + networkState);
    
    if(networkState == Connection.UNKNOWN){			
    	networkStateResponse = "Unknown connection.";	    
	} 
    else if(networkState == Connection.NONE){
    	networkStateResponse = "No network connection. Turn on your WIFI / Data Network";	
    }   
    else{
    	networkStateResponse = MOBILE_NETWORK_CONNECTED_STATUS;
    }
    return networkStateResponse;
}