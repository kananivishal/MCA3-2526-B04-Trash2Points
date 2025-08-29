package com.example.trash2points

import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part
import retrofit2.http.Url

interface CloudinaryApiService {
    @Multipart
    @POST
    fun uploadImageToCloudinary(
        @Url url: String,
        @Part image: MultipartBody.Part,
        @Part("upload_preset") uploadPreset: RequestBody
    ): Call<CloudinaryResponse>
}

data class CloudinaryResponse(
    val secure_url: String
)