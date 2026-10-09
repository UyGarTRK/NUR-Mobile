package tr.com.nur.namaz;

import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;
import android.view.ViewGroup;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.VideoView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private FrameLayout intro;
    private VideoView video;
    private int previousSystemUi;
    private int previousWindowFlags;
    private int previousCutoutMode;
    private int previousStatusColor;
    private int previousNavigationColor;
    private boolean previousStatusContrast;
    private boolean previousNavigationContrast;
    private boolean introWindowActive;
    private static class CoverVideoView extends VideoView {
        int videoWidth=1080, videoHeight=1920;
        CoverVideoView(android.content.Context context){super(context);}
        @Override protected void onMeasure(int w,int h){
            int width=android.view.View.MeasureSpec.getSize(w),height=android.view.View.MeasureSpec.getSize(h);
            double scale=Math.max((double)width/videoWidth,(double)height/videoHeight);
            setMeasuredDimension((int)Math.ceil(videoWidth*scale),(int)Math.ceil(videoHeight*scale));
        }
    }
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable finishIntro = this::dismissIntro;

    @Override
    public void onCreate(Bundle state) {
        registerPlugin(NurLocationAccessPlugin.class);
        registerPlugin(NurUpdatesPlugin.class);
        registerPlugin(NurPrayerCardPlugin.class);
        if (state == null) prepareIntroWindow();
        super.onCreate(state);
        // Only cold launches: no replay on tab changes, resume or activity restoration.
        if (state == null) showIntro();
    }

    // Set the window geometry before BridgeActivity creates the WebView or video surface.
    private void prepareIntroWindow() {
        previousSystemUi = getWindow().getDecorView().getSystemUiVisibility();
        previousWindowFlags = getWindow().getAttributes().flags;
        previousStatusColor = getWindow().getStatusBarColor();
        previousNavigationColor = getWindow().getNavigationBarColor();
        if (Build.VERSION.SDK_INT >= 28) {
            WindowManager.LayoutParams attributes = getWindow().getAttributes();
            previousCutoutMode = attributes.layoutInDisplayCutoutMode;
            attributes.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
            getWindow().setAttributes(attributes);
        }
        if (Build.VERSION.SDK_INT >= 29) {
            previousStatusContrast = getWindow().isStatusBarContrastEnforced();
            previousNavigationContrast = getWindow().isNavigationBarContrastEnforced();
            getWindow().setStatusBarContrastEnforced(false);
            getWindow().setNavigationBarContrastEnforced(false);
        }
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN
                | WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        introWindowActive = true;
    }

    private void restoreAppWindow() {
        if (!introWindowActive) return;
        introWindowActive = false;
        getWindow().setFlags(previousWindowFlags, WindowManager.LayoutParams.FLAG_FULLSCREEN
                | WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        getWindow().setStatusBarColor(previousStatusColor);
        getWindow().setNavigationBarColor(previousNavigationColor);
        if (Build.VERSION.SDK_INT >= 28) {
            WindowManager.LayoutParams attributes = getWindow().getAttributes();
            attributes.layoutInDisplayCutoutMode = previousCutoutMode;
            getWindow().setAttributes(attributes);
        }
        if (Build.VERSION.SDK_INT >= 29) {
            getWindow().setStatusBarContrastEnforced(previousStatusContrast);
            getWindow().setNavigationBarContrastEnforced(previousNavigationContrast);
        }
        getWindow().getDecorView().setSystemUiVisibility(previousSystemUi);
    }

    private void showIntro() {
        intro = new FrameLayout(this);
        intro.setBackgroundColor(Color.rgb(250, 247, 237));
        intro.setClickable(true);
        intro.setClipChildren(true);
        video = new CoverVideoView(this);
        FrameLayout.LayoutParams layout = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, Gravity.CENTER);
        intro.addView(video, layout);
        ((ViewGroup)getWindow().getDecorView()).addView(intro, new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        video.setOnCompletionListener(player -> dismissIntro());
        video.setOnErrorListener((player, what, extra) -> { dismissIntro(); return true; });
        video.setOnPreparedListener(player -> {
            if (intro == null || video == null) return;
            CoverVideoView cover=(CoverVideoView)video;
            if(player.getVideoWidth()>0 && player.getVideoHeight()>0){cover.videoWidth=player.getVideoWidth();cover.videoHeight=player.getVideoHeight();cover.requestLayout();}
            player.setLooping(false);
            // Wait for the cover dimensions to be laid out before rendering frame one.
            final VideoView preparedVideo = video;
            preparedVideo.getViewTreeObserver().addOnPreDrawListener(new ViewTreeObserver.OnPreDrawListener() {
                @Override public boolean onPreDraw() {
                    preparedVideo.getViewTreeObserver().removeOnPreDrawListener(this);
                    if (intro != null && video == preparedVideo) preparedVideo.start();
                    return true;
                }
            });
            preparedVideo.requestLayout();
        });
        video.setVideoURI(Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.nur_intro));
        // A missing or unsupported video must never block entry.
        handler.postDelayed(finishIntro, 7000);
    }

    private void dismissIntro() {
        handler.removeCallbacks(finishIntro);
        FrameLayout layer = intro;
        VideoView player = video;
        intro = null;
        video = null;
        if (player != null) {
            player.setOnPreparedListener(null);
            player.setOnCompletionListener(null);
            player.setOnErrorListener(null);
            player.stopPlayback();
        }
        if (layer != null && layer.getParent() instanceof ViewGroup) {
            ((ViewGroup) layer.getParent()).removeView(layer);
        }
        restoreAppWindow();
    }

    @Override
    public void onPause() {
        dismissIntro();
        super.onPause();
    }

    @Override
    public void onDestroy() {
        dismissIntro();
        super.onDestroy();
    }
}
