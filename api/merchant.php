<?php
import("api/api");


class Merchant extends Api
{

    public $table = "`order`";



    //查找用户刚提交的订单
    public function read_submit($param, &$msg)
    {
        $state=@$param['state'];
        return $this->where("`condition`",$state)
            ->limit(10000)
            ->get();
    }






    //$p里面必须有两个参数,一个是id索引,一个是订单的状态
    public function chant_accept($p,&$msg){
        $state=@$p["state"];
        $id=@$p["id"];
        if ($this->where("id",$id)
            ->update(["`condition`"=>$state])){
            return $this->where("id",$id)
                ->get();
        }
    }




    public function money(){
       $r= $this->pdo->prepare("select * from `order` where to_days(created_at) = to_days(now()) and `condition` = '订单完成'");
       $r->execute();
       $s=$r->fetchAll(PDO::FETCH_ASSOC);
       return $s;
    }









    public function find_price($product_id)
    {
        $this->table = "product";
        return $this->select(["price","title"])->
        where("id", $product_id)
            ->get();
    }

}