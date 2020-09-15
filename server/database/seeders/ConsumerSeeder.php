<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ConsumerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . 'Consumer.JSON');

        $o = json_decode($data);

        $fields = array_keys((array)$o[array_key_first($o)]);

        foreach ($o as $t) {
            $i = [
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ];

            foreach ($fields as $field) {
                $i[strtolower($field)] = strtoupper(substr($t->{$field}, 0, 64));
            }

            DB::table('consumers')->insert($i);
        }
    }
}
