<?php
  namespace App\Http\Controllers\Home;

use App\Events\CommentEvent;
use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\AllPosts;
use App\Models\Comments;
use App\Models\React;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ReactController extends Controller {
    use HasFactory;

    public function ReactPost(Request $request) {
        try{
            $auth = auth('api')->user();
            $react = new React;
            $react->user_id = $auth->_id;
            $react->post_id = $request->post_id;
            $react->react = "like";
            $check = React::where('user_id',$auth->_id)->where('post_id',$request->post_id)->get();
            if(count($check) == 0) {
                $react->save();
                return response()->json([
                    "success" => true,
                    "message" => "react successfully the post",
                    "react_info" => $react,
                ],201);
            } else {
                $check[0]->delete();
                return response()->json([
                    "success" => false,
                    "message" => "ERROR react successfully the post",
                 ],402);
            }
        }
        catch(Exception $e) {
            return response() ->json([
                "success" =>false,
                "message" => $e
            ],401);
        }
    }

    public function getAllReacts(Request $request) {
        try {
            $auth = auth('api')->user();
            $reacts = React::where('post_id',$request->post_id)->get();
            return response()->json([
                "success" => true,
                "message" => "get all react successfully the post",
                "count" => count($reacts),
            ],201);
        } catch(Exception $e) {
            return response() ->json([
                "success" =>false,
                "message" => $e
            ],401);
        }
    }
}