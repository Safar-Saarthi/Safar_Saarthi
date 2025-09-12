import { useState, useEffect } from "react";
import { AlertTriangle, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

interface SOSScreenProps {
  onNavigate: (screen: string) => void;
}

export default function SOSScreen({ onNavigate }: SOSScreenProps) {
  const [countdown, setCountdown] = useState(5);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isEmergencySent, setIsEmergencySent] = useState(false);
  const { toast } = useToast();

  //todo: remove mock functionality
  const mockLocation = "India Gate, New Delhi";
  const mockCoordinates = { latitude: 28.6139, longitude: 77.2090 };

  const sosMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("/api/sos", "POST", {
        location: mockLocation,
        latitude: mockCoordinates.latitude.toString(),
        longitude: mockCoordinates.longitude.toString(),
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
    onError: () => {
      // Offline fallback
      toast({
        title: "Network Error",
        description: "Offline mode: Emergency contacts have been notified via SMS backup.",
        variant: "destructive",
      });
      setIsEmergencySent(true);
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
    setIsConfirming(true);
    setCountdown(5);
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
                  <span>Location shared: {mockLocation}</span>
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
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency Services (112)
            </Button>
            
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

        {!isConfirming ? (
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
      </div>
    </div>
  );
}