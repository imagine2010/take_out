<?php
import("api/api");

class Order extends APi
{
    public $table = "`order`";


    public function add_order($p, &$msg)
    {
        $order_number = $this->generate_order_num();
        $mun = @$p['order_mun'];
        $pro = @$p['order_product'];
        if(!$mun || !$pro)
            return false;
        $user_id = his('id');
        $mun["order_number"] = $order_number;
        $snapshot = json_encode($mun, JSON_UNESCAPED_UNICODE);
        $product = json_encode($pro, JSON_UNESCAPED_UNICODE);


        $row = [
            "user_id" => $user_id,
            "order_num" => $order_number,
            "product" => $product,
            "snapshot" => $snapshot,
        ];
        $this->safe_fill($row);
        return $this->save($msg);
    }


    public function generate_order_num()
    {
        //找到最后一个写入数据库的id号,
        $max = $this
            ->order_by("id")
            ->limit(1)
            ->get();
        //id号强制转换成数字类型

        $last_id = (int)@$max[0]['id'];
        //返回一个值,当前的时间戳,加随机数,加他自身的Id
        //生成订单号
        return time() . rand(100, 999999) . ($last_id + 1);
    }


    public function render_data($p, &$msg)
    {
            if($id = (int)@$p["id"]){
            return $this->where("user_id", $id)
                ->order_by("id")
                ->limit(10)
                ->get();
        }
        else if ($order_num=@$p["order_num"]){
            return $this->where("order_num", $order_num)
                ->get();
        }

    }

    public function render_data_comment($p,&$msg){
        if($id = (int)@$p["id"]){
            $r = $this->pdo->prepare("select * from `order` where user_id = $id and comment=0 and `condition`='订单完成'");
            $r->execute();
            $s = $r->fetchAll(PDO::FETCH_ASSOC);
            return $s;
        }
    }





}