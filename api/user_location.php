<?php
import("api/api");


class User_location extends Api
{


    public $table="user_location";
    public $location='';


    public function text($p,&$msg){
        $user_id= (int) @$p["user_id"];
        $site=@$p["site"];
        $phone=(int)@$p["phone"] ;
        $username=@$p["username"];
        unset($p["user_id"]);
        unset($p["phone"]);
        unset($p["username"]);
        unset($p["site"]);

        foreach ($p as $key=>$val){
            $val=(int) $val;
//            dd($this->find_location_title($val));
            $this->location.=$this->find_location_title($val)[0]["name"].",";
        }
        $this->location.=$site;
        $row=["user_id"=>$user_id,"location"=>$this->location,"phone"=>$phone,"username"=>$username];
        $this->table="user_location";
        $this->safe_fill($row);
        return $this->save($msg);
    }

    public function find_location_title($id){
        $this->table="location";
        return $this
            ->where("id",$id)
            ->get();
    }


    public function read_user_location($p){
        $id=@$p["user_id"];
        return $this->where("user_id",$id)
            ->get();
    }

}