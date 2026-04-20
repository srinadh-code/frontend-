import { useEffect, useState } from "react";
import { API } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Calendar } from "lucide-react";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await API.get("profile/");
        setProfile(data);
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error("Failed to load profile", error);
        toast({ title: "Error", description: "Unable to load profile" });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

  const handleUpdate = async () => {
    try {
      const { data } = await API.put("profile/", formData);
      setProfile(data.data);
      setEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update profile" });
    }
  };

  if (loading) return <p>Loading profile...</p>;

  if (!profile) return <p>Unable to load profile</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-2">View and manage your account</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-8 space-y-6">
        {/* Profile Header */}
        <div className="flex items-start justify-between pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {profile.first_name || profile.username}
              </h2>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <Button
            variant={editing ? "outline" : "default"}
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel" : "Edit"}
          </Button>
        </div>

        {/* Profile Details */}
        {!editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Username</Label>
                <p className="text-lg font-medium">{profile.username}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">First Name</Label>
                <p className="text-lg font-medium">
                  {profile.first_name || "Not set"}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Last Name</Label>
                <p className="text-lg font-medium">
                  {profile.last_name || "Not set"}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </Label>
                <p className="text-lg font-medium">{profile.email}</p>
              </div>
            </div>

            <div className="pt-4">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Member Since
              </Label>
              <p className="text-lg font-medium">
                {new Date(profile.date_joined).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </div>

            <Button className="w-full sm:w-auto" onClick={handleUpdate}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Additional Info */}
      
    </div>
  );
};

export default Profile;
