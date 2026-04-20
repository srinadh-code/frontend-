// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import template1 from "@/assets/template1.png";

// const templates = [
//   {
//     id: 1,
//     name: "Professional Template",
//     description: "Clean and modern layout for job applications",
//     image: template1,
//   },
// ];

// const Templates = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="space-y-8 p-6">
//       <div>
//         <h1 className="text-2xl font-bold">Resume Templates</h1>
//         <p className="text-muted-foreground">
//           Choose a template to create your resume
//         </p>
//       </div>

//       {/* Centered Card */}
//       <div className="flex justify-center">
//         <div className="w-full max-w-md">
//           {templates.map((template) => (
//             <Card
//               key={template.id}
//               className="overflow-hidden hover:shadow-lg transition duration-300"
//             >
//               {/* IMAGE FIX */}
//               <img
//                 src={template.image}
//                 alt={template.name}
//                 className="w-full h-64 object-contain bg-white"
//               />

//               <CardContent className="p-4 space-y-3">
//                 <h3 className="text-lg font-semibold">
//                   {template.name}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   {template.description}
//                 </p>

//                 <Button
//                   className="w-full"
//                   onClick={() => navigate(`/templates/${template.id}`)}
//                 >
//                   Use Template
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Templates;



import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
// const templates = [
//   {
//     id: 1,
//     name: "Professional Template",
//     description: "Clean and modern layout for job applications",
//     image: template1,
//   },
// ];

const Templates = () => {
  const navigate = useNavigate();

  return (
   <div className="space-y-8 p-6">
  <div>
    <h1 className="text-2xl font-bold">Resume Templates</h1>
    <p className="text-muted-foreground">
      Choose a template to create your resume
    </p>
  </div>

  {/* 🔥 GRID LAYOUT */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    
    {templates.map((template) => (
      <Card
        key={template.id}
        className="overflow-hidden hover:shadow-lg transition duration-300"
      >
        <img
          src={template.image}
          alt={template.name}
          className="w-full h-64 object-contain bg-white"
        />

        <CardContent className="p-4 space-y-3">
          <h3 className="text-lg font-semibold">
            {template.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {template.description}
          </p>

          <Button
            className="w-full"
            onClick={() => navigate(`/templates/${template.id}`)}
          >
            Use Template
          </Button>
        </CardContent>
      </Card>
    ))}

  </div>
</div>

  );
};

export default Templates;