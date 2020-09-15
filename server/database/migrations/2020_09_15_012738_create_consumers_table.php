<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsumersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consumers', function (Blueprint $table) {
            $table->id();

            $data = file_get_contents(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'seeders' . DIRECTORY_SEPARATOR . 'Consumer.JSON');

            $o = json_decode($data);

            $fields = array_keys((array)$o[array_key_first($o)]);

            foreach ($fields as $field) {
                $table->string(strtolower($field), 64)->nullable(false);
            }

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consumers');
    }
}
