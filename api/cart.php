<?php
import("api/api");


class Cart extends Api
{

    public $table = "cart";

//    public function add_i($p,&$msg){
//        dd($p);
//    }


//返回一个用户在购物车的所有数据

    public function read_user_id($param, &$msg)
    {

//        dd($param);
        $id = @$param["id"];
        $r = $this
            ->where("user_id", $id)
            ->get();


//        $msg[]=$r;
        $s=[];
        $row = [];
        $money=8;
        foreach ($r as $key) {
            $product_id = @$key["product_id"];
            $count = @$key["count"];
            $product = $this->find_price($product_id);//返回每个商品的价格
//            $product=$this->find_product_title($product_id);
//            dd($product);
            $key["price"]=$product[0]["price"];
            $row[$product[0]["title"]] = $count * $product[0]["price"];
            $money+=$product[0]["price"] * $count;
            $s[]=$key;

        }
//        dd($money);
        $msg[]=$s;
        $msg[]=$row;
        $msg[]=$money;
        return $msg;
    }


    public function find_price($product_id)
    {
        $this->table = "product";
        return $this->select(["price","title"])->
        where("id", $product_id)
            ->get();
    }

}