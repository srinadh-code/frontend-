


import { useEffect, useState } from "react";
import API from "@/services/api";
import {
  Globe,
  Database,
  ArrowLeft,
  ChevronRight,
  Plus,
  Trash2,
  Sparkles,
  FolderTree,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const Departments = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [subDepartments, setSubDepartments] = useState<any[]>([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);

  const [newDept, setNewDept] = useState("");
  const [newDeptSubName, setNewDeptSubName] = useState("");
  const [newDeptSubNames, setNewDeptSubNames] = useState<string[]>([]);
  const [newSubDept, setNewSubDept] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<any | null>(null);
  const [editingSubDept, setEditingSubDept] = useState<any | null>(null);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const [deptRes, subdeptRes] = await Promise.all([
        API.get("departments/"),
        API.get("subdepartments/"),
      ]);

      setDepartments(deptRes.data);
      setSubDepartments(subdeptRes.data);
    } catch (error) {
      console.error("Fetch failed", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addDraftSubdepartment = () => {
    const trimmed = newDeptSubName.trim();
    if (!trimmed) return;
    if (newDeptSubNames.includes(trimmed)) return;

    setNewDeptSubNames((prev) => [...prev, trimmed]);
    setNewDeptSubName("");
  };

  const removeDraftSubdepartment = (index: number) => {
    setNewDeptSubNames((prev) => prev.filter((_, i) => i !== index));
  };

  const addDepartment = async () => {
    const name = newDept.trim();

    if (!name) {
      toast({
        title: "Validation",
        description: "Department name is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("departments/", { name });
      const createdId = res?.data?.id;

      if (!createdId) {
        toast({
          title: "Error",
          description: "Department created but ID not received.",
          variant: "destructive",
        });
        await fetchData();
        return;
      }

      if (newDeptSubNames.length > 0) {
        try {
          await Promise.all(
            newDeptSubNames.map((subName) =>
              API.post("subdepartments/", {
                name: subName,
                department: createdId,
              })
            )
          );

          toast({
            title: "Success",
            description: "Department and subdepartments created.",
          });
        } catch (subError) {
          console.error("Subdepartment creation error:", subError);
          toast({
            title: "Partial Success",
            description:
              "Department created but some subdepartments failed. Please add them manually.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Success",
          description: "Department created successfully.",
        });
      }

      await fetchData();

      setNewDept("");
      setNewDeptSubName("");
      setNewDeptSubNames([]);
      setSelectedDepartmentId(createdId);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Department creation error:", error);
      toast({
        title: "Error",
        description: "Failed to create department.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteDepartment = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (!confirm) return;

    await API.delete(`departments/delete/${id}/`);
    fetchData();
  };
  const updateDepartment = async () => {
  if (!editName.trim() || !editingDept) return;

  try {
    await API.patch(`departments/${editingDept.id}/`, {
  name: editName,
});

    toast({ title: "Success", description: "Department updated" });

    setEditingDept(null);
    setEditName("");
    fetchData();
  } catch {
    toast({ title: "Error", description: "Update failed" });
  }
};

  const addSubDepartment = async () => {
    if (!newSubDept.trim()) {
      toast({
        title: "Validation",
        description: "SubDepartment name is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await API.post("subdepartments/", {
        name: newSubDept,
        department: selectedDepartmentId,
      });

      setNewSubDept("");
      fetchData();

      toast({
        title: "Success",
        description: "Subdepartment added successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to add subdepartment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSubDepartment = async (id: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this subdepartment?"
    );
    if (!confirm) return;

    await API.delete(`subdepartments/delete/${id}/`);
    fetchData();
  };

  const selectedDepartment = departments.find(
    (d) => d.id === selectedDepartmentId
  );

  const selectedSubdepartments = subDepartments.filter(
    (s) => s.department === selectedDepartmentId
  );
const updateSubDepartment = async () => {
  if (!editName.trim() || !editingSubDept) return;

  try {
    await API.patch(`subdepartments/${editingSubDept.id}/`, {
  name: editName,
});

    toast({ title: "Success", description: "SubDepartment updated" });

    setEditingSubDept(null);
    setEditName("");
    fetchData();
  } catch {
    toast({ title: "Error", description: "Update failed" });
  }
};
  return (
    <div className="space-y-8">
      <Dialog open={!!editingDept || !!editingSubDept} onOpenChange={() => {
  setEditingDept(null);
  setEditingSubDept(null);
}}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit</DialogTitle>
    </DialogHeader>

    <Input
      value={editName}
      onChange={(e) => setEditName(e.target.value)}
      placeholder="Enter new name"
    />

    <DialogFooter>
      <Button
        onClick={() => {
          if (editingDept) updateDepartment();
          else updateSubDepartment();
        }}
      >
        Update
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      {/* Top Header */}
      <div className="rounded-[2rem] border border-green-100 bg-gradient-to-r from-[#eaf8ee] via-[#f4fbf6] to-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
          <Sparkles className="h-4 w-4" />
          Department Management
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Departments
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Manage departments and subdepartments for your resume system.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total Departments
            </p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {departments.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Top Action */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Manage Departments
          </h2>
          <p className="text-sm text-slate-500">
            Add, delete and explore department structure
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-11 rounded-xl bg-[#16a34a] px-5 font-semibold hover:bg-[#15803d]">
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create Department</DialogTitle>
              <DialogDescription>
                Add a department and optional subdepartments here.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 space-y-4">
              <Input
                placeholder="Department name"
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                className="h-11 rounded-xl"
              />

              <div className="flex gap-2">
                <Input
                  placeholder="Optional subdepartment"
                  value={newDeptSubName}
                  onChange={(e) => setNewDeptSubName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addDraftSubdepartment()}
                  className="h-11 rounded-xl"
                />
                <Button
                  type="button"
                  onClick={addDraftSubdepartment}
                  disabled={!newDeptSubName.trim()}
                  className="rounded-xl"
                >
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {newDeptSubNames.map((sub, index) => (
                  <Badge
                    key={`${sub}-${index}`}
                    className="flex items-center gap-2 bg-green-50 text-green-700 hover:bg-green-50"
                  >
                    {sub}
                    <button
                      type="button"
                      onClick={() => removeDraftSubdepartment(index)}
                      className="text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewDept("");
                    setNewDeptSubName("");
                    setNewDeptSubNames([]);
                  }}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                onClick={addDepartment}
                disabled={loading}
                className="rounded-xl bg-[#16a34a] hover:bg-[#15803d]"
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {selectedDepartmentId === null ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((d) => {
            const icons = [Globe, Database, Building2];
            const Icon = icons[d.id % icons.length];
            const subCount = subDepartments.filter(
              (s) => s.department === d.id
            ).length;

            return (
              <div
                key={d.id}
                className="group relative cursor-pointer rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDepartment(d.id);
                  }}
                  className="absolute right-4 top-4 rounded-full p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                >
                  {/* <Trash2 size={16} /> */}
                  <div className="absolute right-4 top-4 flex gap-2">

  {/* EDIT */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setEditingDept(d);
      setEditName(d.name);
    }}
    className="rounded-full p-2 text-blue-500 hover:bg-blue-50"
  >
    <Pencil size={16} />
  </button>

  {/* DELETE */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      deleteDepartment(d.id);
    }}
    className="rounded-full p-2 text-red-500 hover:bg-red-50"
  >
    <Trash2 size={16} />
  </button>

</div>
                </button>

                <div onClick={() => setSelectedDepartmentId(d.id)}>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                      <Icon className="h-7 w-7" />
                    </div>

                    <div className="rounded-full bg-slate-50 p-2 text-slate-400 transition group-hover:bg-green-50 group-hover:text-green-600">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{d.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {subCount} subdepartments
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {subDepartments
                      .filter((s) => s.department === d.id)
                      .map((s) => (
                        <Badge
                          key={s.id}
                          className="cursor-pointer bg-green-50 text-green-700 hover:bg-green-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/resumes?department=${d.id}&subdepartment=${s.id}`
                            );
                          }}
                        >
                          {s.name}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          <Button
            variant="ghost"
            className="rounded-xl px-0 text-slate-700 hover:bg-transparent"
            onClick={() => setSelectedDepartmentId(null)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Departments
          </Button>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                  <FolderTree className="h-4 w-4" />
                  Selected Department
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900">
                  {selectedDepartment?.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Manage subdepartments and navigate to filtered resumes.
                </p>
              </div>

              <div className="flex w-full gap-2 lg:w-auto">
                <Input
                  placeholder="Add SubDepartment (press Enter)"
                  value={newSubDept}
                  onChange={(e) => setNewSubDept(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSubDepartment()}
                  className="h-11 rounded-xl lg:w-[280px]"
                />
                <Button
                  onClick={addSubDepartment}
                  disabled={loading}
                  className="rounded-xl bg-[#16a34a] hover:bg-[#15803d]"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {loading ? "Adding..." : "Add"}
                </Button>
              </div>
            </div>
          </div>

          {selectedSubdepartments.length === 0 ? (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white py-14 text-center shadow-sm">
              <FolderTree className="mx-auto mb-4 h-10 w-10 text-slate-300" />
              <p className="text-lg font-semibold text-slate-700">
                No subdepartments found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Add a subdepartment to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {selectedSubdepartments.map((sub) => (
                <div
                  key={sub.id}
                  className="relative rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                 
                    {/* <Trash2 size={16} /> */}
                    <div className="absolute right-4 top-4 flex gap-2">

  <button
    onClick={(e) => {
  e.stopPropagation();
  setEditingSubDept(sub);
  setEditName(sub.name);
}}
    className="rounded-full p-2 text-blue-500 hover:bg-blue-50"
  >
    <Pencil size={16} />
  </button>

  <button
    onClick={() => deleteSubDepartment(sub.id)}
    className="rounded-full p-2 text-red-500 hover:bg-red-50"
  >
    <Trash2 size={16} />
  </button>

</div>
              

                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/resumes?department=${selectedDepartmentId}&subdepartment=${sub.id}`
                      )
                    }
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                      <FolderTree className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {sub.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      View resumes under {sub.name}
                    </p>

                    <div className="mt-4 inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      Open resumes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Departments;