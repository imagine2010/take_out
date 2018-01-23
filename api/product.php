<?php
import("api/api");

class Product extends Api
{
    public $table = "product";

    public function read_cat($param = [], &$msg)
    {
        $id = @$param["id"];
        return $this
            ->where("cat_id", $id)
            ->get();
    }

    public function cat_null()
    {
        $r = $this->pdo->prepare("select * from product where cat_id is null");
        $r->execute();
        $s = $r->fetchAll(PDO::FETCH_ASSOC);
        return $s;
    }

    public function add($p, &$msg)
    {
        $this->safe_fill($p);
        if ($id = $this->save()) {
            if (move_uploaded("cover", $upload)) {
//                dd($upload);
//                $this->init_sql();
                return $this
                    ->where('id', $id)
                    ->update(['cover' => $upload['new_name']]);
            }
//
        }

    }


}