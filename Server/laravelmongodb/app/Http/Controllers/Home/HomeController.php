<?php
  namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;

class HomeController extends Controller {

    public function SearchFriends(Request $request) {
        $auth = auth('api') ->user();
        $account = Account::where('name',$request->search)->get();
        $data = [];
        for($i = 0 ; $i < sizeof($account) ; $i++) {
            if($auth->_id != $account[$i]->_id) {
            $friend_data = (object) array (
              "_id"=>$account[$i]->_id,
              "name"=>$account[$i]->name,
              "email"=>$account[$i]->email,
              "info"=>$account[$i]->info,
              "friends"=>$account[$i]->friends,
              "friends_pendding"=>$account[$i]->friends_pendding
            );
            array_push($data,$friend_data);
            }
        };
        return response()->json(["message" => 'search all!!',
                                 "status"=>"200",
                                 "success"=>"true",
                                 "data"=> $data ,
                                ],201);
    }

    
    public function getFriendsRequest() {
        $auth = auth('api') ->user();
        $account = Account::where('_id',$auth->_id)->get();
        return response()->json(["message" => 'search all!!',
                                  "status"=>"200",
                                  "success"=>"true",
                                  "data"=> $account[0]->friends_request,
                                ],201);
    }
}

