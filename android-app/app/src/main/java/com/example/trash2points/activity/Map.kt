package com.example.trash2points.activity

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.trash2points.R
import com.example.trash2points.databinding.ActivityMapBinding
import org.osmdroid.tileprovider.tilesource.TileSourceFactory
import org.osmdroid.util.GeoPoint
import org.osmdroid.views.overlay.Marker

class Map : AppCompatActivity() {

    val binding by lazy { ActivityMapBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val latitude = intent.getStringExtra("latitude")
        val longitude = intent.getStringExtra("longitude")

        binding.mapView.setTileSource(TileSourceFactory.MAPNIK)
        binding.mapView.controller.setZoom(15.0)

        val startPoint = GeoPoint(latitude!!.toDouble(), longitude!!.toDouble())
        binding.mapView.controller.setCenter(startPoint)

        val marker = Marker(binding.mapView)
        marker.position = startPoint
        marker.title = "Report Location"
        binding.mapView.overlays.add(marker)

        setContentView(binding.root)

    }
}