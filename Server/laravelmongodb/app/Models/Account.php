<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Account extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'account';
    protected $fillable = [
        'email',
        'name',
        'password'
    ];

    protected $hidden =[
        'password',
        'api_token'
    ];
    
    protected $dates = ['created_at','updated_at'];

    public function account(){
        
    }
}
