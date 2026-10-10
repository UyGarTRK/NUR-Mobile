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
import android.view.WindowInsets;
import android.view.WindowInsetsController;
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
    private int previousSystemBarsBehavior;
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
        // AppCompat creates window decor during super.onCreate. Select the
        // no-title theme before that, rather than relying on BridgeActivity's
        // later theme switch after the ActionBar may already exist.
        setTheme(R.style.AppTheme_NoActionBar);
        registerPlugin(NurLocationAccessPlugin.class);
        registerPlugin(NurUpdatesPlugin.class);
        registerPlugin(NurPrayerCardPlugin.class);
        super.onCreate(state);
        if (getSupportActionBar() != null) getSupportActionBar().hide();
        // The launch theme is fullscreen, including activity recreation. Never
        // let that launch-only flag leak into a restored, non-intro app screen.
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        // Only cold launches: no replay on tab changes, resume or activity restoration.
        if (state == null) {
            prepareIntroWindow();
            showIntro();
        }
    }

    // BridgeActivity installs the app theme/window first. Capture that state, not
    // the launch theme, so its setup cannot overwrite the intro's window flags.
    private void prepareIntroWindow() {
        previousSystemUi = getWindow().getDecorView().getSystemUiVisibility();
        // Fullscreen is launch-only; the regular app must retain its system bars.
        previousWindowFlags = getWindow().getAttributes().flags & ~WindowManager.LayoutParams.FLAG_FULLSCREEN;
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
        if (Build.VERSION.SDK_INT >= 30 && getWindow().getInsetsController() != null) {
            previousSystemBarsBehavior = getWindow().getInsetsController().getSystemBarsBehavior();
        }
        introWindowActive = true;
        applyIntroWindow();
    }

    private void applyIntroWindow() {
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN
                | WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        if (Build.VERSION.SDK_INT >= 30) {
            WindowInsetsController controller = getWindow().getInsetsController();
            if (controller != null) {
                controller.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
                controller.hide(WindowInsets.Type.systemBars());
            }
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        // Some devices apply the launch bar state when the window gains focus.
        if (hasFocus && introWindowActive) applyIntroWindow();
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
        if (Build.VERSION.SDK_INT >= 30 && getWindow().getInsetsController() != null) {
            getWindow().getInsetsController().show(WindowInsets.Type.systemBars());
            getWindow().getInsetsController().setSystemBarsBehavior(previousSystemBarsBehavior);
        }
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
        // Cover the uninitialised SurfaceView until its first decoded frame.
        // No logo/image is resized here; the original video remains untouched.
        final View curtain = new View(this);
        curtain.setBackgroundColor(Color.rgb(250, 247, 237));
        intro.addView(curtain, new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        ((ViewGroup)getWindow().getDecorView()).addView(intro, new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        video.setOnCompletionListener(player -> dismissIntro());
        video.setOnErrorListener((player, what, extra) -> { dismissIntro(); return true; });
        video.setOnPreparedListener(player -> {
            if (intro == null || video == null) return;
            CoverVideoView cover=(CoverVideoView)video;
            if(player.getVideoWidth()>0 && player.getVideoHeight()>0){cover.videoWidth=player.getVideoWidth();cover.videoHeight=player.getVideoHeight();cover.requestLayout();}
            player.setLooping(false);
            player.setOnInfoListener((mediaPlayer, what, extra) -> {
                if (what == android.media.MediaPlayer.MEDIA_INFO_VIDEO_RENDERING_START
                        && intro != null && curtain.getParent() == intro) {
                    intro.removeView(curtain);
                }
                return false;
            });
            // A single pre-draw can still use the old system-bar bounds. Require
            // two stable full-window layouts and hidden bars before playback.
            final VideoView preparedVideo = video;
            preparedVideo.getViewTreeObserver().addOnPreDrawListener(new ViewTreeObserver.OnPreDrawListener() {
                private int previousWidth = -1, previousHeight = -1;
                @Override public boolean onPreDraw() {
                    if (intro == null || video != preparedVideo) {
                        preparedVideo.getViewTreeObserver().removeOnPreDrawListener(this);
                        return true;
                    }
                    View decor = getWindow().getDecorView();
                    int width = intro.getWidth(), height = intro.getHeight();
                    boolean barsHidden = true;
                    if (Build.VERSION.SDK_INT >= 30) {
                        WindowInsets insets = decor.getRootWindowInsets();
                        barsHidden = insets != null && !insets.isVisible(WindowInsets.Type.systemBars());
                    }
                    boolean ready = hasWindowFocus() && barsHidden && width > 0 && height > 0
                            && width == decor.getWidth() && height == decor.getHeight()
                            && width == previousWidth && height == previousHeight
                            && !preparedVideo.isLayoutRequested();
                    previousWidth = width;
                    previousHeight = height;
                    if (ready) {
                        preparedVideo.getViewTreeObserver().removeOnPreDrawListener(this);
                        preparedVideo.start();
                    } else {
                        decor.postInvalidateOnAnimation();
                    }
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
