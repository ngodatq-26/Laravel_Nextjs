<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
 class AuthController extends Controller 
 {

     public function Login(Request $request) {
        $accounts = Account::where('email',$request->email)->first();
        if(!$accounts) {

           return response()->json(["message" => 'Email không tồn tại !!',"status"=>"200","success"=>"false"],201);
        } 
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
            "token" => $accounts->api_token,
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
         $account->api_token = Str::random(60);
         $check = Account::where('email',$request->email)->first();
         if($check){
             return response()->json(["message"=>"email has been existed","status"=>"200","success"=>"false"],201);
         } else {
             $account->save();
             return response()->json(["message"=>"account created successfully","status"=>"200","success"=>"true"],201);
         }
     }
     
 }