<?php
 namespace app\Http\Controllers;

use App\Http\Controllers\Controller;

 class AuthController extends Controller 
 {
     public function __construct()
     {
         $this->middleware('auth');
     }
     
 }