package com.example.trash2points.fragment

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.example.trash2points.R


class HomeFragment : Fragment() {


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

    }





    private fun fetchUserLocation() {
        // TODO: Replace this with your actual location fetching logic
        println("Location permission granted. Fetching location...")
    }

    private fun fallbackToDefaultCity() {
        // TODO: Fallback if permission denied
        println("Permission denied. Using default city.")
    }
}
