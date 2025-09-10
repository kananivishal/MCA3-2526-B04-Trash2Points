package com.example.trash2points.activity

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.trash2points.ApiClient
import com.example.trash2points.SharedPrefManager
import com.example.trash2points.databinding.ActivityLoginBinding
import com.example.trash2points.model.LoginRequest
import com.example.trash2points.model.LoginResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {
    val binding by lazy { ActivityLoginBinding.inflate(layoutInflater) }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        binding.loginBtn.setOnClickListener {
            val email = binding.email.text.toString().trim()
            val password = binding.password.text.toString().trim()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                if (android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    loginUser(email, password)
                } else {
                    Toast.makeText(this, "Please enter a valid email address", Toast.LENGTH_SHORT)
                        .show()
                }
            } else {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show()
            }
        }

        binding.register.setOnClickListener {
            startActivity(Intent(this@LoginActivity, RegisterActivity::class.java))
            finish()
        }
    }

    private fun loginUser(email: String, password: String) {
        binding.lottieAnimation.visibility = View.VISIBLE
        binding.loginTxt.visibility = View.GONE
        val postRequest = LoginRequest(email = email, password = password, role = "user")
        val call: Call<LoginResponse> = ApiClient.apiServiceWithoutAuth.login(postRequest)
        call.enqueue(object : Callback<LoginResponse> {

            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {

                val res = response.body()!!
                if (res.success == true) {
                    binding.lottieAnimation.visibility = View.GONE
                    binding.loginTxt.visibility = View.VISIBLE
                    res.user!!.name?.let {
                        res.user!!.address?.let { it1 ->
                            SharedPrefManager.saveUserData(
                                token = res.token.toString(),
                                name = it,
                                address = it1,
                                email = res.user!!.email!!,
                                phone = res.user!!.phoneno!!,
                            )
                        }
                    }
                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                    finish()
                    Toast.makeText(this@LoginActivity, res.message, Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this@LoginActivity, res.message, Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                binding.lottieAnimation.visibility = View.VISIBLE
                Toast.makeText(
                    this@LoginActivity,
                    t.toString(),
                    Toast.LENGTH_SHORT
                ).show()
            }

        })
    }
}