import { useEffect, useState } from "react";
import API from "@/services/api";
import {
  FileText,
  Clock,
  Globe,
  Database,
  ArrowUpRight,
  Briefcase,
  Sparkles,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("dashboard/");
        console.log("DASHBOARD ", res.data);
        setData(res.data);
      } catch (err: any) {
        console.log("ERROR ", err);
        if (err?.response?.status === 403 || err?.response?.status === 401) {
          window.location.href = "/upload";
        }
      }
    };

    fetchDashboard();
  }, []);

  const stats = [
    {
      label: "Total Resumes",
      value: data?.total_resumes || 0,
      icon: FileText,
      note: "All uploaded profiles",
    },
    {
      label: "Recent Files",
      value: data?.recent_uploads || 0,
      icon: Clock,
      note: "Latest uploads tracked",
    },
    {
      label: "SAP Resumes",
      value: data?.sap_count || 0,
      icon: Database,
      note: "SAP related candidates",
    },
    {
      label: "WEB Resumes",
      value: data?.web_count || 0,
      icon: Globe,
      note: "Web profiles available",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-r from-[#eaf8ee] via-[#f4fbf6] to-white p-6 shadow-sm sm:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-200/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-emerald-200/20 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Resume Dashboard Overview
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Welcome to your Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                Track resume uploads, monitor recent activity, and manage SAP and
                WEB candidate profiles from one place.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl bg-white/90 px-4 py-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total Data
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {data?.total_resumes || 0}
                </h3>
              </div>

              <div className="rounded-2xl bg-white/90 px-4 py-4 shadow-sm ring-1 ring-slate-100">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Recent Uploads
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  {data?.recent_uploads || 0}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <s.icon className="h-7 w-7" />
                </div>

                <div className="rounded-full bg-slate-50 p-2 text-slate-400 transition group-hover:bg-green-50 group-hover:text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  {s.value}
                </h2>
                <p className="mt-2 text-xs text-slate-500">{s.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lower Section */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Recent Resumes Table */}
          <div className="xl:col-span-2 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Resumes
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Latest candidate entries from your system
                </p>
              </div>

              <div className="hidden rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 sm:block">
                Updated live
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100">
                    <TableHead className="whitespace-nowrap px-6 py-4">
                      Name
                    </TableHead>
                    <TableHead className="whitespace-nowrap py-4">
                      Department
                    </TableHead>
                    <TableHead className="whitespace-nowrap py-4">
                      Subdepartment
                    </TableHead>
                    <TableHead className="whitespace-nowrap py-4">
                      Experience
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data?.recent_resumes?.length > 0 ? (
                    data.recent_resumes.map((r: any) => (
                      <TableRow
                        key={r.id}
                        className="border-slate-100 hover:bg-slate-50/70"
                      >
                        <TableCell className="px-6 py-4 font-medium text-slate-800">
                          {r.name}
                        </TableCell>

                        <TableCell className="py-4">
                          <Badge className="bg-green-50 text-green-700 hover:bg-green-50">
                            {r.department}
                          </Badge>
                        </TableCell>

                        <TableCell className="py-4 text-slate-600">
                          {r.subdepartment}
                        </TableCell>

                        <TableCell className="py-4 text-slate-600">
                          {r.experience}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="px-6 py-12 text-center text-slate-500"
                      >
                        No recent resumes found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Side Summary Cards */}
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Quick Summary
                  </h3>
                  <p className="text-sm text-slate-500">
                    Current resume distribution
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">SAP Profiles</span>
                    <span className="text-lg font-bold text-slate-900">
                      {data?.sap_count || 0}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">WEB Profiles</span>
                    <span className="text-lg font-bold text-slate-900">
                      {data?.web_count || 0}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Recent Files</span>
                    <span className="text-lg font-bold text-slate-900">
                      {data?.recent_uploads || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="rounded-[1.75rem] bg-gradient-to-br from-[#16a34a] to-[#15803d] p-6 text-white shadow-sm">
              <p className="text-sm font-medium text-green-100">
                Resume Management
              </p>
              <h3 className="mt-2 text-2xl font-extrabold">
                Keep your candidate data organized
              </h3>
              <p className="mt-3 text-sm leading-6 text-green-50/90">
                Upload resumes, review recent entries, and track department-wise
                candidate flow with a cleaner dashboard experience.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;