package tr.com.nur.namaz;

import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.VideoView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private FrameLayout intro;
    private VideoView video;
    private int previousSystemUi;
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
        super.onCreate(state);
        // Only cold launches: no replay on tab changes, resume or activity restoration.
        if (state == null) showIntro();
    }

    private void showIntro() {
        intro = new FrameLayout(this);
        intro.setBackgroundColor(Color.rgb(250, 247, 237));
        intro.setClickable(true);
        previousSystemUi=getWindow().getDecorView().getSystemUiVisibility();
        getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | android.view.View.SYSTEM_UI_FLAG_FULLSCREEN | android.view.View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | android.view.View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | android.view.View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | android.view.View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
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
            CoverVideoView cover=(CoverVideoView)video;
            if(player.getVideoWidth()>0 && player.getVideoHeight()>0){cover.videoWidth=player.getVideoWidth();cover.videoHeight=player.getVideoHeight();cover.requestLayout();}
            player.setLooping(false);
            video.start();
        });
        video.setVideoURI(Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.nur_intro));
        // A missing or unsupported video must never block entry.
        handler.postDelayed(finishIntro, 7000);
    }

    private void dismissIntro() {
        handler.removeCallbacks(finishIntro);
        if (intro == null) return;
        getWindow().getDecorView().setSystemUiVisibility(previousSystemUi);
        if (video != null) video.stopPlayback();
        FrameLayout layer = intro;
        intro = null;
        layer.animate().alpha(0f).setDuration(250).withEndAction(() -> {
            if (layer.getParent() instanceof ViewGroup) ((ViewGroup) layer.getParent()).removeView(layer);
        }).start();
    }

    @Override
    public void onPause() {
        dismissIntro();
        super.onPause();
    }

    @Override
    public void onDestroy() {
        handler.removeCallbacks(finishIntro);
        super.onDestroy();
    }
}
