<?php
import("api/api");


class Comment extends Api
{

    public $table = "comment";


//返回一个用户在社区的的所有评论

    public function read_user_id($param, &$msg)
    {
        $id = @$param["user_id"];
        return $this
            ->where("user_id", $id)
            ->get();
    }

    public function add($p, &$msg)
    {
        $order_num=@$p["order_num"];
        $this->safe_fill($p);
        if ($id = $this->save()) {
            move_uploaded("cover",$upload);
           $s= $this
                ->where('id', $id)
                ->update(['cover' => $upload['new_name']]);
        if ($s) {
            $this->init_sql();
            $this->update_order($order_num);
        }
    }
    }


    public function update_order($order_num)
    {
        $this->init_sql();
        $this->table = "`order`";
        $r = $this->pdo->prepare("update  `order` set  comment = 1 where order_num = $order_num");
        $s = $r->execute();
        return $s;
    }
}