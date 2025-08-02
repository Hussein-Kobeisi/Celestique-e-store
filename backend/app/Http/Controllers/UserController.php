<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Services\UserService;

class UserController extends Controller
{
    public function update(Request $request)
    {
        $user = UserService::getUser();
        if(!$user)
            return $this->responseJSON(null, "Unauthorized", 401);

        $user = UserService::fillUser($user, $request);
        UserService::saveUser($user);

        return $this->responseJSON($user, "User updated successfully");
        
    }

    public function delete()
    {
        $user = UserService::getUser();
        UserService::deleteUser($user);
        return $this->responseJSON(null, "User deleted successfully");
    }
}
