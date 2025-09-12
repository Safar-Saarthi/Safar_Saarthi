import { useState } from "react";
import { User, Globe, Shield, QrCode, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";
import { useEffect } from "react";

export default function ProfileScreen() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [locationSharing, setLocationSharing] = useState(true);
  const [language, setLanguage] = useState("en");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  // Generate QR code for digital tourist ID
  useEffect(() => {
    const generateQRCode = async () => {
      //todo: remove mock functionality
      const digitalId = {
        id: (user as any)?.id || "tourist-123",
        name: `${(user as any)?.firstName || "Tourist"} ${(user as any)?.lastName || "User"}`,
        email: (user as any)?.email || "tourist@example.com",
        type: "Digital Tourist ID",
        issued: new Date().toISOString(),
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
      };
      
      try {
        const url = await QRCode.toDataURL(JSON.stringify(digitalId), {
          width: 200,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF"
          }
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [user]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast({
      title: "Language Updated",
      description: `Language changed to ${newLanguage === "en" ? "English" : newLanguage === "hi" ? "Hindi" : "Spanish"}`,
    });
  };

  const handleLocationSharingChange = (enabled: boolean) => {
    setLocationSharing(enabled);
    toast({
      title: enabled ? "Location Sharing Enabled" : "Location Sharing Disabled",
      description: enabled 
        ? "Your location can now be shared with emergency contacts"
        : "Location sharing has been turned off",
    });
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="flex-1 overflow-auto pb-20">
      <div className="p-4">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
            {(user as any)?.profileImageUrl ? (
              <img
                src={(user as any).profileImageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-primary" />
            )}
          </div>
          <h1 className="text-2xl font-bold" data-testid="text-user-name">
            {(user as any)?.firstName ? 
              `${(user as any).firstName} ${(user as any).lastName || ''}`.trim() : 
              "Tourist User"
            }
          </h1>
          <p className="text-muted-foreground" data-testid="text-user-email">
            {(user as any)?.email || "tourist@example.com"}
          </p>
        </div>

        {/* Digital Tourist ID */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Digital Tourist ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {qrCodeUrl ? (
                <div className="space-y-4">
                  <img 
                    src={qrCodeUrl} 
                    alt="Digital Tourist ID QR Code" 
                    className="mx-auto border rounded-lg"
                    data-testid="img-qr-code"
                  />
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code for instant tourist ID verification
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    data-testid="button-download-qr"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.download = 'tourist-id-qr.png';
                      link.href = qrCodeUrl;
                      link.click();
                    }}
                  >
                    Download QR Code
                  </Button>
                </div>
              ) : (
                <div className="p-8">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">Generating QR code...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language & Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Language</label>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="es">Español (Spanish)</SelectItem>
                    <SelectItem value="fr">Français (French)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Location Sharing</h4>
                  <p className="text-sm text-muted-foreground">
                    Allow sharing location with emergency contacts
                  </p>
                </div>
                <Switch
                  data-testid="switch-location-sharing"
                  checked={locationSharing}
                  onCheckedChange={handleLocationSharingChange}
                />
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Emergency Contacts</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Manage who gets notified during emergencies
                </p>
                <Button variant="outline" size="sm" data-testid="button-manage-contacts">
                  Manage Contacts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                data-testid="button-safety-preferences"
              >
                Safety Preferences
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                data-testid="button-travel-history"
              >
                Travel History
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                data-testid="button-help-support"
              >
                Help & Support
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full justify-start"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}