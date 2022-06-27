<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller 
 {

     public function Login(Request $request) {
        $accounts = Account::where('email',$request->email)->first();

        if(!$accounts) {
           return response()->json(["message" => 'Email không tồn tại !!',"status"=>"200","success"=>"false"],201);
        } 

        $credentials = $request->only('email', 'password');
        $token = auth()->attempt($credentials);

        if($accounts){
            $checkHash = Hash::check($request->password,$accounts->password);
            if (!$checkHash) {
               return response()->json(["message" => "password is incorrect!!!","status"=>"200","success"=>"false"],201);
            } else {
               return response()->json(["message" => 'OK!!',"status"=>"200","success"=>"true",
            "data"=>[
                "email" => $request->email,
                "password" =>$request->password,
                "name" => $accounts->name,
            ],
            "token" => $token,
            ],201);
            }
        }
     }

     public function Register(Request $request) {
         $account = new Account;
         $account->email = $request->email;
         $account->password = Hash::make($request->password,[
            'rounds' => 12,
        ]);
         $account->name = $request->name;
         $account->friends = [];
         $account->friends_pendding = [];
         $account->info = [];
         $account->location = [];
         $account->friends_request = [];
         $account->rooms = [];
         $check = Account::where('email',$request->email)->first();
         if($check){
             return response()->json(["message"=>"email has been existed","status"=>"200","success"=>"false"],201);
         } else {
             $account->save();
             return response()->json(["message"=>"account created successfully","status"=>"200","success"=>"true"],201);
         }
     }

     public function Test(Request $request) {
        $user = new User;
        $user->save();
     }

     public function Logout(Request $request) {
        try {
            JWTAuth::setToken($request->token)->invalidate();
            return response()->json([
                "success" => true,
                "message" => "logout succesfully",
                "info" => JWTAuth::setToken($request->token)
            ],201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e
            ],401);
        }   
     }

     public function definedLocation(Request $request) {
        try {
            $account = Account::where('email',$request->email)->get();          
            if(!in_array($request->location,$account[0]->location)) {
                $account = Account::where('email',$request->email)->push('location',$request->location);
            }
            return response()->json([
                "success" => true,
                "message" => "location succesfully",
                "info" => $account
            ],201);
        } catch (Exception $e) {
            return $account;
        }
     }
 }