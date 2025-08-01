<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    static function addOrUpdate(Request $request)
    {
        //Create new product as admin
    }

    static function update(Request $request)
    {
        //Update existing product as admin (used for updating stock + when order is created)
        //notify listing page listener that product was updated
    }

    static function all()
    {
        //Get all products
    }
}
