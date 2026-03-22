import { Header } from "@/components/Header";
import {
  Zap,
  ShoppingCart,
  Crown,
  Clock,
  MessageCircle,
  Bell,
  Video,
  Palette,
  ChevronRight,
  Sparkles,
  Shield
} from "lucide-react";

const Guide = () => {
  const sections = [
    {
      icon: Zap,
      title: "How to Generate Signals",
      content: "Tap the 'Generate Signal' button on the home screen. Enter your VIP/VVIP password when prompted. The system will generate a prediction signal for you to use.",
      color: "primary"
    },
    {
      icon: ShoppingCart,
      title: "How to Purchase Password",
      content: "Go to the Purchase page from the home screen. Choose between VIP (7 days - R150) or VVIP (14 days - R250). Tap 'Contact WhatsApp' to complete your purchase securely.",
      color: "success"
    },
    {
      icon: Crown,
      title: "VIP vs VVIP",
      subtitle: "What's the difference?",
      content: "VIP gives you 7 days of unlimited signal generation with priority support. VVIP extends this to 14 days and includes additional features like early access to new features and 24/7 premium support.",
      color: "yellow-500"
    },
    {
      icon: Clock,
      title: "How Long Does Access Last?",
      content: "VIP access lasts for 7 days from the date of purchase. VVIP access lasts for 14 days. After expiry, you'll need to purchase a new password to continue generating signals.",
      color: "blue-500"
    },
    {
      icon: MessageCircle,
      title: "Contact Support",
      content: "For any issues or questions, contact us via WhatsApp at +27 78 887 0550. We're available to help with purchases, technical issues, and general inquiries.",
      color: "green-500"
    },
    {
      icon: Bell,
      title: "Announcements",
      content: "Check the Announcements section on the home page for the latest updates, promotions, and important information. Tap on any announcement to read the full details.",
      color: "orange-500"
    },
    {
      icon: Video,
      title: "Videos Section",
      content: "Browse tutorial videos and guides in the Videos section. Use the filter tags to find specific content. Videos play directly in the app without requiring a YouTube account.",
      color: "red-500"
    },
    {
      icon: Palette,
      title: "Theme Settings",
      content: "Personalize your app by selecting a color theme in Settings. Choose from Black + Red, Black + Gold, Dark Blue + Neon, White + Red, or Pure Black themes.",
      color: "purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-28 px-4 pt-8">
      <div className="max-w-md mx-auto">
        <Header />

        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">User Guide</h2>
            <p className="text-sm text-muted-foreground">Learn how to use the app</p>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="card-darker p-6 mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Welcome to Aviator Predator</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This app helps you generate prediction signals for Aviator games.
            Follow this guide to get the most out of your experience.
          </p>
        </div>

        {/* Guide Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="card-dark p-5 animate-fade-in hover:scale-[1.02] transition-transform"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-${section.color}/20 flex items-center justify-center flex-shrink-0`}>
                  <section.icon className={`w-6 h-6 text-${section.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{section.title}</h3>
                  {section.subtitle && (
                    <p className="text-xs text-primary mb-2">{section.subtitle}</p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Footer */}
        <div className="mt-8 card-darker p-5">
          <h3 className="font-bold text-foreground mb-2">Need More Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Contact our support team for assistance with any questions or issues.
          </p>
          <a
            href="https://wa.me/27788870550?text=Hello%2C%20I%20need%20help%20with%20the%20Aviator%20app."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 btn-gradient-red rounded-xl font-bold text-foreground"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Guide;
