<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;

class UpdateOrderStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->subject("Your Order is {$this->order->status}")
                    ->html("
                        <h2>Your order status has been updated!</h2>
                        <p><strong>Total Amount:</strong> \${$this->order->total_amount}</p>
                        <p><strong>Status:</strong> {$this->order->status}</p>
                    ");
    }
}
