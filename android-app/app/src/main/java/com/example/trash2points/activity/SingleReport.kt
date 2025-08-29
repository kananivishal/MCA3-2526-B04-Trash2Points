package com.example.trash2points.activity

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.bumptech.glide.Glide
import com.example.trash2points.ApiClient
import com.example.trash2points.R
import com.example.trash2points.SharedPrefManager
import com.example.trash2points.databinding.ActivitySingleReportBinding
import com.example.trash2points.model.SingleReportResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import kotlin.math.sin

class SingleReport : AppCompatActivity() {

    val binding by lazy { ActivitySingleReportBinding.inflate(layoutInflater) }
    private lateinit var reportId: String
    private lateinit var singleReport: SingleReportResponse

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        intent?.getStringExtra("reportId").let {
            reportId = it.toString()
        }

        singleReportCall()

//        binding.showMap.setOnClickListener {
//            val latitude = singleReport?.report?.location?.latitude
//            val longitude = singleReport?.report?.location?.longitude
//
//            val intent = Intent(this@SingleReport , Map::class.java)
//            intent.putExtra("latitude", latitude)
//            intent.putExtra("longitude", longitude)
//            startActivity(intent)
//
//        }
        binding.showMap.setOnClickListener {
            val latitude = singleReport?.report?.location?.latitude
            val longitude = singleReport?.report?.location?.longitude
            val status = singleReport?.report?.status

            if (latitude != null && longitude != null) {
                // Determine marker color based on status
                val markerColor = when (status?.lowercase()) {
                    "pending" -> "red"
                    "cleaned" -> "green"
                    "rejected" -> "blue"
                    else -> "blue" // Default color if status is unknown
                }

                // Create geo URI with custom marker color
                val gmmIntentUri = Uri.parse("geo:$latitude,$longitude?q=$latitude,$longitude(Report Location)&z=15&marker=color:$markerColor")
                val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
                mapIntent.setPackage("com.google.android.apps.maps") // Force open in Google Maps app
                startActivity(mapIntent)
            }
        }

        binding.backIc.setOnClickListener {
            onBackPressedDispatcher.onBackPressed()
        }

        setContentView(binding.root)

    }

    private fun singleReportCall() {
        val token = SharedPrefManager.getToken() ?: ""
        binding.lottieAnimation.visibility = View.VISIBLE

        // 2. Make the API call

        ApiClient.apiServiceWithoutAuth
            .getSingleReport(token!!, reportId)
            .enqueue(object : Callback<SingleReportResponse> {
                override fun onResponse(
                    call: Call<SingleReportResponse>,
                    response: Response<SingleReportResponse>
                ) {
                    if (response.isSuccessful) {
                        binding.lottieAnimation.visibility = View.GONE
                        singleReport = response.body()!!
                        setData(singleReport)
                    } else {
                        Toast.makeText(
                            this@SingleReport,
                            "Failed: ${response.message()}",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }


                override fun onFailure(call: Call<SingleReportResponse>, t: Throwable) {
                    Toast.makeText(this@SingleReport, t.message, Toast.LENGTH_SHORT).show()
                }
            })
    }

    private fun setData(singleReport: SingleReportResponse?) {
        binding.description.text = singleReport!!.report!!.description
        binding.address.text = singleReport!!.report!!.location!!.address
        val status = singleReport.report!!.status
        if (status == "pending") {
            binding.status.text = singleReport.report!!.status!!.capitalize()
            binding.status.setTextColor(ContextCompat.getColor(this@SingleReport, R.color.red))
        } else if (status == "rejected") {
            binding.status.text = singleReport.report!!.status!!.capitalize()
            binding.status.setTextColor(
                ContextCompat.getColor(
                    this@SingleReport,
                    R.color.primaryColor
                )
            )
        } else {
            binding.status.text = singleReport.report!!.status!!.capitalize()
            binding.status.setTextColor(ContextCompat.getColor(this@SingleReport, R.color.gren))
        }

        binding.createdAt.text = formatDateTime(singleReport.report!!.createdAt!!).toString()

        binding.updatedAt.text = formatDateTime(singleReport.report!!.updatedAt!!).toString()

        if (!singleReport.report!!.verifiedBy.isNullOrEmpty()){
            binding.admin.text = singleReport.report!!.verifiedBy
        }else{
            binding.admin.text = "Not verify"
        }

        Glide.with(binding.image)
            .load(singleReport.report!!.image)
            .into(binding.image)
    }

    fun formatDateTime(isoDate: String): String {
        // Parse ISO date string
        val parser = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        parser.timeZone = TimeZone.getTimeZone("UTC") 

        val date: Date = parser.parse(isoDate)!!

        // Format to desired output
        val formatter = SimpleDateFormat("dd-MM-yyyy HH:mm:ss", Locale.getDefault())
        return formatter.format(date)
    }
}