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

    public function CreateRoomFriends($name,$members,$isGroup) {
        $room =  new Rooms;
        $room->members = $members;
        $room->name = $name;
        $room->isGroup = $isGroup;
        $room->save();
    }

    public function CreateRoom(Request $request) {
        try {
            $room = new Rooms;
            $room->id_check = '';
            $room->name ='';
            $array = $request->arrayMembers;

            //sap xep array theo thu tu tu be den lon
            sort($array);

            //tao id_check cho room
            for ($i = 0;$i< count($array);$i++) {
                $room->id_check = ($room->id_check).($array[$i]);
                $user = Account::find($array[$i]);
                $room->name = ($room->name).($user->name).(",");
                $room->members = $array;
            }

            //kiem tra room co ton tai hay khong
            $check =  Rooms::where('id_check',$room->id_check)->take(1)->get();
            if(count($check) == 0) {
                $room->save();
                return response()->json([
                    "success" => true,
                    "message" => "room create successfully",
                    "info"=> $room
                ]);
                
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "rooms exist with friends",
                    "check" => $check
                ]);
            }    
        }
        catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e
            ]);
        }
    }

    public function DeleteRoom(Request $request) {
        try {
            $room = Rooms::find($request->_id);
            if($room) {
                $text = Messages::where('room_id',$request->_id)->get();
                $text->delete();
                $room->delete();
                return response()->json([
                    "success" => true,
                    "message" => "delete rooms successfully",
                    "rooms" => $room
                ]);
            }  else {
                return response()->json([
                    "success" => true,
                    "message" => "rooms not exist",
                    "rooms" => $room
                ]);
            }
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
            $message->user_send = $auth->_id;
            $message->room_id = $request->room_id;
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

    public function DeleteMessage(Request $request) {
        try {
            $message = Messages::find($request->message_id);
            if($message) {
                $message->delete();
                return response() ->json([
                    "success" =>true,
                    "message" => "delete message successfully",
                ]); 
            } else {
                return response() ->json([
                    "success" =>false,
                    "message" => "message not found",
                ]);
            }
        }
        catch (Exception $e) {
            return response() ->json([
                "success" =>false,
                "message" => $e
            ]);
        }
    }

    public function GetMessage(Request $request) {
        try {
            $auth = auth('api') ->user();
            $messages = Messages::where('room_id',$request->room_id)->orderBy('created_at','desc')->take($request->mount)->get();
            return response() ->json([
                "success" =>true,
                "message" => "get message successfully",
                "message_create" => $messages
            ]); 
        } catch (Exception $e) {
            return response() ->json([
                "success" =>false,
                "message" => $e
            ]);
        }
    }

    public function GetAllRooms(Request $request) {
        
        try {
            $obj = [];
            $auth = auth('api') ->user();
            $rooms = Rooms::all();
            for ($i = 0;$i< count($rooms);$i++) {
                for($j = 0; $j < count($rooms[$i]->members);$j++) {
                    if($rooms[$i]->members[$j] == $auth->_id) {
                        array_push($obj,$rooms[$i]);
                    }
                }
            }
            $array = json_decode(json_encode($rooms), true);
            return response() ->json([
                "success" =>true,
                "message" => "find All rooms successfully",
                "rooms" => $obj
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