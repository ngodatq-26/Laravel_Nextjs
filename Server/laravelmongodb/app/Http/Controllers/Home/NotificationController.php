<?php
  namespace App\Http\Controllers\Home;

use App\Events\CommentEvent;
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

class NotificationController extends Controller {
    public function GetNotifications(Request $request) {
        try {
            $auth = auth('api')->user();
            $notices = Notifications::where('user_id',$auth->_id)->get();
            return response()->json([
                "success" => true,
                "message" => "get notifications successfully",
                "notices" => $notices
            ],201);
        }
        catch(Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e
            ],401);
        }
    }

    public function SeenNotifications(Request $request) {
        try {
            $auth = auth('api')->user();
        } 
        catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e
            ],401);
        }
    }

}