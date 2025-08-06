<?php

namespace App\Jobs;

use App\Services\HourlyOrderService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;


class UpdateHourlyOrderAnalytics implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $amount;

    public function __construct(int $amount)
    {
        $this->amount = $amount;
    }

    public function handle()
    {
        HourlyOrderService::addOrUpdateHourlyOrder($this->amount);
    }
}

