package com.example.trash2points.flowstyle


import android.content.Context
import android.util.AttributeSet
import android.view.MotionEvent
import androidx.viewpager.widget.ViewPager

class SwipeDisabledViewPager @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null
) : ViewPager(context, attrs) {

    override fun onInterceptTouchEvent(ev: MotionEvent): Boolean {
        // Prevents the ViewPager from intercepting touch events
        return false
    }

    override fun onTouchEvent(ev: MotionEvent): Boolean {
        return false
    }
}
