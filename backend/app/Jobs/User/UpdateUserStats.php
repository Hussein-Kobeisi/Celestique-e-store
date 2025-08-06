<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Services\UserService;

class UpdateUserStats implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public User $user;
    public float $amount;
    public int $itemsCount;

    public function __construct(User $user , float $amount, int $itemsCount)
    {
        $this->user = $user;
        $this->amount = $amount;
        $this->itemsCount = $itemsCount;
    }

    public function handle()
    {
        UserService::addUserItemsPurchased($this->user, $this->itemsCount);
        UserService::addUserTotalSpent($this->user, $this->amount);
    }
}

