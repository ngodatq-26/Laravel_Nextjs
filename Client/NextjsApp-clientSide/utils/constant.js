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