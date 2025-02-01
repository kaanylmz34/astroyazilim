<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'amount',
        'payment_method',
        'payment_status',
        'payment_date',
        'user_note'
    ];

    protected $casts = [
        'payment_date' => 'datetime',
        'amount' => 'decimal:2'
    ];

    // Şifrelenmiş alanları belirtiyoruz
    protected $encryptable = [
        'user_note',
        'payment_method'
    ];

    // Veriyi kaydederken şifreleme
    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->encryptable) && !empty($value)) {
            $value = Crypt::encryptString($value);
        }

        return parent::setAttribute($key, $value);
    }

    // Veriyi okurken şifre çözme
    public function getAttribute($key)
    {
        $value = parent::getAttribute($key);

        if (in_array($key, $this->encryptable) && !empty($value)) {
            try {
                return Crypt::decryptString($value);
            } catch (\Exception $e) {
                return $value;
            }
        }

        return $value;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 