<?php
  namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\AllPosts;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
class PostController extends Controller {

    public function CreatePost(Request $request) {
        $auth = auth('api') ->user();
        $post = new AllPosts; 
        $post->user_id = $auth->_id;
        $post->name = $auth->name;
        $post->post_main = $request->main;
        $post->share = $request->share;
        $post->title = $request->title;
        $post->images = $request->images;
        $post->save();
        return response()->json([
            "success" => true,
            "message" => "post create successfully",
            "post_info"=> $post
        ]);
    } 

    public function getIdFriends($obj) {
        return $obj->user_id;
    }

    public function GetPostsById(Request $request) {
        $auth = auth('api') ->user();
        $post = AllPosts::where('user_id',$request->user_id)->get();
        return response()->json([
            "success" => true,
            "message" => "post create successfully",
            "posts_info"=> $post
        ]);
    }

    public function GetPostsFriends() {
        try{
            $auth = auth('api')->user();
            $obj = array();
            for ($i = 0; $i < count($auth->friends);$i ++) { 
                $post = AllPosts::orderBy('updated_at','desc')->where('user_id',$auth->friends[$i]['user_id'])->get();
                $array = json_decode(json_encode($post), true);
                $obj = array_merge($obj,$array);
            }

            return response() -> json([
                "success" => true,
                "message" => "post create successfully",
                "all_posts_info"=> $obj
            ]);
        } catch(Exception $e) {
            return response() -> json([
                "success" => false,
                "message" => $e,
            ]);
        }
    }

    public function DeletePost(Request $request) {
        $auth = auth('api') ->user();
        return response()->json([
            "success" => true,
            "message" => "delete successfully the post",
            "posts_info"=> $auth
        ]);;
    }

    public function UploadImages(Request $request) {
      try {
        $auth = auth('api') ->user();
        $file = $request;
        if ($file = $request->file('image')) {
            $path = $file->store('public/files');
            $name = $file->getClientOriginalName();
            $content = $file->getContent();
            Storage::disk('google')->put($name,$content);
            
            //store your file into directory and db
            return response()->json([
                "success" => true,
                "message" => "File successfully uploaded",
                "images" => [
                    "path" => $path,
                    "name" => $name,
                    "user" => $auth->_id,
                ]
            ]);

        } else return response()->json([
            "success" => false,
            "message" => "File not found",
            "file" => $request
        ]);
      } catch (Exception $e) {
        response()->json([
            "success" => false,
            "message" => $e,
        ],404); 
      }
    }

    public function DeleteImages(Request $request) {
        try {
            $auth = auth('api') ->user();

        } 
        catch (Exception $e) {

        }
    }

}