<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use carbon\Carbon;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hourly_orders', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_time')->unique();
            $table->integer('order_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hourly_orders');
    }
};
