<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class React extends Model
{
    use HasFactory;
    protected $connection ="mongodb";
    protected $collection = "reacts";
    
    protected $dates = ['created_at','updated_at'];
}
