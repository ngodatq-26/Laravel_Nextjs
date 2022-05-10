<?php
  namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\AllPosts;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class PostController extends Controller {

    public function CreatePost(Request $request) {
        $auth = auth('api') ->user();
        $post = new AllPosts; 
        $post->user_id = $auth->_id;
        $post->post_main = $request->main;
        $post->share = [];
        $post->react = [];
        $post->title = $request->title;
        $post->images = $request->images;
        $post->save();
    } 

    public function DeletePost(Request $request) {
        $auth = auth('api') ->user();
        return "success";
    }

    public function UploadImages(Request $request) {
      $auth = auth('api') ->user();
      $file = $request;
      if ($file = $request->file('avatar')) {
          $path = $file->store('public/files');
          $name = $file->getClientOriginalName();
          $content = $file->getContent();
          Storage::disk('google')->put($name,$content);
          //store your file into directory and db
          return response()->json([
              "success" => true,
              "message" => "File successfully uploaded",
              "images" => [
                  "name" => $name,
                  "user" => $auth->_id,
              ]
          ]);

      } else return response()->json([
          "success" => false,
          "message" => "File not found",
          "file" => $request
      ]);
    }
}