<?php
import("api/api");


class Location extends Api
{
    public $table="location";



    public function read_type($param,&$msg){
        return $this
            ->get();
    }


}