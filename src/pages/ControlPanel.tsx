import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import { Textarea } from "./components/ui/textarea";
import { supabase } from "./integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Lock, Settings, Bell, Users, BarChart, Key, Trash2, Plus, Crown, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

interface VipPassword {
  id: string;
  password: string;
  type: string;
  start_date: string;
  expiry_date: string;
  is_active: boolean;
}

const ControlPanel = () => {
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newVipPassword, setNewVipPassword] = useState("");
  const [newPasswordType, setNewPasswordType] = useState<"VIP" | "VVIP">("VIP");
  const [newControlPanelPassword, setNewControlPanelPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [freeSectionEnabled, setFreeSectionEnabled] = useState(true);
  const [freeSignalsCount, setFreeSignalsCount] = useState("2");
  const [announcement, setAnnouncement] = useState("");
  const [activeTab, setActiveTab] = useState("passwords");
  const [vipPasswords, setVipPasswords] = useState<VipPassword[]>([]);
  const [isLoadingPasswords, setIsLoadingPasswords] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      loadSettings();
      loadVipPasswords();
    }
  }, [isAuthenticated]);

  const loadVipPasswords = async () => {
    setIsLoadingPasswords(true);
    try {
      const { data, error } = await supabase
        .from("vip_passwords")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVipPasswords(data || []);
    } catch (error) {
      console.error("Failed to load VIP passwords:", error);
    } finally {
      setIsLoadingPasswords(false);
    }
  };

  const loadSettings = async () => {
    try {
      const { data: settings } = await supabase
        .from("app_settings")
        .select("*");

      if (settings) {
        const freeSectionSetting = settings.find(s => s.key === "free_section_enabled");
        const freeSignalsSetting = settings.find(s => s.key === "free_signals_count");
        const announcementSetting = settings.find(s => s.key === "announcement");

        if (freeSectionSetting) setFreeSectionEnabled(freeSectionSetting.value === "true");
        if (freeSignalsSetting) setFreeSignalsCount(freeSignalsSetting.value);
        if (announcementSetting) setAnnouncement(announcementSetting.value);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    try {
      const { data, error } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", "control_panel_password")
        .single();

      if (error) throw error;

      if (data.value === password) {
        setIsAuthenticated(true);
        toast.success("Access granted!");
      } else {
        toast.error("Incorrect password.");
      }
    } catch (error) {
      toast.error("Failed to verify password.");
    } finally {
      setIsVerifying(false);
      setPassword("");
    }
  };

  const handleCreateVipPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVipPassword.trim()) {
      toast.error("Please enter a password");
      return;
    }

    setIsUpdating(true);

    try {
      const startDate = new Date();
      const daysToAdd = newPasswordType === "VIP" ? 7 : 14;
      const expiryDate = new Date(startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

      const { error } = await supabase
        .from("vip_passwords")
        .insert({
          password: newVipPassword,
          type: newPasswordType,
          start_date: startDate.toISOString(),
          expiry_date: expiryDate.toISOString(),
          is_active: true,
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("This password already exists. Please use a different one.");
        } else {
          throw error;
        }
        return;
      }

      toast.success(`${newPasswordType} password created successfully!`);
      setNewVipPassword("");
      loadVipPasswords();
    } catch (error) {
      toast.error("Failed to create password.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePassword = async (id: string) => {
    try {
      const { error } = await supabase
        .from("vip_passwords")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Password deleted successfully!");
      loadVipPasswords();
    } catch (error) {
      toast.error("Failed to delete password.");
    }
  };

  const handleTogglePasswordStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("vip_passwords")
        .update({ is_active: !isActive })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Password ${!isActive ? "activated" : "deactivated"}!`);
      loadVipPasswords();
    } catch (error) {
      toast.error("Failed to update password status.");
    }
  };

  const handleUpdateControlPanelPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from("app_settings")
        .update({ value: newControlPanelPassword })
        .eq("key", "control_panel_password");

      if (error) throw error;

      toast.success("Control Panel password updated successfully!");
      setNewControlPanelPassword("");
    } catch (error) {
      toast.error("Failed to update Control Panel password.");
    } finally {
      setIsUpdating(false);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      const { data: existing } = await supabase
        .from("app_settings")
        .select("*")
        .eq("key", key)
        .single();

      if (existing) {
        await supabase
          .from("app_settings")
          .update({ value })
          .eq("key", key);
      } else {
        await supabase
          .from("app_settings")
          .insert({ key, value });
      }

      toast.success("Setting updated!");
    } catch (error) {
      toast.error("Failed to update setting.");
    }
  };

  const handleToggleFreeSection = async (checked: boolean) => {
    setFreeSectionEnabled(checked);
    await updateSetting("free_section_enabled", checked.toString());
  };

  const handleUpdateFreeSignals = async () => {
    await updateSetting("free_signals_count", freeSignalsCount);
  };

  const handlePublishAnnouncement = async () => {
    await updateSetting("announcement", announcement);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-32">
        <div className="px-4 pt-8">
          <div className="max-w-md mx-auto mt-12">
            <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-3xl p-8 border-4 border-primary animate-fade-in">
              <div className="flex flex-col items-center mb-8">
                <div className="bg-primary rounded-full p-6 mb-4">
                  <Lock className="w-12 h-12 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Control Panel</h2>
                <p className="text-foreground/80 text-center">
                  Enter password to access control panel
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter control panel password"
                    className="bg-background border-primary text-foreground text-lg py-6 rounded-2xl"
                    disabled={isVerifying}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isVerifying || !password}
                  className="w-full bg-primary text-foreground rounded-2xl text-lg py-6 font-bold hover:bg-primary/90"
                >
                  {isVerifying ? "Verifying..." : "Access Panel"}
                </Button>

                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="w-full border-primary text-foreground rounded-2xl text-lg py-6 font-bold hover:bg-primary/10"
                >
                  Back
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 flex flex-col md:flex-row">
      {/* Side Navigation */}
      <div className="w-full md:w-64 bg-gradient-to-b from-red-900 to-red-700 border-b-4 md:border-r-4 md:border-b-0 border-primary p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-8">Control Panel</h2>
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 md:w-full justify-start text-foreground hover:bg-primary/20 whitespace-nowrap ${activeTab === 'passwords' ? 'bg-primary/30' : ''}`}
            onClick={() => setActiveTab('passwords')}
          >
            <Key className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">VIP Passwords</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 md:w-full justify-start text-foreground hover:bg-primary/20 whitespace-nowrap ${activeTab === 'control' ? 'bg-primary/30' : ''}`}
            onClick={() => setActiveTab('control')}
          >
            <Settings className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Control</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 md:w-full justify-start text-foreground hover:bg-primary/20 whitespace-nowrap ${activeTab === 'settings' ? 'bg-primary/30' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Users className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">App Settings</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 md:w-full justify-start text-foreground hover:bg-primary/20 whitespace-nowrap ${activeTab === 'announcements' ? 'bg-primary/30' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <Bell className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Announcements</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 md:w-full justify-start text-foreground hover:bg-primary/20 whitespace-nowrap ${activeTab === 'stats' ? 'bg-primary/30' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <BarChart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm md:text-base">Statistics</span>
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-8">
          <div className="max-w-3xl mx-auto">
            {activeTab === 'passwords' && (
              <div className="space-y-6 animate-fade-in">
                {/* Create New Password */}
                <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-3xl p-6 md:p-8 border-4 border-primary">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Plus className="w-6 h-6" />
                    Create New Password
                  </h3>
                  <form onSubmit={handleCreateVipPassword} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-foreground text-base mb-2">Password Type</Label>
                        <Select value={newPasswordType} onValueChange={(v: "VIP" | "VVIP") => setNewPasswordType(v)}>
                          <SelectTrigger className="bg-background border-primary text-foreground py-6 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VIP">VIP (7 Days - R150)</SelectItem>
                            <SelectItem value="VVIP">VVIP (14 Days - R250)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-foreground text-base mb-2">Password</Label>
                        <Input
                          type="text"
                          value={newVipPassword}
                          onChange={(e) => setNewVipPassword(e.target.value)}
                          placeholder="Enter unique password"
                          className="bg-background border-primary text-foreground py-6 rounded-xl"
                          disabled={isUpdating}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={isUpdating || !newVipPassword}
                      className="w-full bg-primary text-foreground rounded-xl text-lg py-6 font-bold hover:bg-primary/90"
                    >
                      {isUpdating ? "Creating..." : "Create Password"}
                    </Button>
                  </form>
                </div>

                {/* Password List */}
                <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-3xl p-6 md:p-8 border-4 border-primary">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Active Passwords</h3>

                  {isLoadingPasswords ? (
                    <p className="text-foreground/70">Loading passwords...</p>
                  ) : vipPasswords.length === 0 ? (
                    <p className="text-foreground/70">No passwords created yet.</p>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {vipPasswords.map((pwd) => (
                        <div
                          key={pwd.id}
                          className={`bg-background/20 rounded-xl p-4 flex items-center justify-between ${
                            isExpired(pwd.expiry_date) ? 'opacity-60' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              pwd.type === "VVIP" ? "bg-yellow-500/20" : "bg-primary/20"
                            }`}>
                              {pwd.type === "VVIP" ? (
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                              ) : (
                                <Crown className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{pwd.password}</p>
                              <p className="text-xs text-foreground/70">
                                {pwd.type} • Expires: {formatDate(pwd.expiry_date)}
                                {isExpired(pwd.expiry_date) && " (Expired)"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={pwd.is_active}
                              onCheckedChange={() => handleTogglePasswordStatus(pwd.id, pwd.is_active)}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePassword(pwd.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'control' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-3xl p-6 md:p-8 border-4 border-primary">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Update Control Panel Password</h3>
                  <form onSubmit={handleUpdateControlPanelPassword} className="space-y-6">
                    <div>
                      <Label htmlFor="controlPanelPassword" className="text-foreground text-base md:text-lg mb-2">
                        New Control Panel Password
                      </Label>
                      <Input
                        id="controlPanelPassword"
                        type="text"
                        value={newControlPanelPassword}
                        onChange={(e) => setNewControlPanelPassword(e.target.value)}
                        placeholder="Enter new control panel password"
                        className="bg-background border-primary text-foreground text-base md:text-lg py-4 md:py-6 rounded-2xl"
                        disabled={isUpdating}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isUpdating || !newControlPanelPassword}
                      className="w-full bg-primary text-foreground rounded-2xl text-base md:text-lg py-4 md:py-6 font-bold hover:bg-primary/90"
                    >
                      {isUpdating ? "Updating..." : "Update Control Panel Password"}
                    </Button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-3xl p-6 md:p-8 border-4 border-primary">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">App Settings</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-foreground text-base md:text-lg">Free Section</Label>
                        <p className="text-foreground/70 text-xs md:text-sm">Enable or disable the free section</p>
                      </div>
                      <Switch
                        checked={freeSectionEnabled}
                        onCheckedChange={handleToggleFreeSection}
                      />
                    </div>

                    <div>
                      <Label htmlFor="freeSignals" className="text-foreground text-base md:text-lg mb-2">
                        Free Signals Count
                      </Label>
                      <div className="flex gap-3">
                        <Input
                          id="freeSignals"
                          type="number"
                          value={freeSignalsCount}
                          onChange={(e) => setFreeSignalsCount(e.target.value)}
                          className="bg-background border-primary text-foreground text-base md:text-lg py-4 md:py-6 rounded-2xl"
                          min="0"
                          max="10"
                        />
                        <Button
                          onClick={handleUpdateFreeSignals}
                          className="bg-primary text-foreground rounded-2xl px-6 md:px-8 font-bold hover:bg-primary/90"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-3xl p-6 md:p-8 border-4 border-primary animate-fade-in">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Live Announcements</h3>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="announcement" className="text-foreground text-base md:text-lg mb-2">
                      Announcement Message
                    </Label>
                    <Textarea
                      id="announcement"
                      value={announcement}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      placeholder="Enter announcement message..."
                      className="bg-background border-primary text-foreground text-base md:text-lg py-4 rounded-2xl min-h-32"
                    />
                  </div>

                  <Button
                    onClick={handlePublishAnnouncement}
                    className="w-full bg-primary text-foreground rounded-2xl text-base md:text-lg py-4 md:py-6 font-bold hover:bg-primary/90"
                  >
                    Publish Announcement
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-3xl p-6 md:p-8 border-4 border-primary animate-fade-in">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/20 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">{vipPasswords.length}</p>
                    <p className="text-sm text-foreground/70">Total Passwords</p>
                  </div>
                  <div className="bg-background/20 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">
                      {vipPasswords.filter(p => p.is_active && !isExpired(p.expiry_date)).length}
                    </p>
                    <p className="text-sm text-foreground/70">Active Passwords</p>
                  </div>
                  <div className="bg-background/20 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">
                      {vipPasswords.filter(p => p.type === "VIP").length}
                    </p>
                    <p className="text-sm text-foreground/70">VIP Passwords</p>
                  </div>
                  <div className="bg-background/20 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">
                      {vipPasswords.filter(p => p.type === "VVIP").length}
                    </p>
                    <p className="text-sm text-foreground/70">VVIP Passwords</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={() => {
                setIsAuthenticated(false);
                navigate("/");
              }}
              variant="outline"
              className="w-full border-primary text-foreground rounded-2xl text-base md:text-lg py-4 md:py-6 font-bold hover:bg-primary/10 mt-6"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
