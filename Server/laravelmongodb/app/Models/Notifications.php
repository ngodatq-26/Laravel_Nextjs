<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Notifications extends Model
{
    use HasFactory;
    protected $connection ="mongodb";
    protected $collection = "notifications";
    
    protected $dates = ['created_at','updated_at'];
}
