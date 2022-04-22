<?php
  namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;

class HomeController extends Controller {

    public function SearchFriends(Request $request) {
        $account = Account::where('name',$request->search)->get();

        return response()->json(["message" => 'search all!!',
                                 "status"=>"200",
                                 "success"=>"true",
                                 "data"=> $account 
                                ],201);
    }
}

