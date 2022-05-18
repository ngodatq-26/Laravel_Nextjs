<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Comments extends Model
{
    protected $connection ="mongodb";
    protected $collection = "comments";
    protected $fillable = [
        'text'
    ];

    protected $dates = ['created_at','updated_at'];

}
