package com.example.trash2points

import com.example.trash2points.model.LoginRequest
import com.example.trash2points.model.LoginResponse
import com.example.trash2points.model.RegisterRequest
import com.example.trash2points.model.RegisterResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {

    @POST("auth/register")
    fun register(@Body postRequest : RegisterRequest) : Call<RegisterResponse>

    @POST("auth/login")
    fun login(@Body postRequest: LoginRequest) : Call<LoginResponse>
}