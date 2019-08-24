<?php
/**
 *
 * 版权所有：恰维网络<qwadmin.qiawei.com>
 * 作    者：寒川<hanchuan@qiawei.com>
 * 日    期：2016-09-20
 * 版    本：1.0.0
 * 功能说明：后台首页控制器。
 *
 **/

namespace Home\Controller;

class BjscController extends ComController
{
    public function index()
    {

        $model = new \Think\Model();

        $this->display();
    }
}