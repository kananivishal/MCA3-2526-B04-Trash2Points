package com.example.trash2points.activity

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.trash2points.ApiClient
import com.example.trash2points.SharedPrefManager
import com.example.trash2points.Utils
import com.example.trash2points.databinding.ActivityRegisterBinding
import com.example.trash2points.model.RegisterRequest
import com.example.trash2points.model.RegisterResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    val binding by lazy { ActivityRegisterBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)


        binding.registerBtn.setOnClickListener {
            val name = binding.userName.text.toString().trim()
            val email = binding.email.text.toString().trim()
            val password = binding.password.text.toString().trim()
            val phone = binding.phoneNo.text.toString().trim()
            val address = binding.address.text.toString().trim()

            if (name.isNotEmpty() && password.isNotEmpty() && email.isNotEmpty() && phone.isNotEmpty() && address.isNotEmpty()) {
                if (android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    addUser(name, password, email, phone, address)
                } else {
                    Toast.makeText(this, "Please enter a valid email address", Toast.LENGTH_SHORT)
                        .show()
                }
            } else {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
            }
        }

        binding.login.setOnClickListener {
            startActivity(Intent(this@RegisterActivity , LoginActivity::class.java))
            finish()
        }

    }

    private fun addUser(
        username: String,
        password: String,
        email: String,
        phone: String,
        address: String
    ) {
        binding.lottieAnimation.visibility = View.VISIBLE
        binding.registerTxt.visibility = View.GONE
        val postRequest = RegisterRequest(
            name = username,
            password = password,
            email = email,
            phoneno = phone,
            address = address,
            role = "user"
        )
        val call: Call<RegisterResponse> = ApiClient.apiServiceWithoutAuth.register(postRequest)
        call.enqueue(object : Callback<RegisterResponse> {
            override fun onResponse(
                call: Call<RegisterResponse>,
                response: Response<RegisterResponse>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    val res = response.body()!!
                    binding.lottieAnimation.visibility = View.GONE
                    binding.registerTxt.visibility = View.VISIBLE
                    res.user!!.name?.let {
                        res.user!!.address?.let { it1 ->
                            SharedPrefManager.saveUserData(
                                token = res.token.toString(),
                                name = it,
                                address = it1,
                                email =res.user!!.email!!,
                                phone = res.user!!.phoneno!!
                            )
                        }
                    }
                    startActivity(Intent(this@RegisterActivity , MainActivity::class.java))
                    Toast.makeText(this@RegisterActivity, res.message, Toast.LENGTH_SHORT).show()
                } else {

                }
            }

            override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                binding.lottieAnimation.visibility = View.VISIBLE
                Toast.makeText(
                    this@RegisterActivity,
                    t.toString(),
                    Toast.LENGTH_SHORT
                ).show()
            }

        })
    }

}
