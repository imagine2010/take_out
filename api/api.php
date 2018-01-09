<?php
import("model/model");

class Api extends Model
{

    //增加,两个传参,第一个是增加的数据,第二个是返回的信息
    public function add($p, &$msg)
    {
        $this->safe_fill($p);
        return $this->save($msg);
    }

    public function remove($param = [], &$msg)
    {


//        if (!$id = @$param["id"] || !$user_id= (int) @$param["user_id"] ) {
//            $msg = "invalid_id";
//            return false;
//        }

        if ( $user_id=@$param["user_id"]){
            $user_id= (int) $user_id;
             if ($this->find_user_id($user_id))
                return $this->where("user_id", $user_id)
                    ->delete();


            $msg="id_not111_exist";
            return false;
        }


      else if ( $id = @$param["id"])
          if ($this->find($id))
            return $this->where("id", $id)
                ->delete();


        $msg="id_not222_exist";
        return false;
    }

  public  function read($param = [], &$msg)
    {
        !$page = @$param["page"] ?: 1;
        $by=@$param["by"]?:"id";
        $direction=@$param["dire"]?:"desc";
//        dd($direction);
        return $this
            ->order_by($by,$direction)
            ->page($page)
            ->get();
    }


    public function find_id($id){
        $id= @$id["id"];
       $s= $this->find($id);
       return $s;
    }


}
