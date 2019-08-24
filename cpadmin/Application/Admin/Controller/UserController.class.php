<?php
/**
*
* 版权所有：恰维网络<qwadmin.qiawei.com>
* 作    者：寒川<hanchuan@qiawei.com>
* 日    期：2016-01-20
* 版    本：1.0.0
* 功能说明：用户控制器。
*
**/

namespace Admin\Controller;

class UserController extends ComController
{
    public function index()
    {
        session_start();
        $uid=    session('uid');        
        $prefix = C('DB_PREFIX');   
        $member = M('member');
        $manager = $member->field("{$prefix}member.*")->where("{$prefix}member.uid=$uid")->find();        
        $agent=$manager['user'];
       // die($agent);
        $p = isset($_GET['p']) ? intval($_GET['p']) : '1';
        $field = isset($_GET['field']) ? $_GET['field'] : '';
        $keyword = isset($_GET['keyword']) ? htmlentities($_GET['keyword']) : '';
        $order = isset($_GET['order']) ? $_GET['order'] : 'DESC';
        if ($uid==1){
            $where='';
        }  else{
            $where = "{$prefix}user.agent='$agent'";
        }
        if ($order == 'asc') {
            $order = "{$prefix}user.lastLoginTime asc";
        } elseif (($order == 'desc')) {
            $order = "{$prefix}user.lastLoginTime desc";
        } else {
            $order = "{$prefix}user.uid asc";
        }

        if ($keyword <> '') {
            if ($uid!=1){

                $where= "{$prefix}user.agent='$agent' and ";    
            }

            if ($field == 'username') {
                $where = $where." {$prefix}user.username LIKE '%$keyword%'";
            }
            if ($field == 'phone') {
                $where =$where. "{$prefix}user.phone LIKE '%$keyword%'";
            }
            if ($field == 'qq') {
                $where = $where."{$prefix}user.qq LIKE '%$keyword%'";
            }
            if ($field == 'email') {
                $where =$where. "{$prefix}user.email LIKE '%$keyword%'";
            }

        }


        $user = M('user');
        $pagesize = 10;#每页数量
        $offset = $pagesize * ($p - 1);//计算记录偏移量
        $count = $user->field("{$prefix}user.*")
        ->order($order)
        //   ->join("{$prefix}auth_group_access ON {$prefix}user.uid = {$prefix}auth_group_access.uid")
        //   ->join("{$prefix}auth_group ON {$prefix}auth_group.id = {$prefix}auth_group_access.group_id")
        ->where($where)
        ->count();

        $list = $user->field("{$prefix}user.*")
        ->order($order)
        //  ->join("{$prefix}auth_group_access ON {$prefix}user.uid = {$prefix}auth_group_access.uid")
        //  ->join("{$prefix}auth_group ON {$prefix}auth_group.id = {$prefix}auth_group_access.group_id")
        ->where($where)
        ->limit($offset . ',' . $pagesize)
        ->select();
        //$user->getLastSql();
        $page = new \Think\Page($count, $pagesize);
        $page = $page->show();
        $this->assign('list', $list);
        $this->assign('page', $page);
        $this->display();
    }

    public function del()
    {

        $uids = isset($_REQUEST['uids']) ? $_REQUEST['uids'] : false;
        //uid为1的禁止删除
        if ($uids == 1 or !$uids) {
            $this->error('1参数错误！');
        }
        if (is_array($uids)) {
            foreach ($uids as $k => $v) {
                if ($v == 1) {//uid为1的禁止删除
                    unset($uids[$k]);
                }
                $uids[$k] = intval($v);
            }
            if (!$uids) {
                $this->error('2参数错误！');
                $uids = implode(',', $uids);
            }
        }

        $map['uid'] = array('in', $uids);
        //  var_dump($map['uid']);
        //  die ();
        if (M('user')->where($map)->delete()) {

            $this->success('恭喜，用户删除成功！');
        } else {
            $this->error('3参数错误！');
        }
    }

