<?php 
namespace App\Http\Controllers\Chat;

use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Messages;
use App\Models\Rooms;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\ObjectId;

class ChatController extends Controller {
    
    public function CreateRoom(Request $request) {
        try {
            $auth =  auth('api') -> user();
            $room = new Rooms;
            $room->name = $request->name;
            $room->save();
            $obj = (object) array (
                "name"=> $request->name,
                "room_id"=> $room->_id
            );
            $add = Account::where('_id',$auth->_id)->push('rooms',$obj);
            return response()->json([
                "success" => true,
                "message" => "room create successfully",
                "post_info"=> $room
            ]);
        }

        catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e
            ]);
        }
    }

    public function AddMemberRoom(Request $request) {
        try {
            $auth = auth('api')->user();
            $obj_room = (object) array (
                "name" => $request->name_room,
                "room_id" => $request->room_id
            );
            $account = Account::where('_id',$request->user_id)->push('rooms',$obj_room);
            return response()->json([
                "success" => true,
                "message" => "add member to room successfully",
            ]);
        }
        catch(Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e
            ]);
        }
    }

    public function SendMessage(Request $request) {
        try {
            $auth = auth('api') ->user();
            $message = new Messages;
            $message->text = $request->text;
            $message->user_send = $auth;
            if($message->save())
            {
                $messages = Messages::where('room_id',$request->room_id)->get();
                $event = new MessageEvent($messages);
                event($event);           
            }
            return response() ->json([
                "success" =>true,
                "message" => "create message successfully",
                "message_create" => $message
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