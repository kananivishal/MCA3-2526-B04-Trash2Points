package com.example.trash2points.fragment

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity.RESULT_OK
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.bumptech.glide.Glide
import com.example.trash2points.ApiClient
import com.example.trash2points.CloudinaryResponse
import com.example.trash2points.R
import com.example.trash2points.SharedPrefManager
import com.example.trash2points.Utils
import com.example.trash2points.activity.MainActivity
import com.example.trash2points.databinding.FragmentAddReportBinding
import com.example.trash2points.model.AddReportRequest
import com.example.trash2points.model.AddReportResponse
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class AddReportFragment : Fragment() {


    private lateinit var binding : FragmentAddReportBinding
    private val PERMISSION_REQUEST_CODE = 1010
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private val CAMERA_REQUEST_CODE = 2000

    private lateinit var photoUri: Uri
    private lateinit var photoFile: File
    private var imageSelected: Boolean = false
    private var latitude: Double? = null
    private var longitude: Double? = null
    val token = SharedPrefManager.getToken()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        binding = FragmentAddReportBinding.inflate(inflater,container,false)
        activity?.window?.statusBarColor = ContextCompat.getColor(requireContext(), R.color.primaryColor)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireContext())

        binding.addImageBtn.setOnClickListener {
            checkPermissionsAndLaunchCamera()
        }
        binding.addReport.setOnClickListener {
            val description = binding.description.text.toString().trim()
            val address = binding.address.text.toString().trim()

            if (description.isEmpty()) {
                Toast.makeText(requireContext(), "Please enter description", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (address.isNullOrEmpty()) {
                Toast.makeText(requireContext(), "Address not available yet", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (!imageSelected) {
                Toast.makeText(requireContext(), "Please capture an image", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // All fields validated – upload image to Cloudinary
            uploadToCloudinary(photoUri , description , address)
        }

        binding.backIc.setOnClickListener {
            (activity as? MainActivity)?.switchHome()
        }

        return binding.root
    }


    private fun checkPermissionsAndLaunchCamera() {
        val neededPermissions = mutableListOf<String>()
        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            neededPermissions.add(Manifest.permission.CAMERA)
        }
        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            neededPermissions.add(Manifest.permission.ACCESS_FINE_LOCATION)
        }

        if (neededPermissions.isNotEmpty()) {
            requestPermissions(neededPermissions.toTypedArray(), PERMISSION_REQUEST_CODE)
        } else {
            openCamera()
        }
    }

    private fun openCamera() {
        val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)

        try {
            photoFile = createImageFile()
            photoUri = FileProvider.getUriForFile(
                requireContext(),
                "${requireContext().packageName}.provider",
                photoFile
            )
            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri)
            startActivityForResult(cameraIntent, CAMERA_REQUEST_CODE)
        } catch (e: IOException) {
            e.printStackTrace()
            Toast.makeText(requireContext(), "Failed to create image file.", Toast.LENGTH_SHORT).show()
        }
    }

    private fun createImageFile(): File {
        val timestamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
        val storageDir = requireContext().getExternalFilesDir(android.os.Environment.DIRECTORY_PICTURES)
        return File.createTempFile("IMG_$timestamp", ".jpg", storageDir!!)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == CAMERA_REQUEST_CODE && resultCode == RESULT_OK) {
            val bitmap = BitmapFactory.decodeFile(photoFile.absolutePath)
            binding.showImg.visibility = View.VISIBLE
            Glide.with(this)
                .load(photoFile)
                .into(binding.showImg)

            imageSelected = true
            getLocationAndShowAddress()

        }
    }

    private fun uploadToCloudinary(imageUri: Uri, address : String, description: String) {
        binding.lottieAnimation.visibility = View.VISIBLE
        binding.address.isEnabled = false
        binding.description.isEnabled = false
        binding.addImageBtn.isEnabled = false
        val inputStream = requireContext().contentResolver.openInputStream(imageUri)
        val tempFile = File.createTempFile("upload", ".jpg", requireContext().cacheDir)
        FileOutputStream(tempFile).use { outputStream ->
            inputStream?.copyTo(outputStream)
        }

        val requestFile = tempFile
            .asRequestBody("image/jpeg".toMediaTypeOrNull())
        val body = MultipartBody.Part.createFormData("file", tempFile.name, requestFile)

        val uploadPreset = "images".toRequestBody("text/plain".toMediaTypeOrNull())


        ApiClient.cloudinaryApi.uploadImageToCloudinary(
            "https://api.cloudinary.com/v1_1/${Utils.cloudinaryName}/image/upload",
            body,
            uploadPreset
        ).enqueue(object : Callback<CloudinaryResponse> {
            override fun onResponse(
                call: Call<CloudinaryResponse>,
                response: Response<CloudinaryResponse>
            ) {
                if (response.isSuccessful) {
                    val secureUrl = response.body()?.secure_url
                    if (secureUrl != null) {
                        addReport(secureUrl)

                    }
                } else {
                    Toast.makeText(requireContext(), "Upload Failed", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<CloudinaryResponse>, t: Throwable) {
                Toast.makeText(requireContext(), "Error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if (requestCode == PERMISSION_REQUEST_CODE) {
            val allGranted = grantResults.all { it == PackageManager.PERMISSION_GRANTED }

            if (allGranted) {
                openCamera()
                getLocationAndShowAddress()
            } else {
                Toast.makeText(requireContext(), "Camera and Location permissions are required.", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun getLocationAndShowAddress() {
        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            fusedLocationClient.lastLocation.addOnSuccessListener { location ->
                if (location != null) {
                    latitude = location.latitude
                    longitude = location.longitude

                    val geocoder = android.location.Geocoder(requireContext(), Locale.getDefault())
                    try {
                        val addresses = geocoder.getFromLocation(latitude!!, longitude!!, 1)
                        val address = addresses?.get(0)?.getAddressLine(0)
                        binding.address.setText(address) // update EditText directly

                    } catch (e: Exception) {
                        Toast.makeText(requireContext(), "Error getting address", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(requireContext(), "Location not available", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    fun addReport(imageUrl : String ){
        val address1 = binding.address.text.toString().trim()
        val description2 = binding.description.text.toString().trim()
        val postRequest = AddReportRequest(image = imageUrl, address = address1 , description = description2 , longitude = longitude.toString() , latitude = latitude.toString())
        val call : Call<AddReportResponse> = ApiClient.apiServiceWithoutAuth.addReport(postRequest , token!!)
        call.enqueue(object : Callback<AddReportResponse> {
            override fun onResponse(
                call: Call<AddReportResponse>,
                response: Response<AddReportResponse>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    val res = response.body()!!
                    if (res.success == true){
                        binding.lottieAnimation.visibility = View.GONE
                        binding.address.isEnabled = true
                        binding.description.isEnabled = true
                        binding.addImageBtn.isEnabled = true
                        binding.address.setText("")
                        binding.description.setText("")
                        binding.showImg.visibility = View.GONE
                        (activity as? MainActivity)?.refreshHistory()
                        (activity as? MainActivity)?.switchHome()
                        Toast.makeText(requireContext(), res.message, Toast.LENGTH_SHORT).show()
                    }else{
                        Toast.makeText(requireContext(), res.message, Toast.LENGTH_SHORT).show()
                    }
                }
            }

            override fun onFailure(call: Call<AddReportResponse>, t: Throwable) {
                binding.lottieAnimation.visibility = View.VISIBLE
                Toast.makeText(
                    requireContext(),
                    t.toString(),
                    Toast.LENGTH_SHORT
                ).show()
            }
        })
    }

}