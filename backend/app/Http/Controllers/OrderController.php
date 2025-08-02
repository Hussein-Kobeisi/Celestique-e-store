<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function all(Request $request)
    {
        // return all orders
    }

    public function getByUser(Request $request)
    {
        // return orders by user
    }

    public function add(Request $request)
    {
        // create order
        // create order items
        // create notifications that checkout was successful (SMS)
        // update daily revenues
        // update hourly orders
        // add audit log as pending
        // update product stock
        // alert admin listener that new order was created???
    }
    

    public function update(Request $request)
    {
        // update order (used only for status update by admin)
    }
}
