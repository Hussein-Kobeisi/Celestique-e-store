<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function build()
    {
        return $this->subject('Your Order Has Been Confirmed')
                    ->html("
                        <h2>Thank you for your order!</h2>
                        <p><strong>Order ID:</strong> {$this->order->id}</p>
                        <p><strong>Total Amount:</strong> \${$this->order->total_amount}</p>
                        <p><strong>Status:</strong> {$this->order->status}</p>
                        <p>We’ll notify you when your order status changes.</p>
                    ");
    }
}
