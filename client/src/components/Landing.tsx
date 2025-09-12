import { Shield, MapPin, AlertTriangle, Users, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const features = [
    {
      icon: AlertTriangle,
      title: "Emergency SOS",
      description: "One-tap emergency assistance with automatic location sharing"
    },
    {
      icon: MapPin,
      title: "Safety Mapping", 
      description: "Real-time safety zones and risk area notifications"
    },
    {
      icon: Lightbulb,
      title: "Safety Tips",
      description: "Expert travel safety advice and local insights"
    },
    {
      icon: Users,
      title: "Community Alerts",
      description: "Crowdsourced safety information from fellow travelers"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-chart-2/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-2/10" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Logo and Title */}
            <div className="space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Safar Saarthi
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Your proactive tourist safety companion - Stay safe, travel smart, explore confidently
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <Button 
                onClick={handleLogin}
                size="lg"
                className="text-lg px-8 py-6 h-auto"
                data-testid="button-get-started"
              >
                Get Started - Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Secure login with Google, GitHub, or email
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Emergency Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-2">Real-time</div>
                <div className="text-sm text-muted-foreground">Safety Alerts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">Global</div>
                <div className="text-sm text-muted-foreground">Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Safety Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay safe while exploring the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover-elevate cursor-pointer transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Safar Saarthi Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, intuitive safety features designed for modern travelers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold">Create Your Profile</h3>
              <p className="text-sm text-muted-foreground">
                Sign up and set your emergency contacts and preferences
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-chart-2/10 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-chart-2">2</span>
              </div>
              <h3 className="font-semibold">Get Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">
                Receive location-based safety alerts and recommendations
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-500/10 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="font-semibold">Travel With Confidence</h3>
              <p className="text-sm text-muted-foreground">
                Explore knowing help is just one tap away
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to Travel Safely?</h2>
          <p className="text-muted-foreground">
            Join thousands of travelers who trust Safar Saarthi for their safety
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleLogin}
              size="lg"
              data-testid="button-sign-in-bottom"
            >
              Sign In to Continue
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold">Safar Saarthi</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your trusted companion for safe travels. Available 24/7 worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}