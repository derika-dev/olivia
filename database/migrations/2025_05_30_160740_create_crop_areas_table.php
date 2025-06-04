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
        Schema::create('crop_areas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('crop_id')
                ->constrained('crops')
                ->onDelete('cascade');
            $table->foreignId('province_id')
                ->constrained('provinces')
                ->onDelete('cascade');
            $table->decimal('area', 10, 2)->nullable();
            $table->decimal('year', 4, 0)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crop_areas');
    }
};
