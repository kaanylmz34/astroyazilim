<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;

class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'payment_id',
        'first_name',
        'last_name',
        'identification_number', // TC no/vergi no
        'company_name',
        'address',
        'invoice_date'
    ];

    protected $casts = [
        'invoice_date' => 'datetime',
    ];

    // Şifrelenmiş alanları belirtiyoruz
    protected $encryptable = [
        'first_name',
        'last_name',
        'identification_number',
        'company_name',
        'address'
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

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
} 