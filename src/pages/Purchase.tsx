import { Header } from "./components/Header";
import { CreditCard, Crown, Sparkles, Check, Shield, MessageCircle } from "lucide-react";

const Purchase = () => {
  const handleWhatsAppContact = () => {
    const phoneNumber = "27788870550";
    const message = encodeURIComponent("Hello, I would like to buy the VIP password (7 days) or VVIP password (14 days).");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const plans = [
    {
      name: "VIP",
      duration: "7 Days",
      price: "R150",
      icon: Crown,
      color: "primary",
      features: ["80% accurate signals", "Generates up to 6 signals per day", "Priority support", "7-day access"],
    },
    {
      name: "VVIP",
      duration: "14 Days",
      price: "R250",
      icon: Sparkles,
      color: "yellow-500",
      popular: true,
      features: ["95% accurate signals", "Unlimited signal generation", "24/7 VIP support", "14-day access", "Early feature access"],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-28 px-4 pt-8">
      <div className="max-w-md mx-auto">
        <Header />

        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Purchase</h2>
            <p className="text-sm text-muted-foreground">Upgrade to premium</p>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="card-darker p-4 mb-6 animate-fade-in stagger-1">
          <h3 className="font-bold text-foreground mb-4 text-center">Pricing Options</h3>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-foreground">Type</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-foreground">Duration</th>
                  <th className="py-3 px-4 text-right text-sm font-semibold text-foreground">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="py-3 px-4 text-foreground font-medium">VIP</td>
                  <td className="py-3 px-4 text-center text-muted-foreground">7 Days</td>
                  <td className="py-3 px-4 text-right text-primary font-bold">R150</td>
                </tr>
                <tr className="border-t border-border bg-primary/5">
                  <td className="py-3 px-4 text-foreground font-medium flex items-center gap-2">
                    VVIP
                    <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">BEST</span>
                  </td>
                  <td className="py-3 px-4 text-center text-muted-foreground">14 Days</td>
                  <td className="py-3 px-4 text-right text-primary font-bold">R250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`card-dark p-5 relative animate-fade-in-scale ${plan.popular ? 'ring-2 ring-yellow-500' : ''}`}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 rounded-full text-xs font-bold text-black">
                  BEST VALUE
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-${plan.color}/20 flex items-center justify-center`}>
                    <plan.icon className={`w-6 h-6 text-${plan.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.duration}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary">{plan.price}</p>
              </div>

              <div className="space-y-2 mb-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Contact Button */}
        <button
          onClick={handleWhatsAppContact}
          className="w-full mt-6 py-4 btn-gradient-red rounded-xl font-bold text-foreground flex items-center justify-center gap-3 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <MessageCircle className="w-6 h-6" />
          Contact via WhatsApp
        </button>

        <div className="mt-6 card-darker p-4 flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Shield className="w-6 h-6 text-success flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Secure payment via WhatsApp. Money-back guarantee within 24 hours if not satisfied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
