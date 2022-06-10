<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class AllPosts extends Model
{
    protected $connection ="mongodb";
    protected $collection = "all_posts";
    protected $fillable = [
        'post_title',
        'status',
        'comment',
    ];

    protected $dates = ['created_at','updated_at'];

    public function account() {
        return $this->belongsTo(Account::class,"id","user_id");
    }
}
