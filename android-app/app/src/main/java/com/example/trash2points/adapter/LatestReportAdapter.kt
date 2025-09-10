package com.example.trash2points.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.core.net.toUri
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.Recycler
import com.bumptech.glide.Glide
import com.example.trash2points.R
import com.example.trash2points.databinding.ItemGarbageReportBinding
import com.example.trash2points.model.LatestReport

class LatestReportAdapter(private var context : Context , private var reportList : List<LatestReport>) : RecyclerView.Adapter<LatestReportAdapter.ReportViewHolder>() {
    inner class ReportViewHolder(val binding : ItemGarbageReportBinding) : RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReportViewHolder {
        val binding = ItemGarbageReportBinding.inflate(LayoutInflater.from(parent.context) , parent,false)

        return ReportViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return reportList.size
    }

    override fun onBindViewHolder(holder: ReportViewHolder, position: Int) {
        val report = reportList[position]
        holder.binding.apply{
            description.text = report.description
            address.text = report.location!!.address
            created.text = report.createdAt
            status.text = report.status!!.capitalize()
            if (report.status == "pending"){
                main.setCardBackgroundColor(ContextCompat.getColor(context , R.color.light_red))
                status.setTextColor(ContextCompat.getColor(context , R.color.red))
            }else if (report.status == "rejected"){
                main.setCardBackgroundColor(ContextCompat.getColor(context , R.color.light_blue))
                status.setTextColor(ContextCompat.getColor(context , R.color.primaryColor))
            }else{
                main.setCardBackgroundColor(ContextCompat.getColor(context , R.color.light_green))
                status.setTextColor(ContextCompat.getColor(context , R.color.gren))
            }
            Glide.with(image.context)
                .load(report.image) // this should be your API image url
                .into(image)
        }
    }

}