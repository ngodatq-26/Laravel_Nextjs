<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('name');
            $table->string('password');
            $table->timestamps();
            $table->string('api_token',80)->after('password')->unique()
            ->nullable()
            ->default(null);
            $table->array('info');
            $table->array('friends');//friends of mine
            $table->array('friends_request'); //friends request to me
            $table->array('friends_pendding');//request add new friend and pendding
            $table->array('rooms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accounts');
    }
};
