import { parse } from "html-metadata-parser";
export const DATABASE_HOST = 27017;
export const MONGODB_URI = 'mongodb+srv://ngoquangdatjpnd:Datdatdat@cluster0.ynxku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
export const ACCESS_TOKEN_KEY = "token";

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius : 2
};

//function get time at created
export function convertTime(time) {
    var date = new Date(time);
    var date_now = new Date();
    if (date_now.getFullYear() - date.getFullYear() > 0) {
      return  date_now.getFullYear() - date.getFullYear() + " years ago";
    } else {
      if (date_now.getMonth() - date.getMonth() > 0) {
        return date_now.getMonth() - date.getMonth() + " months ago";
      } else {
        if (date_now.getDate() - date.getDate() > 0) {
          return date_now.getDate() - date.getDate() + " days ago";
        } else {
          if (date_now.getHours() - date.getHours() > 0) {
             return date_now.getHours() - date.getHours() + " hours ago";
          } else {
              if (date_now.getMinutes() - date.getMinutes() > 0) {
                return date_now.getMinutes() - date.getMinutes() + " minutes ago"
              } else {
                  if (date_now.getSeconds() - date.getSeconds() > 0) {
                       return date_now.getSeconds() - date.getSeconds()  + " seconds ago"
                     } else return "recently";
              }
          }
        }
      }
    }
  }

  //function get file from input type=file
export function ReadFileImage(file,callback) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function() {
      const url = fileReader.result
      callback(url)
    }
}

//function change string to array,check array member valid url or not,then callback
export const checkUrl = (input,callback) => {
    const a = input.split(' ');
    for(let i = 0;i<a.length;i++) {
        console.log(a[i])
        console.log(isValidHttpUrl(a[i]))
        if(isValidHttpUrl(a[i]) == true) {
            console.log(a[i])
            fetchDataFromUrl(a[i],callback)
        }
    }
}

//functuion check url valid or not
export function isValidHttpUrl(string) {
    let url; 
    try {
      url = new URL(string);
      console.log(url)
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

//fetch datameta from url (str),then callback(set image,description useState...)
export const fetchDataFromUrl = async (str,callback) => {
  try {
    const res = await parse(str).then(e =>{
      console.log(e);
      callback(e)
    })
  } catch (err) {
    console.log(err);
    
  }
}