<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function addOrUpdate(Request $request)
    {
        //Create new product as admin
    }

    public function update(Request $request)
    {
        //Update existing product as admin (used for updating stock + when order is created)
        //notify listing page listener that product was updated
    }

    public function all()
    {
        //Get all products
    }
}
