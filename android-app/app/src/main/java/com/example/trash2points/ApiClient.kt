package com.example.trash2points

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.scalars.ScalarsConverterFactory
import java.util.concurrent.TimeUnit

object ApiClient
{
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    private val okHttpClient = OkHttpClient.Builder()
        .readTimeout(60, TimeUnit.SECONDS)
        .connectTimeout(60, TimeUnit.SECONDS)
        .addInterceptor(loggingInterceptor)
        .build()

    // Retrofit without Authorization
    private val retrofitWithoutAuth = Retrofit.Builder()
        .client(okHttpClient)
        .baseUrl(Utils.BASE_URL)
        .addConverterFactory(ScalarsConverterFactory.create()) // first for plain text
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val cloudinaryClient by lazy {
        Retrofit.Builder()
            .baseUrl("https://api.cloudinary.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val cloudinaryApi: CloudinaryApiService by lazy {
        cloudinaryClient.create(CloudinaryApiService::class.java)
    }

    val apiServiceWithoutAuth: ApiService by lazy {
        retrofitWithoutAuth.create(ApiService::class.java)
    }
}