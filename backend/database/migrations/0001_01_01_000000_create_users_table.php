<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('mobile')->nullable();
            $table->string('password');
            $table->string('mobile');
            $table->tinyInteger('role')->default(0);
            $table->integer('total_orders')->default(0);
            $table->integer('total_money_spent')->default(0);
            $table->timestamps();
        });

    }


    public function down(): void
    {
        Schema::dropIfExists('users');

    }
};
