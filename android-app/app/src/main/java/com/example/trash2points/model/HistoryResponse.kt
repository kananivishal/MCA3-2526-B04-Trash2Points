package com.example.trash2points.model

import com.google.gson.annotations.SerializedName

data class HistoryResponse(
    @SerializedName("success" ) var success : Boolean?           = null,
    @SerializedName("count"   ) var count   : Int?               = null,
    @SerializedName("reports" ) var reports : ArrayList<Reports> = arrayListOf()
)



data class Reports (

    @SerializedName("location"    ) var location    : Location? = Location(),
    @SerializedName("_id"         ) var Id          : String?   = null,
    @SerializedName("userId"      ) var userId      : String?   = null,
    @SerializedName("image"       ) var image       : String?   = null,
    @SerializedName("description" ) var description : String?   = null,
    @SerializedName("status"      ) var status      : String?   = null,
    @SerializedName("createdAt"   ) var createdAt   : String?   = null,
    @SerializedName("updatedAt"   ) var updatedAt   : String?   = null,
    @SerializedName("__v"         ) var _v          : Int?      = null

)