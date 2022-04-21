<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;

 class AuthController extends Controller 
 {

     public function Login(Request $request) {
        $accounts = Account::where('email',$request->email)->first();
        if(!$accounts) {

           return response()->json(["message" => 'Email không tồn tại !!',"status"=>"200","success"=>"false"],201);
        } 
        if($accounts){
            $Password = Account::where('password',$request->password)->first();
            if (!$Password) {
               return response()->json(["message" => 'Password is incorrect !!',"status"=>"200","success"=>"false"],201);
            } else {
               return response()->json(["message" => 'OK!!',"status"=>"200","success"=>"true",
            "data"=>[
                "email" => $request->email,
                "password" =>$request->password,
                "name" => $Password->name
            ]
            ],201);
            }
        }
     }

     public function Register(Request $request) {
         $account = new Account;
         $account->email = $request->email;
         $account->password = $request->password;
         $account->name = $request->name;

         $check = Account::where('email',$request->email)->first();
         if($check){
             return response()->json(["message"=>"email has been existed","status"=>"200","success"=>"false"],201);
         } else {
             $account->save();
             return response()->json(["message"=>"account created successfully","status"=>"200","success"=>"false"],201);
         }
     }
     
 }