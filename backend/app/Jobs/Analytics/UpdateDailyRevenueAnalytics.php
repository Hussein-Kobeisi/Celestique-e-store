<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\DailyRevenueService;
class UpdateDailyRevenueAnalytics implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public float $amount;

    public function __construct(float $amount)
    {
        $this->amount = $amount;
    }

    public function handle()
    {
        DailyRevenueService::addOrUpdateDailyRevenue($this->amount);
    }
}

