<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);

/**
 * File.
 */
final class File
{
    /** @var string */
    private const INPUT = "relatorioItem.csv";

    /** @var string */
    private const OUTPUT = "relatorioItem.json";

    /** @var int */
    private const SIZE = 62;

    /** @var string */
    private const DELIMITER = ";";

    /**
     * Data.
     * 
     * @param void
     * 
     * @return array
     */
    private function data(): array
    {
        $data = explode(self::DELIMITER, file_get_contents(static::INPUT));

        return array_chunk(array_map(fn (string $str) => $this->format($str), $data), static::SIZE);
    }

    /**
     * Format.
     * 
     * @param string $str
     * 
     * @return string
     */
    private function format(string $str): string
    {
        return str_replace(chr(34), "", trim(preg_replace('/\t+/', '', $str)));
    }

    /**
     * JSON.
     * 
     * @param void
     * 
     * @return void
     */
    public function JSON(): void
    {
        $data = $this->SQLFormat($this->data());

        file_put_contents(static::OUTPUT, json_encode($data));
    }

    /**
     * SQLFormat.
     * 
     * @param array $arr
     * 
     * @return array
     */
    private function SQLFormat(array $arr): array
    {
        $data = [];

        for ($i = 0; $i < count($arr); $i++) {
            foreach ($arr[$i] as $key => $array) {
                $data[$i][$arr[0][$key]] = $arr[$i][$key];
            }
        }

        return $data;
    }
}


(new File())->JSON();
