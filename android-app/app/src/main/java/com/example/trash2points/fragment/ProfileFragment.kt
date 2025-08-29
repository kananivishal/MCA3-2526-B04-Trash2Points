package com.example.trash2points.fragment

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.trash2points.ApiClient
import com.example.trash2points.SharedPrefManager
import com.example.trash2points.activity.LoginActivity
import com.example.trash2points.activity.MainActivity
import com.example.trash2points.databinding.FragmentProfileBinding
import com.example.trash2points.model.EditReportRequest
import com.example.trash2points.model.EditReportResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ProfileFragment : Fragment() {

    private lateinit var binding: FragmentProfileBinding
    private var name = SharedPrefManager.getUserName()
    private var email = SharedPrefManager.getEmail()
    private var phone = SharedPrefManager.getPhone()
    private var address = SharedPrefManager.getUserAddress()
    val token = SharedPrefManager.getToken()


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(inflater, container, false)
        binding.userName.text = name
        binding.userNameTxt.text = name
        binding.emailTxt.text = email
        binding.email.text = email
        binding.phoneTxt.text = phone
        binding.addressTxt.text = address

        binding.tempUpdateBtn.setOnClickListener {
            binding.editView.visibility = View.VISIBLE
            binding.profileView.visibility = View.GONE
        }

        binding.backIc.setOnClickListener {
            (activity as? MainActivity)?.switchHome()
        }

        binding.backBtn.setOnClickListener {
            binding.editView.visibility = View.GONE
            binding.profileView.visibility = View.VISIBLE
        }

        binding.userNameEdt.setText(name)
        binding.addressEdt.setText(address)

        binding.updatedBtn.setOnClickListener {
            val username = binding.userNameEdt.text.toString().trim()
            val address = binding.addressEdt.text.toString().trim()
            if (username.isNullOrEmpty() || address.isNullOrEmpty()) {
                Toast.makeText(requireContext(), "Enter all fields", Toast.LENGTH_SHORT).show()
            } else {

                updateProfile(username, address)
            }
        }

        binding.logoutBtn.setOnClickListener {
            SharedPrefManager.clear()
            val intent = Intent(requireContext(), LoginActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            startActivity(intent)
            requireActivity().finish()
        }


        return binding.root
    }

    private fun updateProfile(username: String, address: String) {
        val postRequest = EditReportRequest(username, address)
        val call: Call<EditReportResponse> =
            ApiClient.apiServiceWithoutAuth.editProfile(postRequest, token.toString())
        call.enqueue(object : Callback<EditReportResponse> {
            override fun onResponse(
                call: Call<EditReportResponse>,
                response: Response<EditReportResponse>
            ) {
                val res = response.body()!!
                if (res.success == true) {
                    binding.lottieAnimation.visibility = View.GONE
                    res.user!!.name?.let {
                        res.user!!.address?.let { it1 ->
                            SharedPrefManager.saveUserData(
                                token = token.toString(),
                                name = it,
                                address = it1,
                                email = res.user!!.email!!,
                                phone = res.user!!.phoneno!!
                            )
                        }
                    }
                    updatedDataSet(res.user!!.name!! , res.user!!.address!!)
                    Toast.makeText(requireContext(), res.message, Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(requireContext(), res.message, Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<EditReportResponse>, t: Throwable) {
                binding.lottieAnimation.visibility = View.VISIBLE
                Toast.makeText(
                    requireContext(),
                    t.toString(),
                    Toast.LENGTH_SHORT
                ).show()
            }

        })
    }

    fun updatedDataSet(username : String , address : String){
        name = username
        this.address = address
        binding.userNameTxt.text = username
        binding.addressTxt.text = address
        binding.userName.text = username
        binding.profileView.visibility = View.VISIBLE
        binding.editView.visibility = View.GONE
    }

}