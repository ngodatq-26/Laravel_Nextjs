<?php 
 namespace App\Http\Controllers\Profile;
 
use App\Http\Controllers\Controller;
use App\Models\Account;
use \Exception;
use Illuminate\Http\Request;

class ProfileController extends Controller {
    
    public function getProfile() {
      try{
        $auth = auth('api')->user();
        $account = Account::where("_id",$auth->id)->take(1)->get();
        if($account) {
            return response() -> json(["status"=>"200","success"=>"true","data"=>
              [
                "user_id" => $auth->_id,
                "email"=> $account[0]->email,
                "name"=> $account[0]->name,
                "info"=>$account[0]->info,
                "friends"=>$account[0]->friends,
                "friends_pendding"=>$account[0]->friends_pendding,
                "friends_request"=>$account[0]->friends_request,
              ]
            ],201);
        } else {
            return response()-> json(["status"=>"200","success"=>"true","message"=>"not found"],401);
        }
      } catch (Exception $e) {
        return $e;
      }
    }


    public function getProfileById(Request $request) {
        $account = Account::where("_id",$request->_id)->take(1)->get();
        if($account) {
            return response() -> json(["status"=>"200","success"=>"true","data" =>
              [
                "email"=> $account[0]->email,
                "name"=> $account[0]->name,
                "info"=>$account[0]->info,
                "friends"=>$account[0]->friends,
              ]
            ],201);
        }
        else {
            return response()-> json(["status"=>"200","success"=>"true","message"=>"not found"],401);
        }
    }
}