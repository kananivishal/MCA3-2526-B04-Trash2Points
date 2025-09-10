package com.example.trash2points.fragment

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.core.widget.addTextChangedListener
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.trash2points.ApiClient
import com.example.trash2points.R
import com.example.trash2points.SharedPrefManager
import com.example.trash2points.activity.MainActivity
import com.example.trash2points.adapter.HistoryAdapter
import com.example.trash2points.databinding.FragmentHistoryBinding
import com.example.trash2points.model.HistoryResponse
import com.example.trash2points.model.Reports
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class HistoryFragment : Fragment() {

    private lateinit var binding : FragmentHistoryBinding
    private var currentStatus: String = "pending"
    private var allReports: ArrayList<Reports> = ArrayList()
    private lateinit var adapter: HistoryAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHistoryBinding.inflate(inflater,container,false)
        binding.search.imeOptions = EditorInfo.IME_ACTION_SEARCH
        binding.backIc.setOnClickListener {
            (activity as? MainActivity)?.switchHome()
        }

        histotyAPICall("pending" , false)

        binding.completed.setOnClickListener {
            resetButtonColor()
            setColor(binding.completed)
            currentStatus = "cleaned"
            histotyAPICall("cleaned",false)
        }

        binding.pending.setOnClickListener {
            resetButtonColor()
            setColor(binding.pending)
            currentStatus = "pending"
            histotyAPICall("pending" , false)
        }
        binding.rejected.setOnClickListener {
            resetButtonColor()
            setColor(binding.rejected)
            currentStatus = "rejected"
            histotyAPICall("rejected" , false)
        }

        binding.swipeRefresh.setOnRefreshListener {
            histotyAPICall(currentStatus , true)
        }

        binding.search.addTextChangedListener {
            filterReports()
        }

        binding.all.setOnClickListener {
            resetButtonColor()
            setColor(binding.all)
            currentStatus = "all"
            histotyAPICall("all", false)
        }




        return binding.root
    }

    private fun filterReports() {
        val searchText = binding.search.text.toString().trim().lowercase()

        var filtered: List<Reports> = allReports

        if (currentStatus != "all") {
            filtered = filtered.filter {
                it.status.equals(currentStatus, ignoreCase = true)
            }
        }

        if (searchText.isNotEmpty()) {
            filtered = filtered.filter { report ->
                (report.description?.lowercase()?.contains(searchText) == true) ||
                        (report.location?.address?.lowercase()?.contains(searchText) == true)
            }
        }


        if (!::adapter.isInitialized) {
            adapter = HistoryAdapter(requireContext(), ArrayList(filtered))
            binding.recyclerView.layoutManager =
                LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
            binding.recyclerView.adapter = adapter
        } else {
            adapter.updateData(ArrayList(filtered))
        }
    }

    fun setColor(textView: TextView) {
        textView.background = requireContext().getDrawable(R.drawable.shape_fill_primary4)
        textView.setTextColor(ContextCompat.getColor(requireContext(), R.color.white))
    }

    fun resetButtonColor() {
        binding.completed.background = requireContext().getDrawable(R.drawable.shape_stroke_corners)
        binding.completed.setTextColor(
            ContextCompat.getColor(
                requireContext(), R.color.primaryColor
            )
        )

        binding.pending.background =
            requireContext().getDrawable(R.drawable.shape_stroke_corners)

        binding.pending.setTextColor(
            ContextCompat.getColor(
                requireContext(), R.color.primaryColor
            )
        )

        binding.rejected.background = requireContext().getDrawable(R.drawable.shape_stroke_corners)
        binding.rejected.setTextColor(
            ContextCompat.getColor(
                requireContext(), R.color.primaryColor
            )
        )

        binding.all.background = requireContext().getDrawable(R.drawable.shape_stroke_corners)
        binding.all.setTextColor(
            ContextCompat.getColor(
                requireContext(), R.color.primaryColor
            )
        )
    }

    private fun histotyAPICall(status: String? = null, isSwipeRefresh: Boolean) {
        val token = SharedPrefManager.getToken()
        if (!isSwipeRefresh) {
            binding.lottieAnimation.visibility = View.VISIBLE
        }

        ApiClient.apiServiceWithoutAuth.getHistoryData(token!!).enqueue(object : Callback<HistoryResponse> {
            override fun onResponse(
                call: Call<HistoryResponse>,
                response: Response<HistoryResponse>
            ) {
                if (response.isSuccessful) {
                    val res = response.body()
                    binding.swipeRefresh.isRefreshing = false
                    if (res?.success == true) {
                        allReports = res.reports
                        filterReports()
                    }
                    binding.lottieAnimation.visibility = View.GONE
                } else {
                    Log.e("HomeAPI", "Error: ${response.code()} - ${response.message()}")
                    Toast.makeText(requireContext(), response.message(), Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<HistoryResponse>, t: Throwable) {
                binding.lottieAnimation.visibility = View.GONE
                binding.swipeRefresh.isRefreshing = false
                Toast.makeText(requireContext(), t.message, Toast.LENGTH_SHORT).show()
            }
        })
    }

    fun refreshHistory() {
        histotyAPICall(currentStatus, false)
    }

}