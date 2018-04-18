export default function parseQueryString(argu){
    var str = argu.split('?')[1];
    var result = {};
    var temp = str.split('&');
  
    for(var i=0; i<temp.length; i++)
    {
       var temp2 = temp[i].split('=');
       result[temp2[0]] = temp2[1];
      
    }
    return result;
  }    
