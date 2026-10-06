package tr.com.nur.namaz;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.location.LocationManager;
import android.provider.Settings;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

@CapacitorPlugin(name="NurLocationAccess", permissions={
    @Permission(alias="location", strings={Manifest.permission.ACCESS_FINE_LOCATION}),
    @Permission(alias="coarseLocation", strings={Manifest.permission.ACCESS_COARSE_LOCATION})
})
public class NurLocationAccessPlugin extends Plugin {
    @PluginMethod
    public void servicesEnabled(PluginCall call) {
        LocationManager manager=(LocationManager)getContext().getSystemService(Context.LOCATION_SERVICE);
        boolean enabled=manager!=null && (manager.isProviderEnabled(LocationManager.GPS_PROVIDER) || manager.isProviderEnabled(LocationManager.NETWORK_PROVIDER));
        JSObject result=new JSObject(); result.put("enabled",enabled); call.resolve(result);
    }
    @PluginMethod
    public void openSettings(PluginCall call) {
        try { getActivity().startActivity(new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)); call.resolve(); }
        catch(Exception error){call.reject("Konum ayarları açılamadı",error);}
    }
}
