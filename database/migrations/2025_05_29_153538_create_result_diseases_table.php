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
        Schema::create('result_diseases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('disease_id')
                ->constrained('diseases')
                ->onDelete('cascade');
            $table->string('image_path')->nullable(); // Path ke gambar yang dianalisis
            $table->float('accuracy')->default(0.00); // Akurasi penyakit
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('result_diseases');
    }
};
