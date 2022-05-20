<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Rooms extends Model
{
    use HasFactory;
    protected $connection ="mongodb";
    protected $collection = "rooms";
    protected $fillable = [
        'name'
    ];

    protected $dates = ['created_at','updated_at'];
}
