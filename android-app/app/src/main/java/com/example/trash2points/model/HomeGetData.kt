package com.example.trash2points.model

import com.google.gson.annotations.SerializedName

data class HomeGetData(
    @SerializedName("success"       ) var success       : Boolean?                 = null,
    @SerializedName("message"       ) var message       : String?                  = null,
    @SerializedName("statusCounts"  ) var statusCounts  : StatusCounts?            = StatusCounts(),
    @SerializedName("letestRepoert" ) var letestRepoert : ArrayList<LatestReport> = arrayListOf()
)

data class StatusCounts (

    @SerializedName("pending"  ) var pending  : Int? = null,
    @SerializedName("cleaned"  ) var cleaned  : Int? = null,
    @SerializedName("rejected" ) var rejected : Int? = null

)

data class LocationReport (

    @SerializedName("latitude"  ) var latitude  : String? = null,
    @SerializedName("longitude" ) var longitude : String? = null,
    @SerializedName("address"   ) var address   : String? = null

)

data class LatestReport (

    @SerializedName("location"    ) var location    : LocationReport? = LocationReport(),
    @SerializedName("_id"         ) var Id          : String?   = null,
    @SerializedName("userId"      ) var userId      : String?   = null,
    @SerializedName("image"       ) var image       : String?   = null,
    @SerializedName("description" ) var description : String?   = null,
    @SerializedName("status"      ) var status      : String?   = null,
    @SerializedName("createdAt"   ) var createdAt   : String?   = null,
    @SerializedName("updatedAt"   ) var updatedAt   : String?   = null,
    @SerializedName("__v"         ) var _v          : Int?      = null

)