    public function edit()
    {

        $uid = isset($_GET['uid']) ? intval($_GET['uid']) : false;
        if ($uid) {
            //$member = M('member')->where("uid='$uid'")->find();
            $prefix = C('DB_PREFIX');
            $user = M('user');
            $user = $user->field("{$prefix}user.*")->where("{$prefix}user.uid=$uid")->find();

        } else {
            $this->error('参数错误！');
        }
        $this->assign('user', $user);
        $this->display('form');
    }

    public function update($ajax = '')
    {
        $botactive = isset($_POST['dan']) ? $_POST['dan'] : '';
        $botonline = isset($_POST['botonline']) ? $_POST['botonline'] : 1;
        $uid = isset($_POST['uid']) ? intval($_POST['uid']) : false;
        $user = isset($_POST['username']) ? htmlspecialchars($_POST['username'], ENT_QUOTES) : '';
        $password = isset($_POST['password']) ? trim($_POST['password']) : false;
        if ($password) {
            $data['password'] =password($password);
        }
        $botpwd= isset($_POST['botpwd']) ? trim($_POST['botpwd']) : false;
        if ($botpwd) {
            $data['botpwd'] = password($botpwd);
        }
        $head = I('post.headPhoto', '', 'strip_tags');
        $data['sex'] = isset($_POST['sex']) ? intval($_POST['sex']) : 0;
        $data['headPhoto'] = $head ? $head : '';
        $data['birthday'] = isset($_POST['birthday']) ? strtotime($_POST['birthday']) : 0;
        $data['phone'] = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $data['qq'] = isset($_POST['qq']) ? trim($_POST['qq']) : '';
        $data['email'] = isset($_POST['email']) ? trim($_POST['email']) : '';
        $data['botactive']=$botactive;
        $data['botonline']=$botonline;
        $data['totalMoney']=isset($_POST['totalmoney']) ? trim($_POST['totalmoney']) : false;
        $data['freezeMoney']=isset($_POST['freezemoney']) ? trim($_POST['freezemoney']) : false;
        $data['agent']=isset($_POST['agent']) ? trim($_POST['agent']) : false;
        $data['lastLoginTime'] = time();
        $data['percentage'] =   isset($_POST['percentage']) ? trim($_POST['percentage']) : 50;
        if (!$uid) {
            if ($user == '') {
                $this->error('用户名称不能为空！');
            }
            if (!$password) {
                $this->error('用户密码不能为空！');
            }
            if (M('user')->where("user='$user'")->count()) {
                $this->error('用户名已被占用！');
            }
            $data['user'] = $user;
            $uid = M('user')->data($data)->add();
        } else {
            M('user')->data($data)->where("uid=$uid")->save();

        }
        $this->success('操作成功！');
    }
    public function qrcode()
    {

        $this->display('qrcode');
    }
    public function qrcodesave()
    {
        $servername=$_SERVER['HTTP_HOST'];
        $uid = isset($_POST['uid']) ? intval($_POST['uid']) : false;
        $user = isset($_POST['username']) ? htmlspecialchars($_POST['username'], ENT_QUOTES) : '';      
        // $qrcodepic = $servername.I('post.qrcodepic', '', 'strip_tags');
        $qrcodepic = 'http://'.$servername.I('post.qrcodepic', '', 'strip_tags');
        $data['qrcodepic'] = $qrcodepic ? $qrcodepic : '';

        $uid = M('payment')->data($data)->where("id=1")->save();

        $this->success('操作成功！');
    }
    public function add()
    {
        $this->display('form');
    }
    public function withdraw()
    {
        session_start();
        $uid=    session('uid');        
        $prefix = C('DB_PREFIX');   
        $p = isset($_GET['p']) ? intval($_GET['p']) : '1';
        $field = isset($_GET['field']) ? $_GET['field'] : '';
        $keyword = isset($_GET['keyword']) ? htmlentities($_GET['keyword']) : '';
        $order = isset($_GET['order']) ? $_GET['order'] : 'DESC';
        $where = 'type=10 ';
     
        if ($order == 'asc') {
            $order = "{$prefix}moneydetails.Id asc";
        } elseif (($order == 'desc')) {
            $order = "{$prefix}moneydetails.Id desc";
        } else {
            $order = "{$prefix}moneydetails.Id asc";
        }
      
        if ($keyword <> '') {
           

            if ($field == 'username') {
                $where = $where." {$prefix}moneydetails.username LIKE '%$keyword%'";
            }
            if ($field == 'phone') {
                $where =$where. "{$prefix}moneydetails.phone LIKE '%$keyword%'";
            }
            if ($field == 'qq') {
                $where = $where."{$prefix}moneydetails.qq LIKE '%$keyword%'";
            }
            if ($field == 'email') {
                $where =$where. "{$prefix}moneydetails.email LIKE '%$keyword%'";
            }

        }


        $user = M('moneydetails');
        $pagesize = 10;#每页数量
        $offset = $pagesize * ($p - 1);//计算记录偏移量
        $count = $user->field("{$prefix}moneydetails.*")
        ->order($order)
        ->where($where)
        ->count();

        $list = $user->field("{$prefix}moneydetails.*")
        ->order($order)
        ->where($where)
        ->limit($offset . ',' . $pagesize)
        ->select();

        $page = new \Think\Page($count, $pagesize);
        $page = $page->show();
        $this->assign('list', $list);
        $this->assign('page', $page);
        $this->display();
    }
    public function withdrawdel()
    {

        $id = isset($_REQUEST['uids']) ? $_REQUEST['uids'] : false;
        //uid为1的禁止删除
        if ($id == 1 or !$id) {
            $this->error('1参数错误！');
        }
        if (is_array($id)) {
            foreach ($id as $k => $v) {
                if ($v == 1) {//uid为1的禁止删除
                    unset($id[$k]);
                }
                $id[$k] = intval($v);
            }
            if (!$id) {
                $this->error('2参数错误！');
                $id = implode(',', $id);
            }
        }

        $map['Id'] = array('in', $id);
        // var_dump($map['id']);
        //  die ();
        if (M('moneydetails')->where($map)->delete()) {

            $this->success('恭喜，订单删除成功！');
        } else {
            $this->error('3参数错误！');
        }
    }
    public function withdrawedit()
    {

        $id = isset($_GET['id']) ? intval($_GET['id']) : false;
        if ($id) {
            //$member = M('member')->where("uid='$uid'")->find();
            $prefix = C('DB_PREFIX');
            $moneydetails = M('moneydetails');
            $moneydetails = $moneydetails->field("{$prefix}moneydetails.*")->where("{$prefix}moneydetails.id=$id")->find();

        } else {
            $this->error('参数错误！');
        }
        $this->assign('moneydetails', $moneydetails);
        $this->display('withdrawedit');
    }

