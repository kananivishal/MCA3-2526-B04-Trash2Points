package com.example.trash2points.model

import com.google.gson.annotations.SerializedName

data class EditReportRequest(
    var name: String? = null,
    var address: String? = null
)

data class EditReportResponse(
    @SerializedName("success" ) var success : Boolean? = null,
    @SerializedName("message" ) var message : String?  = null,
    @SerializedName("user"    ) var user    : User?    = User()

)
