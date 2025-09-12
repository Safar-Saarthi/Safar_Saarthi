import { useState, useEffect } from "react";
import { AlertTriangle, MapPin, Phone, Clock, Shield, Users, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import type { EmergencyContact } from "@shared/schema";

interface SOSScreenProps {
  onNavigate: (screen: string) => void;
}

export default function SOSScreen({ onNavigate }: SOSScreenProps) {
  const [countdown, setCountdown] = useState(5);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEmergencySent, setIsEmergencySent] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Updated location to RGIPT, Jais, Amethi
  const currentLocation = "RGIPT, Jais, Amethi, Uttar Pradesh";
  const currentCoordinates = { latitude: 26.15, longitude: 81.51 };

  // Fetch emergency contacts from database
  const { data: emergencyContacts = [], isLoading: contactsLoading } = useQuery<EmergencyContact[]>({
    queryKey: ['/api/emergency-contacts'],
  });

  const sosMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/sos", "POST", {
        location: currentLocation,
        latitude: currentCoordinates.latitude.toString(),
        longitude: currentCoordinates.longitude.toString(),
      });
    },
    onSuccess: () => {
      setIsEmergencySent(true);
      toast({
        title: "Emergency Alert Sent!",
        description: "Help is on the way. Stay calm and safe.",
        variant: "default",
      });
    },
    onError: (error: any) => {
      console.error("SOS Error:", error);
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to send emergency alerts. You can still call emergency services directly.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to Send Alert",
          description: "Unable to send emergency alert. Please call emergency services directly at 112.",
          variant: "destructive",
        });
      }
      // Do NOT set isEmergencySent to true on error
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isConfirming && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isConfirming && countdown === 0) {
      handleConfirmSOS();
    }

    return () => clearTimeout(timer);
  }, [isConfirming, countdown]);

  const handleSOSClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to send emergency alerts with location sharing.",
        variant: "destructive",
      });
      return;
    }
    setIsConfirming(true);
    setCountdown(5);
  };

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setCountdown(5);
  };

  const handleConfirmSOS = () => {
    setIsConfirming(false);
    sosMutation.mutate();
  };

  if (isEmergencySent) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-20">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-chart-2 rounded-full mx-auto flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-chart-2 mb-2" data-testid="text-sos-sent">
              Emergency Alert Sent!
            </h1>
            <p className="text-muted-foreground">
              Your emergency contacts and local authorities have been notified.
            </p>
          </div>

          <Card>
            <CardContent className="pt-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Location shared: {currentLocation}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Alert sent at: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              data-testid="button-call-emergency"
              variant="destructive" 
              className="w-full"
              onClick={() => window.open('tel:112')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency Services (112)
            </Button>
            
            {!contactsLoading && emergencyContacts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {emergencyContacts.slice(0, 4).map((contact) => (
                      <Button
                        key={contact.id}
                        variant="outline"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => window.open(`tel:${contact.phoneNumber}`)}
                        data-testid={`button-contact-${contact.type}`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 text-left">
                            <div className="font-medium text-sm">{contact.name}</div>
                            <div className="text-xs text-muted-foreground">{contact.phoneNumber}</div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {contact.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Button 
              data-testid="button-back-home"
              variant="outline" 
              onClick={() => onNavigate("home")}
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 pb-20">
      <div className="text-center space-y-8 max-w-md">
        <div>
          <div className="w-24 h-24 bg-destructive rounded-full mx-auto flex items-center justify-center mb-6">
            <AlertTriangle className="h-12 w-12 text-destructive-foreground" />
          </div>
          
          <h1 className="text-3xl font-bold text-destructive mb-2" data-testid="text-emergency-title">
            Emergency SOS
          </h1>
          <p className="text-muted-foreground">
            This will immediately alert emergency services and your emergency contacts
          </p>
        </div>

        {authLoading ? (
          <div className="w-full h-16 bg-muted rounded-lg animate-pulse flex items-center justify-center">
            <span className="text-muted-foreground">Loading...</span>
          </div>
        ) : !isAuthenticated ? (
          <div className="space-y-4">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-4">
                <div className="text-center space-y-3">
                  <LogIn className="h-8 w-8 mx-auto text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-800">Sign In Required</h3>
                    <p className="text-sm text-orange-700 mt-1">
                      To send emergency alerts with location sharing, please sign in to your account.
                    </p>
                  </div>
                  <Button
                    data-testid="button-sos-login"
                    onClick={handleLogin}
                    variant="default"
                    className="w-full"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In to Enable SOS
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Button
              data-testid="button-emergency-call-direct"
              onClick={() => window.open('tel:112')}
              variant="destructive"
              size="lg"
              className="w-full h-16 text-lg font-semibold"
            >
              <Phone className="h-6 w-6 mr-2" />
              CALL EMERGENCY (112)
            </Button>
          </div>
        ) : !isConfirming ? (
          <Button
            data-testid="button-activate-sos"
            onClick={handleSOSClick}
            variant="destructive"
            size="lg"
            className="w-full h-16 text-lg font-semibold"
          >
            <AlertTriangle className="h-6 w-6 mr-2" />
            ACTIVATE SOS
          </Button>
        ) : (
          <div className="space-y-6">
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-center text-destructive" data-testid="text-countdown">
                  Sending SOS in {countdown} seconds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl font-mono font-bold text-destructive">
                    {countdown}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Auto-confirming emergency alert...
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                data-testid="button-confirm-sos"
                onClick={handleConfirmSOS}
                variant="destructive"
                size="lg"
                className="w-full h-12"
                disabled={sosMutation.isPending}
              >
                {sosMutation.isPending ? "Sending..." : "CONFIRM SOS NOW"}
              </Button>
              
              <Button
                data-testid="button-cancel-sos"
                onClick={handleCancel}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-4">
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span>Emergency services will be contacted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span>Your location will be shared</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span>Emergency contacts will be notified</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {!contactsLoading && emergencyContacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Quick Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {emergencyContacts.slice(0, 4).map((contact) => (
                    <Button
                      key={contact.id}
                      variant="outline"
                      size="sm"
                      className="h-auto p-2 flex-col gap-1"
                      onClick={() => window.open(`tel:${contact.phoneNumber}`)}
                      data-testid={`button-quick-${contact.type}`}
                    >
                      <Phone className="h-3 w-3" />
                      <span className="text-xs font-medium">{contact.name.split(' ')[0]}</span>
                      <span className="text-xs text-muted-foreground">{contact.phoneNumber}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}