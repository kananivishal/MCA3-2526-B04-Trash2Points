package com.example.trash2points

import com.example.trash2points.model.User


class Utils {
    companion object {
        val BASE_URL = "http://192.168.247.174:8080/"
        var currentUser : User? = null
        var cloudinaryName = "dmaeii1ll"
        var authToken: String? = null
        var userName : String ? = null
        var userAddress : String ? = null
    }
}