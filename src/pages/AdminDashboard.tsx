import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, LogOut, Upload, X } from "lucide-react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_OPTIONS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];

interface Therapist {
  id: string;
  name: string;
  specialties: string[];
  photo_url: string | null;
  available: boolean;
}

interface AvailabilitySlot {
  id: string;
  therapist_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"therapists" | "availability">("therapists");

  // New therapist form
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formSpecialties, setFormSpecialties] = useState("");
  const [formPhoto, setFormPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Edit therapist
  const [editingId, setEditingId] = useState<string | null>(null);

  // Availability form
  const [slotTherapist, setSlotTherapist] = useState("");
  const [slotDay, setSlotDay] = useState(1);
  const [slotStart, setSlotStart] = useState("09:00");
  const [slotEnd, setSlotEnd] = useState("10:30");

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin/login");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const [therapistsRes, slotsRes] = await Promise.all([
      supabase.from("therapists").select("*").order("created_at"),
      supabase.from("availability_slots").select("*").order("day_of_week"),
    ]);
    if (therapistsRes.data) setTherapists(therapistsRes.data);
    if (slotsRes.data) setSlots(slotsRes.data);
    setLoading(false);
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("therapist-photos").upload(path, file);
    if (error) {
      toast.error("Failed to upload photo");
      return null;
    }
    const { data } = supabase.storage.from("therapist-photos").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleAddTherapist = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let photoUrl: string | null = null;
    if (formPhoto) {
      photoUrl = await uploadPhoto(formPhoto);
    }

    const { error } = await supabase.from("therapists").insert({
      name: formName,
      specialties: formSpecialties.split(",").map((s) => s.trim()).filter(Boolean),
      photo_url: photoUrl,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Therapist added");
      setShowForm(false);
      setFormName("");
      setFormSpecialties("");
      setFormPhoto(null);
      fetchData();
    }
    setSaving(false);
  };

  const handleUpdatePhoto = async (therapistId: string, file: File) => {
    const photoUrl = await uploadPhoto(file);
    if (!photoUrl) return;

    const { error } = await supabase
      .from("therapists")
      .update({ photo_url: photoUrl })
      .eq("id", therapistId);

    if (error) toast.error(error.message);
    else {
      toast.success("Photo updated");
      fetchData();
    }
  };

  const handleToggleAvailable = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("therapists")
      .update({ available: !current })
      .eq("id", id);
    if (error) toast.error(error.message);
    else fetchData();
  };

  const handleDeleteTherapist = async (id: string) => {
    if (!confirm("Delete this therapist?")) return;
    const { error } = await supabase.from("therapists").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      fetchData();
    }
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slotTherapist) {
      toast.error("Select a therapist");
      return;
    }
    const { error } = await supabase.from("availability_slots").insert({
      therapist_id: slotTherapist,
      day_of_week: slotDay,
      start_time: slotStart,
      end_time: slotEnd,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Slot added");
      fetchData();
    }
  };

  const handleDeleteSlot = async (id: string) => {
    const { error } = await supabase.from("availability_slots").delete().eq("id", id);
    if (error) toast.error(error.message);
    else fetchData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-lg">Oyin Admin</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 hover:opacity-100">
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-border mb-8">
          <button
            onClick={() => setActiveTab("therapists")}
            className={`pb-3 text-sm tracking-widest uppercase transition-colors ${
              activeTab === "therapists" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            Therapists
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`pb-3 text-sm tracking-widest uppercase transition-colors ${
              activeTab === "availability" ? "text-foreground border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            Availability
          </button>
        </div>

        {/* Therapists Tab */}
        {activeTab === "therapists" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl text-foreground">Manage Therapists</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {showForm ? <X size={14} /> : <Plus size={14} />}
                {showForm ? "Cancel" : "Add"}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleAddTherapist} className="border border-border p-6 mb-8 space-y-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">Name</label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">Specialties (comma-separated)</label>
                  <input
                    value={formSpecialties}
                    onChange={(e) => setFormSpecialties(e.target.value)}
                    placeholder="Deep Tissue, Relaxation"
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormPhoto(e.target.files?.[0] || null)}
                    className="text-sm text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-xs tracking-widest uppercase bg-accent text-accent-foreground hover:bg-accent/80 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Therapist"}
                </button>
              </form>
            )}

            <div className="space-y-4">
              {therapists.map((t) => (
                <div key={t.id} className="border border-border p-5 flex items-center gap-5">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-muted">
                    {t.photo_url ? (
                      <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No photo</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-foreground">{t.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {t.specialties.map((s) => (
                        <span key={s} className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-muted text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={t.available}
                        onChange={() => handleToggleAvailable(t.id, t.available)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpdatePhoto(t.id, file);
                        }}
                      />
                      <Upload size={16} className="text-muted-foreground hover:text-foreground" />
                    </label>
                    <button onClick={() => handleDeleteTherapist(t.id)}>
                      <Trash2 size={16} className="text-destructive hover:text-destructive/80" />
                    </button>
                  </div>
                </div>
              ))}
              {therapists.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No therapists added yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === "availability" && (
          <div>
            <h2 className="font-serif text-xl text-foreground mb-6">Manage Availability</h2>

            <form onSubmit={handleAddSlot} className="border border-border p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">Therapist</label>
                <select
                  value={slotTherapist}
                  onChange={(e) => setSlotTherapist(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Select therapist</option>
                  {therapists.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">Day</label>
                <select
                  value={slotDay}
                  onChange={(e) => setSlotDay(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                >
                  {DAYS.map((d, i) => (
                    <option key={i} value={i}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">Start</label>
                  <select
                    value={slotStart}
                    onChange={(e) => setSlotStart(e.target.value)}
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  >
                    {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">End</label>
                  <select
                    value={slotEnd}
                    onChange={(e) => setSlotEnd(e.target.value)}
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  >
                    {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="px-6 py-2 text-xs tracking-widest uppercase bg-accent text-accent-foreground hover:bg-accent/80"
                >
                  Add Slot
                </button>
              </div>
            </form>

            {/* Slots grouped by therapist */}
            {therapists.map((t) => {
              const tSlots = slots.filter((s) => s.therapist_id === t.id);
              if (tSlots.length === 0) return null;
              return (
                <div key={t.id} className="mb-6">
                  <h3 className="font-serif text-lg text-foreground mb-3">{t.name}</h3>
                  <div className="space-y-2">
                    {tSlots.map((s) => (
                      <div key={s.id} className="flex items-center justify-between border border-border px-4 py-3">
                        <span className="text-sm text-foreground">
                          {DAYS[s.day_of_week]} — {s.start_time.slice(0, 5)} to {s.end_time.slice(0, 5)}
                        </span>
                        <button onClick={() => handleDeleteSlot(s.id)}>
                          <Trash2 size={14} className="text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
