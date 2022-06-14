<?php
  namespace App\Http\Controllers\Home;

use App\Events\CommentEvent;
use App\Events\NoticeEvent;
use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\AllPosts;
use App\Models\Comments;
use App\Models\Notifications;
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

            $notice = new Notifications;
            $post = AllPosts::find($request->post_id);//tim thong tin bai viet
            $user_like = Account::find($auth->_id);//tim thong tin nguoi da like bai viet

            $check = React::where('user_id',$auth->_id)->where('post_id',$request->post_id)->get();
            if(count($check) == 0) {
                $react->save();
                $notice->user_id = $post->user_id;
                $notice->post_id = $request->post_id;
                $notice->text = $user_like->name." đã like bài viết của bạn";
                $notice->seen = false;
                if($notice->save()) {
                    $event = new NoticeEvent($notice);
                    event($event);
                }
                return response()->json([
                    "success" => true,
                    "message" => "react successfully the post",
                    "react_info" => $react,
                ],201);
            } else {
                $check[0]->delete();
                $checkNotice = Notifications::where('user_id',$post->user_id)->where('text',$user_like->name." đã like bài viết của bạn")->where('post_id',$request->post_id)->get();
                $checkNotice[0]->delete();
                return response()->json([
                    "success" => false,
                    "message" => "ERROR react successfully the post"
                 ],202);
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
            $checkLike = React::where('user_id',$auth->_id)->where('post_id',$request->post_id)->get();
            return response()->json([
                "success" => true,
                "message" => "get all react successfully the post",
                "count" => count($reacts),
                "checkLike" => count($checkLike) 
            ],201);
        } catch(Exception $e) {
            return response() ->json([
                "success" =>false,
                "message" => $e
            ],401);
        }
    }

}