package com.example.trash2points.model

import com.google.gson.annotations.SerializedName

data class AddReportRequest(
    var image : String,
    var latitude : String,
    var longitude : String,
    var address : String,
    var description : String
)

data class AddReportResponse(
    @SerializedName("success" ) var success : Boolean? = null,
    @SerializedName("message" ) var message : String?  = null,
    @SerializedName("report"  ) var report  : Report?  = Report()
)

data class Location (

    @SerializedName("latitude"  ) var latitude  : String? = null,
    @SerializedName("longitude" ) var longitude : String? = null,
    @SerializedName("address"   ) var address   : String? = null

)

data class Report (

    @SerializedName("userId"      ) var userId      : String?   = null,
    @SerializedName("image"       ) var image       : String?   = null,
    @SerializedName("location"    ) var location    : Location? = Location(),
    @SerializedName("description" ) var description : String?   = null,
    @SerializedName("status"      ) var status      : String?   = null,
    @SerializedName("_id"         ) var Id          : String?   = null,
    @SerializedName("createdAt"   ) var createdAt   : String?   = null,
    @SerializedName("updatedAt"   ) var updatedAt   : String?   = null,
    @SerializedName("__v"         ) var _v          : Int?      = null,
    @SerializedName("verifiedBy") var verifiedBy : String ? = null

)