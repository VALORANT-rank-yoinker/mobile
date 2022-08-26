package io.vry.mobile;

import android.graphics.Color;
import android.os.Bundle;

import androidx.core.splashscreen.SplashScreen;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
    int splashBg = getResources().getColor(R.color.splash_background);
    this.getWindow().getDecorView().setBackgroundColor(splashBg);
    super.onCreate(savedInstanceState);
  }
}
