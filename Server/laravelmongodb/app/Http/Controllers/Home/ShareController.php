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
use App\Models\Share;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ShareController extends Controller {

    use HasFactory;

    public function CreateShare(Request $request) {
        
        try {
            $auth = auth('api')->user();
            $share = new Share;
            $share->user_id = $auth->_id;
            $share->text = $request->text;
            $share->send_to = $request->send_to;
            $share->post_id = $request->post_id;
            $share->save();
            for($i = 0;$i < count($request->send_to);$i ++) {
                $notice = new Notifications;
                $notice->user_id = $request->send_to[$i];
                $notice->text = $auth->name." đã chia sẻ tới bạn 1 bài viết";
                $notice->seen = false;
                $notice->post_id = $request->post_id;
                if($notice->save()) {
                    $event = new NoticeEvent($notice);
                    event($event);
                }
            }
            return response()->json([
                "success" => true,
                "message" =>"create share successfully",
                "share_info" => $share
            ],201);
            $share->save();
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" =>$e
            ],401);
        }
    }

    public function DeleteShare(Request $request) {
        try {
            
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" =>$e
            ],401);
        }
    }
}