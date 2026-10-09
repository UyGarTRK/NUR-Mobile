package tr.com.nur.namaz;

import android.app.*;
import android.content.*;
import android.os.*;
import android.graphics.Color;
import android.widget.RemoteViews;
import org.json.*;
import java.text.SimpleDateFormat;
import java.util.*;

/** Silent prayer overview. Independent of audible prayer/reminder notification IDs. */
public final class NurPrayerCard extends BroadcastReceiver {
    static final String PREFS="nur_prayer_card", CHANNEL="nur-prayer-overview-v1";
    static final int ID=210000001, ALARM=210000002;
    static final String HIDE="tr.com.nur.namaz.HIDE_PRAYER_CARD";
    static SharedPreferences prefs(Context c){return c.getSharedPreferences(PREFS,Context.MODE_PRIVATE);}
    static final TimeZone ZONE=TimeZone.getTimeZone("Europe/Istanbul");
    static String day(long time){SimpleDateFormat f=new SimpleDateFormat("yyyy-MM-dd",Locale.US);f.setTimeZone(ZONE);return f.format(new Date(time));}
    static long midnight(long now){Calendar c=Calendar.getInstance(ZONE);c.setTimeInMillis(now);c.add(Calendar.DAY_OF_YEAR,1);c.set(Calendar.HOUR_OF_DAY,0);c.set(Calendar.MINUTE,0);c.set(Calendar.SECOND,1);c.set(Calendar.MILLISECOND,0);return c.getTimeInMillis();}
    static PendingIntent alarm(Context c){return PendingIntent.getBroadcast(c,ALARM,new Intent(c,NurPrayerCard.class).setAction("tr.com.nur.namaz.REFRESH_PRAYER_CARD"),PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);}
    static boolean allowed(Context c){NotificationManager nm=(NotificationManager)c.getSystemService(Context.NOTIFICATION_SERVICE);if(Build.VERSION.SDK_INT>=26){NotificationChannel channel=nm.getNotificationChannel(CHANNEL);if(channel!=null&&channel.getImportance()==NotificationManager.IMPORTANCE_NONE)return false;}return nm.areNotificationsEnabled() && (Build.VERSION.SDK_INT<33||c.checkSelfPermission("android.permission.POST_NOTIFICATIONS")==android.content.pm.PackageManager.PERMISSION_GRANTED);}
    static synchronized void refresh(Context c){
        SharedPreferences p=prefs(c);NotificationManager nm=(NotificationManager)c.getSystemService(Context.NOTIFICATION_SERVICE);
        AlarmManager am=(AlarmManager)c.getSystemService(Context.ALARM_SERVICE);am.cancel(alarm(c));
        if(!p.getBoolean("enabled",false)||!allowed(c)){nm.cancel(ID);return;}
        if(Build.VERSION.SDK_INT>=26){NotificationChannel channel=new NotificationChannel(CHANNEL,"NUR • Günlük vakit kartı",NotificationManager.IMPORTANCE_LOW);channel.setDescription("Sessiz günlük namaz vakitleri");channel.setSound(null,null);channel.enableVibration(false);nm.createNotificationChannel(channel);if(nm.getNotificationChannel(CHANNEL).getImportance()==NotificationManager.IMPORTANCE_NONE){nm.cancel(ID);return;}}
        long now=System.currentTimeMillis(),nextAt=0;String nextLabel="",today=day(now),location="Konum seçilmedi";JSONArray rows=new JSONArray();boolean validToday=false;String nextTime="";
        try{
            JSONObject data=new JSONObject(p.getString("data","{}"));location=data.optString("location","Konum seçilmedi");JSONArray days=data.optJSONArray("days");
            if(days!=null)for(int d=0;d<days.length();d++){
                JSONObject entry=days.getJSONObject(d);JSONArray values=entry.optJSONArray("times");if(values==null||values.length()!=6)continue;
                String date=entry.optString("date");boolean valid=true;long previous=0;
                for(int i=0;i<6;i++){JSONObject row=values.getJSONObject(i);long at=row.optLong("at");String time=row.optString("time");if(at<=previous||!day(at).equals(date)||!time.matches("\\d{2}:\\d{2}")){valid=false;break;}previous=at;}
                if(!valid)continue;
                if(today.equals(date)){rows=values;validToday=true;}
                for(int i=0;i<6;i++){JSONObject row=values.getJSONObject(i);long at=row.getLong("at");if(at>now&&(nextAt==0||at<nextAt)){nextAt=at;nextLabel=row.optString("label");nextTime=row.optString("time");}}
            }
        }catch(JSONException ignored){validToday=false;}
        // Never show a future plan as today's data or count down across a missing day.
        if(!validToday||nextAt>midnight(now)+86400000L){nextAt=0;}
        String title=validToday?(nextAt>0?"Sıradaki: "+nextLabel+" · "+nextTime:"Bugünün vakitleri tamamlandı"):"Güncel vakitler gerekli";
        String summary=validToday?(nextAt>0?"Sıradaki vakte kalan süre":"Yeni gün için NUR’u açın") : "Konumu ve güncel vakitleri almak için NUR’u açın.";
        StringBuilder all=new StringBuilder();
        if(validToday)for(int i=0;i<6;i++){JSONObject row=rows.optJSONObject(i);if(i>0)all.append(i==3?"\n":" · ");all.append(row.optString("label")).append(' ').append(row.optString("time"));}
        PendingIntent open=PendingIntent.getActivity(c,ID,new Intent(c,MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP|Intent.FLAG_ACTIVITY_CLEAR_TOP),PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
        PendingIntent hide=PendingIntent.getBroadcast(c,ID,new Intent(c,NurPrayerCard.class).setAction(HIDE),PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
        Notification.Builder b=Build.VERSION.SDK_INT>=26?new Notification.Builder(c,CHANNEL):new Notification.Builder(c);
        b.setSmallIcon(R.drawable.ic_stat_nur).setColor(Color.rgb(161,126,46)).setContentTitle(title).setContentText(summary).setSubText(location).setContentIntent(open).setOngoing(true).setOnlyAlertOnce(true).setShowWhen(false).setVisibility(Notification.VISIBILITY_PRIVATE).setCategory(Notification.CATEGORY_STATUS).setPriority(Notification.PRIORITY_LOW).setDeleteIntent(hide).addAction(0,"NUR’u aç",open).addAction(0,"Gizle",hide);
        int style=p.getInt("style",3);
        if(validToday&&(style==2||style==3)){
            RemoteViews v=new RemoteViews(c.getPackageName(),style==2?R.layout.nur_prayer_grid:R.layout.nur_prayer_next);
            v.setTextViewText(R.id.card_title,title);
            if(style==2){int[] ids={R.id.time_0,R.id.time_1,R.id.time_2,R.id.time_3,R.id.time_4,R.id.time_5};for(int i=0;i<6;i++){JSONObject row=rows.optJSONObject(i);v.setInt(ids[i],"setBackgroundResource",row.optLong("at")==nextAt?R.drawable.nur_card_tile_active:R.drawable.nur_card_tile);v.setTextViewText(ids[i],(row.optLong("at")==nextAt?"› ":"")+row.optString("label")+"\n"+row.optString("time"));}}
            else{v.setTextViewText(R.id.card_times,all.toString());v.setTextViewText(R.id.card_caption,summary);v.setViewVisibility(R.id.card_countdown,nextAt>0?android.view.View.VISIBLE:android.view.View.GONE);if(nextAt>0){v.setBoolean(R.id.card_countdown,"setCountDown",true);v.setChronometer(R.id.card_countdown,SystemClock.elapsedRealtime()+nextAt-now,null,true);}}
            b.setStyle(new Notification.DecoratedCustomViewStyle()).setCustomBigContentView(v);
        }else b.setStyle(new Notification.BigTextStyle().bigText(validToday?all.toString():summary));
        if(validToday&&nextAt>0)b.setWhen(nextAt).setShowWhen(true).setUsesChronometer(true).setChronometerCountDown(true);
        nm.notify(ID,b.build());
        long wake=midnight(now);if(validToday&&nextAt>now)wake=Math.min(wake,nextAt+1000);
        // Boundary-only wakeups (inexact when exact alarm access is absent): no continuous foreground service or per-second alarm.
        try{if(Build.VERSION.SDK_INT<31||am.canScheduleExactAlarms())am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP,wake,alarm(c));else am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP,wake,alarm(c));}
        catch(SecurityException ignored){am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP,wake,alarm(c));}
    }
    @Override public void onReceive(Context c,Intent i){if(HIDE.equals(i.getAction()))prefs(c).edit().putBoolean("enabled",false).apply();refresh(c);}
}