    public function withdrawsave($ajax = '')
    {
        $botactive = isset($_POST['dan']) ? $_POST['dan'] : '';
        //   $this->error('参误请选择用户组！'.$field);

        $uid = isset($_POST['uid']) ? intval($_POST['uid']) : false;
        $user = isset($_POST['username']) ? htmlspecialchars($_POST['username'], ENT_QUOTES) : '';

        $password = isset($_POST['password']) ? trim($_POST['password']) : false;
        if ($password) {
            $data['password'] = password($password);
        }
        $head = I('post.headPhoto', '', 'strip_tags');
        $data['sex'] = isset($_POST['sex']) ? intval($_POST['sex']) : 0;
        $data['headPhoto'] = $head ? $head : '';
        $data['birthday'] = isset($_POST['birthday']) ? strtotime($_POST['birthday']) : 0;
        $data['phone'] = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $data['qq'] = isset($_POST['qq']) ? trim($_POST['qq']) : '';
        $data['email'] = isset($_POST['email']) ? trim($_POST['email']) : '';
        $data['botactive']=$botactive;

        $data['lastLoginTime'] = time();
        if (!$uid) {
            if ($user == '') {
                $this->error('用户名称不能为空！');
            }
            if (!$password) {
                $this->error('用户密码不能为空！');
            }
            if (M('user')->where("user='$user'")->count()) {
                $this->error('用户名已被占用！');
            }
            $data['user'] = $user;
            $uid = M('user')->data($data)->add();
        } else {
            M('user')->data($data)->where("uid=$uid")->save();

        }
        $this->success('操作成功！');
    }

