package com.example.trash2points.model

import com.google.gson.annotations.SerializedName

data class SingleReportResponse(
    @SerializedName("success" ) var success : Boolean? = null,
    @SerializedName("report"  ) var report  : Report?  = Report()
)
