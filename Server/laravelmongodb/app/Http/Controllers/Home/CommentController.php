<?php
  namespace App\Http\Controllers\Home;

use App\Events\CommentEvent;
use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\AllPosts;
use App\Models\Comments;
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
            if($comment->save()){
               $comments = Comments::where('post_id',$request->post_id)->get();
               $event = new CommentEvent($comments);
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
            $comments = Comments::where('post_id',$request->post_id)->get();
            
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