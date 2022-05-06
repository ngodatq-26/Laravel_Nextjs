<?php
  namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Account;
use Illuminate\Http\Request;
use App\Models\AllPosts;


class PostController extends Controller {

    public function CreatePost(Request $request) {
        $auth = auth('api') ->user();
        $post = new AllPosts; 
        $post->user_id = $auth->_id;
        $post->post_main = $request->main;
        $post->share = [];
        $post->react = [];
        $post->title = $request->title;
        $post->images = [];
        $post->save();
    } 

    public function DeletePost(Request $request) {
        $auth = auth('api')->user();
    }

    public function UploadImages(Request $request) {
        $auth = auth('api') ->user();
    }
}