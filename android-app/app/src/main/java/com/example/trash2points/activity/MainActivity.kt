package com.example.trash2points.activity

import android.content.Intent
import android.content.res.ColorStateList
import android.icu.text.CompactDecimalFormat.CompactStyle
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentStatePagerAdapter
import com.example.trash2points.R
import com.example.trash2points.databinding.ActivityMainBinding
import com.example.trash2points.fragment.HistoryFragment
import com.example.trash2points.fragment.HomeFragment
import com.example.trash2points.fragment.ProfileFragment

class MainActivity : AppCompatActivity() {

    val binding by lazy { ActivityMainBinding.inflate(layoutInflater) }
    private lateinit var viewPagerAdapter: ViewPagerAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        setupViewPager()
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
            startActivity(Intent(this@MainActivity , AddReportActivity::class.java))
        }
    }

    private fun setupViewPager() {
        viewPagerAdapter = ViewPagerAdapter(supportFragmentManager)

        // Add your fragments here
        viewPagerAdapter.addFragment(HomeFragment())
        viewPagerAdapter.addFragment(HistoryFragment())
        viewPagerAdapter.addFragment(ProfileFragment())

        binding.viewPager.adapter = viewPagerAdapter
        binding.viewPager.offscreenPageLimit = 3
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


}

class ViewPagerAdapter(fragmentManager: FragmentManager) : FragmentStatePagerAdapter(fragmentManager, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT) {

    private val fragmentList = ArrayList<Fragment>()

    fun addFragment(fragment: Fragment) {
        fragmentList.add(fragment)
    }

    override fun getCount(): Int = fragmentList.size
    override fun getItem(position: Int): Fragment = fragmentList[position]
}

