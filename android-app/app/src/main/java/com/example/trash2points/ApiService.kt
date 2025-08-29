package com.example.trash2points

import com.example.trash2points.model.AddReportRequest
import com.example.trash2points.model.AddReportResponse
import com.example.trash2points.model.EditReportRequest
import com.example.trash2points.model.EditReportResponse
import com.example.trash2points.model.HistoryResponse
import com.example.trash2points.model.HomeGetData
import com.example.trash2points.model.LoginRequest
import com.example.trash2points.model.LoginResponse
import com.example.trash2points.model.RegisterRequest
import com.example.trash2points.model.RegisterResponse
import com.example.trash2points.model.SingleReportResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path

interface ApiService {

    @POST("auth/register")
    fun register(@Body postRequest : RegisterRequest) : Call<RegisterResponse>

    @POST("auth/login")
    fun login(@Body postRequest: LoginRequest) : Call<LoginResponse>

    @POST("report/addreport")
    fun addReport(@Body postRequest : AddReportRequest , @Header("token") token: String) : Call<AddReportResponse>

    @PATCH("profile/editProfile")
    fun editProfile(
        @Body postRequest: EditReportRequest,
        @Header("token") token: String
    ): Call<EditReportResponse>

    @GET("home")
    fun getHomeData(
        @Header("token") token: String
    ):Call<HomeGetData>

    @GET("report/reports")
    fun getHistoryData(@Header("token") token: String):Call<HistoryResponse>

    @GET("report/report/{reportId}")
    fun getSingleReport(
        @Header("token") token: String,
        @Path("reportId") reportId: String
    ): Call<SingleReportResponse>

}