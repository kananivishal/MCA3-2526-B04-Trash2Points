package com.example.trash2points.fragment

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.trash2points.ApiClient
import com.example.trash2points.R
import com.example.trash2points.SharedPrefManager
import com.example.trash2points.Utils
import com.example.trash2points.activity.MainActivity
import com.example.trash2points.adapter.LatestReportAdapter
import com.example.trash2points.databinding.FragmentHomeBinding
import com.example.trash2points.model.HomeGetData
import com.example.trash2points.model.User
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class HomeFragment : Fragment() {

    private lateinit var binding :FragmentHomeBinding
    private var name = SharedPrefManager.getUserName()

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Change status bar color
        activity?.window?.statusBarColor = ContextCompat.getColor(requireContext(), R.color.primaryColor)
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding =FragmentHomeBinding.inflate(inflater,container,false)
        activity?.window?.statusBarColor = ContextCompat.getColor(requireContext(), R.color.primaryColor)

        binding.userName.text = "Hii , ${name}"

        homeAPICall(false)

        binding.profileImg.setOnClickListener {
            (activity as? MainActivity)?.switchToProfile()
        }



        binding.swipeRefresh.setOnRefreshListener {
            homeAPICall(  true)
        }



        return binding.root
    }

     fun homeAPICall(isSwipeRefresh: Boolean) {
        // 1. Get token from SharedPreferences or wherever you stored it
        val token = SharedPrefManager.getToken() ?: ""
         if (!isSwipeRefresh) {
             binding.lottieAnimation.visibility = View.VISIBLE
         }

        // 2. Make the API call

        ApiClient.apiServiceWithoutAuth.getHomeData(token).enqueue(object : Callback<HomeGetData> {
            override fun onResponse(
                call: Call<HomeGetData>,
                response: Response<HomeGetData>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    binding.lottieAnimation.visibility = View.GONE
                    binding.swipeRefresh.isRefreshing = false
                    val homeData = response.body()
//                    binding.rejectedNumber.text = homeData!!.statusCounts!!.rejected.toString()
//                    binding.pendingNumber.text = homeData!!.statusCounts!!.pending.toString()
//                    binding.completedNumber.text = homeData!!.statusCounts!!.cleaned.toString()
                    val rejected = homeData!!.statusCounts!!.rejected
                    val pending = homeData!!.statusCounts!!.pending
                    val completed = homeData!!.statusCounts!!.cleaned
                    val total = (pending?.let { rejected?.plus(it) } ?: 0) + completed!!

                    binding.rejectedNumber.text = rejected.toString()
                    binding.pendingNumber.text = pending.toString()
                    binding.completedNumber.text = completed.toString()


                    binding.progressRejected.max = total
                    if (rejected != null) {
                        binding.progressRejected.setProgressCompat(rejected, true)
                    }

                    binding.progressPending.max = total
                    if (pending != null) {
                        binding.progressPending.setProgressCompat(pending, true)
                    }

                    binding.progressCompleted.max = total
                    binding.progressCompleted.setProgressCompat(completed, true)


                    binding.recyclerView.layoutManager = LinearLayoutManager(requireContext() , LinearLayoutManager.VERTICAL , false)
                    val adapter = LatestReportAdapter(requireContext() , homeData.letestRepoert)
                    binding.recyclerView.adapter = adapter
                } else {
                    Log.e("HomeAPI", "Error: ${response.code()} - ${response.message()}")
                }
            }

            override fun onFailure(call: Call<HomeGetData>, t: Throwable) {
                binding.swipeRefresh.isRefreshing = false
                Log.e("HomeAPI", "Failure: ${t.message}", t)
            }
        })
    }



}
