package com.example.trash2points.model

import com.google.gson.annotations.SerializedName
import kotlin.math.min

data class RegisterRequest(
    val name : String ? = null,
    val email : String ? = null,
    val address : String ? = null,
    val phoneno : String ? = null,
    val password : String ? = null,
    val role : String ? = null
)

data class RegisterResponse(
    @SerializedName("success" ) var success : Boolean? = null,
    @SerializedName("message" ) var message : String?  = null,
    @SerializedName("token"   ) var token   : String?  = null,
    @SerializedName("user"    ) var user    : User?    = User()
)


