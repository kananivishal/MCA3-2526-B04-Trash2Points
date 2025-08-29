package com.example.trash2points

import android.app.Application

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        SharedPrefManager.init(this)
    }
}
