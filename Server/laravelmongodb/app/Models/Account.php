<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
class Account extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'account';
    protected $fillable = [
        'email',
        'name',
        'password'
    ];

    protected $hidden =[
        'password',
    ];
    
    protected $dates = ['created_at','updated_at'];

    public function account(){
        
    }

    public function posts() {
        $this->hasMany(AllPosts ::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }
}
