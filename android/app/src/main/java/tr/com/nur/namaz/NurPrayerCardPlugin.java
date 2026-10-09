package tr.com.nur.namaz;
import com.getcapacitor.*;
import com.getcapacitor.annotation.CapacitorPlugin;
@CapacitorPlugin(name="NurPrayerCard")
public class NurPrayerCardPlugin extends Plugin {
    @PluginMethod public void state(PluginCall call){JSObject out=new JSObject();out.put("enabled",NurPrayerCard.prefs(getContext()).getBoolean("enabled",false));out.put("style",NurPrayerCard.prefs(getContext()).getInt("style",3));out.put("permission",NurPrayerCard.allowed(getContext()));call.resolve(out);}
    @PluginMethod public void configure(PluginCall call){int style=call.getInt("style",3);if(style<1||style>3){call.reject("Geçersiz tasarım");return;}NurPrayerCard.prefs(getContext()).edit().putBoolean("enabled",Boolean.TRUE.equals(call.getBoolean("enabled",false))).putInt("style",style).apply();NurPrayerCard.refresh(getContext());state(call);}
    @PluginMethod public void sync(PluginCall call){JSObject data=call.getObject("data");if(data==null){call.reject("Vakit verisi eksik");return;}NurPrayerCard.prefs(getContext()).edit().putString("data",data.toString()).apply();NurPrayerCard.refresh(getContext());call.resolve();}
}
