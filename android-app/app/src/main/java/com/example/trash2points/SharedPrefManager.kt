package com.example.trash2points

import android.content.Context
import android.content.SharedPreferences

object SharedPrefManager {
    private const val PREF_NAME = "MyAppPrefs"
    private const val KEY_TOKEN = "token"
    private const val KEY_NAME = "name"
    private const val KEY_ADDRESS = "address"
    private const val KEY_EMAIL = "email"
    private const val KEY_PHONE = "phone"

    private lateinit var preferences: SharedPreferences

    fun init(context: Context) {
        preferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    }

    fun saveUserData(token: String, name: String, address: String, email: String, phone: String) {
        preferences.edit().apply {
            putString(KEY_TOKEN, token)
            putString(KEY_NAME, name)
            putString(KEY_ADDRESS, address)
            putString(KEY_EMAIL, email)
            putString(KEY_PHONE, phone)
            apply() // <- THIS LINE WAS MISSING!
        }
    }


    fun getToken(): String? = preferences.getString(KEY_TOKEN, null)
    fun getUserName(): String? = preferences.getString(KEY_NAME, null)
    fun getUserAddress(): String? = preferences.getString(KEY_ADDRESS, null)
    fun getEmail() : String? = preferences.getString(KEY_EMAIL,null)
    fun getPhone() : String ? = preferences.getString(KEY_PHONE , null)

    fun clear() {
        preferences.edit().clear().apply()
    }
}