    public function deposit()
    {
        session_start();
        $uid=    session('uid');        
        $prefix = C('DB_PREFIX');   
        $p = isset($_GET['p']) ? intval($_GET['p']) : '1';
        $field = isset($_GET['field']) ? $_GET['field'] : '';
        $keyword = isset($_GET['keyword']) ? htmlentities($_GET['keyword']) : '';
        $order = isset($_GET['order']) ? $_GET['order'] : 'DESC';
 
        $where = 'type=10 ';
        if ($order == 'asc') {
            $order = "{$prefix}moneydetails.Id asc";
        } elseif (($order == 'desc')) {
            $order = "{$prefix}moneydetails.Id desc";
        } else {
            $order = "{$prefix}moneydetails.Id asc";
        }
       
           if ($keyword <> '') {
           

            if ($field == 'username') {
                $where = $where." and {$prefix}moneydetails.username LIKE '%$keyword%'";
            }
            if ($field == 'phone') {
                $where =$where. "and  {$prefix}moneydetails.phone LIKE '%$keyword%'";
            }
            if ($field == 'qq') {
                $where = $where."and {$prefix}moneydetails.qq LIKE '%$keyword%'";
            }
            if ($field == 'email') {
                $where =$where. "and {$prefix}moneydetails.email LIKE '%$keyword%'";
            }

        }


        $user = M('moneydetails');
        $pagesize = 10;#每页数量
        $offset = $pagesize * ($p - 1);//计算记录偏移量
        $count = $user->field("{$prefix}moneydetails.*")
        ->order($order)
        ->where($where)
        ->count();

        $list = $user->field("{$prefix}moneydetails.*")
        ->order($order)
        ->where($where)
        ->limit($offset . ',' . $pagesize)
        ->select();

        $page = new \Think\Page($count, $pagesize);
        $page = $page->show();
        $this->assign('list', $list);
        $this->assign('page', $page);
        $this->display();
    }
    public function depositdel()
    {


    }
    public function depositedit()
    {

        $id = isset($_GET['id']) ? intval($_GET['id']) : false;
        if ($id) {
            //$member = M('member')->where("uid='$uid'")->find();
            $prefix = C('DB_PREFIX');
            $moneydetails = M('moneydetails');
            $moneydetails = $moneydetails->field("{$prefix}moneydetails.*")->where("{$prefix}moneydetails.id=$id")->find();

        } else {
            $this->error('参数错误！');
        }
        $this->assign('moneydetails', $moneydetails);
        $this->display('depositedit');
    }

    public function depositsave($ajax = '')
    {  
        $username = isset($_POST['username']) ? htmlspecialchars($_POST['username'], ENT_QUOTES) : '';      
        $addmoney = isset($_POST['addmoney']) ? htmlspecialchars($_POST['addmoney'], ENT_QUOTES) : '';      

        // $addmoney= isset($_POST['addmoney']) ? intval($_POST['addmoney']) : 0;

        $prefix = C('DB_PREFIX');
        if (!$addmoney) {
            $this->error($username.'金额不能为空！'.$addmoney);
        } else {
            $where="username='$username'";    
            $user = M('user');
            $userinfo = $user->field("{$prefix}user.*")
            ->where($where)
            // ->limit($offset . ',' . $pagesize)
            ->select();
            $money= intval($userinfo[0]['totalmoney'])+ intval($addmoney);
            //   echo $userinfo['totalMoney']   ;
            //    die($userinfo[0]);
            $data['totalMoney'] =    $money;    
            $user->data($data)->where("username='$username'")->save();
            $moneydetails = M('moneydetails');
            $d['username']= $username;
            $d['type']=14;
            $d['description']="人工存入";
            $d['moneyStr']=$money;
            $datetime=date('Y-m-d H:i:s',time()+3600*24);
            //echo $date->format("Y-m-d H:i:s"),"\n";
            $d['createdTime']=$datetime;
            $moneydetails->data($d)->where("username='$username'")->add();
        }

        $this->success('操作成功！'.$money);
    }
}
