<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;


Route::get('/send-real-email', function () {
    $details = [
        'title' => 'Hello from Brevo',
        'body' => 'This is a real email sent using Brevo SMTP in Laravel 12.'
    ];

    Mail::to('realuser@example.com')->send(new DemoMail($details));

    return 'Email sent!';
});


?>