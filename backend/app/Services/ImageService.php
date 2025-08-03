<?php
namespace App\Services;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
class ImageService
{
    static function saveBase64File($base64String, $folder)
    {
        if (!$base64String) return null;

        try {
            $data = explode(',', $base64String);
            $decoded = base64_decode(end($data));
            $extension = self::getBase64Extension($base64String);
            $filename = Str::uuid() . '.' . $extension;
            $path = "$folder/$filename";

            Storage::disk('public')->put($path, $decoded);

            return "storage/$path";
        } catch (\Exception $e) {
            return null;
        }
    }

    static function getBase64Extension($base64)
    {
        preg_match("/data:image\/(.*?);base64/", $base64, $imgMatch);
        if (isset($imgMatch[1])) return $imgMatch[1];
        return 'bin';
    }
}