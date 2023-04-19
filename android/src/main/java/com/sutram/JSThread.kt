package com.sutram

import java.util.*
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.lang.RuntimeException

class JSThread(private val jsSlugName: String) {
  private var id: Int = Math.abs(Random().nextInt())
  private var reactContext: ReactApplicationContext? = null

  fun getThreadId(): Int {
    return id
  }

  fun getName(): String {
    return jsSlugName
  }

  fun runFromContext(context: ReactApplicationContext, reactContextBuilder: ReactContextBuilder) {
    if (reactContext != null) {
      return;
    }
    reactContext = reactContextBuilder.build()
    val threadSelfModule: ThreadSelfModule? = reactContext?.getNativeModule(ThreadSelfModule::class.java)
    threadSelfModule?.initialize(id, context)
  }

  fun postMessage(message: String) {
    if (reactContext == null) {
      throw RuntimeException("JSThread-$id postMessage: reactContext is null")
    }
    reactContext?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("ThreadMessage", message)
  }

  fun onHostResume() {
    if (reactContext == null) {
      throw RuntimeException("JSThread-$id onHostResume: reactContext is null")
    }
    reactContext?.onHostResume(null)
  }

  fun onHostPause() {
    if (reactContext == null) {
      throw RuntimeException("JSThread-$id onHostPause: reactContext is null")
    }
    reactContext?.onHostPause()
  }

  fun terminate() {
    if (reactContext == null) {
      throw RuntimeException("JSThread-$id terminate: reactContext is null")
    }
    reactContext?.onHostPause()
    reactContext?.destroy()
    reactContext = null
  }
}

