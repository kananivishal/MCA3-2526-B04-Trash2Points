package com.example.trash2points.model

import com.google.gson.annotations.SerializedName

data class LoginRequest(
    val email : String ? = null,
    val password : String ? = null,
    val role : String ? = null
)

data class LoginResponse(
    @SerializedName("success" ) var success : Boolean? = null,
    @SerializedName("message" ) var message : String?  = null,
    @SerializedName("token"   ) var token   : String?  = null,
    @SerializedName("user"    ) var user    : User?    = User()
)

data class User (

    @SerializedName("name"    ) var name    : String? = null,
    @SerializedName("email"   ) var email   : String? = null,
    @SerializedName("phoneno" ) var phoneno : String? = null,
    @SerializedName("address" ) var address : String? = null

)
