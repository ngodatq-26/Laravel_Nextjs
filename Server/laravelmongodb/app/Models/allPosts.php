<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class allPosts extends Model
{
    protected $connection ="mongodb";
    protected $collection = "all_posts";
    protected $fillable = [
        'post_title',
        'status',
        'react',
        'comment',
    ];
}
