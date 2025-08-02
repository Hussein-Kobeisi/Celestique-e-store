<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;


class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user->role !== 1) { 
            return response()->json([
                'message' => 'Forbidden – Admins only.'
            ], 403);
        }

        return $next($request);
    }
}