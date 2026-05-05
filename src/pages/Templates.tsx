



import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, ArrowRight } from "lucide-react";

import template1 from "@/assets/template1.png";
import template2 from "@/assets/template2.png";
import template3 from "@/assets/template3.png";
import template4 from "@/assets/template4.png";

const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and modern",
    image: template1,
  },
  {
    id: 2,
    name: "Modern",
    description: "Dark header style",
    image: template2,
  },
  {
    id: 3,
    name: "Minimal",
    description: "Simple clean layout",
    image: template3,
  },
  {
    id: 4,
    name: "Creative",
    description: "Colorful design",
    image: template4,
  },
];

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="rounded-[2rem] border border-green-100 bg-gradient-to-r from-[#eaf8ee] via-[#f4fbf6] to-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
          <Sparkles className="h-4 w-4" />
          Resume Design Studio
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Resume Templates
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Choose a template style to create a professional resume that
              matches your profile and career goals.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Available Templates
            </p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {templates.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative overflow-hidden bg-slate-50">
              <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                <FileText className="h-3.5 w-3.5" />
                Template {template.id}
              </div>

              <img
                src={template.image}
                alt={template.name}
                className="h-72 w-full object-contain bg-white p-4 transition duration-300 group-hover:scale-[1.02]"
              />
            </div>

            <CardContent className="space-y-4 p-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {template.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {template.description}
                </p>
              </div>

              <Button
                className="h-11 w-full rounded-xl bg-[#16a34a] font-semibold hover:bg-[#15803d]"
                onClick={() => navigate(`/templates/${template.id}`)}
              >
                Use Template
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Templates;
