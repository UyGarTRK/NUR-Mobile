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
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable finishIntro = this::dismissIntro;

    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        // Only cold launches: no replay on tab changes, resume or activity restoration.
        if (state == null) showIntro();
    }

    private void showIntro() {
        intro = new FrameLayout(this);
        intro.setBackgroundColor(Color.rgb(250, 247, 237));
        intro.setClickable(true);
        video = new VideoView(this);
        FrameLayout.LayoutParams layout = new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, Gravity.CENTER);
        intro.addView(video, layout);
        addContentView(intro, new ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        video.setOnCompletionListener(player -> dismissIntro());
        video.setOnErrorListener((player, what, extra) -> { dismissIntro(); return true; });
        video.setOnPreparedListener(player -> {
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
