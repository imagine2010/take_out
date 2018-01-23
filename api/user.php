<?php
import("api/api");

class User extends Api
{

    public $table = "user";

//验证规则
    public $rule = [
        'username' => 'max_length:24|min_length:4|unique:username',
        'password' => 'max_length:64|min_length:6',
    ];


    public function login($p, &$msg)
    {
        if (!($username = @$p["username"]) || !($password = @$p["password"])) {
            $msg = "invalid:username||password";

            return false;
        }

        $user = $this->where(["username" => $username, "password" => $password=$this->has_password($password)])
            ->get();
        if (!$user) {
            $msg = "invalid:username||password";

            return false;
        }
        unset($user["password"]);
        $_SESSION["user"] = $user;
        $msg= $_SESSION["user"];
        return $msg;
    }


    public function logout()
    {

        unset($_SESSION["user"]);
        return true;
    }


    public function signup($p, &$msg)
    {
        if (!($username = @$p["username"]) || !@$password = @$p["password"]) {
            $msg = "invalid:username||password";

            return false;
        }

        return $this->add($p, $msg);
    }


    public function has_password($password)
    {
        return md5(md5($password)."mima");
    }





      public  function  before_save(){
        //$password等于借值过来的&$this->filled['password'],
          //如果不存在这个值,结束函数
          if ( ! $password = &$this->filled['password'])
          return;



          //如果存在,加密函数
          $password=$this->has_password($password);
        }


        public function update_location($p,&$msg){
        dd($p);
        }

}