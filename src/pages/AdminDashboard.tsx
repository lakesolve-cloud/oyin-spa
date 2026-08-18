import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, LogOut, Upload, X } from "lucide-react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const TIME_OPTIONS = [
  ...Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`),
  "23:59",
];

type ServiceMode = "walk_in" | "mobile" | "both";

interface Therapist {
  id: string;
  name: string;
  specialties: string[];
  photo_url: string[] | null;
  available: boolean;
  service_mode: ServiceMode;
}

interface AvailabilitySlot {
  id: string;
  therapist_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

const SERVICE_MODE_LABEL: Record<ServiceMode, string> = {
  walk_in: "Walk-In Only",
  mobile: "Mobile Only",
  both: "Walk-In & Mobile",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"therapists" | "availability">(
    "therapists",
  );

  // New therapist form
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formSpecialties, setFormSpecialties] = useState("");
  const [formPhotos, setFormPhotos] = useState<File[]>([]);
  const [formServiceMode, setFormServiceMode] = useState<ServiceMode>("both");
  const [saving, setSaving] = useState(false);

  // Edit therapist
  const [editingId, setEditingId] = useState<string | null>(null);

  // Availability form
  const [slotTherapist, setSlotTherapist] = useState("");
  const [slotDays, setSlotDays] = useState<number[]>([1]);
  const [slotStart, setSlotStart] = useState("12:00");
  const [slotEnd, setSlotEnd] = useState("00:00");

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
    if (therapistsRes.data) setTherapists(therapistsRes.data as Therapist[]);
    if (slotsRes.data) setSlots(slotsRes.data);
    setLoading(false);
  };

  const uploadPhoto = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage
      .from("therapist-photos")
      .upload(path, file);
    if (error) {
      toast.error("Failed to upload photo");
      return null;
    }
    const { data } = supabase.storage
      .from("therapist-photos")
      .getPublicUrl(path);
    return data.publicUrl;
  };

  const uploadPhotos = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const url = await uploadPhoto(file);
      if (url) urls.push(url);
    }
    return urls;
  };

  const handleAddTherapist = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const photoUrls = formPhotos.length ? await uploadPhotos(formPhotos) : [];

    const { error } = await supabase.from("therapists").insert({
      name: formName,
      specialties: formSpecialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      photo_url: photoUrls,
      service_mode: formServiceMode,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Therapist added");
      setShowForm(false);
      setFormName("");
      setFormSpecialties("");
      setFormPhotos([]);
      setFormServiceMode("both");
      fetchData();
    }
    setSaving(false);
  };

  const handleAddPhotos = async (therapistId: string, files: File[]) => {
    const newUrls = await uploadPhotos(files);
    if (newUrls.length === 0) return;

    const therapist = therapists.find((t) => t.id === therapistId);
    const existing = therapist?.photo_url ?? [];
    const merged = [...existing, ...newUrls];

    const { error } = await supabase
      .from("therapists")
      .update({ photo_url: merged })
      .eq("id", therapistId);

    if (error) toast.error(error.message);
    else {
      toast.success(
        `${newUrls.length} photo${newUrls.length > 1 ? "s" : ""} added`,
      );
      fetchData();
    }
  };

  const handleRemovePhoto = async (therapistId: string, photoUrl: string) => {
    const therapist = therapists.find((t) => t.id === therapistId);
    const existing = therapist?.photo_url ?? [];
    const updated = existing.filter((url) => url !== photoUrl);

    const { error } = await supabase
      .from("therapists")
      .update({ photo_url: updated })
      .eq("id", therapistId);

    if (error) toast.error(error.message);
    else {
      toast.success("Photo removed");
      fetchData();
    }
  };

  const handleUpdateServiceMode = async (id: string, mode: ServiceMode) => {
    const { error } = await supabase
      .from("therapists")
      .update({ service_mode: mode })
      .eq("id", id);
    if (error) toast.error(error.message);
    else fetchData();
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
    if (slotDays.length === 0) {
      toast.error("Select at least one day");
      return;
    }
    const rows = slotDays.map((d) => ({
      therapist_id: slotTherapist,
      day_of_week: d,
      start_time: slotStart,
      end_time: slotEnd,
    }));
    const { error } = await supabase.from("availability_slots").insert(rows);
    if (error) toast.error(error.message);
    else {
      toast.success(`${rows.length} slot${rows.length > 1 ? "s" : ""} added`);
      fetchData();
    }
  };

  const handleDeleteSlot = async (id: string) => {
    const { error } = await supabase
      .from("availability_slots")
      .delete()
      .eq("id", id);
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
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 hover:opacity-100"
        >
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-border mb-8">
          <button
            onClick={() => setActiveTab("therapists")}
            className={`pb-3 text-sm tracking-widest uppercase transition-colors ${
              activeTab === "therapists"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Therapists
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`pb-3 text-sm tracking-widest uppercase transition-colors ${
              activeTab === "availability"
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Availability
          </button>
        </div>

        {/* Therapists Tab */}
        {activeTab === "therapists" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl text-foreground">
                Manage Therapists
              </h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {showForm ? <X size={14} /> : <Plus size={14} />}
                {showForm ? "Cancel" : "Add"}
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleAddTherapist}
                className="border border-border p-6 mb-8 space-y-4"
              >
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    Name
                  </label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    Specialties (comma-separated)
                  </label>
                  <input
                    value={formSpecialties}
                    onChange={(e) => setFormSpecialties(e.target.value)}
                    placeholder="Deep Tissue, Relaxation"
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    Photos (select one or many)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setFormPhotos(Array.from(e.target.files ?? []))
                    }
                    className="text-sm text-muted-foreground"
                  />
                  {formPhotos.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {formPhotos.length} file{formPhotos.length > 1 ? "s" : ""}{" "}
                      selected
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    Available For
                  </label>
                  <select
                    value={formServiceMode}
                    onChange={(e) =>
                      setFormServiceMode(e.target.value as ServiceMode)
                    }
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="both">Walk-In & Mobile (Both)</option>
                    <option value="walk_in">Walk-In Only</option>
                    <option value="mobile">Mobile / Home / Hotel Only</option>
                  </select>
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
                <div
                  key={t.id}
                  className="border border-border p-5 flex items-center gap-5"
                >
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden bg-muted relative">
                    {t.photo_url && t.photo_url.length > 0 ? (
                      <img
                        src={t.photo_url[0]}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No photo
                      </div>
                    )}
                    {t.photo_url && t.photo_url.length > 1 && (
                      <span className="absolute bottom-0 right-0 text-[10px] bg-primary text-primary-foreground px-1.5">
                        +{t.photo_url.length - 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-foreground">
                      {t.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {t.specialties.map((s) => (
                        <span
                          key={s}
                          className="text-[10px] tracking-wider uppercase px-2 py-0.5 bg-muted text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {t.photo_url && t.photo_url.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {t.photo_url.map((url) => (
                          <div
                            key={url}
                            className="relative w-10 h-10 overflow-hidden bg-muted"
                          >
                            <img
                              src={url}
                              alt={t.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => handleRemovePhoto(t.id, url)}
                              className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
                              title="Remove photo"
                            >
                              <X size={12} className="text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2">
                      <select
                        value={t.service_mode}
                        onChange={(e) =>
                          handleUpdateServiceMode(
                            t.id,
                            e.target.value as ServiceMode,
                          )
                        }
                        className="text-[10px] tracking-wider uppercase px-2 py-1 bg-background border border-border text-foreground focus:outline-none focus:border-primary"
                      >
                        <option value="both">Walk-In & Mobile</option>
                        <option value="walk_in">Walk-In Only</option>
                        <option value="mobile">Mobile Only</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={t.available}
                        onChange={() =>
                          handleToggleAvailable(t.id, t.available)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                    <label className="cursor-pointer" title="Add photos">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files ?? []);
                          if (files.length) handleAddPhotos(t.id, files);
                        }}
                      />
                      <Upload
                        size={16}
                        className="text-muted-foreground hover:text-foreground"
                      />
                    </label>
                    <button onClick={() => handleDeleteTherapist(t.id)}>
                      <Trash2
                        size={16}
                        className="text-destructive hover:text-destructive/80"
                      />
                    </button>
                  </div>
                </div>
              ))}

              {therapists.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No therapists added yet.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === "availability" && (
          <div>
            <h2 className="font-serif text-xl text-foreground mb-6">
              Manage Availability
            </h2>

            <form
              onSubmit={handleAddSlot}
              className="border border-border p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="sm:col-span-2">
                <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">
                  Therapist
                </label>
                <select
                  value={slotTherapist}
                  onChange={(e) => setSlotTherapist(e.target.value)}
                  className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Select therapist</option>
                  {therapists.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground">
                    Days
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setSlotDays(
                        slotDays.length === DAYS.length
                          ? []
                          : DAYS.map((_, i) => i),
                      )
                    }
                    className="text-[10px] tracking-widest uppercase text-primary hover:opacity-80"
                  >
                    {slotDays.length === DAYS.length
                      ? "Clear all"
                      : "Select all"}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DAYS.map((d, i) => {
                    const active = slotDays.includes(i);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() =>
                          setSlotDays(
                            active
                              ? slotDays.filter((x) => x !== i)
                              : [...slotDays, i],
                          )
                        }
                        className={`px-3 py-2 text-xs tracking-wider uppercase border transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:border-primary"
                        }`}
                      >
                        {d.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    Start
                  </label>
                  <select
                    value={slotStart}
                    onChange={(e) => setSlotStart(e.target.value)}
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-1">
                    End
                  </label>
                  <select
                    value={slotEnd}
                    onChange={(e) => setSlotEnd(e.target.value)}
                    className="w-full px-4 py-2 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
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
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    {t.name}
                  </h3>
                  <div className="space-y-2">
                    {tSlots.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between border border-border px-4 py-3"
                      >
                        <span className="text-sm text-foreground">
                          {DAYS[s.day_of_week]} — {s.start_time.slice(0, 5)} to{" "}
                          {s.end_time.slice(0, 5)}
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
