package com.example.trash2points.activity

import android.content.res.ColorStateList
import android.net.ConnectivityManager
import android.net.ConnectivityManager.NetworkCallback
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentStatePagerAdapter
import com.example.trash2points.R
import com.example.trash2points.databinding.ActivityMainBinding
import com.example.trash2points.fragment.AddReportFragment
import com.example.trash2points.fragment.HistoryFragment
import com.example.trash2points.fragment.HomeFragment
import com.example.trash2points.fragment.ProfileFragment

class MainActivity : AppCompatActivity() {

    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    private lateinit var viewPagerAdapter: ViewPagerAdapter
    private var connectivityManager: ConnectivityManager? = null
    private var networkCallback: NetworkCallback? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        setupViewPager()
        setupConnectivityMonitoring()
        optionHome()

        binding.bottomBar.homeLL.setOnClickListener {
            binding.viewPager.setCurrentItem(0, false)
            optionHome()
        }

        binding.bottomBar.historyLL.setOnClickListener {
            binding.viewPager.setCurrentItem(1, false)
            optionHistory()
        }

        binding.bottomBar.profileLL.setOnClickListener {
            binding.viewPager.setCurrentItem(2, false)
            optionProfile()
        }

        binding.bottomBar.reportLL.setOnClickListener {
            binding.viewPager.setCurrentItem(3, false)
            optionAddReport()
        }

    }

    private fun setupConnectivityMonitoring() {
        connectivityManager = getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager
        networkCallback = object : NetworkCallback() {
            override fun onAvailable(network: Network) {
                runOnUiThread { checkConnectivityAndUpdateUI() }
            }

            override fun onLost(network: Network) {
                runOnUiThread {
                    checkConnectivityAndUpdateUI()
                    Toast.makeText(
                        this@MainActivity,
                        "No internet connection",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }

        val networkRequest = NetworkRequest.Builder()
            .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .build()
        connectivityManager!!.registerNetworkCallback(networkRequest,
            networkCallback as NetworkCallback
        )
    }

    private fun checkConnectivityAndUpdateUI() {
        val isConnected: Boolean = isNetworkAvailable()

        if (isConnected) {
            // Online: Show ViewPager and refresh data
            binding.noInternetLayout.setVisibility(View.GONE)
            binding.viewPager.setVisibility(View.VISIBLE)
        } else {

                binding.noInternetLayout.setVisibility(View.VISIBLE)
                binding.viewPager.setVisibility(View.GONE)

        }
    }

    private fun isNetworkAvailable(): Boolean {
        val cm = getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = cm.activeNetwork ?: return false
        val capabilities = cm.getNetworkCapabilities(network)
        return capabilities != null && (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR))
    }


    private fun optionAddReport() {
        val primaryColor = ContextCompat.getColor(this, R.color.primaryColor)
        val strokeColor = ContextCompat.getColor(this, R.color.stroke_color)

        binding.bottomBar.home.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.homeTxt.setTextColor(strokeColor)

        binding.bottomBar.addReport.imageTintList = ColorStateList.valueOf(primaryColor)
        binding.bottomBar.reportTxt.setTextColor(primaryColor)

        binding.bottomBar.history.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.historyTxt.setTextColor(strokeColor)

        binding.bottomBar.account.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.profielTxt.setTextColor(strokeColor)
    }

    private fun setupViewPager() {
        viewPagerAdapter = ViewPagerAdapter(supportFragmentManager)

        // Add your fragments here
        viewPagerAdapter.addFragment(HomeFragment())
        viewPagerAdapter.addFragment(HistoryFragment())
        viewPagerAdapter.addFragment(ProfileFragment())
        viewPagerAdapter.addFragment(AddReportFragment())

        binding.viewPager.adapter = viewPagerAdapter
        binding.viewPager.offscreenPageLimit = 4
    }

    private fun optionProfile() {
        val primaryColor = ContextCompat.getColor(this, R.color.primaryColor)
        val strokeColor = ContextCompat.getColor(this, R.color.stroke_color)

        binding.bottomBar.home.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.homeTxt.setTextColor(strokeColor)

        binding.bottomBar.addReport.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.reportTxt.setTextColor(strokeColor)

        binding.bottomBar.history.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.historyTxt.setTextColor(strokeColor)

        binding.bottomBar.account.imageTintList = ColorStateList.valueOf(primaryColor)
        binding.bottomBar.profielTxt.setTextColor(primaryColor)
    }


    private fun optionHistory() {
        val primaryColor = ContextCompat.getColor(this, R.color.primaryColor)
        val strokeColor = ContextCompat.getColor(this, R.color.stroke_color)

        binding.bottomBar.home.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.homeTxt.setTextColor(strokeColor)

        binding.bottomBar.addReport.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.reportTxt.setTextColor(strokeColor)

        binding.bottomBar.history.imageTintList = ColorStateList.valueOf(primaryColor)
        binding.bottomBar.historyTxt.setTextColor(primaryColor)

        binding.bottomBar.account.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.profielTxt.setTextColor(strokeColor)
    }


    private fun optionHome() {

        val primaryColor = ContextCompat.getColor(this, R.color.primaryColor)
        val strokeColor = ContextCompat.getColor(this, R.color.stroke_color)

        binding.bottomBar.home.imageTintList = ColorStateList.valueOf(primaryColor)
        binding.bottomBar.homeTxt.setTextColor(primaryColor)

        binding.bottomBar.addReport.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.reportTxt.setTextColor(strokeColor)

        binding.bottomBar.history.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.historyTxt.setTextColor(strokeColor)

        binding.bottomBar.account.imageTintList = ColorStateList.valueOf(strokeColor)
        binding.bottomBar.profielTxt.setTextColor(strokeColor)


    }

    fun switchToProfile() {
        binding.viewPager.setCurrentItem(2, false) // 2 = ProfileFragment index
        optionProfile()
    }

    fun switchHome(){
        binding.viewPager.setCurrentItem(0 , false)
        optionHome()
    }

    fun refreshHistory() {
        val homeFragment = viewPagerAdapter.getItem(0) as? HomeFragment
        homeFragment?.homeAPICall(false)
        val historyFragment = viewPagerAdapter.getItem(1) as? HistoryFragment
        historyFragment?.refreshHistory()
    }

}

class ViewPagerAdapter(fragmentManager: FragmentManager) : FragmentStatePagerAdapter(fragmentManager, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    private val fragmentList = ArrayList<Fragment>()

    fun addFragment(fragment: Fragment) {
        fragmentList.add(fragment)
    }

    override fun getCount(): Int = fragmentList.size
    override fun getItem(position: Int): Fragment = fragmentList[position]
}

