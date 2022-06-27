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
        
        return response()->json(["message" => 'search all!!',
                                 "status"=>"200",
                                 "success"=>"true",
                                 "data"=> $account ,
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

    public function Test() {
      return 'ok';
    }

    public function AlertStrangerLogin() {
      $auth = auth('api')->user();
      if (count($auth->location) >=2) {
        return response()->json(["message" => 'have a device login by your account!!!',
                                  "success"=>"true",
                                  "data"=> $auth->location,
                                ],201);
      } else {
        return response()->json(["message" => 'OK!!!',
                                  "success"=>"true",
                                  "data"=> $auth->location,
                                ],201);
      }
    }

}

