<?php 
namespace App\Http\Controllers\AddFriend;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\ObjectId;

class AddFriendController extends Controller {

    //2 hàm dưới cho phép gửi lời mời kết bạn và hủy lời mời kết bạn
    public function SendAddFriend(Request $request) {
       $auth =  auth('api') -> user();
       $obj = (object) array(
        "name"=>$request->name,
        "user_id" => $request->_id,
       );
       
       $obj_main = (object) array(
         "name"=>$auth->name,
         "user_id" =>$auth->_id
       );

       $account = Account::where("_id",$auth->_id)->push('friends_pendding',$obj);
       $friend = Account::where("_id",$request->_id)->push('friends_request',$obj_main);
       return "success";
    }

    public function DeleteAddFriend(Request $request) {
        $auth = auth('api') ->user();;
        $obj = (object) array(
            "name"=>$request->name,
            "user_id" => $request->_id
        );
        
        $obj_main = (object) array(
            "name"=>$auth->name,
            "user_id" =>$auth->_id
        );
        $account =  Account::where("_id",$auth->_id)->pull('friends_pendding',$obj);
        $friend = Account::where("_id",$request->_id)->pull('friends_request',$obj_main);
        return "success";
    }

    //2 hàm tiếp theo là chấp nhận thêm bạn và xóa bạn cũ
    public function AddFriend(Request $request) {
        $auth = auth('api')->user();
        $obj = (object) array(
            "name"=>$request->name,
            "user_id" => $request->_id
        );

        $obj_main = (object) array(
            "name"=>$auth->name,
            "user_id" =>$auth->_id
        );

        $account  = Account::where("_id",$auth->_id)->push('friends',$obj)->pull('friends_request',$obj);
        $friend = Account::where("_id",$request->_id)->push('friends',$obj_main)->pull('friends_pendding',$obj_main);
        return "success";
    }

    public function DeleteFriend(Request $request) {
        $auth = auth('api')->user();
        $obj = (object) array(
            "name"=>$request->name,
            "user_id" => $request->_id
        );

        $obj_main = (object) array(
            "name"=>$auth->name,
            "user_id" =>$auth->_id
        );

        $account =  Account::where("_id",$auth->_id)->pull('friends',$obj);
        $friend = Account::where("_id",$request->_id)->pull('friends',$obj_main);
        return "success";
    }

}