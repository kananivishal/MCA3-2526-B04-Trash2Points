package com.example.trash2points.adapter

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.trash2points.R
import com.example.trash2points.activity.SingleReport
import com.example.trash2points.databinding.ItemGarbageReportBinding
import com.example.trash2points.model.Reports
import com.example.trash2points.model.SingleReportResponse

class HistoryAdapter(
    private var context: Context,
    private var reportList: List<Reports>
) : RecyclerView.Adapter<HistoryAdapter.HistoryViewHolder>() {

    inner class HistoryViewHolder(val binding: ItemGarbageReportBinding) :
        RecyclerView.ViewHolder(binding.root)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): HistoryViewHolder {
        val binding =
            ItemGarbageReportBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return HistoryViewHolder(binding)
    }

    override fun getItemCount(): Int = reportList.size

    override fun onBindViewHolder(holder: HistoryViewHolder, position: Int) {
        val report = reportList[position]
        holder.binding.apply {
            description.text = report.description
            address.text = report.location!!.address
            created.text = report.createdAt
            status.text = report.status!!.capitalize()

            // Status-based color
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

            // Load image
            Glide.with(image.context)
                .load(report.image)
                .into(image)

            main.setOnClickListener {
                val intent = Intent(context, SingleReport::class.java)
                intent.putExtra("reportId", report.Id) // use putExtra, not putExtras
                context.startActivity(intent)
            }

        }
    }

    // 🔥 Use this method to update list dynamically (for search + status filter)
    fun updateData(newList: List<Reports>) {
        reportList = newList
        notifyDataSetChanged()
    }
}
