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
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class CommentController extends Controller {
    use HasFactory;
    public function CreateComment (Request $request) {
        try{
            $auth = auth('api') ->user();
            $comment = new Comments;
            $comment->user_id = $auth->_id;
            $comment->name = $auth->name;
            $comment->text = $request->text;
            $comment->post_id = $request->post_id;

            $notice = new Notifications;
            $post = AllPosts::find($request->post_id);

            $notice->user_id = $post->user_id;
            $notice->post_id = $request->post_id;
            $notice->seen = false;
            $notice->text = $auth->name." đã bình luận về 1 bài viết của bạn";
            if($comment->save()){
               $notice->save();
               $event_notice = new NoticeEvent($notice);
               event($event_notice);
               $event = new CommentEvent($comment);
               event($event);
            }
            return response() ->json([
                "success" =>true,
                "message" =>"comment successfully",
                "comment" =>$comment,
            ]);
        } catch (Exception $e) {
            return response() ->json([
                "success" =>false,
                "message" => $e
            ]);
        }
    }

    public function GetCommentByPost(Request $request) {
        try {
            $auth = auth('api') ->user();
            $comments = Comments::where('post_id',$request->post_id)->orderBy('created_at','desc')->take($request->mount)->get();
            return response() ->json([
                "success" =>true,
                "message" =>"comment successfully",
                "comment"=>$comments,
            ]);
        }
        catch (Exception $e) {
            return response() ->json([
                "success" =>false,
                "message" => $e
            ]);
        }
    }
    
}