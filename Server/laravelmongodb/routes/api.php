<?php

use App\Http\Controllers\AccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\AddFriend\AddFriendController;
use App\Http\Controllers\Chat\ChatController;
use App\Http\Controllers\Home\CommentController;
use App\Http\Controllers\Home\PostController;
use App\Http\Controllers\Profile\ProfileController;
use Google\Service\Adsense\Row;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix'=>'auth'],function($router){
    Route::post('/login',[AuthController::class,'Login']);
    Route::post('/register',[AuthController::class,'Register']);
});

Route::group(['prefix' => 'home','middleware' => ['auth:api']],function($router) {
    Route::post('/search',[HomeController::class,'SearchFriends']);
    Route::get('/friend_request',[HomeController::class,'getFriendsRequest']);
    Route::any('/create_post',[PostController::class,'CreatePost']);
    Route::any('/delete_post',[PostController::class,'DeletePost']);
    Route::any('/images_post',[PostController::class,'UploadImages']);
    Route::any('/images_delete',[PostController::class,'DeleteImages']);
    Route::any('/get_posts',[PostController::class,'GetPostsById']);
    Route::any('/get_posts_friends',[PostController::class,'GetPostsFriends']);
    Route::post('/create_comment',[CommentController::class,'CreateComment']);
    Route::any('/get_all_comment',[CommentController::class,'GetCommentByPost']);
});

Route::group(['prefix'=>'messages','middleware'=> ['auth:api']],function($router) {
    Route::any('/create_room',[ChatController::class,'CreateRoom']);
    Route::any('/add_member_room',[ChatController::class,'AddMemberRoom']);
    Route::any('/send_message',[ChatController::class,'SendMessage']);
});

Route::group(['prefix' => 'profile','middleware' => ['auth:api']],function($router) {
    Route::any('/',[ProfileController::class,'getProfile']);
    Route::any('/user',[ProfileController::class,'getProfileById']);
});

Route::group(['prefix' => 'friends','middleware' => ['auth:api']],function($router) {
    Route::post('/add_pendding',[AddFriendController::class,'SendAddFriend']);
    Route::post('/delete_pendding',[AddFriendController::class,'DeleteAddFriend']);
    Route::post('/cancel',[AddFriendController::class,'NotAcceptRequestFriend']);
    Route::post('/delete',[AddFriendController::class,'DeleteFriend']);
    Route::post('/add',[AddFriendController::class,'AddFriend']);
});


