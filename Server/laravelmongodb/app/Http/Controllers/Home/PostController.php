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
        $post->post_main = $request->main;
        $post->share = $request->share;
        $post->react = $request->react;
        $post->title = $request->title;
        $post->images = $request->images;
        $post->save();
        return response()->json([
            "success" => true,
            "message" => "post create successfully",
            "post_info"=> $post
        ]);
    } 

    public function GetPostsById(Request $request) {
        $auth = auth('api') ->user();
        $post = AllPosts::where('user_id',$request->_id)->get();
        return response()->json([
            "success" => true,
            "message" => "post create successfully",
            "posts_info"=> $post
        ]);
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
                    "name" => $path,
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

}